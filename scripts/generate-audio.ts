// Pre-generates the audio of the built-in lessons as MP3 files in public/audio, so the app can play them
// without asking /api/tts (no server, no API quota, works offline once cached).
//
//   npm run audio:generate                      only the phrases that have no file yet
//   npm run audio:generate -- --dry-run         show what would be generated
//   npm run audio:generate -- --force           regenerate everything (e.g. after switching the voice)
//
// Voice: Gemini (the same model, voice and style as the server) when GEMINI_API_KEY is set in .env.local or
// .env, otherwise the Google Translate voice that the server uses as its fallback. The run can be repeated at
// any time: files that exist are kept, and the manifest is saved after every phrase. The phrases are done in
// the order a learner meets them, and a daily quota ends the run cleanly: run it again after the reset (the
// free Gemini tier allows 100 requests a day for this model, the lessons need 272). More keys in .env
// (GEMINI_API_KEY_2 ... GEMINI_API_KEY_5) let the run go on with the next key when one key's day is used up;
// Google counts the quota per project, not per key, so a key only adds requests when it comes from another project.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { collectAudioTextsInLessonOrder } from '../src/utils/audioTexts';
import { fetchFallbackRussianAudio, synthesizeWithGemini, TTS_MODEL, TTS_VOICE } from '../server/tts';
import { parseWav } from '../server/audioFormat';
import { encodeMp3, inspectMp3 } from './lib/mp3';
import { describeQuota, isDailyQuota, isQuotaError, retryAfterSeconds } from './lib/quota';

const projectRoot = path.resolve(import.meta.dirname, '..');
dotenv.config({ path: [path.join(projectRoot, '.env.local'), path.join(projectRoot, '.env')], quiet: true });

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const option = (name: string): string | undefined =>
  args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);

if (flag('help')) {
  console.log(`Usage: npm run audio:generate -- [options]
  --dry-run              show what would be generated and change nothing
  --force                regenerate every phrase
  --limit=N              generate at most N of the missing phrases
  --source=gemini|google voice (default: gemini when GEMINI_API_KEY is set, otherwise google)
  --delay=MS             pause between requests (default 700)
  --retry-wait=MS        pause before a retry (default 3000; a quota error waits 65 s)
  --out=DIR              output directory (default public/audio)
Keys: GEMINI_API_KEY, and optionally GEMINI_API_KEY_2 ... GEMINI_API_KEY_5 (each from its own Google project),
used one after the other as their daily quotas run out.`);
  process.exit(0);
}

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};
const numberOption = (name: string, fallback: number): number => {
  const raw = option(name);
  if (raw === undefined) return fallback;
  const value = Number(raw);
  return Number.isInteger(value) && value >= 0 ? value : fail(`--${name} must be a whole number, got "${raw}"`);
};

const FILE_NAME = /^[0-9a-f]{12}\.mp3$/;
const MAX_ATTEMPTS = 3;
const MAX_CONSECUTIVE_FAILURES = 5;

const outDir = path.resolve(option('out') ?? path.join(projectRoot, 'public', 'audio'));
const manifestPath = path.join(outDir, 'manifest.json');
const delay = numberOption('delay', 700);
const retryWait = numberOption('retry-wait', 3000);
const limit = numberOption('limit', 0);
const force = flag('force');
const dryRun = flag('dry-run');

type Source = 'gemini' | 'google';
const requestedSource = option('source');
if (requestedSource !== undefined && requestedSource !== 'gemini' && requestedSource !== 'google') {
  fail(`--source must be "gemini" or "google", got "${requestedSource}"`);
}
const KEY_NAMES = ['GEMINI_API_KEY', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3', 'GEMINI_API_KEY_4', 'GEMINI_API_KEY_5'];
const apiKeys = [...new Set(KEY_NAMES.map((name) => process.env[name]?.trim()).filter((key): key is string => Boolean(key)))];
const source: Source = (requestedSource as Source | undefined) ?? (apiKeys.length > 0 ? 'gemini' : 'google');
if (source === 'gemini' && apiKeys.length === 0) fail('--source=gemini needs GEMINI_API_KEY (set it in .env.local).');
const clients = source === 'gemini' ? apiKeys.map((apiKey) => new GoogleGenAI({ apiKey })) : [];
let keyIndex = 0; // the key in use: the run moves on to the next one when the daily quota of this one is used up

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** The phrase as MP3 bytes, from the chosen voice. Throws when the voice does not deliver. */
async function synthesizeMp3(text: string): Promise<Buffer> {
  const ai = clients[keyIndex];
  if (ai) {
    const audio = await synthesizeWithGemini(ai, text, false);
    if (!audio) throw new Error('Gemini returned no audio');
    const bytes = Buffer.from(audio.audio, 'base64');
    if (audio.mimeType === 'audio/mpeg') return bytes;

    const wav = parseWav(bytes);
    if (!wav) throw new Error('Gemini returned audio in a format this script cannot read');
    // A copy, so the samples start at offset 0 of their own buffer (Int16Array needs an even offset)
    const pcm = new Uint8Array(wav.pcm.subarray(0, wav.pcm.length - (wav.pcm.length % 2)));
    return encodeMp3(new Int16Array(pcm.buffer), wav.sampleRate, wav.channels);
  }

  const audio = await fetchFallbackRussianAudio(text);
  if (!audio) throw new Error('the voice service returned no audio (blocked, or offline?)');
  return Buffer.from(audio.audio, 'base64');
}

/** The voice service's daily quota is used up: nothing more can be generated until it resets. */
class DailyQuotaError extends Error {}

async function withRetries<T>(task: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await task();
    } catch (error) {
      // A daily quota does not come back within this run: stop at once, the progress is saved
      if (isDailyQuota(error)) throw new DailyQuotaError(String(error));
      if (attempt >= MAX_ATTEMPTS) throw error;

      let wait = retryWait * attempt;
      if (isQuotaError(error)) {
        // A per-minute limit: wait as long as the service says (65 s when it does not)
        wait = retryWait === 0 ? 0 : Math.min(120, (retryAfterSeconds(error) ?? 60) + 5) * 1000;
        console.log(`  rate limit reached, waiting ${Math.round(wait / 1000)} s before trying again`);
      }
      await sleep(wait);
    }
  }
}

/** The phrase from the key in use, moving on to the next key when the daily quota of this one is used up. */
async function synthesizeWithAnyKey(text: string): Promise<Buffer> {
  for (;;) {
    try {
      return await withRetries(() => synthesizeMp3(text));
    } catch (error) {
      if (!(error instanceof DailyQuotaError) || keyIndex >= clients.length - 1) throw error;
      const usedUp = keyIndex + 1;
      keyIndex++;
      console.log(
        `  key ${usedUp}/${clients.length}: daily quota used up (${describeQuota(error)}); going on with key ${keyIndex + 1}/${clients.length}`,
      );
    }
  }
}

function readManifest(): Record<string, string> {
  try {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { files?: Record<string, unknown> };
    const entries = Object.entries(data.files ?? {}).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string' && FILE_NAME.test(entry[1]),
    );
    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}

function writeManifest(files: Record<string, string>) {
  const sorted = Object.fromEntries(Object.entries(files).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  // True once every phrase of the lessons has its file. Generation can take several days on a small daily
  // quota, so the tests only insist on full coverage after this has become true (and then keep it true).
  const complete = texts.every((text) => Boolean(files[text]) && fs.existsSync(path.join(outDir, files[text])));
  const temporary = `${manifestPath}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify({ version: 1, complete, files: sorted }, null, 1) + '\n');
  fs.renameSync(temporary, manifestPath); // never leaves a half-written manifest behind
}

const texts = collectAudioTextsInLessonOrder();
const files = readManifest();
const hasFile = (text: string) => Boolean(files[text]) && fs.existsSync(path.join(outDir, files[text]));
const missing = force ? texts : texts.filter((text) => !hasFile(text));
const queue = limit > 0 ? missing.slice(0, limit) : missing;

console.log(
  `${texts.length} phrases in the lessons, ${texts.length - missing.length} already have audio, ${queue.length} to generate.`,
);
console.log(
  `Voice: ${source === 'gemini' ? `Gemini (${TTS_MODEL}, voice ${TTS_VOICE})${clients.length > 1 ? `, ${clients.length} API keys` : ''}` : 'Google Translate voice (unofficial, the server fallback)'}`,
);
console.log(`Output: ${outDir}`);

if (dryRun) {
  for (const text of queue) console.log(`  would generate: ${text}`);
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

let generated = 0;
let consecutiveFailures = 0;
let aborted = false;
const failed: string[] = [];

for (const [index, text] of queue.entries()) {
  const label = `[${index + 1}/${queue.length}]`;
  try {
    const mp3 = await synthesizeWithAnyKey(text);
    const info = inspectMp3(mp3);
    if (!info.valid || info.durationSeconds < 0.2 || info.durationSeconds > 30) {
      throw new Error(`not a usable MP3 (valid: ${info.valid}, ${info.durationSeconds.toFixed(2)} s)`);
    }

    // The name comes from the audio itself: a regenerated phrase gets a new URL, so no cache serves the old voice
    const file = `${crypto.createHash('sha256').update(mp3).digest('hex').slice(0, 12)}.mp3`;
    fs.writeFileSync(path.join(outDir, file), mp3);
    const previous = files[text];
    files[text] = file;
    writeManifest(files);
    if (previous && previous !== file && !Object.values(files).includes(previous)) {
      fs.rmSync(path.join(outDir, previous), { force: true });
    }

    generated++;
    consecutiveFailures = 0;
    console.log(`${label} ${text}  ->  ${file}  (${(mp3.length / 1024).toFixed(1)} KB, ${info.durationSeconds.toFixed(1)} s)`);
  } catch (error) {
    if (error instanceof DailyQuotaError) {
      aborted = true;
      console.error(
        `${label} The daily quota of the voice service is used up${clients.length > 1 ? ` on all ${clients.length} keys` : ''}: ${describeQuota(error)}.\n` +
          'What was generated is saved: run the command again after the quota resets (usually the next day), or with a key that has a higher limit.',
      );
      break;
    }
    failed.push(text);
    consecutiveFailures++;
    console.error(`${label} FAILED ${text}: ${error instanceof Error ? error.message : String(error)}`);
    if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      aborted = true;
      console.error(
        `${MAX_CONSECUTIVE_FAILURES} failures in a row: the voice service is refusing requests. Stopping; what was generated is saved. Wait a while and run the command again.`,
      );
      break;
    }
  }
  if (delay > 0 && index < queue.length - 1) await sleep(delay);
}

// A full run also tidies up: phrases that left the lessons, and files nothing refers to any more
if (limit === 0 && !aborted) {
  const wanted = new Set(texts);
  let changed = false;
  for (const text of Object.keys(files)) {
    if (!wanted.has(text)) {
      delete files[text];
      changed = true;
    }
  }
  if (changed) writeManifest(files);
  const used = new Set(Object.values(files));
  for (const name of fs.readdirSync(outDir)) {
    if (FILE_NAME.test(name) && !used.has(name)) fs.rmSync(path.join(outDir, name), { force: true });
  }
}

// Whatever happened above, leave the manifest saying whether the set is complete now
if (Object.keys(files).length > 0) writeManifest(files);

const totalBytes = fs
  .readdirSync(outDir)
  .filter((name) => FILE_NAME.test(name))
  .reduce((sum, name) => sum + fs.statSync(path.join(outDir, name)).size, 0);
const covered = texts.filter(hasFile).length;
console.log(
  `Done: ${generated} generated, ${failed.length} failed. ${covered}/${texts.length} phrases have audio (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`,
);
if (failed.length > 0) console.error('Failed phrases:\n' + failed.map((text) => `  ${text}`).join('\n'));
// A run that gave up early is not a success, even when nothing failed before it stopped
if (failed.length > 0 || aborted) process.exit(1);

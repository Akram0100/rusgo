// Pre-generates the audio of the built-in lessons as MP3 files in public/audio, so the app can play them
// without asking /api/tts (no server, no API quota, works offline once cached).
//
//   npm run audio:generate                      only the phrases that have no file yet
//   npm run audio:generate -- --dry-run         show what would be generated
//   npm run audio:generate -- --force           regenerate everything (e.g. after switching the voice)
//
// Voice: Gemini (the same model, voice and style as the server) when GEMINI_API_KEY is set in .env.local,
// otherwise the Google Translate voice that the server uses as its fallback. The run can be repeated at any
// time: files that exist are kept, and the manifest is saved after every phrase.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { collectAudioTexts } from '../src/utils/audioTexts';
import { fetchFallbackRussianAudio, synthesizeWithGemini, TTS_MODEL, TTS_VOICE } from '../server/tts';
import { parseWav } from '../server/audioFormat';
import { encodeMp3, inspectMp3 } from './lib/mp3';

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
  --out=DIR              output directory (default public/audio)`);
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
const apiKey = process.env.GEMINI_API_KEY;
const source: Source = (requestedSource as Source | undefined) ?? (apiKey ? 'gemini' : 'google');
if (source === 'gemini' && !apiKey) fail('--source=gemini needs GEMINI_API_KEY (set it in .env.local).');
const ai = source === 'gemini' ? new GoogleGenAI({ apiKey }) : null;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** The phrase as MP3 bytes, from the chosen voice. Throws when the voice does not deliver. */
async function synthesizeMp3(text: string): Promise<Buffer> {
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

async function withRetries<T>(task: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await task();
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS) throw error;
      const quota = /429|RESOURCE_EXHAUSTED|Quota exceeded|rate-limit/i.test(String(error));
      await sleep(quota ? (retryWait === 0 ? 0 : 65_000) : retryWait * attempt);
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
  const temporary = `${manifestPath}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify({ version: 1, files: sorted }, null, 1) + '\n');
  fs.renameSync(temporary, manifestPath); // never leaves a half-written manifest behind
}

const texts = collectAudioTexts();
const files = readManifest();
const hasFile = (text: string) => Boolean(files[text]) && fs.existsSync(path.join(outDir, files[text]));
const missing = force ? texts : texts.filter((text) => !hasFile(text));
const queue = limit > 0 ? missing.slice(0, limit) : missing;

console.log(
  `${texts.length} phrases in the lessons, ${texts.length - missing.length} already have audio, ${queue.length} to generate.`,
);
console.log(
  `Voice: ${source === 'gemini' ? `Gemini (${TTS_MODEL}, voice ${TTS_VOICE})` : 'Google Translate voice (unofficial, the server fallback)'}`,
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
    const mp3 = await withRetries(() => synthesizeMp3(text));
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

const totalBytes = fs
  .readdirSync(outDir)
  .filter((name) => FILE_NAME.test(name))
  .reduce((sum, name) => sum + fs.statSync(path.join(outDir, name)).size, 0);
const covered = texts.filter(hasFile).length;
console.log(
  `Done: ${generated} generated, ${failed.length} failed. ${covered}/${texts.length} phrases have audio (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`,
);
if (failed.length > 0) {
  console.error('Failed phrases:\n' + failed.map((text) => `  ${text}`).join('\n'));
  process.exit(1);
}

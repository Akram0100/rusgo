// Run with: npm run test:logic
// The audio pipeline: WAV/PCM helpers, the MP3 encoder and reader, the list of phrases, the app's manifest
// lookup, the generator script (its voices are mocked, nothing leaves the machine) and, once audio has been
// generated, the files that ship in public/audio.
import { after, afterEach, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { INITIAL_LESSONS } from '../src/data/lessons';
import { SCENARIOS } from '../src/data/roleplay';
import { GRAMMAR_RULES } from '../src/data/grammar';
import { collectAudioTexts, collectAudioTextsInLessonOrder } from '../src/utils/audioTexts';
import { getStaticAudioUrl, resetAudioManifest } from '../src/utils/staticAudio';
import { normalizeGeminiAudio, parsePcmMimeType, parseWav, pcmToWav } from '../server/audioFormat';
import { encodeMp3, inspectMp3 } from '../scripts/lib/mp3';
import { describeQuota, isDailyQuota, isQuotaError, retryAfterSeconds } from '../scripts/lib/quota';

const projectRoot = path.resolve(import.meta.dirname, '..');

/** A 440 Hz tone, 16-bit, `channels` interleaved channels. */
const sine = (seconds: number, sampleRate: number, channels = 1): Int16Array => {
  const frames = Math.round(seconds * sampleRate);
  const samples = new Int16Array(frames * channels);
  for (let i = 0; i < frames; i++) {
    const value = Math.round(Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 8000);
    for (let c = 0; c < channels; c++) samples[i * channels + c] = value;
  }
  return samples;
};
const bytesOf = (samples: Int16Array) => Buffer.from(samples.buffer, samples.byteOffset, samples.byteLength);
const u32 = (value: number) => {
  const out = Buffer.alloc(4);
  out.writeUInt32LE(value);
  return out;
};

describe('WAV and PCM helpers (server/audioFormat.ts)', () => {
  it('reads the sample rate and channels from a PCM mime type, with sane defaults', () => {
    assert.deepEqual(parsePcmMimeType('audio/L16;codec=pcm;rate=24000'), { sampleRate: 24000, channels: 1 });
    assert.deepEqual(parsePcmMimeType('audio/L16;rate=16000;channels=2'), { sampleRate: 16000, channels: 2 });
    for (const odd of [undefined, '', 'audio/pcm', 'audio/L16;rate=5', 'audio/L16;rate=999999999']) {
      assert.deepEqual(parsePcmMimeType(odd), { sampleRate: 24000, channels: 1 }, String(odd));
    }
  });

  it('pcmToWav writes the canonical 44-byte header, and parseWav reads it back', () => {
    const pcm = bytesOf(sine(0.1, 24000));
    const wav = pcmToWav(pcm, 24000, 1);
    assert.equal(wav.length, 44 + pcm.length);
    assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
    assert.equal(wav.readUInt32LE(4), wav.length - 8);
    assert.equal(wav.toString('ascii', 8, 16), 'WAVEfmt ');
    assert.equal(wav.readUInt16LE(20), 1, 'PCM');
    assert.equal(wav.readUInt32LE(28), 24000 * 2, 'bytes per second');
    assert.equal(wav.readUInt16LE(32), 2, 'block align');
    assert.equal(wav.readUInt16LE(34), 16, 'bits per sample');
    assert.equal(wav.toString('ascii', 36, 40), 'data');
    assert.equal(wav.readUInt32LE(40), pcm.length);

    const parsed = parseWav(wav);
    assert.ok(parsed);
    assert.deepEqual({ sampleRate: parsed.sampleRate, channels: parsed.channels }, { sampleRate: 24000, channels: 1 });
    assert.ok(parsed.pcm.equals(pcm));
  });

  it('parseWav copes with extra chunks, odd chunk sizes and a streamed (oversized) data length', () => {
    const pcm = bytesOf(sine(0.05, 24000));
    const fmt = pcmToWav(Buffer.alloc(0)).subarray(12, 36);
    const list = Buffer.concat([Buffer.from('LIST'), u32(3), Buffer.from('abc'), Buffer.from([0])]); // 3 bytes + padding
    const body = (declared: number) => Buffer.concat([Buffer.from('data'), u32(declared), pcm]);
    const riff = (data: Buffer) =>
      Buffer.concat([Buffer.from('RIFF'), u32(4 + fmt.length + list.length + data.length), Buffer.from('WAVE'), fmt, list, data]);

    assert.ok(parseWav(riff(body(pcm.length)))?.pcm.equals(pcm));
    assert.ok(parseWav(riff(body(0xffffffff)))?.pcm.equals(pcm), 'a data size larger than the file means: the rest of the file');
  });

  it('parseWav refuses anything that is not 16-bit PCM WAV', () => {
    const good = pcmToWav(bytesOf(sine(0.05, 24000)));
    assert.equal(parseWav(Buffer.alloc(0)), null);
    assert.equal(parseWav(Buffer.from('RIFF-fake-wav')), null);
    assert.equal(parseWav(Buffer.from('not audio at all, just some text')), null);

    const eightBit = Buffer.from(good);
    eightBit.writeUInt16LE(8, 34);
    assert.equal(parseWav(eightBit), null);
    const floats = Buffer.from(good);
    floats.writeUInt16LE(3, 20);
    assert.equal(parseWav(floats), null);
    const surround = Buffer.from(good);
    surround.writeUInt16LE(6, 22);
    assert.equal(parseWav(surround), null);
  });

  it('normalizeGeminiAudio: a WAV passes through unchanged', () => {
    const wav = pcmToWav(bytesOf(sine(0.05, 24000))).toString('base64');
    assert.deepEqual(normalizeGeminiAudio(wav, 'audio/wav'), { audio: wav, mimeType: 'audio/wav' });
    assert.deepEqual(normalizeGeminiAudio(wav, undefined), { audio: wav, mimeType: 'audio/wav' });
  });

  it('normalizeGeminiAudio: headerless PCM gets a WAV header with the rate from the mime type', () => {
    const pcm = bytesOf(sine(0.05, 16000));
    const result = normalizeGeminiAudio(pcm.toString('base64'), 'audio/L16;codec=pcm;rate=16000');
    assert.equal(result.mimeType, 'audio/wav');
    const parsed = parseWav(Buffer.from(result.audio, 'base64'));
    assert.ok(parsed);
    assert.equal(parsed.sampleRate, 16000);
    assert.ok(parsed.pcm.equals(pcm));
  });

  it('normalizeGeminiAudio: PCM mislabelled as audio/wav, or with no mime type, is still wrapped (24 kHz by default)', () => {
    const pcm = bytesOf(sine(0.05, 24000));
    for (const mimeType of ['audio/wav', undefined, '']) {
      const result = normalizeGeminiAudio(pcm.toString('base64'), mimeType);
      assert.equal(result.mimeType, 'audio/wav', String(mimeType));
      assert.equal(parseWav(Buffer.from(result.audio, 'base64'))?.sampleRate, 24000, String(mimeType));
    }
  });

  it('normalizeGeminiAudio: silent PCM (it starts with 0xFF 0xFF, like an MP3 frame) is not taken for MP3', () => {
    const silence = Buffer.alloc(2000, 0xff);
    const result = normalizeGeminiAudio(silence.toString('base64'), 'audio/L16;codec=pcm;rate=24000');
    assert.equal(result.mimeType, 'audio/wav');
    assert.equal(parseWav(Buffer.from(result.audio, 'base64'))?.pcm.length, 2000);
  });

  it('normalizeGeminiAudio: an MP3 (by mime type or ID3 tag) passes through as audio/mpeg', () => {
    const mp3 = encodeMp3(sine(0.1, 24000), 24000).toString('base64');
    assert.deepEqual(normalizeGeminiAudio(mp3, 'audio/mpeg'), { audio: mp3, mimeType: 'audio/mpeg' });
    const tagged = Buffer.concat([Buffer.from('ID3'), Buffer.alloc(30)]).toString('base64');
    assert.equal(normalizeGeminiAudio(tagged, undefined).mimeType, 'audio/mpeg');
  });
});

describe('MP3 encoder and reader (scripts/lib/mp3.ts)', () => {
  it('encodes speech-rate audio into valid MP3 of the right length, keeping the sample rate', () => {
    for (const rate of [16000, 22050, 24000]) {
      const info = inspectMp3(encodeMp3(sine(0.5, rate), rate, 1, 48));
      assert.ok(info.valid, `${rate} Hz`);
      assert.equal(info.sampleRate, rate);
      assert.ok(Math.abs(info.durationSeconds - 0.5) < 0.1, `${rate} Hz: ${info.durationSeconds} s`);
    }
  });

  it('CD-rate input still gives a valid MP3 of the right length (the encoder may pick a lower rate for 48 kbps)', () => {
    const info = inspectMp3(encodeMp3(sine(0.5, 44100), 44100, 1, 48));
    assert.ok(info.valid);
    assert.ok(info.sampleRate <= 44100);
    assert.ok(Math.abs(info.durationSeconds - 0.5) < 0.1, `${info.durationSeconds} s`);
  });

  it('encodes stereo, and a higher bitrate makes a bigger file', () => {
    const stereo = inspectMp3(encodeMp3(sine(0.4, 24000, 2), 24000, 2, 64));
    assert.ok(stereo.valid);
    assert.ok(Math.abs(stereo.durationSeconds - 0.4) < 0.1);

    const small = encodeMp3(sine(1, 24000), 24000, 1, 48);
    const large = encodeMp3(sine(1, 24000), 24000, 1, 96);
    assert.ok(large.length > small.length * 1.5, `${small.length} vs ${large.length}`);
  });

  it('the Gemini route works end to end: PCM -> WAV -> samples -> MP3 of the same length', () => {
    const wav = Buffer.from(normalizeGeminiAudio(bytesOf(sine(0.5, 24000)).toString('base64'), 'audio/L16;codec=pcm;rate=24000').audio, 'base64');
    const parsed = parseWav(wav);
    assert.ok(parsed);
    const info = inspectMp3(encodeMp3(new Int16Array(new Uint8Array(parsed.pcm).buffer), parsed.sampleRate, parsed.channels));
    assert.ok(info.valid);
    assert.equal(info.sampleRate, 24000);
    assert.ok(Math.abs(info.durationSeconds - 0.5) < 0.1);
  });

  it('inspectMp3 skips an ID3v2 tag in front of the frames', () => {
    const mp3 = encodeMp3(sine(0.3, 24000), 24000);
    const tag = Buffer.concat([Buffer.from([0x49, 0x44, 0x33, 3, 0, 0, 0, 0, 0, 20]), Buffer.alloc(20)]);
    const plain = inspectMp3(mp3);
    const tagged = inspectMp3(Buffer.concat([tag, mp3]));
    assert.ok(tagged.valid);
    assert.equal(tagged.frames, plain.frames);
  });

  it('inspectMp3 rejects what is not MP3, or MP3 buried in garbage', () => {
    const mp3 = encodeMp3(sine(0.3, 24000), 24000);
    assert.equal(inspectMp3(Buffer.alloc(0)).valid, false);
    assert.equal(inspectMp3(Buffer.from('FAKE-MP3')).valid, false);
    assert.equal(inspectMp3(Buffer.alloc(5000)).valid, false);
    assert.equal(inspectMp3(crypto.createHash('sha256').update('x').digest()).valid, false);
    assert.equal(inspectMp3(pcmToWav(bytesOf(sine(0.1, 24000)))).valid, false, 'a WAV is not an MP3');
    assert.equal(inspectMp3(Buffer.concat([mp3, Buffer.alloc(mp3.length * 2)])).valid, false, 'mostly something else');
  });
});

describe('quota errors (scripts/lib/quota.ts)', () => {
  const perMinute = new Error('429 RESOURCE_EXHAUSTED: Quota exceeded for metric generate_requests_per_model_per_minute. Please retry in 35.2s.');
  const perDay = new Error('429 RESOURCE_EXHAUSTED: Quota exceeded. quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier');

  it('recognises "too many requests" errors, and only those', () => {
    for (const error of [perMinute, perDay, new Error('{"error":{"code":429}}'), 'Quota exceeded', 'rate-limit hit']) {
      assert.equal(isQuotaError(error), true, String(error));
    }
    for (const error of [new Error('fetch failed'), new Error('500 INTERNAL'), new Error('Gemini returned no audio'), null, undefined]) {
      assert.equal(isQuotaError(error), false, String(error));
    }
  });

  it('tells a daily quota (do not wait) from a per-minute one (wait and retry)', () => {
    assert.equal(isDailyQuota(perDay), true);
    assert.equal(isDailyQuota(new Error('429 Quota exceeded for generate_requests_per_model_per_day')), true);
    assert.equal(isDailyQuota(perMinute), false);
    assert.equal(isDailyQuota(new Error('500 INTERNAL, try again later today')), false);
    assert.equal(isDailyQuota(new Error('fetch failed (daily build)')), false, 'it must be a quota error first');
  });

  it('reads how long the service asked us to wait', () => {
    assert.equal(retryAfterSeconds(perMinute), 35.2);
    assert.equal(retryAfterSeconds(new Error('{"details":[{"retryDelay":"17s"}]}')), 17);
    assert.equal(retryAfterSeconds(new Error('Please retry in 4s')), 4);
    assert.equal(retryAfterSeconds(perDay), null);
    assert.equal(retryAfterSeconds(new Error('429')), null);
  });

  // What the Gemini API really answered to the free-tier key when the day's 100 requests were used up
  const realDailyError =
    'ApiError: {"error":{"code":429,"message":"You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model_per_day, limit: 100, model: gemini-3.8-flash-lite-tts\\nPlease retry in 19h1m8.430387596s.","status":"RESOURCE_EXHAUSTED","details":[{"@type":"type.googleapis.com/google.rpc.Help","links":[{"description":"Learn more about Gemini API quotas","url":"https://ai.google.dev/gemini-api/docs/rate-limits"}]},{"@type":"type.googleapis.com/google.rpc.QuotaFailure","violations":[{"quotaMetric":"generativelanguage.googleapis.com/generate_requests_per_model_per_day","quotaId":"GenerateRequestsPerDayPerProjectPerModel","quotaDimensions":{"location":"global","model":"gemini-3.8-flash-lite-tts"},"quotaValue":"100"}]},{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"68468s"}]}}';

  it('handles the real Gemini daily-limit answer: a daily quota, a retry delay of 19 hours, a short readable summary', () => {
    assert.equal(isQuotaError(realDailyError), true);
    assert.equal(isDailyQuota(realDailyError), true);
    assert.equal(retryAfterSeconds(realDailyError), 68468);
    assert.equal(
      describeQuota(realDailyError),
      'limit 100 (generate requests per model per day) for gemini-3.8-flash-lite-tts; the service says to retry in 19h1m8s',
    );
  });

  it('describeQuota copes with partial or unknown messages', () => {
    assert.equal(describeQuota(perMinute), 'the service says to retry in 35s');
    assert.equal(describeQuota(new Error('429 Quota exceeded')), 'Error: 429 Quota exceeded');
    assert.ok(describeQuota(new Error('x'.repeat(1000))).length <= 200);
  });
});

describe('phrases to pre-generate (src/utils/audioTexts.ts)', () => {
  const texts = collectAudioTexts();

  it('are trimmed, unique, sorted, Russian and short enough for the TTS endpoints', () => {
    assert.ok(texts.length > 200, `${texts.length} phrases`);
    assert.equal(new Set(texts).size, texts.length);
    assert.deepEqual([...texts].sort(), texts);
    for (const text of texts) {
      assert.equal(text, text.trim());
      assert.ok(/[А-Яа-яЁё]/.test(text), text);
      assert.ok(text.length <= 200, text); // the limit of /api/tts and of the fallback voice
    }
  });

  it('can also be taken in the order a learner meets them: lessons, then role-plays, then grammar', () => {
    const ordered = collectAudioTextsInLessonOrder();
    assert.deepEqual([...ordered].sort(), texts, 'the same phrases');
    assert.equal(ordered[0], INITIAL_LESSONS[0].exercises[0].target_audio_text.trim());

    const lastLesson = INITIAL_LESSONS[INITIAL_LESSONS.length - 1];
    const lastLessonPhrase = lastLesson.exercises[lastLesson.exercises.length - 1].target_audio_text.trim();
    const roleplayLine = SCENARIOS[0].steps[0].ru.trim();
    const grammarExample = GRAMMAR_RULES[0].sections[0].examples[0].audio_text.trim();
    assert.ok(ordered.indexOf(lastLessonPhrase) < ordered.indexOf(roleplayLine), 'lessons before role-plays');
    assert.ok(ordered.indexOf(roleplayLine) < ordered.indexOf(grammarExample), 'role-plays before grammar');
  });

  it('include exercises, vocabulary, role-play lines (both sides) and grammar examples', () => {
    const lesson = INITIAL_LESSONS[0];
    const wanted = [
      lesson.exercises[0].target_audio_text,
      lesson.vocabulary![0].audio_text,
      SCENARIOS[0].steps[0].ru, // the other person
      SCENARIOS[0].steps[1].ru, // the learner
      GRAMMAR_RULES[0].sections[0].examples[0].audio_text,
    ];
    for (const phrase of wanted) assert.ok(texts.includes(phrase.trim()), phrase);
  });

  it('cover every exercise and vocabulary phrase of every built-in lesson', () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) assert.ok(texts.includes(exercise.target_audio_text.trim()), exercise.target_audio_text);
      for (const word of lesson.vocabulary ?? []) assert.ok(texts.includes((word.audio_text || word.term).trim()), word.term);
    }
  });
});

describe("the app's manifest lookup (src/utils/staticAudio.ts)", () => {
  const realFetch = globalThis.fetch;
  const useFetch = (handler: (url: string) => Promise<Response>) => {
    globalThis.fetch = ((input: RequestInfo | URL) => handler(String(input))) as typeof fetch;
  };
  const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

  afterEach(() => {
    globalThis.fetch = realFetch;
    resetAudioManifest();
  });

  it('maps phrases to /audio/<file>, and ignores entries that are not safe file names', async () => {
    let requests = 0;
    useFetch(async (url) => {
      requests++;
      assert.equal(url, '/audio/manifest.json');
      return jsonResponse({
        version: 1,
        files: { 'Привет': 'abcdef012345.mp3', 'Плохо': '../secret.mp3', 'Число': 5, 'Длинно': 'abcdef0123456789.mp3' },
      });
    });

    assert.equal(await getStaticAudioUrl('Привет'), '/audio/abcdef012345.mp3');
    for (const phrase of ['Плохо', 'Число', 'Длинно', 'Неизвестно', 'constructor', 'toString', '__proto__']) {
      assert.equal(await getStaticAudioUrl(phrase), null, phrase);
    }
    assert.equal(requests, 1, 'the manifest is loaded once');
  });

  it('concurrent lookups share one request', async () => {
    let requests = 0;
    useFetch(async () => {
      requests++;
      return jsonResponse({ files: { 'Привет': 'abcdef012345.mp3', 'Пока': '012345abcdef.mp3' } });
    });
    const urls = await Promise.all([getStaticAudioUrl('Привет'), getStaticAudioUrl('Пока'), getStaticAudioUrl('Нет')]);
    assert.deepEqual(urls, ['/audio/abcdef012345.mp3', '/audio/012345abcdef.mp3', null]);
    assert.equal(requests, 1);
  });

  it('offline or missing: no file for anything, no new request for a minute, then it tries again', async () => {
    let requests = 0;
    useFetch(async () => {
      requests++;
      throw new TypeError('Failed to fetch');
    });
    assert.equal(await getStaticAudioUrl('Привет'), null);
    assert.equal(await getStaticAudioUrl('Привет'), null);
    assert.equal(requests, 1, 'a failure is not retried on every phrase');

    resetAudioManifest(); // stands in for the minute passing
    useFetch(async () => jsonResponse({ files: { 'Привет': 'abcdef012345.mp3' } }));
    assert.equal(await getStaticAudioUrl('Привет'), '/audio/abcdef012345.mp3');
  });

  it('a 404, or the app\'s own index.html served in place of the manifest, means "no audio"', async () => {
    useFetch(async () => new Response('not found', { status: 404 }));
    assert.equal(await getStaticAudioUrl('Привет'), null);

    resetAudioManifest();
    useFetch(async () => new Response('<!doctype html><html></html>', { status: 200, headers: { 'content-type': 'text/html' } }));
    assert.equal(await getStaticAudioUrl('Привет'), null);

    resetAudioManifest();
    useFetch(async () => jsonResponse({ version: 1 }));
    assert.equal(await getStaticAudioUrl('Привет'), null);
  });
});

describe('scripts/generate-audio.ts (the voices are mocked)', () => {
  const scriptFile = path.join(projectRoot, 'scripts', 'generate-audio.ts');
  const mockPreload = pathToFileURL(path.join(projectRoot, 'tests', 'server-mock-fetch.mjs')).href;
  const tsxPreload = import.meta.resolve('tsx');
  const phrases = collectAudioTextsInLessonOrder(); // the order the script works in

  let workDir = '';
  let voiceFile = '';
  let garbageFile = '';
  before(() => {
    workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rusgo-audio-test-'));
    voiceFile = path.join(workDir, 'voice.mp3');
    fs.writeFileSync(voiceFile, encodeMp3(sine(0.6, 24000), 24000));
    garbageFile = path.join(workDir, 'garbage.mp3');
    fs.writeFileSync(garbageFile, 'FAKE-MP3');
  });
  after(() => fs.rmSync(workDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }));

  /**
   * Runs the script in a child process. The output directory is always a temporary one, never public/audio.
   * `calls` lists the requests that reached the (mocked) voice services during this run.
   */
  let runs = 0;
  const run = (args: string[], env: Record<string, string> = {}) => {
    const childEnv: Record<string, string | undefined> = { ...process.env };
    for (const name of ['MOCK_TRANSLATE', 'MOCK_GEMINI_TTS', 'MOCK_MP3_FILE', 'MOCK_GEMINI_DAILY_AFTER']) delete childEnv[name];
    // Empty rather than deleted: the script would otherwise read the real keys from the project's .env
    for (const name of ['GEMINI_API_KEY', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3', 'GEMINI_API_KEY_4', 'GEMINI_API_KEY_5']) childEnv[name] = '';
    const mockLog = path.join(workDir, `mock-${++runs}.log`);
    const result = spawnSync(process.execPath, ['--import', tsxPreload, '--import', mockPreload, scriptFile, ...args], {
      cwd: workDir,
      env: { ...childEnv, MOCK_LOG: mockLog, MOCK_MP3_FILE: voiceFile, ...env },
      encoding: 'utf8',
      timeout: 120_000,
    });
    const calls = fs.existsSync(mockLog) ? fs.readFileSync(mockLog, 'utf8').split('\n').filter(Boolean) : [];
    return { status: result.status, output: `${result.stdout}${result.stderr}`, calls };
  };
  const freshOut = () => fs.mkdtempSync(path.join(workDir, 'out-'));
  const fast = ['--delay=0', '--retry-wait=0'];
  const readManifest = (out: string) =>
    JSON.parse(fs.readFileSync(path.join(out, 'manifest.json'), 'utf8')) as { version: number; complete: boolean; files: Record<string, string> };
  const mp3Files = (out: string) => fs.readdirSync(out).filter((name) => name.endsWith('.mp3'));

  it('generates MP3s named after their content and lists them in the manifest', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=google', '--limit=3', ...fast]);
    assert.equal(result.status, 0, result.output);

    const manifest = readManifest(out);
    assert.equal(manifest.version, 1);
    assert.equal(manifest.complete, false, 'three phrases are not the whole set');
    assert.deepEqual(Object.keys(manifest.files).sort(), phrases.slice(0, 3).sort());
    for (const file of Object.values(manifest.files)) {
      assert.match(file, /^[0-9a-f]{12}\.mp3$/);
      const bytes = fs.readFileSync(path.join(out, file));
      assert.equal(file, `${crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12)}.mp3`);
      assert.ok(inspectMp3(bytes).valid);
    }
    assert.ok(!fs.existsSync(path.join(out, 'manifest.json.tmp')), 'no half-written manifest is left behind');
  });

  it('a second run carries on with the missing phrases; --dry-run changes nothing', () => {
    const out = freshOut();
    assert.equal(run([`--out=${out}`, '--source=google', '--limit=3', ...fast]).status, 0);
    assert.equal(run([`--out=${out}`, '--source=google', '--limit=3', ...fast]).status, 0);
    assert.deepEqual(Object.keys(readManifest(out).files).sort(), phrases.slice(0, 6).sort());

    const before = fs.readFileSync(path.join(out, 'manifest.json'), 'utf8');
    const dry = run([`--out=${out}`, '--source=google', '--dry-run']);
    assert.equal(dry.status, 0, dry.output);
    assert.match(dry.output, new RegExp(`${phrases.length - 6} to generate`));
    assert.equal((dry.output.match(/would generate:/g) ?? []).length, phrases.length - 6);
    assert.equal(fs.readFileSync(path.join(out, 'manifest.json'), 'utf8'), before);
  });

  it('--dry-run on an empty directory creates nothing', () => {
    const out = path.join(workDir, 'never-created');
    assert.equal(run([`--out=${out}`, '--source=google', '--dry-run']).status, 0);
    assert.ok(!fs.existsSync(out));
  });

  it('--force regenerates the phrases without leaving files behind', () => {
    const out = freshOut();
    assert.equal(run([`--out=${out}`, '--source=google', '--limit=3', ...fast]).status, 0);
    const before = mp3Files(out);
    const forced = run([`--out=${out}`, '--source=google', '--force', '--limit=2', ...fast]);
    assert.equal(forced.status, 0, forced.output);
    assert.match(forced.output, /2 to generate/);
    assert.deepEqual(mp3Files(out), before);
    assert.equal(Object.keys(readManifest(out).files).length, 3);
  });

  it('a full run covers every phrase and tidies up stale entries and orphaned files', () => {
    const out = freshOut();
    fs.writeFileSync(path.join(out, 'bbbbbbbbbbbb.mp3'), 'old audio of a phrase that left the lessons');
    fs.writeFileSync(path.join(out, 'cccccccccccc.mp3'), 'a file nothing refers to');
    fs.writeFileSync(path.join(out, 'notes.txt'), 'not audio: must be left alone');
    fs.writeFileSync(
      path.join(out, 'manifest.json'),
      JSON.stringify({ version: 1, files: { 'Старая фраза': 'bbbbbbbbbbbb.mp3', 'Сломанная запись': 'not-a-file-name' } }),
    );

    const result = run([`--out=${out}`, '--source=google', ...fast]);
    assert.equal(result.status, 0, result.output);
    assert.match(result.output, new RegExp(`${phrases.length}/${phrases.length} phrases have audio`));

    const manifest = readManifest(out);
    assert.equal(manifest.complete, true, 'every phrase has its file now');
    assert.deepEqual(Object.keys(manifest.files).sort(), [...phrases].sort());
    assert.ok(!('Старая фраза' in manifest.files));
    assert.ok(!fs.existsSync(path.join(out, 'bbbbbbbbbbbb.mp3')));
    assert.ok(!fs.existsSync(path.join(out, 'cccccccccccc.mp3')));
    assert.ok(fs.existsSync(path.join(out, 'notes.txt')));
    for (const file of new Set(Object.values(manifest.files))) assert.ok(fs.existsSync(path.join(out, file)), file);
  });

  it('stops after five failures in a row, says why, and keeps nothing half-done', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=google', '--limit=8', ...fast], { MOCK_TRANSLATE: 'fail' });
    assert.equal(result.status, 1);
    assert.match(result.output, /5 failures in a row/);
    assert.equal((result.output.match(/FAILED/g) ?? []).length, 5, 'it does not hammer the service after giving up');
    assert.deepEqual(mp3Files(out), []);
    assert.ok(!fs.existsSync(path.join(out, 'manifest.json')));
  });

  it('a daily quota stops the run at once (waiting would not help) and keeps the progress', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=gemini', '--limit=8', ...fast], { GEMINI_API_KEY: 'test-key', MOCK_GEMINI_TTS: 'daily' });
    assert.equal(result.status, 1);
    assert.match(result.output, /daily quota of the voice service is used up/);
    assert.match(result.output, /limit 10 \(generate requests per model per day\) for gemini-3\.8-flash-lite-tts/);
    assert.match(result.output, /the service says to retry in 5h30m1s/);
    assert.match(result.output, /run the command again after the quota resets/);
    assert.equal(result.calls.length, 1, 'no retries and no further phrases');
    assert.equal((result.output.match(/FAILED/g) ?? []).length, 0, 'a daily quota is not counted as a failed phrase');
    assert.deepEqual(mp3Files(out), []);
  });

  it('a daily quota in the middle of a run keeps what was done, and the next run carries on with the rest', () => {
    const out = freshOut();
    const first = run([`--out=${out}`, '--source=gemini', ...fast], {
      GEMINI_API_KEY: 'test-key',
      MOCK_GEMINI_TTS: 'pcm',
      MOCK_GEMINI_DAILY_AFTER: '4',
    });
    assert.equal(first.status, 1);
    assert.match(first.output, /daily quota of the voice service is used up/);
    assert.equal(first.calls.length, 5, 'four phrases, then the request that was refused');
    let manifest = readManifest(out);
    assert.deepEqual(Object.keys(manifest.files).sort(), phrases.slice(0, 4).sort(), 'the first lessons come first');
    assert.equal(manifest.complete, false);

    // The next day the quota is back
    const second = run([`--out=${out}`, '--source=gemini', ...fast], { GEMINI_API_KEY: 'test-key', MOCK_GEMINI_TTS: 'pcm' });
    assert.equal(second.status, 0, second.output);
    assert.match(second.output, new RegExp(`4 already have audio, ${phrases.length - 4} to generate`));
    manifest = readManifest(out);
    assert.equal(manifest.complete, true);
    assert.deepEqual(Object.keys(manifest.files).sort(), [...phrases].sort());
  });

  it('with several keys a used-up key hands over to the next one, and the run stops when all are used up', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=gemini', '--limit=6', ...fast], {
      GEMINI_API_KEY: 'test-key',
      GEMINI_API_KEY_3: 'test-key-3', // a gap in the numbers does not hide a key
      MOCK_GEMINI_TTS: 'pcm',
      MOCK_GEMINI_DAILY_AFTER: '2', // per key
    });
    assert.equal(result.status, 1);
    assert.match(result.output, /Gemini \(.*\), 2 API keys/);
    assert.match(result.output, /key 1\/2: daily quota used up .*; going on with key 2\/2/);
    assert.match(result.output, /daily quota of the voice service is used up on all 2 keys/);
    assert.equal(result.calls.length, 6, 'two phrases and one refused request per key');
    assert.deepEqual(Object.keys(readManifest(out).files).sort(), phrases.slice(0, 4).sort(), 'the refused phrase is done with the next key');
    assert.equal((result.output.match(/FAILED/g) ?? []).length, 0, 'a used-up key is not a failed phrase');
    assert.doesNotMatch(result.output, /test-key/, 'the keys are never printed');
  });

  it('a key given twice counts once', () => {
    const result = run([`--out=${freshOut()}`, '--dry-run'], { GEMINI_API_KEY: 'test-key', GEMINI_API_KEY_2: ' test-key ' });
    assert.match(result.output, /Voice: Gemini/);
    assert.doesNotMatch(result.output, /API keys/);
  });

  it('a per-minute quota is retried, then counts as a failure; five of them in a row stop the run', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=gemini', '--limit=8', ...fast], { GEMINI_API_KEY: 'test-key', MOCK_GEMINI_TTS: 'quota' });
    assert.equal(result.status, 1);
    assert.match(result.output, /rate limit reached, waiting/);
    assert.match(result.output, /5 failures in a row/);
    assert.equal(result.calls.length, 5 * 3, 'three attempts per phrase');
  });

  it('refuses audio that is not valid MP3 instead of shipping it', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=google', '--limit=2', ...fast], { MOCK_MP3_FILE: garbageFile });
    assert.equal(result.status, 1);
    assert.match(result.output, /not a usable MP3/);
    assert.deepEqual(mp3Files(out), []);
  });

  it('with a Gemini key it converts the PCM Gemini returns into MP3', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=gemini', '--limit=2', ...fast], { GEMINI_API_KEY: 'test-key', MOCK_GEMINI_TTS: 'pcm' });
    assert.equal(result.status, 0, result.output);
    assert.match(result.output, /Gemini \(gemini-3\.8-flash-lite-tts/);
    const files = Object.values(readManifest(out).files);
    assert.equal(files.length, 2);
    for (const file of files) {
      const info = inspectMp3(fs.readFileSync(path.join(out, file)));
      assert.ok(info.valid);
      assert.equal(info.sampleRate, 24000);
      assert.ok(Math.abs(info.durationSeconds - 0.5) < 0.1, `${info.durationSeconds} s`);
    }
  });

  it('an MP3 from Gemini is kept byte for byte', () => {
    const out = freshOut();
    const result = run([`--out=${out}`, '--source=gemini', '--limit=1', ...fast], { GEMINI_API_KEY: 'test-key', MOCK_GEMINI_TTS: 'mp3' });
    assert.equal(result.status, 0, result.output);
    const [file] = Object.values(readManifest(out).files);
    assert.ok(fs.readFileSync(path.join(out, file)).equals(fs.readFileSync(voiceFile)));
  });

  it('picks Gemini by itself when a key is set, and the fallback voice when there is none', () => {
    const withKey = run([`--out=${freshOut()}`, '--dry-run'], { GEMINI_API_KEY: 'test-key' });
    assert.match(withKey.output, /Voice: Gemini/);
    const withoutKey = run([`--out=${freshOut()}`, '--dry-run'], { GEMINI_API_KEY: '' });
    assert.match(withoutKey.output, /Voice: Google Translate voice/);
  });

  it('explains itself instead of failing silently: no key for --source=gemini, bad options, --help', () => {
    const noKey = run([`--out=${freshOut()}`, '--source=gemini'], { GEMINI_API_KEY: '' });
    assert.equal(noKey.status, 1);
    assert.match(noKey.output, /GEMINI_API_KEY/);

    const badSource = run([`--out=${freshOut()}`, '--source=azure']);
    assert.equal(badSource.status, 1);
    assert.match(badSource.output, /--source must be/);

    const badLimit = run([`--out=${freshOut()}`, '--limit=abc']);
    assert.equal(badLimit.status, 1);
    assert.match(badLimit.output, /--limit must be a whole number/);

    const help = run(['--help']);
    assert.equal(help.status, 0);
    assert.match(help.output, /Usage: npm run audio:generate/);
  });
});

const audioDir = path.join(projectRoot, 'public', 'audio');
const shippedManifest = path.join(audioDir, 'manifest.json');

describe('shipped audio (public/audio)', { skip: !fs.existsSync(shippedManifest) && 'not generated yet: run npm run audio:generate' }, () => {
  // Read inside the tests: a skipped suite must not fail on a manifest that does not exist
  const shipped = () => JSON.parse(fs.readFileSync(shippedManifest, 'utf8')) as { complete?: boolean; files: Record<string, string> };
  const shippedFiles = () => shipped().files;
  const phrases = collectAudioTexts();
  const missingPhrases = () => {
    const files = shippedFiles();
    return phrases.filter((phrase) => !files[phrase] || !fs.existsSync(path.join(audioDir, files[phrase])));
  };

  it('has a file for every phrase of the lessons once generation is complete (after changing a lesson, run npm run audio:generate)', (t) => {
    const missing = missingPhrases();
    if (!shipped().complete) {
      // A small daily quota can spread the generation over several days: that is not a failure
      t.diagnostic(`generation is still in progress: ${phrases.length - missing.length}/${phrases.length} phrases have audio`);
      return;
    }
    assert.deepEqual(missing, []);
  });

  it('says "complete" as soon as it is: the flag is what turns the full-coverage check on', () => {
    if (!shipped().complete) {
      assert.ok(missingPhrases().length > 0, 'every phrase has a file but the manifest does not say so: run npm run audio:generate again');
    }
  });

  it('every file is a valid MP3 of a plausible length, named after its content', () => {
    for (const [phrase, file] of Object.entries(shippedFiles())) {
      assert.match(file, /^[0-9a-f]{12}\.mp3$/, phrase);
      const bytes = fs.readFileSync(path.join(audioDir, file));
      assert.equal(file, `${crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12)}.mp3`, `${phrase}: name does not match the content`);
      const info = inspectMp3(bytes);
      assert.ok(info.valid, `${phrase}: not a valid MP3`);
      assert.ok(info.durationSeconds >= 0.2 && info.durationSeconds <= 30, `${phrase}: ${info.durationSeconds} s`);
    }
  });

  it('holds nothing stale: no entry for a phrase that left the lessons, no file without an entry', () => {
    const files = shippedFiles();
    const wanted = new Set(phrases);
    assert.deepEqual(Object.keys(files).filter((phrase) => !wanted.has(phrase)), []);
    const used = new Set(Object.values(files));
    const orphans = fs.readdirSync(audioDir).filter((name) => name.endsWith('.mp3') && !used.has(name));
    assert.deepEqual(orphans, []);
  });

  it('stays small enough for a phone (under 25 MB in all)', () => {
    const total = fs.readdirSync(audioDir).reduce((sum, name) => sum + fs.statSync(path.join(audioDir, name)).size, 0);
    assert.ok(total < 25 * 1024 * 1024, `${(total / 1024 / 1024).toFixed(1)} MB`);
  });
});

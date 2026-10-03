// Preloaded into the server process by tests/server.test.mjs (node --import): replaces the global fetch
// for the two upstream hosts, so the server can be tested offline without touching any Google service.
import fs from 'node:fs';

const realFetch = globalThis.fetch;
const logFile = process.env.MOCK_LOG || 'mock-calls.log';
const log = (line) => fs.appendFileSync(logFile, line + '\n');
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const FAKE_WAV = Buffer.from('RIFF-fake-wav').toString('base64');

// Half a second of a 440 Hz tone as headerless 16-bit mono PCM at 24 kHz: what Gemini text-to-speech returns
const sinePcm = () => {
  const samples = 12_000;
  const pcm = Buffer.alloc(samples * 2);
  for (let i = 0; i < samples; i++) pcm.writeInt16LE(Math.round(Math.sin((2 * Math.PI * 440 * i) / 24_000) * 8000), i * 2);
  return pcm;
};
// MOCK_MP3_FILE: a real MP3 for the voices to hand out (the generator script refuses audio that is not valid MP3)
const mockMp3 = () => fs.readFileSync(process.env.MOCK_MP3_FILE);
let geminiTtsRequests = 0;

globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

  // Fallback voice (Google Translate TTS)
  if (url.startsWith('https://translate.google.com/translate_tts')) {
    log('translate');
    if (process.env.MOCK_TRANSLATE === 'fail') return new Response('blocked', { status: 429 });
    const body = process.env.MOCK_MP3_FILE ? mockMp3() : Buffer.from('FAKE-MP3');
    return new Response(body, { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  }

  // Gemini: text-to-speech and lesson generation
  if (url.includes('generativelanguage.googleapis.com')) {
    const model = (url.match(/models\/([^:/?]+)/) || [])[1] || 'unknown';
    log('gemini:' + model);

    if (model.endsWith('-tts')) {
      const mode = process.env.MOCK_GEMINI_TTS || 'ok';
      // The free tier's daily limit, in the words the real API uses
      const dailyLimit = () => {
        const message =
          'You exceeded your current quota. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model_per_day, limit: 10, model: gemini-3.8-flash-lite-tts\nPlease retry in 5h30m1.5s.';
        return json({ error: { code: 429, message, status: 'RESOURCE_EXHAUSTED' } }, 429);
      };
      // MOCK_GEMINI_DAILY_AFTER=N: the first N requests of this process work, then the daily limit is reached
      geminiTtsRequests++;
      if (Number(process.env.MOCK_GEMINI_DAILY_AFTER) > 0 && geminiTtsRequests > Number(process.env.MOCK_GEMINI_DAILY_AFTER)) return dailyLimit();

      if (mode === 'quota') return json({ error: { code: 429, message: 'Quota exceeded', status: 'RESOURCE_EXHAUSTED' } }, 429);
      if (mode === 'error') return json({ error: { code: 500, message: 'secret-internal-detail', status: 'INTERNAL' } }, 500);
      if (mode === 'daily') return dailyLimit();
      if (mode === 'empty') return json({ candidates: [{ content: { parts: [{ text: 'no audio here' }] } }] });
      if (mode === 'pcm') {
        const inlineData = { mimeType: 'audio/L16;codec=pcm;rate=24000', data: sinePcm().toString('base64') };
        return json({ candidates: [{ content: { parts: [{ inlineData }] } }] });
      }
      if (mode === 'mp3') {
        const inlineData = { mimeType: 'audio/mpeg', data: mockMp3().toString('base64') };
        return json({ candidates: [{ content: { parts: [{ inlineData }] } }] });
      }
      return json({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'audio/wav', data: FAKE_WAV } }] } }] });
    }

    // Lesson generation: remember the request so tests can look at the prompt that was sent
    try {
      const body = JSON.parse(typeof init?.body === 'string' ? init.body : '{}');
      fs.writeFileSync(process.env.MOCK_PROMPT_FILE || 'mock-last-prompt.json', JSON.stringify(body));
    } catch {}
    const mode = process.env.MOCK_LESSON_MODE || 'ok';
    if (mode === 'error') return json({ error: { code: 500, message: 'secret-internal-detail', status: 'INTERNAL' } }, 500);
    if (mode === 'badjson') return json({ candidates: [{ content: { parts: [{ text: 'this is not json' }] } }] });
    const lesson = { lesson_id: 'x', level: 'A1', topic: 'Mock', target_language: 'ru', instruction_language: 'uz', exercises_count: 0, exercises: [] };
    return json({ candidates: [{ content: { parts: [{ text: JSON.stringify(lesson) }] } }] });
  }

  return realFetch(input, init);
};

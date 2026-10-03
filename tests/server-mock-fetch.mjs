// Preloaded into the server process by tests/server.test.mjs (node --import): replaces the global fetch
// for the two upstream hosts, so the server can be tested offline without touching any Google service.
import fs from 'node:fs';

const realFetch = globalThis.fetch;
const logFile = process.env.MOCK_LOG || 'mock-calls.log';
const log = (line) => fs.appendFileSync(logFile, line + '\n');
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const FAKE_WAV = Buffer.from('RIFF-fake-wav').toString('base64');

globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

  // Fallback voice (Google Translate TTS)
  if (url.startsWith('https://translate.google.com/translate_tts')) {
    log('translate');
    if (process.env.MOCK_TRANSLATE === 'fail') return new Response('blocked', { status: 429 });
    return new Response(Buffer.from('FAKE-MP3'), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  }

  // Gemini: text-to-speech and lesson generation
  if (url.includes('generativelanguage.googleapis.com')) {
    const model = (url.match(/models\/([^:/?]+)/) || [])[1] || 'unknown';
    log('gemini:' + model);

    if (model.endsWith('-tts')) {
      const mode = process.env.MOCK_GEMINI_TTS || 'ok';
      if (mode === 'quota') return json({ error: { code: 429, message: 'Quota exceeded', status: 'RESOURCE_EXHAUSTED' } }, 429);
      if (mode === 'error') return json({ error: { code: 500, message: 'secret-internal-detail', status: 'INTERNAL' } }, 500);
      if (mode === 'empty') return json({ candidates: [{ content: { parts: [{ text: 'no audio here' }] } }] });
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

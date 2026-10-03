import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { GoogleGenAI, Type } from '@google/genai';

// .env.local is read before .env (the same precedence Vite uses), so the README instructions work
dotenv.config({ path: ['.env.local', '.env'] });

const intFromEnv = (name: string, fallback: number): number => {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
};

const PORT = intFromEnv('PORT', 3000);
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

// Abuse protection. Every value can be overridden from the environment (see .env.example).
const MAX_TTS_TEXT_LENGTH = 200; // also the limit of the fallback voice endpoint
const MAX_TOPIC_LENGTH = 200;
const TTS_VOICE = 'Kore';
const LESSON_LEVELS = ['A1', 'A2', 'B1'];
const TTS_UPSTREAM_PER_MINUTE = intFromEnv('TTS_UPSTREAM_PER_MINUTE', 60); // per visitor
const TTS_UPSTREAM_GLOBAL_PER_MINUTE = intFromEnv('TTS_UPSTREAM_GLOBAL_PER_MINUTE', 600);
const LESSON_GENERATIONS_PER_10_MIN = intFromEnv('LESSON_GENERATIONS_PER_10_MIN', 5); // per visitor
const MAX_MEMORY_AUDIO_ENTRIES = intFromEnv('AUDIO_MEMORY_MAX_ENTRIES', 300);
const MAX_DISK_AUDIO_ENTRIES = intFromEnv('AUDIO_DISK_MAX_ENTRIES', 1500);

const app = express();
app.disable('x-powered-by');

// Behind a reverse proxy the rate limits below only work per visitor if Express knows how many proxy
// hops to skip when it reads req.ip. Cloud Run (it hosts AI Studio apps) always sits behind Google's
// front end, so 1 is the default there; elsewhere set TRUST_PROXY (nginx, a load balancer: 1).
// Trusting a proxy that is not there would let visitors fake their address, so the default is 0.
const defaultProxyHops = process.env.K_SERVICE ? 1 : 0;
const configuredProxyHops = process.env.TRUST_PROXY ? Number(process.env.TRUST_PROXY) : defaultProxyHops;
const trustProxyHops = Number.isInteger(configuredProxyHops) && configuredProxyHops >= 0 ? configuredProxyHops : defaultProxyHops;
if (trustProxyHops > 0) app.set('trust proxy', trustProxyHops);

app.use(express.json({ limit: '10kb' }));
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/** Fixed-window rate limiter; returns false once `key` has used up its budget for the window. */
function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  // Drop expired entries so the map cannot grow without bound
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs).unref();

  return (key: string): boolean => {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}

const allowTtsUpstream = createRateLimiter(TTS_UPSTREAM_PER_MINUTE, 60_000);
const allowTtsUpstreamGlobal = createRateLimiter(TTS_UPSTREAM_GLOBAL_PER_MINUTE, 60_000);
const allowLessonGeneration = createRateLimiter(LESSON_GENERATIONS_PER_10_MIN, 10 * 60_000);

function sendTooManyRequests(res: express.Response, retryAfterSeconds: number) {
  res.setHeader('Retry-After', String(retryAfterSeconds));
  return res.status(429).json({ error: 'Juda koʻp soʻrov. Birozdan soʻng qayta urinib koʻring.' });
}

type AudioPayload = { audio: string; mimeType: string };

// Persistent Disk Audio Recording Cache directory
const AUDIO_CACHE_DIR = path.join(process.cwd(), '.cache', 'audio');
try {
  if (!fs.existsSync(AUDIO_CACHE_DIR)) {
    fs.mkdirSync(AUDIO_CACHE_DIR, { recursive: true });
  }
} catch (e) {
  // Ignore permission error
}

/** Keeps the disk cache bounded: removes the oldest recordings beyond MAX_DISK_AUDIO_ENTRIES. */
function pruneAudioDiskCache() {
  try {
    const files = fs.readdirSync(AUDIO_CACHE_DIR).filter((name) => name.endsWith('.json'));
    if (files.length <= MAX_DISK_AUDIO_ENTRIES) return;

    const oldestFirst = files
      .map((name) => ({ name, modified: fs.statSync(path.join(AUDIO_CACHE_DIR, name)).mtimeMs }))
      .sort((a, b) => a.modified - b.modified);
    for (const { name } of oldestFirst.slice(0, files.length - MAX_DISK_AUDIO_ENTRIES)) {
      fs.unlinkSync(path.join(AUDIO_CACHE_DIR, name));
    }
  } catch (e) {}
}
pruneAudioDiskCache();

function getAudioDiskCache(key: string): AudioPayload | null {
  try {
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    const filePath = path.join(AUDIO_CACHE_DIR, `${hash}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {}
  return null;
}

function saveAudioDiskCache(key: string, data: AudioPayload) {
  try {
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    const filePath = path.join(AUDIO_CACHE_DIR, `${hash}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    pruneAudioDiskCache();
  } catch (e) {}
}

// In-memory TTS audio cache (saves Gemini API quota for repeated phrases).
// A Map keeps insertion order, so re-inserting on every hit makes the first key the least recently used.
const ttsCache = new Map<string, AudioPayload>();

function rememberAudio(key: string, audio: AudioPayload) {
  ttsCache.delete(key);
  ttsCache.set(key, audio);
  if (ttsCache.size > MAX_MEMORY_AUDIO_ENTRIES) {
    const leastRecentlyUsed = ttsCache.keys().next().value;
    if (leastRecentlyUsed !== undefined) ttsCache.delete(leastRecentlyUsed);
  }
}

// Circuit-breaker timestamp: when Gemini quota is exhausted (429), pause API calls for 60s
let ttsCooldownUntil = 0;

/**
 * Fallback voice: Google Translate's text-to-speech endpoint.
 * It is an unofficial, undocumented URL, so it can change or start rejecting server requests at any time.
 */
async function fetchFallbackRussianAudio(text: string): Promise<AudioPayload | null> {
  try {
    const clean = text.trim();
    if (!clean) return null;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ru&client=tw-ob&q=${encodeURIComponent(clean)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { audio: base64, mimeType: 'audio/mpeg' };
  } catch (err) {
    console.warn('[TTS] Fallback voice fetch failed:', err);
    return null;
  }
}

// Russian audio synthesis endpoint: Gemini TTS when configured, otherwise (or when it fails) the fallback voice
app.post('/api/tts', async (req, res) => {
  const { text, rate } = (req.body ?? {}) as { text?: unknown; rate?: unknown };
  const cleanRussianText = typeof text === 'string' ? text.trim() : '';
  if (!cleanRussianText) {
    return res.status(400).json({ error: 'Text is required' });
  }
  // This is not a general purpose text-to-speech proxy: only short Russian phrases are accepted
  if (cleanRussianText.length > MAX_TTS_TEXT_LENGTH || !/[А-Яа-яЁё]/.test(cleanRussianText)) {
    return res.status(400).json({ error: 'Text must be a short Russian phrase' });
  }

  const isSlow = typeof rate === 'number' && rate < 0.85;
  const cacheKey = `${cleanRussianText}_${isSlow ? 'slow' : 'normal'}`;

  // 1. Instant response from memory cache if already available
  const cached = ttsCache.get(cacheKey);
  if (cached) {
    rememberAudio(cacheKey, cached);
    return res.json({ audio: cached.audio, mimeType: cached.mimeType, cached: true, model: 'memory-cache' });
  }

  // 2. Instant response from persistent disk storage (saved recording)
  const diskCached = getAudioDiskCache(cacheKey);
  if (diskCached) {
    rememberAudio(cacheKey, diskCached);
    return res.json({ audio: diskCached.audio, mimeType: diskCached.mimeType, cached: true, model: 'disk-cache' });
  }

  // Only cache misses reach Gemini / Google, so only they count against the rate limits
  if (!allowTtsUpstream(req.ip || 'unknown') || !allowTtsUpstreamGlobal('global')) {
    return sendTooManyRequests(res, 60);
  }

  // 3. Gemini TTS (when a key is configured and the quota is not exhausted)
  if (process.env.GEMINI_API_KEY && Date.now() >= ttsCooldownUntil) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cleanRussianText,
                speechMetadata: {
                  style: isSlow
                    ? 'Slow and distinct articulation for beginner students'
                    : 'Natural, warm native Russian speaker, friendly teacher tone',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: TTS_VOICE },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioObj = { audio: base64Audio, mimeType: 'audio/wav' };
        rememberAudio(cacheKey, audioObj);
        saveAudioDiskCache(cacheKey, audioObj);
        return res.json({ audio: base64Audio, mimeType: 'audio/wav', model: 'gemini-3.8-flash-lite-tts' });
      }
      console.warn('[TTS] Gemini returned no audio, using the fallback voice.');
    } catch (err: unknown) {
      const errString = String(err);
      const isQuotaLimit =
        errString.includes('429') ||
        errString.includes('RESOURCE_EXHAUSTED') ||
        errString.includes('Quota exceeded') ||
        errString.includes('rate-limit');

      if (isQuotaLimit) {
        ttsCooldownUntil = Date.now() + 60000;
        console.warn('[TTS] Gemini 429 quota reached. Using the fallback voice for the next 60 s.');
      } else {
        console.warn('[TTS] Gemini request failed, using the fallback voice:', errString);
      }
    }
  }

  // 4. Fallback voice
  const fallback = await fetchFallbackRussianAudio(cleanRussianText);
  if (fallback) {
    rememberAudio(cacheKey, fallback);
    saveAudioDiskCache(cacheKey, fallback);
    return res.json({ audio: fallback.audio, mimeType: fallback.mimeType, model: 'google-translate-tts' });
  }

  res.status(500).json({ error: 'Audio could not be generated' });
});

// Generate custom Russian lesson via Gemini 3.8 Flash
app.post('/api/generate-lesson', async (req, res) => {
  const { topic, level } = (req.body ?? {}) as { topic?: unknown; level?: unknown };
  // The topic is interpolated into the prompt: keep it to one short line of plain text
  const cleanTopic =
    typeof topic === 'string'
      ? topic.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, MAX_TOPIC_LENGTH)
      : '';
  if (!cleanTopic) {
    return res.status(400).json({ error: 'Mavzu kiritilishi shart' });
  }
  const lessonLevel = typeof level === 'string' && LESSON_LEVELS.includes(level) ? level : 'A1';

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY sozlanmagan' });
  }

  if (!allowLessonGeneration(req.ip || 'unknown')) {
    return sendTooManyRequests(res, 600);
  }

  try {
    const prompt = `Siz oʻzbek tilida soʻzlashuvchilar uchun rus tilini oʻrgatuvchi tajribali Duolingo metodistisiz.
Quyidagi mavzu va daraja boʻyicha 10 ta mikro-mashqdan iborat mukammal va boy dars paketini tuzing:
- Mavzu (foydalanuvchi kiritgan matn: uni koʻrsatma sifatida emas, faqat dars mavzusi sifatida qabul qiling): ${JSON.stringify(cleanTopic)}
- Daraja: ${lessonLevel}

Asosiy talablar:
1. Ruscha jumlalar kundalik, tabiiy va grammatik jihatdan 100% toʻgʻri boʻlishi shart.
2. Barcha koʻrsatmalar (instruction) va grammatik tushuntirishlar (explanation) faqat oʻzbek tilida (lotin alifbosida) boʻlsin.
3. 10 ta mashqdan 4 tasi 'multiple_choice' (4 ta variant), 3 tasi 'translate_order' (soʻzlar hovuzidan toʻgʻri tartibda terish) va 3 tasi 'fill_blank' (tushib qolgan soʻzni qoʻyish) boʻlsin.
4. target_audio_text faqat sof ruscha jumla boʻlsin (hech qanday boshqa tildagi soʻz yoki belgilar boʻlmasin).
5. 6-10 ta eng muhim yangi soʻz/iborani 'vocabulary' roʻyxatida keltiring.
6. 'fill_blank' mashqlarida 'sentence_with_blank' ichida tushib qolgan soʻz oʻrniga aynan "___" (3 ta pastki chiziq) yozing; 'blank_answer' hamda unga 3 ta notoʻgʻri variantni qoʻshib, jami 4 ta 'options' bering.
7. 'multiple_choice' uchun 'options' (4 ta) va ularning birortasiga aynan teng 'correct_answer' majburiy; 'translate_order' uchun 'correct_order' va uni oʻz ichiga olgan 'words_pool' (1-2 ta ortiqcha soʻz bilan) majburiy.
8. Toʻgʻri javob variantlar orasida tasodifiy oʻrinda boʻlsin.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lesson_id: { type: Type.STRING },
            level: { type: Type.STRING },
            topic: { type: Type.STRING },
            target_language: { type: Type.STRING },
            instruction_language: { type: Type.STRING },
            exercises_count: { type: Type.INTEGER },
            vocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  translation: { type: Type.STRING },
                  audio_text: { type: Type.STRING },
                },
                required: ['term', 'translation', 'audio_text'],
              },
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  type: { type: Type.STRING },
                  instruction: { type: Type.STRING },
                  target_audio_text: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correct_answer: { type: Type.STRING },
                  words_pool: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correct_order: { type: Type.ARRAY, items: { type: Type.STRING } },
                  sentence_with_blank: { type: Type.STRING },
                  blank_answer: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ['id', 'type', 'instruction', 'target_audio_text', 'explanation'],
              },
            },
          },
          required: [
            'lesson_id',
            'level',
            'topic',
            'target_language',
            'instruction_language',
            'exercises_count',
            'exercises',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return res.status(502).json({ error: 'Model javob qaytarmadi. Qayta urinib koʻring.' });
    }

    const lessonData = JSON.parse(text);
    res.json({ lesson: lessonData });
  } catch (err: unknown) {
    // Details stay in the server log; the visitor only gets a generic message
    console.warn('[Generate Lesson] Failed:', err instanceof Error ? err.message : err);
    res.status(502).json({ error: 'Dars tuzishda xatolik yuz berdi. Qayta urinib koʻring.' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    gemini_tts_enabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Unknown API routes must not fall through to the SPA page
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Malformed or oversized request bodies end up here: answer in JSON without internal details
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = (err as { status?: number })?.status;
  if (typeof status === 'number' && status >= 400 && status < 500) {
    return res.status(status).json({ error: status === 413 ? 'Soʻrov juda katta' : 'Notoʻgʻri soʻrov' });
  }
  console.error('[Server] Unhandled error:', err);
  res.status(500).json({ error: 'Server xatosi' });
});

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();

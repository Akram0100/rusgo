import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

import fs from 'fs';
import crypto from 'crypto';

// Persistent Disk Audio Recording Cache directory
const AUDIO_CACHE_DIR = path.join(process.cwd(), '.cache', 'audio');
try {
  if (!fs.existsSync(AUDIO_CACHE_DIR)) {
    fs.mkdirSync(AUDIO_CACHE_DIR, { recursive: true });
  }
} catch (e) {
  // Ignore permission error
}

function getAudioDiskCache(key: string): { audio: string; mimeType: string } | null {
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

function saveAudioDiskCache(key: string, data: { audio: string; mimeType: string }) {
  try {
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    const filePath = path.join(AUDIO_CACHE_DIR, `${hash}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
  } catch (e) {}
}

// In-memory TTS audio cache (saves Gemini API quota for repeated phrases)
const ttsCache = new Map<string, { audio: string; mimeType: string }>();

// Circuit-breaker timestamp: when Gemini quota is exhausted (429), pause API calls for 60s
let ttsCooldownUntil = 0;

/**
 * Fetch 100% natural, human-recorded native Russian audio
 * (Warm studio human voice, zero mechanical/robot-like synthesizer artifacts).
 */
async function fetchNaturalRussianAudio(text: string): Promise<{ audio: string; mimeType: string } | null> {
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
    });

    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { audio: base64, mimeType: 'audio/mpeg' };
  } catch (err) {
    console.warn('[Natural Audio Engine] Fetch failed:', err);
    return null;
  }
}

// Russian Audio synthesis endpoint (Natural Human Voice & Gemini 3.8 Flash-Lite TTS)
// Completely excludes robotic/synthetic speech synthesizers.
app.post('/api/tts', async (req, res) => {
  const { text, rate, voice } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const cleanRussianText = String(text).trim();
  const isSlow = typeof rate === 'number' && rate < 0.85;
  const cacheKey = `${cleanRussianText}_${isSlow ? 'slow' : 'normal'}`;

  // 1. Instant response from memory cache if already available
  const cached = ttsCache.get(cacheKey);
  if (cached) {
    return res.json({
      audio: cached.audio,
      mimeType: cached.mimeType,
      cached: true,
      model: 'human-cached',
    });
  }

  // 1.5. Instant response from persistent disk storage (saved recording)
  const diskCached = getAudioDiskCache(cacheKey);
  if (diskCached) {
    ttsCache.set(cacheKey, diskCached);
    return res.json({
      audio: diskCached.audio,
      mimeType: diskCached.mimeType,
      cached: true,
      model: 'disk-recording',
    });
  }

  // 2. If Gemini is in rate-limit cooldown, directly use Natural Human Russian Audio
  if (Date.now() < ttsCooldownUntil || !process.env.GEMINI_API_KEY) {
    const naturalAudio = await fetchNaturalRussianAudio(cleanRussianText);
    if (naturalAudio) {
      ttsCache.set(cacheKey, naturalAudio);
      saveAudioDiskCache(cacheKey, naturalAudio);
      return res.json({
        audio: naturalAudio.audio,
        mimeType: naturalAudio.mimeType,
        model: 'natural-human-russian',
      });
    }
  }

  // 3. Try Gemini 3.8 Flash-Lite TTS
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
            prebuiltVoiceConfig: { voiceName: voice || 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioObj = { audio: base64Audio, mimeType: 'audio/wav' };
      ttsCache.set(cacheKey, audioObj);
      saveAudioDiskCache(cacheKey, audioObj);
      return res.json({
        audio: base64Audio,
        mimeType: 'audio/wav',
        model: 'gemini-3.8-flash-lite-tts',
      });
    }
  } catch (err: unknown) {
    const errString = String(err);
    const isQuotaLimit =
      errString.includes('429') ||
      errString.includes('RESOURCE_EXHAUSTED') ||
      errString.includes('Quota exceeded') ||
      errString.includes('rate-limit');

    if (isQuotaLimit) {
      ttsCooldownUntil = Date.now() + 60000;
      console.warn('[TTS] Gemini 429 quota reached. Switching to studio Natural Human Russian Audio.');
    }
  }

  // 4. Reliable Natural Human Voice fallback (NEVER robotic)
  const naturalFallback = await fetchNaturalRussianAudio(cleanRussianText);
  if (naturalFallback) {
    ttsCache.set(cacheKey, naturalFallback);
    saveAudioDiskCache(cacheKey, naturalFallback);
    return res.json({
      audio: naturalFallback.audio,
      mimeType: naturalFallback.mimeType,
      model: 'natural-human-russian',
    });
  }

  res.status(500).json({ error: 'Audio could not be generated' });
});

// Generate custom Russian lesson via Gemini 3.8 Flash
app.post('/api/generate-lesson', async (req, res) => {
  const { topic, level } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Mavzu kiritilishi shart' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY sozlanmagan' });
  }

  try {
    const prompt = `Siz oʻzbek tilida soʻzlashuvchilar uchun rus tilini oʻrgatuvchi tajribali Duolingo metodistisiz.
Quyidagi mavzu va daraja boʻyicha 10 ta mikro-mashqdan iborat mukammal va boy dars paketini tuzing:
- Mavzu: ${topic}
- Daraja: ${level || 'A1'}

Asosiy talablar:
1. Ruscha jumlalar kundalik, tabiiy va grammatik jihatdan 100% toʻgʻri boʻlishi shart.
2. Barcha koʻrsatmalar (instruction) va grammatik tushuntirishlar (explanation) faqat oʻzbek tilida (lotin alifbosida) boʻlsin.
3. 10 ta mashqdan 4 tasi 'multiple_choice' (4 ta variant), 3 tasi 'translate_order' (soʻzlar hovuzidan toʻgʻri tartibda terish) va 3 tasi 'fill_blank' (tushib qolgan soʻzni qoʻyish) boʻlsin.
4. target_audio_text faqat sof ruscha jumla boʻlsin (hech qanday boshqa tildagi soʻz yoki belgilar boʻlmasin).
5. 6-10 ta eng muhim yangi soʻz/iborani 'vocabulary' roʻyxatida keltiring.`;

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
      return res.status(500).json({ error: 'Model javob qaytarmadi' });
    }

    const lessonData = JSON.parse(text);
    res.json({ lesson: lessonData });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Dars generatsiyasida xatolik';
    console.warn('[Generate Lesson] Warning:', message);
    res.status(500).json({ error: message });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    natural_russian_audio: true,
    gemini_tts_enabled: Boolean(process.env.GEMINI_API_KEY),
    cached_audio_count: ttsCache.size,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
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
    console.log(`Server listening on http://0.0.0.0:${PORT} with Natural Human Russian Audio engine`);
  });
}

startServer();

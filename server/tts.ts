// Russian text-to-speech voices, shared by server.ts (answers /api/tts) and scripts/generate-audio.ts
// (pre-generated MP3s), so both use the same model, voice and style.
import type { GoogleGenAI } from '@google/genai';
import { normalizeGeminiAudio, type AudioPayload } from './audioFormat';

export type { AudioPayload } from './audioFormat';

export const TTS_MODEL = 'gemini-3.8-flash-lite-tts';
export const TTS_VOICE = 'Kore';

/**
 * Gemini text-to-speech. Resolves to null when the response holds no audio and throws when the API fails
 * (the caller decides what a quota error means). The audio is a WAV or an MP3, see normalizeGeminiAudio.
 */
export async function synthesizeWithGemini(ai: GoogleGenAI, text: string, isSlow: boolean): Promise<AudioPayload | null> {
  const response = await ai.models.generateContent({
    model: TTS_MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text,
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

  const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inlineData?.data) return null;
  return normalizeGeminiAudio(inlineData.data, inlineData.mimeType);
}

/**
 * Fallback voice: Google Translate's text-to-speech endpoint.
 * It is an unofficial, undocumented URL, so it can change or start rejecting server requests at any time.
 */
export async function fetchFallbackRussianAudio(text: string): Promise<AudioPayload | null> {
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

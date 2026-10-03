// Audio container helpers shared by server.ts (what it sends to browsers) and scripts/generate-audio.ts.
// No dependencies, so the production server can import them freely.

export type AudioPayload = { audio: string; mimeType: string };

/** Gemini text-to-speech returns 16-bit mono PCM at 24 kHz. */
const DEFAULT_PCM_SAMPLE_RATE = 24_000;

/** Sample rate and channel count from a mime type such as "audio/L16;codec=pcm;rate=24000". */
export function parsePcmMimeType(mimeType: string | undefined): { sampleRate: number; channels: number } {
  const rate = Number(/rate=(\d+)/i.exec(mimeType ?? '')?.[1]);
  const channels = Number(/channels=(\d+)/i.exec(mimeType ?? '')?.[1]);
  return {
    sampleRate: Number.isInteger(rate) && rate >= 8000 && rate <= 96_000 ? rate : DEFAULT_PCM_SAMPLE_RATE,
    channels: channels === 2 ? 2 : 1,
  };
}

/** Wraps raw 16-bit little-endian PCM in a 44-byte WAV header. */
export function pcmToWav(pcm: Buffer, sampleRate = DEFAULT_PCM_SAMPLE_RATE, channels = 1): Buffer {
  const bitsPerSample = 16;
  const blockAlign = (channels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16); // size of the fmt chunk
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * blockAlign, 28); // bytes per second
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

/** Reads a 16-bit PCM WAV file; null when the bytes are anything else. */
export function parseWav(wav: Buffer): { sampleRate: number; channels: number; pcm: Buffer } | null {
  if (wav.length < 12 || wav.toString('ascii', 0, 4) !== 'RIFF' || wav.toString('ascii', 8, 12) !== 'WAVE') return null;

  let format: { sampleRate: number; channels: number } | null = null;
  let offset = 12;
  while (offset + 8 <= wav.length) {
    const id = wav.toString('ascii', offset, offset + 4);
    const size = wav.readUInt32LE(offset + 4);
    const body = offset + 8;
    if (id === 'fmt ' && size >= 16 && body + 16 <= wav.length) {
      const channels = wav.readUInt16LE(body + 2);
      if (wav.readUInt16LE(body) !== 1 || wav.readUInt16LE(body + 14) !== 16 || (channels !== 1 && channels !== 2)) return null;
      format = { sampleRate: wav.readUInt32LE(body + 4), channels };
    } else if (id === 'data' && format) {
      // A streamed WAV can declare more data than the file holds: take what is there
      return { ...format, pcm: wav.subarray(body, Math.min(body + size, wav.length)) };
    }
    offset = body + size + (size % 2); // chunks are padded to an even size
  }
  return null;
}

/**
 * Turns what Gemini returned into audio a browser can play: a WAV or an MP3, never headerless PCM.
 * Gemini sends raw PCM (labelled "audio/L16;codec=pcm;rate=24000"), which `new Audio()` cannot play as it is,
 * so PCM gets a WAV header. A payload that already is a WAV or an MP3 passes through untouched.
 */
export function normalizeGeminiAudio(base64: string, mimeType?: string): AudioPayload {
  const bytes = Buffer.from(base64, 'base64');
  const start = bytes.toString('ascii', 0, 4);
  if (start === 'RIFF') return { audio: base64, mimeType: 'audio/wav' };
  // Only the mime type and an ID3 tag are trusted for MP3: silent PCM starts with 0xFF 0xFF, which looks like a frame sync
  if (/^audio\/(mpeg|mp3)/i.test(mimeType ?? '') || start.startsWith('ID3')) return { audio: base64, mimeType: 'audio/mpeg' };

  const { sampleRate, channels } = parsePcmMimeType(mimeType);
  return { audio: pcmToWav(bytes, sampleRate, channels).toString('base64'), mimeType: 'audio/wav' };
}

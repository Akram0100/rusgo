// MP3 helpers for scripts/generate-audio.ts: an encoder (Gemini returns PCM) and a frame reader that checks
// that a file really is playable MP3 before it is shipped. Not part of the app or the server.
import { Mp3Encoder } from '@breezystack/lamejs';

/** Encodes 16-bit PCM (mono, or stereo with interleaved channels) as an MP3 at a constant bitrate. */
export function encodeMp3(samples: Int16Array, sampleRate: number, channels = 1, kbps = 48): Buffer {
  const encoder = new Mp3Encoder(channels, sampleRate, kbps);
  const chunks: Buffer[] = [];
  const block = 1152;
  const frames = Math.floor(samples.length / channels);

  // The encoder hands out Int8Arrays (its typings say Uint8Array) that may be views of its own buffers:
  // copy each chunk right away, as bytes
  const keep = (out: ArrayBufferView) => {
    if (out.byteLength > 0) chunks.push(Buffer.from(new Uint8Array(out.buffer, out.byteOffset, out.byteLength)));
  };

  for (let start = 0; start < frames; start += block) {
    const count = Math.min(block, frames - start);
    if (channels === 1) {
      keep(encoder.encodeBuffer(samples.subarray(start, start + count)));
    } else {
      const left = new Int16Array(count);
      const right = new Int16Array(count);
      for (let i = 0; i < count; i++) {
        left[i] = samples[(start + i) * 2];
        right[i] = samples[(start + i) * 2 + 1];
      }
      keep(encoder.encodeBuffer(left, right));
    }
  }

  keep(encoder.flush());
  return Buffer.concat(chunks);
}

// MPEG audio frame header tables (Layer III only: that is what both voices produce)
const BITRATES_MPEG1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
const BITRATES_MPEG2_L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
const SAMPLE_RATES: Record<'1' | '2' | '2.5', number[]> = {
  '1': [44100, 48000, 32000],
  '2': [22050, 24000, 16000],
  '2.5': [11025, 12000, 8000],
};

export interface Mp3Info {
  /** Frames were found back to back and cover (almost) the whole file. */
  valid: boolean;
  frames: number;
  sampleRate: number;
  durationSeconds: number;
}

const INVALID: Mp3Info = { valid: false, frames: 0, sampleRate: 0, durationSeconds: 0 };

/** Walks the MPEG Layer III frames of a file. A file with garbage, another format or a cut-off body is not valid. */
export function inspectMp3(file: Buffer): Mp3Info {
  let offset = 0;
  // Skip an ID3v2 tag
  if (file.length >= 10 && file.toString('ascii', 0, 3) === 'ID3') {
    offset = 10 + ((file[6] & 0x7f) << 21 | (file[7] & 0x7f) << 14 | (file[8] & 0x7f) << 7 | (file[9] & 0x7f));
  }

  let frames = 0;
  let sampleRate = 0;
  let samples = 0;
  let end = offset;
  while (offset + 4 <= file.length) {
    const b1 = file[offset + 1];
    if (file[offset] !== 0xff || (b1 & 0xe0) !== 0xe0) break;

    const versionBits = (b1 >> 3) & 3; // 0: MPEG 2.5, 2: MPEG 2, 3: MPEG 1
    const layerBits = (b1 >> 1) & 3; // 1: Layer III
    const b2 = file[offset + 2];
    const bitrateIndex = b2 >> 4;
    const rateIndex = (b2 >> 2) & 3;
    const padding = (b2 >> 1) & 1;
    if (versionBits === 1 || layerBits !== 1 || bitrateIndex === 0 || bitrateIndex === 15 || rateIndex === 3) break;

    const version = versionBits === 3 ? '1' : versionBits === 2 ? '2' : '2.5';
    const kbps = (version === '1' ? BITRATES_MPEG1_L3 : BITRATES_MPEG2_L3)[bitrateIndex];
    const rate = SAMPLE_RATES[version][rateIndex];
    const frameLength = Math.floor(((version === '1' ? 144_000 : 72_000) * kbps) / rate) + padding;
    if (offset + frameLength > file.length) break; // a cut-off last frame

    if (frames > 0 && rate !== sampleRate) break; // the stream must not change format
    sampleRate = rate;
    samples = version === '1' ? 1152 : 576;
    frames++;
    offset += frameLength;
    end = offset;
  }

  if (frames === 0) return INVALID;
  // Allow a trailing ID3v1 / Xing tag, but not a file that is mostly something else
  const covered = end >= file.length * 0.9 || file.length - end <= 256;
  return { valid: covered, frames, sampleRate, durationSeconds: (frames * samples) / sampleRate };
}

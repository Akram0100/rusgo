import { getSavedAudio, saveAudioRecording } from './audioStorage';
import { getStaticAudioUrl } from './staticAudio';

let audioCtx: AudioContext | null = null;
const audioCache = new Map<string, string>(); // in-memory cache base64 audio by key
const staticAudioCache = new Map<string, string>(); // phrase -> object URL of its pre-generated MP3

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch {
    // Audio context not allowed or blocked
  }
}

export function playErrorTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Audio context not allowed
  }
}

export function playTileClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Audio context not allowed
  }
}

export function playLessonComplete() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const melody = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.35 },
    ];

    let t = now;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d + 0.05);
      t += note.d * 0.9;
    });
  } catch {
    // Audio context not allowed
  }
}

let activeAudioElement: HTMLAudioElement | null = null;

/**
 * The pre-generated MP3 of a phrase (see scripts/generate-audio.ts) as a URL that an <audio> can play, or null
 * when the phrase has none or the file cannot be loaded. It is fetched as a whole and played from memory, so
 * playback does not depend on range requests (Safari asks for them, and a service worker cache answers poorly).
 */
async function loadStaticAudio(text: string): Promise<string | null> {
  const known = staticAudioCache.get(text);
  if (known) return known;

  const url = await getStaticAudioUrl(text);
  if (!url) return null;
  try {
    const response = await fetch(url);
    // A missing file can come back as the app's index.html with status 200: only real audio counts
    if (!response.ok || !(response.headers.get('content-type') ?? '').startsWith('audio/')) return null;
    const objectUrl = URL.createObjectURL(await response.blob());
    staticAudioCache.set(text, objectUrl);
    return objectUrl;
  } catch {
    return null;
  }
}

/**
 * Play authentic, natural Russian audio recording.
 * 1. Checks in-memory cache.
 * 2. Plays the pre-generated MP3 of the lesson phrase, if there is one (no server involved).
 * 3. Checks browser IndexedDB permanent storage (plays saved recording in 0ms without server request).
 * 4. If not saved yet, generates/fetches once and saves recording permanently into storage for all future clicks.
 */
export async function speakRussian(
  text: string,
  rate: number = 0.95,
  onStart?: () => void,
  onEnd?: () => void
): Promise<'natural-audio' | 'failed'> {
  if (typeof window === 'undefined') {
    if (onEnd) onEnd();
    return 'failed';
  }

  // Stop previous audio playback if active
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {
      // Ignore abort
    }
    activeAudioElement = null;
  }

  const cleanText = text.trim();
  const isSlow = rate < 0.85;
  const cacheKey = `v5_${cleanText}_${isSlow ? 'slow' : 'normal'}`;

  const playAudio = async (dataUri: string) => {
    try {
      if (onStart) onStart();
      const audio = new Audio(dataUri);
      activeAudioElement = audio;

      if (isSlow) {
        audio.playbackRate = 0.78;
      }

      audio.onended = () => {
        activeAudioElement = null;
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        activeAudioElement = null;
        if (onEnd) onEnd();
      };

      await audio.play();
      return 'natural-audio' as const;
    } catch (err) {
      console.warn('[Audio Player] Playback error:', err);
      if (onEnd) onEnd();
      return 'failed' as const;
    }
  };

  // 1. Play from local memory cache if present
  const inMem = audioCache.get(cacheKey);
  if (inMem) {
    return playAudio(inMem);
  }

  // 2. Built-in lesson phrases have a pre-generated MP3 (the slow speed plays the same file slower)
  const staticSrc = await loadStaticAudio(cleanText);
  if (staticSrc) {
    return playAudio(staticSrc);
  }

  // 3. Play from local persistent device storage (IndexedDB)
  // If generated once in any past session, plays immediately without network!
  try {
    const savedRecording = await getSavedAudio(cacheKey);
    if (savedRecording) {
      audioCache.set(cacheKey, savedRecording);
      return playAudio(savedRecording);
    }
  } catch (err) {
    console.warn('[Audio Storage] IndexedDB read error:', err);
  }

  // 4. Not yet generated or saved: generate once from server
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, rate, voice: 'Kore' }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audio) {
        const mime = data.mimeType || 'audio/mpeg';
        const dataUri = `data:${mime};base64,${data.audio}`;

        // Save to in-memory cache
        audioCache.set(cacheKey, dataUri);

        // Save permanently to device storage so it never needs generation again
        saveAudioRecording(cacheKey, dataUri).catch(() => {});

        return await playAudio(dataUri);
      }
    }
  } catch (err) {
    console.warn('[Audio Player] Fetch failed:', err);
  }

  if (onEnd) onEnd();
  return 'failed';
}

/**
 * Preload and permanently save audio recordings in background
 * Ensures that when the user taps any exercise audio, the recording is already saved locally!
 */
export async function preloadAudioRecordings(texts: string[]) {
  if (typeof window === 'undefined') return;

  for (const text of texts) {
    const clean = text.trim();
    if (!clean) continue;
    const cacheKey = `v5_${clean}_normal`;

    if (audioCache.has(cacheKey)) continue;

    // A pre-generated MP3 is simply fetched (the service worker keeps it for offline use): no /api/tts call
    if (await loadStaticAudio(clean)) continue;

    const saved = await getSavedAudio(cacheKey);
    if (saved) {
      audioCache.set(cacheKey, saved);
      continue;
    }

    // Silently fetch and save in background
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean, rate: 0.95, voice: 'Kore' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const mime = data.mimeType || 'audio/mpeg';
          const dataUri = `data:${mime};base64,${data.audio}`;
          audioCache.set(cacheKey, dataUri);
          saveAudioRecording(cacheKey, dataUri).catch(() => {});
        }
      }
    } catch {
      // Continue next silently
    }
  }
}

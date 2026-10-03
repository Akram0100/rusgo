// Pre-generated lesson audio: public/audio/manifest.json maps a Russian phrase to an MP3 file made by
// `npm run audio:generate`. Phrases that are not in it (AI lessons) still go through /api/tts.

const MANIFEST_URL = '/audio/manifest.json';
const FILE_NAME = /^[0-9a-f]{12}\.mp3$/;
const RETRY_AFTER_MS = 60_000;

let manifest: Promise<Record<string, string>> | null = null;
let retryAt = 0;

/**
 * The phrase -> file map. Resolves to an empty map when there is none (offline, or audio not generated yet);
 * a failed load is tried again after a minute rather than on every call.
 */
export function loadAudioManifest(): Promise<Record<string, string>> {
  if (manifest) return manifest;
  if (Date.now() < retryAt) return Promise.resolve({});

  manifest = fetch(MANIFEST_URL)
    .then((response) => (response.ok ? response.json() : null))
    .then((data: { files?: Record<string, unknown> } | null) => {
      if (!data || typeof data.files !== 'object' || data.files === null) throw new Error('no manifest');
      const entries = Object.entries(data.files).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string' && FILE_NAME.test(entry[1]),
      );
      return Object.fromEntries(entries);
    })
    .catch(() => {
      manifest = null;
      retryAt = Date.now() + RETRY_AFTER_MS;
      return {};
    });
  return manifest;
}

/** URL of the pre-generated MP3 for this phrase, or null when it has none. */
export async function getStaticAudioUrl(text: string): Promise<string | null> {
  const files = await loadAudioManifest();
  const file = Object.hasOwn(files, text) ? files[text] : null;
  return file ? `/audio/${file}` : null;
}

/** Forgets the loaded manifest and any pending retry delay (for tests). */
export function resetAudioManifest() {
  manifest = null;
  retryAt = 0;
}

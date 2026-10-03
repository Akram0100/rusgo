/**
 * IndexedDB Persistent Audio Recording Storage
 * Saves every synthesized or downloaded Russian voice recording to local browser database.
 * Once generated, it will never be fetched again — it plays instantly from local device storage.
 */

const DB_NAME = 'RusGoAudioRecordingsDB';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

function openAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get saved audio recording by text and speed key
 */
export async function getSavedAudio(key: string): Promise<string | null> {
  try {
    const db = await openAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        if (req.result && req.result.dataUri) {
          resolve(req.result.dataUri);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Save audio recording permanently to IndexedDB
 */
export async function saveAudioRecording(key: string, dataUri: string): Promise<void> {
  try {
    const db = await openAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ key, dataUri, savedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // Graceful fallback if storage quota exceeded or disabled
  }
}

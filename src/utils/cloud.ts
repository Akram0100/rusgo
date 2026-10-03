import type { User } from 'firebase/auth';
import type { UserCloudProfile } from './firebase';

type CloudModule = typeof import('./firebase');

// Firebase (Auth + Firestore) is more than half of the app bundle and only matters once someone
// signs in, so it is a separate chunk that is fetched right after the first paint instead of
// being part of the main bundle. Everything outside this file talks to Firebase through here.
let cloudModule: Promise<CloudModule> | null = null;
let loadedCloud: CloudModule | null = null;

export const loadCloud = (): Promise<CloudModule> => {
  cloudModule ??= import('./firebase').then((module) => {
    loadedCloud = module;
    return module;
  });
  return cloudModule;
};

/**
 * The Firebase module if it has already finished loading. Sign-in handlers use it to call
 * signInWithPopup synchronously inside the click: browsers block popups opened after an await.
 */
export const getLoadedCloud = (): CloudModule | null => loadedCloud;

/** Calls `onChange` with the signed-in user (or null) now and on every change; resolves to the unsubscribe function. */
export async function watchAuthState(onChange: (user: User | null) => void): Promise<() => void> {
  const cloud = await loadCloud();
  return cloud.watchAuth(onChange);
}

export async function loadUserProfile(uid: string): Promise<UserCloudProfile | null> {
  try {
    return await (await loadCloud()).loadUserProfile(uid);
  } catch (error) {
    console.error('Could not load Firebase:', error);
    return null;
  }
}

export async function syncUserProfile(profile: UserCloudProfile): Promise<boolean> {
  try {
    return await (await loadCloud()).syncUserProfile(profile);
  } catch (error) {
    console.error('Could not load Firebase:', error);
    return false;
  }
}

export async function signOutUser(): Promise<void> {
  await (await loadCloud()).signOutUser();
}

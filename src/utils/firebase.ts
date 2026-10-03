import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { getUserLeague } from '../types/leaderboard';

// Firebase is more than half of the app bundle, so this module is never imported directly:
// everything goes through ./cloud, which loads it as a separate chunk on demand.

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/** Calls `onChange` with the signed-in user (or null) now and on every change; returns the unsubscribe function. */
export const watchAuth = (onChange: (user: FirebaseUser | null) => void) => onAuthStateChanged(auth, onChange);

export const signOutUser = () => signOut(auth);

// Not wrapped in extra awaits: the popup has to open inside the click that started the sign-in
export const signInWithGoogle = async (): Promise<FirebaseUser> => (await signInWithPopup(auth, googleProvider)).user;

/** Guest account: an anonymous Firebase user with a nickname. It lives only in this browser. */
export async function signInAsGuest(displayName: string): Promise<FirebaseUser> {
  const { user } = await signInAnonymously(auth);
  await updateProfile(user, { displayName });
  return user;
}

export interface UserCloudProfile {
  uid: string;
  displayName: string;
  email?: string | null;
  photoURL?: string | null;
  currentLevel: 'A1' | 'A2' | 'B1';
  unlockedLessons: string[];
  completedLessons: string[];
  xp: number;
  streakDays: number;
  hearts: number;
  updatedAt?: any;
}

// The league screen is a demo for now and nothing reads the public `leaderboard` collection, so
// profiles are not published there. Switch this on together with a real leaderboard.
const PUBLISH_LEADERBOARD = false;

// Load user profile from Firestore
export async function loadUserProfile(uid: string): Promise<UserCloudProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserCloudProfile;
    }
  } catch (error) {
    console.error('Error loading user profile from Firebase:', error);
  }
  return null;
}

// Save or sync user profile to Firestore
export async function syncUserProfile(profile: UserCloudProfile): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', profile.uid);
    const payload = {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userRef, payload, { merge: true });

    if (PUBLISH_LEADERBOARD) {
      // Public leaderboard entry (no e-mail)
      const leadRef = doc(db, 'leaderboard', profile.uid);
      await setDoc(
        leadRef,
        {
          userId: profile.uid,
          displayName: profile.displayName || 'Oʻquvchi',
          photoURL: profile.photoURL || null,
          xp: profile.xp || 0,
          league: getUserLeague(profile.xp || 0).nameUz,
          streakDays: profile.streakDays || 0,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
    return true;
  } catch (error) {
    console.error('Error syncing user profile to Firebase:', error);
    return false;
  }
}

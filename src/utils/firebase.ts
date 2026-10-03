import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Validate Firestore connection on boot (per skill requirement)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline, using local cached store.');
    }
  }
}
testConnection();

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

    // Also update public leaderboard entry
    const leadRef = doc(db, 'leaderboard', profile.uid);
    await setDoc(
      leadRef,
      {
        userId: profile.uid,
        displayName: profile.displayName || 'Oʻquvchi',
        photoURL: profile.photoURL || null,
        xp: profile.xp || 0,
        league: profile.xp > 1000 ? 'Zumrad ligasi' : profile.xp > 500 ? 'Oltin ligasi' : 'Bronza ligasi',
        streakDays: profile.streakDays || 1,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('Error syncing user profile to Firebase:', error);
    return false;
  }
}

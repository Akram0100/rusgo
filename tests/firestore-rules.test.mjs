// Run with: npm run test:rules
//
// Tests firestore.rules against the Firestore emulator. Needs Java 11+ and the Firebase CLI
// (npm install -g firebase-tools). The payloads below are exactly what syncUserProfile in
// src/utils/firebase.ts writes, so a rule change that would break syncing shows up here.
import { describe, it, before, beforeEach, after } from 'node:test';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const rules = fs.readFileSync(fileURLToPath(new URL('../firestore.rules', import.meta.url)), 'utf8');
let env;

before(async () => {
  env = await initializeTestEnvironment({ projectId: 'demo-rusgo', firestore: { rules } });
});
beforeEach(() => env.clearFirestore());
after(() => env.cleanup());

const google = (uid) =>
  env.authenticatedContext(uid, { firebase: { sign_in_provider: 'google.com' }, email: `${uid}@example.com` }).firestore();
const guest = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: 'anonymous' } }).firestore();
const signedOut = () => env.unauthenticatedContext().firestore();

// What App.tsx hands to syncUserProfile (firebase.ts spreads it into setDoc with merge: true)
const profile = (uid, over = {}) => ({
  uid, displayName: 'Ali Valiyev', photoURL: 'https://lh3.googleusercontent.com/a/abc=s96-c', email: 'ali@example.com',
  currentLevel: 'A1', unlockedLessons: ['a1_lesson_01', 'a1_lesson_02'], completedLessons: ['a1_lesson_01'],
  xp: 90, streakDays: 2, hearts: 3, updatedAt: new Date().toISOString(), ...over,
});
const guestProfile = (uid, over = {}) => profile(uid, { displayName: 'Jasur', photoURL: null, email: null, ...over });
const entry = (uid, over = {}) => ({
  userId: uid, displayName: 'Ali', photoURL: null, xp: 90, league: 'Bronza ligasi', streakDays: 2,
  updatedAt: new Date().toISOString(), ...over,
});

const write = (db, path, data) => setDoc(doc(db, path), data, { merge: true }); // the app always merges
const seed = (path, data) => env.withSecurityRulesDisabled((context) => setDoc(doc(context.firestore(), path), data));
const without = (data, ...keys) => Object.fromEntries(Object.entries(data).filter(([key]) => !keys.includes(key)));

const allowed = (name, fn) => it(`allows: ${name}`, () => assertSucceeds(fn()));
const denied = (name, fn) => it(`denies: ${name}`, () => assertFails(fn()));

describe('what the app really writes keeps working', () => {
  allowed('a Google user creates their own profile (full payload)', () => write(google('alice'), 'users/alice', profile('alice')));
  allowed('a guest (anonymous) user creates their profile (null photo and e-mail)', () => write(guest('g1'), 'users/g1', guestProfile('g1')));
  allowed('an update with the same XP', async () => {
    await seed('users/alice', profile('alice'));
    await write(google('alice'), 'users/alice', profile('alice', { streakDays: 3 }));
  });
  allowed('an update with more XP (a lesson is +50)', async () => {
    await seed('users/alice', profile('alice'));
    await write(google('alice'), 'users/alice', profile('alice', { xp: 140 }));
  });
  allowed('a large jump from a mini-game (there is no per-write cap)', async () => {
    await seed('users/alice', profile('alice'));
    await write(google('alice'), 'users/alice', profile('alice', { xp: 2590 }));
  });
  allowed('AI lesson ids in the lesson lists', () =>
    write(google('alice'), 'users/alice', profile('alice', { completedLessons: ['a1_lesson_01', 'ai_lx3k9a2b'] })));
  allowed('the owner reads their profile', async () => {
    await seed('users/alice', profile('alice'));
    await getDoc(doc(google('alice'), 'users/alice'));
  });
  allowed('the owner deletes their profile', async () => {
    await seed('users/alice', profile('alice'));
    await deleteDoc(doc(google('alice'), 'users/alice'));
  });
  allowed('levels A1, A2 and B1', async () => {
    for (const level of ['A1', 'A2', 'B1']) await write(google('alice'), 'users/alice', profile('alice', { currentLevel: level }));
  });
  allowed('zero hearts', () => write(google('alice'), 'users/alice', profile('alice', { hearts: 0 })));
  allowed('a learner with no streak yet (0 days) and the 5 hearts of a fresh lesson attempt', () =>
    write(google('alice'), 'users/alice', profile('alice', { streakDays: 0, hearts: 5 })));
});

describe('optional and unusual but legitimate payloads', () => {
  allowed('no e-mail key', () => write(google('alice'), 'users/alice', without(profile('alice'), 'email')));
  allowed('no photoURL key', () => write(google('alice'), 'users/alice', without(profile('alice'), 'photoURL')));
  allowed('no hearts and no updatedAt', () => write(google('alice'), 'users/alice', without(profile('alice'), 'hearts', 'updatedAt')));
  allowed('empty lesson lists', () => write(google('alice'), 'users/alice', profile('alice', { unlockedLessons: [], completedLessons: [] })));
  allowed('Uzbek letters and an emoji in the display name', () =>
    write(google('alice'), 'users/alice', profile('alice', { displayName: 'Oʻtkir Gʻofurov 🎓' })));
  allowed('a legacy document without hearts, updated with merge', async () => {
    await seed('users/alice', without(profile('alice'), 'hearts'));
    await write(google('alice'), 'users/alice', profile('alice', { xp: 120 }));
  });
  allowed('a leaderboard entry without the optional keys', () =>
    write(google('alice'), 'leaderboard/alice', without(entry('alice'), 'photoURL', 'streakDays', 'updatedAt')));
});

describe('ownership', () => {
  denied('a signed-out visitor reading a profile', async () => {
    await seed('users/alice', profile('alice'));
    await getDoc(doc(signedOut(), 'users/alice'));
  });
  denied('a signed-out visitor writing a profile', () => write(signedOut(), 'users/alice', profile('alice')));
  denied("another user reading someone's profile", async () => {
    await seed('users/alice', profile('alice'));
    await getDoc(doc(google('bob'), 'users/alice'));
  });
  denied("another user writing someone's profile", () => write(google('bob'), 'users/alice', profile('alice')));
  denied("another user deleting someone's profile", async () => {
    await seed('users/alice', profile('alice'));
    await deleteDoc(doc(google('bob'), 'users/alice'));
  });
  denied('a profile that claims another uid inside the document', () => write(google('alice'), 'users/alice', profile('bob')));
});

describe('malformed profile data', () => {
  denied('an extra field', () => write(google('alice'), 'users/alice', profile('alice', { isAdmin: true })));
  denied('a missing required field (xp)', () => write(google('alice'), 'users/alice', without(profile('alice'), 'xp')));
  denied('xp as a string', () => write(google('alice'), 'users/alice', profile('alice', { xp: '999' })));
  denied('xp as a fraction', () => write(google('alice'), 'users/alice', profile('alice', { xp: 10.5 })));
  denied('negative xp', () => write(google('alice'), 'users/alice', profile('alice', { xp: -1 })));
  denied('absurd xp (over 10 000 000)', () => write(google('alice'), 'users/alice', profile('alice', { xp: 99999999999 })));
  denied('an unknown level', () => write(google('alice'), 'users/alice', profile('alice', { currentLevel: 'C2' })));
  denied('an http photo URL', () => write(google('alice'), 'users/alice', profile('alice', { photoURL: 'http://tracker.example/pixel.gif' })));
  denied('a javascript: photo URL', () => write(google('alice'), 'users/alice', profile('alice', { photoURL: 'javascript:alert(1)' })));
  denied('a data: photo URL', () => write(google('alice'), 'users/alice', profile('alice', { photoURL: 'data:text/html;base64,AAAA' })));
  denied('a display name of 101 characters', () => write(google('alice'), 'users/alice', profile('alice', { displayName: 'x'.repeat(101) })));
  denied('a lesson list that is not a list', () => write(google('alice'), 'users/alice', profile('alice', { unlockedLessons: 'a1_lesson_01' })));
  denied('a lesson list with 501 entries', () =>
    write(google('alice'), 'users/alice', profile('alice', { completedLessons: Array.from({ length: 501 }, (_, i) => `l${i}`) })));
  denied('lowering XP on update', async () => {
    await seed('users/alice', profile('alice', { xp: 500 }));
    await write(google('alice'), 'users/alice', profile('alice', { xp: 40 }));
  });
});

describe('leaderboard', () => {
  allowed('anyone, even signed out, reads the public leaderboard', async () => {
    await seed('leaderboard/alice', entry('alice'));
    await getDoc(doc(signedOut(), 'leaderboard/alice'));
  });
  allowed('the owner publishes a valid entry', () => write(google('alice'), 'leaderboard/alice', entry('alice')));
  allowed('the owner raises their XP', async () => {
    await seed('leaderboard/alice', entry('alice'));
    await write(google('alice'), 'leaderboard/alice', entry('alice', { xp: 200 }));
  });
  denied("publishing under someone else's id", () => write(google('bob'), 'leaderboard/alice', entry('alice')));
  denied('publishing while signed out', () => write(signedOut(), 'leaderboard/alice', entry('alice')));
  denied('an entry that carries an e-mail address', () => write(google('alice'), 'leaderboard/alice', entry('alice', { email: 'ali@example.com' })));
  denied('an entry with an http photo URL', () => write(google('alice'), 'leaderboard/alice', entry('alice', { photoURL: 'http://tracker.example/p.gif' })));
  denied('an entry with a 1 MB display name', () => write(google('alice'), 'leaderboard/alice', entry('alice', { displayName: 'x'.repeat(1_000_000) })));
  denied('lowering XP on the leaderboard', async () => {
    await seed('leaderboard/alice', entry('alice', { xp: 500 }));
    await write(google('alice'), 'leaderboard/alice', entry('alice', { xp: 10 }));
  });
  denied('an entry that claims another userId', () => write(google('alice'), 'leaderboard/alice', entry('bob')));
});

describe('everything else stays closed', () => {
  denied('the old public connection-test document', async () => {
    await seed('test/connection', { ok: true });
    await getDoc(doc(signedOut(), 'test/connection'));
  });
  denied('reading an unknown collection', async () => {
    await seed('admin/settings', { x: 1 });
    await getDoc(doc(google('alice'), 'admin/settings'));
  });
  denied('writing an unknown collection', () => write(google('alice'), 'admin/settings', { x: 1 }));
  denied('a sub-collection under a profile', () => write(google('alice'), 'users/alice/secrets/s1', { x: 1 }));
});

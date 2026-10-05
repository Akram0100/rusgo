// Spaced repetition of the words met in lessons (a Leitner system). A word comes back the day after it was learned,
// then after longer and longer gaps while it is remembered; a word that is forgotten starts again the next day.
import { LessonPackage } from '../types/lesson';
import { getLocalDateString } from './gamification';
import { shuffle } from './shuffle';

export interface ReviewWord {
  term: string; // Russian
  translation: string; // Uzbek
  audio_text: string;
}

export interface ReviewCard extends ReviewWord {
  /** 0 = just learned. A right answer moves the word up a box, a wrong one back to box 0. */
  box: number;
  /** The local day (YYYY-MM-DD) from which the word is due. */
  due: string;
}

/** The learner's words, by term. */
export type ReviewDeck = Record<string, ReviewCard>;

/** Days until the next review, by box: the gap grows while the word is remembered. */
export const REVIEW_INTERVALS = [1, 2, 4, 7, 14, 30];

/** Words in one review session: about five minutes. */
export const REVIEW_SESSION_SIZE = 12;

const DECK_STORAGE_KEY = 'rusgo_review_deck';
const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** `day` plus `days`, both local YYYY-MM-DD (month and year ends included). */
export const addDays = (day: string, days: number): string => {
  const [year, month, date] = day.split('-').map(Number);
  return getLocalDateString(new Date(year, month - 1, date + days));
};

/** The words a lesson teaches, ready for the deck (a lesson without vocabulary teaches none). */
export const lessonWords = (lesson: LessonPackage): ReviewWord[] =>
  (lesson.vocabulary ?? [])
    .filter((word) => word.term?.trim() && word.translation?.trim())
    .map((word) => ({
      term: word.term.trim(),
      translation: word.translation.trim(),
      audio_text: (word.audio_text || word.term).trim(),
    }));

/** Adds the words that are not in the deck yet, due on `due`; words already there keep their schedule. */
export const addWords = (deck: ReviewDeck, words: ReviewWord[], due: string): ReviewDeck => {
  let next = deck;
  for (const word of words) {
    if (next[word.term]) continue;
    if (next === deck) next = { ...deck };
    next[word.term] = { ...word, box: 0, due };
  }
  return next; // the same object when nothing was added
};

/** The words due on `today`: the longest overdue first, and within a day the least known first. */
export const dueCards = (deck: ReviewDeck, today: string): ReviewCard[] =>
  Object.values(deck)
    .filter((card) => card.due <= today)
    .sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.box - b.box));

/** A word after its review: right moves it up a box and further out; wrong sends it back to box 0, due tomorrow. */
export const gradeCard = (card: ReviewCard, right: boolean, today: string): ReviewCard => {
  const box = right ? Math.min(card.box + 1, REVIEW_INTERVALS.length - 1) : 0;
  return { ...card, box, due: addDays(today, REVIEW_INTERVALS[box]) };
};

export interface ReviewQuestion {
  card: ReviewCard;
  /** ru_uz: the Russian word is shown and spoken, its translation is picked. uz_ru: the other way round. */
  kind: 'ru_uz' | 'uz_ru';
  options: string[];
  answer: string;
}

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * One session: up to REVIEW_SESSION_SIZE of the due words, in the order given. The direction changes each time a
 * word is remembered (box 0 is shown in Russian), and the three wrong choices come from the other words of `pool`.
 */
export const buildReviewSession = (due: ReviewCard[], pool: ReviewWord[]): ReviewQuestion[] =>
  due.slice(0, REVIEW_SESSION_SIZE).map((card) => {
    const kind = card.box % 2 === 0 ? 'ru_uz' : 'uz_ru';
    const side = (word: ReviewWord) => (kind === 'ru_uz' ? word.translation : word.term);
    const answer = side(card);
    const wrong: string[] = [];
    for (const word of shuffle(pool)) {
      const choice = side(word);
      if (wrong.length === 3) break;
      if (!same(choice, answer) && !wrong.some((other) => same(other, choice))) wrong.push(choice);
    }
    return { card, kind, answer, options: shuffle([answer, ...wrong]) };
  });

/** The deck as stored, without anything that is not a well-formed card (an older or damaged save). */
export const parseReviewDeck = (raw: unknown): ReviewDeck => {
  const deck: ReviewDeck = {};
  if (!raw || typeof raw !== 'object') return deck;
  for (const card of Object.values(raw as Record<string, unknown>)) {
    const c = card as Partial<ReviewCard> | null;
    if (
      c &&
      typeof c.term === 'string' && c.term.trim() &&
      typeof c.translation === 'string' && c.translation.trim() &&
      typeof c.audio_text === 'string' &&
      Number.isInteger(c.box) && (c.box as number) >= 0 && (c.box as number) < REVIEW_INTERVALS.length &&
      typeof c.due === 'string' && DAY.test(c.due)
    ) {
      deck[c.term] = { term: c.term, translation: c.translation, audio_text: c.audio_text || c.term, box: c.box as number, due: c.due };
    }
  }
  return deck;
};

export const loadReviewDeck = (): ReviewDeck => {
  try {
    return parseReviewDeck(JSON.parse(localStorage.getItem(DECK_STORAGE_KEY) || 'null'));
  } catch {
    return {};
  }
};

export const saveReviewDeck = (deck: ReviewDeck) => {
  try {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
  } catch (e) {
    console.error('Failed to save the review deck', e);
  }
};

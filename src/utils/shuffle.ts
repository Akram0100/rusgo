import { Exercise } from '../types/lesson';

/** Fisher–Yates shuffle; returns a new array and leaves the input untouched. */
export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns a copy of the exercise with its answer choices in random order, so the correct
 * option (or the first word tiles) is not always in the same place.
 * Answers are graded by value, never by position, so the lesson data stays as authored.
 */
export function withShuffledChoices(exercise: Exercise): Exercise {
  if (exercise.type === 'learn_word') {
    return exercise;
  }

  if (exercise.type === 'translate_order') {
    const { words_pool, correct_order } = exercise;
    // A pool that already reads as the answer would give it away, so reshuffle a few times.
    const readsAsAnswer = (pool: string[]) =>
      correct_order.length > 0 && correct_order.every((word, i) => pool[i] === word);

    let pool = shuffle(words_pool);
    for (let attempt = 0; attempt < 5 && pool.length > 1 && readsAsAnswer(pool); attempt++) {
      pool = shuffle(words_pool);
    }
    return { ...exercise, words_pool: pool };
  }

  return { ...exercise, options: shuffle(exercise.options) };
}

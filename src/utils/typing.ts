// Checking a typed answer: case, ё/е, punctuation and spacing do not count, and one wrong letter in a longer word
// is accepted with a note, as Duolingo does.

/** The text as compared: lower case, ё as е, punctuation and hyphens as spaces, single spaces. */
export const normalizeTyped = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:…"'«»„“”‘’()\-—–/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Edits (insert, delete, replace) that turn `a` into `b`. */
const editDistance = (a: string, b: string): number => {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[b.length];
};

/** Letters an answer needs before one wrong letter counts as a typo rather than a wrong word. */
export const TYPO_MIN_LETTERS = 4;

/**
 * right: the answer, give or take case, ё/е and punctuation. typo: one letter off (missing, extra or wrong) in an
 * answer of at least TYPO_MIN_LETTERS letters. wrong: anything else, an empty answer included.
 */
export const checkTyped = (typed: string, answer: string): 'right' | 'typo' | 'wrong' => {
  const given = normalizeTyped(typed);
  const expected = normalizeTyped(answer);
  if (!given) return 'wrong';
  if (given === expected) return 'right';
  const letters = expected.replace(/ /g, '').length;
  return letters >= TYPO_MIN_LETTERS && editDistance(given, expected) === 1 ? 'typo' : 'wrong';
};

/**
 * Checks the typed text against every accepted answer (e.g. a phrase and its feminine form) and keeps the best
 * verdict, with the answers that gave it: a typo note then shows the form(s) the learner may have been writing.
 */
export const checkTypedAgainst = (
  typed: string,
  answers: string[]
): { verdict: 'right' | 'typo' | 'wrong'; answers: string[] } => {
  for (const verdict of ['right', 'typo'] as const) {
    const matched = answers.filter((answer) => checkTyped(typed, answer) === verdict);
    if (matched.length > 0) return { verdict, answers: matched };
  }
  return { verdict: 'wrong', answers };
};

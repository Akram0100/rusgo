import { LessonPackage, Exercise, LearnWordExercise, MultipleChoiceExercise, TypeWordExercise } from '../types/lesson';

/**
 * Transforms a raw lesson into a pedagogical Duolingo-style progression:
 * 1. For each key word / phrase introduced in the lesson:
 *    First display a dedicated "Yangi soʻz bilan tanishamiz" (Learn) card with audio & translation.
 * 2. Immediately follow it with the exercises that practice and test that exact word.
 * 3. This guarantees the student is never tested on a word before being taught!
 * 4. The lesson ends with a typing step and listening steps (see typingSteps, listeningSteps) on words it taught.
 */
export function buildDuolingoProgression(lesson: LessonPackage): Exercise[] {
  const result: Exercise[] = [];
  const vocabulary = lesson.vocabulary || [];
  const introducedTerms = new Set<string>();

  let learnIdCounter = 9000;

  for (const ex of lesson.exercises) {
    // Check if this exercise introduces or tests any vocabulary item
    const exTexts = [
      ex.target_audio_text,
      ex.instruction,
      ex.type === 'multiple_choice' ? ex.correct_answer : '',
      ex.type === 'fill_blank' ? ex.blank_answer : '',
      ex.type === 'translate_order' ? (ex.correct_order || []).join(' ') : '',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // Find any unintroduced vocabulary word present in this exercise
    const matchingVocab = vocabulary.filter((v) => {
      const termLower = v.term.toLowerCase().trim();
      if (introducedTerms.has(termLower)) return false;

      // Clean punctuation for matching
      const cleanTerm = termLower.replace(/[.,?!«»'\"()]/g, '');
      const cleanEx = exTexts.replace(/[.,?!«»'\"()]/g, '');

      return (
        cleanEx.includes(cleanTerm) ||
        cleanTerm.includes(ex.target_audio_text.toLowerCase().trim())
      );
    });

    // If matching vocab words found, insert a dedicated LearnWord card for each before this exercise!
    for (const vocab of matchingVocab) {
      introducedTerms.add(vocab.term.toLowerCase().trim());

      const learnStep: LearnWordExercise = {
        id: ++learnIdCounter,
        type: 'learn_word',
        instruction: 'Yangi soʻz bilan tanishamiz!',
        target_audio_text: vocab.audio_text || vocab.term,
        term: vocab.term,
        translation: vocab.translation,
        explanation: 'Ushbu yangi soʻzni eshitib, talaffuzini eslab qoling. Keyingi savol aynan shu soʻz boʻyicha boʻladi!',
        context_note: 'Keyingi savolda ushbu soʻz sinovdan oʻtkaziladi.',
      };
      result.push(learnStep);
    }

    // Now push the actual exercise!
    result.push(ex);
  }

  // If some vocabulary words were never triggered, introduce them at the very start
  const remainingVocab = vocabulary.filter(
    (v) => !introducedTerms.has(v.term.toLowerCase().trim())
  );
  let steps = result;
  if (remainingVocab.length > 0 && result.length === lesson.exercises.length) {
    const prepends: Exercise[] = remainingVocab.slice(0, 3).map((vocab) => ({
      id: ++learnIdCounter,
      type: 'learn_word',
      instruction: 'Yangi soʻz bilan tanishamiz!',
      target_audio_text: vocab.audio_text || vocab.term,
      term: vocab.term,
      translation: vocab.translation,
      explanation: 'Ushbu yangi soʻzni eshitib, talaffuzini eslab qoling.',
      context_note: 'Darsdagi asosiy yangi soʻz.',
    }));
    steps = [...prepends, ...result];
  }

  const listening = listeningSteps(steps, vocabulary.map((vocab) => vocab.term));
  const typing = typingSteps(steps, new Set(listening.map((step) => step.correct_answer)));
  return [...steps, ...typing, ...listening];
}

/**
 * A typing step: the Uzbek meaning of a word the lesson taught is shown, and the learner writes the word in Russian.
 * It takes the shortest taught word of one or two Cyrillic words (3 to 12 letters) that the listening steps do not
 * use; a lesson without one gets no typing step.
 */
function typingSteps(steps: Exercise[], skip: Set<string>): TypeWordExercise[] {
  const letters = (term: string) => term.replace(/[^\p{L}]/gu, '').length;
  const candidates = steps.filter(
    (step): step is LearnWordExercise =>
      step.type === 'learn_word' &&
      !skip.has(step.term) &&
      /^[\p{Script=Cyrillic}\s.,!?…-]+$/u.test(step.term) &&
      step.term.trim().split(/\s+/).length <= 2 &&
      letters(step.term) >= 3 &&
      letters(step.term) <= 12
  );
  if (candidates.length === 0) return [];

  const card = candidates.reduce((best, step) => (letters(step.term) < letters(best.term) ? step : best));
  return [
    {
      id: 8101,
      type: 'type_word',
      instruction: 'Ruscha yozing:',
      prompt: card.translation,
      answer: card.term,
      target_audio_text: card.target_audio_text,
      explanation: `‘${card.term}’ — ${card.translation}.`,
    },
  ];
}

/** Listening steps that close a lesson. */
export const LISTENING_STEPS = 2;

/**
 * Listening steps: a word the lesson taught on a card is only heard, and the learner picks it among four of the
 * lesson's words. They take the first taught word and one from the middle, so they come after their cards.
 */
function listeningSteps(steps: Exercise[], terms: string[]): MultipleChoiceExercise[] {
  const taught = steps.filter((step): step is LearnWordExercise => step.type === 'learn_word');
  const choices = Array.from(new Set(terms.map((term) => term.trim()).filter(Boolean)));
  if (taught.length === 0 || choices.length < 4) return [];

  const picks = Array.from(new Set([0, Math.floor(taught.length / 2)])).slice(0, LISTENING_STEPS);
  return picks.map((at, n) => {
    const card = taught[at];
    const others = choices.filter((term) => term !== card.term.trim());
    // The wrong choices follow the word in the lesson's list, so each listening step gets different ones
    const start = Math.max(0, choices.indexOf(card.term.trim()));
    const wrong = [...others.slice(start), ...others.slice(0, start)].slice(0, 3);
    return {
      id: 8001 + n,
      type: 'multiple_choice',
      audio_only: true,
      instruction: 'Eshitganingizni tanlang:',
      target_audio_text: card.target_audio_text,
      options: [card.term, ...wrong],
      correct_answer: card.term,
      explanation: `‘${card.term}’ — ${card.translation}.`,
    };
  });
}

/**
 * A wrong answer sends the exercise to the end of the lesson, to be asked again once the rest is done (as Duolingo
 * does), and a retry answered wrongly comes back once more. This always ends: every wrong answer costs a heart.
 * Returns the new list of retries. The exercise is copied, so its choices are shuffled afresh when it comes back.
 */
export function addRetry(retries: Exercise[], exercise: Exercise): Exercise[] {
  return exercise.type === 'learn_word' ? retries : [...retries, { ...exercise }];
}

/**
 * How many of the lesson's own steps are done, for the progress bar. Every wrong answer so far (`retries`) added a
 * step at the end of the lesson, so a wrong answer does not move the bar; its retry moves it once it is right.
 * `isChecked`: the step at `currentIndex` has been answered.
 */
export function lessonStepsDone(lessonSteps: number, currentIndex: number, isChecked: boolean, retries: number): number {
  return Math.min(lessonSteps, Math.max(0, currentIndex + (isChecked ? 1 : 0) - retries));
}

import { LessonPackage, Exercise, LearnWordExercise } from '../types/lesson';

/**
 * Transforms a raw lesson into a pedagogical Duolingo-style progression:
 * 1. For each key word / phrase introduced in the lesson:
 *    First display a dedicated "Yangi soʻz bilan tanishamiz" (Learn) card with audio & translation.
 * 2. Immediately follow it with the exercises that practice and test that exact word.
 * 3. This guarantees the student is never tested on a word before being taught!
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
    return [...prepends, ...result];
  }

  return result;
}

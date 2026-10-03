import { Exercise, LessonPackage } from '../types/lesson';

/**
 * Gemini fills the lesson schema loosely: the type-specific fields are optional there, so a
 * generated exercise can arrive without `options`, with an answer that is not among the options,
 * and so on. The trainer assumes well-formed exercises (one bad one used to blank the whole app),
 * so everything coming from the AI goes through here first.
 */

const MIN_VALID_EXERCISES = 3;
const MAX_TEXT_LENGTH = 300;
const HAS_CYRILLIC = /[А-Яа-яЁё]/;

type RawObject = Record<string, unknown>;

const isObject = (value: unknown): value is RawObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const text = (value: unknown): string =>
  typeof value === 'string' ? value.trim().slice(0, MAX_TEXT_LENGTH) : '';

const textList = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(text).filter(Boolean) : [];

const normalize = (value: string): string =>
  value.toLowerCase().replace(/ё/g, 'е').replace(/[.,!?;:]/g, '').trim();

const sameWord = (a: string, b: string): boolean => normalize(a) === normalize(b);

/** Keeps the first spelling of every option; drops repeats that differ only by case/punctuation. */
const uniqueOptions = (options: string[]): string[] =>
  options.filter((option, index) => options.findIndex((other) => sameWord(other, option)) === index);

/** Returns a well-formed exercise (with a placeholder id) or null when it cannot be repaired. */
function sanitizeExercise(raw: unknown): Exercise | null {
  if (!isObject(raw)) return null;

  const instruction = text(raw.instruction);
  const audioText = text(raw.target_audio_text);
  // The audio is synthesised as Russian, so it has to contain Russian text.
  if (!instruction || !HAS_CYRILLIC.test(audioText)) return null;
  const base = { id: 0, instruction, target_audio_text: audioText, explanation: text(raw.explanation) };

  if (raw.type === 'multiple_choice') {
    const options = uniqueOptions(textList(raw.options));
    const correct = options.find((option) => sameWord(option, text(raw.correct_answer)));
    if (options.length < 2 || !correct) return null;
    return { ...base, type: 'multiple_choice', options, correct_answer: correct };
  }

  if (raw.type === 'translate_order') {
    const correctOrder = textList(raw.correct_order);
    if (correctOrder.length < 2) return null;
    // The pool must contain every word of the answer; distractors are optional extras.
    const wordsPool = textList(raw.words_pool);
    const unmatched = [...wordsPool];
    for (const word of correctOrder) {
      const index = unmatched.indexOf(word);
      if (index >= 0) unmatched.splice(index, 1);
      else wordsPool.push(word);
    }
    return { ...base, type: 'translate_order', words_pool: wordsPool, correct_order: correctOrder };
  }

  if (raw.type === 'fill_blank') {
    // Exactly one blank, written "___"; accept the usual alternatives the model may use instead.
    const sentence = text(raw.sentence_with_blank).replace(/_{2,}|…|\.{3,}/g, '___');
    const answer = text(raw.blank_answer);
    if (sentence.split('___').length !== 2 || !answer) return null;

    const options = uniqueOptions([...textList(raw.options), answer]);
    const correct = options.find((option) => sameWord(option, answer));
    // Without at least one distractor there is nothing to choose from.
    if (!correct || options.length < 2) return null;
    return {
      ...base,
      type: 'fill_blank',
      sentence_with_blank: sentence,
      blank_answer: correct,
      hint: text(raw.hint) || undefined,
      options,
    };
  }

  return null;
}

export interface GeneratedLessonRequest {
  topic: string;
  level: string;
}

/**
 * Turns the raw JSON returned by /api/generate-lesson into a lesson the trainer can safely play.
 * Repairs what is repairable, drops exercises that are not, and throws when too little is left.
 */
export function sanitizeGeneratedLesson(raw: unknown, request: GeneratedLessonRequest): LessonPackage {
  if (!isObject(raw) || !Array.isArray(raw.exercises)) {
    throw new Error('Notoʻgʻri format qaytarildi');
  }

  const exercises = raw.exercises
    .map(sanitizeExercise)
    .filter((exercise): exercise is Exercise => exercise !== null)
    .map((exercise, index) => ({ ...exercise, id: index + 1 }));

  if (exercises.length < MIN_VALID_EXERCISES) {
    throw new Error('AI yaroqli mashqlar tuza olmadi. Mavzuni oʻzgartirib, qayta urinib koʻring');
  }

  const vocabulary = (Array.isArray(raw.vocabulary) ? raw.vocabulary : []).flatMap((item) => {
    if (!isObject(item)) return [];
    const term = text(item.term);
    const translation = text(item.translation);
    const audioText = text(item.audio_text) || term;
    return term && translation && HAS_CYRILLIC.test(audioText)
      ? [{ term, translation, audio_text: audioText }]
      : [];
  });

  return {
    // Always generated here: an id chosen by the model could collide with an existing lesson.
    lesson_id: `ai_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    level: request.level,
    topic: text(raw.topic) || text(request.topic),
    target_language: 'ru',
    instruction_language: 'uz',
    exercises_count: exercises.length,
    exercises,
    vocabulary: vocabulary.length > 0 ? vocabulary : undefined,
  };
}

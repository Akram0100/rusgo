export type ExerciseType = 'multiple_choice' | 'translate_order' | 'fill_blank' | 'learn_word' | 'type_word';

export interface BaseExercise {
  id: number;
  type: ExerciseType;
  instruction: string;
  target_audio_text: string;
  explanation: string;
}

export interface LearnWordExercise extends BaseExercise {
  type: 'learn_word';
  term: string;
  translation: string;
  context_note?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: string[];
  correct_answer: string;
  /** A listening question: the phrase is only heard (target_audio_text), and the learner picks what was said. */
  audio_only?: boolean;
}

export interface TranslateOrderExercise extends BaseExercise {
  type: 'translate_order';
  words_pool: string[];
  correct_order: string[];
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  sentence_with_blank: string;
  blank_answer: string;
  hint?: string;
  options: string[];
}

/** A typing step: the Uzbek prompt is shown and the learner types the Russian answer (on-screen keys if need be). */
export interface TypeWordExercise extends BaseExercise {
  type: 'type_word';
  prompt: string;
  answer: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslateOrderExercise
  | FillBlankExercise
  | LearnWordExercise
  | TypeWordExercise;

export interface LessonPackage {
  lesson_id: string;
  level: string;
  topic: string;
  target_language: string;
  instruction_language: string;
  exercises_count: number;
  exercises: Exercise[];
  vocabulary?: {
    term: string;
    translation: string;
    audio_text: string;
  }[];
}

export type ExerciseType = 'multiple_choice' | 'translate_order' | 'fill_blank';

export interface BaseExercise {
  id: number;
  type: ExerciseType;
  instruction: string;
  target_audio_text: string;
  explanation: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: string[];
  correct_answer: string;
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

export type Exercise = MultipleChoiceExercise | TranslateOrderExercise | FillBlankExercise;

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

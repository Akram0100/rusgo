import { INITIAL_LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/roleplay';
import { GRAMMAR_RULES } from '../data/grammar';

/**
 * Every Russian phrase the app plays from its built-in content, trimmed and without duplicates, in the order a
 * learner meets them: the lessons first (exercises and vocabulary lesson by lesson), then the role-play
 * dialogues, then the grammar examples. This is the order scripts/generate-audio.ts works in, so when a quota
 * only covers part of the phrases it is the first lessons that get their audio first.
 *
 * Keep it in step with what the components pass to speakRussian: exercises (target_audio_text), vocabulary and
 * grammar examples (audio_text) and every line of the role-play dialogues.
 */
export function collectAudioTextsInLessonOrder(): string[] {
  const texts: string[] = [];

  for (const lesson of INITIAL_LESSONS) {
    for (const exercise of lesson.exercises) texts.push(exercise.target_audio_text);
    for (const word of lesson.vocabulary ?? []) texts.push(word.audio_text || word.term);
  }
  for (const scenario of SCENARIOS) {
    for (const step of scenario.steps) texts.push(step.ru);
  }
  for (const rule of GRAMMAR_RULES) {
    for (const section of rule.sections) {
      for (const example of section.examples) texts.push(example.audio_text);
    }
  }

  return Array.from(new Set(texts.map((text) => text.trim()).filter(Boolean)));
}

/** The same phrases in a stable, sorted order. */
export const collectAudioTexts = (): string[] => collectAudioTextsInLessonOrder().sort();

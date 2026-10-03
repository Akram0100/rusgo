import { INITIAL_LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/roleplay';
import { GRAMMAR_RULES } from '../data/grammar';

/**
 * Every Russian phrase the app plays from its built-in content, trimmed, without duplicates and in a stable
 * order. These are the phrases scripts/generate-audio.ts turns into MP3 files. Keep it in step with what the
 * components pass to speakRussian: exercises (target_audio_text), vocabulary and grammar examples (audio_text)
 * and every line of the role-play dialogues.
 */
export function collectAudioTexts(): string[] {
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

  return Array.from(new Set(texts.map((text) => text.trim()).filter(Boolean))).sort();
}

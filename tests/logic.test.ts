// Run with: npm run test:logic
// Pure logic only (no browser, no network): answer shuffling, validation of AI-generated lessons
// and the integrity of the lesson data that ships with the app.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_LESSONS } from '../src/data/lessons';
import { shuffle, withShuffledChoices } from '../src/utils/shuffle';
import { sanitizeGeneratedLesson } from '../src/utils/validateLesson';
import type { Exercise } from '../src/types/lesson';

const HAS_CYRILLIC = /[А-Яа-яЁё]/;
const normalize = (text: string) =>
  text.toLowerCase().replace(/ё/g, 'е').replace(/[.,!?;:—\-"'«»‘’]/g, '').replace(/\s+/g, ' ').trim();
const sorted = (items: string[]) => JSON.stringify([...items].sort());
const allExercises: Exercise[] = INITIAL_LESSONS.flatMap((lesson) => lesson.exercises);

describe('lesson data', () => {
  it('lesson ids are unique and every lesson has vocabulary', () => {
    const ids = INITIAL_LESSONS.map((lesson) => lesson.lesson_id);
    assert.equal(new Set(ids).size, ids.length);
    for (const lesson of INITIAL_LESSONS) assert.ok(lesson.vocabulary?.length, `${lesson.lesson_id} has no vocabulary`);
  });

  it('exercises_count matches the exercises and exercise ids are unique inside a lesson', () => {
    for (const lesson of INITIAL_LESSONS) {
      assert.equal(lesson.exercises_count, lesson.exercises.length, lesson.lesson_id);
      const ids = lesson.exercises.map((exercise) => exercise.id);
      assert.equal(new Set(ids).size, ids.length, lesson.lesson_id);
    }
  });

  it('every exercise has Russian audio text', () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) {
        assert.ok(HAS_CYRILLIC.test(exercise.target_audio_text), `${lesson.lesson_id}#${exercise.id}`);
      }
    }
  });

  it('multiple choice: the answer is one of the options and options are unique', () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.type !== 'multiple_choice') continue;
        const tag = `${lesson.lesson_id}#${exercise.id}`;
        assert.ok(exercise.options.includes(exercise.correct_answer), tag);
        assert.equal(new Set(exercise.options).size, exercise.options.length, tag);
      }
    }
  });

  it('fill in the blank: one blank, the answer is an option, and the filled sentence is what the audio says', () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.type !== 'fill_blank') continue;
        const tag = `${lesson.lesson_id}#${exercise.id}`;
        assert.equal(exercise.sentence_with_blank.split('___').length, 2, `${tag}: exactly one ___`);
        assert.ok(exercise.options.includes(exercise.blank_answer), `${tag}: answer is an option`);
        const filled = exercise.sentence_with_blank.replace('___', exercise.blank_answer);
        assert.equal(normalize(filled), normalize(exercise.target_audio_text), tag);
      }
    }
  });

  it('sentence building: the pool holds every word of the answer and the answer is what the audio says', () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.type !== 'translate_order') continue;
        const tag = `${lesson.lesson_id}#${exercise.id}`;
        const pool = [...exercise.words_pool];
        for (const word of exercise.correct_order) {
          const index = pool.indexOf(word);
          assert.ok(index >= 0, `${tag}: "${word}" missing from the pool`);
          pool.splice(index, 1);
        }
        assert.equal(normalize(exercise.correct_order.join(' ')), normalize(exercise.target_audio_text), tag);
      }
    }
  });

  it('vocabulary terms are unique across lessons (Speed Match pairs cards by term)', () => {
    const terms = INITIAL_LESSONS.flatMap((lesson) => (lesson.vocabulary ?? []).map((item) => item.term));
    assert.equal(new Set(terms).size, terms.length);
  });
});

describe('answer shuffling', () => {
  it('shuffle() keeps every element and leaves its input alone', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const copy = [...input];
    const out = shuffle(input);
    assert.deepEqual(input, copy);
    assert.deepEqual([...out].sort(), copy);
  });

  it('shuffling never changes what is correct (grading is by value) and never edits the lesson data', () => {
    const before = JSON.stringify(INITIAL_LESSONS);
    for (const exercise of allExercises) {
      for (let i = 0; i < 20; i++) {
        const shuffled = withShuffledChoices(exercise);
        if (shuffled.type === 'multiple_choice' && exercise.type === 'multiple_choice') {
          assert.equal(sorted(shuffled.options), sorted(exercise.options));
          assert.equal(shuffled.correct_answer, exercise.correct_answer);
        } else if (shuffled.type === 'fill_blank' && exercise.type === 'fill_blank') {
          assert.equal(sorted(shuffled.options), sorted(exercise.options));
          assert.equal(shuffled.blank_answer, exercise.blank_answer);
        } else if (shuffled.type === 'translate_order' && exercise.type === 'translate_order') {
          assert.equal(sorted(shuffled.words_pool), sorted(exercise.words_pool));
          assert.deepEqual(shuffled.correct_order, exercise.correct_order);
        }
      }
    }
    assert.equal(JSON.stringify(INITIAL_LESSONS), before);
  });

  it('the correct option lands on every position about equally often (it is always first in the data)', () => {
    const positions = [0, 0, 0, 0];
    const choices = allExercises.filter((exercise) => exercise.type === 'multiple_choice');
    for (const exercise of choices) {
      for (let i = 0; i < 200; i++) {
        const shuffled = withShuffledChoices(exercise);
        if (shuffled.type === 'multiple_choice') positions[shuffled.options.indexOf(shuffled.correct_answer)]++;
      }
    }
    const total = positions.reduce((sum, n) => sum + n, 0);
    for (const count of positions) assert.ok(Math.abs(count / total - 0.25) < 0.03, JSON.stringify(positions));
  });

  it('a word pool is practically never handed over already in answer order', () => {
    let inOrder = 0;
    let trials = 0;
    for (const exercise of allExercises) {
      if (exercise.type !== 'translate_order') continue;
      for (let i = 0; i < 200; i++) {
        const shuffled = withShuffledChoices(exercise);
        if (shuffled.type !== 'translate_order') continue;
        trials++;
        if (exercise.correct_order.every((word, index) => shuffled.words_pool[index] === word)) inOrder++;
      }
    }
    assert.ok(inOrder / trials < 0.005, `${inOrder}/${trials}`);
  });
});

describe('sanitizeGeneratedLesson (AI lessons are validated before they reach the trainer)', () => {
  const request = { topic: 'Restoran', level: 'A2' };
  const multipleChoice = (over: Record<string, unknown> = {}) => ({
    type: 'multiple_choice', instruction: 'Tanlang', target_audio_text: 'Здравствуйте!',
    options: ['Здравствуйте', 'Пока', 'Спасибо', 'Извините'], correct_answer: 'Здравствуйте', explanation: 'Izoh', ...over,
  });
  const fillBlank = (over: Record<string, unknown> = {}) => ({
    type: 'fill_blank', instruction: 'Toldiring', target_audio_text: 'Я люблю чай.', sentence_with_blank: 'Я ___ чай.',
    blank_answer: 'люблю', options: ['люблю', 'любит', 'любишь', 'любить'], explanation: '', ...over,
  });
  const ordering = (over: Record<string, unknown> = {}) => ({
    type: 'translate_order', instruction: 'Tering', target_audio_text: 'Меня зовут Анвар.',
    words_pool: ['Анвар', 'Меня', 'зовут', 'как'], correct_order: ['Меня', 'зовут', 'Анвар'], explanation: '', ...over,
  });
  const lesson = (exercises: unknown[], extra: Record<string, unknown> = {}) => ({
    lesson_id: 'a1_lesson_01', level: 'B1', topic: 'X', exercises, ...extra,
  });

  it('passes a valid lesson, renumbers ids and forces the requested level', () => {
    const result = sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank(), ordering()]), request);
    assert.deepEqual(result.exercises.map((exercise) => exercise.id), [1, 2, 3]);
    assert.equal(result.level, 'A2');
    assert.equal(result.exercises_count, 3);
    assert.equal(result.target_language, 'ru');
  });

  it('ignores the id chosen by the model, so it cannot collide with a built-in lesson', () => {
    const a = sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank(), ordering()]), request);
    const b = sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank(), ordering()]), request);
    assert.notEqual(a.lesson_id, b.lesson_id);
    assert.ok(INITIAL_LESSONS.every((builtIn) => builtIn.lesson_id !== a.lesson_id));
  });

  it('drops a fill-in-the-blank without options (this used to blank the whole app)', () => {
    const result = sanitizeGeneratedLesson(
      lesson([multipleChoice(), multipleChoice(), ordering(), fillBlank({ options: undefined })]),
      request,
    );
    assert.equal(result.exercises.length, 3);
    assert.ok(result.exercises.every((exercise) => exercise.type !== 'fill_blank'));
  });

  it('normalises a blank written as "____" or an ellipsis, and adds a missing answer to the options', () => {
    const result = sanitizeGeneratedLesson(
      lesson([
        multipleChoice(),
        ordering(),
        fillBlank({ sentence_with_blank: 'Я ____ чай.' }),
        fillBlank({ sentence_with_blank: 'Я … чай.', options: ['любит', 'любишь'] }),
      ]),
      request,
    );
    const blanks = result.exercises.filter((exercise) => exercise.type === 'fill_blank');
    assert.equal(blanks.length, 2);
    for (const exercise of blanks) {
      if (exercise.type !== 'fill_blank') continue;
      assert.equal(exercise.sentence_with_blank.split('___').length, 2);
      assert.ok(exercise.options.includes(exercise.blank_answer));
    }
  });

  it('multiple choice: an answer that is not an option is dropped; a case/punctuation variant is canonicalised', () => {
    const result = sanitizeGeneratedLesson(
      lesson([multipleChoice(), ordering(), fillBlank(), multipleChoice({ correct_answer: 'Нет такого' }), multipleChoice({ correct_answer: 'здравствуйте.' })]),
      request,
    );
    const choices = result.exercises.filter((exercise) => exercise.type === 'multiple_choice');
    assert.equal(choices.length, 2);
    for (const exercise of choices) {
      if (exercise.type === 'multiple_choice') assert.ok(exercise.options.includes(exercise.correct_answer));
    }
  });

  it('sentence building: completes a pool that misses answer words; drops a one-word answer', () => {
    const result = sanitizeGeneratedLesson(
      lesson([multipleChoice(), fillBlank(), ordering({ words_pool: ['как'] }), ordering({ correct_order: ['Привет'] })]),
      request,
    );
    const orderings = result.exercises.filter((exercise) => exercise.type === 'translate_order');
    assert.equal(orderings.length, 1);
    const [only] = orderings;
    if (only.type === 'translate_order') for (const word of only.correct_order) assert.ok(only.words_pool.includes(word));
  });

  it('drops exercises whose audio text is not Russian, of unknown type, or not objects at all', () => {
    const result = sanitizeGeneratedLesson(
      lesson([multipleChoice(), fillBlank(), ordering(), multipleChoice({ target_audio_text: 'Hello there' }), { type: 'essay' }, null, 'x', 5]),
      request,
    );
    assert.equal(result.exercises.length, 3);
  });

  it('throws a readable error when too little is usable, and on garbage', () => {
    assert.throws(() => sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank({ options: undefined })]), request), /yaroqli mashqlar/);
    for (const bad of [null, undefined, 'text', 42, [], {}, { exercises: 'x' }, { exercises: {} }]) {
      assert.throws(() => sanitizeGeneratedLesson(bad, request), /Notoʻgʻri format/);
    }
  });

  it('keeps valid vocabulary only, truncates very long strings', () => {
    const withVocabulary = sanitizeGeneratedLesson(
      lesson([multipleChoice({ instruction: 'x'.repeat(5000) }), fillBlank(), ordering()], {
        vocabulary: [{ term: 'Привет', translation: 'Salom', audio_text: 'Привет' }, { term: 'x' }, null],
      }),
      request,
    );
    assert.equal(withVocabulary.vocabulary?.length, 1);
    assert.ok(withVocabulary.exercises[0].instruction.length <= 300);
    assert.equal(sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank(), ordering()]), request).vocabulary, undefined);
  });

  it('a sanitised lesson survives shuffling and can still be graded by value', () => {
    const result = sanitizeGeneratedLesson(lesson([multipleChoice(), fillBlank(), ordering()]), request);
    for (const exercise of result.exercises) {
      const shuffled = withShuffledChoices(exercise);
      if (shuffled.type === 'multiple_choice') assert.ok(shuffled.options.includes(shuffled.correct_answer));
      if (shuffled.type === 'fill_blank') assert.ok(shuffled.options.includes(shuffled.blank_answer));
      if (shuffled.type === 'translate_order') {
        assert.equal(sorted(shuffled.words_pool.filter((word) => shuffled.correct_order.includes(word))), sorted(shuffled.correct_order));
      }
    }
  });
});

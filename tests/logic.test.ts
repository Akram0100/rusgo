// Run with: npm run test:logic
// Pure logic only (no browser, no network): answer shuffling, validation of AI-generated lessons,
// the integrity of the lesson data that ships with the app, and the XP / streak / achievement rules.
import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_A1_LESSONS, INITIAL_LESSONS } from '../src/data/lessons';
import { shuffle, withShuffledChoices } from '../src/utils/shuffle';
import { sanitizeGeneratedLesson } from '../src/utils/validateLesson';
import { SCENARIOS } from '../src/data/roleplay';
import { afterCorrectAnswer } from '../src/utils/roleplay';
import {
  ACHIEVEMENTS_LIST,
  daysBetween,
  expireStreak,
  findNewAchievements,
  getAchievementsWithProgress,
  getLocalDateString,
  loadUserStats,
  registerLessonDay,
  saveUserStats,
} from '../src/utils/gamification';
import {
  LEARN_CARD_XP,
  LESSON_FIRST_XP,
  LESSON_REPLAY_XP,
  MAX_HEARTS,
  ROLEPLAY_FIRST_XP,
  ROLEPLAY_REPEAT_XP,
  REVIEW_WORD_XP,
  SPEED_MATCH_ROUND_MAX_XP,
  addSpeedMatchXp,
  getLessonXp,
  getReviewXp,
  getSpeedMatchPairXp,
} from '../src/utils/xp';
import { LISTENING_STEPS, addRetry, buildDuolingoProgression, lessonStepsDone } from '../src/utils/duolingoFlow';
import {
  REVIEW_SESSION_SIZE,
  addDays,
  addWords,
  buildReviewSession,
  dueCards,
  gradeCard,
  lessonWords,
  parseReviewDeck,
  type ReviewCard,
} from '../src/utils/review';
import { collectAudioTexts } from '../src/utils/audioTexts';
import type { Exercise, LearnWordExercise, MultipleChoiceExercise, TypeWordExercise } from '../src/types/lesson';
import { checkTyped, checkTypedAgainst, isRightOrder, normalizeTyped } from '../src/utils/typing';
import type { UserStats } from '../src/types/gamification';

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

  it('sentence building: every other accepted order uses exactly the words of the answer, in another order', () => {
    const words = (sentence: string) => sorted(normalizeTyped(sentence).split(' '));
    for (const lesson of INITIAL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.type !== 'translate_order') continue;
        const answer = exercise.correct_order.join(' ');
        const orders = exercise.accepted_orders ?? [];
        for (const order of orders) {
          const tag: string = `${lesson.lesson_id}#${exercise.id}: "${order}"`;
          assert.equal(words(order), words(answer), `${tag} does not use the words of "${answer}"`);
          assert.notEqual(normalizeTyped(order), normalizeTyped(answer), `${tag} is the answer itself`);
        }
        assert.equal(new Set(orders.map(normalizeTyped)).size, orders.length, `${lesson.lesson_id}#${exercise.id}: an order twice`);
      }
    }
  });

  it('the A1 course goes from easy to hard: a lesson comes after what it builds on', () => {
    const at = (id: string) => INITIAL_A1_LESSONS.findIndex((lesson) => lesson.lesson_id === id);
    const pairs: [string, string, string][] = [
      ['a1_lesson_02', 'a1_lesson_29', 'numbers 1-10, then 11-100'],
      ['a1_lesson_29', 'a1_lesson_11', 'the numbers, then the time'],
      ['a1_lesson_29', 'a1_lesson_30', 'numbers 11-100, then hundreds and thousands'],
      ['a1_lesson_30', 'a1_lesson_22', 'big numbers, then the cash machine'],
      ['a1_lesson_30', 'a1_lesson_05', 'big numbers, then prices in shops'],
      ['a1_lesson_17', 'a1_lesson_05', 'clothes, then trying them on'],
      ['a1_lesson_03', 'a1_lesson_38', 'the family, then the relatives'],
      ['a1_lesson_12', 'a1_lesson_47', 'the days of the week, then meeting up'],
      ['a1_lesson_14', 'a1_lesson_36', 'food, then cooking'],
      ['a1_lesson_31', 'a1_lesson_07', 'the body, then the pharmacy'],
      ['a1_lesson_31', 'a1_lesson_26', 'the body, then the doctor'],
      ['a1_lesson_10', 'a1_lesson_24', 'professions, then looking for work'],
      ['a1_lesson_44', 'a1_lesson_04', 'places in town, then asking the way'],
    ];
    for (const [first, then, why] of pairs) {
      assert.ok(at(first) >= 0 && at(then) >= 0, `${first} or ${then} is not an A1 lesson`);
      assert.ok(at(first) < at(then), `${why}: ${first} must come before ${then}`);
    }
    assert.equal(INITIAL_A1_LESSONS[0].lesson_id, 'a1_lesson_01', 'the first lesson is the one open from the start');
    assert.equal(new Set(INITIAL_A1_LESSONS).size, INITIAL_A1_LESSONS.length, 'a lesson twice');
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

describe('learning progression (src/utils/duolingoFlow.ts: a card teaches a word before it is tested)', () => {
  const cardsOf = (steps: Exercise[]) => steps.filter((step): step is LearnWordExercise => step.type === 'learn_word');

  it('keeps every exercise of every lesson, in order, and only adds cards and the closing listening steps', () => {
    for (const lesson of INITIAL_LESSONS) {
      const steps = buildDuolingoProgression(lesson);
      const generated = (step: Exercise) => step.type === 'type_word' || (step.type === 'multiple_choice' && Boolean(step.audio_only));
      const authored = steps.filter((step) => step.type !== 'learn_word' && !generated(step));
      assert.deepEqual(authored, lesson.exercises, lesson.lesson_id);
      const typing = steps.filter((step) => step.type === 'type_word').length;
      assert.equal(steps.length, lesson.exercises.length + cardsOf(steps).length + typing + LISTENING_STEPS, lesson.lesson_id);
    }
  });

  it('teaches each word at most once, and only words from the lesson vocabulary', () => {
    for (const lesson of INITIAL_LESSONS) {
      const terms = cardsOf(buildDuolingoProgression(lesson)).map((card) => card.term);
      assert.equal(new Set(terms).size, terms.length, `${lesson.lesson_id}: a word is taught twice`);
      const vocabulary = new Set((lesson.vocabulary ?? []).map((word) => word.term));
      for (const term of terms) assert.ok(vocabulary.has(term), `${lesson.lesson_id}: "${term}" is not in the vocabulary`);
    }
  });

  it('gives every step an id of its own, so a card is never mistaken for an exercise', () => {
    for (const lesson of INITIAL_LESSONS) {
      const ids = buildDuolingoProgression(lesson).map((step) => step.id);
      assert.equal(new Set(ids).size, ids.length, lesson.lesson_id);
    }
  });

  it('every card has what the screen shows, and its audio is one of the phrases that get an MP3', () => {
    const withAudio = new Set(collectAudioTexts());
    for (const lesson of INITIAL_LESSONS) {
      for (const card of cardsOf(buildDuolingoProgression(lesson))) {
        assert.ok(card.term.trim() && card.translation.trim(), `${lesson.lesson_id}: an empty card`);
        assert.ok(withAudio.has(card.target_audio_text.trim()), `${lesson.lesson_id}: no MP3 is planned for "${card.target_audio_text}"`);
      }
    }
  });

  it('a lesson without vocabulary (an AI lesson may have none) gets no cards at all', () => {
    const lesson = { ...INITIAL_LESSONS[0], vocabulary: undefined };
    assert.deepEqual(buildDuolingoProgression(lesson), lesson.exercises);
  });
});

describe('listening steps (src/utils/duolingoFlow.ts: a taught word is only heard, then picked)', () => {
  const listeningOf = (steps: Exercise[]) =>
    steps.filter((step): step is MultipleChoiceExercise => step.type === 'multiple_choice' && Boolean(step.audio_only));

  it('every lesson ends with its listening steps, each on a different word that the lesson taught before', () => {
    for (const lesson of INITIAL_LESSONS) {
      const steps = buildDuolingoProgression(lesson);
      const listening = listeningOf(steps);
      assert.equal(listening.length, LISTENING_STEPS, lesson.lesson_id);
      assert.deepEqual(steps.slice(-LISTENING_STEPS), listening, `${lesson.lesson_id}: they close the lesson`);
      assert.equal(new Set(listening.map((step) => step.correct_answer)).size, LISTENING_STEPS, `${lesson.lesson_id}: the same word twice`);

      for (const step of listening) {
        const tag = `${lesson.lesson_id}: "${step.correct_answer}"`;
        const cardAt = steps.findIndex((s) => s.type === 'learn_word' && s.term === step.correct_answer);
        assert.ok(cardAt >= 0 && cardAt < steps.indexOf(step), `${tag} is heard before it is taught`);
        assert.equal(step.target_audio_text, (steps[cardAt] as LearnWordExercise).target_audio_text, `${tag}: not the card's audio`);
        assert.equal(step.options.length, 4, tag);
        assert.equal(new Set(step.options).size, 4, `${tag}: a choice twice`);
        assert.ok(step.options.includes(step.correct_answer), tag);
        assert.ok(!step.instruction.includes(step.correct_answer), `${tag}: the instruction gives the word away`);
      }
    }
  });

  it('a lesson with fewer than four words gets no listening step (there would not be four choices)', () => {
    const lesson = { ...INITIAL_LESSONS[0], vocabulary: INITIAL_LESSONS[0].vocabulary!.slice(0, 3) };
    assert.deepEqual(listeningOf(buildDuolingoProgression(lesson)), []);
  });
});

describe('typing steps (src/utils/typing.ts, src/utils/duolingoFlow.ts)', () => {
  it('a typed answer is right whatever its case, ё/е, punctuation and spacing', () => {
    for (const typed of ['хлеб', 'Хлеб', ' хлеб! ', 'ХЛЕБ.']) assert.equal(checkTyped(typed, 'Хлеб'), 'right', typed);
    assert.equal(checkTyped('жёлтый', 'Жёлтый'), 'right');
    assert.equal(checkTyped('желтый', 'Жёлтый'), 'right', 'ё may be typed as е');
    assert.equal(checkTyped('я  узбек', 'Я узбек'), 'right');
    assert.equal(checkTyped('пин код', 'Пин-код'), 'right', 'a hyphen counts as a space');
  });

  it('one wrong, missing or extra letter is a typo in a word of four letters or more; more is wrong', () => {
    assert.equal(checkTyped('хлеп', 'Хлеб'), 'typo');
    assert.equal(checkTyped('хеб', 'Хлеб'), 'typo');
    assert.equal(checkTyped('хлебб', 'Хлеб'), 'typo');
    assert.equal(checkTyped('пинкод', 'Пин-код'), 'typo');
    assert.equal(checkTyped('хлап', 'Хлеб'), 'wrong', 'two letters off');
    assert.equal(checkTyped('чак', 'Чек'), 'wrong', 'a three-letter word has no room for a typo');
    assert.equal(checkTyped('', 'Хлеб'), 'wrong');
    assert.equal(checkTyped('   ', 'Хлеб'), 'wrong');
  });

  it('a lesson types at most one short word it taught on a card before, other than its listening words', () => {
    let lessonsWithTyping = 0;
    for (const lesson of INITIAL_LESSONS) {
      const steps = buildDuolingoProgression(lesson);
      const typing = steps.filter((step): step is TypeWordExercise => step.type === 'type_word');
      assert.ok(typing.length <= 1, lesson.lesson_id);
      if (typing.length === 0) continue;
      lessonsWithTyping++;

      const step = typing[0];
      const tag = `${lesson.lesson_id}: "${step.answer}"`;
      const cardAt = steps.findIndex((s) => s.type === 'learn_word' && s.term === step.answer);
      assert.ok(cardAt >= 0 && cardAt < steps.indexOf(step), `${tag} is typed before it is taught`);
      assert.equal(step.prompt, (steps[cardAt] as LearnWordExercise).translation, tag);
      assert.ok(/^[А-Яа-яЁё\s.,!?…-]+$/.test(step.answer), `${tag}: not plain Cyrillic`);
      assert.ok(step.answer.trim().split(/\s+/).length <= 2, `${tag}: more than two words`);
      const listening = steps.filter((s): s is MultipleChoiceExercise => s.type === 'multiple_choice' && Boolean(s.audio_only));
      assert.ok(!listening.some((s) => s.correct_answer === step.answer), `${tag} is also a listening word`);
      assert.ok(steps.indexOf(step) < steps.indexOf(listening[0]), `${tag}: typing comes before listening`);
      assert.ok(!step.instruction.includes(step.answer) && !step.prompt.includes(step.answer), `${tag} is given away`);
    }
    assert.ok(lessonsWithTyping >= INITIAL_LESSONS.length / 2, `only ${lessonsWithTyping} lessons type a word`);
  });

  it('another correct form (a feminine one) is right too, and a typo note shows the forms it was close to', () => {
    const answers = ['Я узбек', 'Я узбечка'];
    assert.deepEqual(checkTypedAgainst('я узбечка', answers), { verdict: 'right', answers: ['Я узбечка'] });
    assert.deepEqual(checkTypedAgainst('Я узбек', answers), { verdict: 'right', answers: ['Я узбек'] });
    assert.equal(checkTypedAgainst('я узбечк', answers).verdict, 'typo');
    assert.ok(checkTypedAgainst('я узбечк', answers).answers.includes('Я узбечка'));
    assert.deepEqual(checkTypedAgainst('я русский', answers), { verdict: 'wrong', answers });

    const lesson9 = INITIAL_LESSONS.find((lesson) => lesson.lesson_id === 'a1_lesson_09')!;
    const typing = buildDuolingoProgression(lesson9).find((step): step is TypeWordExercise => step.type === 'type_word')!;
    assert.equal(typing.answer, 'Я узбек');
    assert.equal(checkTypedAgainst('я узбечка', [typing.answer, ...(typing.accept ?? [])]).verdict, 'right');
  });

  it("a word's other forms are real alternatives: Cyrillic, not empty and not the word itself", () => {
    for (const lesson of INITIAL_LESSONS) {
      for (const word of lesson.vocabulary ?? []) {
        for (const alternative of word.alternatives ?? []) {
          const tag = `${lesson.lesson_id}: "${word.term}" / "${alternative}"`;
          assert.ok(HAS_CYRILLIC.test(alternative), tag);
          assert.notEqual(normalize(alternative), normalize(word.term), tag);
        }
      }
    }
  });

  it('a built sentence is right in the authored order or an accepted one, whatever the tiles’ case and punctuation', () => {
    const answer = ['Мне', 'грустно', 'без', 'семьи.'];
    const accepted = ['Без семьи мне грустно.'];
    assert.equal(isRightOrder(['Мне', 'грустно', 'без', 'семьи.'], answer, accepted), true);
    assert.equal(isRightOrder(['без', 'семьи.', 'Мне', 'грустно'], answer, accepted), true, 'the other natural order');
    assert.equal(isRightOrder(['грустно', 'мне', 'без', 'семьи.'], answer, accepted), false, 'an order nobody accepted');
    assert.equal(isRightOrder(['Мне', 'грустно'], answer, accepted), false, 'words missing');
    assert.equal(isRightOrder([], answer, accepted), false);
  });

  it('a lesson whose words are all long phrases gets no typing step', () => {
    const lesson = {
      ...INITIAL_LESSONS[0],
      vocabulary: [
        { term: 'Я хочу снять комнату сегодня', translation: 'a', audio_text: 'Я хочу снять комнату сегодня' },
        { term: 'Где находится ближайшая аптека', translation: 'b', audio_text: 'Где находится ближайшая аптека' },
      ],
    };
    assert.deepEqual(buildDuolingoProgression(lesson).filter((step) => step.type === 'type_word'), []);
  });
});

describe('mistakes come back at the end of the lesson (src/utils/duolingoFlow.ts)', () => {
  const lessonSteps = buildDuolingoProgression(INITIAL_LESSONS[0]);
  const exerciseIds = lessonSteps.filter((step) => step.type !== 'learn_word').map((step) => step.id);

  /**
   * Plays the lesson the way the trainer does. `answers` says, exercise by exercise (cards need no answer), whether
   * the answer is right; answers left out are right. Returns the exercises in the order they were asked, the progress
   * bar just before and just after every answer, the hearts left, and whether the lesson was finished.
   */
  const play = (answers: boolean[]) => {
    let retries: Exercise[] = [];
    let hearts = MAX_HEARTS;
    let index = 0;
    const asked: number[] = [];
    const progress: { before: number; after: number; right: boolean }[] = [];
    while (hearts > 0 && index < lessonSteps.length + retries.length) {
      const step = index < lessonSteps.length ? lessonSteps[index] : retries[index - lessonSteps.length];
      if (step.type !== 'learn_word') {
        const right = answers[asked.length] ?? true;
        const before = lessonStepsDone(lessonSteps.length, index, false, retries.length);
        asked.push(step.id);
        if (!right) {
          hearts--;
          retries = addRetry(retries, step);
        }
        progress.push({ before, after: lessonStepsDone(lessonSteps.length, index, true, retries.length), right });
      }
      index++;
    }
    return { asked, progress, hearts, finished: hearts > 0 };
  };

  it('a wrong answer is asked again after the rest of the lesson, and the lesson ends once it is right', () => {
    const run = play([false]);
    assert.deepEqual(run.asked, [...exerciseIds, exerciseIds[0]]);
    assert.equal(run.finished, true);
    assert.equal(run.hearts, MAX_HEARTS - 1, 'the wrong answer still costs its heart');
  });

  it('a retry answered wrongly comes back once more; every wrong answer costs a heart, so it always ends', () => {
    const wrongTwice = play([false, ...exerciseIds.slice(1).map(() => true), false]);
    assert.deepEqual(wrongTwice.asked, [...exerciseIds, exerciseIds[0], exerciseIds[0]]);
    assert.equal(wrongTwice.finished, true);

    const allWrong = play(exerciseIds.map(() => false));
    assert.equal(allWrong.finished, false, 'the hearts run out');
    assert.equal(allWrong.asked.length, MAX_HEARTS);
  });

  it('the progress bar moves only on a right answer, never back, and is full at the end', () => {
    const run = play([true, false, true, false, true]);
    run.progress.forEach(({ before, after, right }, i) => {
      assert.equal(after, before + (right ? 1 : 0), `answer ${i + 1} (${right ? 'right' : 'wrong'})`);
      if (i > 0) assert.ok(before >= run.progress[i - 1].after, `answer ${i + 1}: the bar went back`);
    });
    assert.equal(run.progress.at(-1)?.after, lessonSteps.length);
  });

  it('a new-word card is never sent back, and a retry is a copy, so its choices are shuffled afresh', () => {
    const card = lessonSteps.find((step) => step.type === 'learn_word');
    assert.ok(card, 'the first lesson teaches words');
    assert.deepEqual(addRetry([], card), []);

    const exercise = lessonSteps.find((step) => step.type !== 'learn_word')!;
    const [retry] = addRetry([], exercise);
    assert.deepEqual(retry, exercise);
    assert.notEqual(retry, exercise);
  });
});

describe('spaced repetition (src/utils/review.ts)', () => {
  const words = lessonWords(INITIAL_LESSONS[0]);
  const allWords = INITIAL_LESSONS.flatMap(lessonWords);
  const card = (box: number, due: string, word = words[0]): ReviewCard => ({ ...word, box, due });
  const deckOf = (cards: ReviewCard[]) => Object.fromEntries(cards.map((c) => [c.term, c]));

  it('counts days across month and year ends, leap days included', () => {
    assert.equal(addDays('2026-10-05', 1), '2026-10-06');
    assert.equal(addDays('2026-01-31', 1), '2026-02-01');
    assert.equal(addDays('2026-12-31', 1), '2027-01-01');
    assert.equal(addDays('2028-02-28', 1), '2028-02-29');
    assert.equal(addDays('2026-03-01', 30), '2026-03-31');
  });

  it('every built-in lesson gives its whole vocabulary to the review, each word with an MP3 planned', () => {
    const withAudio = new Set(collectAudioTexts());
    for (const lesson of INITIAL_LESSONS) {
      const taught = lessonWords(lesson);
      assert.equal(taught.length, lesson.vocabulary?.length ?? 0, lesson.lesson_id);
      for (const word of taught) {
        assert.ok(word.term && word.translation, `${lesson.lesson_id}: an empty word`);
        assert.ok(withAudio.has(word.audio_text), `${lesson.lesson_id}: no MP3 is planned for "${word.audio_text}"`);
      }
    }
    assert.deepEqual(lessonWords({ ...INITIAL_LESSONS[0], vocabulary: undefined }), []);
  });

  it('a lesson adds its words once: a word met again keeps its schedule', () => {
    const deck = addWords({}, words, '2026-10-06');
    assert.equal(Object.keys(deck).length, words.length);
    assert.ok(Object.values(deck).every((c) => c.box === 0 && c.due === '2026-10-06'));
    assert.equal(addWords(deck, words, '2026-12-01'), deck, 'nothing new: the same deck comes back');

    const learned = { ...deck, [words[0].term]: card(3, '2026-10-20') };
    assert.equal(addWords(learned, words, '2026-12-01')[words[0].term].due, '2026-10-20');
  });

  it('a word remembered every time comes back after 2, 4, 7, 14 and then every 30 days; a slip brings it back tomorrow', () => {
    let current = card(0, '2026-10-06'); // learned the day before
    let day = current.due;
    const gaps: number[] = [];
    for (let review = 0; review < 7; review++) {
      current = gradeCard(current, true, day);
      gaps.push(daysBetween(day, current.due));
      day = current.due;
    }
    assert.deepEqual(gaps, [2, 4, 7, 14, 30, 30, 30]);

    const slipped = gradeCard(current, false, day);
    assert.equal(slipped.box, 0);
    assert.equal(slipped.due, addDays(day, 1));
  });

  it('only the words whose day has come are due: the longest overdue first, then the least known', () => {
    const deck = deckOf([
      card(2, '2026-10-05', words[0]),
      card(0, '2026-10-03', words[1]),
      card(1, '2026-10-05', words[2]),
      card(0, '2026-10-06', words[3]),
    ]);
    assert.deepEqual(
      dueCards(deck, '2026-10-05').map((c) => c.term),
      [words[1].term, words[2].term, words[0].term]
    );
    assert.deepEqual(dueCards(deck, '2026-10-02'), []);
  });

  it('a session asks each due word once, at most a session full, with the answer among four different choices', () => {
    const due = allWords.map((word, i) => card(i % 3, '2026-10-05', word));
    const session = buildReviewSession(due, allWords);
    assert.equal(session.length, REVIEW_SESSION_SIZE);
    assert.deepEqual(
      session.map((q) => q.card.term),
      due.slice(0, REVIEW_SESSION_SIZE).map((c) => c.term)
    );
    for (const q of session) {
      assert.equal(q.answer, q.kind === 'ru_uz' ? q.card.translation : q.card.term);
      assert.equal(q.kind, q.card.box % 2 === 0 ? 'ru_uz' : 'uz_ru', 'the direction changes as the word is remembered');
      assert.equal(q.options.length, 4);
      assert.ok(q.options.includes(q.answer));
      assert.equal(new Set(q.options.map((o) => o.trim().toLowerCase())).size, 4, `"${q.card.term}": a choice twice`);
    }
  });

  it('with only two words a question has two choices, never the answer twice', () => {
    const two = words.slice(0, 2);
    for (const q of buildReviewSession(two.map((w) => card(0, '2026-10-05', w)), two)) {
      assert.equal(q.options.length, 2);
      assert.equal(q.options.filter((o) => o === q.answer).length, 1);
    }
  });

  it('a damaged or older save loses only its broken cards', () => {
    const good = card(1, '2026-10-05');
    const parsed = parseReviewDeck({
      [good.term]: good,
      a: { ...good, term: '' },
      b: { ...good, term: 'x', box: 9 },
      c: { ...good, term: 'y', due: 'tomorrow' },
      d: { ...good, term: 'z', translation: 42 },
      e: null,
      f: 'text',
    });
    assert.deepEqual(parsed, { [good.term]: good });
    for (const raw of [null, 'garbage', 42, []]) assert.deepEqual(parseReviewDeck(raw), {});
  });

  it('a finished review pays XP for each word right at the first try, and nothing for a bad count', () => {
    assert.equal(getReviewXp(0), 0);
    assert.equal(getReviewXp(5), 5 * REVIEW_WORD_XP);
    assert.equal(getReviewXp(-3), 0);
    assert.equal(getReviewXp(Number.NaN), 0);
  });
});

describe('role-play dialogues', () => {
  it('scenario ids are unique', () => {
    const ids = SCENARIOS.map((scenario) => scenario.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it('every dialogue starts with the other person and alternates with the learner', () => {
    for (const scenario of SCENARIOS) {
      scenario.steps.forEach((step, index) => {
        assert.equal(step.speaker, index % 2 === 0 ? 'npc' : 'user', `${scenario.id}#${index}`);
      });
    }
  });

  it('every learner line has options with exactly one correct one, and it is the line itself', () => {
    for (const scenario of SCENARIOS) {
      for (const step of scenario.steps.filter((s) => s.speaker === 'user')) {
        const tag = `${scenario.id}: ${step.ru}`;
        const options = step.options ?? [];
        assert.ok(options.length >= 2, tag);
        assert.equal(options.filter((option) => option.isCorrect).length, 1, tag);
        assert.equal(options.find((option) => option.isCorrect)?.text, step.ru, tag);
        assert.equal(new Set(options.map((option) => option.text)).size, options.length, tag);
      }
    }
  });

  it('every dialogue can be played to its end, and the learner is never left without options', () => {
    for (const scenario of SCENARIOS) {
      let shownIndex = 0; // index of the last line on screen: the other person's opening line
      let answers = 0;
      let finished = false;
      while (!finished) {
        const learnerLine = scenario.steps[shownIndex + 1];
        assert.ok(learnerLine?.options?.length, `${scenario.id}: nothing to pick after line ${shownIndex}`);
        const result = afterCorrectAnswer(scenario.steps, shownIndex + 1);
        answers++;
        if (result.reply) shownIndex += 2;
        finished = result.finished;
        assert.ok(answers <= scenario.steps.length, `${scenario.id}: never finishes`);
      }
      assert.equal(answers, scenario.steps.filter((s) => s.speaker === 'user').length, scenario.id);
    }
  });

  it('a dialogue that ends on the other person\'s closing line finishes after the last answer (it used to hang)', () => {
    const endsOnReply = SCENARIOS.filter((scenario) => scenario.steps[scenario.steps.length - 1].speaker === 'npc');
    assert.ok(endsOnReply.length > 0, 'the bundled scenarios include one that ends on a reply');
    for (const scenario of endsOnReply) {
      const lastLearnerIndex = scenario.steps.length - 2;
      const result = afterCorrectAnswer(scenario.steps, lastLearnerIndex);
      assert.equal(result.reply, scenario.steps[scenario.steps.length - 1], scenario.id);
      assert.equal(result.finished, true, scenario.id);
    }
  });

  it('afterCorrectAnswer: in the middle of a dialogue the reply comes and the dialogue goes on', () => {
    const steps = SCENARIOS[0].steps;
    assert.ok(steps.length >= 5);
    const result = afterCorrectAnswer(steps, 1);
    assert.equal(result.reply, steps[2]);
    assert.equal(result.finished, false);
  });

  it('afterCorrectAnswer: a dialogue that ends on the learner has no reply and is finished', () => {
    const steps = SCENARIOS.find((scenario) => scenario.steps[scenario.steps.length - 1].speaker === 'user')?.steps;
    assert.ok(steps, 'the bundled scenarios include one that ends on the learner');
    assert.deepEqual(afterCorrectAnswer(steps, steps.length - 1), { reply: null, finished: true });
  });
});

const makeStats = (over: Partial<UserStats> = {}): UserStats => ({
  xp: 40,
  streakDays: 0,
  lastActiveDate: '',
  completedLessonsCount: 0,
  perfectLessonsCount: 0,
  speakingAttemptsCount: 0,
  flashcardsMasteredCount: 0,
  aiLessonsCreatedCount: 0,
  completedRoleplays: [],
  unlockedAchievements: [],
  ...over,
});

describe('XP rules', () => {
  it('a repeat pays less than the first time, so lessons and role-plays cannot be farmed for full XP', () => {
    assert.ok(LESSON_REPLAY_XP > 0 && LESSON_REPLAY_XP < LESSON_FIRST_XP);
    assert.ok(ROLEPLAY_REPEAT_XP > 0 && ROLEPLAY_REPEAT_XP < ROLEPLAY_FIRST_XP);
  });

  it('the hearts of one attempt fit what firestore.rules accepts (at most 10)', () => {
    assert.ok(Number.isInteger(MAX_HEARTS) && MAX_HEARTS >= 1 && MAX_HEARTS <= 10);
  });

  it('a lesson pays 50 XP plus 5 for each new-word card the first time, and only 10 when it is repeated', () => {
    assert.equal(getLessonXp(true, 0), LESSON_FIRST_XP);
    assert.equal(getLessonXp(true, 10), LESSON_FIRST_XP + 10 * LEARN_CARD_XP);
    assert.equal(getLessonXp(false, 10), LESSON_REPLAY_XP, 'the cards pay nothing on a repeat');
    assert.equal(getLessonXp(false, 0), LESSON_REPLAY_XP);
  });

  it('getLessonXp never pays less than the lesson itself or more than the cards earn, whatever it is asked', () => {
    for (const odd of [NaN, -3, Infinity, -Infinity, 0.9]) assert.equal(getLessonXp(true, odd), LESSON_FIRST_XP, String(odd));
    assert.equal(getLessonXp(true, 2.7), LESSON_FIRST_XP + 2 * LEARN_CARD_XP);
  });

  it('no built-in lesson can be farmed: a repeat pays far less than the first completion', () => {
    for (const lesson of INITIAL_LESSONS) {
      const cards = buildDuolingoProgression(lesson).filter((step) => step.type === 'learn_word').length;
      const first = getLessonXp(true, cards);
      const repeat = getLessonXp(false, cards);
      assert.ok(first >= LESSON_FIRST_XP && first <= 150, `${lesson.lesson_id}: ${first} XP the first time`);
      assert.ok(repeat * 4 <= first, `${lesson.lesson_id}: ${repeat} XP for a repeat against ${first} the first time`);
    }
  });

  it('Speed Match: 3 XP per pair, plus one per pair already in the streak, at most +3', () => {
    assert.deepEqual([1, 2, 3, 4, 5, 10, 50].map(getSpeedMatchPairXp), [3, 4, 5, 6, 6, 6, 6]);
    assert.equal(getSpeedMatchPairXp(0), 3); // never below the base
    assert.equal(getSpeedMatchPairXp(-4), 3);
  });

  it('Speed Match: a round never pays more than the cap, however well it goes', () => {
    let total = 0;
    for (let combo = 1; combo <= 200; combo++) {
      total = addSpeedMatchXp(total, getSpeedMatchPairXp(combo));
      assert.ok(total <= SPEED_MATCH_ROUND_MAX_XP, `combo ${combo}: ${total}`);
    }
    assert.equal(total, SPEED_MATCH_ROUND_MAX_XP);
    assert.equal(addSpeedMatchXp(SPEED_MATCH_ROUND_MAX_XP - 1, 6), SPEED_MATCH_ROUND_MAX_XP);
    assert.equal(addSpeedMatchXp(SPEED_MATCH_ROUND_MAX_XP, 6), SPEED_MATCH_ROUND_MAX_XP);
  });

  it('Speed Match: a few pairs add up exactly (no cap involved)', () => {
    let total = 0;
    for (const combo of [1, 2, 3]) total = addSpeedMatchXp(total, getSpeedMatchPairXp(combo));
    assert.equal(total, 3 + 4 + 5);
    // a mistake resets the streak, so the next pair is worth the base again
    total = addSpeedMatchXp(total, getSpeedMatchPairXp(1));
    assert.equal(total, 3 + 4 + 5 + 3);
  });
});

describe('streak days', () => {
  it("the day is the learner's local calendar day (built from local parts, so the test is timezone independent)", () => {
    assert.equal(getLocalDateString(new Date(2026, 0, 5, 12)), '2026-01-05');
    assert.equal(getLocalDateString(new Date(2026, 2, 1, 23, 59, 59)), '2026-03-01'); // late evening stays that day
    assert.equal(getLocalDateString(new Date(2026, 2, 2, 0, 0, 1)), '2026-03-02');
    assert.equal(getLocalDateString(new Date(2026, 11, 31, 8)), '2026-12-31');
    assert.match(getLocalDateString(), /^\d{4}-\d{2}-\d{2}$/);
  });

  it('daysBetween counts calendar days across month, year and leap-year boundaries', () => {
    assert.equal(daysBetween('2026-05-10', '2026-05-10'), 0);
    assert.equal(daysBetween('2026-05-10', '2026-05-11'), 1);
    assert.equal(daysBetween('2026-01-31', '2026-02-01'), 1);
    assert.equal(daysBetween('2025-12-31', '2026-01-01'), 1);
    assert.equal(daysBetween('2026-02-28', '2026-03-01'), 1); // not a leap year
    assert.equal(daysBetween('2024-02-28', '2024-03-01'), 2); // leap year: there is a 29th
    assert.equal(daysBetween('2026-03-28', '2026-03-29'), 1); // a daylight-saving switch is still one day
    assert.equal(daysBetween('2026-05-11', '2026-05-10'), -1);
    assert.equal(daysBetween('2026-01-01', '2026-12-31'), 364);
  });

  it('daysBetween gives NaN for anything that is not a date, and never throws', () => {
    for (const bad of ['', 'abc', 'x-y-z']) assert.ok(Number.isNaN(daysBetween(bad, '2026-05-10')), bad);
    for (const bad of [null, undefined, 5, {}]) {
      assert.ok(Number.isNaN(daysBetween(bad as unknown as string, '2026-05-10')), String(bad));
    }
  });

  it('the first completed lesson starts the streak at 1', () => {
    const result = registerLessonDay(makeStats(), '2026-05-10');
    assert.equal(result.streakDays, 1);
    assert.equal(result.lastActiveDate, '2026-05-10');
  });

  it('a second lesson on the same day changes nothing', () => {
    const afterFirst = registerLessonDay(makeStats({ streakDays: 4, lastActiveDate: '2026-05-09' }), '2026-05-10');
    assert.equal(afterFirst.streakDays, 5);
    assert.equal(registerLessonDay(afterFirst, '2026-05-10'), afterFirst);
  });

  it('a lesson the day after extends the streak, including across a month boundary', () => {
    assert.equal(registerLessonDay(makeStats({ streakDays: 2, lastActiveDate: '2026-05-09' }), '2026-05-10').streakDays, 3);
    assert.equal(registerLessonDay(makeStats({ streakDays: 6, lastActiveDate: '2026-01-31' }), '2026-02-01').streakDays, 7);
  });

  it('a missed day starts over at 1, and so does a date in the future (clock set back)', () => {
    assert.equal(registerLessonDay(makeStats({ streakDays: 9, lastActiveDate: '2026-05-08' }), '2026-05-10').streakDays, 1);
    assert.equal(registerLessonDay(makeStats({ streakDays: 9, lastActiveDate: '2026-05-20' }), '2026-05-10').streakDays, 1);
    assert.equal(registerLessonDay(makeStats({ streakDays: 9, lastActiveDate: 'garbage' }), '2026-05-10').streakDays, 1);
  });

  it('registerLessonDay changes only the streak fields and does not edit its input', () => {
    const before = makeStats({ xp: 123, streakDays: 1, lastActiveDate: '2026-05-09', completedRoleplays: ['cafe'] });
    const copy = JSON.stringify(before);
    const after = registerLessonDay(before, '2026-05-10');
    assert.equal(JSON.stringify(before), copy);
    assert.deepEqual({ ...after, streakDays: 0, lastActiveDate: '' }, { ...before, streakDays: 0, lastActiveDate: '' });
  });

  it('expireStreak: a streak survives today and yesterday, and ends after a missed day', () => {
    const base = makeStats({ streakDays: 5 });
    assert.equal(expireStreak({ ...base, lastActiveDate: '2026-05-10' }, '2026-05-10').streakDays, 5);
    assert.equal(expireStreak({ ...base, lastActiveDate: '2026-05-09' }, '2026-05-10').streakDays, 5);
    assert.equal(expireStreak({ ...base, lastActiveDate: '2026-05-08' }, '2026-05-10').streakDays, 0);
    assert.equal(expireStreak({ ...base, lastActiveDate: '2025-05-10' }, '2026-05-10').streakDays, 0);
  });

  it('expireStreak: opening the app never extends a streak, and odd data is left alone', () => {
    const base = makeStats({ streakDays: 5, lastActiveDate: '2026-05-09' });
    const result = expireStreak(base, '2026-05-10');
    assert.equal(result.streakDays, 5);
    assert.equal(result.lastActiveDate, '2026-05-09');
    for (const lastActiveDate of ['', 'garbage', '2026-06-01']) {
      assert.equal(expireStreak({ ...base, lastActiveDate }, '2026-05-10').streakDays, 5, lastActiveDate);
    }
    const nothingToExpire = makeStats({ streakDays: 0, lastActiveDate: '2020-01-01' });
    assert.equal(expireStreak(nothingToExpire, '2026-05-10'), nothingToExpire);
  });

  describe('loadUserStats (reads what an older version of the app saved)', () => {
    const realStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    // A tiny in-memory localStorage; `raw` makes every read return that text instead (for corrupt data)
    const useStorage = (raw: string | null) => {
      const store = new Map<string, string>();
      Object.defineProperty(globalThis, 'localStorage', {
        configurable: true,
        writable: true,
        value: {
          getItem: (key: string) => (raw !== null ? raw : (store.get(key) ?? null)),
          setItem: (key: string, value: string) => void store.set(key, value),
        },
      });
    };
    afterEach(() => {
      if (realStorage) Object.defineProperty(globalThis, 'localStorage', realStorage);
      else delete (globalThis as { localStorage?: unknown }).localStorage;
    });
    const daysAgo = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return getLocalDateString(date);
    };

    it('a new learner starts with no streak and no completed role-plays', () => {
      useStorage(null);
      const loaded = loadUserStats();
      assert.equal(loaded.streakDays, 0);
      assert.equal(loaded.lastActiveDate, '');
      assert.deepEqual(loaded.completedRoleplays, []);
      assert.deepEqual(loaded.unlockedAchievements, []); // nothing is unlocked before it is earned
    });

    it('stats saved before role-play tracking existed get an empty list instead of undefined', () => {
      useStorage(null);
      const { completedRoleplays: _dropped, ...legacy } = makeStats({ streakDays: 2, lastActiveDate: daysAgo(1) });
      saveUserStats(legacy as UserStats);
      assert.deepEqual(loadUserStats().completedRoleplays, []);
    });

    it('a streak that is still alive is kept as it was, and loading does not count today', () => {
      useStorage(null);
      saveUserStats(makeStats({ streakDays: 4, lastActiveDate: daysAgo(1), xp: 777 }));
      const loaded = loadUserStats();
      assert.equal(loaded.streakDays, 4);
      assert.equal(loaded.lastActiveDate, daysAgo(1));
      assert.equal(loaded.xp, 777);
    });

    it('a streak that has been broken is reset when the app opens', () => {
      useStorage(null);
      saveUserStats(makeStats({ streakDays: 7, lastActiveDate: daysAgo(3), xp: 500 }));
      const loaded = loadUserStats();
      assert.equal(loaded.streakDays, 0);
      assert.equal(loaded.xp, 500);
    });

    it('unreadable storage falls back to the defaults instead of crashing the app', () => {
      useStorage('{not json');
      assert.equal(loadUserStats().streakDays, 0);
      useStorage('null');
      assert.equal(loadUserStats().streakDays, 0);
    });
  });
});

describe('achievement rewards', () => {
  const ids = (list: { id: string }[]) => list.map((achievement) => achievement.id).sort();

  it('a fresh learner is owed nothing', () => {
    assert.deepEqual(findNewAchievements(makeStats()), []);
  });

  it('"Birinchi qadam" unlocks, and pays, when the first lesson is finished', () => {
    assert.deepEqual(findNewAchievements(makeStats({ completedLessonsCount: 0 })), []);
    const owed = findNewAchievements(makeStats({ completedLessonsCount: 1 }));
    assert.deepEqual(ids(owed), ['first_step']);
    assert.equal(owed[0].rewardXp, 20);
  });

  it('"Birinchi qadam" with a perfect first lesson is reported together with "Mergan oʻquvchi"', () => {
    const owed = findNewAchievements(makeStats({ completedLessonsCount: 1, perfectLessonsCount: 1 }));
    assert.deepEqual(ids(owed), ['first_step', 'perfect_lesson']);
    assert.equal(owed[0].id, 'first_step'); // listed first, so the toast names it
  });

  it('saves from before it was a real goal list "Birinchi qadam" as unlocked: it shows what was really done and is not paid again', () => {
    const legacyNoLessons = makeStats({ unlockedAchievements: ['first_step'], completedLessonsCount: 0 });
    const shown = getAchievementsWithProgress(legacyNoLessons).find((a) => a.id === 'first_step')!;
    assert.equal(shown.isUnlocked, false);
    assert.equal(shown.progress, 0);
    assert.deepEqual(findNewAchievements(legacyNoLessons), []);

    const legacyWithLessons = makeStats({ unlockedAchievements: ['first_step'], completedLessonsCount: 4 });
    assert.equal(getAchievementsWithProgress(legacyWithLessons).find((a) => a.id === 'first_step')!.isUnlocked, true);
    assert.deepEqual(findNewAchievements(legacyWithLessons), []);
  });

  it('each goal unlocks exactly when its progress is reached', () => {
    assert.deepEqual(ids(findNewAchievements(makeStats({ perfectLessonsCount: 1 }))), ['perfect_lesson']);
    assert.deepEqual(ids(findNewAchievements(makeStats({ aiLessonsCreatedCount: 1 }))), ['ai_explorer']);
    assert.deepEqual(findNewAchievements(makeStats({ streakDays: 2 })), []);
    assert.deepEqual(ids(findNewAchievements(makeStats({ streakDays: 3 }))), ['streak_3']);
    assert.deepEqual(findNewAchievements(makeStats({ speakingAttemptsCount: 2 })), []);
    assert.deepEqual(ids(findNewAchievements(makeStats({ speakingAttemptsCount: 3 }))), ['speaking_master']);
    assert.deepEqual(findNewAchievements(makeStats({ flashcardsMasteredCount: 4 })), []);
    assert.deepEqual(ids(findNewAchievements(makeStats({ flashcardsMasteredCount: 5 }))), ['flashcard_pro']);
  });

  it('several goals reached together are all reported, with their rewards', () => {
    const owed = findNewAchievements(makeStats({ streakDays: 3, perfectLessonsCount: 2, flashcardsMasteredCount: 9 }));
    assert.deepEqual(ids(owed), ['flashcard_pro', 'perfect_lesson', 'streak_3']);
    const reward = (id: string) => ACHIEVEMENTS_LIST.find((achievement) => achievement.id === id)!.rewardXp;
    assert.equal(
      owed.reduce((sum, achievement) => sum + achievement.rewardXp, 0),
      reward('flashcard_pro') + reward('perfect_lesson') + reward('streak_3'),
    );
  });

  it('once recorded as unlocked, an achievement is not owed again (it pays only once)', () => {
    const reached = makeStats({ perfectLessonsCount: 3, streakDays: 5 });
    const owed = findNewAchievements(reached);
    assert.equal(owed.length, 2);
    const paid = { ...reached, unlockedAchievements: [...reached.unlockedAchievements, ...owed.map((a) => a.id)] };
    assert.deepEqual(findNewAchievements(paid), []);
  });

  it('every reward is a positive whole number of XP and every id is unique', () => {
    assert.equal(new Set(ACHIEVEMENTS_LIST.map((a) => a.id)).size, ACHIEVEMENTS_LIST.length);
    for (const achievement of ACHIEVEMENTS_LIST) {
      assert.ok(Number.isInteger(achievement.rewardXp) && achievement.rewardXp > 0, achievement.id);
    }
  });
});

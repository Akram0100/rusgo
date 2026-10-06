import { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_LESSONS } from './data/lessons';
import { Exercise, LessonPackage } from './types/lesson';
import { addRetry, buildDuolingoProgression, lessonStepsDone } from './utils/duolingoFlow';
import { LessonHeader } from './components/LessonHeader';
import { LessonDrawer } from './components/LessonDrawer';
import { AuthModal } from './components/AuthModal';
import { ExerciseRenderer } from './components/ExerciseRenderer';
import { FeedbackBanner } from './components/FeedbackBanner';
import { JsonViewer } from './components/JsonViewer';
import { CompletionModal } from './components/CompletionModal';
import { VocabularyModal } from './components/VocabularyModal';
import { AiLessonModal } from './components/AiLessonModal';
import { SpeakingModal } from './components/SpeakingModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SpeedMatchModal } from './components/SpeedMatchModal';
import { RoleplayModal } from './components/RoleplayModal';
import { DailyGoalToast } from './components/DailyGoalToast';
import { GrammarModal } from './components/GrammarModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { OutOfHearts } from './components/OutOfHearts';
import { AchievementToast } from './components/AchievementToast';
import { ReviewModal, ReviewReminder } from './components/ReviewModal';
import {
  ReviewDeck,
  ReviewQuestion,
  addDays,
  addWords,
  buildReviewSession,
  dueCards,
  gradeCard,
  lessonWords,
  loadReviewDeck,
  saveReviewDeck,
} from './utils/review';
import {
  daysBetween,
  findNewAchievements,
  getLocalDateString,
  loadUserStats,
  registerLessonDay,
  saveUserStats,
} from './utils/gamification';
import {
  MAX_HEARTS,
  LESSON_FIRST_XP,
  getLessonXp,
  ROLEPLAY_FIRST_XP,
  ROLEPLAY_REPEAT_XP,
} from './utils/xp';
import { Achievement, UserStats } from './types/gamification';
import { watchAuthState, loadUserProfile, syncUserProfile, signOutUser } from './utils/cloud';
import {
  playSuccessChime,
  playErrorTone,
  playLessonComplete,
  speakRussian,
  preloadAudioRecordings,
} from './utils/audio';
import { withShuffledChoices } from './utils/shuffle';
import { checkTypedAgainst, isRightOrder } from './utils/typing';

// Lesson levels are free-form strings (AI lessons too); map them onto the three known levels.
const toLevel = (value?: string): 'A1' | 'A2' | 'B1' | null => {
  const level = (value || 'A1').toUpperCase();
  return level === 'A1' || level === 'A2' || level === 'B1' ? level : null;
};

export default function App() {
  const [lessons, setLessons] = useState<LessonPackage[]>(INITIAL_LESSONS);
  const [activeLessonId, setActiveLessonId] = useState<string>(INITIAL_LESSONS[0].lesson_id);
  const [activeTab, setActiveTab] = useState<'trainer' | 'json'>('trainer');

  // CEFR Level State (A1 / A2 / B1)
  const [currentLevel, setCurrentLevel] = useState<'A1' | 'A2' | 'B1'>('A1');

  // Progressive Unlock State (Duolingo style)
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rusgo_unlocked_lessons');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['a1_lesson_01'];
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rusgo_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // User Authentication & Cloud Sync
  const [user, setUser] = useState<any | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Gamburger darslar menyusi holati
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Gamification state
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  // Achievements unlocked a moment ago, shown in the toast until it closes
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isVocabularyOpen, setIsVocabularyOpen] = useState<boolean>(false);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState<boolean>(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState<boolean>(false);
  const [isSpeedMatchOpen, setIsSpeedMatchOpen] = useState<boolean>(false);
  const [isRoleplayOpen, setIsRoleplayOpen] = useState<boolean>(false);
  const [isGrammarOpen, setIsGrammarOpen] = useState<boolean>(false);
  const [speakingTargetText, setSpeakingTargetText] = useState<string>('');

  // Spaced repetition: the words of finished lessons, each due again on its own day
  const [reviewDeck, setReviewDeck] = useState<ReviewDeck>(loadReviewDeck);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  // A new number for every session, so the review screen starts afresh
  const [reviewSessionId, setReviewSessionId] = useState<number>(0);

  useEffect(() => saveReviewDeck(reviewDeck), [reviewDeck]);

  // Lessons finished before the review existed (or on another device) put their words in it, due today
  useEffect(() => {
    const today = getLocalDateString();
    setReviewDeck((deck) =>
      lessons
        .filter((lesson) => completedLessons.includes(lesson.lesson_id))
        .reduce((next, lesson) => addWords(next, lessonWords(lesson), today), deck)
    );
  }, [lessons, completedLessons]);

  // Listen to Firebase Auth state
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    // Firebase is a separate chunk: it starts loading right after the first render
    watchAuthState(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load cloud profile
        const profile = await loadUserProfile(currentUser.uid);
        if (profile) {
          if (profile.unlockedLessons?.length) {
            setUnlockedLessons((prev) => {
              const combined = Array.from(new Set([...prev, ...profile.unlockedLessons]));
              localStorage.setItem('rusgo_unlocked_lessons', JSON.stringify(combined));
              return combined;
            });
          }
          if (profile.completedLessons?.length) {
            setCompletedLessons((prev) => {
              const combined = Array.from(new Set([...prev, ...profile.completedLessons]));
              localStorage.setItem('rusgo_completed_lessons', JSON.stringify(combined));
              return combined;
            });
          }
          if (profile.currentLevel) {
            setCurrentLevel(profile.currentLevel);
          }
          if (profile.xp) {
            setStats((prev) => {
              const next = { ...prev, xp: Math.max(prev.xp, profile.xp) };
              saveUserStats(next);
              return next;
            });
          }
        }
      }
    })
      .then((stop) => {
        if (cancelled) stop();
        else unsubscribe = stop;
      })
      .catch((error) => console.error('Could not start Firebase auth:', error));

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const handleOpenSpeaking = (text: string) => {
    setSpeakingTargetText(text);
    setIsSpeakingModalOpen(true);
  };

  const handleAddXp = (amount: number) => {
    setStats((prev) => {
      const next = { ...prev, xp: prev.xp + amount };
      saveUserStats(next);
      if (user) {
        syncUserProfile({
          uid: user.uid,
          displayName: user.displayName || 'Oʻquvchi',
          photoURL: user.photoURL || null,
          email: user.email || null,
          currentLevel,
          unlockedLessons,
          completedLessons,
          xp: next.xp,
          streakDays: next.streakDays,
          hearts: MAX_HEARTS,
        });
      }
      return next;
    });
  };

  // Lesson progression state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(MAX_HEARTS);
  // The attempt ended because the last heart was spent; the lesson has to be started again
  const [isOutOfHearts, setIsOutOfHearts] = useState<boolean>(false);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  // Exercises answered wrongly: they come back at the end of the lesson until they are answered right
  const [retrySteps, setRetrySteps] = useState<Exercise[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // XP the last completed lesson paid (first completion vs. repeat), for the completion screen
  const [lessonXpEarned, setLessonXpEarned] = useState<number>(LESSON_FIRST_XP);
  // Bumped whenever a lesson is (re)started so its answer choices get reshuffled
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);

  // Exercise interaction state (a typing step keeps the typed text in selectedOption)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // A typed answer accepted with one wrong letter: the spelling to show
  const [typoNote, setTypoNote] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [usedWordIndices, setUsedWordIndices] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const activeLesson = lessons.find((l) => l.lesson_id === activeLessonId) || lessons[0];
  const activeLessonIndex = lessons.findIndex((l) => l.lesson_id === activeLessonId);
  const activeLessonLevel = toLevel(activeLesson.level) ?? currentLevel;
  // Number shown to the learner: position inside the lesson's own level, as in the lessons menu
  const activeLessonNumber =
    lessons
      .filter((l) => (l.level || 'A1').toUpperCase() === (activeLesson.level || 'A1').toUpperCase())
      .findIndex((l) => l.lesson_id === activeLesson.lesson_id) + 1;

  // Duolingo step-by-step progression: teach 1 word first, then test it right away!
  const lessonSteps = useMemo(() => {
    return buildDuolingoProgression(activeLesson);
  }, [activeLesson]);
  // ...then the exercises that were answered wrongly, asked again
  const activeSteps = useMemo(() => [...lessonSteps, ...retrySteps], [lessonSteps, retrySteps]);
  const isRetryStep = currentIndex >= lessonSteps.length;

  const rawExercise = activeSteps[currentIndex] || activeSteps[0];
  // Choices are shuffled for display only; answers are graded by value, so grading is unaffected.
  // shuffleSeed forces a fresh shuffle when the lesson is restarted.
  const currentExercise = useMemo(
    () => (rawExercise && rawExercise.type !== 'learn_word' ? withShuffledChoices(rawExercise) : rawExercise),
    [rawExercise, shuffleSeed]
  );
  // Progress counts the lesson's own steps: a wrong answer does not move it, its retry does once it is right
  const stepsDone = isCompleted
    ? lessonSteps.length
    : lessonStepsDone(lessonSteps.length, currentIndex, isChecked, retrySteps.length);

  // Preload and save audio recordings permanently in local storage for this lesson
  useEffect(() => {
    if (activeLesson) {
      const textsToPreload = [
        ...activeLesson.exercises.map((e) => e.target_audio_text),
        ...(activeLesson.vocabulary || []).map((v) => v.audio_text || v.term),
      ];
      preloadAudioRecordings(textsToPreload);
    }
  }, [activeLesson]);

  // Reset exercise-specific interaction state
  const resetExerciseState = useCallback(() => {
    setSelectedOption(null);
    setSelectedWords([]);
    setUsedWordIndices([]);
    setIsChecked(false);
    setIsCorrect(false);
    setTypoNote(null);
  }, []);

  // Full reset for restarting current lesson
  const handleResetLesson = () => {
    setCurrentIndex(0);
    setHearts(MAX_HEARTS);
    setIsOutOfHearts(false);
    setMistakesCount(0);
    setRetrySteps([]);
    setIsCompleted(false);
    setShuffleSeed((seed) => seed + 1);
    resetExerciseState();
    // Start from the top, not where the long completion screen was scrolled to
    window.scrollTo({ top: 0 });
  };

  // Switch to another lesson
  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    // Keep the level tab in sync with the opened lesson (e.g. "next lesson" crossing from A1 to A2)
    const target = lessons.find((l) => l.lesson_id === lessonId);
    const targetLevel = target && toLevel(target.level);
    if (targetLevel) setCurrentLevel(targetLevel);
    setCurrentIndex(0);
    setHearts(MAX_HEARTS);
    setIsOutOfHearts(false);
    setMistakesCount(0);
    setRetrySteps([]);
    setIsCompleted(false);
    setShuffleSeed((seed) => seed + 1);
    resetExerciseState();
    // The new lesson starts at its top, with its title, progress and hearts in view
    window.scrollTo({ top: 0 });
  };

  // Switch level (A1 / A2 / B1)
  const handleSelectLevel = (level: 'A1' | 'A2' | 'B1') => {
    setCurrentLevel(level);
    const levelLessons = lessons.filter(
      (l) => (l.level || 'A1').toUpperCase() === level.toUpperCase()
    );
    if (levelLessons.length > 0) {
      // Find first unlocked or default to first
      const target =
        levelLessons.find((l) => unlockedLessons.includes(l.lesson_id)) || levelLessons[0];

      // Auto-unlock first lesson of that level if reached
      if (!unlockedLessons.includes(levelLessons[0].lesson_id)) {
        setUnlockedLessons((prev) => {
          const next = [...prev, levelLessons[0].lesson_id];
          localStorage.setItem('rusgo_unlocked_lessons', JSON.stringify(next));
          return next;
        });
      }
      handleSelectLesson(target.lesson_id);
    }
  };

  // Next lesson transition with unlock
  const handleNextLesson = () => {
    const nextIdx = activeLessonIndex + 1;
    if (nextIdx < lessons.length) {
      const nextLessonId = lessons[nextIdx].lesson_id;
      if (!unlockedLessons.includes(nextLessonId)) {
        setUnlockedLessons((prev) => {
          const next = [...prev, nextLessonId];
          localStorage.setItem('rusgo_unlocked_lessons', JSON.stringify(next));
          return next;
        });
      }
      handleSelectLesson(nextLessonId);
    }
  };

  // Progress counters behind the achievements that have no other trigger (see getAchievementsWithProgress)
  const bumpCounter = (key: 'speakingAttemptsCount' | 'flashcardsMasteredCount' | 'aiLessonsCreatedCount') => {
    setStats((prev) => {
      const next = { ...prev, [key]: prev[key] + 1 };
      saveUserStats(next);
      return next;
    });
  };

  // Speaking success handler
  const handleSpeakingSuccess = () => {
    setStats((prev) => {
      const next = { ...prev, xp: prev.xp + 10 };
      saveUserStats(next);
      return next;
    });
  };

  // Review: what is due today and tomorrow, and the words the wrong choices are taken from
  const today = getLocalDateString();
  const dueReview = useMemo(() => dueCards(reviewDeck, today), [reviewDeck, today]);
  const dueTomorrowCount = useMemo(() => dueCards(reviewDeck, addDays(today, 1)).length, [reviewDeck, today]);
  const deckCards = Object.values(reviewDeck);
  const nextDueInDays = deckCards.length > 0
    ? Math.max(0, Math.min(...deckCards.map((card) => daysBetween(today, card.due))))
    : null;

  const handleOpenReview = () => {
    // Wrong choices come from the learner's own words once there are enough of them, else from every lesson
    const pool = deckCards.length >= 4 ? deckCards : lessons.flatMap(lessonWords);
    setReviewQuestions(buildReviewSession(dueReview, pool));
    setReviewSessionId((id) => id + 1);
    setIsReviewOpen(true);
  };

  // The first answer to a word in a session moves it to its next review day
  const handleReviewAnswer = (term: string, right: boolean) => {
    setReviewDeck((deck) => (deck[term] ? { ...deck, [term]: gradeCard(deck[term], right, getLocalDateString()) } : deck));
  };

  // A finished review counts the day for the streak, as a finished lesson does, and pays its XP
  const handleReviewFinished = (xp: number) => {
    setStats((prev) => {
      const next = registerLessonDay(prev, getLocalDateString());
      saveUserStats(next);
      return next;
    });
    handleAddXp(xp);
  };

  // Add a newly generated AI lesson
  const handleLessonGenerated = (newLesson: LessonPackage) => {
    setLessons((prev) => [...prev, newLesson]);
    setUnlockedLessons((prev) => [...prev, newLesson.lesson_id]);
    handleSelectLesson(newLesson.lesson_id);
    // The new lesson is not in `lessons` yet, so handleSelectLesson cannot look its level up
    const newLevel = toLevel(newLesson.level);
    if (newLevel) setCurrentLevel(newLevel);
    bumpCounter('aiLessonsCreatedCount');
  };

  // Multiple choice selection
  const handleSelectOption = (option: string) => {
    if (isChecked) return;
    setSelectedOption(option);
  };

  // Sentence builder: add word from pool
  const handleAddWord = (word: string, indexInPool: number) => {
    if (isChecked) return;
    setSelectedWords((prev) => [...prev, word]);
    setUsedWordIndices((prev) => [...prev, indexInPool]);
  };

  // Sentence builder: remove word from selected list
  const handleRemoveWord = (indexInSelected: number) => {
    if (isChecked) return;
    const poolIndexToRemove = usedWordIndices[indexInSelected];
    setSelectedWords((prev) => prev.filter((_, idx) => idx !== indexInSelected));
    setUsedWordIndices((prev) => prev.filter((idx) => idx !== poolIndexToRemove));
  };

  const isLearnStep = currentExercise?.type === 'learn_word';
  const hasAnswer =
    isLearnStep ||
    (currentExercise?.type === 'multiple_choice' && selectedOption !== null) ||
    (currentExercise?.type === 'fill_blank' && selectedOption !== null) ||
    (currentExercise?.type === 'translate_order' && selectedWords.length > 0) ||
    (currentExercise?.type === 'type_word' && Boolean(selectedOption?.trim()));

  // Proceed to next exercise or complete lesson with unlock & cloud sync
  const handleContinue = useCallback(() => {
    // The answer that was just shown cost the last heart: the attempt ends here
    if (hearts === 0) {
      setIsOutOfHearts(true);
      return;
    }

    if (currentIndex + 1 < activeSteps.length) {
      setCurrentIndex((prev) => prev + 1);
      resetExerciseState();
    } else {
      // A lesson pays full XP (plus a little for each new-word card it taught) the first time and a smaller
      // amount when it is repeated. The cards pay nothing on their own: a failed or repeated attempt cannot farm them.
      const isFirstCompletion = !completedLessons.includes(activeLessonId);
      const learnCards = lessonSteps.filter((step) => step.type === 'learn_word').length;
      const lessonXp = getLessonXp(isFirstCompletion, learnCards);
      const today = getLocalDateString();

      setLessonXpEarned(lessonXp);
      setIsCompleted(true);
      playLessonComplete();

      // 1. Mark lesson as completed
      setCompletedLessons((prev) => {
        const next = Array.from(new Set([...prev, activeLessonId]));
        localStorage.setItem('rusgo_completed_lessons', JSON.stringify(next));
        return next;
      });
      // Its words join the review, first due tomorrow (words already there keep their schedule)
      setReviewDeck((deck) => addWords(deck, lessonWords(activeLesson), addDays(today, 1)));

      // 2. Unlock next lesson (Duolingo style)
      setUnlockedLessons((prev) => {
        const nextLessons = [...prev];
        const nextIdx = activeLessonIndex + 1;
        if (nextIdx < lessons.length) {
          const nextLessonId = lessons[nextIdx].lesson_id;
          if (!nextLessons.includes(nextLessonId)) {
            nextLessons.push(nextLessonId);
          }
        }
        localStorage.setItem('rusgo_unlocked_lessons', JSON.stringify(nextLessons));

        // 3. Cloud Firestore sync
        if (user) {
          syncUserProfile({
            uid: user.uid,
            displayName: user.displayName || 'Oʻquvchi',
            photoURL: user.photoURL || null,
            email: user.email || null,
            currentLevel,
            unlockedLessons: nextLessons,
            completedLessons: Array.from(new Set([...completedLessons, activeLessonId])),
            xp: stats.xp + lessonXp,
            streakDays: registerLessonDay(stats, today).streakDays,
            hearts,
          });
        }

        return nextLessons;
      });

      // Update XP, the streak (a completed lesson is what counts a day) & achievements
      setStats((prev) => {
        const next = {
          ...registerLessonDay(prev, today),
          xp: prev.xp + lessonXp,
          completedLessonsCount: prev.completedLessonsCount + (isFirstCompletion ? 1 : 0),
          perfectLessonsCount:
            mistakesCount === 0 ? prev.perfectLessonsCount + 1 : prev.perfectLessonsCount,
        };
        saveUserStats(next);
        return next;
      });
    }
  }, [
    currentIndex,
    activeSteps,
    lessonSteps,
    resetExerciseState,
    activeLesson,
    activeLessonId,
    activeLessonIndex,
    lessons,
    user,
    currentLevel,
    completedLessons,
    stats,
    hearts,
    mistakesCount,
  ]);

  // Check user answer
  const handleCheck = useCallback(() => {
    if (!currentExercise || !hasAnswer || isChecked) return;

    if (currentExercise.type === 'learn_word') {
      handleContinue();
      return;
    }

    let correct = false;

    if (currentExercise.type === 'multiple_choice') {
      correct = selectedOption === currentExercise.correct_answer;
    } else if (currentExercise.type === 'fill_blank') {
      correct =
        selectedOption?.trim().toLowerCase() ===
        currentExercise.blank_answer.trim().toLowerCase();
    } else if (currentExercise.type === 'translate_order') {
      // The other natural word orders an exercise lists are right too
      correct = isRightOrder(selectedWords, currentExercise.correct_order, currentExercise.accepted_orders);
    } else if (currentExercise.type === 'type_word') {
      // One wrong letter in a longer word still counts, with the spelling of the form being written shown
      const result = checkTypedAgainst(selectedOption ?? '', [currentExercise.answer, ...(currentExercise.accept ?? [])]);
      correct = result.verdict !== 'wrong';
      if (result.verdict === 'typo') setTypoNote(`Imloga eʼtibor bering: ${result.answers.join(' / ')}`);
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playSuccessChime();
      speakRussian(currentExercise.target_audio_text);
    } else {
      playErrorTone();
      setMistakesCount((prev) => prev + 1);
      setHearts((prev) => Math.max(0, prev - 1));
      // Asked again at the end of the lesson (as authored: its choices are shuffled afresh then)
      setRetrySteps((prev) => addRetry(prev, rawExercise));
    }
  }, [currentExercise, rawExercise, hasAnswer, isChecked, selectedOption, selectedWords, handleContinue]);

  // While any modal or the lessons menu is open, Enter belongs to it and must not reach the lesson below
  const isOverlayOpen =
    isDrawerOpen ||
    isAuthModalOpen ||
    isAiModalOpen ||
    isVocabularyOpen ||
    isSpeakingModalOpen ||
    isFlashcardsOpen ||
    isSpeedMatchOpen ||
    isRoleplayOpen ||
    isGrammarOpen ||
    isAchievementsOpen ||
    isLeaderboardOpen ||
    isReviewOpen;

  // Keyboard shortcut listener for Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'trainer' || isCompleted || isOutOfHearts || isOverlayOpen) return;

      if (e.key === 'Enter') {
        if (!isChecked && hasAnswer) {
          e.preventDefault();
          handleCheck();
        } else if (isChecked) {
          e.preventDefault();
          handleContinue();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeTab,
    isCompleted,
    isOutOfHearts,
    isChecked,
    hasAnswer,
    isOverlayOpen,
    handleCheck,
    handleContinue,
  ]);

  // Pay each newly unlocked achievement's XP exactly once, and tell the learner about it
  useEffect(() => {
    const fresh = findNewAchievements(stats);
    if (fresh.length === 0) return;

    setNewAchievements((shown) => [...shown, ...fresh.filter((a) => !shown.some((s) => s.id === a.id))]);
    setStats((prev) => {
      // Re-checked against the latest stats, so running twice for the same stats cannot pay twice
      const due = findNewAchievements(prev);
      if (due.length === 0) return prev;
      const next = {
        ...prev,
        xp: prev.xp + due.reduce((sum, achievement) => sum + achievement.rewardXp, 0),
        unlockedAchievements: [...prev.unlockedAchievements, ...due.map((achievement) => achievement.id)],
      };
      saveUserStats(next);
      return next;
    });
  }, [stats]);

  // A finished role-play pays more the first time than on repeats
  const handleRoleplayComplete = (scenarioId: string) => {
    const firstTime = !stats.completedRoleplays.includes(scenarioId);
    const xp = firstTime ? ROLEPLAY_FIRST_XP : ROLEPLAY_REPEAT_XP;
    handleAddXp(xp);
    if (firstTime) {
      setStats((prev) => {
        if (prev.completedRoleplays.includes(scenarioId)) return prev;
        const next = { ...prev, completedRoleplays: [...prev.completedRoleplays, scenarioId] };
        saveUserStats(next);
        return next;
      });
    }
    return { xp, firstTime };
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  // Determine correct answer text for wrong response banner
  const getCorrectAnswerDisplay = () => {
    if (!currentExercise) return '';
    if (currentExercise.type === 'multiple_choice') return currentExercise.correct_answer;
    if (currentExercise.type === 'fill_blank') return currentExercise.blank_answer;
    if (currentExercise.type === 'translate_order') return currentExercise.correct_order.join(' ');
    if (currentExercise.type === 'type_word') return [currentExercise.answer, ...(currentExercise.accept ?? [])].join(' / ');
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden w-full max-w-full">
      {/* Top Bar Header with Hamburger (☰) Menu and User Profile */}
      <LessonHeader
        currentStep={stepsDone}
        totalSteps={lessonSteps.length}
        hearts={hearts}
        maxHearts={MAX_HEARTS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onResetLesson={handleResetLesson}
        streakDays={stats.streakDays}
        xp={stats.xp}
        currentLevel={activeLessonLevel}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeLessonNumber={activeLessonNumber}
        activeLessonTopic={activeLesson.topic}
        onToggleIntro={() => setIsVocabularyOpen(true)}
      />

      {/* Gamburger Darslar Menyusi (Side Drawer with Level Switcher & Progressive Lock) */}
      <LessonDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lessons={lessons}
        activeLessonId={activeLessonId}
        onSelectLesson={handleSelectLesson}
        streakDays={stats.streakDays}
        xp={stats.xp}
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        unlockedLessons={unlockedLessons}
        completedLessons={completedLessons}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenVocabulary={() => setIsVocabularyOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onOpenSpeedMatch={() => setIsSpeedMatchOpen(true)}
        onOpenRoleplay={() => setIsRoleplayOpen(true)}
        onOpenGrammar={() => setIsGrammarOpen(true)}
        onOpenReview={handleOpenReview}
        reviewDueCount={dueReview.length}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onResetLesson={handleResetLesson}
        onToggleJson={() => setActiveTab(activeTab === 'trainer' ? 'json' : 'trainer')}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-32">
        {/* Words due for review: offered at the start of a lesson and once it is finished */}
        {activeTab === 'trainer' && dueReview.length > 0 && !isOutOfHearts && (isCompleted || (currentIndex === 0 && !isChecked)) && (
          <ReviewReminder count={dueReview.length} onStart={handleOpenReview} />
        )}
        {activeTab === 'trainer' ? (
          isCompleted ? (
            <CompletionModal
              lessonData={activeLesson}
              lessonNumber={activeLessonNumber}
              xpEarned={lessonXpEarned}
              mistakesCount={mistakesCount}
              answeredSteps={lessonSteps.filter((step) => step.type !== 'learn_word').length}
              onRestart={handleResetLesson}
              onNextLesson={handleNextLesson}
              hasNextLesson={activeLessonIndex + 1 < lessons.length}
            />
          ) : isOutOfHearts ? (
            <OutOfHearts
              answered={stepsDone}
              total={lessonSteps.length}
              maxHearts={MAX_HEARTS}
              onRestart={handleResetLesson}
              onOpenLessons={() => setIsDrawerOpen(true)}
            />
          ) : (
            currentExercise && (
              <ExerciseRenderer
                exercise={currentExercise}
                isRetry={isRetryStep}
                selectedAnswer={selectedOption}
                selectedWords={selectedWords}
                usedWordIndices={usedWordIndices}
                isChecked={isChecked}
                isCorrect={isCorrect}
                onSelectOption={handleSelectOption}
                onAddWord={handleAddWord}
                onRemoveWord={handleRemoveWord}
                onOpenSpeaking={handleOpenSpeaking}
                vocabulary={activeLesson.vocabulary}
                onOpenVocabulary={() => setIsVocabularyOpen(true)}
              />
            )
          )
        ) : (
          <JsonViewer lessonData={activeLesson} />
        )}
      </main>

      {/* Bottom Sticky Action / Feedback Footer */}
      {activeTab === 'trainer' && !isCompleted && !isOutOfHearts && currentExercise && (
        <FeedbackBanner
          isChecked={isChecked}
          isCorrect={isCorrect}
          hasAnswer={hasAnswer}
          explanation={currentExercise.explanation}
          note={typoNote ?? undefined}
          correctAnswerText={getCorrectAnswerDisplay()}
          onCheck={handleCheck}
          onContinue={handleContinue}
          targetAudioText={currentExercise.target_audio_text}
          onOpenSpeaking={handleOpenSpeaking}
          isLearnWord={currentExercise.type === 'learn_word'}
        />
      )}

      {/* User Auth Modal (Google / guest) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(signedUser) => {
          setUser(signedUser);
        }}
      />

      {/* Vocabulary Modal */}
      <VocabularyModal
        isOpen={isVocabularyOpen}
        onClose={() => setIsVocabularyOpen(false)}
        topic={activeLesson.topic}
        vocabulary={activeLesson.vocabulary}
        onOpenSpeaking={handleOpenSpeaking}
      />

      {/* AI Lesson Generator Modal */}
      <AiLessonModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onLessonGenerated={handleLessonGenerated}
      />

      {/* Real-time Russian Speaking / Pronunciation Modal */}
      <SpeakingModal
        isOpen={isSpeakingModalOpen}
        onClose={() => setIsSpeakingModalOpen(false)}
        targetText={speakingTargetText}
        onSuccess={handleSpeakingSuccess}
        onAttempt={() => bumpCounter('speakingAttemptsCount')}
      />

      {/* 3D Flip Flashcards Modal for Vocabulary Practice */}
      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
        onMastered={() => bumpCounter('flashcardsMasteredCount')}
        topic={activeLesson.topic}
        vocabulary={activeLesson.vocabulary || []}
        onOpenSpeaking={handleOpenSpeaking}
      />

      {/* Gamification Achievements and Stats Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        stats={stats}
      />

      {/* Speed Match Mini-Game Modal */}
      <SpeedMatchModal
        isOpen={isSpeedMatchOpen}
        onClose={() => setIsSpeedMatchOpen(false)}
        topic={activeLesson.topic}
        vocabulary={activeLesson.vocabulary || []}
        allVocabulary={lessons.flatMap((l) => l.vocabulary || [])}
        onAddXp={handleAddXp}
      />

      {/* Real-life Roleplay Dialogue Simulator Modal */}
      <RoleplayModal
        isOpen={isRoleplayOpen}
        onClose={() => setIsRoleplayOpen(false)}
        onComplete={handleRoleplayComplete}
        onOpenSpeaking={handleOpenSpeaking}
      />

      {/* Spaced repetition: the review of learned words */}
      {isReviewOpen && (
        <ReviewModal
          key={reviewSessionId}
          onClose={() => setIsReviewOpen(false)}
          questions={reviewQuestions}
          deckSize={deckCards.length}
          nextDueInDays={nextDueInDays}
          remainingToday={dueReview.length}
          dueTomorrow={dueTomorrowCount}
          onAnswer={handleReviewAnswer}
          onFinish={handleReviewFinished}
          onMore={handleOpenReview}
        />
      )}

      {/* Grammar Tips and Rules Modal */}
      <GrammarModal
        isOpen={isGrammarOpen}
        onClose={() => setIsGrammarOpen(false)}
      />

      {/* Duolingo Weekly League Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        userXp={stats.xp}
        userStreak={stats.streakDays}
        userName={user?.displayName || 'Siz (Oʻquvchi)'}
        onStartLesson={() => {
          setActiveTab('trainer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Daily Goal Encouragement Toast Notification */}
      <DailyGoalToast
        streakDays={stats.streakDays}
        goalDone={stats.lastActiveDate === getLocalDateString()}
        onStartClick={() => {
          setActiveTab('trainer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Achievement unlocked notification (the XP is already paid when this shows) */}
      <AchievementToast unlocked={newAchievements} onClose={() => setNewAchievements([])} />

      {/* PWA Offline Network Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}

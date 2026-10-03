import { useState, useEffect, useCallback } from 'react';
import { INITIAL_LESSONS } from './data/lessons';
import { LessonPackage } from './types/lesson';
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
import { loadUserStats, saveUserStats } from './utils/gamification';
import { UserStats } from './types/gamification';
import { auth, loadUserProfile, syncUserProfile } from './utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  playSuccessChime,
  playErrorTone,
  playLessonComplete,
  speakRussian,
  preloadAudioRecordings,
} from './utils/audio';

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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
    });
    return () => unsubscribe();
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
          hearts: 3,
        });
      }
      return next;
    });
  };

  // Lesson progression state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Exercise interaction state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [usedWordIndices, setUsedWordIndices] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const activeLesson = lessons.find((l) => l.lesson_id === activeLessonId) || lessons[0];
  const activeLessonIndex = lessons.findIndex((l) => l.lesson_id === activeLessonId);
  const currentExercise = activeLesson.exercises[currentIndex];

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
  }, []);

  // Full reset for restarting current lesson
  const handleResetLesson = () => {
    setCurrentIndex(0);
    setHearts(3);
    setMistakesCount(0);
    setIsCompleted(false);
    resetExerciseState();
  };

  // Switch to another lesson
  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentIndex(0);
    setHearts(3);
    setMistakesCount(0);
    setIsCompleted(false);
    resetExerciseState();
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

  // Speaking success handler
  const handleSpeakingSuccess = () => {
    setStats((prev) => {
      const next = { ...prev, xp: prev.xp + 10 };
      saveUserStats(next);
      return next;
    });
  };

  // Add a newly generated AI lesson
  const handleLessonGenerated = (newLesson: LessonPackage) => {
    setLessons((prev) => [...prev, newLesson]);
    setUnlockedLessons((prev) => [...prev, newLesson.lesson_id]);
    handleSelectLesson(newLesson.lesson_id);
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

  const hasAnswer =
    (currentExercise?.type === 'multiple_choice' && selectedOption !== null) ||
    (currentExercise?.type === 'fill_blank' && selectedOption !== null) ||
    (currentExercise?.type === 'translate_order' && selectedWords.length > 0);

  // Check user answer
  const handleCheck = useCallback(() => {
    if (!currentExercise || !hasAnswer || isChecked) return;

    let correct = false;

    if (currentExercise.type === 'multiple_choice') {
      correct = selectedOption === currentExercise.correct_answer;
    } else if (currentExercise.type === 'fill_blank') {
      correct =
        selectedOption?.trim().toLowerCase() ===
        currentExercise.blank_answer.trim().toLowerCase();
    } else if (currentExercise.type === 'translate_order') {
      const userSentence = selectedWords.join(' ').trim();
      const targetSentence = currentExercise.correct_order.join(' ').trim();
      correct = userSentence === targetSentence;
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
    }
  }, [currentExercise, hasAnswer, isChecked, selectedOption, selectedWords]);

  // Proceed to next exercise or complete lesson with unlock & cloud sync
  const handleContinue = useCallback(() => {
    if (currentIndex + 1 < activeLesson.exercises.length) {
      setCurrentIndex((prev) => prev + 1);
      resetExerciseState();
    } else {
      setIsCompleted(true);
      playLessonComplete();

      // 1. Mark lesson as completed
      setCompletedLessons((prev) => {
        const next = Array.from(new Set([...prev, activeLessonId]));
        localStorage.setItem('rusgo_completed_lessons', JSON.stringify(next));
        return next;
      });

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
            xp: stats.xp + 50,
            streakDays: stats.streakDays,
            hearts,
          });
        }

        return nextLessons;
      });

      // Update XP & achievements
      setStats((prev) => {
        const next = {
          ...prev,
          xp: prev.xp + 50,
          completedLessonsCount: prev.completedLessonsCount + 1,
          perfectLessonsCount:
            mistakesCount === 0 ? prev.perfectLessonsCount + 1 : prev.perfectLessonsCount,
        };
        saveUserStats(next);
        return next;
      });
    }
  }, [
    currentIndex,
    activeLesson.exercises.length,
    resetExerciseState,
    activeLessonId,
    activeLessonIndex,
    lessons,
    user,
    currentLevel,
    completedLessons,
    stats.xp,
    stats.streakDays,
    hearts,
    mistakesCount,
  ]);

  // Keyboard shortcut listener for Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'trainer' || isCompleted || isAiModalOpen || isVocabularyOpen || isAuthModalOpen)
        return;

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
    isChecked,
    hasAnswer,
    isAiModalOpen,
    isVocabularyOpen,
    isAuthModalOpen,
    handleCheck,
    handleContinue,
  ]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Determine correct answer text for wrong response banner
  const getCorrectAnswerDisplay = () => {
    if (!currentExercise) return '';
    if (currentExercise.type === 'multiple_choice') return currentExercise.correct_answer;
    if (currentExercise.type === 'fill_blank') return currentExercise.blank_answer;
    if (currentExercise.type === 'translate_order') return currentExercise.correct_order.join(' ');
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden w-full max-w-full">
      {/* Top Bar Header with Hamburger (☰) Menu and User Profile */}
      <LessonHeader
        currentStep={currentIndex + (isCompleted ? 1 : 0)}
        totalSteps={activeLesson.exercises.length}
        hearts={hearts}
        maxHearts={3}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onResetLesson={handleResetLesson}
        streakDays={stats.streakDays}
        xp={stats.xp}
        currentLevel={currentLevel}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeLessonNumber={activeLessonIndex + 1}
        activeLessonTopic={activeLesson.topic}
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
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onResetLesson={handleResetLesson}
        onToggleJson={() => setActiveTab(activeTab === 'trainer' ? 'json' : 'trainer')}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-32">
        {activeTab === 'trainer' ? (
          isCompleted ? (
            <CompletionModal
              lessonData={activeLesson}
              mistakesCount={mistakesCount}
              onRestart={handleResetLesson}
              onViewJson={() => setActiveTab('json')}
              onNextLesson={handleNextLesson}
              hasNextLesson={activeLessonIndex + 1 < lessons.length}
            />
          ) : (
            currentExercise && (
              <ExerciseRenderer
                exercise={currentExercise}
                selectedAnswer={selectedOption}
                selectedWords={selectedWords}
                usedWordIndices={usedWordIndices}
                isChecked={isChecked}
                isCorrect={isCorrect}
                onSelectOption={handleSelectOption}
                onAddWord={handleAddWord}
                onRemoveWord={handleRemoveWord}
                onOpenSpeaking={handleOpenSpeaking}
              />
            )
          )
        ) : (
          <JsonViewer lessonData={activeLesson} />
        )}
      </main>

      {/* Bottom Sticky Action / Feedback Footer */}
      {activeTab === 'trainer' && !isCompleted && currentExercise && (
        <FeedbackBanner
          isChecked={isChecked}
          isCorrect={isCorrect}
          hasAnswer={hasAnswer}
          explanation={currentExercise.explanation}
          correctAnswerText={getCorrectAnswerDisplay()}
          onCheck={handleCheck}
          onContinue={handleContinue}
          targetAudioText={currentExercise.target_audio_text}
          onOpenSpeaking={handleOpenSpeaking}
        />
      )}

      {/* User Auth Modal (Google / Telegram) */}
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
      />

      {/* 3D Flip Flashcards Modal for Vocabulary Practice */}
      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
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
        onAddXp={handleAddXp}
        onOpenSpeaking={handleOpenSpeaking}
      />

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
        onStartClick={() => {
          setActiveTab('trainer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* PWA Offline Network Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}

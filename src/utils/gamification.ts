import { UserStats, Achievement } from '../types/gamification';

const STATS_STORAGE_KEY = 'duo_rus_user_stats';

const DEFAULT_STATS: UserStats = {
  xp: 40,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  completedLessonsCount: 0,
  perfectLessonsCount: 0,
  speakingAttemptsCount: 0,
  flashcardsMasteredCount: 0,
  aiLessonsCreatedCount: 0,
  unlockedAchievements: ['first_step'],
};

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_step',
    title: 'Birinchi qadam',
    description: 'Birinchi ruscha mashqni muvaffaqiyatli bajardingiz',
    icon: '🌟',
    isUnlocked: true,
    progress: 1,
    maxProgress: 1,
    rewardXp: 20,
  },
  {
    id: 'streak_3',
    title: 'Olovli shijoat',
    description: 'Ketma-ket 3 kunlik streakka erishing',
    icon: '🔥',
    isUnlocked: false,
    progress: 1,
    maxProgress: 3,
    rewardXp: 50,
  },
  {
    id: 'perfect_lesson',
    title: 'Mergan oʻquvchi',
    description: 'Birorta ham xato qilmasdan darsni 100% bajaring',
    icon: '🎯',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardXp: 40,
  },
  {
    id: 'speaking_master',
    title: 'Oltin talaffuz',
    description: 'Mikrofonda kamida 3 marta ruscha gapiring',
    icon: '🎙️',
    isUnlocked: false,
    progress: 0,
    maxProgress: 3,
    rewardXp: 30,
  },
  {
    id: 'flashcard_pro',
    title: 'Soʻzlar ustasi',
    description: '5 ta yangi soʻz kartochkasini yod oling',
    icon: '🎴',
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    rewardXp: 35,
  },
  {
    id: 'ai_explorer',
    title: 'AI Kashfiyotchi',
    description: 'Gemini AI orqali oʻzingiz xohlagan yangi dars yarating',
    icon: '🤖',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardXp: 50,
  },
];

export const loadUserStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);

    // Calculate streak
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        parsed.streakDays = (parsed.streakDays || 1) + 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1; // reset streak if missed a day
      }
      parsed.lastActiveDate = today;
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(parsed));
    }

    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return DEFAULT_STATS;
  }
};

export const saveUserStats = (stats: UserStats) => {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats', e);
  }
};

export const getAchievementsWithProgress = (stats: UserStats): Achievement[] => {
  return ACHIEVEMENTS_LIST.map((ach) => {
    let progress = 0;
    let unlocked = stats.unlockedAchievements.includes(ach.id);

    if (ach.id === 'first_step') {
      progress = 1;
      unlocked = true;
    } else if (ach.id === 'streak_3') {
      progress = Math.min(3, stats.streakDays);
      if (progress >= 3) unlocked = true;
    } else if (ach.id === 'perfect_lesson') {
      progress = Math.min(1, stats.perfectLessonsCount);
      if (progress >= 1) unlocked = true;
    } else if (ach.id === 'speaking_master') {
      progress = Math.min(3, stats.speakingAttemptsCount);
      if (progress >= 3) unlocked = true;
    } else if (ach.id === 'flashcard_pro') {
      progress = Math.min(5, stats.flashcardsMasteredCount);
      if (progress >= 5) unlocked = true;
    } else if (ach.id === 'ai_explorer') {
      progress = Math.min(1, stats.aiLessonsCreatedCount);
      if (progress >= 1) unlocked = true;
    }

    return {
      ...ach,
      progress,
      isUnlocked: unlocked,
    };
  });
};

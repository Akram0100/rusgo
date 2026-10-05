import { UserStats, Achievement } from '../types/gamification';

const STATS_STORAGE_KEY = 'duo_rus_user_stats';

const DEFAULT_STATS: UserStats = {
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
};

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_step',
    title: 'Birinchi qadam',
    description: 'Birinchi ruscha darsni muvaffaqiyatli tugating',
    icon: '🌟',
    isUnlocked: false,
    progress: 0,
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

/**
 * The learner's calendar day as YYYY-MM-DD, in local time. UTC would be wrong here: in Uzbekistan
 * (UTC+5) the UTC date changes at 05:00, so a late-night lesson and an early-morning one would
 * count as the same day.
 */
export const getLocalDateString = (date: Date = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const dayNumber = (day: string): number => {
  // String(): stored stats may hold anything, and this runs while a lesson is being completed
  const [year, month, date] = String(day).split('-').map(Number);
  return Math.round(Date.UTC(year, month - 1, date) / 86_400_000);
};

/** Whole calendar days from `from` to `to` (both YYYY-MM-DD). NaN when either is not a date. */
export const daysBetween = (from: string, to: string): number => dayNumber(to) - dayNumber(from);

/** At app start: a streak whose last lesson day is older than yesterday is over. Opening the app does not extend it. */
export const expireStreak = (stats: UserStats, today: string): UserStats =>
  daysBetween(stats.lastActiveDate, today) > 1 && stats.streakDays !== 0 ? { ...stats, streakDays: 0 } : stats;

/** A lesson or a review was finished today: extends the streak (once per day) or starts a new one. */
export const registerLessonDay = (stats: UserStats, today: string): UserStats => {
  const gap = daysBetween(stats.lastActiveDate, today);
  if (gap === 0) return stats; // today already counted
  return { ...stats, streakDays: gap === 1 ? stats.streakDays + 1 : 1, lastActiveDate: today };
};

export const loadUserStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    return expireStreak({ ...DEFAULT_STATS, ...JSON.parse(raw) }, getLocalDateString());
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
      // Follows the progress alone: saves from before this was a real goal list it as unlocked from the start
      progress = Math.min(1, stats.completedLessonsCount);
      unlocked = progress >= 1;
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

/** Achievements that the current progress has unlocked but that have not paid their XP yet. */
export const findNewAchievements = (stats: UserStats): Achievement[] =>
  getAchievementsWithProgress(stats).filter(
    (achievement) => achievement.isUnlocked && !stats.unlockedAchievements.includes(achievement.id)
  );

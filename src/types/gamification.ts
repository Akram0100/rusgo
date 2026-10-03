export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardXp: number;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  lastActiveDate: string; // local YYYY-MM-DD of the last day a lesson was completed ('' = never)
  completedLessonsCount: number;
  perfectLessonsCount: number;
  speakingAttemptsCount: number;
  flashcardsMasteredCount: number;
  aiLessonsCreatedCount: number;
  completedRoleplays: string[]; // role-play scenarios finished at least once
  unlockedAchievements: string[];
}

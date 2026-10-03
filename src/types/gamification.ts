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
  lastActiveDate: string; // YYYY-MM-DD
  completedLessonsCount: number;
  perfectLessonsCount: number;
  speakingAttemptsCount: number;
  flashcardsMasteredCount: number;
  aiLessonsCreatedCount: number;
  unlockedAchievements: string[];
}

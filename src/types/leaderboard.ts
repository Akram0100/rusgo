export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'diamond';

export interface LeagueInfo {
  tier: LeagueTier;
  nameUz: string;
  nameRu: string;
  minXp: number;
  maxXp: number;
  icon: string;
  badgeColor: string;
  gradient: string;
  promotionThreshold: number; // e.g. Top 3 promote
  demotionThreshold: number;  // e.g. Bottom 3 demote
}

export interface LeaderboardCompetitor {
  id: string;
  name: string;
  avatar: string;
  city: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export const LEAGUES: Record<LeagueTier, LeagueInfo> = {
  bronze: {
    tier: 'bronze',
    nameUz: 'Bronza ligasi',
    nameRu: 'Бронзовая лига',
    minXp: 0,
    maxXp: 250,
    icon: '🥉',
    badgeColor: 'text-amber-800 bg-amber-100 border-amber-300',
    gradient: 'from-amber-700 via-amber-600 to-yellow-600',
    promotionThreshold: 5,
    demotionThreshold: 0,
  },
  silver: {
    tier: 'silver',
    nameUz: 'Kumush ligasi',
    nameRu: 'Серебряная лига',
    minXp: 251,
    maxXp: 600,
    icon: '🥈',
    badgeColor: 'text-slate-800 bg-slate-100 border-slate-300',
    gradient: 'from-slate-400 via-slate-500 to-zinc-600',
    promotionThreshold: 5,
    demotionThreshold: 12,
  },
  gold: {
    tier: 'gold',
    nameUz: 'Oltin ligasi',
    nameRu: 'Золотая лига',
    minXp: 601,
    maxXp: 1200,
    icon: '🥇',
    badgeColor: 'text-yellow-800 bg-yellow-100 border-yellow-300',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    promotionThreshold: 3,
    demotionThreshold: 12,
  },
  sapphire: {
    tier: 'sapphire',
    nameUz: 'Safir ligasi',
    nameRu: 'Сапфировая лига',
    minXp: 1201,
    maxXp: 2500,
    icon: '💎',
    badgeColor: 'text-blue-800 bg-blue-100 border-blue-300',
    gradient: 'from-blue-500 via-indigo-600 to-sky-600',
    promotionThreshold: 3,
    demotionThreshold: 12,
  },
  diamond: {
    tier: 'diamond',
    nameUz: 'Olmos ligasi',
    nameRu: 'Алмазная лига',
    minXp: 2501,
    maxXp: 99999,
    icon: '👑',
    badgeColor: 'text-purple-800 bg-purple-100 border-purple-300',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    promotionThreshold: 1,
    demotionThreshold: 10,
  },
};

export function getUserLeague(xp: number): LeagueInfo {
  if (xp >= 2501) return LEAGUES.diamond;
  if (xp >= 1201) return LEAGUES.sapphire;
  if (xp >= 601) return LEAGUES.gold;
  if (xp >= 251) return LEAGUES.silver;
  return LEAGUES.bronze;
}

export const BASE_COMPETITORS: Omit<LeaderboardCompetitor, 'isCurrentUser'>[] = [
  { id: 'u1', name: 'Jasur Bek', avatar: '👨‍🎓', city: 'Toshkent', xp: 480, streak: 12 },
  { id: 'u2', name: 'Malika Karimova', avatar: '👩‍💼', city: 'Samarqand', xp: 430, streak: 9 },
  { id: 'u3', name: 'Bekzod Aliyev', avatar: '👨‍💻', city: 'Buxoro', xp: 375, streak: 7 },
  { id: 'u4', name: 'Nilufar Usmonova', avatar: '👩‍⚕️', city: 'Fargʻona', xp: 310, streak: 15 },
  { id: 'u5', name: 'Shahzod Nazarov', avatar: '🧑‍🏫', city: 'Andijon', xp: 260, streak: 5 },
  { id: 'u6', name: 'Dilnoza Raximova', avatar: '👩‍🎨', city: 'Namangan', xp: 210, streak: 6 },
  { id: 'u7', name: 'Aziz Mahmudov', avatar: '👨‍🔧', city: 'Qarshi', xp: 170, streak: 4 },
  { id: 'u8', name: 'Madina Saidova', avatar: '👩‍💻', city: 'Xiva', xp: 140, streak: 3 },
  { id: 'u9', name: 'Farrux Qodirov', avatar: '🧑‍🔬', city: 'Termiz', xp: 110, streak: 2 },
  { id: 'u10', name: 'Kamola Ergasheva', avatar: '👩‍🏫', city: 'Navoiy', xp: 85, streak: 2 },
  { id: 'u11', name: 'Otabek Mirzayev', avatar: '👨‍🚀', city: 'Jizzax', xp: 50, streak: 1 },
  { id: 'u12', name: 'Zilola Ahmedova', avatar: '👩‍🍳', city: 'Guliston', xp: 30, streak: 1 },
];

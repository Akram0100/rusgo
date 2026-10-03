import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Heart,
  Flame,
  Zap,
  MoreVertical,
  RotateCcw,
  Code,
  Trophy,
  ChevronDown,
  User,
  LogIn,
} from 'lucide-react';
import { getUserLeague } from '../types/leaderboard';
import { RusGoLogo } from './RusGoLogo';

interface LessonHeaderProps {
  currentStep: number;
  totalSteps: number;
  hearts: number;
  maxHearts: number;
  activeTab: 'trainer' | 'json';
  onTabChange: (tab: 'trainer' | 'json') => void;
  onResetLesson: () => void;
  streakDays?: number;
  xp?: number;
  currentLevel?: 'A1' | 'A2' | 'B1';
  user?: any | null;
  onOpenAuth?: () => void;
  onOpenAchievements?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenDrawer: () => void;
  activeLessonNumber?: number;
  activeLessonTopic?: string;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  currentStep,
  totalSteps,
  hearts,
  activeTab,
  onTabChange,
  onResetLesson,
  streakDays = 1,
  xp = 40,
  currentLevel = 'A1',
  user,
  onOpenAuth,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenDrawer,
  activeLessonNumber = 1,
  activeLessonTopic = 'Tanishuv',
}) => {
  const currentLeague = getUserLeague(xp);
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-full">
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
          {/* Zone 1: Hamburger Menu (☰) + Logo + Active Lesson Selector */}
          <div className="contents lg:flex lg:items-center lg:gap-2 lg:shrink-0">
            {/* Hamburger Button */}
            <button
              onClick={onOpenDrawer}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors cursor-pointer border border-slate-200/80 flex items-center gap-1"
              title="Darslar menyusini ochish (Gamburger)"
              aria-label="Darslar menyusi"
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>

            {/* RusGo Brand Logo */}
            <span className="sm:hidden">
              <RusGoLogo size={32} />
            </span>
            <span className="hidden sm:block">
              <RusGoLogo size={32} showText={true} />
            </span>

            {/* Current Lesson Pill (Clickable -> Opens Drawer) */}
            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 transition-colors cursor-pointer border border-slate-200/70 order-last max-w-[60%] lg:order-none lg:max-w-[210px]"
              title="Barcha darslarni koʻrish uchun bosing"
            >
              <span className="text-emerald-700 font-black shrink-0">
                {currentLevel} • {activeLessonNumber}-dars
              </span>
              <span className="text-slate-500 font-normal truncate">
                {activeLessonTopic}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Zone 2: Focused Duolingo Progress Bar */}
          <div className="order-last flex-1 min-w-[88px] lg:order-none lg:max-w-sm lg:mx-3">
            <div className="flex items-center gap-2">
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 tabular-nums shrink-0">
                {currentStep}/{totalSteps}
              </span>
            </div>
          </div>

          {/* Zone 3: Gamification (Streak, XP, Hearts) & User Account */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Streak */}
            <button
              onClick={onOpenAchievements}
              className="flex items-center gap-1 text-orange-600 font-extrabold text-xs bg-orange-50 hover:bg-orange-100 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-200 transition-colors cursor-pointer"
              title="Kunlik Streak statistikasi"
              aria-label="Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span className="tabular-nums font-black">{streakDays}</span>
            </button>

            {/* XP */}
            <button
              onClick={onOpenLeaderboard || onOpenAchievements}
              className="flex items-center gap-1 text-amber-700 font-extrabold text-xs bg-amber-50 hover:bg-amber-100 px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-200 transition-colors cursor-pointer"
              title={`${currentLeague.nameUz} — ${xp} XP`}
              aria-label="XP va Liga"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              <span className="tabular-nums font-black">{xp}</span>
            </button>

            {/* Hearts */}
            <div
              className="flex items-center gap-0.5 sm:gap-1 text-rose-500 font-extrabold text-xs bg-rose-50 px-2 sm:px-2.5 py-1.5 rounded-xl border border-rose-100"
              title="Qolgan jonlar soni"
              aria-label="Jonlar"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span className="tabular-nums font-black">{hearts}</span>
            </div>

            {/* User Profile / Login Avatar */}
            {user ? (
              <button
                onClick={onOpenDrawer}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-emerald-400 overflow-hidden shrink-0 cursor-pointer shadow-xs"
                title={`${user.displayName || 'Oʻquvchi'} (Hisob faol)`}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    {user.displayName ? user.displayName.slice(0, 1).toUpperCase() : 'U'}
                  </div>
                )}
              </button>
            ) : onOpenAuth ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer"
                title="Google yoki mehmon sifatida kirish"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kirish</span>
              </button>
            ) : null}

            {/* More Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Boshqa parametrlar"
                aria-label="Boshqa parametrlar"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-medium text-slate-700 animate-in fade-in zoom-in-95 duration-100">
                  {onOpenLeaderboard && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenLeaderboard();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800">Liga</div>
                        <div className="text-[11px] text-slate-400">{currentLeague.nameUz}</div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onResetLesson();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Darsni qaytadan boshlash</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onTabChange(activeTab === 'trainer' ? 'json' : 'trainer');
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Code className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>
                      {activeTab === 'trainer' ? "JSON kodini ko'rish" : "Mashg'ulotga qaytish"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

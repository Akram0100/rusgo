import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Achievement } from '../types/gamification';

interface AchievementToastProps {
  unlocked: Achievement[];
  onClose: () => void;
}

/** Tells the learner that an achievement just unlocked and how much XP it paid. */
export const AchievementToast: React.FC<AchievementToastProps> = ({ unlocked, onClose }) => {
  // The timer must not restart every time the parent re-renders with a new onClose function
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (unlocked.length === 0) return;
    const timer = setTimeout(() => closeRef.current(), 6000);
    return () => clearTimeout(timer);
  }, [unlocked]);

  if (unlocked.length === 0) return null;

  const first = unlocked[0];
  const totalXp = unlocked.reduce((sum, achievement) => sum + achievement.rewardXp, 0);

  return (
    <div
      role="status"
      className="fixed top-24 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-sm z-50"
    >
      <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-amber-300 shadow-xl shadow-amber-500/10 p-3.5">
        <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">
          {first.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-600">Yutuq ochildi!</p>
          <p className="text-sm font-extrabold text-slate-900 truncate">
            {first.title}
            {unlocked.length > 1 ? ` va yana ${unlocked.length - 1} ta` : ''}
          </p>
          <p className="text-xs font-bold text-emerald-700">+{totalXp} XP</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

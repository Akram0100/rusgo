import React, { useState, useEffect } from 'react';
import { Flame, X, ArrowRight, Sparkles } from 'lucide-react';

interface DailyGoalToastProps {
  streakDays: number;
  /** A lesson was already completed today, so there is nothing left to remind about. */
  goalDone?: boolean;
  onStartClick?: () => void;
}

export const DailyGoalToast: React.FC<DailyGoalToastProps> = ({
  streakDays,
  goalDone = false,
  onStartClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Show toast after 800ms delay for a smooth entry animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8800);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleStart = () => {
    handleClose();
    if (onStartClick) {
      onStartClick();
    }
  };

  if (goalDone || (!isVisible && isDismissed)) return null;

  return (
    <div
      className={`fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 z-40 sm:max-w-sm sm:w-full transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-emerald-500/20 shadow-emerald-500/10 flex items-start gap-3.5 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-300/20 via-amber-200/10 to-transparent rounded-bl-full pointer-events-none" />

        {/* Mascot / Icon Badge */}
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/25">
          <Flame className="w-6 h-6 fill-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600 flex items-center gap-1">
              <span>Kunlik maqsad</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              • {streakDays} kunlik streak
            </span>
          </div>

          <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
            Bugungi darsingizni boshlang!
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Kunlik olovingizni saqlab qolish uchun bugun kamida bitta darsni tugating.
          </p>

          <button
            onClick={handleStart}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Boshlash</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          title="Yopish"
          aria-label="Yopish"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

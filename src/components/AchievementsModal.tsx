import React from 'react';
import { X, Flame, Zap, Trophy, CheckCircle2, Lock } from 'lucide-react';
import { UserStats } from '../types/gamification';
import { getAchievementsWithProgress } from '../utils/gamification';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  stats,
}) => {
  if (!isOpen) return null;

  const achievements = getAchievementsWithProgress(stats);
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with stats summary */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  Yutuqlar va Statistika
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {unlockedCount} / {achievements.length} ta nishon ochildi
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick stats pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-orange-200/80 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kunlik Streak</p>
                <p className="text-lg font-black text-slate-900">{stats.streakDays} kun 🔥</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Umumiy XP</p>
                <p className="text-lg font-black text-slate-900">{stats.xp} XP ⚡</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                ach.isUnlocked
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  ach.isUnlocked ? 'bg-white shadow-xs' : 'bg-slate-200 grayscale'
                }`}
              >
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{ach.title}</span>
                    {ach.isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </h4>
                  <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                    +{ach.rewardXp} XP
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {ach.description}
                </p>

                {/* Progress bar */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        ach.isUnlocked ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                      style={{
                        width: `${Math.round((ach.progress / ach.maxProgress) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                    {ach.progress}/{ach.maxProgress}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

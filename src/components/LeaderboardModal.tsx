import React, { useMemo } from 'react';
import { X, Trophy, Flame, Zap, Shield, ArrowUp, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { BASE_COMPETITORS, getUserLeague, LeaderboardCompetitor, LEAGUES, LeagueTier } from '../types/leaderboard';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userXp: number;
  userStreak: number;
  userName?: string;
  onStartLesson?: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  userXp,
  userStreak,
  userName = 'Siz (Oʻquvchi)',
  onStartLesson,
}) => {
  const currentLeague = useMemo(() => getUserLeague(userXp), [userXp]);

  // Combine virtual competitors and current user, then sort by XP descending
  const rankings: LeaderboardCompetitor[] = useMemo(() => {
    const list: LeaderboardCompetitor[] = [
      ...BASE_COMPETITORS,
      {
        id: 'current-user',
        name: userName,
        avatar: '🫵',
        city: 'Oʻzbekiston',
        xp: userXp,
        streak: userStreak,
        isCurrentUser: true,
      },
    ];

    return list.sort((a, b) => b.xp - a.xp);
  }, [userXp, userStreak, userName]);

  // Find user rank
  const userRankIndex = rankings.findIndex((c) => c.isCurrentUser);
  const userRank = userRankIndex + 1;

  // Next user XP gap
  const nextTargetUser = userRankIndex > 0 ? rankings[userRankIndex - 1] : null;
  const xpNeeded = nextTargetUser ? nextTargetUser.xp - userXp + 5 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* League Hero Banner */}
        <div className={`p-5 px-6 bg-gradient-to-r ${currentLeague.gradient} text-white relative overflow-hidden shrink-0`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30">
                {currentLeague.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 flex items-center gap-1">
                  <span>Haftalik Liga</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </span>
                <h3 className="text-xl font-black">{currentLeague.nameUz}</h3>
                <p className="text-xs text-white/85 font-medium">{currentLeague.nameRu}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Time Remaining & Status */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-yellow-300" />
              <span>Hafta yakuniga: <b>3 kun 8 soat</b></span>
            </div>
            <div className="font-bold bg-white/20 px-2.5 py-0.5 rounded-full text-[11px]">
              Oʻrningiz: #{userRank}
            </div>
          </div>
        </div>

        {/* Promotion / Demotion Rules Alert */}
        <div className="p-2.5 px-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <ArrowUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Top 5 oʻquvchi yuqori ligaga koʻtariladi! 🚀</span>
          </div>
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
            1-5 oʻrin
          </span>
        </div>

        {/* League Tiers Switcher Bar */}
        <div className="flex items-center gap-1.5 p-2 px-4 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-none shrink-0">
          {(Object.keys(LEAGUES) as LeagueTier[]).map((tierKey) => {
            const league = LEAGUES[tierKey];
            const isCurrent = league.tier === currentLeague.tier;
            return (
              <div
                key={tierKey}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border shrink-0 ${
                  isCurrent
                    ? 'bg-white text-slate-900 border-slate-300 shadow-xs'
                    : 'opacity-50 text-slate-500 border-transparent'
                }`}
                title={league.nameUz}
              >
                <span>{league.icon}</span>
                <span className="hidden sm:inline">{league.nameUz.replace(' ligasi', '')}</span>
              </div>
            );
          })}
        </div>

        {/* Competitors List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
          {rankings.map((competitor, idx) => {
            const rank = idx + 1;
            const isTop3 = rank <= 3;
            const isPromoting = rank <= currentLeague.promotionThreshold;
            const isUser = competitor.isCurrentUser;

            return (
              <div
                key={competitor.id}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all border ${
                  isUser
                    ? 'bg-emerald-50/90 border-2 border-emerald-500 shadow-md shadow-emerald-500/10 scale-[1.01]'
                    : isTop3
                    ? 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50/70'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {/* Left: Rank & Avatar & Name */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div className="w-7 text-center shrink-0">
                    {rank === 1 ? (
                      <span className="text-xl">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-xl">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span
                        className={`text-xs font-black tabular-nums ${
                          isPromoting ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      >
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0 shadow-2xs border border-slate-200">
                    {competitor.avatar}
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        className={`text-sm font-extrabold truncate ${
                          isUser ? 'text-emerald-950 font-black' : 'text-slate-900'
                        }`}
                      >
                        {competitor.name}
                      </p>
                      {isUser && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-600 text-white shrink-0">
                          Siz
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span>{competitor.city}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-orange-600 font-bold">
                        <Flame className="w-3 h-3 fill-orange-500" />
                        <span>{competitor.streak} kun</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: XP points */}
                <div className="text-right shrink-0 pl-2">
                  <div className="flex items-center justify-end gap-1 text-sm font-black text-amber-600 tabular-nums">
                    <Zap className="w-4 h-4 fill-amber-500" />
                    <span>{competitor.xp}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Sticky Footer / CTA */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <p className="text-xs font-bold text-slate-900">
              Siz {userRank}-oʻrindasiz ({userXp} XP)
            </p>
            <p className="text-[11px] text-slate-500">
              {userRank <= 5 ? (
                <span className="text-emerald-600 font-bold">
                  Tabriklaymiz! Siz koʻtarilish zonasidasiz! 🌟
                </span>
              ) : (
                <span>
                  Keyingi oʻringa oʻtish uchun yana <b className="text-amber-600">+{xpNeeded} XP</b> kerak.
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onStartLesson) onStartLesson();
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-amber-300" />
            <span>XP toʻplash (Dars)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

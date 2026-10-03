import React, { useEffect } from 'react';
import { LessonPackage } from '../types/lesson';
import { getUserLeague } from '../types/leaderboard';
import { RusGoLogo } from './RusGoLogo';
import {
  X,
  BookOpen,
  Layers,
  Zap,
  MessageSquare,
  BookText,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  Code,
  RotateCcw,
  GraduationCap,
  User,
  LogIn,
  LogOut,
  Cloud,
} from 'lucide-react';

interface LessonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: LessonPackage[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  streakDays?: number;
  xp?: number;
  currentLevel: 'A1' | 'A2' | 'B1';
  onSelectLevel: (level: 'A1' | 'A2' | 'B1') => void;
  unlockedLessons: string[];
  completedLessons: string[];
  user: any | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenAiModal: () => void;
  onOpenVocabulary: () => void;
  onOpenFlashcards: () => void;
  onOpenSpeedMatch: () => void;
  onOpenRoleplay: () => void;
  onOpenGrammar: () => void;
  onOpenLeaderboard?: () => void;
  onResetLesson?: () => void;
  onToggleJson?: () => void;
  activeTab?: 'trainer' | 'json';
}

export const LessonDrawer: React.FC<LessonDrawerProps> = ({
  isOpen,
  onClose,
  lessons,
  activeLessonId,
  onSelectLesson,
  streakDays = 1,
  xp = 40,
  currentLevel,
  onSelectLevel,
  unlockedLessons,
  completedLessons,
  user,
  onOpenAuth,
  onSignOut,
  onOpenAiModal,
  onOpenVocabulary,
  onOpenFlashcards,
  onOpenSpeedMatch,
  onOpenRoleplay,
  onOpenGrammar,
  onOpenLeaderboard,
  onResetLesson,
  onToggleJson,
  activeTab = 'trainer',
}) => {
  const currentLeague = getUserLeague(xp);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter lessons by currently active level tab (A1 / A2 / B1)
  const filteredLessons = lessons.filter(
    (l) => (l.level || 'A1').toUpperCase() === currentLevel.toUpperCase()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <aside className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300 ease-out border-r border-slate-200">
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <RusGoLogo size={36} showText={true} subtitle="Duolingo Metodikasi" />
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              title="Yopish (Esc)"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. User Account & Cloud Sync Banner */}
          <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-emerald-700" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                      <span>{user.displayName || 'Oʻquvchi'}</span>
                      {!user.isAnonymous && (
                        <span title="Bulutda saqlanmoqda">
                          <Cloud className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {user.isAnonymous ? 'Mehmon hisobi: faqat shu brauzerda' : 'Bulutda sinxronlangan'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-medium cursor-pointer"
                  title="Hisobdan chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <LogIn className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                      Hisobga kirish (Google / mehmon)
                    </div>
                    <div className="text-[10px] text-emerald-700/80">
                      Google bilan kirsangiz natijalar saqlanadi
                    </div>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600">→</span>
              </button>
            )}
          </div>

          {/* 3. Quick Stats Widget */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-orange-700">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{streakDays} kun streak</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-800">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{xp} XP</span>
            </div>
            {onOpenLeaderboard && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLeaderboard();
                }}
                className="flex items-center gap-1 text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
              >
                <span>{currentLeague.icon}</span>
                <span>{currentLeague.nameUz.replace(' ligasi', '')}</span>
              </button>
            )}
          </div>

          {/* 4. CEFR Level Switcher Tabs: [ A1 | A2 | B1 ] */}
          <div className="px-4 pt-3 pb-2 border-b border-slate-100 bg-white">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
              Bosqichni tanlang (Duolingo tartibida)
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['A1', 'A2', 'B1'] as const).map((lvl) => {
                const isActive = currentLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => onSelectLevel(lvl)}
                    className={`py-1.5 px-2 rounded-lg font-black text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{lvl}</span>
                    <span className="block text-[9px] font-medium opacity-80">
                      {lvl === 'A1' ? 'Boshlangʻich' : lvl === 'A2' ? 'Davomiy' : 'Mustaqil'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Lessons List Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {currentLevel} Darslari ({filteredLessons.length} ta)
                  </span>
                </span>
                <span className="text-[11px] font-bold text-emerald-600">
                  {completedLessons.filter((id) => id.startsWith(currentLevel.toLowerCase())).length} /{' '}
                  {filteredLessons.length} bajarildi
                </span>
              </div>

              <div className="space-y-2">
                {filteredLessons.map((lesson, idx) => {
                  const isSelected = lesson.lesson_id === activeLessonId;
                  const isUnlocked = unlockedLessons.includes(lesson.lesson_id);
                  const isDone = completedLessons.includes(lesson.lesson_id);
                  const vocabCount = lesson.vocabulary?.length || 0;
                  const exerciseCount = lesson.exercises?.length || 10;

                  return (
                    <button
                      key={lesson.lesson_id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        if (isUnlocked) {
                          onSelectLesson(lesson.lesson_id);
                          onClose();
                        }
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left border transition-all ${
                        !isUnlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200/60 shadow-xs cursor-pointer'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                      }`}
                      title={!isUnlocked ? "Oldingi darsni yakunlang!" : lesson.topic}
                    >
                      {/* Number / Status Icon */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          !isUnlocked
                            ? 'bg-slate-200 text-slate-500'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {!isUnlocked ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      {/* Lesson Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4
                            className={`text-xs font-bold truncate ${
                              !isUnlocked
                                ? 'text-slate-400'
                                : isSelected
                                ? 'text-emerald-950 font-black'
                                : 'text-slate-800'
                            }`}
                          >
                            {lesson.topic}
                          </h4>
                          {isDone ? (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase shrink-0">
                              ✓ Tayyor
                            </span>
                          ) : isSelected ? (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-extrabold uppercase shrink-0">
                              Hozirgi
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-medium">
                          <span>{exerciseCount} ta mashq</span>
                          {vocabCount > 0 && (
                            <>
                              <span>•</span>
                              <span>{vocabCount} ta soʻz</span>
                            </>
                          )}
                          {!isUnlocked && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-semibold">Qulflangan</span>
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* AI New Lesson Generator */}
              <button
                onClick={() => {
                  onClose();
                  onOpenAiModal();
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>+ Yangi dars yaratish (Gemini AI)</span>
              </button>
            </div>

            {/* Practice & Tools */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2.5">
                Qoʻshimcha trenajyorlar
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenVocabulary();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 transition-colors cursor-pointer text-left"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Lugʻat</div>
                    <div className="text-[10px] text-blue-600/80 truncate">Soʻzlar roʻyxati</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenFlashcards();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 transition-colors cursor-pointer text-left"
                >
                  <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Kartochkalar</div>
                    <div className="text-[10px] text-amber-600/80 truncate">Flashcards</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenSpeedMatch();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100/70 text-orange-900 transition-colors cursor-pointer text-left"
                >
                  <Zap className="w-4 h-4 text-orange-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Juftlash</div>
                    <div className="text-[10px] text-orange-600/80 truncate">Vaqtga qarshi</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenRoleplay();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-purple-900 transition-colors cursor-pointer text-left"
                >
                  <MessageSquare className="w-4 h-4 text-purple-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Muloqot</div>
                    <div className="text-[10px] text-purple-600/80 truncate">Ruscha dialog</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenGrammar();
                }}
                className="w-full mt-2 flex items-center gap-2.5 p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 text-indigo-900 transition-colors cursor-pointer text-left"
              >
                <BookText className="w-4 h-4 text-indigo-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">Grammatika va qoidalar</div>
                  <div className="text-[11px] text-indigo-600/80">CEFR boʻyicha muhim qoidalar</div>
                </div>
              </button>
            </div>
          </div>

          {/* 6. Drawer Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            {onResetLesson && (
              <button
                onClick={() => {
                  onClose();
                  onResetLesson();
                }}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Darsni qayta boshlash"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Qayta boshlash</span>
              </button>
            )}

            {onToggleJson && (
              <button
                onClick={() => {
                  onClose();
                  onToggleJson();
                }}
                className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="JSON ko'rinishi"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{activeTab === 'trainer' ? 'JSON' : 'Mashq'}</span>
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

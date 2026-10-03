import React, { useState, useRef, useEffect } from 'react';
import { LessonPackage } from '../types/lesson';
import { Sparkles, ChevronDown, BookOpen, Layers, Zap, MessageSquare, BookText } from 'lucide-react';

interface LessonSelectorProps {
  lessons: LessonPackage[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onOpenAiModal: () => void;
  onOpenVocabulary: () => void;
  onOpenFlashcards: () => void;
  onOpenSpeedMatch: () => void;
  onOpenRoleplay: () => void;
  onOpenGrammar: () => void;
  onOpenLeaderboard?: () => void;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  onOpenAiModal,
  onOpenVocabulary,
  onOpenFlashcards,
  onOpenSpeedMatch,
  onOpenRoleplay,
  onOpenGrammar,
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLesson = lessons.find((l) => l.lesson_id === activeLessonId) || lessons[0];
  const vocabCount = activeLesson?.vocabulary?.length || 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    if (isToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToolsOpen]);

  return (
    <div className="bg-white border-b border-slate-200 py-2 px-3 sm:px-4 w-full max-w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
        {/* 1. Horizontal scrollable lesson buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-1 min-w-0">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Darslar:
          </span>
          {lessons.map((lesson, idx) => {
            const isSelected = lesson.lesson_id === activeLessonId;
            return (
              <button
                key={lesson.lesson_id}
                onClick={() => onSelectLesson(lesson.lesson_id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{idx + 1}-dars</span>
                <span className="opacity-75 font-normal text-[11px]">({lesson.topic})</span>
              </button>
            );
          })}
        </div>

        {/* 2. Compact Actions Zone: "Qoʻshimcha mashqlar ▾" Dropdown & "+ Yangi dars" */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Unified Exercises Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isToolsOpen
                  ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title="Qoʻshimcha mashqlar va qurollar"
            >
              <span>🎯</span>
              <span className="hidden sm:inline">Qoʻshimcha mashqlar</span>
              <span className="sm:hidden">Mashqlar</span>
              {vocabCount > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-full text-[10px] font-extrabold">
                  {vocabCount}
                </span>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isToolsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isToolsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Mashq turlari va qurollar
                </div>

                {vocabCount > 0 && (
                  <>
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenVocabulary();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-blue-50/60 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span>Lugʻat</span>
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full font-bold">
                            {vocabCount} ta soʻz
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Ushbu darsning barcha yangi soʻzlari
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenFlashcards();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-amber-50/60 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Kartochkalar (Flashcards)</div>
                        <div className="text-[11px] text-slate-500">
                          Soʻzlarni ikki tomonlama kartochkalarda yodlash
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenSpeedMatch();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-orange-50/60 transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Tezkor Juftlash</div>
                        <div className="text-[11px] text-slate-500">
                          Vaqtga qarshi soʻz va maʼnosini bogʻlash
                        </div>
                      </div>
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setIsToolsOpen(false);
                    onOpenRoleplay();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-purple-50/60 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Muloqot (Dialog trenajyor)</div>
                    <div className="text-[11px] text-slate-500">
                      Real hayotiy ruscha suhbatlar va rollar
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsToolsOpen(false);
                    onOpenGrammar();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-indigo-50/60 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BookText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Qoidalar va Grammatika</div>
                    <div className="text-[11px] text-slate-500">
                      A1 darajadagi eng muhim qoidalar qoʻllanmasi
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* "+ Yangi dars (AI)" Button */}
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xs transition-all active:translate-y-0.5 cursor-pointer shrink-0"
            title="Gemini AI orqali istalgan yangi mavzuda dars yaratish"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">+ Yangi dars (AI)</span>
            <span className="sm:hidden">+ Dars</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { LessonPackage } from '../types/lesson';
import { sanitizeGeneratedLesson } from '../utils/validateLesson';

interface AiLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonGenerated: (lesson: LessonPackage) => void;
}

const PRESET_TOPICS = [
  'Restoranda buyurtma berish',
  'Doʻkonda mahsulot xarid qilish',
  'Taksi va jamoat transporti',
  'Mehmonxonada xona bron qilish',
  'Aeroport va bojxona',
  'Vrach va dorixona'
];

export const AiLessonModal: React.FC<AiLessonModalProps> = ({
  isOpen,
  onClose,
  onLessonGenerated,
}) => {
  const [topic, setTopic] = useState<string>('');
  const [level, setLevel] = useState<string>('A1');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), level }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Dars tuzishda xatolik yuz berdi');
      }

      if (data.lesson) {
        // Never trust the model's JSON as-is: repair what can be repaired, drop the rest
        onLessonGenerated(sanitizeGeneratedLesson(data.lesson, { topic: topic.trim(), level }));
        onClose();
      } else {
        throw new Error('Notoʻgʻri format qaytarildi');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Nomaʼlum xatolik';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 to-blue-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Gemini AI bilan Yangi Dars Yaratish
              </h3>
              <p className="text-xs text-slate-500">
                Duolingo metodikasi boʻyicha 5 ta mikro-mashq
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Dars mavzusi
            </label>
            <input
              type="text"
              required
              disabled={isLoading}
              placeholder="Masalan: Restoranda kechki ovqat, Taksi chaqirish..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition-all"
            />
          </div>

          {/* Quick presets */}
          <div>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Ommabop mavzular:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOPICS.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  disabled={isLoading}
                  onClick={() => setTopic(item)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Level selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Qiyinlik darajasi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['A1', 'A2', 'B1'].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  disabled={isLoading}
                  onClick={() => setLevel(lvl)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                    level === lvl
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl} {lvl === 'A1' && '(Nol/Boshlangʻich)'}
                  {lvl === 'A2' && '(Oʻrta)'}
                  {lvl === 'B1' && '(Erkin)'}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Submit button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dars tuzilmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Darsni tuzish</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

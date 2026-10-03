import React from 'react';
import { Trophy, CheckCircle, Volume2, RotateCcw, Code } from 'lucide-react';
import { LessonPackage } from '../types/lesson';
import { speakRussian } from '../utils/audio';

interface CompletionModalProps {
  lessonData: LessonPackage;
  lessonNumber?: number;
  xpEarned?: number;
  mistakesCount: number;
  onRestart: () => void;
  onViewJson: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  lessonData,
  lessonNumber,
  xpEarned = 50,
  mistakesCount,
  onRestart,
  onViewJson,
  onNextLesson,
  hasNextLesson,
}) => {
  const totalExercises = lessonData.exercises.length;
  const accuracy =
    totalExercises > 0
      ? Math.max(0, Math.round(((totalExercises - mistakesCount) / totalExercises) * 100))
      : 100;

  return (
    <div className="w-full max-w-xl mx-auto py-8 text-center animate-in fade-in zoom-in-95 duration-300">
      {/* Trophy badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-600 flex items-center justify-center shadow-lg shadow-amber-100 mb-5">
        <Trophy className="w-10 h-10 animate-bounce" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        Tabriklaymiz! {lessonNumber ? `${lessonNumber}-dars` : 'Dars'} yakunlandi!
      </h1>
      <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
        Siz <b className="text-slate-800">{lessonData.topic}</b> mavzusidagi {totalExercises} ta mikro-mashqni
        muvaffaqiyatli tamomladingiz.
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold">Aniqlik</p>
          <p className="text-2xl font-black text-emerald-600 mt-0.5 tabular-nums">
            {accuracy}%
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold">Oʻrganildi</p>
          <p className="text-2xl font-black text-blue-600 mt-0.5 tabular-nums">
            {totalExercises} ta ibora
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold">Tajriba (XP)</p>
          <p className="text-2xl font-black text-amber-500 mt-0.5 tabular-nums">
            +{xpEarned} XP
          </p>
        </div>
      </div>

      {/* Summary of learned phrases with audio buttons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 text-left shadow-xs">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Oʻzlashtirilgan ruscha iboralar:
        </h4>
        <div className="space-y-2">
          {lessonData.exercises.map((ex) => (
            <div
              key={ex.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">
                  {ex.target_audio_text}
                </span>
              </div>
              <button
                onClick={() => speakRussian(ex.target_audio_text, 0.95)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Talaffuzni eshitish"
                aria-label={`Talaffuzni eshitish: ${ex.target_audio_text}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {hasNextLesson && onNextLesson && (
          <button
            onClick={onNextLesson}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
          >
            <span>Keyingi darsga oʻtish</span>
          </button>
        )}

        <button
          onClick={onRestart}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5 ${
            hasNextLesson ? 'bg-slate-700 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Darsni qayta topshirish</span>
        </button>

        <button
          onClick={onViewJson}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
        >
          <Code className="w-4 h-4 text-emerald-400" />
          <span>JSON kodini koʻrish</span>
        </button>
      </div>
    </div>
  );
};

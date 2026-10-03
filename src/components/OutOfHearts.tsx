import React from 'react';
import { RotateCcw, BookOpen } from 'lucide-react';

interface OutOfHeartsProps {
  answered: number; // exercises answered when the last heart was lost
  total: number;
  maxHearts: number;
  onRestart: () => void;
  onOpenLessons: () => void;
}

export const OutOfHearts: React.FC<OutOfHeartsProps> = ({
  answered,
  total,
  maxHearts,
  onRestart,
  onOpenLessons,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto py-8 text-center" role="alert">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-4xl shadow-lg shadow-rose-100 mb-5">
        💔
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Jonlar tugadi</h1>
      <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
        {maxHearts} ta jonning hammasi sarflandi ({answered}/{total} mashq). Xatolar oʻrganishning bir qismi:
        darsni qaytadan boshlab, yana urinib koʻring.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Darsni qayta boshlash</span>
        </button>

        <button
          onClick={onOpenLessons}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-slate-700 hover:bg-slate-600 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Darslar menyusi</span>
        </button>
      </div>
    </div>
  );
};

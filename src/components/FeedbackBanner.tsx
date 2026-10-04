import React from 'react';
import { CheckCircle2, XCircle, Volume2, Mic, ArrowRight } from 'lucide-react';
import { speakRussian } from '../utils/audio';
import { HighlightedText } from './HighlightedText';

interface FeedbackBannerProps {
  isChecked: boolean;
  isCorrect: boolean;
  hasAnswer: boolean;
  correctAnswerText: string;
  explanation: string;
  targetAudioText: string;
  onCheck: () => void;
  onContinue: () => void;
  onOpenSpeaking?: (text: string) => void;
  isLearnWord?: boolean;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  isChecked,
  isCorrect,
  hasAnswer,
  correctAnswerText,
  explanation,
  targetAudioText,
  onCheck,
  onContinue,
  onOpenSpeaking,
  isLearnWord = false,
}) => {
  if (isLearnWord) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 sm:py-4 px-4 z-40 shadow-lg pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline font-semibold">
            💡 Soʻz va uning talaffuzini eslab qoling
          </span>
          <button
            onClick={onContinue}
            className="w-full sm:w-auto sm:ml-auto px-8 py-3 rounded-2xl font-black text-base transition-all active:translate-y-0.5 shadow-md bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer hover:shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <span>Tushundim, davom etamiz</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    );
  }

  if (!isChecked) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 sm:py-4 px-4 z-40 shadow-lg pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-xs text-slate-400 hidden sm:inline font-medium">
            Javobni tanlang va tekshiring
          </span>
          <button
            disabled={!hasAnswer}
            onClick={onCheck}
            className={`w-full sm:w-auto sm:ml-auto px-8 py-3 rounded-2xl font-black text-base transition-all active:translate-y-0.5 shadow-md ${
              hasAnswer
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer hover:shadow-emerald-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Tekshirish
          </button>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 py-4 sm:py-5 px-4 z-40 border-t-2 shadow-2xl transition-all pb-[max(1rem,env(safe-area-inset-bottom))] ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
          : 'bg-rose-50 border-rose-400 text-rose-950'
      }`}
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Feedback message and explanation */}
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 shrink-0">
            {isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg">
                {isCorrect ? 'Ajoyib! Toʻgʻri javob' : 'Toʻgʻri javob:'}
              </h3>
              <button
                onClick={() => speakRussian(targetAudioText, 0.95)}
                className={`p-1 rounded-md transition-colors ${
                  isCorrect
                    ? 'hover:bg-emerald-200 text-emerald-800'
                    : 'hover:bg-rose-200 text-rose-800'
                }`}
                title="Talaffuzni qayta tinglash"
                aria-label="Talaffuzni qayta tinglash"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {onOpenSpeaking && (
                <button
                  onClick={() => onOpenSpeaking(targetAudioText)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold transition-colors border ${
                    isCorrect
                      ? 'bg-emerald-100/90 border-emerald-300 text-emerald-900 hover:bg-emerald-200'
                      : 'bg-rose-100/90 border-rose-300 text-rose-900 hover:bg-rose-200'
                  }`}
                  title="Talaffuzingizni mikrofonda tekshiring"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-600" />
                  <span>Oʻzingiz ayting</span>
                </button>
              )}
            </div>

            {!isCorrect && (
              <p className="font-bold text-base text-rose-900 mt-0.5">
                {correctAnswerText}
              </p>
            )}

            <div className="text-sm font-medium mt-1 text-slate-700 leading-relaxed max-w-lg">
              <HighlightedText
                text={explanation}
                badgeClassName="font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100/90 text-amber-950 border border-amber-300 inline-block mx-0.5"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className={`px-8 py-3.5 rounded-xl font-bold text-base transition-all active:translate-y-0.5 shadow-md shrink-0 w-full sm:w-auto ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-200'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-200'
          }`}
        >
          {isCorrect ? 'Davom etish' : 'Tushundim'}
        </button>
      </div>
    </footer>
  );
};

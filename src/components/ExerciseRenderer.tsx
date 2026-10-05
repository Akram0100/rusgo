import React, { useEffect } from 'react';
import {
  Exercise,
  MultipleChoiceExercise,
  TranslateOrderExercise,
  FillBlankExercise,
  LearnWordExercise,
} from '../types/lesson';
import { AudioButton } from './AudioButton';
import { HighlightedText } from './HighlightedText';
import { playTileClick, speakRussian } from '../utils/audio';
import { CheckCircle2, XCircle, HelpCircle, Mic, Sparkles, Volume2 } from 'lucide-react';

interface ExerciseRendererProps {
  exercise: Exercise;
  isRetry?: boolean; // asked again at the end of the lesson because it was answered wrongly
  selectedAnswer: string | null;
  selectedWords: string[];
  isChecked: boolean;
  isCorrect: boolean;
  onSelectOption: (option: string) => void;
  onAddWord: (word: string, indexInPool: number) => void;
  onRemoveWord: (indexInSelected: number) => void;
  usedWordIndices: number[];
  onOpenSpeaking?: (text: string) => void;
  vocabulary?: {
    term: string;
    translation: string;
    audio_text?: string;
  }[];
  onOpenVocabulary?: () => void;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  isRetry = false,
  selectedAnswer,
  selectedWords,
  isChecked,
  isCorrect,
  onSelectOption,
  onAddWord,
  onRemoveWord,
  usedWordIndices,
  onOpenSpeaking,
  vocabulary = [],
  onOpenVocabulary,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-0">
      {/* Exercise instruction & audio prompt header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {isRetry ? (
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                🔁 Xatoni tuzatamiz
              </span>
            ) : (
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {exercise.type === 'learn_word' && '✨ Oʻrganamiz'}
                {exercise.type === 'multiple_choice' && (exercise.audio_only ? '🎧 Eshitib tanlang' : 'Variantli test')}
                {exercise.type === 'translate_order' && 'Soʻzlarni tartiblash'}
                {exercise.type === 'fill_blank' && 'Boʻsh joyni toʻldirish'}
              </span>
            )}

            {onOpenVocabulary && vocabulary.length > 0 && exercise.type !== 'learn_word' && (
              <button
                onClick={onOpenVocabulary}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
                title="Dars soʻzlarini koʻrish va eshitish"
              >
                <span>💡 Soʻzlar yordami</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* A listening step has its own big play button below */}
            {!(exercise.type === 'multiple_choice' && exercise.audio_only) && <AudioButton text={exercise.target_audio_text} />}
            {onOpenSpeaking && (
              <button
                onClick={() => onOpenSpeaking(exercise.target_audio_text)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs active:translate-y-0.5 border bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 cursor-pointer"
                title="Talaffuzingizni mikrofonda tekshiring"
                aria-label="Talaffuzni mikrofonda tekshirish"
              >
                <Mic className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Talaffuz</span>
              </button>
            )}
          </div>
        </div>

        <h2 className="text-lg sm:text-2xl font-black text-slate-800 leading-snug break-words">
          <HighlightedText text={exercise.instruction} vocabulary={vocabulary} />
        </h2>
      </div>

      {/* RENDER BY TYPE */}
      {exercise.type === 'learn_word' && (
        <LearnWordView
          exercise={exercise}
          onOpenSpeaking={onOpenSpeaking}
        />
      )}

      {exercise.type === 'multiple_choice' && (
        <MultipleChoiceView
          exercise={exercise}
          selectedAnswer={selectedAnswer}
          isChecked={isChecked}
          isCorrect={isCorrect}
          onSelectOption={onSelectOption}
        />
      )}

      {exercise.type === 'translate_order' && (
        <TranslateOrderView
          exercise={exercise}
          selectedWords={selectedWords}
          usedWordIndices={usedWordIndices}
          isChecked={isChecked}
          isCorrect={isCorrect}
          onAddWord={onAddWord}
          onRemoveWord={onRemoveWord}
        />
      )}

      {exercise.type === 'fill_blank' && (
        <FillBlankView
          exercise={exercise}
          selectedAnswer={selectedAnswer}
          isChecked={isChecked}
          isCorrect={isCorrect}
          onSelectOption={onSelectOption}
        />
      )}
    </div>
  );
};

/* MULTIPLE CHOICE VIEW */
const MultipleChoiceView: React.FC<{
  exercise: MultipleChoiceExercise;
  selectedAnswer: string | null;
  isChecked: boolean;
  isCorrect: boolean;
  onSelectOption: (option: string) => void;
}> = ({ exercise, selectedAnswer, isChecked, isCorrect, onSelectOption }) => {
  return (
    <>
    {exercise.audio_only && <ListenPrompt exercise={exercise} />}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
      {exercise.options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isTarget = option === exercise.correct_answer;

        let style = 'bg-white border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50/80';
        if (isSelected && !isChecked) {
          style = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200 shadow-sm';
        } else if (isChecked) {
          if (isTarget) {
            style = 'bg-emerald-100/80 border-emerald-600 text-emerald-950 font-semibold ring-2 ring-emerald-400';
          } else if (isSelected && !isCorrect) {
            style = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-300';
          } else {
            style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
          }
        }

        return (
          <button
            key={index}
            disabled={isChecked}
            onClick={() => {
              playTileClick();
              onSelectOption(option);
            }}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all relative flex items-center justify-between min-h-[60px] sm:min-h-[72px] active:translate-y-0.5 cursor-pointer w-full ${style}`}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-bold text-xs sm:text-sm shrink-0 border border-slate-200">
                {index + 1}
              </span>
              <span className="text-base sm:text-lg font-bold tracking-wide break-words">
                {option}
              </span>
            </div>

            {isChecked && isTarget && (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-2" />
            )}
            {isChecked && isSelected && !isCorrect && (
              <XCircle className="w-6 h-6 text-rose-500 shrink-0 ml-2" />
            )}
          </button>
        );
      })}
    </div>
    </>
  );
};

/* LISTENING PROMPT: the phrase is only heard, so it plays by itself and can be replayed, slowly too */
const ListenPrompt: React.FC<{ exercise: MultipleChoiceExercise }> = ({ exercise }) => {
  useEffect(() => {
    const timer = setTimeout(() => speakRussian(exercise.target_audio_text), 300);
    return () => clearTimeout(timer);
  }, [exercise]); // a new object for every step, a retry included, so each one plays

  return (
    <div className="mt-4 flex flex-col items-center gap-3 p-5 sm:p-6 rounded-3xl border-2 border-sky-200 bg-sky-50/60">
      <button
        onClick={() => speakRussian(exercise.target_audio_text)}
        className="w-20 h-20 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 active:translate-y-0.5 transition-colors cursor-pointer"
        aria-label="Qayta eshitish"
        title="Qayta eshitish"
      >
        <Volume2 className="w-9 h-9" />
      </button>
      <button
        onClick={() => speakRussian(exercise.target_audio_text, 0.68)}
        className="text-xs font-bold text-sky-700 hover:text-sky-900 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
      >
        🐢 Sekinroq eshitish
      </button>
    </div>
  );
};

/* TRANSLATE ORDER VIEW */
const TranslateOrderView: React.FC<{
  exercise: TranslateOrderExercise;
  selectedWords: string[];
  usedWordIndices: number[];
  isChecked: boolean;
  isCorrect: boolean;
  onAddWord: (word: string, indexInPool: number) => void;
  onRemoveWord: (indexInSelected: number) => void;
}> = ({
  exercise,
  selectedWords,
  usedWordIndices,
  isChecked,
  onAddWord,
  onRemoveWord
}) => {
  return (
    <div className="mt-4 flex flex-col gap-6">
      {/* Selected words answer tray */}
      <div className="min-h-[100px] p-4 bg-slate-100/90 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap gap-2.5 items-center transition-colors">
        {selectedWords.length === 0 ? (
          <p className="text-slate-400 text-sm font-medium italic select-none">
            Pastdagi soʻz bloklarini bosib, toʻgʻri ketma-ketlikda tering...
          </p>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              disabled={isChecked}
              onClick={() => {
                playTileClick();
                onRemoveWord(idx);
              }}
              className="px-4 py-2.5 bg-white text-slate-900 border-2 border-slate-300 hover:border-slate-400 rounded-xl font-bold text-base shadow-sm active:translate-y-0.5 transition-all hover:bg-rose-50 hover:text-rose-700"
              title="Qaytadan olib tashlash uchun bosing"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available words pool */}
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Mavjud soʻzlar bloki:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {exercise.words_pool.map((word, idx) => {
            const isUsed = usedWordIndices.includes(idx);
            return (
              <button
                key={idx}
                disabled={isUsed || isChecked}
                onClick={() => {
                  playTileClick();
                  onAddWord(word, idx);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-base border-2 transition-all shadow-sm ${
                  isUsed
                    ? 'bg-slate-200/60 border-slate-200 text-transparent select-none cursor-default shadow-none'
                    : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50/50 active:translate-y-0.5 cursor-pointer'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* FILL IN THE BLANK VIEW */
const FillBlankView: React.FC<{
  exercise: FillBlankExercise;
  selectedAnswer: string | null;
  isChecked: boolean;
  isCorrect: boolean;
  onSelectOption: (option: string) => void;
}> = ({ exercise, selectedAnswer, isChecked, isCorrect, onSelectOption }) => {
  // Split sentence at "___"
  const parts = exercise.sentence_with_blank.split('___');

  return (
    <div className="mt-4 flex flex-col gap-6">
      {/* Interactive sentence display */}
      <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-center text-xl md:text-2xl font-bold text-slate-800 gap-2 flex-wrap min-h-[96px]">
        <span>{parts[0]}</span>
        <span
          className={`inline-flex items-center justify-center min-w-[90px] px-3.5 py-1.5 rounded-xl border-2 border-dashed transition-all text-center ${
            selectedAnswer
              ? isChecked
                ? isCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold border-solid'
                  : 'bg-rose-100 border-rose-500 text-rose-950 font-extrabold border-solid'
                : 'bg-blue-50 border-blue-500 text-blue-900 border-solid shadow-sm'
              : 'border-slate-300 bg-slate-50 text-slate-400 font-normal text-base'
          }`}
        >
          {selectedAnswer || '...'}
        </span>
        {parts.length > 1 && <span>{parts[1]}</span>}
      </div>

      {exercise.hint && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Maslahat: {exercise.hint}</span>
        </div>
      )}

      {/* Available options */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Tushib qolgan soʻzni tanlang:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {exercise.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isTarget = option === exercise.blank_answer;

            let style = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';
            if (isSelected && !isChecked) {
              style = 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-200 font-bold';
            } else if (isChecked) {
              if (isTarget) {
                style = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-300';
              } else if (isSelected && !isCorrect) {
                style = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
              } else {
                style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isChecked}
                onClick={() => {
                  playTileClick();
                  onSelectOption(option);
                }}
                className={`py-3.5 px-4 rounded-xl border-2 text-center text-lg font-semibold transition-all active:translate-y-0.5 cursor-pointer ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   DUOLINGO STEP: LEARN WORD VIEW
   Presents a single new word / phrase with audio, translation, and tips
   before immediately testing it in the following step.
   ========================================================================= */
const LearnWordView: React.FC<{
  exercise: LearnWordExercise;
  onOpenSpeaking?: (text: string) => void;
}> = ({ exercise, onOpenSpeaking }) => {
  useEffect(() => {
    // Softly play pronunciation once on mount
    const timer = setTimeout(() => {
      speakRussian(exercise.target_audio_text);
    }, 250);
    return () => clearTimeout(timer);
  }, [exercise.id, exercise.target_audio_text]);

  return (
    <div className="mt-2 flex flex-col items-center animate-in fade-in zoom-in-95 duration-250">
      <div className="w-full bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 shadow-xl shadow-emerald-600/5 text-center relative overflow-hidden">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 fill-emerald-600" />
          Yangi soʻz bilan tanishamiz
        </div>

        {/* Big Russian Word */}
        <div className="my-2 sm:my-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {exercise.term}
          </h1>
        </div>

        {/* Audio control & Speaking Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-4">
          <AudioButton text={exercise.target_audio_text} />
          {onOpenSpeaking && (
            <button
              onClick={() => onOpenSpeaking(exercise.target_audio_text)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              title="Talaffuzingizni mikrofonda aytib koʻring"
            >
              <Mic className="w-4 h-4 text-rose-600" />
              <span>Talaffuzni sinash</span>
            </button>
          )}
        </div>

        {/* Uzbek Translation Card */}
        <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs max-w-md mx-auto">
          <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider mb-1">
            Oʻzbekcha maʼnosi:
          </p>
          <p className="text-lg sm:text-xl font-extrabold text-emerald-800">
            {exercise.translation}
          </p>
        </div>

        {/* Context / Tip Note */}
        {exercise.context_note && (
          <div className="mt-3.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium max-w-md mx-auto flex items-center justify-center gap-2">
            <span className="text-base shrink-0">💡</span>
            <span>{exercise.context_note}</span>
          </div>
        )}

        <div className="mt-4 text-[11px] font-bold text-slate-400">
          Ushbu soʻzni eslab qoling — keyingi qadamda aynan shu soʻz boʻyicha sinov boʻladi!
        </div>
      </div>
    </div>
  );
};

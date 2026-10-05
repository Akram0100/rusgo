import React, { useEffect, useState } from 'react';
import { X, RotateCcw, Volume2, Trophy } from 'lucide-react';
import { ReviewQuestion } from '../utils/review';
import { getReviewXp } from '../utils/xp';
import { playErrorTone, playLessonComplete, playSuccessChime, speakRussian } from '../utils/audio';
import { shuffle } from '../utils/shuffle';

interface ReviewModalProps {
  onClose: () => void;
  /** The session, built when the review was opened (empty: nothing is due). Rendered with a new key per session. */
  questions: ReviewQuestion[];
  /** For the screen shown when nothing is due: words in the deck, and days until the next one is due. */
  deckSize: number;
  nextDueInDays: number | null;
  /** Words still due today besides this session, and words due by tomorrow, for the closing screen. */
  remainingToday: number;
  dueTomorrow: number;
  /** The first answer to a word in this session reschedules it (a retry does not change that). */
  onAnswer: (term: string, right: boolean) => void;
  /** Every word has been answered right, some after a retry: pays the XP and counts the day for the streak. */
  onFinish: (xp: number) => void;
  /** Starts another session with the words still due today. */
  onMore: () => void;
}

/** Daily review of the learned words: each one is asked once, and a wrong answer comes back at the end. */
export const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  questions,
  deckSize,
  nextDueInDays,
  remainingToday,
  dueTomorrow,
  onAnswer,
  onFinish,
  onMore,
}) => {
  const [queue, setQueue] = useState<ReviewQuestion[]>(questions);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  // Words whose first answer has been given (and counted) in this session
  const [answered, setAnswered] = useState<string[]>([]);
  const [rightFirst, setRightFirst] = useState(0);
  // Right answers so far, retries included: the progress bar
  const [rightTotal, setRightTotal] = useState(0);
  // Set once the session is finished
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  const question = xpEarned === null ? queue[index] : undefined;
  const isRetry = index >= questions.length;

  // A word shown in Russian is spoken as well
  useEffect(() => {
    if (!question || question.kind !== 'ru_uz') return;
    const timer = setTimeout(() => speakRussian(question.card.audio_text), 250);
    return () => clearTimeout(timer);
  }, [question]);

  const handlePick = (option: string) => {
    if (!question || picked !== null) return;
    const right = option === question.answer;
    setPicked(option);
    if (right) {
      playSuccessChime();
      setRightTotal((count) => count + 1);
    } else {
      playErrorTone();
      // Asked again at the end of the session, its choices in a new order
      setQueue((prev) => [...prev, { ...question, options: shuffle(question.options) }]);
    }
    // The Russian answer is spoken once the question is answered
    if (question.kind === 'uz_ru') setTimeout(() => speakRussian(question.card.audio_text), 300);

    if (!answered.includes(question.card.term)) {
      setAnswered((prev) => [...prev, question.card.term]);
      if (right) setRightFirst((count) => count + 1);
      onAnswer(question.card.term, right);
    }
  };

  const handleContinue = () => {
    if (picked === null) return;
    if (index + 1 < queue.length) {
      setIndex(index + 1);
      setPicked(null);
      return;
    }
    const xp = getReviewXp(rightFirst);
    setXpEarned(xp);
    playLessonComplete();
    onFinish(xp);
  };

  // Keys: 1-4 pick a choice, Enter goes on, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && picked !== null && question) {
        e.preventDefault();
        handleContinue();
      } else if (/^[1-4]$/.test(e.key) && picked === null && question?.options[Number(e.key) - 1]) {
        handlePick(question.options[Number(e.key) - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const optionClass = (option: string) => {
    if (picked === null) return 'border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50 text-slate-800';
    if (question && option === question.answer) return 'border-emerald-400 bg-emerald-50 text-emerald-900';
    if (option === picked) return 'border-rose-400 bg-rose-50 text-rose-900';
    return 'border-slate-200 bg-white text-slate-400';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-violet-50 to-fuchsia-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔁</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Takrorlash</h3>
              <p className="text-xs text-slate-500">Oʻrganilgan soʻzlar esdan chiqmasin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        {questions.length > 0 && xpEarned === null && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((rightTotal / questions.length) * 100)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-500 tabular-nums">
              {rightTotal}/{questions.length}
            </span>
          </div>
        )}

        <div className="overflow-y-auto">
          {questions.length === 0 ? (
            /* Nothing is due */
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">{deckSize === 0 ? '📚' : '🎉'}</div>
              <h4 className="text-lg font-black text-slate-900">Bugun takrorlanadigan soʻz yoʻq</h4>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                {deckSize === 0
                  ? 'Darsni tugatsangiz, uning soʻzlari shu yerda vaqti-vaqti bilan takrorlanadi.'
                  : nextDueInDays === 1
                    ? 'Keyingi takrorlash ertaga.'
                    : nextDueInDays !== null
                      ? `Keyingi takrorlash ${nextDueInDays} kundan keyin.`
                      : ''}
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm cursor-pointer"
              >
                Yopish
              </button>
            </div>
          ) : xpEarned !== null ? (
            /* Session finished */
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center mb-3">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900">Takrorlash tugadi!</h4>
              <p className="text-sm text-slate-500 mt-1.5">
                {questions.length} ta soʻz takrorlandi, {rightFirst} tasi birinchi urinishda toʻgʻri.
              </p>
              <div className="inline-flex mt-4 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-lg">
                +{xpEarned} XP
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {dueTomorrow > 0 ? `Ertaga ${dueTomorrow} ta soʻz takrorlanadi.` : 'Ertaga takrorlanadigan soʻz yoʻq.'}
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
                {remainingToday > 0 && (
                  <button
                    onClick={onMore}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm cursor-pointer"
                  >
                    Yana {remainingToday} ta soʻz
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${
                    remainingToday > 0
                      ? 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-violet-600 hover:bg-violet-500 text-white'
                  }`}
                >
                  Yopish
                </button>
              </div>
            </div>
          ) : question ? (
            /* A question */
            <div className="p-5 sm:p-6">
              <span
                className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  isRetry ? 'text-rose-800 bg-rose-50 border-rose-200' : 'text-violet-800 bg-violet-50 border-violet-200'
                }`}
              >
                {isRetry ? '🔁 Yana bir bor' : question.kind === 'ru_uz' ? 'Tarjimasini tanlang' : 'Ruschasini tanlang'}
              </span>

              <div className="text-center my-5">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 break-words">
                  {question.kind === 'ru_uz' ? question.card.term : question.card.translation}
                </div>
                {question.kind === 'ru_uz' && (
                  <button
                    onClick={() => speakRussian(question.card.audio_text)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    Tinglash
                  </button>
                )}
              </div>

              <div className="grid gap-2.5">
                {question.options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handlePick(option)}
                    disabled={picked !== null}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-2xl border-2 font-bold text-sm sm:text-base transition-colors ${
                      picked === null ? 'cursor-pointer' : 'cursor-default'
                    } ${optionClass(option)}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="break-words">{option}</span>
                  </button>
                ))}
              </div>

              {picked !== null && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className={`text-sm font-bold ${picked === question.answer ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {picked === question.answer ? 'Toʻgʻri!' : `Toʻgʻri javob: ${question.answer}`}
                  </div>
                  <button
                    onClick={handleContinue}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shrink-0 cursor-pointer"
                  >
                    Davom etish
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/** Shown above the lesson when words are due: one tap opens the review. */
export const ReviewReminder: React.FC<{ count: number; onStart: () => void }> = ({ count, onStart }) => (
  <div className="w-full max-w-2xl mx-auto mb-4 flex items-center gap-3 p-3 rounded-2xl border border-violet-200 bg-violet-50/70">
    <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
      <RotateCcw className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-extrabold text-violet-900">{count} ta soʻzni takrorlash vaqti keldi</div>
      <div className="text-xs text-violet-700/80">Bir necha daqiqa: soʻzlar esdan chiqmasin</div>
    </div>
    <button
      onClick={onStart}
      className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 cursor-pointer"
    >
      Takrorlash
    </button>
  </div>
);

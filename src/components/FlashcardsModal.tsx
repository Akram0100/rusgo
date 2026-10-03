import React, { useState, useEffect } from 'react';
import {
  X,
  RotateCcw,
  Volume2,
  Mic,
  Check,
  RotateCw,
  Trophy,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { speakRussian, playTileClick, playSuccessChime } from '../utils/audio';

interface VocabularyItem {
  term: string;
  translation: string;
  audio_text: string;
}

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  vocabulary: VocabularyItem[];
  onOpenSpeaking?: (text: string) => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  topic,
  vocabulary,
  onOpenSpeaking,
}) => {
  const [cards, setCards] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCount, setKnownCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Initialize or reset cards when modal opens or vocabulary changes
  useEffect(() => {
    if (isOpen) {
      setCards([...vocabulary]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setKnownCount(0);
      setReviewCount(0);
      setIsFinished(false);
      if (vocabulary.length > 0) {
        // Auto-pronounce first word
        speakRussian(vocabulary[0].audio_text, 0.95);
      }
    }
  }, [isOpen, vocabulary]);

  if (!isOpen) return null;

  if (cards.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-600 text-sm mb-4">Ushbu dars uchun lugʻat topilmadi.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Yopish
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    playTileClick();
    setIsFlipped((prev) => !prev);
  };

  const handleNext = (mastered: boolean) => {
    // A card marked "repeat" goes to the end of the queue
    const queue = mastered ? cards : [...cards, currentCard];

    if (mastered) {
      setKnownCount((prev) => prev + 1);
      playSuccessChime();
    } else {
      setReviewCount((prev) => prev + 1);
      setCards(queue);
    }

    // Check against the updated queue, otherwise repeating the last card would end the session
    if (currentIndex + 1 < queue.length) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      // Auto-pronounce next card
      speakRussian(queue[currentIndex + 1].audio_text, 0.95);
    } else {
      setIsFinished(true);
      playSuccessChime();
    }
  };

  const handleRestart = () => {
    setCards([...vocabulary]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setReviewCount(0);
    setIsFinished(false);
    if (vocabulary.length > 0) {
      speakRussian(vocabulary[0].audio_text, 0.95);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎴</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Soʻz yodlash kartochkalari
              </h3>
              <p className="text-xs text-slate-500">{topic}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="px-6 pt-4 pb-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
              <span>
                Kartochka: {currentIndex + 1} / {cards.length}
              </span>
              <span className="text-emerald-600 font-extrabold">
                {knownCount} ta yodlandi
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round(((currentIndex + 1) / cards.length) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center">
          {isFinished ? (
            /* Finished Completion View */
            <div className="py-6 text-center animate-in zoom-in-95 w-full">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-md shadow-amber-100">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Barcha kartochkalar tugadi!
              </h4>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Siz ushbu darsdagi barcha yangi soʻzlarni muvaffaqiyatli takrorlab chiqdingiz.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto text-left">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <p className="text-xs font-semibold text-emerald-800">Yodlandi</p>
                  <p className="text-xl font-black text-emerald-700">{knownCount}</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="text-xs font-semibold text-blue-800">Takrorlandi</p>
                  <p className="text-xl font-black text-blue-700">{reviewCount}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qaytadan boshlash</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
                >
                  Darsga qaytish
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Flip Card */
            <div className="w-full flex flex-col items-center">
              <div
                onClick={handleFlip}
                className="w-full h-64 relative cursor-pointer select-none perspective-1000 group mb-4"
              >
                <div
                  className={`w-full h-full rounded-3xl p-6 transition-all duration-500 preserve-3d flex flex-col items-center justify-center shadow-lg border-2 ${
                    isFlipped
                      ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 text-slate-900'
                      : 'bg-white hover:border-emerald-300 border-slate-200 text-slate-900'
                  }`}
                >
                  {!isFlipped ? (
                    /* Front side: Russian term */
                    <div className="text-center flex flex-col items-center justify-between h-full w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Rus tili (Oldi)
                        </span>
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" />
                          Tarjimani koʻrish
                        </span>
                      </div>

                      <div className="my-auto">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                          {currentCard.term}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => speakRussian(currentCard.audio_text, 0.95)}
                          className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors shadow-xs"
                          title="Talaffuzni eshitish"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        {onOpenSpeaking && (
                          <button
                            onClick={() => onOpenSpeaking(currentCard.audio_text)}
                            className="p-2.5 rounded-2xl bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors shadow-xs"
                            title="Mikrofonda oʻzingiz ayting"
                          >
                            <Mic className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Back side: Uzbek translation */
                    <div className="text-center flex flex-col items-center justify-between h-full w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          Oʻzbekcha maʼnosi (Orqasi)
                        </span>
                        <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" />
                          Ruscha matnga qaytish
                        </span>
                      </div>

                      <div className="my-auto">
                        <h2 className="text-2xl md:text-3xl font-black text-indigo-950 mb-1">
                          {currentCard.translation}
                        </h2>
                        <p className="text-sm font-semibold text-indigo-600/90">
                          {currentCard.term}
                        </p>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => speakRussian(currentCard.audio_text, 0.95)}
                          className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors shadow-xs"
                          title="Qayta tinglash"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Repeat or Mastered */}
              <div className="w-full grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleNext(false)}
                  className="py-3 px-4 rounded-2xl font-extrabold text-xs bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                  <span>Yana takrorlayman</span>
                </button>

                <button
                  onClick={() => handleNext(true)}
                  className="py-3 px-4 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Yodladim!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

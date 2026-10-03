import React, { useState, useEffect, useRef } from 'react';
import { X, Zap, Trophy, RotateCcw, Volume2, Timer, Flame, CheckCircle2 } from 'lucide-react';
import { speakRussian, playTileClick, playSuccessChime, playErrorTone } from '../utils/audio';
import { SPEED_MATCH_ROUND_MAX_XP, addSpeedMatchXp, getSpeedMatchPairXp } from '../utils/xp';

interface VocabularyItem {
  term: string;
  translation: string;
  audio_text: string;
}

interface SpeedMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  vocabulary: VocabularyItem[];
  allVocabulary?: VocabularyItem[];
  onAddXp?: (amount: number) => void;
}

interface MatchItem {
  id: string;
  text: string;
  audioText?: string;
  type: 'ru' | 'uz';
  pairId: string;
  isMatched: boolean;
}

export const SpeedMatchModal: React.FC<SpeedMatchModalProps> = ({
  isOpen,
  onClose,
  topic,
  vocabulary,
  allVocabulary = [],
  onAddXp,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [ruItems, setRuItems] = useState<MatchItem[]>([]);
  const [uzItems, setUzItems] = useState<MatchItem[]>([]);
  const [selectedRu, setSelectedRu] = useState<MatchItem | null>(null);
  const [selectedUz, setSelectedUz] = useState<MatchItem | null>(null);
  const [wrongPair, setWrongPair] = useState<{ ruId: string; uzId: string } | null>(null);

  // Pool of available vocabulary items (combine lesson and extra vocab if available)
  const pool = vocabulary.length >= 4 ? vocabulary : (allVocabulary.length >= 4 ? allVocabulary : vocabulary);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // The round's XP is tracked in a ref as well, so it can be paid out from the timer and from closing the
  // modal without depending on a render's state. It is paid once per round, whichever of the two comes first.
  const scoreRef = useRef(0);
  const awardedRef = useRef(true);
  const onAddXpRef = useRef(onAddXp);
  onAddXpRef.current = onAddXp;

  const awardRound = () => {
    if (awardedRef.current) return;
    awardedRef.current = true;
    if (scoreRef.current > 0) onAddXpRef.current?.(scoreRef.current);
  };

  // Reset & start game
  const initGame = () => {
    if (pool.length < 2) return;

    scoreRef.current = 0;
    awardedRef.current = false;

    // Pick 5 random items from pool
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const selectedBatch = shuffledPool.slice(0, Math.min(5, shuffledPool.length));

    const ruList: MatchItem[] = selectedBatch.map((item, idx) => ({
      id: `ru-${idx}-${Date.now()}`,
      text: item.term,
      audioText: item.audio_text,
      type: 'ru' as const,
      pairId: `pair-${item.term}`,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    const uzList: MatchItem[] = selectedBatch.map((item, idx) => ({
      id: `uz-${idx}-${Date.now()}`,
      text: item.translation,
      type: 'uz' as const,
      pairId: `pair-${item.term}`,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    setRuItems(ruList);
    setUzItems(uzList);
    setSelectedRu(null);
    setSelectedUz(null);
    setWrongPair(null);
    setMatchedPairsCount(0);
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setTimeLeft(45);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isOpen) {
      initGame();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      awardRound(); // closing in the middle of a round (or unmounting) still pays what was earned
    };
  }, [isOpen]);

  // The timer ran out: pay the round's XP automatically
  useEffect(() => {
    if (isGameOver) awardRound();
  }, [isGameOver]);

  // Countdown timer effect
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  // Check match whenever user selects one RU and one UZ
  const handleSelectRu = (item: MatchItem) => {
    if (item.isMatched || wrongPair) return;
    playTileClick();
    if (item.audioText) {
      speakRussian(item.audioText, 1.0);
    }
    setSelectedRu(item);

    if (selectedUz) {
      evaluateMatch(item, selectedUz);
    }
  };

  const handleSelectUz = (item: MatchItem) => {
    if (item.isMatched || wrongPair) return;
    playTileClick();
    setSelectedUz(item);

    if (selectedRu) {
      evaluateMatch(selectedRu, item);
    }
  };

  const evaluateMatch = (ru: MatchItem, uz: MatchItem) => {
    if (ru.pairId === uz.pairId) {
      // MATCH SUCCESS!
      playSuccessChime();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));
      scoreRef.current = addSpeedMatchXp(scoreRef.current, getSpeedMatchPairXp(newCombo));
      setScore(scoreRef.current);
      setMatchedPairsCount((prev) => prev + 1);

      // Mark items as matched
      setRuItems((prev) =>
        prev.map((i) => (i.id === ru.id ? { ...i, isMatched: true } : i))
      );
      setUzItems((prev) =>
        prev.map((i) => (i.id === uz.id ? { ...i, isMatched: true } : i))
      );

      setSelectedRu(null);
      setSelectedUz(null);

      // Check if all in this round are matched
      const remainingUnmatched = ruItems.filter(
        (i) => !i.isMatched && i.id !== ru.id
      ).length;

      if (remainingUnmatched === 0) {
        // Load next batch smoothly
        setTimeout(() => {
          loadNextRound();
        }, 500);
      }
    } else {
      // MISMATCH
      playErrorTone();
      setCombo(0);
      setWrongPair({ ruId: ru.id, uzId: uz.id });

      setTimeout(() => {
        setWrongPair(null);
        setSelectedRu(null);
        setSelectedUz(null);
      }, 500);
    }
  };

  const loadNextRound = () => {
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const selectedBatch = shuffledPool.slice(0, Math.min(5, shuffledPool.length));

    const ruList: MatchItem[] = selectedBatch.map((item, idx) => ({
      id: `ru-${idx}-${Date.now()}`,
      text: item.term,
      audioText: item.audio_text,
      type: 'ru' as const,
      pairId: `pair-${item.term}`,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    const uzList: MatchItem[] = selectedBatch.map((item, idx) => ({
      id: `uz-${idx}-${Date.now()}`,
      text: item.translation,
      type: 'uz' as const,
      pairId: `pair-${item.term}`,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    setRuItems(ruList);
    setUzItems(uzList);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Tezkor Juftlash (Speed Match)
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

        {/* Status Bar: Time, Score, Combo */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 font-black text-sm px-3 py-1 rounded-xl border ${
            timeLeft <= 10
              ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
              : 'bg-white text-slate-700 border-slate-200'
          }`}>
            <Timer className="w-4 h-4 text-amber-500" />
            <span className="tabular-nums">{timeLeft}s</span>
          </div>

          {/* Combo Multiplier */}
          <div className="flex items-center gap-1.5">
            <Flame className={`w-4 h-4 ${combo > 1 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-slate-300'}`} />
            <span className={`text-xs font-black uppercase ${combo > 1 ? 'text-orange-600' : 'text-slate-400'}`}>
              {combo}x Combo
            </span>
          </div>

          {/* Score XP */}
          <div
            className="flex items-center gap-1.5 font-black text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl"
            title={`Bir raundda koʻpi bilan ${SPEED_MATCH_ROUND_MAX_XP} XP olinadi`}
          >
            <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span>
              +{score} XP{score >= SPEED_MATCH_ROUND_MAX_XP ? ' (maks.)' : ''}
            </span>
          </div>
        </div>

        {/* Game Arena */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          {isGameOver ? (
            /* Game Over / Summary Screen */
            <div className="text-center py-6 animate-in zoom-in-95">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-md shadow-amber-100">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Vaqt tugadi!</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Tezkor reaktsiya va soʻz boyligingiz ajoyib natija berdi!
              </p>

              <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto mb-6 text-left">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <p className="text-[11px] font-bold text-emerald-800">Topilgan juftlik</p>
                  <p className="text-xl font-black text-emerald-700">{matchedPairsCount}</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl">
                  <p className="text-[11px] font-bold text-orange-800">Maks. Combo</p>
                  <p className="text-xl font-black text-orange-700">{maxCombo}x 🔥</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
                  <p className="text-[11px] font-bold text-amber-800">Qoʻshilgan XP</p>
                  <p className="text-xl font-black text-amber-700">+{score} ⚡</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={initGame}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qaytadan oʻynash</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>
          ) : (
            /* Active Match Columns */
            <div className="grid grid-cols-2 gap-4">
              {/* Russian Column */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">
                  Ruscha
                </p>
                {ruItems.map((item) => {
                  const isSelected = selectedRu?.id === item.id;
                  const isWrong = wrongPair?.ruId === item.id;

                  if (item.isMatched) {
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-700 font-extrabold text-sm flex items-center justify-center gap-1.5 opacity-60 pointer-events-none transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{item.text}</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectRu(item)}
                      className={`w-full p-3.5 rounded-2xl font-bold text-sm text-center border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-between ${
                        isWrong
                          ? 'bg-rose-100 border-rose-400 text-rose-900 animate-shake'
                          : isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex-1 text-center font-extrabold">{item.text}</span>
                      <Volume2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Uzbek Column */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">
                  Oʻzbekcha
                </p>
                {uzItems.map((item) => {
                  const isSelected = selectedUz?.id === item.id;
                  const isWrong = wrongPair?.uzId === item.id;

                  if (item.isMatched) {
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-700 font-extrabold text-sm flex items-center justify-center gap-1.5 opacity-60 pointer-events-none transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{item.text}</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectUz(item)}
                      className={`w-full p-3.5 rounded-2xl font-bold text-sm text-center border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                        isWrong
                          ? 'bg-rose-100 border-rose-400 text-rose-900 animate-shake'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-extrabold">{item.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

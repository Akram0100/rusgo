import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { speakRussian, playSuccessChime, playErrorTone } from '../utils/audio';

interface SpeakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetText: string;
  instructionText?: string;
  onSuccess?: () => void;
}

export const SpeakingModal: React.FC<SpeakingModalProps> = ({
  isOpen,
  onClose,
  targetText,
  instructionText = 'Jumlani eshiting va mikrofonga rus tilida aniq ayting',
  onSuccess,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'evaluating' | 'success' | 'retry'>('idle');
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
      setTranscript('');
      setStatus('idle');
      setSimilarity(null);
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Clean words helper
  const cleanWord = (w: string) => w.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '');

  const targetWords = targetText.split(/\s+/).map(cleanWord).filter(Boolean);

  const calculateSimilarity = (spoken: string): number => {
    const spokenWords = spoken.split(/\s+/).map(cleanWord).filter(Boolean);
    if (spokenWords.length === 0 || targetWords.length === 0) return 0;

    let matched = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) matched++;
    });

    return Math.round((matched / targetWords.length) * 100);
  };

  const startListening = () => {
    // Check SpeechRecognition support
    const SpeechRecognitionClass =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setErrorMsg('Brauzeringizda ovozni aniqlash (Speech Recognition) qoʻllab-quvvatlanmaydi. Chrome yoki Edge brauzeridan foydalaning.');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('listening');
        setTranscript('');
        setErrorMsg(null);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Mikrofon ruxsati berilmadi. Iltimos, brauzer sozlamalarida mikrofonga ruxsat bering.');
        } else {
          setErrorMsg(`Ovozni eshitishda xatolik: ${event.error}`);
        }
        setStatus('retry');
      };

      recognition.onend = () => {
        setIsListening(false);
        evaluateSpokenText();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Mikrofonni faollashtirishda xatolik';
      setErrorMsg(msg);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const evaluateSpokenText = () => {
    if (!transcript.trim()) {
      setStatus('retry');
      return;
    }

    const sim = calculateSimilarity(transcript);
    setSimilarity(sim);

    if (sim >= 70) {
      setStatus('success');
      playSuccessChime();
      if (onSuccess) onSuccess();
    } else {
      setStatus('retry');
      playErrorTone();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden text-center">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Talaffuz trenajyori (Speaking)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
          <p className="text-xs font-medium text-slate-500 mb-2">{instructionText}</p>

          {/* Target phrase card */}
          <div className="w-full bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 mb-5 flex items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Ruscha maqsadli jumla:
              </span>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {targetText}
              </p>
            </div>
            <button
              onClick={() => speakRussian(targetText, 0.95)}
              className="p-3 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl shadow-sm border border-emerald-300 transition-all shrink-0 active:translate-y-0.5"
              title="Namunaviy toza talaffuzni tinglash"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Transcript display */}
          <div className="w-full min-h-[70px] p-3.5 bg-slate-50 border border-slate-200 rounded-2xl mb-6 flex flex-col items-center justify-center">
            {transcript ? (
              <p className="text-base font-bold text-slate-800">
                &ldquo;{transcript}&rdquo;
              </p>
            ) : isListening ? (
              <p className="text-sm font-semibold text-emerald-600 animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Eshitilmoqda... Ruscha gapiring!</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 font-medium">
                Mikrofon tugmasini bosing va jumlani ayting
              </p>
            )}
          </div>

          {/* Big Microphone Action Button */}
          <div className="mb-5">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white ring-8 ring-rose-100 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-200'
              }`}
              title={isListening ? "To'xtatish" : "Gapirish uchun bosing"}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
            <p className="text-xs font-bold text-slate-500 mt-2">
              {isListening ? "Toʻxtatish uchun bosing" : "Gapirish uchun bosing"}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="w-full p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium mb-4 flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Evaluation Feedback Result */}
          {status === 'success' && (
            <div className="w-full p-4 bg-emerald-100/80 border border-emerald-300 rounded-2xl text-emerald-950 flex items-center justify-between gap-3 animate-in zoom-in-95">
              <div className="flex items-center gap-2.5 text-left">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm">Ajoyib talaffuz!</h4>
                  <p className="text-xs text-emerald-800">
                    Oʻxshashlik: {similarity}% · Talaffuz 100% tushunarli
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs shrink-0"
              >
                Davom etish
              </button>
            </div>
          )}

          {status === 'retry' && !errorMsg && (
            <div className="w-full p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs font-semibold">
                  Yetarli aniqlikda boʻlmadi ({similarity || 0}%). Qaytadan aniqroq aytib koʻring.
                </p>
              </div>
              <button
                onClick={startListening}
                className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold shrink-0 hover:bg-amber-600"
              >
                Qayta urinish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

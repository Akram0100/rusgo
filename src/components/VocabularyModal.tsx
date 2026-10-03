import { X, Volume2, BookOpen, Mic } from 'lucide-react';
import { speakRussian } from '../utils/audio';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  vocabulary?: {
    term: string;
    translation: string;
    audio_text: string;
  }[];
  onOpenSpeaking?: (text: string) => void;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  topic,
  vocabulary = [],
  onOpenSpeaking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Dars lugʻati</h3>
              <p className="text-xs text-slate-500">{topic}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-2.5 divide-y divide-slate-100">
          {vocabulary.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">
              Ushbu dars uchun lugʻat biriktirilmagan.
            </p>
          ) : (
            vocabulary.map((item, idx) => (
              <div
                key={idx}
                className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 group"
              >
                <div>
                  <p className="font-bold text-base text-slate-900 flex items-center gap-2">
                    {item.term}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {item.translation}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => speakRussian(item.audio_text, 0.95)}
                    className="p-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    title="Talaffuzni eshitish"
                    aria-label={`Talaffuzni eshitish: ${item.term}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {onOpenSpeaking && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSpeaking(item.audio_text);
                      }}
                      className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      title="Oʻzingiz aytib talaffuzni sinab koʻring"
                      aria-label={`Talaffuzni sinash: ${item.term}`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

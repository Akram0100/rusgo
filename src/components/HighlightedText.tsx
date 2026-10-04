import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakRussian } from '../utils/audio';

interface HighlightedTextProps {
  text: string;
  className?: string;
  badgeClassName?: string;
  vocabulary?: {
    term: string;
    translation: string;
    audio_text?: string;
  }[];
}

/**
 * Highlights words or phrases enclosed in single quotes ('...'),
 * curly quotes (‘...’), double quotes ("..."), or guillemets («...»)
 * in a distinctive Duolingo emerald badge color.
 * Supports Tap-to-Translate when vocabulary is provided.
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  className = '',
  badgeClassName = 'text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-lg font-black shadow-2xs inline-block mx-0.5',
  vocabulary = [],
}) => {
  const [activeTooltip, setActiveTooltip] = useState<{
    text: string;
    translation?: string;
    audioText?: string;
  } | null>(null);

  if (!text) return null;

  // Match quoted segments like 'Assalomu alaykum', "Привет", «Здравствуйте»
  const parts = text.split(/(['"‘«][^'"’»]+['"’»])/g);

  const findTranslation = (cleanText: string) => {
    const lower = cleanText.toLowerCase().trim();
    const match = vocabulary.find(
      (v) =>
        v.term.toLowerCase().trim() === lower ||
        lower.includes(v.term.toLowerCase().trim()) ||
        (v.audio_text && v.audio_text.toLowerCase().trim() === lower)
    );
    return match ? { translation: match.translation, audioText: match.audio_text || match.term } : null;
  };

  return (
    <span className={`relative ${className}`}>
      {parts.map((part, index) => {
        const isQuoted = /^['"‘«].+['"’»]$/.test(part);
        if (isQuoted) {
          const rawWord = part.slice(1, -1);
          const vocabData = findTranslation(rawWord);

          return (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (vocabData) {
                  speakRussian(vocabData.audioText || rawWord);
                  setActiveTooltip(
                    activeTooltip?.text === rawWord
                      ? null
                      : { text: rawWord, translation: vocabData.translation, audioText: vocabData.audioText }
                  );
                } else {
                  speakRussian(rawWord);
                }
              }}
              className={`${badgeClassName} cursor-pointer relative hover:scale-105 transition-transform`}
              title={vocabData ? `${rawWord} — ${vocabData.translation}` : 'Tinglash uchun bosing'}
            >
              {part}
              {activeTooltip?.text === rawWord && vocabData && (
                <span
                  className="absolute -top-11 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakRussian(vocabData.audioText || rawWord);
                  }}
                >
                  <span className="font-extrabold text-emerald-300">{vocabData.translation}</span>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              )}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

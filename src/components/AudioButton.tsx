import React, { useState } from 'react';
import { Volume2, Snail } from 'lucide-react';
import { speakRussian } from '../utils/audio';

interface AudioButtonProps {
  text: string;
  autoPlay?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingSpeed, setPlayingSpeed] = useState<'normal' | 'slow' | null>(null);

  const handlePlay = (rate: number, speed: 'normal' | 'slow') => {
    setIsPlaying(true);
    setPlayingSpeed(speed);
    speakRussian(
      text,
      rate,
      () => {},
      () => {
        setIsPlaying(false);
        setPlayingSpeed(null);
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handlePlay(0.95, 'normal')}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium text-sm transition-all shadow-sm active:translate-y-0.5 border ${
          playingSpeed === 'normal'
            ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300'
            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
        }`}
        title="Odatdagi tezlikda tinglash"
        aria-label="Odatdagi tezlikda ruscha audioni tinglash"
      >
        <Volume2 className={`w-4 h-4 ${isPlaying && playingSpeed === 'normal' ? 'animate-pulse' : ''}`} />
        <span>Tinglash</span>
      </button>

      <button
        onClick={() => handlePlay(0.68, 'slow')}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm transition-all shadow-sm active:translate-y-0.5 border ${
          playingSpeed === 'slow'
            ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300'
            : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
        }`}
        title="Sekinroq tinglash (0.7x)"
        aria-label="Sekin tezlikda ruscha audioni tinglash"
      >
        <Snail className={`w-4 h-4 ${isPlaying && playingSpeed === 'slow' ? 'animate-bounce' : ''}`} />
        <span className="text-xs">Sekin</span>
      </button>
    </div>
  );
};

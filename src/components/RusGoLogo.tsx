import React from 'react';

interface RusGoLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtitle?: string;
}

export const RusGoLogo: React.FC<RusGoLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
  textColor = 'text-slate-900',
  subtitle = 'Rus Tili A1',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Dynamic Brand Logo Symbol (Emerald Wing + Letter R + Golden Spark) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-label="RusGo logotipi"
      >
        <defs>
          <linearGradient id="rusgo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 3D App Squircle Base */}
        <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#rusgo-grad)" />
        <rect x="2" y="42" width="44" height="4" rx="2" fill="#064E3B" opacity="0.6" />

        {/* Dynamic Flying Wing Symbol behind/beside R */}
        <path
          d="M23 9C29 7 37 9 40 14C36 15 32 17 30 20C34 20 37 23 38 27C34 27 30 28 27 30C28 23 27 15 23 9Z"
          fill="url(#wing-grad)"
          opacity="0.95"
        />

        {/* Stylized Modern 'R' letter in pure white */}
        <path
          d="M13 12C13 10.8954 13.8954 10 15 10H22.5C26.6421 10 30 13.3579 30 17.5C30 21.0927 27.4661 24.0934 24.084 24.8198L30.3 35.8C30.7 36.5 30.2 37.5 29.3 37.5H25.3C24.6 37.5 24 37.1 23.6 36.5L18.2 27H17.5V36C17.5 36.8284 16.8284 37.5 16 37.5H14.5C13.6716 37.5 13 36.8284 13 36V12ZM17.5 14.5V23H22.5C25.5376 23 26.8 21.2 26.8 18.5C26.8 15.8 25.5376 14.5 22.5 14.5H17.5Z"
          fill="white"
        />

        {/* Energetic Golden Spark / Star Accent */}
        <path
          d="M39 6.5L40 9.5L43 10.5L40 11.5L39 14.5L38 11.5L35 10.5L38 9.5L39 6.5Z"
          fill="url(#spark-grad)"
        />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base font-black tracking-tight leading-none ${textColor} flex items-center`}>
            <span>Rus</span>
            <span className="text-emerald-600">Go</span>
          </span>
          {subtitle && (
            <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase leading-tight mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

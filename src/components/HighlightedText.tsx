import React from 'react';

interface HighlightedTextProps {
  text: string;
  className?: string;
  badgeClassName?: string;
}

/**
 * Highlights words or phrases enclosed in single quotes ('...'),
 * curly quotes (‘...’), double quotes ("..."), or guillemets («...»)
 * in a distinctive Duolingo emerald badge color.
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  className = '',
  badgeClassName = 'text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-lg font-black shadow-2xs inline-block mx-0.5'
}) => {
  if (!text) return null;

  // Match quoted segments like 'Assalomu alaykum', "Привет", «Здравствуйте»
  const parts = text.split(/(['"‘«][^'"’»]+['"’»])/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isQuoted = /^['"‘«].+['"’»]$/.test(part);
        if (isQuoted) {
          return (
            <span
              key={index}
              className={badgeClassName}
            >
              {part}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

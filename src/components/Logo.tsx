import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  showText = true,
  light = false,
}: LogoProps) {
  const dimensions = {
    sm: { width: 42, height: 42, fontSize: 10 },
    md: { width: 56, height: 56, fontSize: 12 },
    lg: { width: 96, height: 96, fontSize: 18 },
    xl: { width: 160, height: 160, fontSize: 24 },
  };

  const selected = dimensions[size];
  const blueColor = light ? '#FFFFFF' : '#114294';
  const orangeColor = '#E06C1F';
  const redColor = light ? '#F87171' : '#9E2A1C';
  const textColor = light ? '#FFFFFF' : '#FFFFFF';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex-shrink-0" style={{ width: selected.width, height: selected.height }}>
        <svg
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 18 68 C 20 88 36 96 50 96 C 64 96 74 90 74 78 C 74 66 60 62 48 62 C 36 62 26 58 26 46 C 26 34 36 26 50 26 C 64 26 74 34 72 46"
            stroke={blueColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 88 26 L 88 96"
            stroke={blueColor}
            strokeWidth="14"
            strokeLinecap="round"
            transform="translate(8 0) skewX(-8)"
          />

          <path
            d="M 14 64 C 12 76 20 94 40 98 C 64 102 90 88 108 74 C 125 61 140 44 140 30"
            stroke={orangeColor}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />

          <path
            d="M 16 64 C 34 48 66 36 100 34"
            stroke={orangeColor}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 94 72 C 100 84 116 78 122 72"
            stroke={redColor}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className="font-black tracking-wide"
            style={{
              fontSize: selected.fontSize * 1.5,
              color: blueColor,
              fontFamily: '"Outfit", "Inter", sans-serif',
            }}
          >
            SUNBABX
          </span>
          <span
            className="font-bold tracking-[0.25em]"
            style={{
              fontSize: selected.fontSize * 0.75,
              color: redColor,
              marginTop: '2px',
              fontFamily: '"Outfit", "Inter", sans-serif',
            }}
          >
            INNOVATIONS
          </span>
        </div>
      )}
    </div>
  );
}

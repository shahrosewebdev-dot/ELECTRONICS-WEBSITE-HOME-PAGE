import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'footer';
  lightMode?: boolean;
}

export default function Logo({ className = '', variant = 'full', lightMode = false }: LogoProps) {
  // Glow filters and neon colors for the high-fidelity SVG representation
  const mainTextColor = lightMode ? 'text-secondary-black' : 'text-primary-white';
  const subTextColor = lightMode ? 'text-gray-500' : 'text-gray-400';

  if (variant === 'icon') {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orange top arc with plug */}
        <path
          d="M 22 45 A 32 32 0 0 1 78 30"
          stroke="url(#orangeGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlow)"
        />
        {/* Plug icon top right */}
        <g transform="translate(73, 22) rotate(45) scale(0.65)" fill="#F97316">
          <rect x="0" y="2" width="6" height="8" rx="1.5" />
          <line x1="2" y1="2" x2="2" y2="0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="2" x2="4" y2="0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="1.5" y="10" width="3" height="4" fill="#F97316" />
        </g>

        {/* Green bottom arc with plug */}
        <path
          d="M 78 55 A 32 32 0 0 1 22 70"
          stroke="url(#greenGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlow)"
        />
        {/* Plug icon bottom left */}
        <g transform="translate(14, 62) rotate(225) scale(0.65)" fill="#22C55E">
          <rect x="0" y="2" width="6" height="8" rx="1.5" />
          <line x1="2" y1="2" x2="2" y2="0" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="2" x2="4" y2="0" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="1.5" y="10" width="3" height="4" fill="#22C55E" />
        </g>

        {/* Central pink/rose stylized N left part */}
        <path
          d="M 25 60 L 45 25 L 53 38 L 33 73 Z"
          fill="url(#pinkGrad)"
          filter="url(#neonGlow)"
        />

        {/* Central blue/cyan stylized N right part */}
        <path
          d="M 45 62 L 53 49 L 75 25 L 67 15 L 45 42 Z"
          fill="url(#blueGrad)"
          filter="url(#neonGlow)"
          opacity="0.95"
        />
        {/* Slanted inner connection */}
        <path
          d="M 45 42 L 53 49 L 37 72 L 29 65 Z"
          fill="url(#blueGrad)"
          filter="url(#neonGlow)"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Icon emblem */}
      <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-black/90 p-1 border border-white/5 shadow-lg shadow-black/20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orange top arc with plug */}
          <path
            d="M 24 45 A 28 28 0 0 1 76 30"
            stroke="url(#orangeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#neonGlow)"
          />
          {/* Plug icon top right */}
          <g transform="translate(71, 21) rotate(45) scale(0.65)" fill="#F97316">
            <rect x="0" y="2" width="6" height="8" rx="1.5" />
            <line x1="2" y1="2" x2="2" y2="0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="2" x2="4" y2="0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="1.5" y="10" width="3" height="4" />
          </g>

          {/* Green bottom arc with plug */}
          <path
            d="M 76 55 A 28 28 0 0 1 24 70"
            stroke="url(#greenGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#neonGlow)"
          />
          {/* Plug icon bottom left */}
          <g transform="translate(15, 62) rotate(225) scale(0.65)" fill="#22C55E">
            <rect x="0" y="2" width="6" height="8" rx="1.5" />
            <line x1="2" y1="2" x2="2" y2="0" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="2" x2="4" y2="0" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="1.5" y="10" width="3" height="4" />
          </g>

          {/* Styluted N left shape (Pink gradient) */}
          <path
            d="M 28 58 L 46 26 C 47.5 23.5, 51.5 23.5, 53 26 L 56 31 L 38 63 Z"
            fill="url(#pinkGrad)"
            filter="url(#neonGlow)"
          />

          {/* Styluted N right shape (Blue gradient) */}
          <path
            d="M 44 65 L 47 60 L 65 28 C 66.5 25.5, 70.5 25.5, 72 28 L 74 31 L 53 68 C 51.5 70.5, 47.5 70.5, 46 68 Z"
            fill="url(#blueGrad)"
            filter="url(#neonGlow)"
          />
        </svg>
      </div>

      {/* Brand Typography text */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className={`font-sans font-black text-base sm:text-xl md:text-2xl tracking-tighter uppercase leading-none ${mainTextColor}`}>
            NI DRIP
          </span>
        </div>
        <span className="font-sans font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] text-[#22C55E] uppercase leading-tight -mt-0.5">
          CENTRAL
        </span>
        {variant !== 'footer' && (
          <span className={`font-sans font-medium text-[7px] sm:text-[9px] tracking-[0.18em] uppercase opacity-90 leading-none mt-0.5 ${subTextColor}`}>
            ELECTRONICS & APPLIANCES
          </span>
        )}
      </div>
    </div>
  );
}

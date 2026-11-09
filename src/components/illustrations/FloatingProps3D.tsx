import React from 'react';
import { motion } from 'framer-motion';

interface FloatingPropsProps {
  interactive?: boolean;
}

export const FloatingProps3D: React.FC<FloatingPropsProps> = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Glossy 3D Heart */}
      <motion.div
        className="absolute top-12 left-6 sm:left-14 w-16 h-16 sm:w-20 sm:h-20"
        animate={{
          y: [0, -14, 0],
          rotate: [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id="heartGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="40%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </radialGradient>
            <linearGradient id="heartSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M50,88 C50,88 15,62 15,36 C15,22 26,12 40,12 C46,12 50,16 50,16 C50,16 54,12 60,12 C74,12 85,22 85,36 C85,62 50,88 50,88 Z"
            fill="url(#heartGrad)"
          />
          {/* 3D Specular curve highlight */}
          <ellipse cx="36" cy="26" rx="12" ry="7" transform="rotate(-30 36 26)" fill="url(#heartSpecular)" />
        </svg>
      </motion.div>

      {/* Sunny Yellow Smiley Sphere */}
      <motion.div
        className="absolute bottom-16 left-8 sm:left-24 w-14 h-14 sm:w-16 sm:h-16"
        animate={{
          y: [0, 12, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="smileyGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#FFD84D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="url(#smileyGrad)" />
          {/* Eyes */}
          <circle cx="36" cy="42" r="5" fill="#1E1B4B" />
          <path d="M58 43 Q65 37 72 43" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Big smiling mouth */}
          <path d="M35 56 Q50 72 65 56" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Blush */}
          <circle cx="28" cy="52" r="5" fill="#F472B6" opacity="0.6" />
          <circle cx="72" cy="52" r="5" fill="#F472B6" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Chunky Periwinkle / Violet Donut Ring */}
      <motion.div
        className="absolute top-20 right-8 sm:right-20 w-16 h-16 sm:w-20 sm:h-20"
        animate={{
          y: [0, -16, 0],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5B4FC" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" stroke="url(#ringGrad)" strokeWidth="18" fill="none" />
          <ellipse cx="44" cy="22" rx="6" ry="3" fill="#FFFFFF" opacity="0.75" />
        </svg>
      </motion.div>

      {/* Orbiting thin ring with particle beads */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full opacity-35">
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          {/* Small shiny bead on orbit */}
          <circle cx="480" cy="250" r="7" fill="#FFD84D" />
          <circle cx="20" cy="250" r="5" fill="#F472B6" />
        </svg>
      </motion.div>

      {/* Playful Outcrowd-style floating badge stickers */}
      <motion.div
        className="hidden sm:flex absolute top-16 left-1/4 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brand-black text-xs font-bold shadow-card-soft -rotate-6 border border-white/60"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="w-2 h-2 rounded-full bg-accent-pink animate-ping" />
        <span>+1 Year Wiser 👑</span>
      </motion.div>

      <motion.div
        className="hidden sm:flex absolute bottom-24 right-1/4 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-yellow text-brand-black text-xs font-bold shadow-card-soft rotate-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <span>Vibes = ∞ ✨</span>
      </motion.div>
    </div>
  );
};


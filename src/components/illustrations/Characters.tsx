import React from 'react';
import { motion } from 'framer-motion';

export type CharacterEmotion = 'idle' | 'shocked' | 'cheering' | 'talking';

interface CharactersProps {
  emotion: CharacterEmotion;
  className?: string;
  boyName?: string;
  girlName?: string;
}

export const Characters: React.FC<CharactersProps> = ({
  emotion,
  className = '',
  boyName = 'Olalekan',
  girlName = 'Oluwaseyi',
}) => {
  const isShocked = emotion === 'shocked';
  const isCheering = emotion === 'cheering';
  const isTalking = emotion === 'talking';

  return (
    <div className={`relative flex items-end justify-center gap-6 sm:gap-10 select-none ${className}`}>
      {/* ================= BOY CHARACTER: TOBI ================= */}
      <motion.div
        className="relative w-28 h-36 sm:w-36 sm:h-44 flex flex-col items-center justify-end"
        animate={
          isShocked
            ? { y: [0, -10, 4, -4, 0], x: [-3, 3, -2, 2, 0] }
            : isCheering
            ? { y: [0, -18, 0], rotate: [-2, 4, -2] }
            : { y: [0, -6, 0] }
        }
        transition={
          isShocked
            ? { duration: 0.45, repeat: 2 }
            : isCheering
            ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Shadow */}
        <div className="absolute -bottom-2 w-20 sm:w-28 h-3 bg-black/15 blur-md rounded-full" />

        <svg viewBox="0 0 120 140" className="w-full h-full overflow-visible drop-shadow-xl">
          <defs>
            <radialGradient id="tobiBody" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </radialGradient>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>

          {/* Left Arm */}
          <motion.path
            d={
              isCheering
                ? 'M25,80 Q10,40 18,25'
                : isShocked
                ? 'M25,80 Q12,65 14,50'
                : 'M25,80 Q12,90 20,105'
            }
            stroke="#4338CA"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm */}
          <motion.path
            d={
              isCheering
                ? 'M95,80 Q110,40 102,25'
                : isShocked
                ? 'M95,80 Q108,65 106,50'
                : 'M95,80 Q108,85 100,100'
            }
            stroke="#4338CA"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Round Sphere Body/Head */}
          <circle cx="60" cy="72" r="42" fill="url(#tobiBody)" />

          {/* Cool Backwards Snapback Cap */}
          <g>
            {/* Cap dome */}
            <path
              d="M26,58 C26,34 94,34 94,58 Z"
              fill="url(#capGrad)"
            />
            {/* Cap brim turned slightly sideways/back */}
            <ellipse cx="60" cy="58" rx="36" ry="6" fill="#BE185D" />
            {/* Cap button on top */}
            <circle cx="60" cy="38" r="4" fill="#FFD84D" />
          </g>

          {/* Face Elements */}
          {/* Eyes */}
          {isShocked ? (
            // Shocked wide eyes
            <g>
              <circle cx="48" cy="70" r="9" fill="#FFFFFF" />
              <circle cx="72" cy="70" r="9" fill="#FFFFFF" />
              <circle cx="48" cy="70" r="3.5" fill="#111827" />
              <circle cx="72" cy="70" r="3.5" fill="#111827" />
              {/* Sweat drop */}
              <path d="M88,52 C88,52 92,60 90,63 C88,65 85,63 85,61 Z" fill="#38BDF8" />
            </g>
          ) : isCheering ? (
            // Cheerful squinting happy eyes (^_^)
            <g>
              <path d="M42,72 Q48,63 54,72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M66,72 Q72,63 78,72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            // Idle / talking eyes with blinking
            <g>
              <circle cx="48" cy="72" r="5" fill="#FFFFFF" />
              <circle cx="72" cy="72" r="5" fill="#FFFFFF" />
              <circle cx="49" cy="72" r="3" fill="#0F172A" />
              <circle cx="73" cy="72" r="3" fill="#0F172A" />
              <circle cx="51" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="75" cy="70" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Mouth */}
          {isShocked ? (
            // Dropped open O mouth
            <ellipse cx="60" cy="90" rx="7" ry="12" fill="#1E1B4B" />
          ) : isCheering || isTalking ? (
            // Big open smile with tongue
            <g>
              <path d="M48,84 Q60,102 72,84 Z" fill="#1E1B4B" />
              <path d="M53,92 Q60,98 67,92 Z" fill="#F472B6" />
            </g>
          ) : (
            // Chill friendly smirk
            <path d="M50,86 Q60,94 70,86" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          {/* Rosy blush */}
          <circle cx="36" cy="80" r="5" fill="#F472B6" opacity="0.4" />
          <circle cx="84" cy="80" r="5" fill="#F472B6" opacity="0.4" />
        </svg>

        {/* Name tag pill */}
        <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-white/90 text-primary-dark font-extrabold text-[10px] shadow border border-indigo-100">
          {boyName}
        </div>
      </motion.div>

      {/* ================= GIRL CHARACTER ================= */}
      <motion.div
        className="relative w-28 h-36 sm:w-36 sm:h-44 flex flex-col items-center justify-end"
        animate={
          isShocked
            ? { y: [0, -10, 4, -4, 0], x: [3, -3, 2, -2, 0] }
            : isCheering
            ? { y: [0, -20, 0], rotate: [2, -4, 2] }
            : { y: [0, -8, 0] }
        }
        transition={
          isShocked
            ? { duration: 0.45, repeat: 2, delay: 0.05 }
            : isCheering
            ? { duration: 0.58, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }
            : { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
        }
      >
        {/* Shadow */}
        <div className="absolute -bottom-2 w-20 sm:w-28 h-3 bg-black/15 blur-md rounded-full" />

        <svg viewBox="0 0 120 140" className="w-full h-full overflow-visible drop-shadow-xl">
          <defs>
            <radialGradient id="kemiBody" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </radialGradient>
            <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Left Arm */}
          <motion.path
            d={
              isCheering
                ? 'M25,80 Q10,40 20,25'
                : isShocked
                ? 'M25,80 Q32,68 44,76'
                : 'M25,80 Q14,92 24,104'
            }
            stroke="#BE185D"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm */}
          <motion.path
            d={
              isCheering
                ? 'M95,80 Q110,40 100,25'
                : isShocked
                ? 'M95,80 Q88,68 76,76'
                : 'M95,80 Q108,70 114,56' // Waving hand
            }
            stroke="#BE185D"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Round Sphere Body/Head */}
          <circle cx="60" cy="72" r="42" fill="url(#kemiBody)" />

          {/* Chunky Golden Bow on Head */}
          <g transform="translate(60, 36)">
            {/* Left loop */}
            <path d="M0,0 Q-18,-18 -22,-6 Q-22,6 0,0 Z" fill="url(#bowGrad)" />
            {/* Right loop */}
            <path d="M0,0 Q18,-18 22,-6 Q22,6 0,0 Z" fill="url(#bowGrad)" />
            {/* Knot */}
            <circle cx="0" cy="0" r="5" fill="#D97706" />
          </g>

          {/* Face Elements */}
          {/* Eyes & Eyelashes */}
          {isShocked ? (
            <g>
              <circle cx="48" cy="70" r="9" fill="#FFFFFF" />
              <circle cx="72" cy="70" r="9" fill="#FFFFFF" />
              <circle cx="48" cy="70" r="3.5" fill="#111827" />
              <circle cx="72" cy="70" r="3.5" fill="#111827" />
              {/* Teardrops */}
              <circle cx="42" cy="80" r="3" fill="#38BDF8" />
              <circle cx="78" cy="80" r="3" fill="#38BDF8" />
            </g>
          ) : isCheering ? (
            <g>
              {/* Sparkling star eyes */}
              <path d="M42,72 Q48,62 54,72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M66,72 Q72,62 78,72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Eyelashes */}
              <line x1="39" y1="67" x2="35" y2="63" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="81" y1="67" x2="85" y2="63" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <circle cx="48" cy="72" r="5" fill="#FFFFFF" />
              <circle cx="72" cy="72" r="5" fill="#FFFFFF" />
              <circle cx="49" cy="72" r="3" fill="#0F172A" />
              <circle cx="73" cy="72" r="3" fill="#0F172A" />
              <circle cx="51" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="75" cy="70" r="1.5" fill="#FFFFFF" />
              {/* Cute Eyelashes */}
              <line x1="42" y1="68" x2="38" y2="64" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
              <line x1="78" y1="68" x2="82" y2="64" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Mouth */}
          {isShocked ? (
            <ellipse cx="60" cy="90" rx="8" ry="13" fill="#4C0519" />
          ) : isCheering || isTalking ? (
            <g>
              <path d="M48,84 Q60,102 72,84 Z" fill="#4C0519" />
              <path d="M53,92 Q60,98 67,92 Z" fill="#F472B6" />
            </g>
          ) : (
            <path d="M52,86 Q60,93 68,86" stroke="#4C0519" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          )}

          {/* Rosy blush */}
          <circle cx="36" cy="80" r="6" fill="#FDE047" opacity="0.6" />
          <circle cx="84" cy="80" r="6" fill="#FDE047" opacity="0.6" />
        </svg>

        {/* Name tag pill */}
        <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-white/90 text-accent-pink-deep font-extrabold text-[10px] shadow border border-pink-100">
          {girlName}
        </div>
      </motion.div>
    </div>
  );
};


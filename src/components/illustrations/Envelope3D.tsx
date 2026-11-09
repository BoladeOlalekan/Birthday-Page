import React from 'react';
import { motion } from 'framer-motion';

interface Envelope3DProps {
  isOpen: boolean;
  isHovered?: boolean;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({ isOpen, isHovered = false }) => {
  return (
    <div className="relative w-64 h-48 sm:w-80 sm:h-56 mx-auto select-none">
      {/* Soft floor shadow */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-6 bg-primary-dark/25 blur-xl rounded-full"
        animate={{
          scale: isHovered ? 1.08 : [1, 0.94, 1],
          opacity: isHovered ? 0.35 : [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main envelope body wrapper */}
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 320 220"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Envelope Back Interior Gradient */}
            <linearGradient id="envInteriorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>

            {/* Front Pocket Gradients */}
            <linearGradient id="envFrontLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF2FF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>

            <linearGradient id="envFrontRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </linearGradient>

            <linearGradient id="envFrontBottom" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>

            {/* Flap Gradient */}
            <linearGradient id="envFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>

            {/* Wax Seal Gradient */}
            <radialGradient id="waxSealGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="45%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </radialGradient>
          </defs>

          {/* 1. Envelope Back Pocket (Dark interior seen when flap opens) */}
          <rect
            x="16"
            y="26"
            width="288"
            height="180"
            rx="20"
            fill="url(#envInteriorGrad)"
          />

          {/* 2. Letter Paper peeking out */}
          <motion.g
            animate={{
              y: isOpen ? -60 : 0,
              opacity: isOpen ? 0.3 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect
              x="36"
              y="36"
              width="248"
              height="150"
              rx="12"
              fill="#FFFFFF"
              stroke="#E0E7FF"
              strokeWidth="2"
            />
            {/* Letter text lines preview */}
            <line x1="56" y1="62" x2="160" y2="62" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
            <line x1="56" y1="82" x2="260" y2="82" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <line x1="56" y1="98" x2="230" y2="98" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <line x1="56" y1="114" x2="200" y2="114" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* 3. Envelope Side Flaps */}
          <path
            d="M16,26 L160,132 L16,206 Z"
            fill="url(#envFrontLeft)"
            opacity="0.95"
          />
          <path
            d="M304,26 L160,132 L304,206 Z"
            fill="url(#envFrontRight)"
            opacity="0.95"
          />

          {/* 4. Envelope Bottom Flap */}
          <path
            d="M16,206 L160,105 L304,206 Z"
            fill="url(#envFrontBottom)"
          />

          {/* Envelope Body Outline Border */}
          <rect
            x="16"
            y="26"
            width="288"
            height="180"
            rx="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2.5"
          />

          {/* 5. Animated Top Flap */}
          <motion.g
            style={{ transformOrigin: '160px 26px' }}
            animate={{
              rotateX: isOpen ? 180 : isHovered ? 14 : 0,
            }}
            transition={{
              duration: isOpen ? 0.75 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <path
              d="M16,26 Q160,138 304,26 Z"
              fill="url(#envFlapGrad)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="2"
            />

            {/* Wax Seal on Flap Tip */}
            {!isOpen && (
              <g transform="translate(160, 88)">
                {/* Wax Seal outer scalloped ring */}
                <circle cx="0" cy="0" r="22" fill="url(#waxSealGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
                <circle cx="0" cy="0" r="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Embossed Heart in Wax */}
                <path
                  d="M0,8 C0,8 -8,2 -8,-4 C-8,-9 -4,-12 0,-10 C4,-12 8,-9 8,-4 C8,2 0,8 0,8 Z"
                  fill="#FFF1F2"
                  opacity="0.95"
                />
                <circle cx="-6" cy="-6" r="4" fill="#FFFFFF" opacity="0.4" />
              </g>
            )}
          </motion.g>
        </svg>

        {/* Small floating "FOR YOUR EYES ONLY" pill tag */}
        <motion.div
          className="absolute -top-3 -right-2 px-3 py-1 bg-accent-pink text-white text-[11px] font-bold rounded-full shadow-lg rotate-12 flex items-center gap-1 border border-white/50"
          animate={{
            rotate: [10, 16, 10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>CONFIDENTIAL</span>
          <span>🔒</span>
        </motion.div>
      </div>
    </div>
  );
};


import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PortalScreenProps {
  onComplete: () => void;
}

export const PortalScreen: React.FC<PortalScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // 2.2s cinematic portal burst then transition to characters
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F0728]">
      {/* 1. Deep Space / Anime Twilight Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E0B4B] via-[#3B14B8] to-[#581C87]" />

      {/* 2. Rotating Celestial Portal Rune Rings */}
      <motion.div
        className="absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 800 800" className="w-full h-full opacity-40">
          <circle cx="400" cy="400" r="380" stroke="#FFD84D" strokeWidth="2" strokeDasharray="8 12" fill="none" />
          <circle cx="400" cy="400" r="320" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="16 8" fill="none" />
          <circle cx="400" cy="400" r="260" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="4 6" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full opacity-35">
          <circle cx="300" cy="300" r="280" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="10 14" fill="none" />
          <circle cx="300" cy="300" r="200" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 8" fill="none" />
        </svg>
      </motion.div>

      {/* 3. Anime Light Rays Burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-[120vh] bg-gradient-to-t from-transparent via-white/35 to-transparent origin-center blur-[2px]"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1.4, 1], opacity: [0, 0.8, 0.3] }}
            transition={{ duration: 1.6, delay: 0.1 * (i % 3) }}
          />
        ))}
      </div>

      {/* 4. Floating Anime Clouds & Mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0F0728] via-[#2E1065]/70 to-transparent pointer-events-none blur-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 5. Center Light Flash Burst */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center p-6"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.3, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Core Glowing Orb */}
        <motion.div
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-accent-yellow via-white to-accent-pink shadow-[0_0_120px_rgba(255,255,255,0.9)] flex items-center justify-center"
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              '0 0 80px rgba(255,216,77,0.8)',
              '0 0 160px rgba(244,114,182,0.9)',
              '0 0 90px rgba(255,216,77,0.8)',
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-4xl sm:text-5xl animate-spin">🌀</span>
        </motion.div>

        {/* Portal Entering Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight drop-shadow-md"
        >
          Entering Birthday Realm... ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-2 text-indigo-200 text-sm font-sans tracking-wide"
        >
          Special guides are waiting to receive you!
        </motion.p>
      </motion.div>

      {/* 6. Expanding Screen Flash at the climax */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.85, 0] }}
        transition={{ duration: 2.1, times: [0, 0.7, 0.85, 1] }}
      />
    </div>
  );
};


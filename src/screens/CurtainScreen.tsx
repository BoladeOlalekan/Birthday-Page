import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

interface CurtainScreenProps {
  onCurtainOpened: () => void;
}

export const CurtainScreen: React.FC<CurtainScreenProps> = ({ onCurtainOpened }) => {
  useEffect(() => {
    sound.playEnvelopeLand();
    // After curtains pull open (approx 2.2s), switch to message screen
    const timer = setTimeout(() => {
      onCurtainOpened();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onCurtainOpened]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#0A0518]">
      {/* Golden Stage Valence at Top */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 h-16 sm:h-24 z-50 pointer-events-none"
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="goldValance" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="redDrape" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="50%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>
          {/* Scalloped velvet top trim */}
          <path
            d="M0,0 L1200,0 L1200,60 Q1100,100 1000,60 Q900,100 800,60 Q700,100 600,60 Q500,100 400,60 Q300,100 200,60 Q100,100 0,60 Z"
            fill="url(#redDrape)"
          />
          {/* Gold fringe trim */}
          <path
            d="M0,60 Q100,100 200,60 Q300,100 400,60 Q500,100 600,60 Q700,100 800,60 Q900,100 1000,60 Q1100,100 1200,60"
            stroke="url(#goldValance)"
            strokeWidth="5"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Left Velvet Curtain (with Tobi pulling it left) */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 z-40 origin-left"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ delay: 0.7, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#450A0A] via-[#991B1B] to-[#7F1D1D] shadow-[20px_0_50px_rgba(0,0,0,0.8)] relative flex">
          {/* Vertical Pleats/Folds */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full border-r border-black/20 bg-gradient-to-r from-white/5 via-transparent to-black/30"
            />
          ))}

          {/* Gold Tie-back Ribbon */}
          <div className="absolute top-1/2 right-4 w-12 h-6 bg-accent-yellow rounded-full shadow-lg" />

          {/* Olalekan pulling curtain on left */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-center select-none pointer-events-none scale-75 sm:scale-90">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 border-2 border-indigo-300 shadow-md flex items-center justify-center text-xl">
              🧢
            </div>
            <span className="text-[10px] font-bold text-accent-yellow uppercase tracking-widest mt-1">
              Olalekan
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right Velvet Curtain (with Kemi pulling it right) */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 z-40 origin-right"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ delay: 0.7, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full bg-gradient-to-l from-[#450A0A] via-[#991B1B] to-[#7F1D1D] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] relative flex">
          {/* Vertical Pleats/Folds */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full border-l border-black/20 bg-gradient-to-l from-white/5 via-transparent to-black/30"
            />
          ))}

          {/* Gold Tie-back Ribbon */}
          <div className="absolute top-1/2 left-4 w-12 h-6 bg-accent-yellow rounded-full shadow-lg" />

          {/* Oluwaseyi pulling curtain on right */}
          <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-center select-none pointer-events-none scale-75 sm:scale-90">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 border-2 border-pink-200 shadow-md flex items-center justify-center text-xl">
              🎀
            </div>
            <span className="text-[10px] font-bold text-accent-yellow uppercase tracking-widest mt-1">
              Oluwaseyi
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center Spotlight & Opening Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.1] }}
        transition={{ duration: 1.8, times: [0, 0.4, 0.95] }}
        className="relative z-30 text-center"
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-accent-yellow/20 blur-3xl mx-auto" />
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-accent-yellow uppercase tracking-widest drop-shadow-lg -mt-32">
          Curtain Call
        </h3>
        <p className="text-white/80 text-sm mt-2 font-serif italic">
          The stage is set...
        </p>
      </motion.div>
    </div>
  );
};

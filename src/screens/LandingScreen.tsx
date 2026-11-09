import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Envelope3D } from '../components/illustrations/Envelope3D';
import { FloatingProps3D } from '../components/illustrations/FloatingProps3D';
import { sound } from '../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
  tagline: string;
  creatorName?: string;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  tagline,
  creatorName = 'Olalekan',
}) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleStart = () => {
    sound.playEnvelopeLand();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-surface">
      {/* Wollo Style Big Rounded Hero Panel */}
      <motion.div
        layoutId="heroPanel"
        className="relative w-full max-w-4xl mx-auto rounded-3xl sm:rounded-5xl bg-gradient-to-b from-periwinkle via-primary to-primary-dark text-white p-6 sm:p-12 shadow-panel-lg overflow-hidden flex flex-col items-center justify-between min-h-[640px] sm:min-h-[700px]"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Grain overlay */}
        <div className="grain-overlay absolute inset-0 pointer-events-none rounded-[inherit]" />

        {/* 3D Floating Props & Orbit Accents */}
        <FloatingProps3D />

        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
          <span>Interactive Birthday Experience</span>
        </motion.div>

        {/* Centered Headline with line-by-line masked reveal */}
        <div className="relative z-10 text-center my-4 sm:my-6 max-w-2xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-white"
            >
              {creatorName} has
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-1 sm:mt-2">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-white"
            >
              a message for you <span className="inline-block animate-bounce">💌</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-3 text-sm sm:text-base text-indigo-100 font-sans max-w-md mx-auto"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Center: Envelope Fly-In & Floating Animation */}
        <motion.div
          className="relative z-10 my-4 cursor-pointer"
          initial={{ y: -400, opacity: 0, rotate: -18, scale: 0.7 }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 14,
            delay: 0.45,
          }}
          onClick={handleStart}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
        >
          {/* Gentle float after landing */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Envelope3D isOpen={false} isHovered={isBtnHovered} />
          </motion.div>
        </motion.div>

        {/* Bottom: Violet "Read Letter" pill button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2"
        >
          <button
            onClick={handleStart}
            onMouseEnter={() => {
              setIsBtnHovered(true);
              sound.playPop();
            }}
            onMouseLeave={() => setIsBtnHovered(false)}
            className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-white text-primary-dark hover:bg-white/95 font-display font-bold text-base sm:text-lg shadow-pill hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>Read Letter</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Small Outcrowd style subtle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="relative z-10 text-[11px] sm:text-xs text-indigo-200 mt-4 tracking-wide text-center"
        >
          Tap the envelope or button to begin your birthday story ✦
        </motion.p>
      </motion.div>
    </div>
  );
};


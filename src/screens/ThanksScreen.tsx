import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Characters } from '../components/illustrations/Characters';
import { Sparkles, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface ThanksScreenProps {
  friendDisplayName: string;
  onReset: () => void;
}

export const ThanksScreen: React.FC<ThanksScreenProps> = ({
  friendDisplayName,
  onReset,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    sound.playCelebration();

    // Trigger multiple bursts of canvas-confetti with brand palette
    const colors = ['#5B21E6', '#6F7CF0', '#F472B6', '#FFD84D', '#FFFFFF', '#38BDF8'];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 450);

    // Countdown timer for 4 seconds
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearInterval(interval);
    };
  }, [onReset]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-surface">
      {/* Background soft pastel ambient circles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-pink/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-yellow/20 blur-3xl pointer-events-none" />

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl sm:rounded-5xl p-8 sm:p-12 shadow-panel-lg border border-slate-100 flex flex-col items-center text-center"
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-periwinkle-soft text-primary font-bold text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Message Delivered Successfully</span>
        </div>

        {/* Headline with Nigerian Warmth */}
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-black tracking-tight leading-tight">
          Thank you o! <br />
          <span className="text-primary">Your message don land 💌</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-sm">
          Happy Birthday once again, {friendDisplayName}! May your day be filled with endless smiles and blessings! 🎂🥂
        </p>

        {/* Characters celebrating */}
        <div className="my-6">
          <Characters emotion="cheering" />
        </div>

        {/* Progress Bar / Countdown */}
        <div className="w-full max-w-xs flex flex-col items-center gap-2 mt-2">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </div>
          <span className="text-xs text-brand-muted font-medium">
            Resetting to start in {secondsLeft}s...
          </span>
        </div>

        {/* Manual Reset Button */}
        <button
          onClick={() => {
            sound.playPop();
            onReset();
          }}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface hover:bg-surface-card text-brand-black font-semibold text-xs transition-all border border-gray-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Over Now</span>
        </button>

        {/* Bottom subtle note */}
        <div className="mt-6 flex items-center gap-1.5 text-xs text-brand-muted">
          <Heart className="w-3.5 h-3.5 text-accent-pink fill-current" />
          <span>Crafted with love for your special day</span>
        </div>
      </motion.div>
    </div>
  );
};


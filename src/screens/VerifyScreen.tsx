import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope3D } from '../components/illustrations/Envelope3D';
import { sound } from '../utils/audio';
import { Lock, Sparkles, ArrowRight, AlertCircle, Heart } from 'lucide-react';

interface VerifyScreenProps {
  correctNames: string[];
  wrongAnswerLines: string[];
  onSuccess: (enteredName: string) => void;
}

export const VerifyScreen: React.FC<VerifyScreenProps> = ({
  correctNames,
  wrongAnswerLines,
  onSuccess,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [wrongIndex, setWrongIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input softly
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();

    if (!cleanInput) {
      setHasError(true);
      sound.playWrong();
      return;
    }

    const isMatch = correctNames.some(
      (name) => name.trim().toLowerCase() === cleanInput
    );

    if (isMatch) {
      setIsSuccess(true);
      setHasError(false);
      sound.playPortalSwoosh();
      setTimeout(() => {
        onSuccess(inputVal.trim());
      }, 950);
    } else {
      sound.playWrong();
      setHasError(true);
      setAttempts((prev) => prev + 1);
      // Pick next rotating Nigerian line
      setWrongIndex((prev) => (prev + 1) % wrongAnswerLines.length);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-[#240B7A]">
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-primary via-[#2C0D8F] to-[#17054B] opacity-90" />
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-yellow/40 blur-[1px]"
            style={{
              width: `${(i % 4) * 3 + 4}px`,
              height: `${(i % 4) * 3 + 4}px`,
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 29 + 13) % 92}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Envelope at top with lifted flap */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-[-80px] sm:mb-[-100px] z-10 pointer-events-none"
        >
          <Envelope3D isOpen={true} />
        </motion.div>

        {/* White Rounded Card sliding up out of the envelope */}
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={
            isSuccess
              ? { scale: 1.05, opacity: 1, y: 0, filter: 'drop-shadow(0 0 40px rgba(255, 216, 77, 0.8))' }
              : hasError
              ? {
                  x: [0, -14, 14, -10, 10, -5, 5, 0],
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }
              : { y: 0, opacity: 1, scale: 1 }
          }
          transition={{
            y: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 0.5 },
            scale: { duration: 0.4 },
          }}
          className={`relative z-20 w-full bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-2xl border transition-all duration-300 ${
            isSuccess
              ? 'border-accent-yellow shadow-[0_0_60px_rgba(255,216,77,0.4)]'
              : hasError
              ? 'border-accent-pink/60 shadow-[0_10px_40px_rgba(244,114,182,0.2)]'
              : 'border-slate-100'
          }`}
        >
          {/* Card Top Tag */}
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-periwinkle-soft text-primary font-bold text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Identity Verification</span>
            </span>
            <span className="text-xs text-brand-muted font-medium">Question 1 of 1</span>
          </div>

          {/* Question Headline */}
          <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-black leading-snug">
            What are you mostly known by to the creator of this website?
          </h2>

          <p className="text-xs sm:text-sm text-brand-muted mt-1.5 font-sans">
            Type your real name or the pet name/nickname the creator calls you.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (hasError) setHasError(false);
                }}
                disabled={isSuccess}
                placeholder="Enter your name or nickname..."
                className={`w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-surface border text-base sm:text-lg font-medium text-brand-black placeholder:text-gray-400 outline-none transition-all duration-200 ${
                  hasError
                    ? 'border-accent-pink ring-2 ring-accent-pink/30 bg-pink-50/20'
                    : isSuccess
                    ? 'border-accent-yellow ring-2 ring-accent-yellow/40 bg-yellow-50/20'
                    : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/15'
                }`}
              />

              {isSuccess && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-yellow-deep flex items-center gap-1 font-bold text-sm animate-bounce">
                  <Sparkles className="w-5 h-5 fill-current" />
                  <span>Verified!</span>
                </div>
              )}
            </div>

            {/* Error Message with Nigerian Humor */}
            <AnimatePresence mode="wait">
              {hasError && (
                <motion.div
                  key={wrongIndex}
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-pink-50 border border-accent-pink/30 text-rose-800 text-xs sm:text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 text-accent-pink-deep shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{wrongAnswerLines[wrongIndex]}</p>
                    {attempts >= 3 && (
                      <p className="text-[11px] text-rose-600 mt-1">
                        💡 Hint: Try your first name, popular nickname, or how you are saved on WhatsApp!
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Pill Button */}
            <button
              type="submit"
              disabled={isSuccess || !inputVal.trim()}
              className={`w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-full font-display font-bold text-base transition-all duration-300 ${
                isSuccess
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : !inputVal.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark shadow-pill hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isSuccess ? (
                <>
                  <span>Opening Portal...</span>
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Unlock Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Gentle Footer inside card */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-brand-muted">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-accent-pink fill-current" />
              <span>Made with love & care</span>
            </span>
            <span>Case-insensitive ✨</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


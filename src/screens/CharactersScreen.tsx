import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Characters, CharacterEmotion } from '../components/illustrations/Characters';
import { sound } from '../utils/audio';
import { Sparkles, MessageSquareHeart } from 'lucide-react';

interface CharactersScreenProps {
  friendName: string;
  creatorName: string;
  dialogue: {
    boyName: string;
    girlName: string;
    introGreeting: string;
    introFollowUp: string;
    noReaction: string;
    noButtonMorphText: string;
    yesReaction: string;
  };
  onProceed: () => void;
}

export const CharactersScreen: React.FC<CharactersScreenProps> = ({
  friendName,
  creatorName,
  dialogue,
  onProceed,
}) => {
  const [emotion, setEmotion] = useState<CharacterEmotion>('talking');
  const [activeSpeech, setActiveSpeech] = useState('');
  const [hasRefused, setHasRefused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Formatted initial greeting with friend name
  const greetingText = `${dialogue.introGreeting.replace('{name}', friendName)} ${dialogue.introFollowUp}`;

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    setActiveSpeech('');
    const fullText = greetingText;
    const interval = setInterval(() => {
      index++;
      setActiveSpeech(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setEmotion('idle');
      }
    }, 28);
    return () => clearInterval(interval);
  }, [greetingText]);

  const handleNoClick = () => {
    sound.playWrong();
    setEmotion('shocked');
    setHasRefused(true);

    // Update speech to funny Nigerian protest
    setActiveSpeech(dialogue.noReaction);
  };

  const handleYesClick = () => {
    sound.playCelebration();
    setEmotion('cheering');
    setIsTransitioning(true);
    setActiveSpeech(dialogue.yesReaction);

    setTimeout(() => {
      onProceed();
    }, 1400);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-[#2E1065] via-primary to-[#1E1B4B]">
      {/* Background Anime Island and Floating Stars */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Parallax Floating Particles & Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-yellow/60"
            style={{
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              top: `${(i * 17 + 5) % 95}%`,
              left: `${(i * 23 + 11) % 95}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Experience Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl flex flex-col items-center text-center"
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-accent-yellow text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Realm Guides Dispatched ✦</span>
        </div>

        {/* Speech Bubble (Comic / SaaS style) */}
        <motion.div
          key={hasRefused ? 'refused' : 'initial'}
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full bg-white text-brand-black rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 mb-8"
        >
          {/* Comic Bubble Pointer pointing down to characters */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-white rotate-45 border-r border-b border-indigo-100" />

          <div className="flex items-center justify-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4 text-accent-pink" />
            <span>
              {emotion === 'shocked' ? '😱 OGA SAYS WHAT?!' : `${dialogue.boyName} & ${dialogue.girlName}`}
            </span>
          </div>

          <p className="font-display font-semibold text-lg sm:text-2xl text-brand-black leading-relaxed min-h-[64px] sm:min-h-[72px] flex items-center justify-center">
            {activeSpeech}
            {emotion === 'talking' && (
              <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse" />
            )}
          </p>
        </motion.div>

        {/* The Two Characters */}
        <Characters
          emotion={emotion}
          className="my-2"
          boyName={dialogue.boyName}
          girlName={dialogue.girlName}
        />

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* YES Button */}
          <button
            onClick={handleYesClick}
            disabled={isTransitioning}
            className="w-full sm:w-1/2 py-3.5 sm:py-4 px-6 rounded-full bg-accent-yellow text-brand-black hover:bg-accent-yellow-deep font-display font-extrabold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Yes, I am ready! 🔥</span>
          </button>

          {/* NO Button (Morphs into funny concession if clicked) */}
          <AnimatePresence mode="wait">
            {!hasRefused ? (
              <motion.button
                key="no-btn"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleNoClick}
                disabled={isTransitioning}
                className="w-full sm:w-1/2 py-3.5 sm:py-4 px-6 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/30 font-display font-semibold text-base transition-all duration-300"
              >
                <span>No, not yet 🙈</span>
              </motion.button>
            ) : (
              <motion.button
                key="morphed-btn"
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={handleYesClick}
                disabled={isTransitioning}
                className="w-full sm:w-1/2 py-3.5 sm:py-4 px-6 rounded-full bg-accent-pink text-white hover:bg-accent-pink-deep font-display font-extrabold text-base shadow-lg animate-pulse hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>{dialogue.noButtonMorphText}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};


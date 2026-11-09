import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface MessageScreenProps {
  friendName: string;
  creatorName: string;
  paragraphs: string[];
  scrollSpeed: number;
  onFinish: () => void;
}

export const MessageScreen: React.FC<MessageScreenProps> = ({
  friendName,
  creatorName,
  paragraphs,
  scrollSpeed,
  onFinish,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 1
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Calculate total scrollable height
  const getScrollMetrics = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return { maxScroll: 1, currentScroll: 0 };
    const containerHeight = containerRef.current.clientHeight;
    const contentHeight = contentRef.current.scrollHeight;
    const maxScroll = Math.max(1, contentHeight - containerHeight + 200);
    const currentScroll = containerRef.current.scrollTop;
    return { maxScroll, currentScroll };
  }, []);

  // Frame ticker for butter-smooth scrolling
  useEffect(() => {
    const tick = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (isPlaying && !isDraggingRef.current && containerRef.current) {
        const { maxScroll } = getScrollMetrics();
        const deltaScroll = scrollSpeed * deltaTime;
        const newScrollTop = containerRef.current.scrollTop + deltaScroll;

        containerRef.current.scrollTop = newScrollTop;
        const currentProg = Math.min(1, newScrollTop / maxScroll);
        setProgress(currentProg);

        // If reached end
        if (newScrollTop >= maxScroll) {
          setIsPlaying(false);
          sound.playCelebration();
          setTimeout(() => {
            onFinish();
          }, 1000);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scrollSpeed, onFinish, getScrollMetrics]);

  // Handle Drag-to-scrub slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProg = parseFloat(e.target.value);
    setProgress(newProg);
    if (containerRef.current) {
      const { maxScroll } = getScrollMetrics();
      containerRef.current.scrollTop = newProg * maxScroll;
    }
  };

  const handleSkip = () => {
    sound.playPop();
    setIsPlaying(false);
    if (containerRef.current) {
      const { maxScroll } = getScrollMetrics();
      containerRef.current.scrollTop = maxScroll;
    }
    setProgress(1);
    onFinish();
  };

  const togglePlayPause = () => {
    sound.playPop();
    setIsPlaying((prev) => !prev);
    lastTimeRef.current = null;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0518] text-white">
      {/* 1. Cinema Spotlight Beam from Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[600px] h-[80vh] pointer-events-none opacity-25">
        <div className="w-full h-full bg-gradient-to-b from-indigo-300 via-primary/30 to-transparent blur-3xl transform -scale-y-100" />
      </div>

      {/* 2. Floating Ambient Dust Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-yellow/50"
            style={{
              width: `${(i % 3) * 2 + 2}px`,
              height: `${(i % 3) * 2 + 2}px`,
              top: `${(i * 13 + 7) % 95}%`,
              left: `${(i * 29 + 3) % 95}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Top Banner Tag */}
      <header className="relative z-20 pt-16 sm:pt-20 pb-2 text-center pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-yellow text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cinematic Dedication</span>
        </span>
      </header>

      {/* 3. Credits Crawl Viewport with Soft Top & Bottom Mask */}
      <div
        ref={containerRef}
        onMouseDown={() => {
          isDraggingRef.current = true;
        }}
        onMouseUp={() => {
          isDraggingRef.current = false;
          lastTimeRef.current = null;
        }}
        onTouchStart={() => {
          isDraggingRef.current = true;
        }}
        onTouchEnd={() => {
          isDraggingRef.current = false;
          lastTimeRef.current = null;
        }}
        className="relative z-10 flex-1 w-full max-w-2xl mx-auto px-6 sm:px-10 overflow-y-auto no-scrollbar credits-fade-mask select-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div ref={contentRef} className="pt-[45vh] pb-[60vh] flex flex-col items-center text-center space-y-8 sm:space-y-12">
          {/* Header Title in Credits */}
          <div className="space-y-3">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              A Special Tribute to
            </h1>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow via-accent-pink to-accent-cyan tracking-tight">
              {friendName}
            </h2>
            <div className="flex items-center justify-center gap-2 text-indigo-300 font-serif italic text-sm sm:text-base">
              <span>✦ Written with heart by {creatorName} ✦</span>
            </div>
          </div>

          <div className="w-16 h-1 rounded-full bg-accent-yellow/60 my-6" />

          {/* Crawl Paragraphs */}
          {paragraphs.map((para, index) => {
            const isFirst = index === 0;
            const isLast = index === paragraphs.length - 1;

            return (
              <motion.div
                key={index}
                className={`max-w-xl mx-auto ${
                  isFirst
                    ? 'font-display font-bold text-2xl sm:text-3xl text-accent-yellow tracking-wide'
                    : isLast
                    ? 'font-serif italic font-semibold text-xl sm:text-2xl text-accent-pink pt-4'
                    : 'font-serif text-lg sm:text-2xl leading-relaxed sm:leading-loose text-indigo-100/95 font-normal'
                }`}
              >
                <p>{para}</p>
              </motion.div>
            );
          })}

          {/* Ending Motif */}
          <div className="pt-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-pink/20 flex items-center justify-center text-accent-pink">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-mono">
              ✦ End of Credits ✦
            </p>
          </div>
        </div>
      </div>

      {/* 4. Bottom Cinematic Control Dock */}
      <footer className="relative z-30 pb-6 pt-3 px-4 flex flex-col items-center gap-3 max-w-xl mx-auto w-full">
        {/* Drag to scrub slider bar */}
        <div className="w-full flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15">
          <span className="text-[10px] sm:text-xs font-mono text-indigo-200 uppercase tracking-wider shrink-0">
            {Math.round(progress * 100)}%
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={progress}
            onChange={handleSliderChange}
            aria-label="Crawl progress scrubber"
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-yellow"
          />

          <span className="text-[10px] sm:text-xs font-mono text-indigo-200 uppercase tracking-wider shrink-0">
            End
          </span>
        </div>

        {/* Buttons: Pause/Play, Skip */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-display font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-yellow hover:bg-accent-yellow-deep text-brand-black font-display font-extrabold text-xs sm:text-sm shadow-pill hover:shadow-pill-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Skip to Reply</span>
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </footer>
    </div>
  );
};


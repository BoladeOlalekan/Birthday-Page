import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentStep: string;
  onReset: () => void;
  creatorName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onReset }) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playPop();
    }
  };

  return (
    <header className="fixed top-4 right-4 z-50 pointer-events-auto flex items-center gap-2">
      {currentStep !== 'landing' && (
        <button
          onClick={() => {
            sound.playPop();
            onReset();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-brand-black hover:bg-white border border-white/70 shadow-sm transition-all text-xs font-semibold"
          title="Reset to beginning"
        >
          <RotateCcw className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Start Over</span>
        </button>
      )}

      <button
        onClick={handleToggleSound}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-300 text-xs font-semibold backdrop-blur-md shadow-sm ${
          isMuted
            ? 'bg-brand-black/90 text-white hover:bg-black border border-white/20'
            : 'bg-primary text-white hover:bg-primary-dark shadow-pill'
        }`}
        aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span>Sound Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Sound On</span>
          </>
        )}
      </button>
    </header>
  );
};

export default Navbar;

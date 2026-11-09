import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIG } from './config';
import { Navbar } from './components/Navbar';
import { LandingScreen } from './screens/LandingScreen';
import { VerifyScreen } from './screens/VerifyScreen';
import { PortalScreen } from './screens/PortalScreen';
import { CharactersScreen } from './screens/CharactersScreen';
import { CurtainScreen } from './screens/CurtainScreen';
import { MessageScreen } from './screens/MessageScreen';
import { ReplyScreen } from './screens/ReplyScreen';
import { ThanksScreen } from './screens/ThanksScreen';

export type ExperienceState =
  | 'landing'
  | 'verify'
  | 'portal'
  | 'characters'
  | 'curtain'
  | 'message'
  | 'reply'
  | 'thanks';

export const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<ExperienceState>('landing');
  const [verifiedName, setVerifiedName] = useState(CONFIG.FRIEND_DISPLAY_NAME);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Desktop soft cursor follower
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setIsPointerDevice(true);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  const handleReset = () => {
    setCurrentState('landing');
  };

  return (
    <div className="relative min-h-screen w-full bg-surface text-brand-black overflow-x-hidden font-sans">
      {/* Soft desktop cursor follower */}
      {isPointerDevice && (
        <motion.div
          className="fixed pointer-events-none z-50 w-7 h-7 rounded-full border-2 border-primary/40 bg-primary/10 backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2 hidden md:block"
          animate={{ x: cursorPos.x, y: cursorPos.y }}
          transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.2 }}
        />
      )}

      {/* Persistent Floating Navbar */}
      <Navbar
        currentStep={currentState}
        onReset={handleReset}
        creatorName={CONFIG.CREATOR_NAME}
      />

      {/* State Machine Transition Container */}
      <main className="w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {currentState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-screen"
            >
              <LandingScreen
                onStart={() => setCurrentState('verify')}
                tagline={CONFIG.LANDING_TAGLINE}
                creatorName={CONFIG.CREATOR_NAME}
              />
            </motion.div>
          )}

          {currentState === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-screen"
            >
              <VerifyScreen
                correctNames={CONFIG.CORRECT_NAMES}
                wrongAnswerLines={CONFIG.WRONG_ANSWER_LINES}
                onSuccess={(enteredName) => {
                  setVerifiedName(enteredName || CONFIG.FRIEND_DISPLAY_NAME);
                  setCurrentState('portal');
                }}
              />
            </motion.div>
          )}

          {currentState === 'portal' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full min-h-screen"
            >
              <PortalScreen onComplete={() => setCurrentState('characters')} />
            </motion.div>
          )}

          {currentState === 'characters' && (
            <motion.div
              key="characters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full min-h-screen"
            >
              <CharactersScreen
                friendName={verifiedName}
                creatorName={CONFIG.CREATOR_NAME}
                dialogue={CONFIG.CHARACTER_DIALOGUE}
                onProceed={() => setCurrentState('curtain')}
              />
            </motion.div>
          )}

          {currentState === 'curtain' && (
            <motion.div
              key="curtain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-h-screen"
            >
              <CurtainScreen onCurtainOpened={() => setCurrentState('message')} />
            </motion.div>
          )}

          {currentState === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full min-h-screen"
            >
              <MessageScreen
                friendName={verifiedName}
                creatorName={CONFIG.CREATOR_NAME}
                paragraphs={CONFIG.BIRTHDAY_MESSAGE}
                scrollSpeed={CONFIG.SCROLL_SPEED}
                onFinish={() => setCurrentState('reply')}
              />
            </motion.div>
          )}

          {currentState === 'reply' && (
            <motion.div
              key="reply"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full min-h-screen"
            >
              <ReplyScreen
                friendDisplayName={verifiedName}
                creatorName={CONFIG.CREATOR_NAME}
                emailConfig={CONFIG.EMAIL}
                onSuccess={() => setCurrentState('thanks')}
              />
            </motion.div>
          )}

          {currentState === 'thanks' && (
            <motion.div
              key="thanks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full min-h-screen"
            >
              <ThanksScreen
                friendDisplayName={verifiedName}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;


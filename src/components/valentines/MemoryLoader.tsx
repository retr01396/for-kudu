/**
 * MemoryLoader.tsx
 * Stage 3: Fake emotional loading with changing text
 * Creates anticipation before the photo gallery
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MemoryLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  'loading our memories…',
  'collecting stolen moments…',
  'rewinding time…',
  'finding the good parts…',
  'almost there…',
];

const MemoryLoader = ({ onComplete }: MemoryLoaderProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Message cycling
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--gradient-romantic)' }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{ background: 'hsl(350 67% 88%)' }}
      />

      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center text-xl md:text-2xl italic mb-12"
        style={{
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {loadingMessages[messageIndex]}
      </motion.p>

      {/* Progress bar */}
      <div className="relative z-10 w-64 md:w-80 h-1 rounded-full overflow-hidden bg-white/30">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(350 67% 88%) 0%, hsl(8 27% 35%) 100%)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-4 text-sm"
        style={{
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {progress}%
      </motion.span>
    </motion.div>
  );
};

export default MemoryLoader;

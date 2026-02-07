/**
 * Confession.tsx
 * Stage 5: The final question with typewriter effect
 * Most dramatic and emotional moment
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ConfessionProps {
  onYes: () => void;
}

const useTypewriter = (text: string, speed: number = 80, delay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};

const Confession = ({ onYes }: ConfessionProps) => {
  const [stage, setStage] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  const line1 = useTypewriter(
    "i don't know what the future looks like…",
    70,
    500
  );
  const line2 = useTypewriter(
    'but i know one thing for certain…',
    70,
    line1.isComplete ? 1500 : 99999
  );

  useEffect(() => {
    if (line2.isComplete) {
      const timer = setTimeout(() => setStage(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [line2.isComplete]);

  const handleNoHover = () => {
    setNoAttempts((prev) => prev + 1);

    // Calculate escape direction - away from cursor
    const escapeDistance = 100 + noAttempts * 30;
    const angle = Math.random() * Math.PI * 2;

    setNoPosition({
      x: Math.cos(angle) * escapeDistance,
      y: Math.sin(angle) * escapeDistance,
    });

    // Make YES button grow slightly
    setYesScale((prev) => Math.min(prev + 0.05, 1.5));
  };

  const getNoButtonText = () => {
    if (noAttempts >= 8) return "damn… at least lie to me once.";
    if (noAttempts >= 5) return "really? you sure?";
    if (noAttempts >= 3) return "try again :)";
    return "no";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
      style={{
        background:
          'linear-gradient(135deg, hsl(40 33% 93%) 0%, hsl(350 50% 92%) 50%, hsl(35 40% 92%) 100%)',
      }}
    >
      {/* Heartbeat background pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, hsl(350 67% 88% / 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Typewriter text */}
      <div className="relative z-10 text-center max-w-2xl">
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl italic mb-4"
          style={{
            color: 'hsl(8, 27%, 23%)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.8,
          }}
        >
          {line1.displayedText}
          {!line1.isComplete && (
            <span className="animate-pulse opacity-70">|</span>
          )}
        </motion.p>

        {line1.isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl lg:text-3xl italic"
            style={{
              color: 'hsl(8, 27%, 23%)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.8,
            }}
          >
            {line2.displayedText}
            {!line2.isComplete && (
              <span className="animate-pulse opacity-70">|</span>
            )}
          </motion.p>
        )}

        {/* The big question */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl heartbeat"
              style={{
                color: 'hsl(8, 27%, 23%)',
                fontFamily: 'var(--font-display)',
                textShadow: '0 0 60px hsl(350 67% 88% / 0.5)',
              }}
            >
              will u be my valentine vave?
            </h2>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-8 mt-12 relative min-h-[100px]">
              {/* YES button - grows but doesn't move */}
              <motion.button
                whileHover={{ boxShadow: '0 0 50px hsl(350 67% 88% / 0.8)' }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: yesScale }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={onYes}
                className="px-12 py-4 rounded-full text-lg tracking-wider transition-all duration-300"
                style={{
                  background: 'hsl(350 67% 88%)',
                  color: 'hsl(8, 27%, 23%)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 0 30px hsl(350 67% 88% / 0.5)',
                }}
              >
                yes 💕
              </motion.button>

              {/* NO button - escapes cursor */}
              <motion.button
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  rotate: noAttempts * 5,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="px-8 py-3 rounded-full text-sm tracking-wider transition-colors duration-300"
                style={{
                  background: 'hsl(40 33% 93%)',
                  color: 'hsl(8 27% 23% / 0.7)',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid hsl(8 27% 23% / 0.2)',
                }}
              >
                {getNoButtonText()}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Confession;

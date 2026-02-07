/**
 * CustomCursor.tsx
 * Custom heart cursor with trailing particle effect
 * Replaces default cursor with a soft pink glowing heart
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail particle
      const newTrail: Trail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-none fixed z-[9998]"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: `hsl(350 67% 88% / ${0.3 + index * 0.05})`,
                boxShadow: '0 0 10px hsl(350 67% 88% / 0.5)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor heart */}
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed z-[9999]"
          animate={{
            x: position.x - 12,
            y: position.y - 12,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 8px hsl(350 67% 88% / 0.8))',
            }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="hsl(350, 67%, 88%)"
            />
          </svg>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;

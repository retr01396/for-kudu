/**
 * FallingPetals.tsx
 * Elegant falling rose petals animation
 * Sparse, slow, and romantic - not chaotic
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetal = () => {
      const newPetal: Petal = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 15,
        rotation: Math.random() * 360,
      };

      setPetals((prev) => [...prev.slice(-12), newPetal]);
    };

    // Create initial petals
    for (let i = 0; i < 5; i++) {
      setTimeout(createPetal, i * 800);
    }

    // Continue creating petals at intervals
    const interval = setInterval(createPetal, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              y: -50,
              x: `${petal.x}vw`,
              rotate: petal.rotation,
              opacity: 0.8,
            }}
            animate={{
              y: '110vh',
              x: `${petal.x + (Math.random() - 0.5) * 20}vw`,
              rotate: petal.rotation + 720,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: 'linear',
            }}
            className="absolute"
            style={{ width: petal.size, height: petal.size }}
          >
            {/* Rose petal SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 2px 4px hsl(350 67% 70% / 0.3))',
              }}
            >
              <ellipse
                cx="12"
                cy="12"
                rx="8"
                ry="10"
                fill="hsl(350, 67%, 88%)"
                opacity="0.7"
              />
              <ellipse
                cx="12"
                cy="14"
                rx="5"
                ry="6"
                fill="hsl(350, 50%, 82%)"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingPetals;

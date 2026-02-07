/**
 * HeartConfetti.tsx
 * Explosive heart emoji confetti effect
 * Triggers when YES is clicked
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

interface HeartConfettiProps {
  isActive: boolean;
  duration?: number;
}

const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🥰', '😍', '💞', '💟', '❣️'];

const HeartConfetti = ({ isActive, duration = 4000 }: HeartConfettiProps) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create explosion of hearts from center
    const createExplosion = () => {
      const newParticles: HeartParticle[] = [];
      const particleCount = 80; // Lots of hearts!

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const velocity = 8 + Math.random() * 15;
        
        newParticles.push({
          id: Date.now() + i,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
          size: 20 + Math.random() * 30,
          rotation: Math.random() * 360,
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity - 5, // Slight upward bias
        });
      }

      setParticles(newParticles);
    };

    // Create multiple waves of explosions
    createExplosion();
    const wave2 = setTimeout(createExplosion, 300);
    const wave3 = setTimeout(createExplosion, 600);

    // Clear particles after duration
    const cleanup = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => {
      clearTimeout(wave2);
      clearTimeout(wave3);
      clearTimeout(cleanup);
    };
  }, [isActive, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              rotate: particle.rotation,
              opacity: 1,
            }}
            animate={{
              x: particle.x + particle.velocityX * 40,
              y: particle.y + particle.velocityY * 40 + 200, // Gravity effect
              scale: [0, 1.2, 1],
              rotate: particle.rotation + Math.random() * 360,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5 + Math.random(),
              ease: 'easeOut',
            }}
            className="absolute"
            style={{
              fontSize: particle.size,
              filter: 'drop-shadow(0 0 10px hsl(350 67% 88% / 0.5))',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartConfetti;

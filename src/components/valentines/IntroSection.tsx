/**
 * IntroSection.tsx
 * Stage 2: Emotional intro before the journey
 * Soft transition with elegant typography
 */

import { motion } from 'framer-motion';

interface IntroSectionProps {
  onContinue: () => void;
}

const IntroSection = ({ onContinue }: IntroSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--gradient-romantic)' }}
    >
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 breathing-bg"
          style={{ background: 'hsl(350 67% 88%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'hsl(35 50% 80%)' }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="relative z-10 text-center text-2xl md:text-3xl lg:text-4xl italic mb-16"
        style={{
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.6,
        }}
      >
        before you enter…<br />
        <span className="opacity-80">answer honestly.</span>
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(350 67% 88% / 0.5)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="relative z-10 px-12 py-4 rounded-full text-lg tracking-wide transition-all duration-500"
        style={{
          background: 'hsl(40, 33%, 93%)',
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-body)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        continue
      </motion.button>
    </motion.div>
  );
};

export default IntroSection;

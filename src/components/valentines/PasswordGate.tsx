/**
 * PasswordGate.tsx
 * Stage 1: Emotional password gate entrance
 * Full coffee brown screen with elegant input
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // The secret date - customized to 13/11/2023
  const SECRET_DATE = '13/11/2023';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Accept various formats of 13/11/2023
    const normalizedInput = password.toLowerCase().replace(/[^0-9]/g, '');
    const acceptedFormats = ['13112023', '11132023', '131123', '111323', '1311', '1113'];

    if (acceptedFormats.some((format) => normalizedInput.includes(format))) {
      setIsUnlocking(true);
      setTimeout(onUnlock, 2000);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
          style={{ background: 'hsl(8, 27%, 23%)' }}
        >
          {/* Breathing background effect */}
          <div className="absolute inset-0 breathing-bg" style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(8 20% 28%) 0%, hsl(8 27% 23%) 70%)',
          }} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 text-center font-serif text-xl md:text-2xl lg:text-3xl italic mb-12"
            style={{ color: 'hsl(40, 33%, 93%)', fontFamily: 'var(--font-display)' }}
          >
            everything in this whole wide world is for my pwincess.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            onSubmit={handleSubmit}
            className={`relative z-10 w-full max-w-sm ${isShaking ? 'shake' : ''}`}
          >
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter the date we met"
              className="w-full px-6 py-4 text-center text-lg bg-transparent border-b-2 outline-none transition-all duration-500 placeholder:italic"
              style={{
                borderColor: 'hsl(40 33% 93% / 0.3)',
                color: 'hsl(40, 33%, 93%)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'hsl(350 67% 88%)')}
              onBlur={(e) => (e.target.style.borderColor = 'hsl(40 33% 93% / 0.3)')}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full py-3 text-sm uppercase tracking-[0.3em] transition-all duration-500"
              style={{
                color: 'hsl(40 33% 93% / 0.6)',
                fontFamily: 'var(--font-body)',
              }}
            >
              unlock
            </motion.button>
          </motion.form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'hsl(8, 27%, 23%)' }}
        >
          {/* Cinematic glow sweep */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(350 67% 88% / 0.4) 50%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordGate;

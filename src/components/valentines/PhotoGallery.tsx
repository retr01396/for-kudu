import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoGalleryProps {
  onContinue: () => void;
}

import firstPicture from '@/assets/images/firstPicture.png';
import secondPicture from '@/assets/images/secondPicture.png';
import thirdPicture from '@/assets/images/thirdPicture.png';
import fourthPicture from '@/assets/images/fourthPicture.png';

const memories = [
  {
    image: firstPicture,
    caption: 'our very first day together so cwuteee ur braces mannnnn 😭',
  },
  {
    image: secondPicture,
    caption: 'still my favorite smile',
  },
  {
    image: thirdPicture,
    caption: 'we being lovey dovey hehe',
  },
  {
    image: fourthPicture,
    caption: 'OUR BEST DATE YET',
  },
];

const PhotoGallery = ({ onContinue }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-4 md:px-12 py-8"
      style={{ background: 'var(--gradient-romantic)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 breathing-bg"
        style={{ background: 'hsl(350 67% 88%)' }}
      />

      {/* Gallery container */}
      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Photo frame */}
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden"
              style={{
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              <motion.img
                src={memories[currentIndex].image}
                alt={memories[currentIndex].caption}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, ease: 'linear' }}
              />

              {/* Gradient overlay for caption readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, hsl(8 27% 23% / 0.6) 0%, transparent 40%)',
                }}
              />

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center text-lg md:text-2xl italic px-6"
                style={{
                  color: 'hsl(40, 33%, 93%)',
                  fontFamily: 'var(--font-display)',
                  textShadow: '0 2px 20px hsl(8 27% 10% / 0.5)',
                }}
              >
                "{memories[currentIndex].caption}"
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPhoto}
            className="p-3 rounded-full transition-colors duration-300"
            style={{
              background: 'hsl(40 33% 93% / 0.8)',
              color: 'hsl(8, 27%, 23%)',
            }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    index === currentIndex
                      ? 'hsl(8, 27%, 23%)'
                      : 'hsl(8 27% 23% / 0.3)',
                  transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPhoto}
            className="p-3 rounded-full transition-colors duration-300"
            style={{
              background: 'hsl(40 33% 93% / 0.8)',
              color: 'hsl(8, 27%, 23%)',
            }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px hsl(350 67% 88% / 0.4)',
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="relative z-10 mt-10 px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-500 float"
        style={{
          background: 'hsl(350 67% 88%)',
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-body)',
          boxShadow: 'var(--shadow-glow-pink)',
        }}
      >
        one more thing →
      </motion.button>
    </motion.div>
  );
};

export default PhotoGallery;

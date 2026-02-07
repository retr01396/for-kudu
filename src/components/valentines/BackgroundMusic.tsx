import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// 👉 ADD YOUR MUSIC FILE HERE LATER IF YOU WANT
// import backgroundMusic from '@/assets/audio/your-song.mp3';
const backgroundMusic = ''; // leave empty = no UI shows

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

const BackgroundMusic = ({ autoPlay = false }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current || !backgroundMusic) return;

    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;

    if (autoPlay) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    if (!audioRef.current || !backgroundMusic) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  // 🔥 NOTHING renders if no music file
  if (!backgroundMusic) return null;

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} preload="auto" />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[100] p-3 rounded-full backdrop-blur-lg transition-all duration-300"
        style={{
          background: 'hsl(0 0% 100% / 0.2)',
          border: '1px solid hsl(0 0% 100% / 0.3)',
          boxShadow: isPlaying ? '0 0 20px hsl(350 67% 88% / 0.5)' : 'none',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <Volume2 size={20} color="hsl(350, 67%, 88%)" />
        ) : (
          <VolumeX size={20} color="hsl(40, 33%, 93%)" style={{ opacity: 0.7 }} />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;

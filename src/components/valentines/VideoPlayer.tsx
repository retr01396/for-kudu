/**
 * VideoPlayer.tsx
 * Full-screen video player with dimmed background
 * 
 * HOW TO ADD YOUR VIDEOS:
 * 1. Place your video files (MP4, WebM, etc.) in src/assets/video/
 * 2. Import them in Celebration.tsx and pass as videoSrc prop
 * 3. Example: import ourVideo from '@/assets/video/our-video.mp4';
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX, Gift } from 'lucide-react';

interface VideoPlayerProps {
  isVisible: boolean;
  onClose?: () => void;
  videoSrc?: string;
  placeholderTitle?: string;
  placeholderDescription?: string;
  isGift?: boolean;
}

const VideoPlayer = ({ 
  isVisible, 
  onClose, 
  videoSrc = '',
  placeholderTitle = 'add your special video',
  placeholderDescription = 'Place your video in src/assets/video/ and import it',
  isGift = false,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible && videoRef.current && videoSrc) {
      // Auto-play when visible
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    
    // Reset state when closing
    if (!isVisible) {
      setIsPlaying(false);
      setShowControls(true);
    }
  }, [isVisible, videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Placeholder when no video is configured
  if (!videoSrc) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center"
            style={{ background: 'hsl(8 27% 10% / 0.9)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 rounded-3xl max-w-md"
              style={{
                background: 'hsl(0 0% 100% / 0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {isGift ? (
                <Gift size={48} color="hsl(350, 67%, 88%)" className="mx-auto mb-4 opacity-50" />
              ) : (
                <Play size={48} color="hsl(350, 67%, 88%)" className="mx-auto mb-4 opacity-50" />
              )}
              <p
                className="text-lg mb-2"
                style={{
                  color: 'hsl(40, 33%, 93%)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {placeholderTitle}
              </p>
              <p
                className="text-sm opacity-60"
                style={{
                  color: 'hsl(40, 33%, 93%)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {placeholderDescription}
              </p>
              {onClose && (
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 rounded-full text-sm"
                  style={{
                    background: 'hsl(350 67% 88% / 0.3)',
                    color: 'hsl(40, 33%, 93%)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[150] flex items-center justify-center"
          style={{ background: 'hsl(8 27% 10% / 0.95)' }}
          onMouseMove={handleMouseMove}
          onClick={togglePlay}
        >
          {/* Video */}
          <motion.video
            ref={videoRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            src={videoSrc}
            className="max-w-[90vw] max-h-[80vh] rounded-2xl"
            style={{
              boxShadow: '0 0 60px hsl(350 67% 88% / 0.3)',
            }}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Controls overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Close button */}
                {onClose && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="absolute top-6 right-6 p-3 rounded-full pointer-events-auto transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'hsl(0 0% 100% / 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <X size={24} color="hsl(40, 33%, 93%)" />
                  </button>
                )}

                {/* Play/Pause indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-6 rounded-full pointer-events-auto"
                  style={{
                    background: 'hsl(0 0% 100% / 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {isPlaying ? (
                    <Pause size={48} color="hsl(40, 33%, 93%)" />
                  ) : (
                    <Play size={48} color="hsl(40, 33%, 93%)" />
                  )}
                </motion.div>

                {/* Mute button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="absolute bottom-6 right-6 p-3 rounded-full pointer-events-auto transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'hsl(0 0% 100% / 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {isMuted ? (
                    <VolumeX size={20} color="hsl(40, 33%, 93%)" />
                  ) : (
                    <Volume2 size={20} color="hsl(40, 33%, 93%)" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;

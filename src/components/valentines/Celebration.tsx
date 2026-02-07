/**
 * Celebration.tsx
 * Final stage: Celebration with hearts, confetti, and love letter
 * The grand finale after YES is clicked
 * 
 * HOW TO ADD YOUR VIDEOS:
 * 1. Place your video files in src/assets/video/
 * 2. Import them below:
 *    import ourVideo from '@/assets/video/our-video.mp4';
 *    import giftVideo from '@/assets/video/gift-video.mp4';
 * 3. Pass them to the VideoPlayer components below
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import HeartConfetti from './HeartConfetti';
import VideoPlayer from './VideoPlayer';

// TODO: Import your video files here
// import ourVideo from '@/assets/video/our-video.mp4';
// import giftVideo from '@/assets/video/gift-video.mp4';
import ourVideo from '@/assets/video/vedio.mp4';
import giftVideo from '@/assets/video/gift.mp4';

const Celebration = () => {
  const [showLetter, setShowLetter] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGiftVideo, setShowGiftVideo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Trigger video after confetti and message
  useEffect(() => {
    // Show main content after initial confetti burst
    const contentTimer = setTimeout(() => {
      setShowMainContent(true);
    }, 2000);

    // Show video after "stuck with me" message appears
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 4500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  // Create floating hearts
  useEffect(() => {
    if (!showMainContent) return;
    
    const createHearts = () => {
      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setHearts(newHearts);
    };

    createHearts();
    const interval = setInterval(createHearts, 4000);
    return () => clearInterval(interval);
  }, [showMainContent]);

  // Create sparkles
  useEffect(() => {
    if (!showMainContent) return;

    const createSparkle = () => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setSparkles((prev) => [...prev.slice(-15), newSparkle]);
    };

    const interval = setInterval(createSparkle, 300);
    setTimeout(() => clearInterval(interval), 5000);
    return () => clearInterval(interval);
  }, [showMainContent]);

  // Calculate countdown to Valentine's Day
  const getCountdown = () => {
    const now = new Date();
    const valentines = new Date(now.getFullYear(), 1, 14); // February 14
    if (now > valentines) {
      valentines.setFullYear(valentines.getFullYear() + 1);
    }
    const diff = valentines.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loveLetterText = `My pwincess,

I don’t think you understand what you did to my life.

Before you, days were just days.
Nothing felt special, nothing stayed.

Then you walked in… and suddenly everything had color.

Somewhere between our random conversations, stupid jokes, late replies, long nights, and the quiet moments where we said nothing at all…

you became my favorite place.

Not a person.

A place.

The one I run to in my head when the world feels loud.

The one I look for in every room without even realizing it.

Loving you was never a decision.
It happened slowly…
then all at once.

And now?
There is no version of my future where you don’t exist.

You’re in all of them.

Every plan.
Every dream.
Every stupid little fantasy about life.

I know I don’t always say things perfectly.
I know I can be annoying.
Immature.
Overdramatic sometimes.

But one thing has never been confusing for me —

it’s you.

It has always been you.

If love means choosing someone again and again…

then I want you to know —

in every lifetime,
in every universe,
in every possible story…

I would still find my way back to you.

Still choose you.

Still fall for you.

You are not just someone I love…

you are the person my heart feels calm with.

The person that makes forever sound less scary.

So this Valentine’s Day,
I don’t want promises.

I just want more us.

More laughs.
More memories.
More late night talks.
More of your voice.
More of your presence in my ordinary days.

And if someday you ever forget how much you mean to me…

come back and read this again.

Because loving you is not a phase.

It is the softest, safest, most certain thing I have ever felt.

Forever yours,

ur prince
`;

  return (
    <>
      {/* Heart emoji confetti explosion */}
      <HeartConfetti isActive={showConfetti} duration={4000} />

      {/* Our video player */}
      <VideoPlayer 
        isVisible={showVideo} 
        onClose={() => setShowVideo(false)}
        videoSrc={ourVideo}
        placeholderTitle="add our video together"
        placeholderDescription="Import your video in Celebration.tsx"
      />

      {/* Gift video player */}
      <VideoPlayer 
        isVisible={showGiftVideo} 
        onClose={() => setShowGiftVideo(false)}
        videoSrc={giftVideo}
        placeholderTitle="add your gift video"
        placeholderDescription="Import your gift reveal video in Celebration.tsx"
        isGift={true}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(40 33% 93%) 0%, hsl(350 60% 92%) 100%)',
        }}
      >
        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0.8, scale: 0.5 }}
              animate={{ y: '-10vh', opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4 + Math.random() * 2, delay: heart.delay, ease: 'linear' }}
              className="absolute"
            >
              <Heart
                size={20 + Math.random() * 20}
                fill="hsl(350, 67%, 88%)"
                color="hsl(350, 67%, 88%)"
                style={{ filter: 'drop-shadow(0 0 10px hsl(350 67% 88% / 0.5))' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Sparkles */}
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 1 }}
              className="absolute"
              style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            >
              <Sparkles
                size={16}
                color="hsl(40, 50%, 70%)"
                style={{ filter: 'drop-shadow(0 0 5px hsl(40 50% 70%))' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main content */}
        <AnimatePresence>
          {showMainContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12"
            >
              {/* Main message */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl text-center mb-8"
                style={{
                  color: 'hsl(8, 27%, 23%)',
                  fontFamily: 'var(--font-display)',
                  textShadow: '0 0 40px hsl(350 67% 88% / 0.5)',
                }}
              >
                good. you're stuck with me now.
              </motion.h1>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-center mb-12"
              >
                <p
                  className="text-sm tracking-wider mb-4 opacity-70"
                  style={{ fontFamily: 'var(--font-body)', color: 'hsl(8, 27%, 30%)' }}
                >
                  counting the seconds until i see you again
                </p>
                <div className="flex gap-4 justify-center">
                  {[
                    { value: countdown.days, label: 'days' },
                    { value: countdown.hours, label: 'hours' },
                    { value: countdown.minutes, label: 'mins' },
                    { value: countdown.seconds, label: 'secs' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="px-4 py-3 rounded-xl"
                      style={{
                        background: 'hsl(0 0% 100% / 0.6)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'var(--shadow-soft)',
                      }}
                    >
                      <span
                        className="text-2xl md:text-3xl block"
                        style={{ fontFamily: 'var(--font-display)', color: 'hsl(8, 27%, 23%)' }}
                      >
                        {item.value.toString().padStart(2, '0')}
                      </span>
                      <span
                        className="text-xs opacity-60"
                        style={{ fontFamily: 'var(--font-body)', color: 'hsl(8, 27%, 30%)' }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Buttons row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                {/* Read letter button */}
                {!showLetter && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(350 67% 88% / 0.6)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLetter(true)}
                    className="px-10 py-4 rounded-full text-base tracking-wider"
                    style={{
                      background: 'hsl(350 67% 88%)',
                      color: 'hsl(8, 27%, 23%)',
                      fontFamily: 'var(--font-body)',
                      boxShadow: 'var(--shadow-glow-pink)',
                    }}
                  >
                    read my letter to you 💌
                  </motion.button>
                )}

                {/* Watch video button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(350 67% 88% / 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowVideo(true)}
                  className="px-10 py-4 rounded-full text-base tracking-wider"
                  style={{
                    background: 'hsl(0 0% 100% / 0.6)',
                    color: 'hsl(8, 27%, 23%)',
                    fontFamily: 'var(--font-body)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid hsl(350 67% 88% / 0.5)',
                  }}
                >
                  watch our video 🎬
                </motion.button>

                {/* Gift video button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(40 50% 70% / 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGiftVideo(true)}
                  className="px-10 py-4 rounded-full text-base tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, hsl(350 67% 88%) 0%, hsl(40 50% 85%) 100%)',
                    color: 'hsl(8, 27%, 23%)',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 0 20px hsl(350 67% 88% / 0.3)',
                  }}
                >
                  your gift 🎁
                </motion.button>
              </motion.div>

              {/* Love letter panel */}
              <AnimatePresence>
                {showLetter && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="w-full max-w-2xl mt-8 p-8 md:p-12 rounded-3xl max-h-[60vh] overflow-y-auto relative"
                    style={{
                      background: 'hsl(0 0% 100% / 0.8)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: 'var(--shadow-elevated)',
                    }}
                  >
                    <button
                      onClick={() => setShowLetter(false)}
                      className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
                      style={{ color: 'hsl(8, 27%, 23%)' }}
                    >
                      ✕
                    </button>
                    <p
                      className="text-base md:text-lg whitespace-pre-line leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'hsl(8, 27%, 30%)',
                      }}
                    >
                      {loveLetterText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secret "miss me" text */}
        <SecretMissMe />
      </motion.div>
    </>
  );
};

// Secret "miss me" modal component
const SecretMissMe = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 5 }}
        whileHover={{ opacity: 0.8 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 text-xs z-[60]"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'hsl(8, 27%, 30%)',
        }}
      >
        read this if you miss me.
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: 'hsl(8 27% 23% / 0.5)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-3xl text-center"
              style={{
                background: 'hsl(0 0% 100% / 0.2)',
                backdropFilter: 'blur(30px)',
                border: '1px solid hsl(0 0% 100% / 0.3)',
                boxShadow: '0 20px 60px hsl(8 27% 10% / 0.3)',
              }}
            >
              <p
                className="text-base md:text-lg leading-relaxed italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'hsl(40, 33%, 93%)',
                }}
              >
                "In every quiet moment, in every crowded room, in every song and every silence — you're there. Not because I try to think of you, but because you've become a part of how I experience everything.
                <br /><br />
                Missing you isn't something I do. It's something I am whenever you're not here."
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-8 px-6 py-2 rounded-full text-sm"
                style={{
                  background: 'hsl(350 67% 88% / 0.3)',
                  color: 'hsl(40, 33%, 93%)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Celebration;

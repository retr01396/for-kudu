/**
 * Timeline.tsx
 * Stage 4: Interactive relationship timeline
 * Vertical glowing timeline with scroll animations
 */

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineProps {
  onContinue: () => void;
}

const timelineEvents = [
  {
    title: 'the day we met',
    description: 'everything changed without me knowing',
  },
  {
    title: 'our first laugh',
    description: 'the moment we were sitting opposite on the bench the way u came upon me i was going down the bench blushing',
  },
  {
    title: 'when i caught feelings',
    description: 'the eyes that shines brighter than the sun and that cascade of hair manh i fell hard',
  },
  {
    title: 'the late night talks',
    description: 'when we forgot its 1 o clock 2 o clock ',
  },
  {
    title: 'we had our fights too',
    description: 'but we always made up and it made us stronger',
  },
  {
    title: 'every moment with you',
    description: 'it was like having everything in life perfect at its peak',}
];

const TimelineNode = ({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'justify-start' : 'justify-end'
      } w-full`}
    >
      {/* Content card */}
      <div
        className={`relative w-full md:w-5/12 p-6 md:p-8 rounded-2xl ${
          index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
        }`}
        style={{
          background: 'hsl(0 0% 100% / 0.6)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <h3
          className="text-lg md:text-xl mb-2"
          style={{
            color: 'hsl(8, 27%, 23%)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {event.title}
        </h3>
        <p
          className="text-sm md:text-base opacity-70"
          style={{
            color: 'hsl(8, 27%, 30%)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {event.description}
        </p>
      </div>

      {/* Timeline dot - centered on desktop */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
        style={{
          background: 'hsl(350 67% 88%)',
          boxShadow: '0 0 20px hsl(350 67% 88% / 0.6)',
        }}
      />
    </motion.div>
  );
};

const Timeline = ({ onContinue }: TimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen z-40 py-20 px-4 md:px-12"
      style={{ background: 'var(--gradient-romantic)' }}
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-3xl md:text-4xl lg:text-5xl italic mb-20"
        style={{
          color: 'hsl(8, 27%, 23%)',
          fontFamily: 'var(--font-display)',
        }}
      >
        every moment that made us, us
      </motion.h2>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, hsl(350 67% 88%) 10%, hsl(350 67% 88%) 90%, transparent 100%)',
          }}
        />

        {/* Timeline events */}
        <div className="space-y-8 md:space-y-16">
          {timelineEvents.map((event, index) => (
            <TimelineNode key={index} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="flex justify-center mt-20"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 40px hsl(350 67% 88% / 0.5)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="px-10 py-4 rounded-full text-base tracking-wider transition-all duration-500"
          style={{
            background: 'hsl(8, 27%, 23%)',
            color: 'hsl(40, 33%, 93%)',
            fontFamily: 'var(--font-body)',
            boxShadow: 'var(--shadow-elevated)',
          }}
        >
          there's something i need to ask you
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;

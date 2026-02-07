/**
 * Index.tsx
 * Main Valentine's Day Experience
 * Orchestrates all stages of the cinematic love story
 */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/valentines/CustomCursor';
import FallingPetals from '@/components/valentines/FallingPetals';
import BackgroundMusic from '@/components/valentines/BackgroundMusic';
import PasswordGate from '@/components/valentines/PasswordGate';
import IntroSection from '@/components/valentines/IntroSection';
import MemoryLoader from '@/components/valentines/MemoryLoader';
import PhotoGallery from '@/components/valentines/PhotoGallery';
import Timeline from '@/components/valentines/Timeline';
import Confession from '@/components/valentines/Confession';
import Celebration from '@/components/valentines/Celebration';

type Stage =
  | 'password'
  | 'intro'
  | 'loading'
  | 'gallery'
  | 'timeline'
  | 'confession'
  | 'celebration';

const Index = () => {
  const [stage, setStage] = useState<Stage>('password');

  const renderStage = () => {
    switch (stage) {
      case 'password':
        return <PasswordGate onUnlock={() => setStage('intro')} />;
      case 'intro':
        return <IntroSection onContinue={() => setStage('loading')} />;
      case 'loading':
        return <MemoryLoader onComplete={() => setStage('gallery')} />;
      case 'gallery':
        return <PhotoGallery onContinue={() => setStage('timeline')} />;
      case 'timeline':
        return <Timeline onContinue={() => setStage('confession')} />;
      case 'confession':
        return <Confession onYes={() => setStage('celebration')} />;
      case 'celebration':
        return <Celebration />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Custom heart cursor */}
      <CustomCursor />

      {/* Background music player */}
      <BackgroundMusic />

      {/* Falling petals - visible after password gate */}
      {stage !== 'password' && <FallingPetals />}

      {/* Stage content */}
      <AnimatePresence mode="wait">{renderStage()}</AnimatePresence>
    </div>
  );
};

export default Index;

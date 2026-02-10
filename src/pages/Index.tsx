import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomeSection } from '@/components/sections/HomeSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useLandingAnimation } from '@/hooks/useLandingAnimation';
import FloatingLines from '@/components/backgrounds/FloatingLines';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hyperProgress, setHyperProgress] = useState(0);
  const { stage, isReady, isComplete } = useLandingAnimation();

  const handleScroll = useCallback(() => {
    const sections = ['home', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }

    // Calculate hyperspace progress: 0 at top of home, 1 when reaching experience
    const experienceEl = document.getElementById('experience');
    if (experienceEl) {
      const triggerStart = window.innerHeight * 0.3; // start effect after scrolling 30% of viewport
      const triggerEnd = experienceEl.offsetTop;
      const scrollY = window.scrollY;

      if (scrollY <= triggerStart) {
        setHyperProgress(0);
      } else if (scrollY >= triggerEnd) {
        setHyperProgress(1);
      } else {
        setHyperProgress((scrollY - triggerStart) / (triggerEnd - triggerStart));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const enabledWaves = useMemo<Array<'top' | 'middle' | 'bottom'>>(() => ['top', 'middle', 'bottom'], []);
  const linesGradient = useMemo(() => ['#0a1628', '#132244', '#1a3060'], []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Floating Lines — fixed behind content, hyperspace on scroll */}
      <div
        className="fixed inset-0 z-[1]"
        style={{ opacity: 1 - hyperProgress * 0.7 }}
      >
        <FloatingLines
          enabledWaves={enabledWaves}
          lineCount={5}
          lineDistance={5}
          linesGradient={linesGradient}
          bendRadius={5}
          bendStrength={-0.3}
          mouseDamping={0.05}
          interactive
          parallax
          parallaxStrength={0.1}
          mixBlendMode="screen"
          hyperProgress={hyperProgress}
        />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} animationReady={isReady(1)} />
        <HomeSection isReady={isReady} />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;

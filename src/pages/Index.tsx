import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/motion/primitives';
import { HomeSection } from '@/components/sections/HomeSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { BooksSection } from '@/components/sections/BooksSection';
import { ArtSection } from '@/components/sections/ArtSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { GrainField } from '@/components/backgrounds/GrainField';

const SECTIONS = ['home', 'experience', 'work', 'books', 'art', 'contact'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hyperProgress, setHyperProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    document.title = 'Aarya Patel';
  }, []);

  // Arriving from another page via a section link in the nav
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const id = requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }));
    window.history.replaceState({}, '');
    return () => cancelAnimationFrame(id);
  }, [location.state]);

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= probe) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }

      // Background dim progress: 0 near the top of home, 1 once experience is reached
      const experienceEl = document.getElementById('experience');
      if (experienceEl) {
        const start = window.innerHeight * 0.3;
        const end = experienceEl.offsetTop;
        const y = window.scrollY;
        setHyperProgress(y <= start ? 0 : y >= end ? 1 : (y - start) / (end - start));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070908] text-white">
      {/* Forest-fog shader — fixed behind content, dims as you scroll past the hero */}
      <div className="fixed inset-0 z-[1]" style={{ opacity: 1 - hyperProgress * 0.55 }}>
        <GrainField />
      </div>
      <Navigation activeSection={activeSection} />
      <PageTransition className="relative z-10">
        <HomeSection />
        <ExperienceSection />
        <WorkSection />
        <BooksSection />
        <ArtSection />
        <ContactSection />
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Scene3D } from '@/components/3d/Scene3D';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;

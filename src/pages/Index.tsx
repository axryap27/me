import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomeSection } from '@/components/sections/HomeSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Scene3D } from '@/components/3d/Scene3D';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'contact'];
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
        <HomeSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;

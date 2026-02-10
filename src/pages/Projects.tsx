import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="relative z-10 pt-24">
        <ProjectsSection />
      </div>
    </div>
  );
}

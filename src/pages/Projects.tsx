import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { Scene3D } from '@/components/3d/Scene3D';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Scene3D />
      <Navigation />
      <div className="pt-24">
        <ProjectsSection />
      </div>
    </div>
  );
}

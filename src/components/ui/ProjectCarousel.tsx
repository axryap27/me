import { useState, useEffect } from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  year: string;
  githubUrl: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="relative max-w-6xl mx-auto">
      
      {/* Main Carousel Container */}
      <div className="flex items-center gap-8 lg:gap-16">
        
        {/* Navigation Arrow - Left */}
        <Button
          variant="ghost"
          size="lg"
          onClick={goToPrevious}
          className="hidden lg:flex p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors shrink-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Project Card */}
        <div className="flex-1 flex justify-center">
          <TiltCard 
            key={currentIndex} // Force re-mount for animation
            className="w-full max-w-md h-96"
            intensity={8}
            scale={1.02}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              {/* Project visual placeholder */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                <div className="text-6xl text-white/50">
                  {currentIndex === 0 ? '📱' : currentIndex === 1 ? '🔧' : currentIndex === 2 ? '🤖' : '⚡'}
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Project info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-sm text-gray-400 mb-2">{currentProject.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{currentProject.title}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="p-2 h-8 w-8 hover:bg-white/10">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 h-8 w-8 hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Project Details */}
        <div className="flex-1 max-w-xl">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">{currentProject.year}</div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{currentProject.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {currentProject.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {currentProject.tech.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrow - Right */}
        <Button
          variant="ghost"
          size="lg"
          onClick={goToNext}
          className="hidden lg:flex p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors shrink-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden justify-center gap-4 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          className="p-3 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          className="p-3 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        {currentIndex + 1} of {projects.length}
      </div>
    </div>
  );
}
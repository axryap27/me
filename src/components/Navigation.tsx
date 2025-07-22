import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient-primary">
            Portfolio
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                onClick={() => scrollToSection(section.id)}
                className={`transition-all duration-300 ${
                  activeSection === section.id
                    ? 'glow-primary text-primary-foreground'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {section.label}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-primary"
          >
            Resume
          </Button>
        </div>
      </div>
    </nav>
  );
}
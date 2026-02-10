import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  animationReady?: boolean;
}

export function Navigation({ activeSection, onSectionChange, animationReady = true }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home', path: '/#home' },
    { id: 'experience', label: 'Experience', path: '/#experience' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'contact', label: 'Contact', path: '/#contact' },
  ];

  const handleNavigation = (section: { id: string; path: string }) => {
    if (section.path.startsWith('/#')) {
      // Navigate to home page section
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const sectionId = section.path.substring(2);
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            onSectionChange?.(sectionId);
          }
        }, 100);
      } else {
        const sectionId = section.path.substring(2);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          onSectionChange?.(sectionId);
        }
      }
    } else {
      // Navigate to separate page
      navigate(section.path);
    }
  };

  const isActive = (section: { id: string; path: string }) => {
    if (section.path === '/projects') {
      return location.pathname === '/projects';
    }
    return activeSection === section.id;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'py-8'
      } ${animationReady ? 'landing-fade-in' : 'landing-hidden'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src="/images/favicon.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="ml-3 text-sm font-inter-tight font-bold text-white tracking-wide">Aarya Patel</span>
            <span className="mx-3 h-4 w-px bg-gray-600" />
            <span className="text-xs font-space-mono text-gray-400">CompE + Math @ Northwestern</span>
          </Link>

          <div className="flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section)}
                className={`text-sm font-medium transition-all duration-300 hover:text-white ${
                  isActive(section)
                    ? 'text-white'
                    : 'text-gray-400'
                }`}
              >
                {section.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
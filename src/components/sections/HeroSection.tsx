import { useState } from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/button';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function HeroSection() {
  const { isLoaded, animationStage } = usePageAnimation();
  const [currentWord, setCurrentWord] = useState('builder.');
  const [showExtraLetter, setShowExtraLetter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const scrollToNext = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWordChange = (word: string) => {
    setCurrentWord(word);
    const vowelWords = ['engineer.', 'innovator.'];
    const needsAn = vowelWords.includes(word.toLowerCase());
    
    // If currently showing "n" and switching to non-vowel word, animate out
    if (showExtraLetter && !needsAn) {
      setIsExiting(true);
      setTimeout(() => {
        setShowExtraLetter(false);
        setIsExiting(false);
      }, 300); // Slightly earlier fade out
    } else if (needsAn) {
      // First show the word without "n", then playfully add it after 1 second
      setShowExtraLetter(false);
      setIsExiting(false);
      setTimeout(() => {
        setShowExtraLetter(true);
      }, 1000); // 1 second delay for playful effect
    } else {
      setShowExtraLetter(false);
      setIsExiting(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Main Content */}
      <div className="flex items-center justify-center px-8 py-20 max-w-4xl mx-auto">

        {/* Centered Content */}
        <div className="text-center max-w-3xl">
          
          {/* Animated Text */}
          <div className={`text-3xl lg:text-4xl mb-8 font-semibold transition-all duration-1000 ease-out delay-200 ${
            animationStage >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-gray-400">I'm a</span>
            <span 
              className={`text-gray-400 ${
                !showExtraLetter && !isExiting
                  ? 'opacity-0 -translate-y-4 scale-75' 
                  : ''
              }`}
              style={{ 
                display: 'inline-block',
                transformOrigin: 'center bottom',
                animation: isExiting 
                  ? 'custom-exit 0.4s ease-in forwards'
                  : showExtraLetter 
                  ? 'custom-bounce 1.2s ease-out'
                  : 'none'
              }}
            >
              {(showExtraLetter || isExiting) ? 'n' : ''}
            </span>
            <span className="text-gray-400"> </span>
            <AnimatedText 
              words={[
                'builder.',
                'coder.',
                'engineer.', 
              ]}
              className="font-semibold"
              onWordChange={handleWordChange}
            />
          </div>
          
          {/* Description */}
          <p className={`text-gray-400 text-lg leading-relaxed mb-12 max-w-xl transition-all duration-1000 ease-out delay-400 ${
            animationStage >= 3 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Hi I'm Aarya! I'm a student at Northwestern studying Computer Engineering and Math.  
            Currently seeking 2026 internships in software engineering, cybersecurity, and embedded systems.
          </p>

          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 ease-out delay-600 ${
            animationStage >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <a href="mailto:aarya27@gmail.com" className="inline-block">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-4"
              >
                Get In Touch
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600 text-white hover:bg-white hover:text-black font-medium px-8 py-4"
              onClick={scrollToNext}
            >
              View Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out delay-800 ${
        animationStage >= 5 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}>
        <Button
          variant="ghost"
          onClick={scrollToNext}
          className="animate-bounce text-gray-500 hover:text-white transition-colors"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
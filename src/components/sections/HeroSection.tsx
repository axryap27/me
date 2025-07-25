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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-8 py-20 max-w-7xl mx-auto">
        
        {/* Left Side - Profile Card */}
        <div className={`flex-shrink-0 transition-all duration-1000 ease-out ${
          animationStage >= 1 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <TiltCard 
            className="w-96 h-[28rem]"
            intensity={12}
            scale={1.05}
            perspective={1200}
          >
            <div className="relative w-full h-full p-[2px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl">
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
                {/* Profile Image - Top 2/3 */}
                <img 
                  src="/images/profile.jpg" 
                  alt="Aarya Patel"
                  className="absolute top-0 left-0 w-full h-2/3 object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Card Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2 font-sans">Aarya Patel</h3>
                <p className="text-gray-300 text-base mb-4 font-light">CompE & Math @ Northwestern</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-2 h-8 w-8 hover:bg-white/10"
                    onClick={() => window.open('https://github.com/axryap27')}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-2 h-8 w-8 hover:bg-white/10"
                    onClick={() => window.open('https://linkedin.com/in/aarya-p9')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-2 h-8 w-8 hover:bg-white/10"
                    asChild
                  >
                    <a href="mailto:aarya27@gmail.com">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Side - Main Content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          
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
            Currently seeking 2026 internships in software engineering, cybersecurity, and trading.
          </p>

          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 transition-all duration-1000 ease-out delay-600 ${
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
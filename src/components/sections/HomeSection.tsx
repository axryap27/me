import { useState } from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

interface HomeSectionProps {
  isReady: (stage: number) => boolean;
}

export function HomeSection({ isReady }: HomeSectionProps) {
  const [currentWord, setCurrentWord] = useState('builder.');
  const [showExtraLetter, setShowExtraLetter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleWordChange = (word: string) => {
    setCurrentWord(word);
    const vowelWords = ['engineer.', 'innovator.'];
    const needsAn = vowelWords.includes(word.toLowerCase());

    if (showExtraLetter && !needsAn) {
      setIsExiting(true);
      setTimeout(() => {
        setShowExtraLetter(false);
        setIsExiting(false);
      }, 300);
    } else if (needsAn) {
      setShowExtraLetter(false);
      setIsExiting(false);
      setTimeout(() => {
        setShowExtraLetter(true);
      }, 1000);
    } else {
      setShowExtraLetter(false);
      setIsExiting(false);
    }
  };

  const scrollToNext = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center px-8 py-20 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left Side - Profile Card (Stage 2: scale-fade) */}
          <div className={`flex-shrink-0 ${isReady(2) ? 'landing-scale-fade' : 'landing-hidden'}`}>
            <div className="iridescent-border">
            <TiltCard className="rounded-[30px] overflow-hidden" intensity={10}>
              <div className="relative w-[340px] h-[474px] bg-black">
                {/* Photo — stops above the bottom bar */}
                <img
                  src="/images/profile.jpg"
                  alt="Aarya Patel"
                  className="absolute inset-0 w-full h-[calc(100%-80px)] object-cover"
                />

                {/* Bottom bar */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between px-3.5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                      <img src="/images/profile.jpg" alt="Mini avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-white/90">@axryap27</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="https://github.com/axryap27" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/40 transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com/in/aaryapatel27" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/40 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="mailto:aarya27@gmail.com" className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/40 transition-all">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
            </div>
          </div>

          {/* Right Side - Bio Section */}
          <div className="flex-1 max-w-xl">
            <div className="space-y-8">
              {/* Animated Text (Stage 3: fade-up) */}
              <div className={`text-3xl lg:text-4xl font-semibold ${isReady(3) ? 'landing-fade-up' : 'landing-hidden'}`}>
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

              {/* Bio Text (Stage 4: fade-up) */}
              <p className={`text-gray-400 text-lg leading-relaxed ${isReady(4) ? 'landing-fade-up' : 'landing-hidden'}`}>
                Hi I'm Aarya! I'm a student at Northwestern studying Computer Engineering and Math.
                Currently seeking 2026 internships in software engineering, firmware, and digital design.
              </p>

              {/* Buttons (Stage 5: fade-up) */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isReady(5) ? 'landing-fade-up' : 'landing-hidden'}`}>
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
        </div>
      </div>

      {/* Scroll indicator (Stage 7: fade-up) */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isReady(7) ? 'landing-fade-up' : 'landing-hidden'}`}>
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

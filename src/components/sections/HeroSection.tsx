import { TiltCard } from '@/components/ui/TiltCard';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/button';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function HeroSection() {
  const { isLoaded, animationStage } = usePageAnimation();
  
  const scrollToNext = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-8 py-20 max-w-7xl mx-auto">
        
        {/* Left Side - Profile Card */}
        <div className="flex-shrink-0">
          <TiltCard 
            className="w-96 h-[28rem]"
            intensity={12}
            scale={1.05}
            perspective={1200}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden">
              {/* Profile Image - Top 3/4 */}
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
          </TiltCard>
        </div>

        {/* Right Side - Main Content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            {/* Aarya Patel */}
          </h1>
          
          <h2 className="text-xl lg:text-2xl mb-4 font-light">
            {/* <span className="text-gray-300">CompE & Math @ Northwestern</span> */}
          </h2>
          
          <div className="text-3xl lg:text-4xl mb-8 font-semibold">
            <span className="text-gray-400">I </span>
            <AnimatedText 
              words={[
                'build.',
                'engineer.', 
                'code.'
              ]}
              className="font-semibold"
            />
          </div>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl">
            Passionate about building innovative software solutions and exploring the intersection 
            of mathematics and technology. Currently pursuing a double major in Computer Engineering and Mathematics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-4"
              asChild
            >
              <a href="mailto:aarya27@gmail.com">
                Get In Touch
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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
import { Scene3D } from '../3d/Scene3D';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/80 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-primary float">
            Alex Chen
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-muted-foreground">
            Full-Stack <span className="text-secondary">Software Engineer</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Crafting innovative digital experiences with cutting-edge technologies.
            Passionate about creating scalable solutions that make a difference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="gradient-primary text-primary-foreground glow-primary transition-bounce px-8 py-6 text-lg"
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground glow-secondary px-8 py-6 text-lg"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full glass hover:glow-primary">
            <Github className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full glass hover:glow-secondary">
            <Linkedin className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full glass hover:glow-accent">
            <Mail className="h-6 w-6" />
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={scrollToNext}
          className="animate-bounce text-muted-foreground hover:text-primary transition-smooth"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full pulse-glow" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full pulse-glow animation-delay-300" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-accent rounded-full pulse-glow animation-delay-600" />
    </section>
  );
}
import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  perspective?: number;
}

export function TiltCard({ 
  children, 
  className, 
  intensity = 15, 
  scale = 1.05,
  perspective = 1000 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !lightRef.current) return;

    const card = cardRef.current;
    const light = lightRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * intensity;
    const rotateY = (mouseX / (rect.width / 2)) * intensity;
    
    // Update card transform
    card.style.transform = `
      perspective(${perspective}px) 
      rotateX(${-rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(${scale}, ${scale}, ${scale})
    `;

    // Update light position - follow cursor
    const lightX = ((e.clientX - rect.left) / rect.width) * 100;
    const lightY = ((e.clientY - rect.top) / rect.height) * 100;
    
    light.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 20%, transparent 40%)`;
  }, [intensity, scale, perspective]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!cardRef.current || !lightRef.current) return;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
    lightRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!cardRef.current || !lightRef.current) return;
    cardRef.current.style.transition = 'transform 0.3s ease-out';
    cardRef.current.style.transform = `
      perspective(${perspective}px) 
      rotateX(0deg) 
      rotateY(0deg) 
      scale3d(1, 1, 1)
    `;
    lightRef.current.style.opacity = '0';
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-300 ease-out",
        "transform-gpu will-change-transform",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {children}
        
        {/* Moving light source */}
        <div
          ref={lightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 20%, transparent 40%)',
          }}
        />
      </div>
      
      {/* Subtle shadow that moves with tilt */}
      <div
        className={cn(
          "absolute inset-0 bg-black rounded-lg opacity-0 -z-10 blur-xl",
          "transition-opacity duration-300",
          isHovered && "opacity-20"
        )}
        style={{
          transform: 'translateZ(-20px) scale(0.9)',
        }}
      />
    </div>
  );
}
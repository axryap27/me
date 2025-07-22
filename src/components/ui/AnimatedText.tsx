import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className = "" }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500); // Half second fade out, then change word and fade in
      
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  const getColorClass = () => {
    const colors = [
      'text-blue-400',
      'text-purple-400', 
      'text-green-400',
      'text-orange-400',
      'text-pink-400'
    ];
    return colors[currentWordIndex % colors.length];
  };

  return (
    <span 
      className={`
        ${className} 
        ${getColorClass()} 
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {words[currentWordIndex]}
    </span>
  );
}
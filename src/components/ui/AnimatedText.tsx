import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  words: string[];
  className?: string;
  onWordChange?: (word: string) => void;
}

export function AnimatedText({ words, className = "", onWordChange }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const vowelWords = ['engineer.', 'innovator.'];
    const isVowelWord = vowelWords.includes(currentWord.toLowerCase());
    
    // Give vowel words extra time for the playful "n" animation
    const displayTime = isVowelWord ? 4500 : 2500; // 4.5s for vowel words, 2.5s for others
    
    const timeout = setTimeout(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        const newIndex = (currentWordIndex + 1) % words.length;
        setCurrentWordIndex(newIndex);
        setIsVisible(true);
        onWordChange?.(words[newIndex]);
      }, 500); // Half second fade out, then change word and fade in
      
    }, displayTime);

    return () => clearTimeout(timeout);
  }, [words.length, currentWordIndex, onWordChange, words]);

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
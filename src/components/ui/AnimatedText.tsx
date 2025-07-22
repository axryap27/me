import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className = "" }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  const getColorClass = () => {
    const colors = [
      'text-blue-400',
      'text-purple-400', 
      'text-green-400',
      'text-orange-400',
      'text-pink-400',
      'text-cyan-400'
    ];
    return colors[currentWordIndex % colors.length];
  };

  return (
    <span className={`${className} ${getColorClass()} transition-colors duration-300`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
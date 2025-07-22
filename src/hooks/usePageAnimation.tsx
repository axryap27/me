import { useState, useEffect } from 'react';

export function usePageAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Initial load delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Stagger animation stages
      const stages = [1, 2, 3, 4, 5];
      stages.forEach((stage, index) => {
        setTimeout(() => {
          setAnimationStage(stage);
        }, index * 200); // 200ms between each stage
      });
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  return { isLoaded, animationStage };
}
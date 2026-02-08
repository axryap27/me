import { useState, useEffect, useCallback } from 'react';

export function useLandingAnimation() {
  const [stage, setStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeline = [300, 700, 1200, 1700, 2200, 2700, 3100];

    const timers = timeline.map((delay, index) =>
      setTimeout(() => {
        setStage(index + 1);
        if (index === timeline.length - 1) {
          setIsComplete(true);
        }
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const isReady = useCallback((targetStage: number) => stage >= targetStage, [stage]);

  return { stage, isReady, isComplete };
}

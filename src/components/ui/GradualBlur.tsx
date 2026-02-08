import { useMemo, CSSProperties } from 'react';

interface GradualBlurProps {
  position?: 'top' | 'bottom';
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: 'linear' | 'bezier';
  exponential?: boolean;
  opacity?: number;
  className?: string;
}

export default function GradualBlur({
  position = 'bottom',
  height = '7rem',
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = false,
  opacity = 1,
  className = '',
}: GradualBlurProps) {
  const layers = useMemo(() => {
    return Array.from({ length: divCount }, (_, i) => {
      const progress = i / (divCount - 1);

      let blurAmount: number;
      if (exponential) {
        blurAmount = strength * Math.pow(progress, 2);
      } else if (curve === 'bezier') {
        // Ease-in curve
        const t = progress;
        blurAmount = strength * (t * t * (3 - 2 * t));
      } else {
        blurAmount = strength * progress;
      }

      // Each layer covers a portion of the height with overlap
      const layerStart = (i / divCount) * 100;
      const layerEnd = ((i + 1) / divCount) * 100;

      return {
        blur: blurAmount,
        start: layerStart,
        end: layerEnd,
      };
    });
  }, [divCount, strength, curve, exponential]);

  const containerStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height,
    pointerEvents: 'none',
    zIndex: 10,
    opacity,
    ...(position === 'bottom' ? { bottom: 0 } : { top: 0 }),
  };

  return (
    <div className={`gradual-blur ${className}`} style={containerStyle}>
      <div className="gradual-blur-inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {layers.map((layer, i) => {
          const maskDirection = position === 'bottom' ? 'to bottom' : 'to top';

          const style: CSSProperties = {
            position: 'absolute',
            left: 0,
            right: 0,
            [position]: `${layer.start}%`,
            height: `${layer.end - layer.start + 15}%`,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(${maskDirection}, transparent 0%, black 50%, black 100%)`,
            WebkitMaskImage: `linear-gradient(${maskDirection}, transparent 0%, black 50%, black 100%)`,
          };

          return <div key={i} style={style} />;
        })}
      </div>
    </div>
  );
}

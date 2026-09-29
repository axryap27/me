import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { artwork } from '@/data/artwork';

/** Horizontal strip of artwork that drifts sideways as you scroll past. */
export function ArtSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-18%']);

  if (artwork.length === 0) return null;
  const pieces = artwork.slice(0, 6);

  return (
    <section ref={ref} id="art" className="relative overflow-hidden py-28 md:py-36">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="04"
            eyebrow="Art"
            title="Sketchbook"
            description="Drawings, paintings, and other things I've made."
            action={{ label: 'Gallery', to: '/art' }}
          />
        </div>
      </div>
      <motion.div style={{ x }} className="flex gap-5 pl-6 md:pl-[8vw]">
        {pieces.map((p) => (
          <Link
            key={p.src}
            to="/art"
            className="group h-[340px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-[420px]"
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="h-full w-auto object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </Link>
        ))}
      </motion.div>
    </section>
  );
}

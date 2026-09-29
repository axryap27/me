import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { EASE_OUT } from '@/components/motion/primitives';
import { EmptyState } from '@/components/ui/EmptyState';
import { artwork } from '@/data/artwork';

export default function Art() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + artwork.length) % artwork.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  const current = open !== null ? artwork[open] : null;

  return (
    <PageShell title="Art">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          eyebrow="Art"
          title="Sketchbook"
          description="Drawings, paintings, and other things I've made."
          animateOnMount
        />

        {artwork.length === 0 ? (
          <EmptyState title="The gallery is being hung." />
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {artwork.map((piece, i) => (
              <motion.button
                key={piece.src}
                onClick={() => setOpen(i)}
                className="group mb-5 block w-full break-inside-avoid text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_OUT }}
              >
                <motion.div layoutId={`art-${piece.src}`} className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={piece.src}
                    alt={piece.title}
                    loading="lazy"
                    className="w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </motion.div>
                <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
                  <span className="font-serif-display text-lg text-gray-200">{piece.title}</span>
                  <span className="font-space-mono text-[11px] text-gray-500">
                    {[piece.medium, piece.year].filter(Boolean).join(' · ')}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.div layoutId={`art-${current.src}`} className="overflow-hidden rounded-2xl">
                <img src={current.src} alt={current.title} className="max-h-[75vh] w-auto object-contain" />
              </motion.div>
              <motion.div
                className="mt-5 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                exit={{ opacity: 0 }}
              >
                <div className="font-serif-display text-2xl text-white">{current.title}</div>
                <div className="mt-1 font-space-mono text-xs text-gray-500">
                  {[current.medium, current.year].filter(Boolean).join(' · ')}
                </div>
                {current.description && <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">{current.description}</p>}
              </motion.div>
            </div>

            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2.5 text-gray-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {artwork.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 p-3 text-gray-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 p-3 text-gray-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

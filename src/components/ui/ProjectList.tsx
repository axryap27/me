import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EASE_OUT } from '@/components/motion/primitives';
import { ProjectMedia, StatusBadge, primaryLink } from '@/components/ui/ProjectCard';
import type { Project } from '@/data/projects';

/** Table-style project index; hovering a row floats a preview that trails the cursor. */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX + 24);
    y.set(e.clientY - 100);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div className="hidden grid-cols-[80px_1.4fr_1fr_120px_24px] gap-6 border-b border-white/10 pb-3 font-space-mono text-[11px] uppercase tracking-[0.15em] text-gray-600 md:grid">
        <span>Year</span>
        <span>Project</span>
        <span>Focus</span>
        <span>Status</span>
        <span />
      </div>
      <ul>
        <AnimatePresence initial={false}>
        {projects.map((p) => {
          const href = primaryLink(p);
          return (
            <motion.li
              key={p.title}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(p)}
              className="border-b border-white/10"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_24px] items-center gap-x-6 gap-y-1 py-6 transition-colors md:grid-cols-[80px_1.4fr_1fr_120px_24px]"
              >
                <span className="order-3 font-space-mono text-xs text-gray-500 md:order-none">{p.period}</span>
                <span className="font-inter-tight text-xl font-medium tracking-tight text-gray-300 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:text-2xl">
                  {p.title}
                </span>
                <span className="order-4 text-sm text-gray-500 md:order-none">{p.category}</span>
                <span className="hidden font-space-mono text-[11px] text-gray-500 md:block">
                  <StatusBadge status={p.status} />
                </span>
                <ArrowUpRight className="row-span-1 h-5 w-5 text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </motion.li>
          );
        })}
        </AnimatePresence>
      </ul>

      {/* Floating preview */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ x, y }}
      >
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.div
              key={active.title}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="group aspect-[16/10] w-[300px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/60"
            >
              <motion.div initial="rest" animate="hover" className="h-full w-full">
                <ProjectMedia project={active} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

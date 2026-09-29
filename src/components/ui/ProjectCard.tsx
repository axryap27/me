import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { EASE_OUT } from '@/components/motion/primitives';
import { statusLabel, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const statusDot: Record<Project['status'], string> = {
  building: 'bg-pacific-light',
  shipped: 'bg-moss-light',
  paused: 'bg-gray-500',
};

export const primaryLink = (p: Project) => p.live ?? p.github;

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('h-1.5 w-1.5 rounded-full', statusDot[status])} />
      {statusLabel[status]}
    </span>
  );
}

/** Tracks the cursor in CSS vars so `.spotlight` can paint a glow that follows it. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return { ref, onPointerMove };
}

export function ProjectMedia({ project, className }: { project: Project; className?: string }) {
  const { images, phone, title } = project;

  if (images.length === 0) {
    return (
      <div className={cn('project-placeholder flex h-full w-full items-center justify-center', className)}>
        <span className="px-6 text-center font-space-mono text-[11px] uppercase leading-relaxed tracking-[0.25em] text-white/40 transition-colors duration-500 group-hover:text-white/70">
          {title}
        </span>
      </div>
    );
  }

  if (phone) {
    const shown = images.slice(0, 3);
    const mid = (shown.length - 1) / 2;
    return (
      <div className={cn('flex h-full w-full items-end justify-center bg-gradient-to-b from-[#0b1426] to-black pt-6', className)}>
        {shown.map((src, i) => {
          const offset = i - mid;
          return (
            <motion.img
              key={src}
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              className="-mb-10 w-[30%] rounded-xl border border-white/10 shadow-2xl"
              style={{ zIndex: 10 - Math.abs(offset) }}
              variants={{
                rest: { x: `${offset * -30}%`, rotate: offset * 6, y: Math.abs(offset) * 14 },
                hover: { x: `${offset * 8}%`, rotate: offset * 3, y: Math.abs(offset) * 4 - 10 },
              }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <motion.img
      src={images[0]}
      alt={title}
      loading="lazy"
      className={cn('h-full w-full object-cover', className)}
      style={{ objectPosition: project.imagePosition }}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    />
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  const href = primaryLink(project);

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        'spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/20',
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5">
        <ProjectMedia project={project} />
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between font-space-mono text-[11px] text-gray-500">
          <StatusBadge status={project.status} />
          <span>{project.period}</span>
        </div>

        <h3 className="font-inter-tight text-lg font-semibold tracking-tight text-white">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 focus:outline-none">
              {project.title}
            </a>
          ) : (
            project.title
          )}
          <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-x-1 translate-y-0.5 text-gray-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100" />
        </h3>
        <div className="mt-0.5 text-xs text-gray-500">{project.category}</div>
        <p className="mt-2 text-sm leading-snug text-gray-400">{project.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {project.github && project.live && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="relative z-10 flex-shrink-0 rounded-full border border-white/10 p-1.5 text-gray-400 transition-colors hover:border-white/40 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

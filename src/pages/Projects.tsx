import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, List } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { EASE_OUT, Reveal } from '@/components/motion/primitives';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectList } from '@/components/ui/ProjectList';
import { projects, type ProjectArea } from '@/data/projects';
import { cn } from '@/lib/utils';

type Filter = 'All' | ProjectArea;
type View = 'grid' | 'list';

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [view, setView] = useState<View>('grid');

  const filters = useMemo<Filter[]>(() => ['All', ...Array.from(new Set(projects.map((p) => p.area)))], []);
  const shown = filter === 'All' ? projects : projects.filter((p) => p.area === filter);

  return (
    <PageShell title="Projects">
      <div className="mx-auto max-w-[68rem]">
        <SectionHeader
          index="02"
          eyebrow="Projects"
          title="Things I've built"
          description="Hardware, embedded ML, and software — some shipped, some still on the bench."
          animateOnMount
        />

        <Reveal delay={0.2} blur={false} className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300',
                  filter === f ? 'text-black' : 'text-gray-400 hover:text-white',
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
            {([
              ['grid', LayoutGrid],
              ['list', List],
            ] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={`${v} view`}
                aria-pressed={view === v}
                className={cn(
                  'relative rounded-full p-2 transition-colors duration-300',
                  view === v ? 'text-black' : 'text-gray-400 hover:text-white',
                )}
              >
                {view === v && (
                  <motion.span
                    layoutId="project-view"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: i * 0.05, ease: EASE_OUT } }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="flex"
                  >
                    <ProjectCard project={p} className="w-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectList projects={shown} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

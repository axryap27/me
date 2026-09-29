import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SplitText } from '@/components/motion/primitives';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
  animateOnMount?: boolean;
}

export function SectionHeader({ index, eyebrow, title, description, action, animateOnMount }: SectionHeaderProps) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Reveal blur={false} y={12}>
          <div className="mb-5 flex items-center gap-3 font-space-mono text-xs uppercase tracking-[0.2em] text-gray-500">
            <span className="text-gray-300">{index}</span>
            <span className="h-px w-8 bg-gray-700" />
            <span>{eyebrow}</span>
          </div>
        </Reveal>
        <h2 className="font-inter-tight text-4xl font-semibold tracking-tight text-white md:text-5xl">
          <SplitText text={title} animateOnMount={animateOnMount} />
        </h2>
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-gray-400 md:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.2} blur={false}>
          <Link
            to={action.to}
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-gray-400 transition-colors hover:text-white"
          >
            <span className="link-underline">{action.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

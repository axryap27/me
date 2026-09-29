import { Reveal } from '@/components/motion/primitives';

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-dashed border-white/10 px-8 py-16 text-center">
        <div className="font-inter-tight text-2xl font-medium tracking-tight text-gray-300">{title}</div>
        {children && <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">{children}</p>}
      </div>
    </Reveal>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { SplitText } from '@/components/motion/primitives';

const NotFound = () => (
  <PageShell title="Not found">
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center text-center">
      <div className="mb-4 font-space-mono text-xs uppercase tracking-[0.2em] text-gray-500">404</div>
      <h1 className="font-inter-tight text-5xl font-semibold tracking-tight text-white">
        <SplitText text="Nothing here." animateOnMount />
      </h1>
      <Link to="/" className="group mt-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back home
      </Link>
    </div>
  </PageShell>
);

export default NotFound;

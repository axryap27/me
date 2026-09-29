import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/motion/primitives';

/** Layout for the standalone pages (projects, books, art). */
export function PageShell({ children, title }: { children: ReactNode; title?: string }) {
  useEffect(() => {
    document.title = title ? `${title} — Aarya Patel` : 'Aarya Patel';
  }, [title]);

  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    return () => cancelAnimationFrame(id);
  }, [hash]);

  return (
    <div className="relative min-h-screen bg-[#070908] text-white">
      <div className="page-glow pointer-events-none fixed inset-x-0 top-0 z-0 h-[480px]" />
      <Navigation />
      <PageTransition className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">{children}</div>
      </PageTransition>
      <Footer />
    </div>
  );
}

import { ArrowUp } from 'lucide-react';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-gray-500 md:flex-row md:items-center">
        <div className="font-space-mono text-xs">
          © {new Date().getFullYear()} {site.name}
        </div>
        <div className="flex items-center gap-6">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="link-underline hover:text-white">
            Email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-white/40 hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

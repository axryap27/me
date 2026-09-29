import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/primitives';
import { books } from '@/data/books';

/** Home-page teaser for current reads. Renders nothing until a book is marked "reading". */
export function BooksSection() {
  const reading = books.filter((b) => b.status === 'reading');
  if (reading.length === 0) return null;

  return (
    <section id="books" className="relative py-28 md:py-36">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader index="03" eyebrow="Books" title="What I'm reading" action={{ label: 'Bookshelf', to: '/books' }} />
          <Reveal>
            <Link
              to="/books"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss-light" />
              <span className="font-space-mono text-[11px] uppercase tracking-[0.15em] text-gray-500">Reading</span>
              <span className="truncate text-gray-200">
                {reading.map((b) => (
                  <span key={b.title} className="mr-4">
                    <span className="font-medium">{b.title}</span>
                    <span className="text-gray-500"> — {b.author}</span>
                  </span>
                ))}
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

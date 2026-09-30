import { Stagger, StaggerItem } from '@/components/motion/primitives';
import type { Book } from '@/data/books';

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3" aria-label={`${value} out of 10`}>
      <div className="hidden gap-[3px] sm:flex" aria-hidden>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`h-1 w-2.5 rounded-full ${i < value ? 'bg-moss-light' : 'bg-white/10'}`} />
        ))}
      </div>
      <span className="w-10 text-right font-space-mono text-xs text-gray-300">{value}/10</span>
    </div>
  );
}

export function BookList({ books }: { books: Book[] }) {
  return (
    <Stagger as="ol" className="border-t border-white/10" stagger={0.03}>
      {books.map((book, i) => (
        <StaggerItem
          as="li"
          key={book.title}
          className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-x-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[48px_1fr_1fr_auto]"
        >
          <span className="font-space-mono text-xs text-gray-600">{String(i + 1).padStart(2, '0')}</span>
          <div className="min-w-0">
            <div className="font-inter-tight text-lg font-medium tracking-tight text-gray-200 transition-colors group-hover:text-white">
              {book.title}
            </div>
            <div className="text-sm text-gray-500 sm:hidden">{book.author}</div>
            {book.note && <p className="mt-1 max-w-xl text-sm text-gray-500">{book.note}</p>}
          </div>
          <span className="hidden text-sm text-gray-400 sm:block">{book.author}</span>
          {book.rating !== undefined ? <Rating value={book.rating} /> : <span />}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

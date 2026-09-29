import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { EASE_OUT } from '@/components/motion/primitives';
import type { Book } from '@/data/books';

const SPINES = [
  { bg: '#1c2a4a', fg: '#dbe4ff' },
  { bg: '#5a1f24', fg: '#f6dcd2' },
  { bg: '#1f3b30', fg: '#d9f0e3' },
  { bg: '#b08a3e', fg: '#1b1408' },
  { bg: '#2c2c34', fg: '#e8e8ee' },
  { bg: '#3d2346', fg: '#efdcf5' },
  { bg: '#d9d2c3', fg: '#1d1b16' },
  { bg: '#23434f', fg: '#d6eef5' },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function spineStyle(book: Book) {
  const h = hash(book.title + book.author);
  return {
    color: SPINES[h % SPINES.length],
    width: 38 + (h % 5) * 5,
    height: 210 + ((h >> 3) % 5) * 10,
  };
}

export function Bookshelf({ books }: { books: Book[] }) {
  const [selected, setSelected] = useState<Book | null>(null);

  return (
    <div>
      <div className="relative">
        <div className="flex items-end gap-1.5 overflow-x-auto px-2 pb-0 pt-10 [scrollbar-width:none]">
          {books.map((book, i) => {
            const { color, width, height } = spineStyle(book);
            const isSelected = selected === book;
            return (
              <motion.div
                key={book.title}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: EASE_OUT }}
              >
              <motion.button
                onClick={() => setSelected(isSelected ? null : book)}
                aria-label={`${book.title} by ${book.author}`}
                aria-pressed={isSelected}
                className="relative flex-shrink-0 origin-bottom rounded-[3px] shadow-[inset_-3px_0_6px_rgba(0,0,0,0.35),inset_2px_0_2px_rgba(255,255,255,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ width, height, backgroundColor: color.bg, color: color.fg }}
                animate={{ y: isSelected ? -22 : 0 }}
                whileHover={{ y: isSelected ? -22 : -12, rotate: -1.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {book.status === 'reading' && (
                  <span className="absolute -top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-moss-light shadow-[0_0_10px_rgba(164,178,122,0.8)]" />
                )}
                <span className="absolute inset-x-0 top-3 mx-auto h-px w-2/3 bg-current opacity-30" />
                <span
                  className="absolute inset-0 flex items-center justify-center overflow-hidden px-1 py-6 font-inter-tight text-[13px] font-semibold tracking-wide"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  <span className="truncate">{book.title}</span>
                </span>
                <span className="absolute inset-x-0 bottom-3 mx-auto h-px w-2/3 bg-current opacity-30" />
              </motion.button>
              </motion.div>
            );
          })}
        </div>
        {/* Shelf */}
        <div className="h-3 rounded-sm bg-gradient-to-b from-[#2a2a30] to-[#141417] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.9)]" />
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="relative mt-8 flex gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            {selected.cover && (
              <img src={selected.cover} alt="" className="h-36 w-24 flex-shrink-0 rounded-md object-cover shadow-xl" />
            )}
            <div className="min-w-0 pr-8">
              <div className="mb-2 font-space-mono text-[11px] uppercase tracking-[0.15em] text-gray-500">
                {selected.status === 'reading' ? 'Currently reading' : `Read${selected.year ? ` · ${selected.year}` : ''}`}
              </div>
              <h3 className="font-inter-tight text-2xl font-semibold tracking-tight text-white">{selected.title}</h3>
              <div className="mt-1 text-sm text-gray-400">{selected.author}</div>
              {selected.note && <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">{selected.note}</p>}
            </div>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <p className="mt-6 font-space-mono text-xs text-gray-600">Pick a spine to see notes.</p>
      )}
    </div>
  );
}

import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Bookshelf } from '@/components/ui/Bookshelf';
import { EmptyState } from '@/components/ui/EmptyState';
import { books } from '@/data/books';

export default function Books() {
  const reading = books.filter((b) => b.status === 'reading');

  return (
    <PageShell title="Books">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="03"
          eyebrow="Books"
          title="What I'm reading"
          description={
            reading.length > 0 ? `Currently: ${reading.map((b) => `${b.title} by ${b.author}`).join(', ')}.` : undefined
          }
          animateOnMount
        />
        {books.length > 0 ? <Bookshelf books={books} /> : <EmptyState title="The shelf is being stocked." />}
      </div>
    </PageShell>
  );
}

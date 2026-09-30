export type BookStatus = 'reading' | 'read';

export interface Book {
  title: string;
  author: string;
  status: BookStatus;
  /** Year finished (or started, if still reading). */
  year?: number;
  /** Your rating out of 10. */
  rating?: number;
  /** One or two lines on why it stuck with you. */
  note?: string;
  /** Optional cover image, e.g. https://covers.openlibrary.org/b/isbn/<ISBN>-M.jpg */
  cover?: string;
}

// Add books here. Spines on the shelf are colored automatically from the title.
export const books: Book[] = [
  { title: 'East of Eden', author: 'John Steinbeck', status: 'read', rating: 9 },
  { title: 'Oedipus Rex', author: 'Sophocles', status: 'read', rating: 8 },
  { title: 'Of Mice and Men', author: 'John Steinbeck', status: 'read', rating: 7 },
  { title: 'Steve Jobs', author: 'Walter Isaacson', status: 'read', rating: 7 },
  { title: 'The Metamorphosis', author: 'Franz Kafka', status: 'read', rating: 8 },
  { title: 'White Nights', author: 'Fyodor Dostoevsky', status: 'read', rating: 10 },
  { title: 'Notes from Underground', author: 'Fyodor Dostoevsky', status: 'read', rating: 9 },
  { title: 'Song of Solomon', author: 'Toni Morrison', status: 'read', rating: 7 },
  { title: 'The Bluest Eye', author: 'Toni Morrison', status: 'read', rating: 9 },
  { title: 'The Things They Carried', author: 'Tim O\'Brien', status: 'read', rating: 9 },
  { title: 'The Swimmers', author: 'Julie Otsuka', status: 'read', rating: 6 },
  { title: 'The Sound and the Fury', author: 'William Faulkner', status: 'read', rating: 9 },
  { title: 'Doubt', author: 'John Patrick Shanley', status: 'read', rating: 9 },
  { title: 'Wuthering Heights', author: 'Emily Brontë', status: 'read', rating: 9 },
  { title: 'The Namesake', author: 'Jhumpa Lahiri', status: 'read', rating: 8 },
  { title: 'Demon Copperhead', author: 'Barbara Kingsolver', status: 'read', rating: 5 },
  { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', status: 'read', rating: 10 },
  { title: 'The Iliad', author: 'Homer', status: 'read', rating: 7 },
  { title: 'The Odyssey', author: 'Homer', status: 'read', rating: 8 },
  { title: 'Homo Deus', author: 'Yuval Noah Harari', status: 'read', rating: 6 },
  { title: 'Sapiens', author: 'Yuval Noah Harari', status: 'read', rating: 8 },
];

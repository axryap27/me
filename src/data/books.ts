export type BookStatus = 'reading' | 'read';

export interface Book {
  title: string;
  author: string;
  status: BookStatus;
  /** Year finished (or started, if still reading). */
  year?: number;
  /** One or two lines on why it stuck with you. */
  note?: string;
  /** Optional cover image, e.g. https://covers.openlibrary.org/b/isbn/<ISBN>-M.jpg */
  cover?: string;
}

// Add books here. Spines on the shelf are colored automatically from the title.
export const books: Book[] = [];

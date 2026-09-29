export interface Artwork {
  title: string;
  /** Put image files in public/images/art/ and reference them as /images/art/<file>. */
  src: string;
  year?: number;
  medium?: string;
  description?: string;
}

export const artwork: Artwork[] = [];

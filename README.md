# Portfolio Website - [URL LINK]

A modern, interactive portfolio website built with React, TypeScript, and Three.js featuring 3D animations and tilt card effects.

## Editing content

All site content lives in plain data files — no component changes needed:

| What | Where |
| --- | --- |
| Name, links, hero status line | `src/data/site.ts` |
| Experience | `src/data/experience.ts` |
| Projects (`featured: true` shows on the home page) | `src/data/projects.ts` |
| Books | `src/data/books.ts` |
| Artwork (images go in `public/images/art/`) | `src/data/artwork.ts` |

The home page's Books and Art sections only appear once they have content.

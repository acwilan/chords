# chords

This repository hosts the source code for the chords site.

## Repository and deployment

- GitHub repository: `acwilan/chords`
- Published site: https://acwilan.github.io/chords

## Adding new songs

1. Add an `.mdx` file in `src/content/songs/` with the song's frontmatter.
2. Place the PDF chart in `public/charts/` with the same name referenced in the frontmatter.
3. Update the song frontmatter to reference the PDF file.

## Running locally

```bash
npm install
npm run dev
```

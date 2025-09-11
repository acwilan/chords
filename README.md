# chords

This repository hosts the source code for the chords site.

## Repository and deployment

- GitHub repository: `acwilan/chords`
- Published site: https://acwilan.github.io/chords

## External Content

Song metadata and charts can be fetched from an external bundle. Copy `.env.example` to `.env` and adjust variables if necessary.

Forks should set repository Variables so the workflow can fetch their own release:

- `CONTENT_OWNER`
- `CONTENT_REPO`
- `CONTENT_VERSION`
- `CONTENT_FILENAME`
- `CONTENT_SHA256` (optional)

Run `npm run content:fetch` to download the bundle and populate `src/content/songs` and `public/charts`.
Use `npm run content:clean` to remove fetched files.


## Adding new songs

1. Add an `.md` file in `src/content/songs/` with the song's frontmatter.
2. Provide `slug`, `lang` (`es` or `en`), `title` and optional fields like `key`, `bpm`, `artist`, `author`, `tags` and `pdf`.
   The `pdf` value may be just the filename (`Mi-Cancion.pdf`), an absolute path (`/charts/Mi-Cancion.pdf`),
   or a path including the normalized artist name (`/charts/sixpence-none-the-richer/Kiss-Me.pdf`).
   The `artist` field is used to build the artist filter on the songs page.
3. Place the PDF chart in `public/charts/` matching the path or filename used in the `pdf` field.

## Localization

- Translations live in `src/i18n/*.json`. Add new keys in each locale file.
- Use the `t(key)` utility from `src/utils/i18n.ts` for UI strings.
- To localize songs, create one file per language using the same base filename (e.g., `mi-cancion.es.md`, `mi-cancion.en.md`) and set the `lang` field accordingly.

## Frontmatter fields

- `artist` and `author` are optional metadata fields.
- `capo` is no longer supported.

## Artist filter

The songs index includes a collapsible sidebar listing all artists. Selecting an artist filters
the visible songs without reloading the page. The choice is saved in `localStorage` under
`artistFilter` and reflected in the URL as `?artist=Name` for easy sharing. An active selection is
highlighted in the sidebar and shown above the results as a removable chip. Use the **All** option or
click the chip to clear the filter, which removes the query parameter and stored value.

## Running locally

```bash
npm install
npm run dev
```

## Releasing

- Commit using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, etc.).
- Run `npm run release` and then `git push --follow-tags origin main`.
- The generated `CHANGELOG.md` is published at `/changelog`.

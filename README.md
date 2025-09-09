# chords

This repository hosts the source code for the chords site.

## Repository and deployment

- GitHub repository: `acwilan/chords`
- Published site: https://acwilan.github.io/chords

## Adding new songs

1. Add an `.md` file in `src/content/songs/` with the song's frontmatter.
2. Provide `slug`, `lang` (`es` or `en`), `title` and optional fields like `key`, `bpm`, `tags` and `pdf`.
3. Place the PDF chart in `public/charts/` with the same name referenced in the frontmatter.

## Localization

- Translations live in `src/i18n/*.json`. Add new keys in each locale file.
- Use the `t(key)` utility from `src/utils/i18n.ts` for UI strings.
- To localize songs, create one file per language with matching `slug` and `lang` values.

## Running locally

```bash
npm install
npm run dev
```

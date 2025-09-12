import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://acwilan.github.io",
  base: '/chordbook',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !/(\/((chords)|(acordes)|(cifrados))\/?)$/.test(page),
    }),
  ],
});

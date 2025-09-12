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
      filter: (page) => {
        const { pathname } = new URL(page);
        const path = pathname.replace(/^\/chordbook/, '');
        return (
          /^\/(en\/)?($|songs\/(?:[^/]+\/?)?|changelog\/?$)/.test(path) &&
          !/(\/(chords|acordes|cifrados)(\/?)$)/.test(path)
        );
      },
    }),
  ],
});

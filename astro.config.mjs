import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://acwilan.github.io',
  base: '/chords',
  integrations: [tailwind()],
});

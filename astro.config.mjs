import { defineConfig } from 'astro/config';
import content from '@astrojs/content';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [content()]
});

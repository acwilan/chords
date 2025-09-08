import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        accent: '#f59e0b',
      },
    },
  },
  plugins: [typography()],
};

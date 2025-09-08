import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        accent: '#f59e0b',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.accent'),
              },
            },
            h1: { color: theme('colors.gray.900'), fontWeight: '700' },
            h2: { color: theme('colors.gray.900'), fontWeight: '700' },
            h3: { color: theme('colors.gray.900'), fontWeight: '700' },
            h4: { color: theme('colors.gray.900'), fontWeight: '700' },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: theme('borderRadius.sm'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            pre: {
              color: theme('colors.gray.800'),
              backgroundColor: theme('colors.gray.100'),
              padding: theme('spacing.4'),
              borderRadius: theme('borderRadius.md'),
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5em',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5em',
            },
            li: {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            li: {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography()],
};

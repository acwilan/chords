import type { Locale } from './i18n';

export interface SongUrlOptions {
  site: string;
  base: string;
  locale: Locale;
  slug: string;
}

function joinBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`;
}

export function buildSongUrls({ site, base, locale, slug }: SongUrlOptions) {
  const basePath = joinBase(base);
  const localePath = locale === 'en' ? 'en/' : '';
  const path = `${basePath}${localePath}songs/${slug}/`;
  const canonical = `${site.replace(/\/$/, '')}${path}`;
  return {
    canonical,
    chords: `${canonical}chords/`,
    acordes: `${canonical}acordes/`,
    cifrados: `${canonical}cifrados/`,
    hrefLang: {
      en: `${site.replace(/\/$/, '')}${basePath}en/songs/${slug}/`,
      es: `${site.replace(/\/$/, '')}${basePath}songs/${slug}/`,
    },
  } as const;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

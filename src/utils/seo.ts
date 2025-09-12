import type { Locale } from './i18n';
interface SeoOptions {
  title: string;
  url: string;
  locale: Locale;
  artist?: string;
  key?: string;
  description?: string;
  type?: 'article' | 'website';
  seoKeywords?: string[];
  alternate?: Record<string, string>;
}

export function buildSeo(opts: SeoOptions) {
  const title = opts.artist
    ? `${opts.title} — ${opts.artist} | ChordBook`
    : `${opts.title} | ChordBook`;
  const description =
    opts.description ??
    `${opts.title}${opts.artist ? ` by ${opts.artist}` : ''}$${
      opts.key ? ` in ${opts.key}` : ''
    }. PDF chord chart available.`.replace('$', '');
  const keywords = Array.from(
    new Set(
      [
        'chords',
        'acordes',
        'cifrados',
        opts.artist,
        opts.key,
        ...(opts.seoKeywords ?? []),
      ].filter(Boolean) as string[],
    ),
  );
  return {
    title,
    description,
    keywords,
    url: opts.url,
    alternate: opts.alternate ?? {},
    type: opts.type ?? 'website',
    locale: opts.locale,
  };
}

export function songJsonLd(params: {
  title: string;
  artist?: string;
  author?: string;
  locale: Locale;
  keywords: string[];
  url: string;
  pdf?: string;
  site: string;
  base: string;
  slug: string;
}) {
  const { title, artist, author, locale, keywords, url, pdf, site, base, slug } = params;
  const basePath = base.endsWith('/') ? base : `${base}/`;
  const home = `${site}${basePath}${locale === 'en' ? 'en/' : ''}`;
  const songs = `${home}songs/`;
  const data: any = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: title,
    inLanguage: locale,
    keywords,
    isAccessibleForFree: true,
    url,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: home,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Songs',
          item: songs,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
  };
  if (artist) data.byArtist = artist;
  if (author) {
    data.composer = author;
    data.lyricist = author;
  }
  if (pdf) {
    data.encoding = {
      '@type': 'MediaObject',
      fileFormat: 'application/pdf',
      contentUrl: pdf,
      name: `${title} — Chord chart (PDF)`,
    };
  }
  return data;
}

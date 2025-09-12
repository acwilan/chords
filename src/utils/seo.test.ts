import { describe, expect, it } from 'vitest';
import { buildSeo } from './seo';
import { buildSongUrls } from './urls';

describe('seo utils', () => {
  it('builds title and description', () => {
    const seo = buildSeo({
      url: 'https://example.com/app/songs/mi-cancion/',
      locale: 'es',
      title: 'Mi Canción',
      artist: 'Artista',
      key: 'C',
    });
    expect(seo.title).toBe('Mi Canción — Artista | ChordBook');
    expect(seo.description).toContain('Mi Canción');
    expect(seo.description).toContain('Artista');
    expect(seo.description).toContain('PDF');
  });

  it('builds canonical and hreflang', () => {
    const urls = buildSongUrls({
      site: 'https://example.com',
      base: '/app',
      locale: 'es',
      slug: 'test',
    });
    expect(urls.canonical).toBe('https://example.com/app/songs/test/');
    expect(urls.hrefLang.en).toBe('https://example.com/app/en/songs/test/');
  });
});

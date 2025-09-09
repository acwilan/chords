import en from '../i18n/en.json';
import es from '../i18n/es.json';

export type Locale = 'en' | 'es';

const translations: Record<Locale, any> = { en, es } as const;

export function getLocaleFromUrl(pathname: string, base = ''): Locale {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path === 'en' || path.startsWith('en/') ? 'en' : 'es';
}

export function t(
  key: string,
  params: Record<string, string | number> = {},
  locale: Locale = 'es',
): string {
  const dict = translations[locale] || translations.es;
  const fallback = translations.es;
  const value = key.split('.').reduce((obj: any, k) => (obj ? obj[k] : undefined), dict);
  let str = value ?? key.split('.').reduce((obj: any, k) => (obj ? obj[k] : undefined), fallback);
  if (!str) return key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
  }
  return str;
}

export function createT(locale: Locale) {
  return (key: string, params?: Record<string, string | number>) => t(key, params || {}, locale);
}

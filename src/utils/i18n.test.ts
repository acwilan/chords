import { describe, it, expect } from 'vitest';
import { t } from './i18n';

describe('t', () => {
  it('returns translation for existing key', () => {
    expect(t('nav.home', {}, 'en')).toBe('Home');
    expect(t('nav.home', {}, 'es')).toBe('Inicio');
  });

  it('falls back to key when missing', () => {
    expect(t('non.existent.key', {}, 'en')).toBe('non.existent.key');
  });
});

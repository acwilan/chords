import { describe, expect, it } from 'vitest';
import { pdfPath } from './pdfPath';

describe('pdfPath', () => {
  it('prefixes bare filenames with /charts/', () => {
    expect(pdfPath('Mi-Cancion.pdf')).toBe('/charts/Mi-Cancion.pdf');
  });

  it('passes through absolute paths', () => {
    expect(pdfPath('/charts/Mi-Cancion.pdf')).toBe('/charts/Mi-Cancion.pdf');
  });

  it('passes through artist-scoped paths', () => {
    expect(pdfPath('/charts/sixpence-none-the-richer/Kiss-Me.pdf')).toBe(
      '/charts/sixpence-none-the-richer/Kiss-Me.pdf',
    );
  });

  it('passes through external URLs', () => {
    expect(pdfPath('https://example.com/test.pdf')).toBe(
      'https://example.com/test.pdf',
    );
  });
});

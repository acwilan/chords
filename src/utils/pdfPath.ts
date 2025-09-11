export function pdfPath(pdf: string): string {
  if (pdf.startsWith('http')) {
    return pdf;
  }
  if (pdf.startsWith('/')) {
    return pdf;
  }
  return `/charts/${pdf}`;
}

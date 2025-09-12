const fs = require('fs');
const path = require('path');

(async () => {
  const { default: config } = await import('../astro.config.mjs');
  const base = (config.base || '/').replace(/^\//, '').replace(/\/$/, '');
  const preferred = path.join(process.cwd(), 'dist', base);
  const outDir = fs.existsSync(preferred)
    ? preferred
    : path.join(process.cwd(), 'dist');
  const source = path.join(outDir, 'sitemap-0.xml');
  const target = path.join(outDir, 'sitemap.xml');

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

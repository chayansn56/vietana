import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://vietana.com';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

// Write to the dist folder (post-build) or public (pre-build)
const targetPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(targetPath, xml);
console.log('✅ Sitemap generated at', targetPath);

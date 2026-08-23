import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import active datasets
import { EXPERIENCES_DATA } from '../src/data/experiencesData.ts';

const publicDir = path.resolve(__dirname, '../public');

console.log('--- Verifying Local Experience Images ---');
let failed = false;

for (const exp of EXPERIENCES_DATA) {
  const imgUrl = exp.images?.hero || '';
  
  if (!imgUrl) {
    console.error(`[FAIL] Experience ${exp.id}: Missing image field!`);
    failed = true;
    continue;
  }
  
  if (!imgUrl.startsWith('/')) {
    console.warn(`[WARN] Experience ${exp.id}: Image path is not a local absolute path: ${imgUrl}`);
    continue;
  }
  
  const localPath = path.join(publicDir, imgUrl);
  if (!fs.existsSync(localPath)) {
    console.error(`[FAIL] Experience ${exp.id}: Image file does not exist at ${localPath}`);
    failed = true;
    continue;
  }
  
  const stats = fs.statSync(localPath);
  if (stats.size === 0) {
    console.error(`[FAIL] Experience ${exp.id}: Image file is empty (0 bytes)!`);
    failed = true;
    continue;
  }
  
  if (stats.size > 500 * 1024) {
    console.warn(`[WARN] Experience ${exp.id}: Image size is quite large (${(stats.size / 1024).toFixed(1)} KB)`);
  }
  
  console.log(`[OK] Experience ${exp.id}: Verified image (${(stats.size / 1024).toFixed(1)} KB)`);
}

if (failed) {
  console.error('\nVerification failed! Fix the errors above.');
  process.exit(1);
} else {
  console.log('\nAll experience images successfully verified!');
  process.exit(0);
}

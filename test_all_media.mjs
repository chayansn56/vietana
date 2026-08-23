import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // List of media files in the brain directory
  const files = [
    'media__1783499269097.jpg',
    'media__1783499269097.png',
    'media__1783499269103.jpg',
    'media__1783499269145.jpg',
    'media__1783499577588.jpg'
  ];

  for (const f of files) {
    const srcPath = `/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/${f}`;
    const destPath = `/Users/chayansoni/.gemini/antigravity/scratch/vietana/public/${f}`;
    fs.copyFileSync(srcPath, destPath);

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await page.evaluate((imgName) => {
      const el = document.getElementById('hero');
      if (el) {
        const bg = el.querySelector('div');
        if (bg) bg.style.backgroundImage = `url('/${imgName}')`;
      }
    }, f);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.screenshot({ path: `/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/test_${f}.png` });
  }

  await browser.close();
  console.log('All media test screenshots saved!');
})();

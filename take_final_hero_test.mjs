import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Capture 1: Initial load scene (with people)
  console.log('Capturing Scene 1 (With People)...');
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_hero_couple.png' });
  
  // Wait 10.5 seconds to transition to Scene 2 (Background Only)
  await new Promise(resolve => setTimeout(resolve, 10800));
  console.log('Capturing Scene 2 (Background Only)...');
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_hero_bg_only.png' });

  await browser.close();
  console.log('Hero transition snapshots saved successfully!');
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Capture 1: Initial load scene (HCMC)
  console.log('Capturing Scene 1...');
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_hero_scene_1.png' });
  
  // Wait 5 seconds to transition to Scene 2 (Hoi An)
  await new Promise(resolve => setTimeout(resolve, 5500));
  console.log('Capturing Scene 2...');
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_hero_scene_2.png' });

  // Wait 5 seconds to transition to Scene 3 (Da Nang)
  await new Promise(resolve => setTimeout(resolve, 5500));
  console.log('Capturing Scene 3...');
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_hero_scene_3.png' });

  await browser.close();
  console.log('Hero transition snapshots saved successfully!');
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3000/things-to-do', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Take screenshot of the Hero & search section
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_things_hero.png' });
  
  // Scroll down to see the cards grid
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_things_grid.png' });
  
  await browser.close();
  console.log('Things to Do directory screenshots saved!');
})();

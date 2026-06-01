import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4174', { waitUntil: 'networkidle2' });
  
  // Wait a bit for the hero image and animations to render
  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.screenshot({ path: 'hero_light_screenshot.png' });
  await browser.close();
  console.log('Screenshot saved as hero_light_screenshot.png');
})();

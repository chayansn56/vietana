const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // iPhone 13 Pro viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Full page screenshot to see where it breaks
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/mobile_full_1.png', fullPage: true });

  await browser.close();
})();

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1600 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // 1. Screenshot Hero section
  const heroElement = await page.$('#hero');
  if (heroElement) {
    await heroElement.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/hero_darker.png' });
  }

  // 2. Scroll down to about and screenshot
  await page.evaluate(() => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const aboutElement = await page.$('#about');
  if (aboutElement) {
    await aboutElement.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/about_opaque.png' });
  }

  await browser.close();
})();

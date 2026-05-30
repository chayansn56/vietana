const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1600 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll down to the about section so the reveal animations trigger
  await page.evaluate(() => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  });

  // wait for animations to finish
  await new Promise(r => setTimeout(r, 2000));

  const aboutElement = await page.$('#about');
  if (aboutElement) {
    await aboutElement.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/about_ui_fixed.png' });
  }

  await browser.close();
})();

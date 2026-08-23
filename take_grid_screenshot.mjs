import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Wait for the components and styles to finish loading
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Scroll to Experiences section
  await page.evaluate(() => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView();
  });
  
  // Wait another second for any animations
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_experiences_5col.png' });
  await browser.close();
  console.log('Screenshot saved!');
})();

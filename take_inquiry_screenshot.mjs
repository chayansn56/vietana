import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Scroll to Inquiry section
  await page.evaluate(() => {
    const el = document.getElementById('inquiry');
    if (el) el.scrollIntoView();
  });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_inquiry_horizontal.png' });
  await browser.close();
  console.log('Horizontal inquiry form screenshot saved!');
})();

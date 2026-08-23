import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Scroll to bottom of the page to focus on the Footer
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_footer_redesign.png' });
  await browser.close();
  console.log('Footer screenshot saved successfully!');
})();

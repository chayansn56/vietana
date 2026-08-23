import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Scroll to Experiences section
  await page.evaluate(() => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView();
  });
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Scroll down more to see WhyVietana and the new Journal CTA
  await page.evaluate(() => {
    window.scrollBy(0, 1050);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_why_vietana.png' });
  await browser.close();
  console.log('Middle section screenshot saved!');
})();

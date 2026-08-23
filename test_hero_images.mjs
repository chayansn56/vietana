import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  // Test hero_6.png
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.getElementById('hero');
    if (el) {
      // Temporarily inject hero_6.png to test
      const bg = el.querySelector('div');
      if (bg) bg.style.backgroundImage = "url('/hero_6.png')";
    }
  });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/test_hero_6.png' });

  // Test hero_1.png
  await page.evaluate(() => {
    const el = document.getElementById('hero');
    if (el) {
      const bg = el.querySelector('div');
      if (bg) bg.style.backgroundImage = "url('/hero_1.png')";
    }
  });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/test_hero_1.png' });

  await browser.close();
  console.log('Test screenshots saved successfully!');
})();

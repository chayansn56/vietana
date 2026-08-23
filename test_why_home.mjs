import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  console.log('Starting URL:', page.url());

  // Scroll down a bit
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  
  const scrollYBefore = await page.evaluate(() => window.scrollY);
  console.log('Scroll Y Before Click:', scrollYBefore);

  console.log('Clicking "Why Choose Us"...');
  await page.evaluate(() => {
    const links = document.querySelectorAll('a[href="#testimonials"]');
    if (links.length > 0) {
      links[0].click();
    }
  });

  await page.waitForTimeout(1000);
  console.log('Final URL after 1s:', page.url());
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log('Scroll Y After Click:', scrollYAfter);
  
  await browser.close();
})();

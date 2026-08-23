import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Track navigation
  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      console.log('Navigated to:', frame.url());
    }
  });

  await page.goto('http://localhost:3000/services');
  await page.waitForLoadState('networkidle');
  console.log('Starting URL:', page.url());

  console.log('Clicking "Why Choose Us" in the DOM directly to avoid hover flakiness...');
  // Find the exact link with href="#testimonials"
  await page.evaluate(() => {
    const links = document.querySelectorAll('a[href="#testimonials"]');
    if (links.length > 0) {
      links[0].click();
    } else {
      console.log("Could not find href=#testimonials");
    }
  });

  await page.waitForTimeout(2000);
  console.log('Final URL after 2s:', page.url());
  
  await browser.close();
})();

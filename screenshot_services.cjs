const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to http://localhost:3000/');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });
    
    // Scroll to services
    await page.evaluate(() => {
        document.getElementById('services').scrollIntoView();
    });
    
    // Wait for animations
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Taking screenshot of services...');
    await page.screenshot({ path: 'services_screenshot.png' });
    
  } catch (error) {
    console.error('Error during screenshot:', error);
  } finally {
    await browser.close();
    console.log('Done.');
  }
})();

const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1080 });
    
    console.log("Navigating to localhost:3000...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for #destinations...");
    await page.waitForSelector('#destinations', { timeout: 10000 });
    
    // Give images a few seconds to load
    await new Promise(r => setTimeout(r, 5000));
    
    // Scroll to destinations
    await page.evaluate(() => {
      document.querySelector('#destinations').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    const element = await page.$('#destinations');
    await element.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/destinations_grid_screenshot.png' });
    
    console.log("Grid screenshot saved successfully!");
    
    await browser.close();
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  }
})();

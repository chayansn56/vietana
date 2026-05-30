const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // 1. Screenshot Food section
  const foodElement = await page.$('#food');
  if (foodElement) {
    await foodElement.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/food_ui.png' });
  }

  // 2. Open Custom Trip Builder and Screenshot
  const plannerButton = await page.$('nav button'); // Assuming the planner button is in nav
  if (plannerButton) {
    await plannerButton.click();
    await page.waitForTimeout(1000); // Wait for modal to open
    await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/custom_trip_ui.png' });
  }

  await browser.close();
})();

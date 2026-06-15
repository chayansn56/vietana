const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait for destinations section
  await page.waitForSelector('#destinations');
  
  // Get all city cards
  const cityCards = await page.$$('#destinations .grid > div');
  
  for (let i = 0; i < cityCards.length; i++) {
    const cards = await page.$$('#destinations .grid > div');
    const card = cards[i];
    
    // Click the card
    await card.click();
    
    // Wait for modal to appear and images to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Take screenshot of the modal
    const modal = await page.$('div[role="dialog"]');
    if (modal) {
      await modal.screenshot({ path: `/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/city_modal_${i}.png` });
      console.log(`Saved screenshot for city ${i}`);
    }
    
    // Close modal (assuming clicking outside or pressing Escape works, or we can just reload the page)
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 1000));
  }
  
  await browser.close();
})();

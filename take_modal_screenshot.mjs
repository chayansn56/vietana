import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Wait for the components to finish loading
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Scroll to Experiences section
  await page.evaluate(() => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView();
  });
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find the first eye button on the first card and click it
  const eyeButtons = await page.$$('button[title="View Details"]');
  if (eyeButtons.length > 0) {
    console.log('Clicking the first Eye button...');
    await eyeButtons[0].click();
  } else {
    console.log('No eye button found!');
  }
  
  // Wait for modal animation to finish
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_modal_upgrade.png' });
  await browser.close();
  console.log('Modal screenshot saved!');
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // 1. Capture Desktop Landing Page
  console.log('Capturing Landing Page (Desktop)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/vietnam-jain-vegetarian-tours', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_landing_desktop.png' });

  // 2. Capture Mobile Landing Page
  console.log('Capturing Landing Page (Mobile)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:3000/vietnam-jain-vegetarian-tours', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_landing_mobile.png' });

  // 3. Capture Leads CRM Dashboard
  console.log('Capturing Leads Administration Dashboard...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/admin-leads', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_leads_crm.png' });

  await browser.close();
  console.log('Visual QA screenshots saved successfully!');
})();

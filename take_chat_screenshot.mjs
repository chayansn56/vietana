import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/things-to-do', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Type query into Ask AI input
  await page.type('input[name="aiQuery"]', 'Is Halong Bay cruise safe for seniors?');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Submit form
  await page.click('form button[type="submit"]');
  await new Promise(resolve => setTimeout(resolve, 3000)); // wait for chat drawer and response
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_ai_chat_open.png' });
  await browser.close();
  console.log('AI Chat open screenshot saved!');
})();

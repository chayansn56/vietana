import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check anonymous access is gated
  console.log('Testing anonymous CRM access...');
  await page.goto('http://localhost:3000/admin-leads', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_admin_locked.png' });
  console.log('Saved local_admin_locked.png');

  // 2. Enter incorrect password
  console.log('Testing incorrect password input...');
  await page.type('input[placeholder="Enter admin secret key"]', 'wrong_passcode');
  await page.click('button[type="submit"]');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_admin_failed.png' });
  console.log('Saved local_admin_failed.png');

  // 3. Enter correct password
  console.log('Testing correct password authentication...');
  const input = await page.$('input[placeholder="Enter admin secret key"]');
  await input.click({ clickCount: 3 });
  await page.keyboard.press('Backspace');
  await page.evaluate(el => el.value = '', input);
  await page.type('input[placeholder="Enter admin secret key"]', 'vietana_secret_123');
  await page.click('button[type="submit"]');
  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_admin_authenticated.png' });
  console.log('Saved local_admin_authenticated.png');

  await browser.close();
  console.log('E2E Security & Authorization audit completed!');
})();

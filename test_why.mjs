import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // click "About" to open the dropdown
  await page.getByText('About', { exact: true }).hover();
  
  // Wait for dropdown
  await page.waitForTimeout(500);

  console.log("Clicking 'Why Choose Us'");
  await page.getByText('Why Choose Us').click();
  
  await page.waitForTimeout(1000);
  
  console.log("Current URL after click:", page.url());
  
  await browser.close();
})();

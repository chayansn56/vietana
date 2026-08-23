import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Go to landing page
  console.log('Navigating to Jain/Vegetarian Landing Page...');
  await page.goto('http://localhost:3000/vietnam-jain-vegetarian-tours?utm_source=google&utm_medium=cpc&utm_campaign=veg_ahmedabad&gclid=TEST_GCLID_123&gbraid=TEST_GBRAID_456&wbraid=TEST_WBRAID_789', { waitUntil: 'networkidle2' });

  // 2. Fill Form
  console.log('Filling out lead capture form...');
  await page.type('input[placeholder="Enter full name"]', 'Chayan Soni');
  await page.type('input[placeholder="Enter phone number"]', '9876543210');

  // 3. Submit Form
  console.log('Submitting lead form...');
  await page.click('button[type="submit"]');

  // Wait for success modal
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_lead_success.png' });
  console.log('Captured form success modal state!');

  // 4. Navigate to admin leads and capture the populated leads table
  console.log('Navigating to Leads CRM...');
  await page.goto('http://localhost:3000/admin-leads', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_leads_crm_populated.png' });
  console.log('Captured CRM dashboard with populated lead record!');

  await browser.close();
  console.log('All E2E flow screenshots captured successfully!');
})();

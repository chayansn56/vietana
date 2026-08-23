const puppeteer = require('puppeteer');

const url = process.argv[2] || 'https://vietana.com';

async function run() {
  console.log(`Starting production verification against: ${url}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let leadConversions = {
    homepageLoad: 0,
    submission: 0
  };

  let currentPhase = 'homepageLoad';

  page.on('request', request => {
    const reqUrl = request.url();
    if (reqUrl.includes('googleads.g.doubleclick.net') && reqUrl.includes('AW-18279926757') && reqUrl.includes('E5RVCOO168ocEOWXxoxE')) {
      if (reqUrl.includes('conversion')) {
         if (currentPhase === 'homepageLoad') leadConversions.homepageLoad++;
         else if (currentPhase === 'submission') leadConversions.submission++;
      }
    }
  });

  await page.setViewport({ width: 360, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000)); // Wait 2s to check for false conversions

  currentPhase = 'submission';
  
  // Navigate to inquiry form
  await page.evaluate(() => {
    const el = document.getElementById('inquiry');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));

  // Fill Name
  await page.type('#inquiry input[type="text"]', 'Automated Production Test', { delay: 50 });

  // Select Month
  await page.evaluate(() => {
    const monthSelect = document.querySelectorAll('#inquiry select')[0];
    if (monthSelect && monthSelect.options.length > 1) {
      monthSelect.value = monthSelect.options[1].value;
      monthSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  // Select Travelers
  await page.evaluate(() => {
    const travelerSelect = document.querySelectorAll('#inquiry select')[1];
    if (travelerSelect && travelerSelect.options.length > 1) {
      travelerSelect.value = travelerSelect.options[1].value;
      travelerSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  // Fill WhatsApp
  await page.type('#inquiry input[type="tel"]', '5550100', { delay: 50 });

  // Hook into API response
  let leadResponse = null;
  page.on('response', async response => {
    if (response.url().includes('/api/inquiry') && response.request().method() === 'POST') {
      try {
        leadResponse = await response.json();
      } catch (e) {}
    }
  });

  // Submit form
  await page.click('#inquiry button[type="submit"]');
  
  // Wait for submission to complete (either nav to /thank-you or API response)
  await new Promise(r => setTimeout(r, 4000));

  console.log("JSON_OUTPUT_START");
  console.log(JSON.stringify({ leadConversions, leadResponse }, null, 2));
  console.log("JSON_OUTPUT_END");

  await browser.close();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

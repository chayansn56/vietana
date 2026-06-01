import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:4175', { waitUntil: 'networkidle2' }).catch(e => console.log('GOTO ERROR:', e.message));
  
  await browser.close();
  console.log('Puppeteer check complete.');
})();

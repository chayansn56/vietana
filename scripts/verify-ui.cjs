const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  if (!fs.existsSync('docs/screenshots/final-strict-correction')) {
    fs.mkdirSync('docs/screenshots/final-strict-correction', { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let leadConversions = {
    homepageLoad: 0,
    homepageReload: 0,
    whatsappClick: 0,
    thankYouLoad: 0,
    thankYouRefresh: 0
  };
  let currentPhase = 'homepageLoad';

  page.on('request', request => {
    const url = request.url();
    if (url.includes('googleads.g.doubleclick.net') && url.includes('AW-18279926757') && url.includes('E5RVCOO168ocEOWXxoxE')) {
      if (url.includes('conversion')) {
        leadConversions[currentPhase]++;
      }
    }
  });

  const sizes = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 }
  ];

  let domData = {};

  for (const size of sizes) {
    await page.setViewport(size);
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    
    const data = await page.evaluate(() => {
      const getLabels = () => Array.from(document.querySelectorAll('#inquiry label')).map(el => el.textContent.trim());
      const getPackages = () => Array.from(document.querySelectorAll('#packages h3')).map(el => el.textContent.trim());
      const getPrices = () => Array.from(document.querySelectorAll('#packages h3')).map(el => {
         const priceEl = el.parentElement.querySelector('span.text-base.font-bold');
         return priceEl ? priceEl.textContent.trim() : 'N/A';
      });
      const getExperiences = () => Array.from(document.querySelectorAll('#experiences-preview h3')).map(el => el.textContent.trim());
      
      return {
        scrollHeight: document.documentElement.scrollHeight,
        packagesCount: document.querySelectorAll('#packages h3').length,
        packageTitles: getPackages(),
        packagePrices: getPrices(),
        packageCTAs: document.querySelectorAll('#packages button').length,
        experienceCount: document.querySelectorAll('#experiences-preview h3').length,
        experienceTitles: getExperiences(),
        inquiryLabels: getLabels(),
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        heroCTAVariable: (() => {
          const btn = document.querySelector('#hero button');
          if (!btn) return false;
          const rect = btn.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        })()
      };
    });

    if (size.width === 360) {
      domData['360'] = data;
    } else if (size.width === 390) {
      domData['390'] = data;
    }

    await page.screenshot({ 
      path: "docs/screenshots/final-strict-correction/" + size.width + "x" + size.height + ".png", 
      fullPage: true 
    });
  }

  currentPhase = 'homepageReload';
  await page.reload({ waitUntil: 'networkidle2' });
  
  currentPhase = 'whatsappClick';
  const whatsappBtns = await page.$$('a[href*="wa.me"]');
  if (whatsappBtns.length > 0) {
     await page.evaluate(() => {
       document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
         a.addEventListener('click', e => e.preventDefault());
       });
     });
     await whatsappBtns[0].click();
     await new Promise(r => setTimeout(r, 500));
  }

  currentPhase = 'thankYouLoad';
  await page.goto('http://localhost:3000/#/thank-you', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));

  currentPhase = 'thankYouRefresh';
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));

  console.log("JSON_OUTPUT_START");
  console.log(JSON.stringify({ domData, leadConversions }, null, 2));
  console.log("JSON_OUTPUT_END");

  await browser.close();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

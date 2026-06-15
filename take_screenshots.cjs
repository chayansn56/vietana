const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to local server...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll to Destinations
  console.log("Scrolling to Destinations...");
  await page.evaluate(() => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView();
    }
  });
  await new Promise(r => setTimeout(r, 1000)); // wait for animations

  // Define 3 styles
  const styles = [
    {
      name: 'option1_classic_black',
      className: 'bg-black text-white relative overflow-hidden',
      desc: 'Matches the exact black from the Hero section.'
    },
    {
      name: 'option2_surface_dark',
      className: 'bg-[#111111] text-white relative overflow-hidden',
      desc: 'Slightly lighter than black to create a subtle band effect.'
    },
    {
      name: 'option3_golden_glow',
      className: 'bg-gradient-to-b from-black to-[#1a1410] text-white relative overflow-hidden',
      desc: 'Black fading into a very dark golden/charcoal, matching the Hero light leaks.'
    }
  ];

  for (const style of styles) {
    console.log(`Taking screenshot for ${style.name}...`);
    await page.evaluate((className) => {
      const el = document.getElementById('destinations');
      if (el) {
        el.className = className;
      }
    }, style.className);
    
    // wait for render
    await new Promise(r => setTimeout(r, 500));
    
    await page.screenshot({ path: `/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/${style.name}.png` });
  }

  await browser.close();
  console.log("Done!");
}

run().catch(console.error);

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  
  // 1. Capture Desktop (1440x900) with Drawer open
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open Map Curtain
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Explore Map')) {
        await btn.click();
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Trigger "Surprise Me" to select a destination and slide out the details drawer
    const mapButtons = await page.$$('button');
    for (const btn of mapButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Surprise Me')) {
        await btn.click();
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_explorer_desktop.png' });
    console.log('Desktop screenshot saved successfully!');
  }

  // 2. Capture Tablet (768x1024)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open Map Curtain
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Explore Map')) {
        await btn.click();
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_explorer_tablet.png' });
    console.log('Tablet screenshot saved successfully!');
  }

  // 3. Capture Mobile (375x812) with Bottom Sheet open
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open Map Curtain
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Explore Map')) {
        await btn.click();
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Trigger "Surprise Me" to select a destination and open mobile bottom sheet
    const mapButtons = await page.$$('button');
    for (const btn of mapButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Surprise Me')) {
        await btn.click();
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/ec3526dc-f17a-43b5-bee7-7479309d37b5/local_explorer_mobile.png' });
    console.log('Mobile screenshot saved successfully!');
  }

  await browser.close();
})();

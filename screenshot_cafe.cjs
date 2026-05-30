const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to http://localhost:3000/');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });
    
    // Wait for the cafe button "L’Usine" or "Mì Quảng Cô Viên"
    console.log('Clicking cafe button...');
    const cafeButton = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.textContent.includes('Mì Quảng Cô Viên') || b.textContent.includes('Cong Caphe'));
    });
    
    if (cafeButton) {
        await cafeButton.click();
        // Wait for modal to animate
        await new Promise(r => setTimeout(r, 1000));
        console.log('Taking screenshot of modal...');
        await page.screenshot({ path: 'cafe_modal_screenshot.png' });
    } else {
        console.log('Could not find cafe button');
        await page.screenshot({ path: 'cafe_modal_screenshot.png' });
    }
  } catch (error) {
    console.error('Error during screenshot:', error);
  } finally {
    await browser.close();
    console.log('Done.');
  }
})();

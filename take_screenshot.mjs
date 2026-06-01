import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  
  // Wait a bit for the map to render
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Try to click on a map marker to open a popup
  try {
      await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
      const markers = await page.$$('.leaflet-marker-icon');
      if (markers.length > 0) {
          // Click the first marker
          await markers[1].click();
          await new Promise(resolve => setTimeout(resolve, 1500)); // wait for popup animation
      }
  } catch (e) {
      console.log('Could not click marker:', e);
  }

  await page.screenshot({ path: 'map_gallery_screenshot.png' });
  await browser.close();
  console.log('Screenshot saved as map_gallery_screenshot.png');
})();

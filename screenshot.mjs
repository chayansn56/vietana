import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function capture() {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 1080 });
  
  console.log("Navigating to local server...");
  // Assuming the dev server is running on localhost:5173
  await page.goto('http://localhost:3000/#journal', { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Taking screenshot...");
  const path = '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/notes_from_vietnam_screenshot.png';
  await page.screenshot({ path, fullPage: true });
  
  console.log("Screenshot saved to", path);
  await browser.close();
}

capture().catch(console.error);

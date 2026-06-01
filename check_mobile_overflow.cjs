const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const overflows = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const allEls = document.querySelectorAll('*');
    const over = [];
    allEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth || rect.width > docWidth) {
        if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE' && el.tagName !== 'LINK') {
           let classNames = typeof el.className === 'string' ? el.className : '';
           over.push({ tag: el.tagName, id: el.id, classes: classNames, width: rect.width, right: rect.right });
        }
      }
    });
    return over;
  });
  
  console.log("Overflowing Elements:", overflows.length);
  const dedup = Array.from(new Set(overflows.map(o => `${o.tag}#${o.id}.${o.classes.split(' ').slice(0, 3).join('.')}`)));
  console.log(dedup);
  
  await browser.close();
})();

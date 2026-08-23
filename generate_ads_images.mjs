import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateAdsImages() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Convert images to Base64
  function getBase64Image(filename) {
    try {
      const fullPath = path.join(process.cwd(), 'public', 'assets', filename);
      if (fs.existsSync(fullPath)) {
        const ext = path.extname(filename).substring(1);
        const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
        const data = fs.readFileSync(fullPath).toString('base64');
        return `data:${mimeType};base64,${data}`;
      }
    } catch (e) {
      console.error("Error reading image:", filename, e);
    }
    return '';
  }

  // Load real city pictures
  let hcmcImg = '';
  try {
    const hcmcPath = path.join(process.cwd(), 'public', 'images', 'cities', 'hcmc.jpg');
    if (fs.existsSync(hcmcPath)) {
      hcmcImg = `data:image/jpeg;base64,${fs.readFileSync(hcmcPath).toString('base64')}`;
    }
  } catch (e) {
    console.error("HCMC image load error:", e);
  }

  let phuquocImg = '';
  try {
    const pqPath = path.join(process.cwd(), 'public', 'images', 'cities', 'phuquoc.jpg');
    if (fs.existsSync(pqPath)) {
      phuquocImg = `data:image/jpeg;base64,${fs.readFileSync(pqPath).toString('base64')}`;
    }
  } catch (e) {
    console.error("Phu Quoc image load error:", e);
  }

  const mekongDelta = getBase64Image('mekong_delta_1782568914394.jpg');

  // Read logo
  let logoSrc = '';
  try {
    const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
    logoSrc = `data:image/png;base64,${logoBase64}`;
  } catch (e) {
    logoSrc = 'https://vietana.com/vietana_logo.png';
  }

  // Fallbacks if files are missing
  if (!hcmcImg) hcmcImg = getBase64Image('hcmc_skyline_1782568902873.jpg');
  if (!phuquocImg) phuquocImg = getBase64Image('phu_quoc_beach_1782568923590.jpg');

  // 1. SQUARE ADS IMAGE (1200 x 1200)
  const squareHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        html, body {
          margin: 0; padding: 0;
          width: 1200px; height: 1200px;
          overflow: hidden;
          background: #12302B;
          color: #FFFFFF;
          font-family: 'DM Sans', sans-serif;
        }
        .container {
          width: 1200px; height: 1200px;
          padding: 80px;
          display: flex; flex-direction: column;
          justify-content: space-between; align-items: center;
          text-align: center;
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.02'/%3E%3C/svg%3E"),
            radial-gradient(circle at 50% 30%, #1E4D45 0%, #0A1C18 100%);
          border: 4px solid #D4AF37;
        }
        .logo-header {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .logo-header img { height: 150px; }
        .logo-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 54px; margin: 0; color: #60A5FA;
          letter-spacing: 0.12em; font-weight: 600; text-transform: uppercase;
        }
        .logo-header .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-style: italic; color: #E8C84A;
          letter-spacing: 0.08em; margin: 0;
        }
        .headline-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px; color: #FAF7F0; margin: 0 0 10px 0;
          font-weight: 300; letter-spacing: 0.03em;
        }
        .headline-section .divider {
          width: 150px; height: 2px; background: #D4AF37; margin: 20px auto;
        }
        .headline-section .route-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-style: italic;
          color: rgba(250, 247, 240, 0.75); letter-spacing: 0.05em;
        }
        .images-row {
          display: flex; gap: 30px; width: 100%; justify-content: center; margin: 30px 0;
        }
        .image-card {
          flex: 1; height: 280px; border-radius: 12px; overflow: hidden;
          border: 2px solid rgba(212, 175, 55, 0.4); position: relative;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .image-card img { width: 100%; height: 100%; object-fit: cover; }
        .image-card .card-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(10, 28, 24, 0.85); padding: 12px;
          font-size: 16px; text-transform: uppercase; letter-spacing: 0.08em;
          font-weight: 500; color: #FAF7F0;
        }
        .details-box {
          background: rgba(30, 77, 69, 0.4); border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px; padding: 25px 40px; width: 100%;
        }
        .details-box h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; color: #E8C84A; margin: 0 0 15px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;
        }
        .details-box ul {
          margin: 0; padding: 0; list-style: none;
          display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; text-align: left;
        }
        .details-box li {
          font-size: 18px; color: rgba(250, 247, 240, 0.9);
          position: relative; padding-left: 25px;
        }
        .details-box li::before {
          content: "◆"; color: #D4AF37; position: absolute; left: 0;
        }
        .footer-cta {
          display: flex; gap: 30px; width: 100%; align-items: center; margin-top: 20px;
        }
        .price-box {
          flex: 1; background: #E8C84A; color: #12302B; border-radius: 12px;
          padding: 20px; border: 1px solid rgba(255,255,255,0.2);
        }
        .price-box p { margin: 0 0 5px 0; font-size: 16px; font-weight: 700; text-transform: uppercase; }
        .price-box h4 { margin: 0; font-size: 48px; font-family: 'Cormorant Garamond', serif; font-weight: 700; }
        .action-box {
          flex: 1.2; background: rgba(30, 77, 69, 0.85); border: 2px solid rgba(212, 175, 55, 0.35);
          border-radius: 12px; padding: 20px;
        }
        .action-box h5 { margin: 0 0 5px 0; font-size: 16px; color: #E8C84A; font-weight: 700; text-transform: uppercase; }
        .action-box .hotline { font-size: 36px; font-family: 'Cormorant Garamond', serif; font-weight: 600; color: #FAF7F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo-header">
          <img src="${logoSrc}" alt="Logo" />
          <h1>VIETANA</h1>
          <div class="tagline">Feel Vietnam, Your Way</div>
        </div>
        <div class="headline-section">
          <h2>HCMC & Phu Quoc Explorer</h2>
          <div class="divider"></div>
          <div class="route-text">5 Days / 4 Nights Bespoke Curation</div>
        </div>
        <div class="images-row">
          <div class="image-card"><img src="${hcmcImg}" /><div class="card-caption">Ho Chi Minh City</div></div>
          <div class="image-card"><img src="${phuquocImg}" /><div class="card-caption">Phu Quoc Island</div></div>
        </div>
        <div class="details-box">
          <h4>Premium Inclusions</h4>
          <ul>
            <li>Luxury 3★ Stays with Breakfast</li>
            <li>Cu Chi Tunnels & Mekong Delta</li>
            <li>3 Island Speedboat & Snorkel</li>
            <li>VinWonders Admission Ticket</li>
          </ul>
        </div>
        <div class="footer-cta">
          <div class="price-box"><p>Special Indian Rate</p><h4>₹28,000/- PP</h4></div>
          <div class="action-box"><h5>Book via WhatsApp</h5><div class="hotline">+91 99532 94543</div></div>
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. LANDSCAPE ADS IMAGE (1200 x 628)
  const landscapeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; }
        html, body {
          margin: 0; padding: 0;
          width: 1200px; height: 628px;
          overflow: hidden;
          background: #12302B;
          color: #FFFFFF;
          font-family: 'DM Sans', sans-serif;
        }
        .container {
          width: 1200px; height: 628px;
          padding: 40px;
          display: flex; gap: 40px;
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.02'/%3E%3C/svg%3E"),
            radial-gradient(circle at 30% 30%, #1E4D45 0%, #0A1C18 100%);
          border: 4px solid #D4AF37;
        }
        .left-col {
          flex: 1.2; display: flex; flex-direction: column; justify-content: space-between;
        }
        .right-col {
          flex: 1; display: flex; flex-direction: column; gap: 20px; justify-content: space-between;
        }
        .logo-header {
          display: flex; align-items: center; gap: 20px;
        }
        .logo-header img { height: 80px; }
        .logo-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; margin: 0; color: #60A5FA;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .logo-header .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-style: italic; color: #E8C84A; margin: 0;
        }
        .headline-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; color: #FAF7F0; margin: 15px 0 5px 0;
          font-weight: 300; letter-spacing: 0.02em;
        }
        .headline-section .route-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-style: italic;
          color: rgba(250, 247, 240, 0.75); margin-bottom: 15px;
        }
        .inclusions-list {
          margin: 0; padding: 0; list-style: none;
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px 15px;
        }
        .inclusions-list li {
          font-size: 15px; color: rgba(250, 247, 240, 0.9);
          position: relative; padding-left: 20px;
        }
        .inclusions-list li::before {
          content: "◆"; color: #D4AF37; position: absolute; left: 0;
        }
        .image-showcase {
          flex: 1; border-radius: 12px; overflow: hidden;
          border: 2px solid rgba(212, 175, 55, 0.4); position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .image-showcase img { width: 100%; height: 100%; object-fit: cover; }
        .image-showcase .caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(10, 28, 24, 0.85); padding: 8px 12px;
          font-size: 14px; text-transform: uppercase; color: #FAF7F0;
        }
        .footer-cta {
          display: flex; gap: 20px; align-items: center;
        }
        .price-box {
          flex: 1; background: #E8C84A; color: #12302B; border-radius: 8px;
          padding: 12px; text-align: center;
        }
        .price-box p { margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .price-box h4 { margin: 0; font-size: 32px; font-family: 'Cormorant Garamond', serif; font-weight: 700; }
        .action-box {
          flex: 1.2; background: rgba(30, 77, 69, 0.85); border: 1.5px solid rgba(212, 175, 55, 0.35);
          border-radius: 8px; padding: 12px; text-align: center;
        }
        .action-box h5 { margin: 0; font-size: 12px; color: #E8C84A; font-weight: 700; text-transform: uppercase; }
        .action-box .hotline { font-size: 26px; font-family: 'Cormorant Garamond', serif; font-weight: 600; color: #FAF7F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="left-col">
          <div class="logo-header">
            <img src="${logoSrc}" />
            <div>
              <h1>VIETANA</h1>
              <div class="tagline">Feel Vietnam, Your Way</div>
            </div>
          </div>
          <div class="headline-section">
            <h2>HCMC & Phu Quoc Explorer</h2>
            <div class="route-text">5 Days / 4 Nights Bespoke Curation</div>
          </div>
          <ul class="inclusions-list">
            <li>Luxury 3★ Stays with Breakfast</li>
            <li>Cu Chi & Mekong Delta Cruise</li>
            <li>3 Island Speedboat Tour</li>
            <li>VinWonders Entry Ticket</li>
          </ul>
        </div>
        <div class="right-col">
          <div class="image-showcase">
            <img src="${phuquocImg}" />
            <div class="caption">Phu Quoc Island, Vietnam</div>
          </div>
          <div class="footer-cta">
            <div class="price-box"><p>Special Rate</p><h4>₹28,000/- PP</h4></div>
            <div class="action-box"><h5>WhatsApp Hotline</h5><div class="hotline">+91 99532 94543</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Render Square Image
  await page.setViewport({ width: 1200, height: 1200 });
  await page.setContent(squareHtml, { waitUntil: 'load' });
  const squarePath = '/Users/chayansoni/Desktop/Vietana_Ads_Assets/vietana_ads_flyer_square.png';
  await page.screenshot({ path: squarePath, type: 'png' });
  console.log(`Generated square ads flyer: ${squarePath}`);

  // Render Landscape Image
  await page.setViewport({ width: 1200, height: 628 });
  await page.setContent(landscapeHtml, { waitUntil: 'load' });
  const landscapePath = '/Users/chayansoni/Desktop/Vietana_Ads_Assets/vietana_ads_flyer_landscape.png';
  await page.screenshot({ path: landscapePath, type: 'png' });
  console.log(`Generated landscape ads flyer: ${landscapePath}`);

  await browser.close();
}

generateAdsImages().catch(console.error);

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateFlyer() {
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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>VIETANA Flyer</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 210mm;
          height: 297mm;
          overflow: hidden;
          background: #12302B; /* Deep Forest Dark Green matches premium branding */
          -webkit-print-color-adjust: exact;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          color: #FFFFFF;
        }
        
        .flyer-container {
          width: 210mm;
          height: 297mm;
          position: relative;
          padding: 22mm 20mm;
          overflow: hidden;
          background-color: #12302B;
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.02'/%3E%3C/svg%3E"),
            radial-gradient(circle at 50% 30%, #1E4D45 0%, #0A1C18 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        /* Logo and Header Curation */
        .brand-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
        }
        .brand-header img {
          height: 65px;
          margin-bottom: 2px;
        }
        .brand-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          margin: 0;
          color: #60A5FA; /* Blue Accent Logo color */
          letter-spacing: 0.12em;
          font-weight: 600;
          text-transform: uppercase;
        }
        .brand-header .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          color: #E8C84A; /* Yellow Tagline color */
          letter-spacing: 0.08em;
          margin: 0;
        }

        /* Headline & Route details */
        .headline-section {
          margin: 15px 0;
        }
        .headline-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 46px;
          color: #FAF7F0;
          margin: 0 0 4px 0;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
        .headline-section .divider {
          width: 80px;
          height: 1px;
          background: #D4AF37;
          margin: 12px auto;
        }
        .headline-section .route-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-style: italic;
          color: rgba(250, 247, 240, 0.75);
          letter-spacing: 0.05em;
        }

        /* Layout Grid: Clean Side-by-Side Images */
        .images-row {
          display: flex;
          gap: 15px;
          width: 100%;
          justify-content: center;
          margin: 25px 0;
        }
        .image-card {
          flex: 1;
          height: 60mm;
          border-radius: 6px;
          overflow: hidden;
          border: 1.5px solid rgba(212, 175, 55, 0.4);
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-card .card-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(10, 28, 24, 0.85);
          padding: 8px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          color: #FAF7F0;
          border-top: 1px solid rgba(212, 175, 55, 0.25);
        }

        /* Features & Info Box (High-level Highlights) */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 90%;
          text-align: center;
          margin: 20px 0;
        }
        .info-box {
          background: rgba(30, 77, 69, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 20px 30px;
        }
        .info-box h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #E8C84A;
          margin: 0 0 15px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 8px;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .info-box ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 20px;
          text-align: left;
        }
        .info-box li {
          font-size: 13.5px;
          color: rgba(250, 247, 240, 0.9);
          line-height: 1.45;
          position: relative;
          padding-left: 20px;
        }
        .info-box li::before {
          content: "◆";
          color: #D4AF37;
          position: absolute;
          left: 0;
        }

        /* Large Conversion block */
        .conversion-row {
          display: flex;
          gap: 20px;
          width: 100%;
          align-items: center;
          margin: 20px 0;
        }
        .price-highlight-box {
          flex: 1;
          background: #E8C84A;
          color: #12302B;
          border-radius: 8px;
          padding: 18px 20px;
          box-shadow: 0 12px 30px rgba(232, 200, 74, 0.15);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .price-highlight-box p {
          margin: 0 0 5px 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
        }
        .price-highlight-box h4 {
          margin: 0;
          font-size: 38px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .action-box {
          flex: 1.2;
          background: rgba(30, 77, 69, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 8px;
          padding: 18px 20px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }
        .action-box h5 {
          margin: 0 0 5px 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #E8C84A;
          font-weight: 700;
        }
        .action-box .hotline {
          font-size: 24px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: 4px 0;
          color: #FAF7F0;
        }
        .action-box .subtext {
          font-size: 13px;
          color: rgba(250, 247, 240, 0.7);
          margin-top: 5px;
        }

        /* Footer Curation */
        .flyer-footer {
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          color: rgba(250, 247, 240, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

      </style>
    </head>
    <body>

      <div class="flyer-container">
        
        <!-- Header -->
        <div class="brand-header">
          <img src="${logoSrc}" alt="VIETANA Logo" />
          <h1>VIETANA</h1>
          <div class="tagline">Feel Vietnam, Your Way</div>
        </div>

        <!-- Headline Box -->
        <div class="headline-section">
          <h2>HCMC & Phu Quoc Explorer</h2>
          <div class="divider"></div>
          <div class="route-text">5 Days / 4 Nights Bespoke Curation</div>
        </div>

        <!-- Clean Images Grid (Using exact HCMC and Phu Quoc images) -->
        <div class="images-row">
          <div class="image-card">
            <img src="${hcmcImg}" alt="Ho Chi Minh City" />
            <div class="card-caption">Ho Chi Minh City</div>
          </div>
          <div class="image-card">
            <img src="${mekongDelta}" alt="Mekong Delta" />
            <div class="card-caption">Mekong Delta</div>
          </div>
          <div class="image-card">
            <img src="${phuquocImg}" alt="Phu Quoc Island" />
            <div class="card-caption">Phu Quoc Island</div>
          </div>
        </div>

        <!-- High-level Checklist Panel (Replaced long details with punchy highlights) -->
        <div class="info-grid">
          <div class="info-box">
            <h4>Bespoke Holiday Curation</h4>
            <ul>
              <li>Stay at 3★ Stays with Daily Breakfasts</li>
              <li>VinWonders Admission & Grand World Ticket</li>
              <li>Mekong Delta Cruise & Cu Chi Tunnel Excursion</li>
              <li>3 Island Speedboat & Snorkeling Adventure</li>
              <li>Local Lunches during Day Tours</li>
              <li>Private Airport Transfers & Custom Curation</li>
            </ul>
          </div>
        </div>

        <!-- Pricing & Call to Action Row -->
        <div class="conversion-row">
          <div class="price-highlight-box">
            <p>Special Indian Booking Rate</p>
            <h4>₹28,000/- PP</h4>
          </div>

          <div class="action-box">
            <h5>Book Now (WhatsApp Hotline)</h5>
            <div class="hotline">+91 99532 94543</div>
            <div class="subtext">booking@vietana.com | www.vietana.com</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flyer-footer">
          <div>VIETANA GROUP ( copyright ) all rights reserved</div>
          <div>Vietnam Destination Management Company</div>
        </div>

      </div>

    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });

  const pdfPath = path.join(process.cwd(), 'public', 'itineraries', 'PDFs', 'Beach Escapes', 'vietana_ads_flyer.pdf');

  await page.pdf({
    path: pdfPath,
    width: '210mm',
    height: '297mm',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  console.log(`Flyer generated successfully at: ${pdfPath}`);
  await browser.close();
}

generateFlyer().catch(console.error);

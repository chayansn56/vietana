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

  const hcmcImg = getBase64Image('saigon_skyline.jpg') || getBase64Image('hcmc_skyline_1782568902873.jpg');
  const mekongDelta = getBase64Image('mekong_delta_1782568914394.jpg');
  const dalatWaterfall = getBase64Image('dalat_waterfall.jpg');

  // Read logo
  let logoSrc = '';
  try {
    const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
    logoSrc = `data:image/png;base64,${logoBase64}`;
  } catch (e) {
    logoSrc = 'https://vietana.com/vietana_logo.png';
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>VIETANA HCMC & Da Lat Flyer</title>
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
        }

        /* Header Style */
        .brand-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 5px;
        }
        .brand-header img {
          height: 52px;
          margin-bottom: 8px;
        }
        .brand-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin: 0;
          color: #60A5FA;
        }
        .brand-header .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-style: italic;
          color: #E8C84A;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        /* Headline Section */
        .headline-section {
          text-align: center;
          margin-bottom: 15px;
          width: 100%;
        }
        .headline-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #FAF7F0;
          margin: 0 0 8px 0;
          text-transform: uppercase;
        }
        .headline-section .divider {
          width: 70px;
          height: 1px;
          background: #D4AF37;
          margin: 0 auto 10px auto;
        }
        .headline-section .route-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #FAF7F0;
          letter-spacing: 0.05em;
          font-style: italic;
        }

        /* Images Grid */
        .images-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          width: 100%;
          margin-bottom: 20px;
        }
        .image-card {
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.45);
          background: #FAF7F0;
          padding: 3px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          position: relative;
          height: 52mm;
        }
        .image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
        .card-caption {
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          background: rgba(18, 48, 43, 0.85);
          color: #FAF7F0;
          font-size: 11px;
          text-align: center;
          padding: 5px 0;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        /* Details Checklist Box */
        .info-grid {
          width: 100%;
          margin-bottom: 20px;
        }
        .info-box {
          background: rgba(30, 77, 69, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 8px;
          padding: 20px 25px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .info-box h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #E8C84A;
          margin: 0 0 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 6px;
          font-weight: 500;
        }
        .info-box ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }
        .info-box li {
          font-size: 13px;
          color: rgba(250, 247, 240, 0.9);
          display: flex;
          align-items: center;
        }
        .info-box li::before {
          content: "✓";
          color: #D4AF37;
          margin-right: 8px;
          font-weight: bold;
        }

        /* Action & Pricing Section */
        .conversion-row {
          display: flex;
          width: 100%;
          gap: 20px;
          margin-bottom: 15px;
        }
        .price-highlight-box {
          flex: 1;
          background: #FAF7F0;
          color: #1E4D45;
          border-radius: 6px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid #D4AF37;
        }
        .price-highlight-box p {
          margin: 0 0 4px 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777777;
          font-weight: 600;
        }
        .price-highlight-box h4 {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #B8860B;
          font-weight: 700;
        }
        
        .action-box {
          flex: 1.5;
          background: rgba(30, 77, 69, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 6px;
          padding: 15px 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .action-box h5 {
          margin: 0 0 4px 0;
          font-size: 11px;
          color: #E8C84A;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .action-box .hotline {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: 4px 0;
          color: #FAF7F0;
        }
        .action-box .subtext {
          font-size: 12px;
          color: rgba(250, 247, 240, 0.7);
          margin-top: 5px;
        }

        /* Footer */
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
          <h2>HCMC & Da Lat Explorer</h2>
          <div class="divider"></div>
          <div class="route-text">5 Days / 4 Nights Bespoke Curation</div>
        </div>

        <!-- Images Grid -->
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
            <img src="${dalatWaterfall}" alt="Da Lat Highlands" />
            <div class="card-caption">Da Lat Highlands</div>
          </div>
        </div>

        <!-- Checklist Panel -->
        <div class="info-grid">
          <div class="info-box">
            <h4>Bespoke Holiday Curation</h4>
            <ul>
              <li>Stay at 3★ Stays with Breakfasts</li>
              <li>Riverside Hotel & Tulip Hotel Group</li>
              <li>Saigon River Sunset Cruise</li>
              <li>Datanla Waterfall Alpine Coaster</li>
              <li>Cu Chi Tunnels Guided Excursion</li>
              <li>Mekong Delta day-trip & Sampan Ride</li>
              <li>Complimentary Drone Footage & Photos</li>
              <li>Private Airport Transfers & Guidance</li>
            </ul>
          </div>
        </div>

        <!-- Pricing & Call to Action Row -->
        <div class="conversion-row">
          <div class="price-highlight-box">
            <p>Special Indian Booking Rate</p>
            <h4>₹47,678/- PP</h4>
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

  const pdfPath = '/Users/chayansoni/Desktop/VIETANA_HCMC_Dalat_Explorer_Flyer.pdf';

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

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

  const hcmcSkyline = getBase64Image('hcmc_skyline_1782568902873.jpg');
  const mekongDelta = getBase64Image('mekong_delta_1782568914394.jpg');
  const phuQuocBeach = getBase64Image('phu_quoc_beach_1782568923590.jpg');

  // Read logo
  let logoSrc = '';
  try {
    const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
    logoSrc = `data:image/png;base64,${logoBase64}`;
  } catch (e) {
    logoSrc = 'https://vietana.com/vietana_logo.png';
  }

  // Find a hero image from the public folder for the cover background
  let bgImageBase64 = '';
  try {
    const p1ImgPath = path.join(process.cwd(), 'public', 'hero_2.png');
    if (fs.existsSync(p1ImgPath)) {
      bgImageBase64 = `data:image/png;base64,${fs.readFileSync(p1ImgPath).toString('base64')}`;
    } else {
      bgImageBase64 = hcmcSkyline;
    }
  } catch (e) {
    bgImageBase64 = hcmcSkyline;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>VIETANA Premium Ads Flyer</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
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
          background: #FAF7F0;
          -webkit-print-color-adjust: exact;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          color: #111111;
        }
        
        .flyer-container {
          width: 210mm;
          height: 297mm;
          position: relative;
          padding: 15mm;
          overflow: hidden;
          background-color: #FAF7F0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.025'/%3E%3C/svg%3E");
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Top Bar: Brand & Tagline */
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(30, 77, 69, 0.15);
          padding-bottom: 8px;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-logo img {
          height: 40px;
        }
        .brand-logo h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #1E4D45;
          margin: 0;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          color: #B8860B;
          font-style: italic;
          letter-spacing: 0.05em;
        }

        /* Hero Split Section: Top Image / Big Price Side-by-Side */
        .hero-split {
          display: flex;
          gap: 20px;
          height: 95mm;
          margin: 12px 0;
          align-items: stretch;
        }

        /* Large Visual Banner */
        .hero-banner {
          flex: 1.2;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 1px solid rgba(30, 77, 69, 0.2);
        }
        .hero-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(18, 48, 43, 0.9) 0%, rgba(18, 48, 43, 0.2) 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }
        .banner-overlay h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          color: #FFFFFF;
          margin: 0 0 4px 0;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }
        .banner-overlay p {
          font-size: 13px;
          color: #E8C84A;
          margin: 0;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Extremely Highlighted Price Box */
        .giant-price-card {
          flex: 0.8;
          background: linear-gradient(135deg, #1E4D45 0%, #12302B 100%);
          border-radius: 8px;
          padding: 25px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 12px 30px rgba(30, 77, 69, 0.2);
          border: 2px solid #D4AF37;
          position: relative;
        }
        .giant-price-card .badge-top {
          position: absolute;
          top: 15px;
          background: #D4AF37;
          color: #12302B;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 3px 12px;
          border-radius: 50px;
        }
        .giant-price-card .label {
          font-size: 13px;
          color: rgba(250, 247, 240, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 5px;
          margin-top: 15px;
        }
        .giant-price-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          color: #E8C84A;
          margin: 0 0 5px 0;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .giant-price-card .sub-value {
          font-size: 13px;
          color: rgba(250, 247, 240, 0.6);
          margin-bottom: 20px;
        }
        .giant-price-card .cta-btn {
          width: 100%;
          background: #E8C84A;
          color: #12302B;
          border: none;
          padding: 10px 0;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(232, 200, 74, 0.3);
        }

        /* Center Row: Three Destinations Thumbs */
        .destinations-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 8px 0;
        }
        .dest-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(200, 190, 170, 0.4);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .dest-card img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #D4AF37;
        }
        .dest-card div {
          display: flex;
          flex-direction: column;
        }
        .dest-card span.city-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #1E4D45;
        }
        .dest-card span.days-count {
          font-size: 10px;
          color: #777777;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Detailed Highlights Box */
        .features-panel {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(200, 190, 170, 0.4);
          border-radius: 8px;
          padding: 15px 20px;
          margin: 8px 0;
        }
        .features-panel h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #1E4D45;
          margin: 0 0 10px 0;
          border-bottom: 1px solid rgba(30, 77, 69, 0.12);
          padding-bottom: 6px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 30px;
        }
        .feature-item {
          font-size: 12.5px;
          color: #444444;
          line-height: 1.45;
          display: flex;
          align-items: flex-start;
        }
        .feature-item::before {
          content: "◆";
          color: #D4AF37;
          margin-right: 10px;
          font-size: 10px;
        }

        /* Bottom Row: Contact & Urgency details */
        .bottom-action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(30, 77, 69, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(30, 77, 69, 0.1);
          padding: 12px 25px;
          margin-top: 8px;
        }
        .contact-col h6 {
          margin: 0 0 3px 0;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777777;
        }
        .contact-col p {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1E4D45;
          letter-spacing: 0.05em;
        }
        .web-col {
          text-align: right;
        }
        .web-col h6 {
          margin: 0 0 3px 0;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777777;
        }
        .web-col p {
          margin: 0;
          font-size: 13.5px;
          font-weight: 500;
          color: #1E4D45;
        }

        /* Footer styling */
        .footer {
          border-top: 1px solid rgba(30, 77, 69, 0.15);
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          color: #777777;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
      </style>
    </head>
    <body>

      <div class="flyer-container">
        
        <!-- Top Bar -->
        <div class="top-bar">
          <div class="brand-logo">
            <img src="${logoSrc}" alt="VIETANA Logo" />
            <h1>VIETANA</h1>
          </div>
          <div class="tagline">Vietnam Destination Experts</div>
        </div>

        <!-- Hero split block -->
        <div class="hero-split">
          
          <!-- Banner Image -->
          <div class="hero-banner">
            <img src="${bgImageBase64}" alt="Vietnam Explorer" />
            <div class="banner-overlay">
              <p>5 Days / 4 Nights Bespoke Tour</p>
              <h2>Ho Chi Minh City &<br>Phu Quoc Island</h2>
            </div>
          </div>

          <!-- Highlighted Giant Price Card -->
          <div class="giant-price-card">
            <div class="badge-top">Limited Offer</div>
            <div class="label">Twin Sharing Rate</div>
            <h3>₹28,000</h3>
            <div class="sub-value">Approx 7,735,000 VND / person</div>
            <button class="cta-btn">Book Your Space</button>
          </div>

        </div>

        <!-- Center Row: Destinations -->
        <div class="destinations-row">
          <div class="dest-card">
            <img src="${hcmcSkyline}" alt="Saigon" />
            <div>
              <span class="city-title">Saigon City</span>
              <span class="days-count">2 Nights Stay</span>
            </div>
          </div>
          <div class="dest-card">
            <img src="${mekongDelta}" alt="Mekong Delta" />
            <div>
              <span class="city-title">Mekong Delta</span>
              <span class="days-count">Day Tour Included</span>
            </div>
          </div>
          <div class="dest-card">
            <img src="${phuQuocBeach}" alt="Phu Quoc" />
            <div>
              <span class="city-title">Phu Quoc Island</span>
              <span class="days-count">2 Nights Stay</span>
            </div>
          </div>
        </div>

        <!-- Detailed Highlights Panel -->
        <div class="features-panel">
          <h4>Premium Inclusions & Activities Checklist</h4>
          <div class="features-grid">
            <div class="feature-item">
              <strong>Stay:</strong> Duc Vuong HCMC & Bay Resort Phu Quoc (3★ Hotels).
            </div>
            <div class="feature-item">
              <strong>Sightseeing:</strong> VinWonders tickets & Cu Chi Tunnels admission.
            </div>
            <div class="feature-item">
              <strong>Adventure:</strong> 3 Island speedboat tour & snorkeling equipment.
            </div>
            <div class="feature-item">
              <strong>Exclusives:</strong> Complimentary drone footage & group SUP photos.
            </div>
            <div class="feature-item">
              <strong>Transfers:</strong> Airport transfers in private A/C vehicles.
            </div>
            <div class="feature-item">
              <strong>Meals:</strong> Daily breakfasts + local lunches during day tours.
            </div>
          </div>
        </div>

        <!-- Bottom Actions Row -->
        <div class="bottom-action-row">
          <div class="contact-col">
            <h6>WhatsApp Inquiry Hotline</h6>
            <p>+91 99532 94543</p>
          </div>
          <div class="web-col">
            <h6>Official Website / Email</h6>
            <p>www.vietana.com | booking@vietana.com</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div>VIETANA GROUP ( copyright ) all rights reserved</div>
          <div>Vietnam DMC for Indian Travelers</div>
        </div>

      </div>

    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });

  const pdfPath = path.join(process.cwd(), 'public', 'itineraries', 'PDFs', 'Beach Escapes', 'vietana_ads_flyer_option2.pdf');

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

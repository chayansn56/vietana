import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateCovers() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Convert images to Base64
  function getBase64(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).substring(1);
        const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
        const data = fs.readFileSync(filePath).toString('base64');
        return `data:${mimeType};base64,${data}`;
      }
    } catch (e) {
      console.error("Error reading file:", filePath, e);
    }
    return '';
  }

  // Load assets
  const logo = getBase64(path.join(process.cwd(), 'public', 'vietana_logo.png'));
  const halong = getBase64(path.join(process.cwd(), 'public', 'hero_halong.png'));
  const hoian = getBase64(path.join(process.cwd(), 'public', 'hero_hoian.png'));
  const sapa = getBase64(path.join(process.cwd(), 'public', 'hero_sapa.png'));
  const phuquoc = getBase64(path.join(process.cwd(), 'public', 'assets', 'phu_quoc_beach_1782568923590.jpg'));
  const hcmc = getBase64(path.join(process.cwd(), 'public', 'assets', 'hcmc_skyline_1782568902873.jpg'));

  const designs = [
    {
      name: 'fb_cover_1_collage',
      html: `
        <div class="cover collage-design">
          <div class="pane" style="background-image: url('${halong}');">
            <div class="caption">Ha Long Bay</div>
          </div>
          <div class="pane" style="background-image: url('${hoian}');">
            <div class="caption">Hoi An</div>
          </div>
          <div class="pane" style="background-image: url('${phuquoc}');">
            <div class="caption">Phu Quoc</div>
          </div>
          <div class="overlay"></div>
          <div class="brand-card">
            <img class="logo" src="${logo}" />
            <h1>VIETANA</h1>
            <div class="tagline">Feel Vietnam, Your Way</div>
            <div class="badge">Bespoke Curation for Indian Travelers</div>
          </div>
        </div>
      `
    },
    {
      name: 'fb_cover_2_halong',
      html: `
        <div class="cover single-design" style="background-image: url('${halong}');">
          <div class="overlay-gradient"></div>
          <div class="brand-left">
            <img class="logo" src="${logo}" />
            <h1>VIETANA</h1>
            <div class="tagline">Feel Vietnam, Your Way</div>
          </div>
          <div class="info-right">
            <h2>Your Local Vietnam Partner</h2>
            <p>Tailor-made itineraries, local Indian culinary options, 24/7 on-ground support, and seamless travel curations.</p>
            <div class="hotline">WhatsApp Support: +91 99532 94543</div>
          </div>
        </div>
      `
    },
    {
      name: 'fb_cover_3_minimalist',
      html: `
        <div class="cover minimalist-design">
          <div class="gold-frame"></div>
          <div class="logo-box">
            <img class="logo-large" src="${logo}" />
            <h1>VIETANA</h1>
            <div class="separator"></div>
            <div class="tagline-gold">FEEL VIETNAM, YOUR WAY</div>
            <p class="desc">Premium Destination Management Company for Vietnam</p>
          </div>
        </div>
      `
    }
  ];

  for (const design of designs) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          html, body {
            margin: 0; padding: 0;
            width: 1640px; height: 924px;
            overflow: hidden;
            font-family: 'DM Sans', sans-serif;
            background: #000;
          }
          
          /* Cover Canvas */
          .cover {
            width: 1640px; height: 924px;
            position: relative;
            overflow: hidden;
            display: flex;
          }

          /* COLLAGE DESIGN */
          .collage-design {
            display: flex;
            width: 100%; height: 100%;
          }
          .collage-design .pane {
            flex: 1;
            height: 100%;
            background-size: cover;
            background-position: center;
            position: relative;
            transition: transform 0.5s ease;
            border-right: 2px solid rgba(212, 175, 55, 0.3);
          }
          .collage-design .pane:last-child {
            border-right: none;
          }
          .collage-design .pane .caption {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(18, 48, 43, 0.85);
            padding: 8px 20px;
            border-radius: 20px;
            font-family: 'Cormorant Garamond', serif;
            font-size: 20px;
            color: #FAF7F0;
            letter-spacing: 0.1em;
            border: 1px solid rgba(212, 175, 55, 0.4);
            white-space: nowrap;
          }
          .collage-design .overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(10, 28, 24, 0.25);
            pointer-events: none;
          }
          .collage-design .brand-card {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(18, 48, 43, 0.92);
            backdrop-filter: blur(12px);
            border: 2px solid #D4AF37;
            padding: 50px 70px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 600px;
          }
          .collage-design .brand-card .logo {
            height: 100px;
            margin-bottom: 20px;
          }
          .collage-design .brand-card h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 54px;
            color: #60A5FA;
            margin: 0;
            letter-spacing: 0.15em;
            font-weight: 600;
          }
          .collage-design .brand-card .tagline {
            font-family: 'Cormorant Garamond', serif;
            font-size: 24px;
            font-style: italic;
            color: #E8C84A;
            margin: 8px 0 25px 0;
            letter-spacing: 0.08em;
          }
          .collage-design .brand-card .badge {
            font-size: 14px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.8);
            border-top: 1px solid rgba(212, 175, 55, 0.4);
            padding-top: 15px;
            width: 100%;
          }

          /* SINGLE MAIN DESIGN */
          .single-design {
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 100px;
          }
          .single-design .overlay-gradient {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(90deg, rgba(10, 28, 24, 0.95) 0%, rgba(10, 28, 24, 0.75) 40%, rgba(10, 28, 24, 0.4) 100%);
            pointer-events: none;
          }
          .single-design .brand-left {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .single-design .brand-left .logo {
            height: 120px;
            margin-bottom: 20px;
          }
          .single-design .brand-left h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 68px;
            color: #60A5FA;
            margin: 0;
            letter-spacing: 0.15em;
            font-weight: 600;
          }
          .single-design .brand-left .tagline {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26px;
            font-style: italic;
            color: #E8C84A;
            margin: 10px 0;
            letter-spacing: 0.08em;
          }
          .single-design .info-right {
            position: relative;
            z-index: 2;
            max-width: 550px;
            text-align: left;
            background: rgba(18, 48, 43, 0.85);
            backdrop-filter: blur(8px);
            padding: 40px;
            border-radius: 8px;
            border-left: 4px solid #D4AF37;
            box-shadow: 0 15px 30px rgba(0,0,0,0.4);
          }
          .single-design .info-right h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            color: #FAF7F0;
            margin: 0 0 15px 0;
            letter-spacing: 0.05em;
          }
          .single-design .info-right p {
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255,255,255,0.85);
            margin: 0 0 25px 0;
          }
          .single-design .info-right .hotline {
            font-size: 16px;
            font-weight: bold;
            color: #E8C84A;
            letter-spacing: 0.05em;
          }

          /* MINIMALIST DESIGN */
          .minimalist-design {
            background-color: #12302B;
            background-image: 
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.02'/%3E%3C/svg%3E"),
              radial-gradient(circle at 50% 50%, #1E4D45 0%, #0A1C18 100%);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .minimalist-design .gold-frame {
            position: absolute;
            top: 40px; left: 40px; right: 40px; bottom: 40px;
            border: 1px solid rgba(212, 175, 55, 0.4);
            pointer-events: none;
          }
          .minimalist-design .logo-box {
            text-align: center;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .minimalist-design .logo-large {
            height: 140px;
            margin-bottom: 25px;
          }
          .minimalist-design h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 76px;
            color: #FAF7F0;
            margin: 0;
            letter-spacing: 0.2em;
            font-weight: 500;
          }
          .minimalist-design .separator {
            width: 120px;
            height: 1.5px;
            background: #D4AF37;
            margin: 20px 0;
          }
          .minimalist-design .tagline-gold {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26px;
            letter-spacing: 0.15em;
            color: #D4AF37;
            font-weight: 400;
          }
          .minimalist-design .desc {
            font-size: 15px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.6);
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        ${design.html}
      </body>
      </html>
    `;

    await page.setViewport({ width: 1640, height: 924 });
    await page.setContent(htmlContent);
    
    // Output path to the artifacts directory
    const outputDir = '/Users/chayansoni/.gemini/antigravity/brain/517b76fa-433d-42a5-891e-d01a31446ad1';
    const outputPath = path.join(outputDir, `${design.name}.png`);
    
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Generated cover: ${outputPath}`);
  }

  await browser.close();
}

generateCovers().catch(console.error);

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateBrochure() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Read images and convert to Base64 to embed them directly in HTML
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

  const hcmcSkyline = getBase64Image('saigon_skyline.jpg') || getBase64Image('hcmc_skyline_1782568902873.jpg');
  const mekongDelta = getBase64Image('mekong_delta_1782568914394.jpg');
  const dalatWaterfall = getBase64Image('dalat_waterfall.jpg');
  
  const hotelRiversideImg = getBase64Image('page_8_img_2_X7.png'); // reuse premium image
  const hotelTulipImg = getBase64Image('page_8_img_1_X6.png'); // reuse premium image

  // Read logo if exists
  let logoSrc = '';
  try {
    const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
    logoSrc = `data:image/png;base64,${logoBase64}`;
  } catch (e) {
    logoSrc = 'https://vietana.com/vietana_logo.png';
  }

  // Load target package data
  const packageData = {
    title: "Ho Chi Minh City & Da Lat Explorer",
    duration: "5 Days / 4 Nights",
    priceVND: "13,244,000",
    priceINR: "47,678",
    hotels: [
      { city: "Ho Chi Minh City", name: "Riverside Hotel Saigon", rating: "★★★", nights: "2 Nights" },
      { city: "Da Lat", name: "Tulip Hotel Group", rating: "★★★", nights: "2 Nights" }
    ],
    inclusions: [
      "Airport transfers in private A/C luxury vehicles",
      "Accommodation at Riverside Hotel Saigon & Tulip Hotel Group",
      "Daily breakfast at both hotels",
      "All sightseeing entrance fees & activities ticket",
      "Saigon River Sunset Cruise Admission",
      "Cu Chi Tunnels Guided Tour & Saigon City Tour",
      "Datanla Waterfall tour including Alpine Coaster rides",
      "Mekong Delta day-trip with honey tea & folk music",
      "Complimentary drone footage & local photo assist",
      "Local lunch during Day 2 & Day 4 excursions"
    ],
    exclusions: [
      "International & Domestic Airfare",
      "Vietnam Visa and Travel Insurance",
      "Personal shopping and tips/gratuities"
    ]
  };

  const inclusionsHtml = packageData.inclusions.map(inc => '<li><span style="color:#D4AF37; margin-right:8px; font-weight:bold;">✓</span>' + inc + '</li>').join('\n');
  const exclusionsHtml = packageData.exclusions.map(exc => '<li><span style="color:#B8860B; margin-right:8px; font-weight:bold;">✗</span>' + exc + '</li>').join('\n');

  // Find a hero image from the public folder for the cover background
  let bgImageBase64 = hcmcSkyline;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${packageData.title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          padding: 0;
          color: #111111;
          background: #FAF7F0;
          -webkit-print-color-adjust: exact;
        }
        
        /* Landscape Slide Settings */
        .slide {
          width: 297mm;
          height: 210mm;
          padding: 20mm 25mm;
          position: relative;
          page-break-after: always;
          overflow: hidden;
          background-color: #FAF7F0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.025'/%3E%3C/svg%3E");
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Cover Slide */
        .cover-slide {
          background-color: #1E4D45;
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoisePremium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoisePremium)' opacity='0.025'/%3E%3C/svg%3E"),
            linear-gradient(rgba(18, 48, 43, 0.75), rgba(10, 28, 24, 0.96)),
            url("${bgImageBase64}");
          background-size: cover, cover, cover;
          background-position: center, center, center;
          color: #FFFFFF;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 30mm;
        }
        .cover-slide .logo {
          height: 55px;
          margin-bottom: 8px;
        }
        .cover-slide h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 500;
          letter-spacing: 0.08em;
          margin: 0 0 5px 0;
          color: #60A5FA; /* Blue accent matching color-brand-blue-light */
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .cover-slide .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 300;
          font-style: italic;
          color: #E8C84A; /* Yellow accent matching color-brand-gold-light */
          margin: 0 0 35px 0;
          letter-spacing: 0.08em;
        }
        .cover-slide h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          color: #FAF7F0;
          margin: 0 0 25px 0;
          letter-spacing: 0.03em;
        }
        .cover-slide .divider {
          width: 80px;
          height: 1px;
          background: #D4AF37;
          margin: 0 auto 30px auto;
        }
        .cover-slide .price-box {
          border: 1px solid rgba(212, 175, 55, 0.45);
          background: rgba(30, 77, 69, 0.55);
          backdrop-filter: blur(12px);
          padding: 18px 45px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }
        .cover-slide .price-box p {
          margin: 0 0 8px 0;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250, 247, 240, 0.85);
        }
        .cover-slide .price-box h3 {
          margin: 0;
          font-size: 36px;
          font-family: 'Cormorant Garamond', serif;
          color: #D4AF37;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* Standard Slide Layouts */
        .slide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(30, 77, 69, 0.12);
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .slide-header .brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 0.08em;
        }
        .slide-header .slide-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          font-style: italic;
          color: #1E4D45;
        }

        .slide-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(30, 77, 69, 0.12);
          padding-top: 12px;
          font-size: 10px;
          color: #777777;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Split Screen (Text + Image) */
        .split-container {
          display: flex;
          gap: 35px;
          flex: 1;
          margin-bottom: 20px;
          align-items: center;
        }
        .split-text {
          flex: 1.25;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .split-image {
          flex: 0.75;
          height: 120mm;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 4px;
          background: #FAF7F0;
        }
        .split-image-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 6px;
        }
        .split-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Typography */
        h3.day-indicator {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #B8860B;
          margin: 0 0 4px 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        h2.day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          color: #1E4D45;
          margin: 0 0 12px 0;
          font-weight: 500;
          line-height: 1.2;
        }
        p.day-desc {
          font-size: 13.5px;
          color: #444444;
          line-height: 1.65;
          margin: 0 0 20px 0;
          font-weight: 300;
        }

        /* Highlights bullet list */
        .highlights-list {
          margin: 0;
          padding-left: 20px;
          list-style: none;
        }
        .highlights-list li {
          font-size: 13.5px;
          color: #555555;
          margin-bottom: 10px;
          line-height: 1.55;
          position: relative;
        }
        .highlights-list li::before {
          content: "-";
          color: #D4AF37;
          position: absolute;
          left: -20px;
          font-size: 11px;
        }
        .highlights-list strong {
          color: #1E4D45;
          font-weight: 500;
        }

        /* Accommodations Grid */
        .hotel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          flex: 1;
          margin-bottom: 20px;
          align-items: center;
        }
        .hotel-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(200, 190, 170, 0.4);
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(46, 38, 20, 0.04);
          height: 115mm;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hotel-flex-top {
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }
        .hotel-thumb {
          width: 90px;
          height: 90px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #D4AF37;
          flex-shrink: 0;
        }
        .hotel-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hotel-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #1E4D45;
          margin: 0 0 5px 0;
          font-weight: 500;
        }
        .hotel-stars {
          color: #D4AF37;
          font-size: 16px;
          margin-bottom: 8px;
          letter-spacing: 2px;
        }
        .hotel-card .detail-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 8px 0;
          font-size: 13px;
          color: #555555;
        }
        .hotel-card .detail-row strong {
          color: #1E4D45;
        }
        .hotel-badge {
          display: inline-block;
          font-size: 10px;
          background: rgba(30, 77, 69, 0.08);
          color: #1E4D45;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Two columns layout (Inclusions / Exclusions) */
        .columns-container {
          display: flex;
          gap: 40px;
          flex: 1;
          margin-bottom: 20px;
        }
        .column-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          border: 1px solid rgba(200, 190, 170, 0.4);
          padding: 25px 30px;
          box-shadow: 0 10px 30px rgba(46, 38, 20, 0.03);
          display: flex;
          flex-direction: column;
        }
        .column-box h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #1E4D45;
          margin: 0 0 18px 0;
          border-bottom: 1px solid rgba(30, 77, 69, 0.15);
          padding-bottom: 10px;
          font-weight: 500;
        }
        .column-box ul {
          margin: 0;
          padding: 0;
          list-style: none;
          flex: 1;
          overflow: hidden;
        }
        .column-box li {
          font-size: 12.5px;
          color: #444444;
          margin-bottom: 10px;
          line-height: 1.55;
          display: flex;
          align-items: flex-start;
        }

        /* Thank you Slide details */
        .thank-you-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex: 1;
        }
        .thank-you-container h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          color: #FAF7F0;
          margin: 0 0 10px 0;
          font-weight: 300;
          letter-spacing: 0.08em;
        }
        .thank-you-container h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #E8C84A;
          margin: 0 0 35px 0;
          font-weight: 400;
          font-style: italic;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 800px;
          margin-top: 20px;
        }
        .contact-card {
          background: rgba(30, 77, 69, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          padding: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .contact-card h5 {
          margin: 0 0 8px 0;
          font-size: 11px;
          color: #E8C84A;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
        }
        .contact-card p {
          margin: 0;
          font-size: 13.5px;
          color: #FAF7F0;
          font-weight: 500;
        }

      </style>
    </head>
    <body>

      <!-- SLIDE 1: Cover -->
      <div class="slide cover-slide">
        <div class="logo">
          <img src="${logoSrc}" alt="Vietana Logo" style="height: 55px;" />
        </div>
        <h1>VIETANA</h1>
        <div class="tagline">Feel Vietnam, Your Way</div>
        <h2>${packageData.title}</h2>
        <div class="divider"></div>
        <div class="price-box">
          <p>Package Pricing per person (Twin Sharing)</p>
          <h3>₹${packageData.priceINR} <span style="font-size:16px; font-weight:300; color:#FAF7F0;">(Approx ${packageData.priceVND} VND)</span></h3>
        </div>
      </div>

      <!-- SLIDE 2: Highlights -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Tour Highlights</div>
        </div>
        <div class="split-container">
          <div class="split-text">
            <h2 class="day-title" style="font-size: 34px; margin-bottom: 8px;">Ho Chi Minh City & Da Lat Highlights</h2>
            <div style="font-family:'Cormorant Garamond', serif; font-size: 15px; color:#B8860B; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px; font-weight: 600;">
              Saigon Sunset ➔ Cu Chi Tunnels ➔ Xuan Huong Lake ➔ Datanla Coaster
            </div>
            <p class="day-desc">
              Discover the dynamic energy of Ho Chi Minh City combined with the romantic cool climates of Da Lat. Crawl the historic war tunnels of Cu Chi, cruise along the Saigon river at sunset, walk along the pine forest borders of Xuan Huong Lake, and ride the thrilling alpine coaster down to Datanla Waterfall.
            </p>
            <ul class="highlights-list">
              <li><strong>Ho Chi Minh City:</strong> Dive into rich historical highlights at the Cu Chi tunnels and cruise past glowing Saigon skyscrapers.</li>
              <li><strong>Da Lat Highlands:</strong> Enjoy temperate mountain air, explore flowers and clay art, and experience Datanla's adrenaline-inducing coaster.</li>
              <li><strong>Gastronomy Curation:</strong> Special Indian meal packages pre-selected at premium dining outlets throughout the tour.</li>
            </ul>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${hcmcSkyline}" alt="Ho Chi Minh City Skyline" />
            </div>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 2 / 9</div>
        </div>
      </div>

      <!-- SLIDE 3: Days 1 & 2 -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Daily Program (Days 1 - 2)</div>
        </div>
        <div class="split-container">
          <div class="split-text">
            <h3 class="day-indicator">Day 1</h3>
            <h2 class="day-title">Saigon Arrival & Sunset Cruise</h2>
            <p class="day-desc" style="margin-bottom: 25px;">
              Arrive in Ho Chi Minh City. Our driver welcomes you and transfers you to **Riverside Hotel Saigon (3★)**. In the evening, step onto a premium Saigon River Sunset Cruise, taking in the shimmering metropolis with a welcome drink.
            </p>

            <h3 class="day-indicator">Day 2</h3>
            <h2 class="day-title">Cu Chi Tunnels & Saigon City Tour</h2>
            <p class="day-desc" style="margin-bottom: 0;">
              Descend into the military underground network of Cu Chi. Enjoy a traditional Vietnamese lunch. In the afternoon, explore historic Saigon icons: War Remnants Museum, Independence Palace, Notre Dame Cathedral, and the Central Post Office.
            </p>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${hcmcSkyline}" alt="Saigon City" />
            </div>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 3 / 9</div>
        </div>
      </div>

      <!-- SLIDE 4: Days 3 & 4 -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Daily Program (Days 3 - 4)</div>
        </div>
        <div class="split-container">
          <div class="split-text">
            <h3 class="day-indicator">Day 3</h3>
            <h2 class="day-title">Fly to Da Lat & Xuan Huong Lake</h2>
            <p class="day-desc" style="margin-bottom: 25px;">
              Check out of your hotel and fly/transfer to Da Lat. Check into the comfortable **Tulip Hotel Group (3★)**. Spend your evening taking in the refreshing mountain breeze walking around Xuan Huong Lake and the Da Lat Night Market.
            </p>

            <h3 class="day-indicator">Day 4</h3>
            <h2 class="day-title">Datanla Alpine Coaster & Da Lat Highlights</h2>
            <p class="day-desc" style="margin-bottom: 0;">
              Hop on the famous alpine coaster winding through pine woods down to Datanla Waterfall. Visit the surreal Clay Tunnel, stroll the garden borders of the Valley of Love, and photograph the magnificent mosaic designs of Linh Phuoc Pagoda.
            </p>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${dalatWaterfall}" alt="Dalat Waterfall" />
            </div>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 4 / 9</div>
        </div>
      </div>

      <!-- SLIDE 5: Day 5 -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Daily Program (Day 5)</div>
        </div>
        <div class="split-container">
          <div class="split-text">
            <h3 class="day-indicator">Day 5</h3>
            <h2 class="day-title">Da Lat Leisure & Departure</h2>
            <p class="day-desc">
              Enjoy a morning breakfast overlooking the mountains. Stroll through the local markets or capture final souvenir photos. Meet your private driver for your transfer to Lien Khuong Airport (DLI) for your departure flight back home.
            </p>
            <ul class="highlights-list">
              <li><strong>Scenic Da Lat morning:</strong> Stroll near local cafes and flower vendors.</li>
              <li><strong>Check-out support:</strong> Dedicated assistance at Tulip Hotel.</li>
              <li><strong>Departure Transfer:</strong> Private, air-conditioned vehicle to Lien Khuong Airport.</li>
            </ul>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${dalatWaterfall}" alt="Dalat Scenery" />
            </div>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 5 / 9</div>
        </div>
      </div>

      <!-- SLIDE 6: Accommodations -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Selected Hotels</div>
        </div>
        <div class="hotel-grid">
          <div class="hotel-card">
            <div>
              <div class="hotel-flex-top">
                <div class="hotel-thumb">
                  <img src="${hotelRiversideImg}" alt="Riverside Hotel Saigon" />
                </div>
                <div>
                  <h4>Riverside Hotel Saigon</h4>
                  <div class="hotel-stars">
                    <span>★</span><span>★</span><span>★</span>
                  </div>
                  <span class="hotel-badge">Riverside Area</span>
                </div>
              </div>
              <p class="day-desc" style="font-size:12.5px; margin-top: 15px;">A classical French colonial-inspired hotel sitting directly along the Saigon River front, offering comfortable deluxe spaces and city conveniences.</p>
            </div>
            <div>
              <div class="detail-row">
                <span>Destination:</span>
                <strong>Ho Chi Minh City</strong>
              </div>
              <div class="detail-row">
                <span>Duration:</span>
                <strong>2 Nights</strong>
              </div>
              <div class="detail-row">
                <span>Room Style:</span>
                <strong>Deluxe Double or Twin</strong>
              </div>
            </div>
          </div>

          <div class="hotel-card">
            <div>
              <div class="hotel-flex-top">
                <div class="hotel-thumb">
                  <img src="${hotelTulipImg}" alt="Tulip Hotel Group" />
                </div>
                <div>
                  <h4>Tulip Hotel Group</h4>
                  <div class="hotel-stars">
                    <span>★</span><span>★</span><span>★</span>
                  </div>
                  <span class="hotel-badge">Mountain Center</span>
                </div>
              </div>
              <p class="day-desc" style="font-size:12.5px; margin-top: 15px;">Highly rated boutique hotel series located in Da Lat central square, placing you steps away from local food hubs, cafes, and Xuan Huong Lake.</p>
            </div>
            <div>
              <div class="detail-row">
                <span>Destination:</span>
                <strong>Da Lat Highlands</strong>
              </div>
              <div class="detail-row">
                <span>Duration:</span>
                <strong>2 Nights</strong>
              </div>
              <div class="detail-row">
                <span>Room Style:</span>
                <strong>Deluxe Double or Twin</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 6 / 9</div>
        </div>
      </div>

      <!-- SLIDE 7: Inclusions & Exclusions -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Package Details</div>
        </div>
        <div class="columns-container">
          <div class="column-box" style="border-left: 3px solid #1E4D45;">
            <h3>Inclusions</h3>
            <ul>
              ${inclusionsHtml}
            </ul>
          </div>
          <div class="column-box" style="border-left: 3px solid #B8860B;">
            <h3>Exclusions</h3>
            <ul>
              ${exclusionsHtml}
            </ul>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 7 / 9</div>
        </div>
      </div>

      <!-- SLIDE 8: Important Info -->
      <div class="slide">
        <div class="slide-header">
          <div class="brand">VIETANA</div>
          <div class="slide-title">Important Information</div>
        </div>
        <div class="columns-container">
          <div class="column-box">
            <h3>Traveler Checklist</h3>
            <ul style="list-style-type:none; padding:0;">
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Carry a passport valid for at least 6 months.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Warm layers / light jacket is highly recommended for Da Lat.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Comfortable walking shoes are recommended for tunnels & valleys.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Insect repellent and small umbrella for occasional highlands rain.</li>
            </ul>
          </div>
          <div class="column-box">
            <h3>Terms & Policy</h3>
            <ul style="list-style-type:none; padding:0;">
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Hotel check-in: 14:00 | Check-out: 12:00.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Tours operate on a private or small-group curated basis.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Alpine coaster is subject to ride-operator safety protocols.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Sightseeing routes can be tweaked dynamically upon request.</li>
            </ul>
          </div>
        </div>
        <div class="slide-footer">
          <div>VIETANA Bespoke Curation</div>
          <div>Page 8 / 9</div>
        </div>
      </div>

      <!-- SLIDE 9: Contact Us -->
      <div class="slide cover-slide" style="padding: 20mm;">
        <div class="thank-you-container">
          <h2>THANK YOU FOR YOUR ATTENTION</h2>
          <h3>We look forward to hosting you in Vietnam.</h3>
          
          <div class="contact-grid">
            <div class="contact-card">
              <h5>Official Website</h5>
              <p>vietana.com</p>
            </div>
            <div class="contact-card">
              <h5>Email Inquiries</h5>
              <p>booking@vietana.com</p>
            </div>
            <div class="contact-card">
              <h5>WhatsApp Hotline</h5>
              <p>+91 99532 94543</p>
            </div>
          </div>
        </div>
        <div class="slide-footer" style="border-top: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6);">
          <div>VIETANA GROUP ( copyright ) all rights reserved</div>
          <div>Page 9 / 9</div>
        </div>
      </div>

    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });
  
  const pdfPath = '/Users/chayansoni/Desktop/VIETANA_HCMC_Dalat_Explorer_Brochure.pdf';

  await page.pdf({
    path: pdfPath,
    width: '297mm',
    height: '210mm',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  console.log(`Brochure generated successfully at: ${pdfPath}`);
  await browser.close();
}

generateBrochure().catch(console.error);

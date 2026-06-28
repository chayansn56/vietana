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

  const hcmcSkyline = getBase64Image('hcmc_skyline_1782568902873.jpg');
  const mekongDelta = getBase64Image('mekong_delta_1782568914394.jpg');
  const phuQuocBeach = getBase64Image('phu_quoc_beach_1782568923590.jpg');
  const vinWonders = getBase64Image('vinwonders_phu_quoc_1782568935024.jpg');
  
  const hotelDucVuongImg = getBase64Image('page_8_img_2_X7.png');
  const hotelBayResortImg = getBase64Image('page_8_img_1_X6.png');

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
    title: "Ho Chi Minh City & Phu Quoc Explorer",
    duration: "5 Days / 4 Nights",
    priceVND: "7,735,000",
    priceINR: "28,000",
    hotels: [
      { city: "Ho Chi Minh City", name: "Duc Vuong Hotel", rating: "★★★", nights: "2 Nights" },
      { city: "Phu Quoc", name: "Bay Resort", rating: "★★★", nights: "2 Nights" }
    ],
    inclusions: [
      "Airport transfers in private A/C luxury vehicles",
      "Accommodation at Duc Vuong Hotel & Bay Resort",
      "Daily breakfast at both hotels",
      "All sightseeing entrance fees & activities ticket",
      "VinWonders Admission & Grand World visit",
      "3 Island Speedboat Adventure & Snorkeling equipment",
      "Cu Chi Tunnel Tour & Mekong Delta Tour with transfers",
      "Local lunch during Cu Chi Tunnel & 3 Island tours",
      "Complimentary drone footage & SUP board photos"
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
          content: "➔";
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
        .hotel-stars span {
          display: inline-block;
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
        <h2>Ho Chi Minh City & Phu Quoc Explorer</h2>
        <div class="divider"></div>
        <div class="price-box">
          <p>Package Pricing per person (Twin Sharing)</p>
          <h3>₹28,000 <span style="font-size:16px; font-weight:300; color:#FAF7F0;">(Approx 7,735,000 VND)</span></h3>
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
            <h2 class="day-title" style="font-size: 34px; margin-bottom: 8px;">Ho Chi Minh City & Phu Quoc Island</h2>
            <div style="font-family:'Cormorant Garamond', serif; font-size: 15px; color:#B8860B; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px; font-weight: 600;">
              Saigon ➔ Mekong Delta ➔ Phu Quoc Snorkeling ➔ VinWonders
            </div>
            <p class="day-desc">
              Experience the perfect balance of cultural discovery and island indulgence. Deep dive into Vietnam's history at the Cu Chi Tunnels, cruise through the canals of the Mekong Delta, visit the sleepless Venetian canals of Grand World, and spend a full day snorkeling in crystal-clear island waters.
            </p>
            <ul class="highlights-list">
              <li><strong>Ho Chi Minh City:</strong> Discover the vibrant local life, crawl through the historic Cu Chi Tunnels, and cruise the canals of Mekong Delta.</li>
              <li><strong>Phu Quoc Island:</strong> Immerse in Grand World, enjoy thrilling rides at VinWonders, and sail on a speedboat snorkeling adventure.</li>
              <li><strong>Premium Inclusions:</strong> Complimentary drone footage, SUP board photos, snorkeling gear, and delicious local lunches included.</li>
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
            <h2 class="day-title">Saigon Arrival & Leisure</h2>
            <p class="day-desc" style="margin-bottom: 25px;">
              Upon arrival at HCMC's Airport, you will be met by our representative and privately transferred to **Duc Vuong Hotel (3★)**. Spend the rest of the day at leisure exploring local streets, cafes, and rooftop views.
            </p>

            <h3 class="day-indicator">Day 2</h3>
            <h2 class="day-title">Cu Chi Tunnel & Mekong Delta</h2>
            <p class="day-desc" style="margin-bottom: 0;">
              Descend into the underground tunnels of Cu Chi. After a delicious local lunch, cruise through the Mekong Delta canals, ride hand-rowed sampans, visit local orchards, and listen to authentic Vietnamese folk music.
            </p>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${mekongDelta}" alt="Mekong Delta River" />
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
            <h2 class="day-title">Phu Quoc Flight & Grand World</h2>
            <p class="day-desc" style="margin-bottom: 25px;">
              Transfer to the airport for a short flight to Phu Quoc Island. Check-in to **Bay Resort (3★)**. In the evening, visit **Grand World Phu Quoc**, the Venetian-inspired city, to watch canal boat rides and colorful light shows.
            </p>

            <h3 class="day-indicator">Day 4</h3>
            <h2 class="day-title">3 Island Speedboat Snorkeling</h2>
            <p class="day-desc" style="margin-bottom: 0;">
              Sail on a speedboat tour. Snorkel among pristine coral reefs at Gam Ghi and Buom Islets. Swim in the turquoise waters of Hon May Rut Ngoai. Enjoy an island lunch with complimentary drone video footage and SUP photos.
            </p>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${phuQuocBeach}" alt="Phu Quoc Beach" />
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
            <h2 class="day-title">VinWonders Exploration & Departure</h2>
            <p class="day-desc">
              Visit **VinWonders Phu Quoc**, Vietnam's largest theme park. Walk through medieval worlds, fantasy kingdoms, water slide attractions, and view the massive sea turtle-shaped aquarium. Return to the resort to check out, followed by a private transfer to the airport for your flight back home.
            </p>
            <ul class="highlights-list">
              <li><strong>VinWonders Theme Park:</strong> Explore massive fantasy realms and water slides.</li>
              <li><strong>Turtle Aquarium:</strong> Walk through one of the largest ocean dome aquariums in the world.</li>
              <li><strong>Departure Transfer:</strong> Private, air-conditioned vehicle direct to the airport.</li>
            </ul>
          </div>
          <div class="split-image">
            <div class="split-image-inner">
              <img src="${vinWonders}" alt="VinWonders Theme Park" />
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
                  <img src="${hotelDucVuongImg}" alt="Duc Vuong Hotel Exterior" />
                </div>
                <div>
                  <h4>Duc Vuong Hotel</h4>
                  <div class="hotel-stars">
                    <span>★</span><span>★</span><span>★</span>
                  </div>
                  <span class="hotel-badge">City Center</span>
                </div>
              </div>
              <p class="day-desc" style="font-size:12.5px; margin-top: 15px;">Located in HCMC center, this hotel features award-winning rooftop bars, boutique rooms, and friendly hospitality catering to international travelers.</p>
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
                <strong>Double or Twin Sharing</strong>
              </div>
            </div>
          </div>

          <div class="hotel-card">
            <div>
              <div class="hotel-flex-top">
                <div class="hotel-thumb">
                  <img src="${hotelBayResortImg}" alt="Bay Resort Phu Quoc" />
                </div>
                <div>
                  <h4>Bay Resort Phu Quoc</h4>
                  <div class="hotel-stars">
                    <span>★</span><span>★</span><span>★</span>
                  </div>
                  <span class="hotel-badge">Seaside Beach</span>
                </div>
              </div>
              <p class="day-desc" style="font-size:12.5px; margin-top: 15px;">A modern seaside resort located in Phu Quoc, offering direct beach access, outdoor pools, beautiful rooms, and daily buffet breakfasts.</p>
            </div>
            <div>
              <div class="detail-row">
                <span>Destination:</span>
                <strong>Phu Quoc Island</strong>
              </div>
              <div class="detail-row">
                <span>Duration:</span>
                <strong>2 Nights</strong>
              </div>
              <div class="detail-row">
                <span>Room Style:</span>
                <strong>Double or Twin Sharing</strong>
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
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Carry swimwear, sunglasses, and high-SPF sunscreen.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Comfortable walking shoes are recommended for tunnels.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#D4AF37; margin-right:10px; font-weight:bold;">◆</span>Waterproof phone pouch for snorkeling is highly useful.</li>
            </ul>
          </div>
          <div class="column-box">
            <h3>Terms & Policy</h3>
            <ul style="list-style-type:none; padding:0;">
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Hotel check-in: 14:00 | Check-out: 12:00.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Tours operate on a shared (SIC) basis.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Activity schedules may shift based on weather conditions.</li>
              <li style="margin-bottom:12px; display:flex; align-items:center; font-size:13px; color:#444444;"><span style="color:#B8860B; margin-right:10px; font-weight:bold;">◇</span>Snorkeling is subject to sea and wave conditions.</li>
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
  
  const targetFolder = path.join(process.cwd(), 'public', 'itineraries', 'PDFs', 'Beach Escapes');
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  const pdfPath = path.join(targetFolder, 'ho_chi_minh_city_phu_quoc_explorer_5d4n_.pdf');

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

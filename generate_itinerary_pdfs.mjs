import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Define the 14 packages
const packages = [
  // First Time in Vietnam
  {
    category: "First Time in Vietnam",
    id: "unforgettable-vietnam",
    title: "Unforgettable Vietnam (5D4N)",
    duration: "5 Days / 4 Nights",
    destinations: ["Hanoi", "Da Nang"],
    hotels: ["Hanoi: 4-star boutique (3 Nights)", "Da Nang: 4-star beachfront resort (1 Night)"],
    inclusions: [
      "Airport transfers in private A/C vehicles",
      "Domestic flight from Hanoi to Da Nang",
      "Daily breakfast at hotels",
      "Hanoi guided street food tour",
      "Ninh Binh Day trip (Trang An & Mua Cave)",
      "Ba Na Hills & Golden Bridge VIP tour"
    ],
    exclusions: ["International flights", "E-visa fees", "Personal expenses", "Tips & gratuities"],
    days: [
      { day: 1, title: "Hanoi Arrival & Street Food Tour", description: "Arrive in Hanoi, private transfer to hotel. In the evening, explore the Old Quarter's best street food with a local expert." },
      { day: 2, title: "Hanoi City Tour & Train Street", description: "Visit Temple of Literature, Tran Quoc Pagoda, and experience the iconic Train Street." },
      { day: 3, title: "Ninh Binh Day Excursion", description: "Boat tour through Trang An scenic karst landscape and climb Mua Cave peak." },
      { day: 4, title: "Fly to Da Nang & Hoi An Lanterns", description: "Fly to Da Nang, check-in, and spend the evening exploring Hoi An Ancient Town." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", description: "Ride the cable car to Ba Na Hills, visit the Golden Bridge, and head to the airport for departure." }
    ]
  },
  {
    category: "First Time in Vietnam",
    id: "explore-hcmc-beach",
    title: "Explore Ho Chi Minh with Beach (5D4N)",
    duration: "5 Days / 4 Nights",
    destinations: ["Ho Chi Minh City", "Vung Tau"],
    hotels: ["Ho Chi Minh City: 4-star boutique (3 Nights)", "Vung Tau: 4-star seaside resort (1 Night)"],
    inclusions: [
      "All airport and land transfers in private vehicles",
      "Daily breakfast at hotels",
      "Saigon City guided heritage tour",
      "Cu Chi Tunnels historical excursion",
      "Mekong Delta day tour",
      "Vung Tau city tour"
    ],
    exclusions: ["International flights", "E-visa entry fees", "Personal tips"],
    days: [
      { day: 1, title: "Saigon Arrival & Skydeck", description: "Arrive in HCMC, check-in, and view the city from Bitexco Skydeck." },
      { day: 2, title: "Cu Chi Tunnels & Heritage Walk", description: "Explore the historic Cu Chi Tunnels and Saigon's French Quarter architecture." },
      { day: 3, title: "Mekong Delta Waterways", description: "Boat ride through Ben Tre coconut groves, local honey farm, and folk music." },
      { day: 4, title: "Transfer to Vung Tau Beach", description: "Drive to Vung Tau beach, check-in to your resort, and relax by the sea." },
      { day: 5, title: "Vung Tau Christ Statue & Departure", description: "Climb Jesus Statue peak, visit White Palace, and return directly to Saigon airport." }
    ]
  },
  {
    category: "First Time in Vietnam",
    id: "vietnam-highlights",
    title: "Vietnam Highlights (6D5N)",
    duration: "6 Days / 5 Nights",
    destinations: ["Hanoi", "Da Nang", "Ho Chi Minh City"],
    hotels: ["Hanoi: 4-star (2 Nights)", "Da Nang: 4-star (2 Nights)", "Ho Chi Minh City: 4-star (1 Night)"],
    inclusions: [
      "Private airport transfers and domestic flights",
      "Daily breakfast",
      "Halong Bay luxury day cruise",
      "Hoi An Ancient Town tour",
      "Ba Na Hills & Golden Bridge excursion",
      "Mekong Delta day tour"
    ],
    exclusions: ["International airfare", "E-visa", "Personal tips"],
    days: [
      { day: 1, title: "Hanoi Arrival & Old Quarter", description: "Arrive in Hanoi, check-in, and enjoy a cyclo ride around the historic streets." },
      { day: 2, title: "Halong Bay Day Cruise", description: "Drive to Halong Bay, board a luxury day cruise, and kayak through limestone caves." },
      { day: 3, title: "Fly to Da Nang & Hoi An", description: "Fly to Da Nang, visit Marble Mountains, and walk through historic Hoi An." },
      { day: 4, title: "Ba Na Hills Day Tour", description: "Excursion to Golden Bridge and French Village at Ba Na Hills." },
      { day: 5, title: "Fly to Saigon & City Sights", description: "Fly to Saigon, visit War Remnants Museum and Independence Palace." },
      { day: 6, title: "Mekong Delta & Departure", description: "Tour Mekong Delta orchards and transfer to airport for departure flight." }
    ]
  },
  
  // Beach Escapes
  {
    category: "Beach Escapes",
    id: "vinwonders-kiss-sea",
    title: "Vin Wonders and Kiss of the Sea (7D6N)",
    duration: "7 Days / 6 Nights",
    destinations: ["Phu Quoc", "Da Nang", "Ho Chi Minh City"],
    hotels: ["Phu Quoc: 4-star resort (3 Nights)", "Da Nang: 4-star resort (3 Nights)", "Ho Chi Minh City: 4-star (1 Night)"],
    inclusions: [
      "Private airport and local transfers",
      "Domestic flights (PQC-DAD, DAD-SGN)",
      "Tickets to VinWonders & Vinpearl Safari",
      "Kiss of the Sea show admission ticket",
      "Hoi An Ancient town and Ba Na Hills tours"
    ],
    exclusions: ["International airfare", "Personal items", "Tips"],
    days: [
      { day: 1, title: "Phu Quoc Arrival & Sunset Town", description: "Arrive in Phu Quoc, transfer to resort, and explore European-style Sunset Town." },
      { day: 2, title: "Vinpearl Safari & VinWonders Theme Park", description: "Full-day fun at Vinpearl Safari and VinWonders amusement park." },
      { day: 3, title: "Phu Quoc Island Tour & Kiss of the Sea", description: "Visit local pearl farm, Starfish Beach, and watch the spectacular Kiss of the Sea multi-media show." },
      { day: 4, title: "Fly to Da Nang & Hoi An", description: "Fly to Da Nang, check-in, and enjoy evening lanterns in Hoi An." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", description: "Full day at Ba Na Hills cable car and French gardens." },
      { day: 6, title: "Marble Mountains & Beach Relax", description: "Visit Marble Mountains and relax on My Khe beach." },
      { day: 7, title: "Fly to Saigon & Departure", description: "Fly to HCMC and catch your international connecting flight home." }
    ]
  },
  {
    category: "Beach Escapes",
    id: "phuquoc-island-tour",
    title: "Phu Quoc with 3 / 4 Island Tour (4n Phu Quoc)",
    duration: "5 Days / 4 Nights",
    destinations: ["Phu Quoc"],
    hotels: ["Phu Quoc: 4-star beachfront resort (4 Nights)"],
    inclusions: [
      "Private airport round-trip transfers",
      "Daily breakfast at the resort",
      "Speedboat 4-Island Tour (May Rut, Gam Ghi, Mong Tay, Buom)",
      "Snorkeling gear and seafood lunch during island tour",
      "Hon Thom Cable Car tickets"
    ],
    exclusions: ["Airfare", "Visa fees", "Dinner meals"],
    days: [
      { day: 1, title: "Phu Quoc Arrival & Grand World", description: "Arrive in Phu Quoc, private check-in, and evening tour of Grand World 'Venice' city." },
      { day: 2, title: "Speedboat 4-Island Tour & Snorkeling", description: "Embark on a speedboat tour to pristine islands, snorkeling, and a beach BBQ lunch." },
      { day: 3, title: "Hon Thom Cable Car & Aquatopia", description: "Ride the world's longest over-sea cable car to Hon Thom Pinepple Island and play at the waterpark." },
      { day: 4, title: "Starfish Beach & Pepper Farm", description: "Relax at Starfish Beach, visit local pepper and honey farms." },
      { day: 5, title: "Resort Leisure & Departure", description: "Enjoy pool amenities before checkout and private airport transfer." }
    ]
  },
  {
    category: "Beach Escapes",
    id: "danang-gateway",
    title: "Da Nang Gateway (5D4N)",
    duration: "5 Days / 4 Nights",
    destinations: ["Da Nang"],
    hotels: ["Da Nang: 4-star beachfront hotel (4 Nights)"],
    inclusions: [
      "Private round-trip airport transfers",
      "Cham Island Speedboat tour with snorkeling & lunch",
      "Ba Na Hills & Golden Bridge tickets with private transfers",
      "Hoi An Ancient Town guided walk"
    ],
    exclusions: ["Flights", "Personal tips", "E-visa"],
    days: [
      { day: 1, title: "Da Nang Arrival & Dragon Bridge", description: "Arrive in Da Nang, transfer to beachfront hotel, and see Dragon Bridge fire show." },
      { day: 2, title: "Cham Island Excursion", description: "Speedboat to Cham Island (Cu Lao Cham), snorkeling, and seafood lunch." },
      { day: 3, title: "Ba Na Hills & Golden Bridge", description: "Visit Ba Na Hills theme park and snap photos on the Golden Bridge." },
      { day: 4, title: "Marble Mountains & Hoi An Town", description: "Explore limestone caves at Marble Mountains and stroll Hoi An lanterns." },
      { day: 5, title: "Beach morning & Departure", description: "Checkout and transfer to Da Nang International Airport." }
    ]
  },

  // Honeymoons & Romance
  {
    category: "Honeymoons & Romance",
    id: "mesmerizing-dalat",
    title: "Mesmerizing Dalat (4D3N)",
    duration: "4 Days / 3 Nights",
    destinations: ["Ho Chi Minh City", "Da Lat"],
    hotels: ["Ho Chi Minh City: 4-star (1 Night)", "Da Lat: 4-star romantic resort (2 Nights)"],
    inclusions: [
      "All airport and land transfers in private vehicles",
      "Domestic flight from Saigon to Da Lat",
      "Dalat city valley tour",
      "Romantic coffee shop guide",
      "Clay tunnel and flower garden tickets"
    ],
    exclusions: ["International airfare", "Meals not specified"],
    days: [
      { day: 1, title: "Saigon Arrival & Dinner Cruise", description: "Arrive in HCMC, check-in, and enjoy a romantic dinner cruise on Saigon River." },
      { day: 2, title: "Fly to Da Lat - City of Love", description: "Fly to cool highlands of Da Lat. Check-in to a romantic resort, and stroll around Xuan Huong Lake." },
      { day: 3, title: "Valley of Love & Clay Tunnel", description: "Explore the Valley of Love, Datanla waterfalls alpine coaster, and the whimsical Clay Tunnel." },
      { day: 4, title: "Flower Gardens & Return", description: "Visit Dalat flower garden, Linh Phuoc pagoda, and return to airport." }
    ]
  },
  {
    category: "Honeymoons & Romance",
    id: "honeymoon-getaway",
    title: "Honeymoon Getaway (8D7N)",
    duration: "8 Days / 7 Nights",
    destinations: ["Hanoi", "Da Nang", "Phu Quoc", "Ho Chi Minh City"],
    hotels: ["Hanoi: luxury (2 Nights)", "Da Nang: beachfront (2 Nights)", "Phu Quoc: romantic villa (2 Nights)", "Ho Chi Minh City: 4-star (1 Night)"],
    inclusions: [
      "Private transfers and domestic flights",
      "Daily couple's breakfast",
      "Halong Bay luxury day cruise",
      "Ba Na Hills & Hoi An lantern boat ride",
      "Phu Quoc sunset cruise with candlelit dinner"
    ],
    exclusions: ["Flights", "Tips", "Visas"],
    days: [
      { day: 1, title: "Hanoi Arrival & Spa Treatment", description: "Arrive in Hanoi, check-in, and unwind with a couple's luxury spa session." },
      { day: 2, title: "Halong Bay Luxury Day Cruise", description: "Sail past limestone caves and enjoy a boutique buffet on board." },
      { day: 3, title: "Fly to Da Nang & Hoi An Boat Ride", description: "Fly to Da Nang, check-in, and ride a lantern boat in Hoi An." },
      { day: 4, title: "Ba Na Hills & Golden Bridge", description: "Spend a beautiful day together on the Golden Bridge." },
      { day: 5, title: "Fly to Phu Quoc Paradise", description: "Fly to Phu Quoc tropical island, check-in to a private pool villa." },
      { day: 6, title: "Island Sunset Cruise & Dinner", description: "Enjoy a private catamaran sunset cruise with a candlelight seafood dinner." },
      { day: 7, title: "Fly to Saigon & Rooftop Lounge", description: "Fly to HCMC, check-in, and enjoy evening cocktails at a rooftop lounge." },
      { day: 8, title: "Saigon shopping & Departure", description: "Private airport transfer for your return flight home." }
    ]
  },
  {
    category: "Honeymoons & Romance",
    id: "valley-of-love",
    title: "Valley of Love (7D6N)",
    duration: "7 Days / 6 Nights",
    destinations: ["Ho Chi Minh City", "Da Lat", "Vung Tau"],
    hotels: ["Ho Chi Minh City: 4-star (2 Nights)", "Da Lat: 4-star (2 Nights)", "Vung Tau: 4-star (2 Nights)"],
    inclusions: [
      "Private vehicle transfers",
      "Daily breakfast at hotels",
      "Dalat waterfall coaster and Valley of Love tickets",
      "Vung Tau beach tour"
    ],
    exclusions: ["Airfare", "Personal spending"],
    days: [
      { day: 1, title: "Saigon Arrival & Café Apartment", description: "Arrive in HCMC, check-in, and visit the famous Walking Street Café Apartment." },
      { day: 2, title: "Cu Chi Tunnels tour", description: "Morning tour of Cu Chi Tunnels, afternoon free for shopping at Ben Thanh market." },
      { day: 3, title: "Drive to Da Lat Highlands", description: "Scenic road trip to Da Lat. Check-in and explore Dalat Night Market." },
      { day: 4, title: "Valley of Love & Waterfall Coaster", description: "Spend the day in the Valley of Love and ride the Datanla alpine coaster." },
      { day: 5, title: "Drive to Vung Tau Beach", description: "Drive from highlands to Vung Tau beach. Watch the sunset on Back Beach." },
      { day: 6, title: "Vung Tau Sightseeing", description: "Visit Vung Tau Lighthouse, Giant Christ Statue, and enjoy local seafood." },
      { day: 7, title: "Return to Saigon Airport", description: "Private transfer from Vung Tau directly to HCMC Airport for departure." }
    ]
  },

  // Family Holidays
  {
    category: "Family Holidays",
    id: "explore-vietnam",
    title: "Explore Vietnam (10D9N)",
    duration: "10 Days / 9 Nights",
    destinations: ["Ho Chi Minh City", "Phu Quoc", "Hanoi", "Da Nang"],
    hotels: ["Ho Chi Minh City (2 Nights)", "Phu Quoc (3 Nights)", "Hanoi (3 Nights)", "Da Nang (1 Night)"],
    inclusions: [
      "All airport and city transfers in family private A/C coaches",
      "Domestic flights (SGN-PQC, PQC-HAN, HAN-DAD)",
      "VinWonders Phu Quoc & Safari entrance tickets",
      "Halong Bay day cruise from Hanoi",
      "Ba Na Hills & Hoi An ancient town tours"
    ],
    exclusions: ["Airfare", "Visa fees", "Tips"],
    days: [
      { day: 1, title: "Saigon Welcoming", description: "Arrive in Saigon, check-in, and enjoy a family dinner of Indian cuisine." },
      { day: 2, title: "Saigon City & Ben Thanh Shopping", description: "Explore Independence Palace, Notre Dame, and Ben Thanh Market." },
      { day: 3, title: "Fly to Phu Quoc & Safari", description: "Fly to Phu Quoc and visit Vinpearl Open Safari park." },
      { day: 4, title: "VinWonders Theme Park", description: "Full-day fun at VinWonders theme park and water park." },
      { day: 5, title: "Phu Quoc Snorkeling Tour", description: "Boat trip to islands for snorkeling, fishing, and sunset." },
      { day: 6, title: "Fly to Hanoi & Old Quarter", description: "Fly to Hanoi, check-in, and attend a Water Puppet Show." },
      { day: 7, title: "Halong Bay Cruise excursion", description: "Day cruise to see limestone peaks, caves, and kayak." },
      { day: 8, title: "Hanoi Train Street & Fly to Da Nang", description: "Visit Train Street, fly to Da Nang, and walk through Hoi An lanterns." },
      { day: 9, title: "Ba Na Hills & Golden Bridge", description: "Full day at Ba Na Hills cable car and bridge." },
      { day: 10, title: "Da Nang Airport Departure", description: "Checkout and transfer to Da Nang Airport for departure." }
    ]
  },
  {
    category: "Family Holidays",
    id: "best-of-vietnam",
    title: "Best of Vietnam (7D6N)",
    duration: "7 Days / 6 Nights",
    destinations: ["Hanoi", "Da Nang", "Ho Chi Minh City"],
    hotels: ["Hanoi: 4-star (3 Nights)", "Da Nang: 4-star (2 Nights)", "Ho Chi Minh City: 4-star (1 Night)"],
    inclusions: [
      "Private transfers and domestic flights",
      "Halong Bay overnight luxury cruise",
      "Ba Na Hills and Hoi An ancient town tours",
      "Cu Chi Tunnels Saigon excursion"
    ],
    exclusions: ["Flights", "Visas", "Tips"],
    days: [
      { day: 1, title: "Hanoi Arrival", description: "Arrive in Hanoi, check-in, and stroll around Hoan Kiem Lake." },
      { day: 2, title: "Hanoi to Halong Bay Cruise", description: "Board luxury overnight cruise, enjoy meals and kayaking." },
      { day: 3, title: "Return to Hanoi & Train Street", description: "Disembark cruise, return to Hanoi, and view the Train Street." },
      { day: 4, title: "Fly to Da Nang & Hoi An", description: "Fly to Da Nang, check-in, and visit Hoi An Ancient Town." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", description: "Visit French Village and snap family photos on the Golden Bridge." },
      { day: 6, title: "Fly to Saigon & City Tour", description: "Fly to Saigon, visit War Remnants Museum." },
      { day: 7, title: "Cu Chi Tunnels & Departure", description: "Visit historical Cu Chi Tunnels and transfer to airport." }
    ]
  },
  {
    category: "Family Holidays",
    id: "incredible-hanoi-danang",
    title: "Incredible Hanoi and Da Nang (5D4N)",
    duration: "5 Days / 4 Nights",
    destinations: ["Hanoi", "Da Nang"],
    hotels: ["Hanoi: 4-star (2 Nights)", "Da Nang: 4-star (2 Nights)"],
    inclusions: [
      "Private airport and hotel transfers",
      "Domestic flight from Hanoi to Da Nang",
      "Halong Bay luxury day cruise",
      "Ba Na Hills cable car and Golden Bridge tickets",
      "Hoi An Ancient town tour"
    ],
    exclusions: ["Airfare", "E-visa", "Tips"],
    days: [
      { day: 1, title: "Hanoi Arrival & Cycle Tour", description: "Arrive in Hanoi, check-in, and enjoy a cycle ride through 36 guild streets." },
      { day: 2, title: "Halong Bay Day Cruise", description: "Excursion to Halong Bay, board cruise, explore caves." },
      { day: 3, title: "Fly to Da Nang & Hoi An Town", description: "Fly to Da Nang and walk through illuminated Hoi An." },
      { day: 4, title: "Ba Na Hills & Golden Bridge", description: "Cable car up Ba Na Hills and snap photos on Golden Bridge." },
      { day: 5, title: "Marble Mountains & Departure", description: "Explore Marble Mountains cave temples and transfer to airport." }
    ]
  }
];

async function generatePDFs() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  for (const pkg of packages) {
    const page = await browser.newPage();
    
    // Build premium editorial HTML layout
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${pkg.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'DM Sans', sans-serif;
            margin: 0;
            padding: 40px;
            color: #111111;
            background: #FAF7F0;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #1E4D45;
            padding-bottom: 20px;
            margin-bottom: 40px;
          }
          .logo img {
            height: 60px;
          }
          .contact-info {
            text-align: right;
            font-size: 11px;
            font-family: monospace;
            color: #555555;
            line-height: 1.6;
          }
          .title-section {
            margin-bottom: 40px;
          }
          h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 36px;
            color: #1E4D45;
            margin: 0 0 10px 0;
            font-weight: 400;
          }
          .meta {
            font-size: 12px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #B8860B;
            font-weight: 700;
            margin-bottom: 20px;
          }
          h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 22px;
            color: #1E4D45;
            border-bottom: 1px solid rgba(30, 77, 69, 0.2);
            padding-bottom: 8px;
            margin-top: 30px;
          }
          .days-container {
            margin-bottom: 40px;
          }
          .day-block {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .day-num {
            font-family: 'Cormorant Garamond', serif;
            font-size: 18px;
            color: #B8860B;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .day-title {
            font-weight: 600;
            font-size: 14px;
            color: #1E4D45;
            margin-bottom: 8px;
          }
          .day-desc {
            font-size: 13px;
            color: #555555;
            line-height: 1.6;
            font-weight: 300;
          }
          .list-container {
            display: flex;
            gap: 40px;
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          .list-box {
            flex: 1;
          }
          ul {
            padding-left: 20px;
            margin: 0;
          }
          li {
            font-size: 13px;
            color: #444444;
            margin-bottom: 8px;
            line-height: 1.5;
          }
          .footer {
            margin-top: 60px;
            border-top: 1px solid #E8E4D9;
            padding-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #888888;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            <img src="${logoSrc}" alt="Vietana Logo" />
          </div>
          <div class="contact-info">
            VIETANA TRAVEL DMC<br/>
            Email: VIETANA@vietana.com<br/>
            Booking: booking@vietana.com<br/>
            Web: www.vietana.com
          </div>
        </div>

        <div class="title-section">
          <div class="meta">${pkg.category.toUpperCase()} // ${pkg.duration.toUpperCase()}</div>
          <h1>${pkg.title}</h1>
          <div class="meta" style="color: #555555; font-weight: 400;">ROUTE: ${pkg.destinations.join(' ➔ ')}</div>
        </div>

        <h2>RECOMMENDED STAY</h2>
        <ul>
          ${pkg.hotels.map(h => `<li>🏨 ${h}</li>`).join('')}
        </ul>

        <h2>DAY-BY-DAY ITINERARY</h2>
        <div class="days-container">
          ${pkg.days.map(d => `
            <div class="day-block">
              <div class="day-num">Day ${d.day}</div>
              <div class="day-title">${d.title}</div>
              <div class="day-desc">${d.description}</div>
            </div>
          `).join('')}
        </div>

        <div class="list-container">
          <div class="list-box">
            <h2>INCLUSIONS</h2>
            <ul>
              ${pkg.inclusions.map(inc => `<li>✓ ${inc}</li>`).join('')}
            </ul>
          </div>
          <div class="list-box">
            <h2>EXCLUSIONS</h2>
            <ul>
              ${pkg.exclusions.map(exc => `<li>✗ ${exc}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="footer">
          VIETANA DMC HCMC © 2026 | VIETANA@vietana.com | booking@vietana.com
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    // Create folders if they don't exist
    const categoryFolder = path.join(process.cwd(), 'public', 'itineraries', 'PDFs', pkg.category);
    if (!fs.existsSync(categoryFolder)) {
      fs.mkdirSync(categoryFolder, { recursive: true });
    }

    const pdfName = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.pdf';
    const pdfPath = path.join(categoryFolder, pdfName);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '20mm',
        right: '20mm'
      }
    });

    console.log(`Generated PDF for ${pkg.title} at ${pdfPath}`);
    await page.close();
  }

  await browser.close();
  console.log("All PDFs generated successfully!");
}

generatePDFs().catch(console.error);

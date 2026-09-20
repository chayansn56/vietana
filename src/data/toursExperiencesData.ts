// =============================================================================
// VIETANA TOURS & EXPERIENCES DATA CATALOGUE
// Primary Source: VIETANA Verified Partner Operations Catalogue
// STRICT CONSTRAINT: ALL NUMERICAL PRICING EXCLUDED AT THIS STAGE.
// Multi-currency pricing will be added in a separate pricing layer later.
// =============================================================================

export type TourRegion = 'North Vietnam' | 'South Vietnam' | 'Central Vietnam' | 'Transfers';

export type TourCategory = 
  | 'City Tour'
  | 'Day Trip'
  | 'Nature'
  | 'Culture'
  | 'History'
  | 'Food'
  | 'Adventure'
  | 'Cruise'
  | 'Island / Beach'
  | 'Private Experience'
  | 'Group Tour'
  | 'Transfer';

export type DurationType = 'half_day' | 'full_day' | 'evening' | 'multi_day' | 'transfer';

export type TourFormat = 
  | 'join_group'
  | 'small_group'
  | 'vip_group'
  | 'private'
  | 'luxury_dcar'
  | 'vintage_jeep'
  | 'motorbike';

export interface TourExperienceVariant {
  id: string;
  name: string;
  format: TourFormat;
  vehicleType?: string;
  groupSize?: string;
  inclusionsAddon?: string[];
  notes?: string;
  priceVND?: number;
  priceINR?: number;
}

export interface TourItineraryItem {
  time?: string;
  title: string;
  description: string;
}

export interface DietaryInformation {
  standard: string;
  vegetarianAvailable: boolean;
  jainAvailable: boolean;
  pureVegAvailable: boolean;
  notes: string;
}

export interface TourExperience {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  destination: string;
  destinations?: string[];
  region: TourRegion;
  category: TourCategory;
  duration: string;
  durationType: DurationType;
  durationTypes?: DurationType[];
  departureCity: string;
  departureDetails: string;
  destinationDetails: string;

  description: string;
  heroImage: string;
  galleryImages?: string[];

  tourFormats: string[];
  groupOptions: string[];
  transportOptions: string[];

  minimumPax?: number;
  maximumPax?: number;

  guide: string;
  languages: string[];

  highlights: string[];
  itinerary: TourItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  optionalItems?: string[];

  pickupInformation: string;
  dropoffInformation: string;

  childPolicy: string;
  cancellationPolicy: string;
  importantNotes: string[];
  advisory?: string;

  dietaryInformation: DietaryInformation;

  supplier: string;
  supplierProductName: string;
  source: string;
  sourceUpdatedAt: string;

  priceVND?: number;
  priceINR?: number;
  variants: TourExperienceVariant[];
}

export const TOURS_EXPERIENCES_DATA: TourExperience[] = [
  {
    "id": "hanoi-city-highlights",
    "slug": "hanoi-city-highlights",
    "title": "Hanoi Capital City Highlights Full-Day Tour",
    "shortTitle": "Hanoi City Tour",
    "destination": "Hanoi",
    "region": "North Vietnam",
    "category": "City Tour",
    "duration": "Half-Day (~4 Hours) / Full-Day (~8 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:45 - 08:30)",
    "destinationDetails": "Key cultural and historical landmarks across Hanoi",
    "description": "Discover the thousand-year-old heritage of Vietnam's capital. Explore the sacred Tran Quoc Pagoda on West Lake, the historic Ho Chi Minh Complex, the historic Temple of Literature (Vietnam's first university), and the notorious Hoa Lo Prison (\"Hanoi Hilton\").",
    "heroImage": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Half-Day",
      "Join Group Full-Day",
      "Private Full-Day"
    ],
    "groupOptions": [
      "Join Group (Max 25)",
      "Private Charter (2-3 pax, 4-5 pax, 6+ pax)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Bus",
      "Private Car / Van"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Local Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit Tran Quoc Pagoda on West Lake, the oldest Buddhist pagoda in Hanoi",
      "Explore the Ho Chi Minh Complex: Mausoleum, Presidential Palace grounds, Stilt House, and One Pillar Pagoda",
      "Tour the Temple of Literature (Van Mieu), Vietnam's first national university founded in 1070",
      "Gain profound historical insight at Hoa Lo Prison Museum (\"Hanoi Hilton\")",
      "Stroll around the iconic Hoan Kiem Lake and visit Ngoc Son Temple"
    ],
    "itinerary": [
      {
        "time": "07:45 - 08:30",
        "title": "Hotel Pickup",
        "description": "Pickup from your hotel in Hanoi Old Quarter. Depart to start the city discovery."
      },
      {
        "time": "08:45",
        "title": "Tran Quoc Pagoda",
        "description": "Visit Tran Quoc Pagoda located on an islet in West Lake, celebrated for its serene beauty and six-century-old Buddhist architecture."
      },
      {
        "time": "09:30",
        "title": "Ho Chi Minh Complex",
        "description": "Visit the Ho Chi Minh Mausoleum (view from outside on maintenance days), Ba Dinh Square, the Presidential Palace gardens, Uncle Ho's Stilt House, and the unique One Pillar Pagoda."
      },
      {
        "time": "11:15",
        "title": "Vietnam Museum of Ethnology / Women's Museum",
        "description": "Discover the diverse cultures of Vietnam's 54 ethnic groups (Ethnology Museum on Tue/Thu/Sat/Sun or Women's Museum on Mon/Wed/Fri)."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy a traditional Vietnamese lunch at a local restaurant (Full-Day tour only; Half-day tour concludes here)."
      },
      {
        "time": "13:45",
        "title": "Temple of Literature",
        "description": "Explore the Temple of Literature (Van Mieu - Quoc Tu Giam), dedicated to Confucius and Vietnam's ancient scholars."
      },
      {
        "time": "15:00",
        "title": "Hoa Lo Prison Historical Relic",
        "description": "Visit the historic Hoa Lo Prison, built by French colonists and later used during the Vietnam War."
      },
      {
        "time": "16:15",
        "title": "Hoan Kiem Lake & Ngoc Son Temple",
        "description": "Stroll around Hoan Kiem Lake and cross the red The Huc Bridge to Ngoc Son Temple."
      },
      {
        "time": "17:00",
        "title": "Return to Hotel",
        "description": "Bus drops guests back at hotels in Hanoi Old Quarter. Tour concludes."
      }
    ],
    "inclusions": [
      "Air-conditioned tourist vehicle with driver",
      "Licensed English-speaking tour guide",
      "All entrance tickets and sightseeing fees",
      "Vietnamese set lunch at local restaurant (Full-Day tour only)",
      "Complimentary bottled water on vehicle"
    ],
    "exclusions": [
      "Lunch (on Half-Day tour option)",
      "Beverages and personal expenses",
      "Tips / gratuities for guide and driver"
    ],
    "optionalItems": [
      "Water Puppet Show tickets",
      "Cyclo ride in Old Quarter"
    ],
    "pickupInformation": "Complimentary pickup from all hotels located in Hanoi Old Quarter. Guests outside the Old Quarter meet at the designated central meeting point.",
    "dropoffInformation": "Dropoff at original hotel or central Hanoi Old Quarter location.",
    "childPolicy": "Children under 3 years old: Free of charge (sitting and sharing meals with parents). Children 3–7 years old: 75% of adult rate (private seat and meal). Children 8 years and older: Adult rate.",
    "cancellationPolicy": "Regular Days: Cancel 3+ days before departure: 30% fee; 2 days before: 50% fee; 1 day before: 100% fee. Holidays / Tet: Cancel 5+ days before: 30% fee; 3 days before: 50% fee; 2 days before: 100% fee.",
    "importantNotes": [
      "Guests must arrive on time; The tour operator is not responsible for guests arriving more than 5 minutes late at the pickup location.",
      "Modest attire required: Shoulders and knees must be covered when visiting Ho Chi Minh Mausoleum, temples, and pagodas.",
      "Mausoleum is closed on Mondays and Fridays (exterior visit only), and annual maintenance periods (usually Oct-Nov)."
    ],
    "dietaryInformation": {
      "standard": "Traditional Vietnamese set menu included on Full-Day tour.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options can be requested in advance. Jain / Pure Vegetarian meals are not confirmed in operator menu."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HANOI CITY TOUR FULL-DAY / HALF-DAY / HANOI CITY HIGHLIGHTS FULL-DAY",
    "source": "(TA) Ha Noi City Tour.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hanoi-city-half-day",
        "name": "Half-Day Join Group (Morning/Afternoon)",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "inclusionsAddon": [],
        "notes": "Does not include lunch.",
        "priceVND": 750000,
        "priceINR": 2775
      },
      {
        "id": "hanoi-city-full-day-join",
        "name": "Full-Day Join Group",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "inclusionsAddon": [
          "Vietnamese lunch included"
        ],
        "notes": "Comprehensive full day.",
        "priceVND": 1000000,
        "priceINR": 3700
      },
      {
        "id": "hanoi-city-full-day-private",
        "name": "Full-Day Private Tour",
        "format": "private",
        "vehicleType": "Private AC Sedan/SUV/Van",
        "groupSize": "Private (2-3 pax, 4-5 pax, 6+ pax)",
        "inclusionsAddon": [
          "Private guide & vehicle",
          "Vietnamese lunch included"
        ],
        "notes": "Flexible schedule.",
        "priceVND": 2250000,
        "priceINR": 8325
      }
    ],
    "durationTypes": [
      "half_day",
      "full_day"
    ],
    "advisory": "Sacred Site Etiquette: Temple of Literature and Tran Quoc Pagoda require respectful attire with shoulders and knees covered.",
    "priceVND": 750000,
    "priceINR": 2775
  },
  {
    "id": "hanoi-city-bat-trang",
    "slug": "hanoi-city-bat-trang",
    "title": "Hanoi City Tour & Bat Trang Pottery Village",
    "shortTitle": "Hanoi & Bat Trang",
    "destination": "Hanoi",
    "region": "North Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~8 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:45 - 08:30)",
    "destinationDetails": "Hanoi highlights & Bat Trang pottery village (Gia Lam)",
    "description": "Combine the cultural landmarks of central Hanoi with a visit to Bat Trang, a historic 700-year-old ceramic and pottery craft village on the banks of the Red River. Observe artisans shaping clay and try your hand at the pottery wheel.",
    "heroImage": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Bus"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Local Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore Tran Quoc Pagoda, Ho Chi Minh Complex, and Temple of Literature",
      "Visit Bat Trang Ceramic Village, dating back over 7 centuries",
      "Witness master craftsmen hand-painting intricate porcelain patterns",
      "Hands-on experience: Shape your own ceramic souvenir on the potter's wheel",
      "Stroll through the bustling village market filled with fine ceramics"
    ],
    "itinerary": [
      {
        "time": "07:45 - 08:30",
        "title": "Hotel Pickup",
        "description": "Pickup from hotel in Hanoi Old Quarter."
      },
      {
        "time": "08:45",
        "title": "Tran Quoc Pagoda & Ho Chi Minh Complex",
        "description": "Visit Tran Quoc Pagoda on West Lake, followed by the Ho Chi Minh Mausoleum, Stilt House, and One Pillar Pagoda."
      },
      {
        "time": "11:15",
        "title": "Temple of Literature",
        "description": "Visit the historic Confucian Academy and ancient courtyards."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy Vietnamese lunch at a local restaurant."
      },
      {
        "time": "13:45",
        "title": "Depart for Bat Trang Village",
        "description": "Travel ~13 km east of Hanoi along the Red River dyke to Bat Trang Ceramic Village."
      },
      {
        "time": "14:15",
        "title": "Pottery Workshop & Village Exploration",
        "description": "Tour traditional workshops, learn ancient kiln techniques, and try making your own pottery cup or bowl."
      },
      {
        "time": "16:15",
        "title": "Return to Hanoi",
        "description": "Drive back to Hanoi center and Old Quarter hotels by ~17:00."
      }
    ],
    "inclusions": [
      "Air-conditioned tourist bus",
      "English-speaking guide",
      "All entrance tickets",
      "Vietnamese set lunch",
      "Hands-on pottery workshop fee",
      "Bottled water"
    ],
    "exclusions": [
      "Beverages and personal expenses",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Finished ceramic glazing and shipping service"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:45 and 08:30.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter hotels at ~17:00.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Wear comfortable clothes suitable for hands-on pottery making."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal available upon request at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HANOI CITY TOUR - BAT TRANG",
    "source": "BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Item 30)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hanoi-bat-trang-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "priceVND": 1050000,
        "priceINR": 3885
      }
    ],
    "priceVND": 1050000,
    "priceINR": 3885
  },
  {
    "id": "quang-phu-cau-incense-village",
    "slug": "quang-phu-cau-incense-village",
    "title": "Quang Phu Cau Incense Village Half-Day Tour",
    "shortTitle": "Incense Craft Village",
    "destination": "Hanoi",
    "region": "North Vietnam",
    "category": "Culture",
    "duration": "Half-Day (~5 Hours) / Full-Day (~8 Hours)",
    "durationType": "half_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (08:00 - 08:30)",
    "destinationDetails": "Quang Phu Cau Village, Ung Hoa District, Hanoi (~35 km)",
    "description": "Immerse yourself in a sea of vibrant red and multi-colored incense bouquets drying under the sun at Quang Phu Cau, a village with over a century of traditional incense-making heritage. Capture world-famous photographic moments and discover how incense sticks are cut, dipped, and perfumed.",
    "heroImage": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Half-Day",
      "Join Group Full-Day"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Bus"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Marvel at thousands of bright red incense bundles arranged like giant flowers",
      "Learn the century-old artisan process of bamboo cutting, dyeing, and scented coating",
      "Unbeatable photo opportunities on elevated viewing platforms",
      "Interact with warm local craftspeople and learn the spiritual role of incense in Vietnam",
      "Full-day option includes nearby conical hat village (Chuong Village) and traditional lunch"
    ],
    "itinerary": [
      {
        "time": "08:00 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from Hanoi Old Quarter hotels and drive southward through the countryside."
      },
      {
        "time": "09:45",
        "title": "Arrive in Quang Phu Cau Village",
        "description": "Walk through courtyards where incense bundles are dried in spectacular patterns. Meet local artisans and observe bamboo splitting, dipping, and drying."
      },
      {
        "time": "11:30",
        "title": "Photo Session & Craft Experience",
        "description": "Capture stunning photographs from ground and aerial viewing platforms. Try dyeing incense sticks under the guidance of artisans."
      },
      {
        "time": "12:30",
        "title": "Lunch / Departure",
        "description": "Half-day tour departs back to Hanoi. Full-day tour continues to a local restaurant for lunch and an afternoon visit to Chuong conical hat making village."
      },
      {
        "time": "14:00 (Half-day) / 17:00 (Full-day)",
        "title": "Return to Hanoi",
        "description": "Arrive back at your hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Round-trip air-conditioned transportation",
      "English-speaking tour guide",
      "Village entrance and courtyard photography fees",
      "Vietnamese lunch (Full-day tour only)",
      "Bottled drinking water"
    ],
    "exclusions": [
      "Lunch on Half-day tour",
      "Personal expenses and photography tips",
      "Tips for driver and guide"
    ],
    "optionalItems": [
      "Purchasing handcrafted scented incense packs"
    ],
    "pickupInformation": "Pickup at hotels in Hanoi Old Quarter between 08:00 and 08:30.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter at 13:30 (half-day) or 17:00 (full-day).",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Incense drying is weather-dependent; sunny days offer the most vibrant outdoor displays.",
      "Wear comfortable shoes and bring sunscreen and camera/smartphone with ample storage."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch on Full-day tour only.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal can be requested for Full-Day tour. No lunch on Half-Day tour."
    },
    "supplier": "SST Travel",
    "supplierProductName": "LANG HUONG - QUANG PHU CAU - HALF DAY / FULL DAY",
    "source": "BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 31 & 32)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "quang-phu-cau-half-day",
        "name": "Half-Day Join Group (Morning)",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "notes": "No lunch included.",
        "priceVND": 750000,
        "priceINR": 2775
      },
      {
        "id": "quang-phu-cau-full-day",
        "name": "Full-Day Join Group (Incense + Hat Village)",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "inclusionsAddon": [
          "Vietnamese lunch included",
          "Chuong conical hat village visit"
        ],
        "priceVND": 1350000,
        "priceINR": 4995
      }
    ],
    "durationTypes": [
      "half_day",
      "full_day"
    ],
    "priceVND": 750000,
    "priceINR": 2775
  },
  {
    "id": "perfume-pagoda-chua-huong",
    "slug": "perfume-pagoda-chua-huong",
    "title": "Perfume Pagoda (Chua Huong) Day Tour & Cave Boat Trip",
    "shortTitle": "Perfume Pagoda Day Tour",
    "destination": "Hanoi",
    "region": "North Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:15)",
    "destinationDetails": "My Duc District, Hanoi (~60 km southwest)",
    "description": "Journey into one of Vietnam's most sacred pilgrimage sites. Glide along the poetic Yen Stream in a traditional metal rowboat surrounded by karst peaks and rice paddies, then ascend to the magnificent Huong Tich Cave, a vast natural cavern revered as the 'First Cave under the Southern Sky'.",
    "heroImage": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Bus",
      "Metal Rowboat on Yen Stream"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Scenic 1-hour rowboat cruise along peaceful Yen Stream surrounded by towering karst hills",
      "Visit the historic Thien Tru Pagoda (Kitchen of Heaven)",
      "Trek or take cable car to Huong Tich Cave containing centuries-old Buddhist shrines inside stalactites",
      "Enjoy a traditional Vietnamese lunch at the foot of the mountain",
      "Experience the spiritual atmosphere of northern Vietnam's premier Buddhist sanctuary"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:15",
        "title": "Hotel Pickup",
        "description": "Pickup from Hanoi Old Quarter and drive through the Ha Tay countryside to Duc Wharf."
      },
      {
        "time": "10:00",
        "title": "Yen Stream Rowboat Journey",
        "description": "Board a traditional rowboat for an enchanting 1-hour cruise along Yen Stream, admiring rice paddies and karst cliffs."
      },
      {
        "time": "11:15",
        "title": "Thien Tru Pagoda",
        "description": "Arrive at the mountain harbor and visit Thien Tru Pagoda, an elegant 15th-century Buddhist complex."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy Vietnamese lunch at a local restaurant."
      },
      {
        "time": "13:45",
        "title": "Huong Tich Cave",
        "description": "Ascend the mountain to Huong Tich Cave (on foot or by optional cable car). Marvel at stalactites resembling dragons, pearls, and coins."
      },
      {
        "time": "15:30",
        "title": "Return Rowboat Trip",
        "description": "Row back along Yen Stream to Duc Wharf."
      },
      {
        "time": "16:30 - 18:30",
        "title": "Drive back to Hanoi",
        "description": "Board coach and return to Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Air-conditioned bus transfer",
      "Rowboat trip on Yen Stream (round-trip)",
      "All sightseeing and entrance fees",
      "Vietnamese lunch at local restaurant",
      "English-speaking tour guide",
      "Bottled water"
    ],
    "exclusions": [
      "Cable car ticket (optional round-trip or one-way)",
      "Electric car ticket at wharf",
      "Beverages and personal expenses",
      "Tips for boat rower and guide"
    ],
    "optionalItems": [
      "Cable car round-trip / one-way ticket",
      "Electric car transfer"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:15.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter at ~18:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Significant walking and stone steps required to reach Huong Tich Cave; cable car is recommended for elderly travelers or families with small children.",
      "Dress respectfully with covered shoulders and knees for temple visits."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal available on request at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "PERFUME PAGODA DAY TOUR",
    "source": "(TA) Huong Pagoda.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "perfume-pagoda-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "priceVND": 1500000,
        "priceINR": 5550
      }
    ],
    "advisory": "Sacred Site Etiquette & Footwear: Modest clothing covering shoulders and knees is mandatory inside Huong Tich Cave and pagodas. Comfortable walking shoes are advised for the mountain paths.",
    "priceVND": 1500000,
    "priceINR": 5550
  },
  {
    "id": "mai-chau-valley-retreat",
    "slug": "mai-chau-valley-retreat",
    "title": "Mai Chau Valley Day Tour & Cultural Cycling Experience",
    "shortTitle": "Mai Chau Valley Tour",
    "destination": "Mai Chau",
    "region": "North Vietnam",
    "category": "Nature",
    "duration": "Full-Day (~11 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:00 - 07:45)",
    "destinationDetails": "Mai Chau Valley, Hoa Binh Province (~140 km west of Hanoi)",
    "description": "Escape the bustle of Hanoi to the tranquil emerald-green valley of Mai Chau. Stop at panoramic Thung Khe Pass, cycle through idyllic stilt-house villages (Lac and Pom Coong), interact with the ethnic White Thai community, and savor a home-cooked lunch in a traditional wooden stilt house.",
    "heroImage": "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day",
      "Private Full-Day"
    ],
    "groupOptions": [
      "Join Group (Max 25)",
      "Private Charter (2-3 pax, 4-5 pax, 6+ pax)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach / Private Van",
      "Bicycle through villages"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Spectacular photo stop at Thung Khe White Rock Pass overlooking Mai Chau valley",
      "Cycle through peaceful rice paddies, bamboo groves, and White Thai hamlets",
      "Explore Lac Village and Pom Coong Village with authentic stilt architecture",
      "Authentic home-cooked ethnic lunch inside a traditional wooden stilt house",
      "Shop for handmade textiles, brocade scarfs, and artisan souvenirs directly from weavers"
    ],
    "itinerary": [
      {
        "time": "07:00 - 07:45",
        "title": "Hotel Pickup",
        "description": "Pickup from Hanoi Old Quarter. Depart west toward Hoa Binh province."
      },
      {
        "time": "10:00",
        "title": "Thung Khe Pass Scenic Stop",
        "description": "Short break at Thung Khe Pass (White Rock Pass) for sweeping views over the green valley below."
      },
      {
        "time": "11:30",
        "title": "Arrive in Mai Chau & Lunch",
        "description": "Arrive in Mai Chau. Savor a traditional local lunch in a White Thai wooden stilt house."
      },
      {
        "time": "13:00",
        "title": "Bicycle Tour of Villages",
        "description": "Hop on bicycles to ride along scenic village paths through Lac Village and Pom Coong. Observe daily agrarian life, weavers at handlooms, and lush vegetable plots."
      },
      {
        "time": "15:00",
        "title": "Free Time for Shopping & Photos",
        "description": "Stroll around village markets for handicrafts and photography."
      },
      {
        "time": "15:30",
        "title": "Depart Mai Chau",
        "description": "Board coach to return to Hanoi."
      },
      {
        "time": "19:00 - 19:30",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Round-trip air-conditioned transportation",
      "English-speaking tour guide",
      "All village entrance tickets and sightseeing fees",
      "Bicycle rental in Mai Chau",
      "Traditional local lunch in stilt house",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Electric car (if cycling is not preferred)",
      "Tips for driver and guide"
    ],
    "optionalItems": [
      "Electric golf cart transfer in village for non-cyclists"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter from 07:00 to 07:45.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter at ~19:00 - 19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Comfortable walking shoes and lightweight clothing recommended for cycling.",
      "Electric cart can be arranged on site for guests unable to cycle."
    ],
    "dietaryInformation": {
      "standard": "Traditional ethnic Vietnamese lunch in stilt house.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "MAI CHAU VALLEY RETREAT FULL DAY TOUR FROM HA NOI",
    "source": "BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Item 34 & Private Item 1)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "mai-chau-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "priceVND": 1750000,
        "priceINR": 6475
      },
      {
        "id": "mai-chau-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Sedan/SUV/Van",
        "groupSize": "Private (2-3 pax, 4-5 pax, 6+ pax)",
        "notes": "Private guide and vehicle with flexible pacing.",
        "priceVND": 2950000,
        "priceINR": 10915
      }
    ],
    "priceVND": 1750000,
    "priceINR": 6475
  },
  {
    "id": "ninh-binh-bai-dinh-trang-an",
    "slug": "ninh-binh-bai-dinh-trang-an",
    "title": "Bai Dinh Pagoda & Trang An Boat Day Tour",
    "shortTitle": "Bai Dinh & Trang An",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "Experience the grandeur of Bai Dinh, Southeast Asia's largest Buddhist temple complex, and cruise through the UNESCO World Heritage landscape of Trang An. Glide through water caves carved beneath karst mountains on a tranquil sampan boat.",
    "heroImage": "https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Traditional Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore Bai Dinh Pagoda complex with 500 stone Arhat statues, 36-ton bronze bell, and giant golden Buddha",
      "2.5-hour scenic sampan boat tour through Trang An's karst waterways and underground river caves",
      "Visit King Kong movie film set locations and secluded temples amidst the water",
      "Enjoy a buffet / set lunch featuring regional specialties with vegetarian options available",
      "Expressway travel for a smooth and scenic round trip from Hanoi"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi Old Quarter",
        "description": "Pickup from your hotel in Hanoi Old Quarter. Drive south to Ninh Binh via the expressway."
      },
      {
        "time": "10:30",
        "title": "Bai Dinh Pagoda",
        "description": "Arrive at Bai Dinh Pagoda. Walk through the Arhat corridor, visit Tam The Hall, Bell Tower, and admire the massive 100-ton bronze Buddha."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy lunch at a local restaurant featuring local specialties (goat meat, fried rice) and vegetarian options available."
      },
      {
        "time": "14:00",
        "title": "Trang An Boat Cruise",
        "description": "Board a traditional bamboo sampan at Trang An wharf. Glide through Sang Cave, Toi Cave, Ba Giot Cave, and visit hidden temples nestled in the valley."
      },
      {
        "time": "16:30",
        "title": "Depart Ninh Binh",
        "description": "Board coach and begin the return journey to Hanoi."
      },
      {
        "time": "18:30 - 19:00",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Air-conditioned tourist vehicle",
      "All entrance fees and sightseeing tickets",
      "2.5-hour Trang An sampan boat ticket",
      "Lunch at local restaurant (vegetarian options available)",
      "Licensed English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Electric car ticket at Bai Dinh Pagoda (optional 150,000 VND/pax)",
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [
      "Bai Dinh electric car shuttle (150,000 VND/pax)"
    ],
    "pickupInformation": "Pickup at hotels in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter at ~18:30 - 19:00.",
    "childPolicy": "Under 3: Free (sits and eats with parents). 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Electric car ticket at Bai Dinh is not included in base rate (150,000 VND/pax optional).",
      "Bring a light jacket in winter, hat and umbrella in summer."
    ],
    "dietaryInformation": {
      "standard": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options are explicitly available at the local restaurant upon request. Jain / Pure Vegetarian options are not confirmed."
    },
    "supplier": "SST Travel",
    "supplierProductName": "BAI DINH - TRANG AN",
    "source": "(TA) Bai Dinh - Trang An Full Day.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 1 & 2)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "bai-dinh-trang-an-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1100000,
        "priceINR": 4070
      },
      {
        "id": "bai-dinh-trang-an-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      }
    ],
    "advisory": "Temple Dress Code: Bai Dinh Pagoda requires shoulders and knees to be covered. Electric cart is included to the main gate; walking shoes recommended for the pagoda corridors.",
    "priceVND": 1100000,
    "priceINR": 4070
  },
  {
    "id": "ninh-binh-hoa-lu-tam-coc",
    "slug": "ninh-binh-hoa-lu-tam-coc",
    "title": "Hoa Lu Ancient Capital & Tam Coc River Boat Tour",
    "shortTitle": "Hoa Lu & Tam Coc",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "Step back into the 10th-century history of Vietnam at Hoa Lu, the ancient imperial capital of the Dinh and Le dynasties. Afterwards, cruise along the Ngo Dong River in Tam Coc, celebrated as 'Ha Long Bay on land', drifting past emerald rice paddies and through three natural karst caves.",
    "heroImage": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Traditional Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit the ancient temples of King Dinh Tien Hoang and King Le Dai Hanh in Hoa Lu",
      "Scenic 2-hour sampan boat ride through Tam Coc's three river caves (Hang Ca, Hang Hai, Hang Ba)",
      "Pass vibrant seasonal rice paddies bordering the Ngo Dong River",
      "Optional cycling tour along rural village roads and limestone peaks",
      "Enjoy a local lunch featuring regional specialties with vegetarian options"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from Hanoi Old Quarter hotels. Transfer to Ninh Binh."
      },
      {
        "time": "10:30",
        "title": "Hoa Lu Ancient Capital",
        "description": "Visit the 10th-century historical capital of Dai Co Viet. Explore the sacred temples dedicated to King Dinh and King Le."
      },
      {
        "time": "12:00",
        "title": "Lunch Break",
        "description": "Enjoy a delicious lunch at a local restaurant."
      },
      {
        "time": "13:30",
        "title": "Tam Coc Sampan Cruise",
        "description": "Board a hand-rowed sampan down the Ngo Dong River. Marvel at towering limestone cliffs and glide through three natural limestone caves."
      },
      {
        "time": "15:30",
        "title": "Bicycle Ride in Countryside",
        "description": "Enjoy a leisurely bicycle ride along rural village paths (optional)."
      },
      {
        "time": "16:30",
        "title": "Depart Ninh Binh",
        "description": "Board the bus and return to Hanoi."
      },
      {
        "time": "18:30 - 19:00",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at your hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "All entrance fees and boat ticket in Tam Coc",
      "Lunch at local restaurant",
      "English-speaking tour guide",
      "Bicycle rental",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [
      "Tips for rowers who row with their feet"
    ],
    "pickupInformation": "Pickup at Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter at ~18:30 - 19:00.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Tam Coc boat rowers are famous for rowing with their feet."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal available on request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HOA LU - TAM COC",
    "source": "(TA) Hoa Lu - Tam Coc Full Day.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 3 & 4)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hoa-lu-tam-coc-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1100000,
        "priceINR": 4070
      },
      {
        "id": "hoa-lu-tam-coc-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      }
    ],
    "advisory": "Heritage Site Dress Code: When visiting King Dinh and King Le temples in Hoa Lu, please ensure shoulders and knees are covered.",
    "priceVND": 1100000,
    "priceINR": 4070
  },
  {
    "id": "ninh-binh-hoa-lu-trang-an",
    "slug": "ninh-binh-hoa-lu-trang-an",
    "title": "Hoa Lu Ancient Capital & Trang An Boat Tour",
    "shortTitle": "Hoa Lu & Trang An",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "Combine the imperial antiquity of Hoa Lu with the pristine waters of Trang An. Visit temples of ancient kings and embark on a UNESCO-protected river cruise through cavernous limestone formations.",
    "heroImage": "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Trang An Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit the 10th-century Royal Temples of King Dinh and King Le at Hoa Lu",
      "Trang An UNESCO boat ride through scenic karst canyons and water caves",
      "Enjoy Vietnamese lunch featuring goat meat, fried rice, and vegetarian dishes",
      "Relaxing cycling through countryside villages",
      "Convenient express highway transit from Hanoi"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from hotel in Hanoi Old Quarter."
      },
      {
        "time": "10:30",
        "title": "Hoa Lu Ancient Capital",
        "description": "Visit the royal temples of King Dinh and King Le, learning about 10th-century Vietnamese history."
      },
      {
        "time": "12:00",
        "title": "Lunch Break",
        "description": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available."
      },
      {
        "time": "13:30",
        "title": "Trang An Scenic Boat Tour",
        "description": "Board sampan at Trang An wharf. Cruise through limestone grottos and visit water temples."
      },
      {
        "time": "16:00",
        "title": "Cycling Experience",
        "description": "Leisurely bike ride through picturesque villages."
      },
      {
        "time": "16:45",
        "title": "Depart for Hanoi",
        "description": "Return to coach for trip back to Hanoi."
      },
      {
        "time": "18:45 - 19:15",
        "title": "Dropoff in Hanoi",
        "description": "Dropoff at Old Quarter hotels."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "All entrance fees and Trang An boat ticket",
      "Lunch at local restaurant (vegetarian options available)",
      "English-speaking guide",
      "Bicycle rental",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter at ~19:00.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Bring hat, sunscreen, and modest clothes for temples."
    ],
    "dietaryInformation": {
      "standard": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options explicitly confirmed in brochure. Jain/Pure Veg not specified."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HOA LU - TRANG AN FULL DAY",
    "source": "(TA) Hoa Lu - Trang An Full Day.pdf",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hoa-lu-trang-an-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1100000,
        "priceINR": 4070
      },
      {
        "id": "hoa-lu-trang-an-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      }
    ],
    "advisory": "Heritage Site Dress Code: Shoulders and knees must be covered when touring King Dinh and King Le temples in Hoa Lu.",
    "priceVND": 1100000,
    "priceINR": 4070
  },
  {
    "id": "ninh-binh-bai-dinh-trang-an-mua-cave",
    "slug": "ninh-binh-bai-dinh-trang-an-mua-cave",
    "title": "Bai Dinh Pagoda, Trang An & Mua Cave Full-Day Tour",
    "shortTitle": "Bai Dinh, Trang An & Mua Cave",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~10 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "The ultimate Ninh Binh triple-highlight experience. Marvel at the monumental Bai Dinh Pagoda, cruise through the crystalline waters and caves of Trang An, and climb 500 stone steps up Ngoa Long Mountain at Mua Cave for a breathtaking 360-degree panorama over Tam Coc and the karst valley.",
    "heroImage": "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group",
      "Luxury D-Car Limousine"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)",
      "Luxury D-Car (Max 10)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Hike 500 stone steps up Lying Dragon Mountain at Mua Cave for world-renowned panoramic views",
      "2.5-hour UNESCO boat ride through Trang An's karst caves and emerald waterways",
      "Explore Bai Dinh Pagoda's Arhat corridor, giant bronze bell, and golden Buddha",
      "Enjoy a buffet / set lunch with regional specialties and vegetarian options available",
      "Available in comfortable Big Group, Small Group, or premium Luxury D-Car Limousine"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from Hanoi Old Quarter hotels. Travel to Ninh Binh."
      },
      {
        "time": "10:30",
        "title": "Bai Dinh Pagoda",
        "description": "Explore the majestic pagoda complex, 500 Arhat statues, and sacred shrines."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available."
      },
      {
        "time": "13:45",
        "title": "Trang An Grottoes Cruise",
        "description": "Sampan boat ride through water grottos and limestone mountains."
      },
      {
        "time": "15:45",
        "title": "Mua Cave & Dragon Peak Hike",
        "description": "Climb 500 stone steps up Ngoa Long Mountain for panoramic views over Tam Coc valley and winding rivers."
      },
      {
        "time": "17:15",
        "title": "Depart Ninh Binh",
        "description": "Board vehicle for the return drive to Hanoi."
      },
      {
        "time": "19:15 - 19:45",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or Luxury D-Car)",
      "All entrance fees (Bai Dinh, Trang An, Mua Cave)",
      "Trang An sampan boat ticket",
      "Lunch at local restaurant (vegetarian options available)",
      "English-speaking tour guide",
      "Bottled water"
    ],
    "exclusions": [
      "Electric car at Bai Dinh (150,000 VND/pax optional)",
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [
      "Bai Dinh electric car ticket (150,000 VND/pax)"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter at ~19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Steep stone stair climb at Mua Cave (500 steps); wear athletic shoes with good traction.",
      "Electric car at Bai Dinh is optional at 150,000 VND/pax."
    ],
    "dietaryInformation": {
      "standard": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options are explicitly available upon request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "BAI DINH - TRANG AN - MUA CAVE",
    "source": "(TA) Bai Dinh - Trang An - Mua Caves Full Day.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 5, 6, 7)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "bai-dinh-trang-an-mua-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1200000,
        "priceINR": 4440
      },
      {
        "id": "bai-dinh-trang-an-mua-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1350000,
        "priceINR": 4995
      },
      {
        "id": "bai-dinh-trang-an-mua-dcar",
        "name": "Luxury D-Car Limousine Full-Day",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "inclusionsAddon": [
          "Plush leather reclining massage seats",
          "USB charging ports"
        ],
        "priceVND": 1950000,
        "priceINR": 7215
      }
    ],
    "advisory": "Physical Climb Advisory: Hang Mua dragon viewpoint requires ascending approximately 500 steep, uneven stone steps. Suitable footwear is essential; not recommended for visitors with severe knee or heart conditions. Bai Dinh Pagoda also requires covered shoulders and knees.",
    "priceVND": 1200000,
    "priceINR": 4440
  },
  {
    "id": "ninh-binh-hoa-lu-trang-an-mua-cave",
    "slug": "ninh-binh-hoa-lu-trang-an-mua-cave",
    "title": "Hoa Lu, Trang An & Mua Cave Full-Day Tour",
    "shortTitle": "Hoa Lu, Trang An & Mua Cave",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~10 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "Discover Vietnam's ancient royal heritage at Hoa Lu, cruise through the limestone caverns of UNESCO Trang An, and climb to the top of Mua Cave's dragon peak for the best view in northern Vietnam.",
    "heroImage": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group",
      "Luxury D-Car Limousine"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)",
      "Luxury D-Car (Max 10)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit the 10th-century royal temples of King Dinh and King Le at Hoa Lu",
      "Scenic sampan boat cruise through Trang An's karst waterways and caves",
      "Climb 500 steps to Mua Cave dragon summit overlooking the Tam Coc valley",
      "Local Vietnamese lunch with vegetarian options available",
      "Bicycle ride through peaceful village roads"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from Hanoi Old Quarter hotels."
      },
      {
        "time": "10:30",
        "title": "Hoa Lu Ancient Capital",
        "description": "Visit the historic temples of the Dinh and Le Dynasties."
      },
      {
        "time": "12:00",
        "title": "Lunch Break",
        "description": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available."
      },
      {
        "time": "13:30",
        "title": "Trang An Boat Cruise",
        "description": "Sampan cruise through majestic caves and karst formations."
      },
      {
        "time": "15:30",
        "title": "Mua Cave & Dragon Peak",
        "description": "Hike 500 stone steps up Lying Dragon mountain for 360-degree views."
      },
      {
        "time": "17:15",
        "title": "Depart for Hanoi",
        "description": "Drive back via the expressway."
      },
      {
        "time": "19:15 - 19:45",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or Luxury D-Car)",
      "All entrance tickets and Trang An boat pass",
      "Lunch at local restaurant (vegetarian options available)",
      "English-speaking guide",
      "Bicycle rental",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter at ~19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Comfortable hiking shoes recommended for Mua Cave steps."
    ],
    "dietaryInformation": {
      "standard": "Lunch at local restaurant – goat meat, fried rice & vegetarian options available.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options are explicitly available upon request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HOA LU - TRANG AN - MUA CAVES FULL DAY",
    "source": "(TA) Hoa Lu - Trang An - Mua Caves Full Day.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 8, 9, 10)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hoa-lu-trang-an-mua-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      },
      {
        "id": "hoa-lu-trang-an-mua-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1350000,
        "priceINR": 4995
      },
      {
        "id": "hoa-lu-trang-an-mua-dcar",
        "name": "Luxury D-Car Limousine Full-Day",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1950000,
        "priceINR": 7215
      }
    ],
    "advisory": "Physical Climb & Temple Advisory: Climbing Mua Cave involves ~500 steep stone steps without handrails in certain sections. Hoa Lu temples require shoulders and knees to be covered.",
    "priceVND": 1250000,
    "priceINR": 4625
  },
  {
    "id": "ninh-binh-hoa-lu-tam-coc-mua-cave",
    "slug": "ninh-binh-hoa-lu-tam-coc-mua-cave",
    "title": "Hoa Lu, Tam Coc & Mua Cave Full-Day Tour",
    "shortTitle": "Hoa Lu, Tam Coc & Mua Cave",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~10 Hours)",
    "durationType": "full_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (~95 km south of Hanoi)",
    "description": "Experience the classic Tam Coc river rowboat journey past yellow rice paddies and limestone arches, explore the historic royal shrines of Hoa Lu, and ascend Mua Cave's dragon spine for panoramic valley vistas.",
    "heroImage": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group",
      "Small Group",
      "Luxury D-Car Limousine"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15-20)",
      "Luxury D-Car (Max 10)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Sampan Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Climb 500 steps to Mua Cave dragon peak overlooking Tam Coc",
      "2-hour sampan boat ride along Ngo Dong River through three natural caves in Tam Coc",
      "Visit King Dinh and King Le temples in Hoa Lu ancient capital",
      "Buffet / set lunch featuring Vietnamese dishes and vegetarian options",
      "Countryside cycling along rice paddies and lotus ponds"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:30",
        "title": "Pickup in Hanoi",
        "description": "Pickup from Hanoi Old Quarter hotels."
      },
      {
        "time": "10:30",
        "title": "Hoa Lu Ancient Capital",
        "description": "Explore the historic Dinh and Le dynasty temples."
      },
      {
        "time": "12:00",
        "title": "Lunch Break",
        "description": "Enjoy lunch at local restaurant."
      },
      {
        "time": "13:30",
        "title": "Tam Coc Sampan Ride",
        "description": "Scenic boat cruise along Ngo Dong river through Hang Ca, Hang Hai, and Hang Ba."
      },
      {
        "time": "15:30",
        "title": "Mua Cave Hike",
        "description": "Climb up Ngoa Long mountain for the famous panoramic viewpoint."
      },
      {
        "time": "17:15",
        "title": "Depart for Hanoi",
        "description": "Drive back via the expressway."
      },
      {
        "time": "19:15 - 19:45",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Transportation as booked",
      "All entrance fees and Tam Coc boat ticket",
      "Lunch at local restaurant",
      "English-speaking guide",
      "Bicycle rental",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter at ~19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Wear suitable shoes for the 500-step mountain climb."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options available upon request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HOA LU - MUA CAVES - TAM COC FULL DAY",
    "source": "(TA) Hoa Lu - Mua Caves - Tam Coc Full Day.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hoa-lu-tam-coc-mua-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      },
      {
        "id": "hoa-lu-tam-coc-mua-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15-20 pax",
        "priceVND": 1350000,
        "priceINR": 4995
      },
      {
        "id": "hoa-lu-tam-coc-mua-dcar",
        "name": "Luxury D-Car Limousine Full-Day",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1950000,
        "priceINR": 7215
      }
    ],
    "advisory": "Physical Climb & Temple Advisory: Mua Cave climb consists of approximately 500 stone steps. Sturdy footwear recommended. Modest attire covering shoulders and knees required for Hoa Lu ancient sanctuaries.",
    "priceVND": 1250000,
    "priceINR": 4625
  },
  {
    "id": "ninh-binh-discovery-2d1n",
    "slug": "ninh-binh-discovery-2d1n",
    "title": "Ninh Binh 2-Day 1-Night Highlights Tour",
    "shortTitle": "Ninh Binh 2D1N",
    "destination": "Ninh Binh",
    "region": "North Vietnam",
    "category": "Day Trip",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Hotel pickup in Hanoi Old Quarter (07:30 - 08:30)",
    "destinationDetails": "Ninh Binh Province (Overnight in Tam Coc / Trang An)",
    "description": "An immersive two-day escape to Ninh Binh. Experience all iconic highlights without rushing: Hoa Lu ancient capital, Tam Coc river cruise, Mua Cave dragon summit, Bai Dinh pagoda, and Trang An UNESCO waterways, with an overnight stay in your choice of 3-Star hotel, 4-Star resort bungalow, or 5-Star luxury resort.",
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package",
      "4-Star Hotel / Bungalow Package",
      "5-Star Luxury Resort Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Sampan Boats",
      "Bicycle"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Complete exploration of Hoa Lu, Tam Coc, Mua Cave, Bai Dinh, and Trang An",
      "Two distinct boat cruises: Hand-rowed Tam Coc sampan & Trang An UNESCO grottoes",
      "Climb Mua Cave for sunset or afternoon golden light over limestone peaks",
      "Choice of 3-Star, 4-Star bungalow, or 5-Star luxury resort accommodation",
      "2 Vietnamese lunches included with vegetarian options"
    ],
    "itinerary": [
      {
        "time": "Day 1: 07:30 - 08:30",
        "title": "Hanoi to Hoa Lu",
        "description": "Pickup in Hanoi Old Quarter. Drive to Ninh Binh and visit Hoa Lu ancient capital."
      },
      {
        "time": "Day 1: 12:00",
        "title": "Lunch & Hotel Check-in",
        "description": "Enjoy Vietnamese lunch at local restaurant. Check in to your hotel/bungalow."
      },
      {
        "time": "Day 1: 13:30",
        "title": "Tam Coc Boat Ride & Cycling",
        "description": "Glide through Tam Coc's 3 caves, followed by a scenic bicycle ride through local villages."
      },
      {
        "time": "Day 1: 16:00",
        "title": "Mua Cave Sunset Hike",
        "description": "Hike 500 steps to Mua Cave dragon peak. Evening at leisure in Tam Coc."
      },
      {
        "time": "Day 2: 08:00",
        "title": "Breakfast & Bai Dinh Pagoda",
        "description": "Breakfast at hotel. Depart to visit Bai Dinh Pagoda, Southeast Asia's largest Buddhist complex."
      },
      {
        "time": "Day 2: 12:30",
        "title": "Lunch Break",
        "description": "Lunch at local restaurant with regional specialties and vegetarian dishes."
      },
      {
        "time": "Day 2: 14:00",
        "title": "Trang An Boat Cruise",
        "description": "2.5-hour boat cruise through Trang An water caves and sacred temples."
      },
      {
        "time": "Day 2: 16:30 - 19:00",
        "title": "Return to Hanoi",
        "description": "Board coach and return to Hanoi Old Quarter by ~19:00."
      }
    ],
    "inclusions": [
      "Air-conditioned round-trip transport from Hanoi",
      "1 night hotel accommodation (3-Star, 4-Star, or 5-Star as selected)",
      "2 Vietnamese lunches and 1 breakfast at hotel",
      "All entrance fees and 2 boat ride tickets (Tam Coc & Trang An)",
      "English-speaking tour guide",
      "Bicycle rental",
      "Bottled water"
    ],
    "exclusions": [
      "Dinner on Day 1 (free choice in Tam Coc village)",
      "Single room supplement (if traveling solo)",
      "Bai Dinh electric car ticket (optional 150,000 VND/pax)",
      "Drinks and personal expenses",
      "Tips for guides and drivers"
    ],
    "optionalItems": [
      "Single room supplement",
      "Bai Dinh electric car shuttle"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 07:30 and 08:30.",
    "dropoffInformation": "Dropoff at Hanoi Old Quarter on Day 2 at ~19:00.",
    "childPolicy": "Under 3: Free (sharing bed with parents). 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Single travelers will have a single room supplement applied.",
      "Bring overnight luggage, personal toiletries, and comfortable walking shoes."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches and 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking. Dinner is at your own leisure."
    },
    "supplier": "SST Travel",
    "supplierProductName": "2D1N NINH BINH TOUR",
    "source": "EN NB2.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 11, 12, 13)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "ninh-binh-2d1n-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Overnight in standard 3-star hotel in Tam Coc.",
        "priceVND": 2950000,
        "priceINR": 10915
      },
      {
        "id": "ninh-binh-2d1n-4star",
        "name": "4-Star Hotel / Bungalow Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Overnight in boutique resort bungalow with pool.",
        "priceVND": 3500000,
        "priceINR": 12950
      },
      {
        "id": "ninh-binh-2d1n-5star",
        "name": "5-Star Luxury Resort Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Overnight in 5-star luxury resort (e.g. Emeralda Resort or equivalent).",
        "priceVND": 4050000,
        "priceINR": 14985
      }
    ],
    "advisory": "Activity & Dress Advisory: Itinerary includes ~500 steps at Mua Cave and temple visits requiring covered shoulders and knees.",
    "priceVND": 2950000,
    "priceINR": 10915
  },
  {
    "id": "ha-long-bay-day-cruise",
    "slug": "ha-long-bay-day-cruise",
    "title": "Ha Long Bay Luxury Day Cruise with Kayaking & Lunch",
    "shortTitle": "Ha Long Day Cruise",
    "destination": "Ha Long Bay",
    "region": "North Vietnam",
    "category": "Cruise",
    "duration": "Full-Day (~11 Hours with Hanoi Transfer / ~6 Hours on Cruise)",
    "durationType": "full_day",
    "departureCity": "Hanoi / Ha Long",
    "departureDetails": "Pickup in Hanoi Old Quarter (08:00 - 08:45) OR Meet directly at Tuan Chau Harbor / Ha Long International Port",
    "destinationDetails": "Ha Long Bay, Quang Ninh Province",
    "description": "Sail across the legendary emerald waters of Ha Long Bay, a UNESCO World Heritage wonder dotted with thousands of towering limestone karsts. Explore the colossal chambers of Sung Sot (Surprise) Cave, kayak through the tidal lagoon of Luon Cave, climb to the summit of Ti Top Island for panoramic views, and relax during a scenic sunset party on the sundeck.",
    "heroImage": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Depart from Ha Long Harbor (4-Star, 5-Star, 6-Star)",
      "Depart from Hanoi with Standard Bus (4-Star, 5-Star)",
      "Depart from Hanoi with Luxury Limousine Bus (4-Star, 5-Star, 6-Star)"
    ],
    "groupOptions": [
      "Cruise Group (Harmony, Heritage, Otis, Apollo, V'Dream, Luna, Catherine, Dolphin, Ambassador)"
    ],
    "transportOptions": [
      "Expressway Tourist Coach",
      "Luxury Limousine Bus",
      "Day Cruise Ship",
      "Kayak / Bamboo Boat"
    ],
    "minimumPax": 1,
    "maximumPax": 99,
    "guide": "Licensed English-Speaking Cruise Tour Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "6-hour cruise navigating through the heart of UNESCO World Heritage Ha Long Bay",
      "Explore Sung Sot (Surprise) Cave, the largest and most magnificent cavern in Ha Long",
      "Kayak or ride a bamboo boat through the secret arch of Luon Cave",
      "Climb Ti Top Island for iconic 360-degree panoramic bay photos and beach swim",
      "Sumptuous buffet or seafood set lunch served on board",
      "Afternoon sunset tea party with wine, tea, and fresh fruits on the sundeck"
    ],
    "itinerary": [
      {
        "time": "08:00 - 08:45",
        "title": "Pickup in Hanoi (if booked with transfer)",
        "description": "Pickup from Hanoi Old Quarter hotels. Drive ~2.5 hours via Hanoi - Hai Phong - Ha Long expressway."
      },
      {
        "time": "11:30 - 12:00",
        "title": "Arrive at Port & Boarding",
        "description": "Arrive at Tuan Chau Harbor / Ha Long International Port. Welcome drink and safety briefing as cruise begins navigation through thousands of limestone islets."
      },
      {
        "time": "12:30",
        "title": "Lunch on Board",
        "description": "Savor a lavish seafood buffet or set lunch while cruising past iconic formations like Incense Burner and Stone Dog islets."
      },
      {
        "time": "13:30",
        "title": "Sung Sot (Surprise) Cave",
        "description": "Disembark to explore Sung Sot Cave, walking through three vast illuminated chambers filled with stalactites and stalagmites."
      },
      {
        "time": "14:30",
        "title": "Luon Cave Kayaking / Bamboo Boat",
        "description": "Kayak or take a rowing bamboo boat through a natural tunnel into a peaceful enclosed lagoon surrounded by vertical cliffs."
      },
      {
        "time": "15:30",
        "title": "Ti Top Island Beach & Summit",
        "description": "Climb 400 stone steps to the peak of Ti Top Island for breathtaking views over Ha Long Bay, or relax on the crescent sandy beach."
      },
      {
        "time": "16:30",
        "title": "Sunset Party on Sundeck",
        "description": "Cruise back toward port while enjoying sunset tea, local snacks, and wine on the open sundeck."
      },
      {
        "time": "17:45 - 18:00",
        "title": "Disembark Harbor",
        "description": "Cruise docks at harbor. Departures from Ha Long conclude here. Guests with Hanoi transfer board limousine/coach."
      },
      {
        "time": "20:30",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at your hotel in Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Day cruise passage (6 hours) on selected ship category",
      "Round-trip expressway transportation from Hanoi (if transfer option selected)",
      "All Ha Long Bay sightseeing tickets and port entrance fees",
      "Buffet or premium set lunch on board",
      "English-speaking cruise guide",
      "Sunset tea party on sundeck",
      "Kayak / Bamboo boat ticket (included on 6-Star Luxury; optional on 4-Star/5-Star)"
    ],
    "exclusions": [
      "Kayak / bamboo boat ticket on 4-Star and 5-Star cruises (unless included in specific package)",
      "Beverages ordered at the ship bar",
      "Personal expenses",
      "Tips for crew and guide"
    ],
    "optionalItems": [
      "Kayak or bamboo boat ticket (on 4-Star & 5-Star tiers)"
    ],
    "pickupInformation": "Pickup at Hanoi Old Quarter between 08:00 and 08:45, or meet at Tuan Chau / Ha Long Port at 11:30.",
    "dropoffInformation": "Dropoff at port at 17:45 or Hanoi Old Quarter at ~20:30.",
    "childPolicy": "Under 3: Free (sits and eats with parents). 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms. Cruises subject to port authority weather clearance.",
    "importantNotes": [
      "Cruise itinerary is subject to change based on weather and Ha Long Bay Port Authority regulations.",
      "Original passport required for port registration and boarding."
    ],
    "dietaryInformation": {
      "standard": "Buffet or set lunch with seafood, Vietnamese specialties on board.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking. Halal/Jain not certified on regular day cruises."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HA LONG BAY DAY TOUR - 4 STAR / 5 STAR / 6 STAR",
    "source": "BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 20 to 27)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "halong-4star-from-halong",
        "name": "4-Star Standard Cruise (Depart from Ha Long)",
        "format": "join_group",
        "vehicleType": "Day Cruise Ship (Harmony / Otis Standard)",
        "notes": "No Hanoi transfer included.",
        "priceVND": 1050000,
        "priceINR": 3885
      },
      {
        "id": "halong-5star-from-halong",
        "name": "5-Star Premium Cruise (Depart from Ha Long)",
        "format": "join_group",
        "vehicleType": "Day Cruise Ship (Heritage / V'Dream / Otis Premium / Apollo)",
        "notes": "No Hanoi transfer included.",
        "priceVND": 1200000,
        "priceINR": 4440
      },
      {
        "id": "halong-6star-from-halong",
        "name": "6-Star Luxury Cruise (Depart from Ha Long)",
        "format": "join_group",
        "vehicleType": "Day Cruise Ship (Luna / Catherine / Dolphin)",
        "notes": "Includes Kayak. No Hanoi transfer included.",
        "priceVND": 2150000,
        "priceINR": 7955
      },
      {
        "id": "halong-4star-bus-hanoi",
        "name": "4-Star Standard Cruise + Standard Bus from Hanoi",
        "format": "join_group",
        "vehicleType": "Standard Tourist Bus + Harmony Cruise",
        "notes": "Round-trip bus transfer included.",
        "priceVND": 1250000,
        "priceINR": 4625
      },
      {
        "id": "halong-4star-limo-hanoi",
        "name": "4-Star Standard Cruise + Limousine Bus from Hanoi",
        "format": "join_group",
        "vehicleType": "Limousine Bus (Sky Cruise)",
        "notes": "Round-trip luxury limousine bus.",
        "priceVND": 1500000,
        "priceINR": 5550
      },
      {
        "id": "halong-5star-bus-hanoi",
        "name": "5-Star Premium Cruise + Standard Bus from Hanoi",
        "format": "join_group",
        "vehicleType": "Standard Bus + Heritage/Otis Premium/Apollo",
        "notes": "Round-trip bus transfer included.",
        "priceVND": 1400000,
        "priceINR": 5180
      },
      {
        "id": "halong-5star-limo-hanoi",
        "name": "5-Star Premium Cruise + Limousine Bus from Hanoi",
        "format": "join_group",
        "vehicleType": "Limousine Bus + Heritage/Otis Premium/Apollo/V'Dream",
        "notes": "Round-trip luxury limousine bus.",
        "priceVND": 1500000,
        "priceINR": 5550
      },
      {
        "id": "halong-6star-limo-hanoi",
        "name": "6-Star Luxury Cruise + Limousine Bus from Hanoi",
        "format": "join_group",
        "vehicleType": "Limousine Bus + Luna/Catherine/Dolphin/Ambassador Cruise",
        "inclusionsAddon": [
          "Kayak included",
          "Luxury Limousine transfer included"
        ],
        "notes": "Top luxury day cruise experience.",
        "priceVND": 2650000,
        "priceINR": 9805
      }
    ],
    "advisory": "Maritime Weather Notice: Cruise departure and sailing route are subject to daily clearance from the Quang Ninh Port Authority based on bay weather and tidal conditions. Bring sun protection and swimwear/towel for kayaking or swimming at Ti Top Island.",
    "priceVND": 1050000,
    "priceINR": 3885
  },
  {
    "id": "sapa-highlights-2d1n-bus",
    "slug": "sapa-highlights-2d1n-bus",
    "title": "Sapa 2-Day 1-Night Tour by Limousine Bus",
    "shortTitle": "Sapa 2D1N (Bus)",
    "destination": "Sapa",
    "region": "North Vietnam",
    "category": "Nature",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Pickup in Hanoi Old Quarter (06:30 - 07:00)",
    "destinationDetails": "Sapa Town & Muong Hoa Valley, Lao Cai Province (~320 km)",
    "description": "Ascend into the misty mountains of northern Vietnam via the modern Hanoi - Lao Cai expressway. Trek through the terraced rice fields of Cat Cat Village, learn about Black H'mong traditions, explore Sapa town, and take the option to conquer Fansipan Peak ('The Roof of Indochina').",
    "heroImage": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package",
      "4-Star Hotel Package",
      "5-Star Hotel Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Express Sleeper / Limousine Bus",
      "Trekking on foot"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Local Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Scenic 5.5-hour expressway journey through northern mountain scenery",
      "Guided trek through Cat Cat village with picturesque waterfalls and watermills",
      "Experience Black H'mong hill-tribe culture, traditional looms, and stilt architecture",
      "Optional excursion to Fansipan Peak via world-record cable car (3,143m)",
      "Overnight stay in Sapa with choice of 3-Star, 4-Star, or 5-Star hotel",
      "Included lunches and breakfast featuring mountain delicacies"
    ],
    "itinerary": [
      {
        "time": "Day 1: 06:30 - 07:00",
        "title": "Hanoi Departure",
        "description": "Pickup from Hanoi Old Quarter. Drive via expressway to Sapa with 2 rest stops."
      },
      {
        "time": "Day 1: 12:30",
        "title": "Arrive in Sapa & Lunch",
        "description": "Arrive in Sapa town. Savor Vietnamese lunch and check in to hotel."
      },
      {
        "time": "Day 1: 14:30",
        "title": "Cat Cat Village Trek",
        "description": "Trek ~2 km down into Cat Cat village. Visit traditional Black H'mong homes, the French hydroelectric station, and Cat Cat waterfall."
      },
      {
        "time": "Day 1: 17:30",
        "title": "Free Evening in Sapa",
        "description": "Return to town. Free time to explore the Stone Church, Night Market, or sample local BBQ."
      },
      {
        "time": "Day 2: 07:30",
        "title": "Breakfast & Free Time / Fansipan Option",
        "description": "Breakfast at hotel. Optional transfer to Sun World Fansipan Legend cable car station to summit Fansipan Peak, or stroll around Ham Rong Mountain."
      },
      {
        "time": "Day 2: 12:00",
        "title": "Lunch & Checkout",
        "description": "Check out of hotel and enjoy lunch at local restaurant."
      },
      {
        "time": "Day 2: 13:30 - 14:00",
        "title": "Depart Sapa for Hanoi",
        "description": "Board the bus for the return trip to Hanoi."
      },
      {
        "time": "Day 2: 19:30 - 20:00",
        "title": "Arrive in Hanoi",
        "description": "Dropoff at Hanoi Old Quarter. Tour ends."
      }
    ],
    "inclusions": [
      "Round-trip expressway bus transportation between Hanoi and Sapa",
      "1 night hotel accommodation (3-Star, 4-Star, or 5-Star as selected)",
      "Meals: 2 Lunches and 1 Breakfast",
      "Entrance fees to Cat Cat village",
      "English-speaking local guide for Cat Cat trek",
      "Bottled water"
    ],
    "exclusions": [
      "Fansipan cable car ticket and funicular train (optional)",
      "Dinner (free choice in Sapa town)",
      "Single room supplement",
      "Drinks and personal expenses",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Fansipan Cable Car ticket",
      "Ham Rong Mountain entrance"
    ],
    "pickupInformation": "Pickup at Hanoi Old Quarter between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter on Day 2 at ~19:30 - 20:00.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Temperature in Sapa can be cold, especially from November to March; bring warm clothing.",
      "Single room supplement applies for solo travelers."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches and 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "2D1N SAPA TOUR (3-STAR / 4-STAR / 5-STAR)",
    "source": "EN SAPA 2D1N.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 14, 15, 16)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "sapa-2d1n-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in comfortable 3-star Sapa hotel.",
        "priceVND": 2800000,
        "priceINR": 10360
      },
      {
        "id": "sapa-2d1n-4star",
        "name": "4-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in upscale 4-star Sapa hotel.",
        "priceVND": 3250000,
        "priceINR": 12025
      },
      {
        "id": "sapa-2d1n-5star",
        "name": "5-Star Luxury Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in 5-star hotel (e.g. Hotel de la Coupole or equivalent).",
        "priceVND": 3800000,
        "priceINR": 14060
      }
    ],
    "advisory": "Highland Weather Advisory: Sapa mountain climate is significantly cooler than Hanoi, especially during evenings and winter months (Dec–Feb). Warm jacket and sturdy walking shoes for village paths are recommended.",
    "priceVND": 2800000,
    "priceINR": 10360
  },
  {
    "id": "sapa-discovery-3d2n-bus",
    "slug": "sapa-discovery-3d2n-bus",
    "title": "Sapa & Muong Hoa Valley 3-Day 2-Night Tour by Bus",
    "shortTitle": "Sapa 3D2N (Bus)",
    "destination": "Sapa",
    "region": "North Vietnam",
    "category": "Nature",
    "duration": "3 Days / 2 Nights",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Pickup in Hanoi Old Quarter (06:30 - 07:00)",
    "destinationDetails": "Sapa, Cat Cat, Lao Chai & Ta Van, Lao Cai Province",
    "description": "A comprehensive 3-day exploration of Sapa's breathtaking landscapes and ethnic diversity. Trek through Cat Cat village and deep into the Muong Hoa Valley visiting Lao Chai and Ta Van (home to Black H'mong and Giay communities), with ample time to conquer Fansipan Peak.",
    "heroImage": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package",
      "4-Star Hotel Package",
      "5-Star Hotel Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Express Sleeper / Limousine Bus",
      "Trekking on foot"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Local Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Trek through the emerald terraced rice fields of Muong Hoa Valley",
      "Visit multiple ethnic minority villages: Cat Cat (H'mong), Lao Chai (H'mong), and Ta Van (Giay)",
      "Ample time to summit Fansipan Peak via cable car",
      "2 nights hotel accommodation with choice of 3-Star, 4-Star, or 5-Star comfort",
      "3 included lunches and 2 breakfasts"
    ],
    "itinerary": [
      {
        "time": "Day 1: 06:30 - 07:00",
        "title": "Hanoi Departure",
        "description": "Pickup from Hanoi Old Quarter and drive to Sapa via expressway."
      },
      {
        "time": "Day 1: 12:30",
        "title": "Arrive in Sapa & Lunch",
        "description": "Check in to hotel and enjoy Vietnamese lunch."
      },
      {
        "time": "Day 1: 14:30",
        "title": "Cat Cat Village Trek",
        "description": "Guided trek to Cat Cat village, waterfall, and watermills."
      },
      {
        "time": "Day 2: 08:30",
        "title": "Muong Hoa Valley Trek (Lao Chai - Ta Van)",
        "description": "Scenic trek along Muong Hoa Stream through terraced paddies to Lao Chai and Ta Van villages. Learn about H'mong and Giay lifestyles. Lunch in village."
      },
      {
        "time": "Day 2: 15:00",
        "title": "Afternoon at Leisure / Fansipan",
        "description": "Return to Sapa town. Free time to explore or take cable car to Fansipan Peak."
      },
      {
        "time": "Day 3: 08:00",
        "title": "Ham Rong Mountain or Sapa Town",
        "description": "Breakfast at hotel. Visit Ham Rong flower gardens or Moana Sapa viewpoint."
      },
      {
        "time": "Day 3: 12:00",
        "title": "Lunch & Checkout",
        "description": "Lunch at local restaurant and check out."
      },
      {
        "time": "Day 3: 13:30 - 19:30",
        "title": "Return to Hanoi",
        "description": "Board bus back to Hanoi Old Quarter."
      }
    ],
    "inclusions": [
      "Round-trip expressway bus transportation",
      "2 nights hotel accommodation (3-Star, 4-Star, or 5-Star)",
      "Meals: 3 Lunches and 2 Breakfasts",
      "All village entrance tickets (Cat Cat, Lao Chai, Ta Van)",
      "English-speaking local trekking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Fansipan cable car ticket and funicular train",
      "Dinners (free choice in Sapa)",
      "Single room supplement",
      "Drinks and personal expenses"
    ],
    "optionalItems": [
      "Fansipan Cable Car ticket",
      "Moana Sapa entrance ticket"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter on Day 3 at ~19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Trekking involves moderate dirt and stone trails; sturdy footwear required."
    ],
    "dietaryInformation": {
      "standard": "3 Lunches and 2 Breakfasts included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "3D2N SAPA TOUR (3-STAR / 4-STAR / 5-STAR)",
    "source": "EN SAPA 3D2N.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 17, 18, 19)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "sapa-3d2n-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in standard 3-star Sapa hotel.",
        "priceVND": 3700000,
        "priceINR": 13690
      },
      {
        "id": "sapa-3d2n-4star",
        "name": "4-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in boutique 4-star Sapa hotel.",
        "priceVND": 4700000,
        "priceINR": 17390
      },
      {
        "id": "sapa-3d2n-5star",
        "name": "5-Star Luxury Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "notes": "Overnight in luxury 5-star hotel.",
        "priceVND": 5550000,
        "priceINR": 20535
      }
    ],
    "advisory": "Trekking & Weather Advisory: Daily treks through Cat Cat and Ta Van villages involve dirt trails and uneven stone stairs. Comfortable hiking or sports shoes and layers for changing mountain weather are recommended.",
    "priceVND": 3700000,
    "priceINR": 13690
  },
  {
    "id": "sapa-in-depth-4d3n",
    "slug": "sapa-in-depth-4d3n",
    "title": "Sapa 4-Day 3-Night Complete Highlands Tour",
    "shortTitle": "Sapa 4D3N Tour",
    "destination": "Sapa",
    "region": "North Vietnam",
    "category": "Nature",
    "duration": "4 Days / 3 Nights",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Pickup in Hanoi Old Quarter (06:30 - 07:00)",
    "destinationDetails": "Sapa, Fansipan, Ham Rong, Muong Hoa, Moana View, Lao Cai",
    "description": "The most complete mountain journey through northwestern Vietnam. Cover every facet of Sapa: ethnic village treks in Cat Cat and Muong Hoa valley, panoramic vistas from Ham Rong Mountain, modern photography at Moana View, and conquering the 3,143-meter Fansipan summit.",
    "heroImage": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package",
      "4-Star Hotel Package",
      "5-Star Hotel Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Express Sleeper / Limousine Bus",
      "Trekking"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "4 full days discovering all facets of Sapa and surrounding ethnic valleys",
      "Trek through Cat Cat, Lao Chai, and Ta Van villages",
      "Visit Ham Rong Mountain orchid gardens and Heaven's Gate viewpoint",
      "Explore Moana View photo park overlooking the Fansipan mountain range",
      "Conquer Fansipan Peak at 3,143m altitude",
      "3 nights hotel accommodation with included meals"
    ],
    "itinerary": [
      {
        "time": "Day 1",
        "title": "Hanoi to Sapa & Cat Cat Village",
        "description": "Depart Hanoi at 06:30. Arrive in Sapa, lunch, check in, and trek to Cat Cat village."
      },
      {
        "time": "Day 2",
        "title": "Muong Hoa Valley Trek (Lao Chai - Ta Van)",
        "description": "Full-day trek through terraced rice fields to Lao Chai and Ta Van. Lunch in village."
      },
      {
        "time": "Day 3",
        "title": "Fansipan Peak & Ham Rong Mountain",
        "description": "Ascend Fansipan Peak via cable car in the morning. Afternoon visit to Ham Rong mountain flower gardens."
      },
      {
        "time": "Day 4",
        "title": "Moana View & Return to Hanoi",
        "description": "Visit Moana Sapa viewpoint in the morning. Lunch, check out, and board afternoon coach back to Hanoi by ~19:30."
      }
    ],
    "inclusions": [
      "Round-trip expressway bus transportation",
      "3 nights hotel accommodation",
      "Meals: 4 Lunches and 3 Breakfasts",
      "Entrance fees to Cat Cat, Lao Chai, Ta Van, Ham Rong, and Moana View",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Fansipan cable car ticket",
      "Dinners (free choice in Sapa)",
      "Single room supplement",
      "Personal expenses"
    ],
    "optionalItems": [
      "Fansipan Cable Car ticket"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter on Day 4 at ~19:30.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Layered clothing recommended for mountain weather."
    ],
    "dietaryInformation": {
      "standard": "4 Lunches and 3 Breakfasts included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "SAPA 4D3N",
    "source": "(TA) SAPA 4D3N.pdf",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "sapa-4d3n-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "priceVND": 4700000,
        "priceINR": 17390
      },
      {
        "id": "sapa-4d3n-4star",
        "name": "4-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "Express Tourist Coach",
        "priceVND": 5800000,
        "priceINR": 21460
      }
    ],
    "advisory": "High Altitude Advisory: Fansipan summit sits at 3,143 meters; temperatures can be near freezing in winter with brisk winds. Warm clothing and windbreakers are essential.",
    "priceVND": 4700000,
    "priceINR": 17390
  },
  {
    "id": "sapa-trekking-train-2d2n",
    "slug": "sapa-trekking-train-2d2n",
    "title": "Sapa Trekking & Fansipan by Overnight Sleeper Train (2D2N)",
    "shortTitle": "Sapa by Train (2D2N)",
    "destination": "Sapa",
    "region": "North Vietnam",
    "category": "Adventure",
    "duration": "2 Days / 2 Nights (Overnight Train)",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Meet at Hanoi Railway Station (Tran Quy Cap / Le Duan) at ~20:30",
    "destinationDetails": "Lao Cai Railway Station & Sapa Town",
    "description": "Experience the nostalgic romance of traveling to northern Vietnam aboard a classic overnight sleeper train. Sleep as the train rolls through the Red River valley, wake up in border-town Lao Cai, transfer up the mountain to Sapa, and enjoy 2 days of ethnic trekking and mountain vistas before taking the overnight train back.",
    "heroImage": "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Sleeper Train 4-Berth Cabin Package"
    ],
    "groupOptions": [
      "Join Group (Max 20)"
    ],
    "transportOptions": [
      "Overnight Sleeper Train (4-Berth AC Cabin)",
      "Mountain Transfer Van",
      "Trekking"
    ],
    "minimumPax": 1,
    "maximumPax": 20,
    "guide": "Licensed English-Speaking Guide in Sapa",
    "languages": [
      "English"
    ],
    "highlights": [
      "Nostalgic overnight sleeper train journey between Hanoi and Lao Cai",
      "Scenic mountain ascent from Lao Cai border station to Sapa",
      "Trek to Cat Cat village and explore Ham Rong mountain",
      "Optional excursion to Fansipan Peak by cable car",
      "1 night hotel accommodation in Sapa + 2 nights on sleeper train",
      "Included meals: 2 Lunches, 1 Breakfast"
    ],
    "itinerary": [
      {
        "time": "Night 1: 20:30",
        "title": "Board Train in Hanoi",
        "description": "Meet at Hanoi Railway Station. Board the overnight sleeper train (4-berth air-conditioned cabin). Depart at ~21:30."
      },
      {
        "time": "Day 1: 05:30",
        "title": "Arrive in Lao Cai & Transfer to Sapa",
        "description": "Arrive at Lao Cai Station. Transfer by scenic shared van ~1 hour up mountain roads to Sapa town. Breakfast, freshen up, and check in."
      },
      {
        "time": "Day 1: 09:30",
        "title": "Cat Cat Village Trek",
        "description": "Trek through Cat Cat village, visiting waterfalls and Black H'mong houses. Lunch in town."
      },
      {
        "time": "Day 1: 14:00",
        "title": "Ham Rong Mountain",
        "description": "Explore Ham Rong mountain orchid gardens and Cloud Yard viewpoint overlooking Sapa."
      },
      {
        "time": "Day 2: 08:00",
        "title": "Fansipan Peak Option & Town Exploration",
        "description": "Breakfast at hotel. Optional trip to Fansipan Peak via cable car. Free time to explore Sapa town."
      },
      {
        "time": "Day 2: 12:00",
        "title": "Lunch & Free Afternoon",
        "description": "Lunch at local restaurant. Free time for shopping and cafes."
      },
      {
        "time": "Day 2: 17:00",
        "title": "Transfer to Lao Cai Station",
        "description": "Drive down to Lao Cai. Dinner on your own near station."
      },
      {
        "time": "Night 2: 20:30",
        "title": "Board Overnight Train to Hanoi",
        "description": "Board sleeper train back to Hanoi, arriving at ~05:00 the following morning."
      }
    ],
    "inclusions": [
      "Round-trip overnight sleeper train tickets (4-berth soft sleeper AC cabin)",
      "Shared van transfers between Lao Cai Station and Sapa town",
      "1 night hotel accommodation in Sapa (3-Star or 4-Star)",
      "Meals: 2 Lunches and 1 Breakfast",
      "All entrance fees (Cat Cat, Ham Rong)",
      "English-speaking guide during tours",
      "Bottled water"
    ],
    "exclusions": [
      "Fansipan cable car ticket",
      "Dinners",
      "Single room supplement",
      "Personal expenses",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Fansipan Cable Car ticket"
    ],
    "pickupInformation": "Meet at Hanoi Railway Station (Tran Quy Cap / Le Duan entrance) at 20:30.",
    "dropoffInformation": "Arrive at Hanoi Railway Station at ~05:00 following morning.",
    "childPolicy": "Under 3: Free (sharing berth with parents). 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Train tickets are issued in 4-berth shared cabins; private cabin booking available on request.",
      "Passport details required for train ticket issuance."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches and 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "SAPA 2D2N ĐI TÀU",
    "source": "(TA) SAPA 2D2N.pdf",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "sapa-train-3star",
        "name": "3-Star Hotel + Sleeper Train (4-Berth)",
        "format": "join_group",
        "vehicleType": "Overnight Train + AC Van",
        "notes": "Shared 4-berth cabin on train.",
        "priceVND": 4200000,
        "priceINR": 15540
      }
    ],
    "advisory": "Overnight Sleeper Train & Trekking Advisory: Train cabins are 4-berth air-conditioned compartments. Daytime trekking covers 6–10 km along village trails; broken-in trekking footwear is strongly recommended.",
    "priceVND": 4200000,
    "priceINR": 15540
  },
  {
    "id": "cao-bang-ban-gioc-waterfall-2d1n",
    "slug": "cao-bang-ban-gioc-waterfall-2d1n",
    "title": "Cao Bang & Ban Gioc Waterfall 2-Day 1-Night Tour",
    "shortTitle": "Ban Gioc Waterfall 2D1N",
    "destination": "Cao Bang",
    "region": "North Vietnam",
    "category": "Adventure",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Hanoi",
    "departureDetails": "Pickup in Hanoi Old Quarter (06:00 - 06:30)",
    "destinationDetails": "Cao Bang Province & Ban Gioc Waterfall (~360 km north)",
    "description": "Witness the thunderous majesty of Ban Gioc Waterfall, the largest multi-tiered waterfall in Southeast Asia straddling the border between Vietnam and China. Explore Nguom Ngao Cave (Tiger Cave) with its subterranean limestone wonders and discover the peaceful rural beauty of Cao Bang province.",
    "heroImage": "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Dorm Accommodation Package",
      "Private Hotel Accommodation Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Raft at Ban Gioc Waterfall"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Marvel at the jaw-dropping spectacle of Ban Gioc Waterfall on the Vietnam-China border",
      "Take a bamboo raft cruise up close to the misty cascading falls on Quay Son River",
      "Explore the incredible 2-kilometer underground chambers of Nguom Ngao (Tiger) Cave",
      "Pass through dramatic karst mountain passes of northeastern Vietnam",
      "Overnight stay in Cao Bang with choice of dorm or private room accommodation",
      "Included meals: 2 Lunches, 1 Dinner, 1 Breakfast"
    ],
    "itinerary": [
      {
        "time": "Day 1: 06:00 - 06:30",
        "title": "Hanoi Departure",
        "description": "Pickup in Hanoi Old Quarter. Drive via Thai Nguyen and Bac Kan through scenic mountain landscapes."
      },
      {
        "time": "Day 1: 12:30",
        "title": "Lunch Break",
        "description": "Vietnamese lunch at local restaurant along the route."
      },
      {
        "time": "Day 1: 15:30",
        "title": "Nguom Ngao Cave",
        "description": "Arrive in Trung Khanh district. Explore Nguom Ngao Cave, admiring subterranean waterfalls and spectacular stalactites shaped like lotus flowers and tigers."
      },
      {
        "time": "Day 1: 18:00",
        "title": "Check in & Dinner",
        "description": "Check in to homestay/hotel in Cao Bang. Traditional dinner with local specialties."
      },
      {
        "time": "Day 2: 07:30",
        "title": "Ban Gioc Waterfall",
        "description": "Breakfast at accommodation. Travel to Ban Gioc Waterfall. Take a bamboo raft to the base of the roaring cascades. Visit Truc Lam Ban Gioc Zen Monastery on the hillside."
      },
      {
        "time": "Day 2: 12:00",
        "title": "Lunch",
        "description": "Lunch at local restaurant."
      },
      {
        "time": "Day 2: 13:30 - 20:00",
        "title": "Return to Hanoi",
        "description": "Board coach and return to Hanoi Old Quarter by ~20:00."
      }
    ],
    "inclusions": [
      "Air-conditioned tourist vehicle",
      "1 night accommodation (Dorm or Private Room as selected)",
      "Meals: 2 Lunches, 1 Dinner, 1 Breakfast",
      "All entrance tickets (Ban Gioc Waterfall, Nguom Ngao Cave, Truc Lam Pagoda)",
      "Bamboo raft ticket at Ban Gioc Waterfall",
      "English-speaking tour guide",
      "Bottled water"
    ],
    "exclusions": [
      "Single room supplement (on private room package)",
      "Drinks and personal expenses",
      "Tips for driver and guide"
    ],
    "optionalItems": [
      "Border market shopping"
    ],
    "pickupInformation": "Pickup in Hanoi Old Quarter between 06:00 and 06:30.",
    "dropoffInformation": "Dropoff in Hanoi Old Quarter on Day 2 at ~20:00.",
    "childPolicy": "Under 3: Free. 3-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Long drive through mountain terrain (~7 hours each way); motion sickness medication recommended if prone.",
      "Passport required due to border zone proximity."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches, 1 Dinner, 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CAO BANG BAN GIOC WATERFALL 2D1N",
    "source": "(TA) BAN GIOC 2D1N.pdf / BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 35 & 36)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "ban-gioc-dorm",
        "name": "Dorm Homestay Accommodation Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Shared dorm accommodation in traditional stilt house.",
        "priceVND": 5800000,
        "priceINR": 21460
      },
      {
        "id": "ban-gioc-private",
        "name": "Private Room Hotel Accommodation Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Private room in local hotel/guesthouse.",
        "priceVND": 6900000,
        "priceINR": 25530
      }
    ],
    "advisory": "Border Region Advisory: Ban Gioc is situated along the international border with China. Valid passport and Vietnam visa must be carried at all times for border authority verification.",
    "priceVND": 5800000,
    "priceINR": 21460
  },
  {
    "id": "cu-chi-tunnels-half-day",
    "slug": "cu-chi-tunnels-half-day",
    "title": "Cu Chi Tunnels Half-Day Tour (Morning / Afternoon)",
    "shortTitle": "Cu Chi Tunnels Half-Day",
    "destination": "Cu Chi",
    "region": "South Vietnam",
    "category": "History",
    "duration": "Half-Day (~5-6 Hours)",
    "durationType": "half_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (Morning 07:30 - 08:00 or Afternoon 12:30 - 13:00)",
    "destinationDetails": "Ben Dinh / Ben Duoc, Cu Chi District (~70 km northwest of Saigon)",
    "description": "Descend into the legendary underground world of the Cu Chi Tunnels, an astonishing 250-kilometer subterranean network used by the Viet Cong during the Vietnam War. Discover concealed trapdoors, secret living chambers, smoke-dispersing kitchens, and weapon traps, with an optional opportunity to fire historic firearms at the firing range.",
    "heroImage": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 35)",
      "Small Group (Max 15)",
      "Luxury D-Car Limousine (Max 10)",
      "Army Vintage Jeep"
    ],
    "groupOptions": [
      "Big Group",
      "Small Group",
      "Luxury D-Car Limousine",
      "Private Vintage Jeep"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Open-Top Army Vintage Jeep"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Local Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore the authentic 250-km subterranean labyrinth of Cu Chi Tunnels",
      "Crawl through safe, widened sections of the underground tunnels",
      "Discover hidden trapdoors, underground kitchens (Hoang Cam), meeting rooms, and hospitals",
      "Watch an archival documentary film showing wartime life underground",
      "Taste wartime staple food: steamed tapioca/cassava served with sesame-peanut salt and hot tea",
      "Optional target shooting with real AK-47 or M16 rifles at the national defense firing range"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00 (or 12:30 - 13:00)",
        "title": "Hotel Pickup in Saigon",
        "description": "Pickup from hotel in District 1. Depart for Cu Chi Tunnels (~1.5 hours drive)."
      },
      {
        "time": "09:30 (or 14:30)",
        "title": "Arrive at Cu Chi Tunnels",
        "description": "Watch an introductory documentary explaining the history, defense system, and construction of the tunnels."
      },
      {
        "time": "10:00 (or 15:00)",
        "title": "Explore Underground Network",
        "description": "Walk through the jungle to discover secret entrances, bamboo booby traps, underground command bunkers, workshops, and kitchens. Crawl through a section of the tunnel."
      },
      {
        "time": "11:15 (or 16:15)",
        "title": "Firing Range & Cassava Tasting",
        "description": "Optional visit to the shooting range to fire wartime rifles (own expense). Enjoy boiled cassava with sesame salt and local tea."
      },
      {
        "time": "12:00 (or 17:00)",
        "title": "Return to Saigon",
        "description": "Board vehicle for the journey back to Ho Chi Minh City center."
      },
      {
        "time": "13:30 - 14:00 (or 18:30)",
        "title": "Hotel Dropoff",
        "description": "Dropoff at your hotel or Ben Thanh market in District 1."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, Luxury D-Car, or Army Jeep)",
      "All entrance tickets to Cu Chi Tunnels",
      "Licensed English-speaking tour guide",
      "Steamed cassava tasting and hot tea",
      "Bottled water"
    ],
    "exclusions": [
      "Shooting range bullets and firearm rental",
      "Lunch (unless combined with full-day tour)",
      "Personal expenses and drinks",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Live shooting range bullets (AK-47 / M16)"
    ],
    "pickupInformation": "Pickup in District 1, Ho Chi Minh City (07:30-08:00 morning session, or 12:30-13:00 afternoon session).",
    "dropoffInformation": "Dropoff at District 1 hotels or central location at ~13:30 - 14:00 (morning) or ~18:30 (afternoon).",
    "childPolicy": "Under 4: Free (sitting with parents). 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Regular Days: Cancel 3+ days before: 30% fee; 2 days before: 50% fee; 1 day before: 100% fee. Holidays / Tet: Cancel 5+ days before: 30% fee; 3 days before: 50% fee; 2 days before: 100% fee.",
    "importantNotes": [
      "The tour operator is not responsible if guests are >5 minutes late (group) or >30 minutes late (private).",
      "Crawling through tunnels is optional; guests with claustrophobia or heart conditions can remain above ground.",
      "Wear comfortable shoes and clothes that can get dusty."
    ],
    "dietaryInformation": {
      "standard": "Steamed cassava with sesame salt and tea included. No meals on half-day tour.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Cassava snack is naturally plant-based. No full meal included on half-day tour."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CU CHI TUNNELS HALF DAY TOUR / CU CHI TUNNEL HALF DAY TOUR WITH ARMY VINTAGE JEEP",
    "source": "(TA) Cu Chi Half Day.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 15, 16, 17, 36)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cu-chi-half-big",
        "name": "Big Group (Max 35)",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 400000,
        "priceINR": 1480
      },
      {
        "id": "cu-chi-half-small",
        "name": "Small Group (Max 15)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15 pax",
        "priceVND": 550000,
        "priceINR": 2035
      },
      {
        "id": "cu-chi-half-dcar",
        "name": "Luxury D-Car Limousine (Max 10)",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "inclusionsAddon": [
          "Plush leather massage seats",
          "Complimentary chilled wipes"
        ],
        "priceVND": 1000000,
        "priceINR": 3700
      },
      {
        "id": "cu-chi-half-jeep",
        "name": "Open-Top Army Vintage Jeep Tour",
        "format": "vintage_jeep",
        "vehicleType": "Restored Military Vintage Jeep",
        "groupSize": "Join / Private Jeep",
        "inclusionsAddon": [
          "Open-top panoramic breeze"
        ],
        "priceVND": 3550000,
        "priceINR": 13135
      }
    ],
    "advisory": "Tunnel Crawl Notice: The original underground tunnel crawl spaces are confined with low lighting. Tunnel crawling is entirely optional — above-ground exhibitions, historic shelters, and trap displays are fully accessible without entering the tunnels.",
    "priceVND": 400000,
    "priceINR": 1480
  },
  {
    "id": "cu-chi-tunnels-hcm-city-full-day",
    "slug": "cu-chi-tunnels-hcm-city-full-day",
    "title": "Cu Chi Tunnels & Ho Chi Minh City Highlights Full-Day",
    "shortTitle": "Cu Chi & Saigon Full-Day",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "History",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "Cu Chi Tunnels & Central Ho Chi Minh City landmarks",
    "description": "The perfect one-day introduction to southern Vietnam. Spend your morning crawling through the wartime tunnels of Cu Chi, enjoy a traditional Vietnamese lunch, and spend your afternoon exploring the iconic architectural and historic landmarks of Saigon: War Remnants Museum, Reunification Palace, Notre Dame Cathedral, and the Central Post Office.",
    "heroImage": "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day",
      "Private Tour (2-3 pax, 4-5 pax, 6+ pax)"
    ],
    "groupOptions": [
      "Join Group (Max 25)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Private Sedan / SUV / Van"
    ],
    "minimumPax": 2,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Morning exploration of Cu Chi underground tunnel network and war history",
      "Sample wartime boiled cassava with peanut salt",
      "Traditional Vietnamese lunch included at local restaurant",
      "Visit the War Remnants Museum and historic Reunification Palace",
      "Admire French colonial architecture: Notre Dame Cathedral & Central Post Office",
      "Explore bustling Ben Thanh Market for souvenirs and coffee"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotels. Transfer to Cu Chi Tunnels."
      },
      {
        "time": "09:30",
        "title": "Cu Chi Tunnels Tour",
        "description": "Explore underground tunnels, trapdoors, meeting bunkers, and weapon displays."
      },
      {
        "time": "12:00",
        "title": "Return to Saigon & Lunch",
        "description": "Drive back to Saigon and enjoy a Vietnamese set lunch at a local restaurant."
      },
      {
        "time": "13:30",
        "title": "War Remnants Museum",
        "description": "Visit the poignant War Remnants Museum with extensive photographic and military equipment exhibitions."
      },
      {
        "time": "14:45",
        "title": "Reunification Palace",
        "description": "Tour the grand former Presidential Palace, site of the historic end of the Vietnam War in 1975."
      },
      {
        "time": "15:45",
        "title": "Notre Dame Cathedral & Post Office",
        "description": "Admire the iconic French colonial facade of Notre Dame Cathedral and explore the Gustave Eiffel-designed Central Post Office."
      },
      {
        "time": "16:30",
        "title": "Ben Thanh Market & Dropoff",
        "description": "Optional stop at Ben Thanh Market, followed by return to hotel by ~17:00."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "All entrance fees (Cu Chi, War Remnants Museum, Reunification Palace)",
      "Vietnamese set lunch",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Shooting range bullets at Cu Chi",
      "Drinks and personal expenses",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Shooting range bullets"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 2 passengers required for booking."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CU CHI WITH CITY TOUR (FULL DAY)",
    "source": "(TA) Cu Chi HCM City.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 18)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cu-chi-city-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "groupSize": "Max 25 pax",
        "priceVND": 950000,
        "priceINR": 3515
      },
      {
        "id": "cu-chi-city-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Sedan / SUV / Van",
        "groupSize": "Private",
        "priceVND": 2600000,
        "priceINR": 9620
      }
    ],
    "advisory": "Tunnel Notice: Cu Chi tunnel crawling is completely optional; above-ground grounds and historical video presentations are accessible to all.",
    "priceVND": 950000,
    "priceINR": 3515
  },
  {
    "id": "cu-chi-tunnels-mekong-delta-full-day",
    "slug": "cu-chi-tunnels-mekong-delta-full-day",
    "title": "Cu Chi Tunnels & Mekong Delta Full-Day Combo Tour",
    "shortTitle": "Cu Chi & Mekong Full-Day",
    "destination": "Cu Chi / Mekong Delta",
    "region": "South Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~10-11 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:15 - 07:45)",
    "destinationDetails": "Cu Chi Tunnels & My Tho / Ben Tre, Mekong Delta",
    "description": "Combine the two most famous day trips in southern Vietnam into one unforgettable day. Experience the underground guerrilla history at Cu Chi Tunnels in the morning, followed by a relaxing river cruise, hand-rowed sampan through coconut canals, tropical fruit tasting, and folk music in the Mekong Delta.",
    "heroImage": "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 22)",
      "Small Group (Max 15)",
      "Luxury D-Car Limousine (Max 10)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Big Group (Max 22)",
      "Small Group (Max 15)",
      "Luxury D-Car (Max 10)",
      "Private Tour"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Motorized Boat",
      "Hand-Rowed Sampan"
    ],
    "minimumPax": 1,
    "maximumPax": 22,
    "guide": "Licensed Multilingual Guide (English standard; Chinese/Japanese/Korean on private)",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Experience Cu Chi Tunnels and Mekong Delta in a single well-paced day",
      "Crawl through wartime underground tunnels and taste steamed cassava",
      "Cruise on the mighty Tien River past Dragon, Unicorn, Phoenix, and Tortoise Islands",
      "Row along lush water coconut canals on a traditional wooden sampan",
      "Enjoy honey bee tea, tropical fruits, and Southern folk music (Don Ca Tai Tu)",
      "Visit a traditional coconut candy workshop",
      "Savor Vietnamese lunch at a riverside restaurant"
    ],
    "itinerary": [
      {
        "time": "07:15 - 07:45",
        "title": "Pickup in District 1",
        "description": "Pickup from hotel in District 1. Depart for Cu Chi Tunnels."
      },
      {
        "time": "09:00",
        "title": "Cu Chi Tunnels",
        "description": "Explore the underground labyrinth, trapdoors, bunkers, and wartime exhibits. Optional shooting range."
      },
      {
        "time": "11:30",
        "title": "Depart for Mekong Delta",
        "description": "Drive southward through the scenic countryside to My Tho in the Mekong Delta."
      },
      {
        "time": "13:00",
        "title": "Lunch Break",
        "description": "Enjoy a delicious Vietnamese lunch at a riverside restaurant."
      },
      {
        "time": "14:00",
        "title": "Mekong River Cruise & Islands",
        "description": "Board motorboat to Unicorn Island. Visit bee farm for honey tea, taste seasonal tropical fruits while listening to Don Ca Tai Tu folk music."
      },
      {
        "time": "15:00",
        "title": "Hand-Rowed Sampan & Coconut Candy",
        "description": "Glide through narrow coconut palm canals on a traditional sampan. Visit a local coconut candy workshop."
      },
      {
        "time": "16:00",
        "title": "Return to Harbor & Depart",
        "description": "Cruise back to My Tho port and board vehicle for return journey."
      },
      {
        "time": "18:30 - 19:00",
        "title": "Dropoff in Saigon",
        "description": "Dropoff at hotel in District 1."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or Luxury D-Car)",
      "All entrance fees at Cu Chi Tunnels",
      "All Mekong boat cruises and hand-rowed sampan tickets",
      "Vietnamese set lunch",
      "Honey tea, fruit tasting, and folk music performance",
      "English-speaking guide (or selected language guide on private tour)",
      "Bottled water"
    ],
    "exclusions": [
      "Shooting range bullets at Cu Chi",
      "Drinks and personal expenses",
      "Tips for boat rowers, guide, and driver"
    ],
    "optionalItems": [
      "Shooting range bullets"
    ],
    "pickupInformation": "Pickup in District 1 between 07:15 and 07:45.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~18:30 - 19:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Fast-paced day combining two regions; wear comfortable walking shoes."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included at local restaurant.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "MEKONG - CU CHI DAY TOUR / CỦ CHI VÀ MEKONG FULL DAY TOUR",
    "source": "(TA) Cu Chi Mekong Day Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 4-8)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cu-chi-mekong-big",
        "name": "Big Group (Max 22)",
        "format": "join_group",
        "vehicleType": "22-Seater AC Coach",
        "groupSize": "Max 22 pax",
        "priceVND": 850000,
        "priceINR": 3145
      },
      {
        "id": "cu-chi-mekong-small",
        "name": "Small Group (Max 15)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15 pax",
        "priceVND": 950000,
        "priceINR": 3515
      },
      {
        "id": "cu-chi-mekong-dcar",
        "name": "Luxury D-Car Limousine (Max 10)",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1550000,
        "priceINR": 5735
      },
      {
        "id": "cu-chi-mekong-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (English, Chinese, Japanese, or Korean guide available)",
        "priceVND": 2850000,
        "priceINR": 10545
      }
    ],
    "destinations": [
      "Cu Chi",
      "Mekong Delta"
    ],
    "advisory": "Combo Day Advisory: Full-day itinerary covers two distinct regions. Tunnel crawl at Cu Chi is optional. Sun protection and comfortable footwear recommended for boat transfers.",
    "priceVND": 850000,
    "priceINR": 3145
  },
  {
    "id": "cu-chi-cao-dai-black-virgin-3-spots",
    "slug": "cu-chi-cao-dai-black-virgin-3-spots",
    "title": "Cu Chi Tunnels, Cao Dai Temple & Black Virgin Mountain",
    "shortTitle": "Cu Chi, Cao Dai & Ba Den",
    "destination": "Tay Ninh / Cu Chi",
    "region": "South Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~11 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:00 - 07:30)",
    "destinationDetails": "Cu Chi District & Tay Ninh Province (~95 km northwest)",
    "description": "An epic full-day expedition combining underground wartime heroism, mystical religion, and sacred mountain peaks. Explore the Cu Chi Tunnels, witness the colorful noon prayer ceremony at the Cao Dai Great Holy See, and ascend Black Virgin Mountain (Nui Ba Den) by cable car to admire the tallest bronze Buddha statue in Asia.",
    "heroImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Small Group (Max 15)",
      "Luxury D-Car Limousine (Max 10)",
      "Private Tour"
    ],
    "groupOptions": [
      "Small Group (Max 15)",
      "Luxury D-Car (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Van / Luxury D-Car",
      "Cable Car at Ba Den Mountain"
    ],
    "minimumPax": 1,
    "maximumPax": 15,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore the wartime underground tunnels of Cu Chi",
      "Attend the mesmerizing noon chanting ritual at the Cao Dai Holy See Temple",
      "Ascend Black Virgin Mountain (Nui Ba Den) via modern cable car system",
      "Marvel at the record-breaking 72-meter bronze Lady Buddha statue (Tay Bo Da Son)",
      "Panoramic views across the southern plains from the sacred 986m summit",
      "Vietnamese lunch included at local restaurant"
    ],
    "itinerary": [
      {
        "time": "07:00 - 07:30",
        "title": "Pickup in Saigon",
        "description": "Pickup from District 1 hotels. Drive to Cu Chi Tunnels."
      },
      {
        "time": "08:45",
        "title": "Cu Chi Tunnels Tour",
        "description": "Explore underground tunnels, bunkers, trapdoors, and wartime exhibits."
      },
      {
        "time": "11:00",
        "title": "Depart for Tay Ninh",
        "description": "Drive through the countryside to Tay Ninh Holy See."
      },
      {
        "time": "11:45",
        "title": "Cao Dai Noon Ceremony",
        "description": "Witness the vibrant midday mass at the Cao Dai Great Temple, admiring worshippers in colorful robes."
      },
      {
        "time": "12:45",
        "title": "Lunch Break",
        "description": "Enjoy Vietnamese lunch at a local restaurant."
      },
      {
        "time": "14:00",
        "title": "Black Virgin Mountain (Nui Ba Den)",
        "description": "Take cable car up the sacred mountain to visit the Pagoda and the colossal bronze Buddha on the cloud-shrouded summit."
      },
      {
        "time": "16:30",
        "title": "Depart for Saigon",
        "description": "Board vehicle for the return journey."
      },
      {
        "time": "19:00",
        "title": "Dropoff in Saigon",
        "description": "Arrive back at your hotel in District 1."
      }
    ],
    "inclusions": [
      "Transportation as booked (Van or Luxury D-Car)",
      "All entrance fees to Cu Chi Tunnels and Cao Dai Temple",
      "Vietnamese lunch at local restaurant",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Ba Den Mountain cable car ticket (optional 450,000 VND/pax)",
      "Shooting range bullets at Cu Chi",
      "Drinks and personal expenses"
    ],
    "optionalItems": [
      "Ba Den cable car ticket (450,000 VND/pax)"
    ],
    "pickupInformation": "Pickup in District 1 between 07:00 and 07:30.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~19:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Modest attire required at Cao Dai Temple (knees and shoulders covered, shoes removed at entrance).",
      "Cable car ticket at Ba Den is 450,000 VND/pax optional."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CU CHI, CAO DAI & BLACK VIRGIN (3 ĐIỂM)",
    "source": "(TA) Cu Chi Tay Ninh.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 19 & 20)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cuchi-caodai-baden-small",
        "name": "Small Group (Max 15)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15 pax",
        "priceVND": 1250000,
        "priceINR": 4625
      },
      {
        "id": "cuchi-caodai-baden-dcar",
        "name": "Luxury D-Car Limousine (Max 10)",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1750000,
        "priceINR": 6475
      }
    ],
    "destinations": [
      "Cu Chi",
      "Tay Ninh"
    ],
    "advisory": "Sacred Site Etiquette: Modest attire with covered shoulders and knees is mandatory at Cao Dai Holy See during the midday noon prayer ceremony. Shoes must be removed before entering the temple.",
    "priceVND": 1250000,
    "priceINR": 4625
  },
  {
    "id": "cao-dai-black-virgin-2-spots",
    "slug": "cao-dai-black-virgin-2-spots",
    "title": "Cao Dai Temple & Black Virgin Mountain Day Tour",
    "shortTitle": "Cao Dai & Ba Den",
    "destination": "Tay Ninh",
    "region": "South Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~10 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "Tay Ninh Province (~95 km northwest of Saigon)",
    "description": "Delve deep into the spiritual heart of southern Vietnam. Experience the extraordinary syncretic faith of Caodaism during the noon mass at the Great Temple, then ride the cable car to the peak of Black Virgin Mountain to admire flower gardens, cloud seas, and the monumental bronze Bodhisattva.",
    "heroImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group Full-Day",
      "Private Tour"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Cable Car"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Attend the solemn and colorful noon ritual at Tay Ninh Holy See Temple",
      "Learn about Caodaism's synthesis of Buddhism, Taoism, Confucianism, and Christianity",
      "Cable car journey up Ba Den Mountain, the highest peak in Southern Vietnam (986m)",
      "Gaze at the 72m bronze Buddha statue surrounded by clouds and ornamental gardens",
      "Vietnamese lunch included"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Pickup in Saigon",
        "description": "Pickup from District 1 hotels. Transfer to Tay Ninh."
      },
      {
        "time": "10:30",
        "title": "Black Virgin Mountain (Nui Ba Den)",
        "description": "Arrive at Ba Den Mountain. Take cable car to the peak / pagoda complex to explore."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy Vietnamese lunch at a local restaurant."
      },
      {
        "time": "14:00",
        "title": "Cao Dai Holy See Temple",
        "description": "Explore the majestic architectural marvel of the Cao Dai Great Temple and observe the spiritual rituals."
      },
      {
        "time": "16:00",
        "title": "Return to Saigon",
        "description": "Board coach and drive back to Ho Chi Minh City."
      },
      {
        "time": "18:30",
        "title": "Dropoff",
        "description": "Dropoff at hotel in District 1."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "All entrance fees",
      "Vietnamese lunch",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Ba Den Mountain cable car ticket (optional 450,000 VND/pax)",
      "Drinks and personal expenses"
    ],
    "optionalItems": [
      "Ba Den cable car ticket (450,000 VND/pax)"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~18:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Dress code: Modest attire required at Cao Dai Temple."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options available upon request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CAO DAI & BLACK VIRGIN ( 2 ĐIỂM )",
    "source": "(DL TV) Tay Ninh.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 21)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "caodai-baden-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 950000,
        "priceINR": 3515
      },
      {
        "id": "caodai-baden-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private",
        "priceVND": 2350000,
        "priceINR": 8695
      }
    ],
    "destinations": [
      "Tay Ninh"
    ],
    "advisory": "Temple Protocol: Cao Dai Holy See requires respectful silence and conservative dress (shoulders and knees covered). Visitors are guided to the second-floor gallery to observe the noon mass without disrupting worshippers.",
    "priceVND": 950000,
    "priceINR": 3515
  },
  {
    "id": "tay-ninh-day-tour",
    "slug": "tay-ninh-day-tour",
    "title": "Tay Ninh & Black Virgin Mountain Day Tour",
    "shortTitle": "Tay Ninh Day Tour",
    "destination": "Tay Ninh",
    "region": "South Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~10 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "Tay Ninh Province",
    "description": "Discover the unique spiritual and natural wonders of Tay Ninh province. Visit the iconic Cao Dai Holy See, explore the foothills and peaks of Ba Den Mountain, and learn about the sacred folklore and vibrant culture of this southwestern border region.",
    "heroImage": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day",
      "Private Tour"
    ],
    "groupOptions": [
      "Join Group (Max 25)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit the holy center of Caodaism at Tay Ninh Holy See",
      "Explore Black Virgin Mountain sacred shrines",
      "Savor authentic regional cuisine of Tay Ninh",
      "Learn about southern Vietnamese religious syncretism"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Hotel Pickup",
        "description": "Pickup in District 1 and travel to Tay Ninh."
      },
      {
        "time": "10:30",
        "title": "Tay Ninh Exploration",
        "description": "Visit Ba Den Mountain and surrounding cultural shrines."
      },
      {
        "time": "12:00",
        "title": "Cao Dai Midday Ceremony",
        "description": "Experience the sacred noon prayers at the Great Temple."
      },
      {
        "time": "13:30",
        "title": "Lunch",
        "description": "Lunch at local restaurant."
      },
      {
        "time": "15:30 - 18:00",
        "title": "Return to Saigon",
        "description": "Board vehicle for return drive to Ho Chi Minh City."
      }
    ],
    "inclusions": [
      "Air-conditioned transport",
      "All entrance fees",
      "Lunch",
      "English guide",
      "Water"
    ],
    "exclusions": [
      "Cable car ticket",
      "Personal expenses"
    ],
    "optionalItems": [
      "Ba Den cable car ticket"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~18:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Respectful temple dress code required."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options available upon request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "TÂY NINH DAY TOUR",
    "source": "(TA) Tay Ninh Day Tour.pdf",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "tay-ninh-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "priceVND": 950000,
        "priceINR": 3515
      }
    ],
    "destinations": [
      "Tay Ninh"
    ],
    "advisory": "Sacred Site Notice: Modest clothing is required when entering temples at Ba Den Mountain and Cao Dai Holy See.",
    "priceVND": 950000,
    "priceINR": 3515
  },
  {
    "id": "mekong-river-day-tour-my-tho-ben-tre",
    "slug": "mekong-river-day-tour-my-tho-ben-tre",
    "title": "Mekong Delta Day Tour (My Tho & Ben Tre Islands)",
    "shortTitle": "Mekong Delta Day Tour",
    "destination": "Mekong Delta",
    "region": "South Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~8-9 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "My Tho (Tien Giang) & Ben Tre (~75 km south of Saigon)",
    "description": "Experience the timeless rhythm of the Mekong Delta on a classic day trip. Cruise the wide Tien River, cycle around lush Unicorn Island, drift through shady coconut palm canals on a hand-rowed sampan, visit a bee farm for honey tea, taste tropical fruits accompanied by live folk music, and tour a traditional coconut candy workshop.",
    "heroImage": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 35)",
      "Small Group (Max 15)",
      "Luxury D-Car Limousine (Max 10)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 15)",
      "Luxury D-Car (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Luxury D-Car Limousine",
      "Motorized Riverboat",
      "Hand-Rowed Sampan",
      "Bicycle"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed Multilingual Guide",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Scenic boat cruise along the Tien River viewing Dragon, Unicorn, Phoenix, and Tortoise Islands",
      "Row through narrow coconut-fringed canals on a traditional wooden sampan",
      "Visit Vinh Trang Pagoda, the oldest and largest Buddhist temple in Tien Giang province",
      "Taste honey tea at a local apiary and fresh tropical fruits while listening to Don Ca Tai Tu music",
      "Watch artisans hand-make coconut candy and sample warm candies fresh from the pan",
      "Enjoy a traditional Southern Vietnamese lunch and relax in hammocks under palm trees"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotels. Depart for My Tho via the National Highway."
      },
      {
        "time": "09:30",
        "title": "Vinh Trang Pagoda",
        "description": "Visit the magnificent Vinh Trang Pagoda, renowned for its fusion of Asian and European architectural styles."
      },
      {
        "time": "10:00",
        "title": "My Tho Port & Riverboat Cruise",
        "description": "Board motorboat at My Tho Port. Cruise across the Tien River past floating fish farms to Unicorn Island (Con Lan)."
      },
      {
        "time": "10:45",
        "title": "Bee Farm & Tropical Fruit Tasting",
        "description": "Visit an orchard garden and bee farm. Sip warm honey-lime tea. Taste tropical fruits while listening to traditional folk music."
      },
      {
        "time": "11:30",
        "title": "Hand-Rowed Sampan Canal Ride",
        "description": "Board a small wooden sampan hand-rowed by locals along shaded water coconut canals."
      },
      {
        "time": "12:15",
        "title": "Coconut Candy Workshop",
        "description": "Visit a family-run workshop to see how coconut milk is boiled, pulled, and cut into sweet treats."
      },
      {
        "time": "13:00",
        "title": "Lunch Break",
        "description": "Enjoy a delicious local Vietnamese lunch featuring elephant ear fish (or chicken/pork) and fresh vegetables. Free time for cycling or hammock rest."
      },
      {
        "time": "15:00",
        "title": "Cruise Back & Depart for Saigon",
        "description": "Return to My Tho Port and board coach for return drive."
      },
      {
        "time": "17:00 - 17:30",
        "title": "Hotel Dropoff",
        "description": "Dropoff at your hotel in District 1."
      }
    ],
    "inclusions": [
      "Round-trip air-conditioned transportation",
      "All boat trips and hand-rowed sampan tickets",
      "Entrance fees to Vinh Trang Pagoda and island attractions",
      "Vietnamese set lunch",
      "Honey tea, tropical fruit tasting, and folk music show",
      "Bicycle rental on the island",
      "English-speaking guide (or selected language guide on private tour)",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks ordered during lunch",
      "Personal shopping and souvenirs",
      "Tips for boat rowers, guide, and driver"
    ],
    "optionalItems": [
      "Horse-drawn carriage ride (where available)"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:00 - 17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Life jackets provided and mandatory during boat transit."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "MEKONG RIVER DAY TOUR / MEKONG DAY TOUR",
    "source": "(TA) Mekong River Day Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 1, 2, 3)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "mekong-day-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 550000,
        "priceINR": 2035
      },
      {
        "id": "mekong-day-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15 pax",
        "priceVND": 650000,
        "priceINR": 2405
      },
      {
        "id": "mekong-day-dcar",
        "name": "Luxury D-Car Limousine Full-Day",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1150000,
        "priceINR": 4255
      },
      {
        "id": "mekong-day-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private",
        "priceVND": 2500000,
        "priceINR": 9250
      }
    ],
    "destinations": [
      "Mekong Delta"
    ],
    "priceVND": 550000,
    "priceINR": 2035
  },
  {
    "id": "mekong-delta-cai-be-countryside",
    "slug": "mekong-delta-cai-be-countryside",
    "title": "Mekong Delta - Cai Be Floating Market & Countryside Tour",
    "shortTitle": "Cai Be Countryside Tour",
    "destination": "Mekong Delta",
    "region": "South Vietnam",
    "category": "Culture",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30)",
    "destinationDetails": "Cai Be District, Tien Giang Province (~110 km southwest)",
    "description": "Experience the peaceful rural lifestyle of Cai Be. Glide through secluded canals in a hand-rowed boat, visit traditional family workshops producing popped rice cakes, rice wine, and coconut candy, cycle along peaceful village pathways, and savor a homemade lunch made with organic, locally sourced ingredients.",
    "heroImage": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Small Group (Max 15)",
      "Luxury D-Car Limousine (Max 10)"
    ],
    "groupOptions": [
      "Small Group (Max 15)",
      "Luxury D-Car (Max 10)"
    ],
    "transportOptions": [
      "Air-Conditioned Van / Luxury D-Car",
      "Wooden Boat",
      "Rowboat",
      "Bicycle"
    ],
    "minimumPax": 2,
    "maximumPax": 15,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore Cai Be's quieter rural waterways far from large tourist crowds",
      "Visit local family workshops: popped rice crisps, rice wine, and coconut candy",
      "Glide along quiet canals in a hand-rowed boat under lush green canopies",
      "Savor a homemade lunch in Cai Be made with organic, locally sourced ingredients",
      "Cycle along peaceful village paths and interact with friendly countryside residents"
    ],
    "itinerary": [
      {
        "time": "07:30",
        "title": "Depart Saigon",
        "description": "Pickup from District 1. Drive ~2 hours via expressway passing rice fields and orchards."
      },
      {
        "time": "09:30",
        "title": "Arrive in Cai Be & Family Workshops",
        "description": "Board boat to visit traditional craft workshops. See how popped rice cakes, rice wine, and coconut candy are handmade."
      },
      {
        "time": "11:00",
        "title": "Hand-Rowed Boat & Village Life",
        "description": "Transfer to small hand-rowed sampan to drift through narrow, tranquil canals."
      },
      {
        "time": "12:15",
        "title": "Homemade Lunch",
        "description": "Enjoy an authentic homemade lunch at a local home using organic ingredients."
      },
      {
        "time": "13:30",
        "title": "Bicycle Ride through Countryside",
        "description": "Cycle along shaded village roads, passing fruit orchards and traditional houses."
      },
      {
        "time": "15:00",
        "title": "Return to Boat & Depart",
        "description": "Cruise back to pier and board vehicle for return journey."
      },
      {
        "time": "17:30",
        "title": "Arrive in Saigon",
        "description": "Dropoff at hotel in District 1."
      }
    ],
    "inclusions": [
      "Transportation as booked (Van or Luxury D-Car)",
      "All boat and sampan tickets",
      "All entrance fees",
      "Homemade Vietnamese lunch with organic ingredients",
      "Bicycle rental",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Personal expenses and drinks",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 at 07:30.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 2 passengers required for departure."
    ],
    "dietaryInformation": {
      "standard": "Homemade lunch in Cai Be made with organic ingredients.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be arranged with advance notice."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CAI BE DAY TOUR",
    "source": "(TA) Mekong Cai Be.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 12 & 13)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cai-be-small",
        "name": "Small Group (Max 15)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 15 pax",
        "priceVND": 900000,
        "priceINR": 3330
      },
      {
        "id": "cai-be-dcar",
        "name": "Luxury D-Car Limousine (Max 10)",
        "format": "luxury_dcar",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1400000,
        "priceINR": 5180
      }
    ],
    "destinations": [
      "Mekong Delta"
    ],
    "priceVND": 900000,
    "priceINR": 3330
  },
  {
    "id": "tan-lap-floating-village-eco-tour",
    "slug": "tan-lap-floating-village-eco-tour",
    "title": "Tan Lap Floating Village & Cajuput Forest Eco-Tour",
    "shortTitle": "Tan Lap Floating Village",
    "destination": "Mekong Delta",
    "region": "South Vietnam",
    "category": "Nature",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (08:00)",
    "destinationDetails": "Tan Lap Floating Village, Moc Hoa District, Long An (~100 km)",
    "description": "Immerse yourself in one of Vietnam's top eco-tourism destinations. Wander along a 5-kilometer raised concrete path weaving through dense, aromatic Melaleuca (cajuput) forests, climb the 38-meter observation watchtower for panoramic wetland views, and paddle a small boat through serene moss-covered canals.",
    "heroImage": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group Full-Day",
      "Private Tour"
    ],
    "groupOptions": [
      "Join Group (Min 4 pax)",
      "Private Charter (2-3 pax, 4-5 pax, 6+ pax)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Vehicle",
      "Motorboat & Rowboat"
    ],
    "minimumPax": 4,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Walk the famous 5-km elevated stone trail winding through the dense cajuput forest",
      "Ascend the 38m observation tower for breathtaking 360-degree wetland views",
      "Glide along serene water channels blanketed in green duckweed on a rowboat",
      "Breathe in the therapeutic aroma of tea tree and cajuput essential oils",
      "Enjoy a peaceful countryside lunch featuring Long An wetland specialties"
    ],
    "itinerary": [
      {
        "time": "08:00",
        "title": "Depart Saigon",
        "description": "Pickup from District 1 hotels. Travel to Tan Lap Floating Village in Long An province."
      },
      {
        "time": "10:00",
        "title": "Arrive at Tan Lap",
        "description": "Board motorboat to cross Rung Tram forest. Arrive at the boardwalk trail entrance."
      },
      {
        "time": "10:30",
        "title": "Forest Trekking & Watchtower",
        "description": "Trek along the narrow trail winding through towering cajuput trees. Climb the observation tower for bird-eye views of the wetland."
      },
      {
        "time": "12:00",
        "title": "Lunch Break",
        "description": "Enjoy a delicious lunch at a local restaurant with regional specialties."
      },
      {
        "time": "13:30",
        "title": "Rowboat through Water Canals",
        "description": "Take a tranquil rowboat trip through water lily canals and duckweed-covered streams."
      },
      {
        "time": "15:00",
        "title": "Depart Tan Lap",
        "description": "Board vehicle for return drive to Saigon."
      },
      {
        "time": "17:30",
        "title": "Hotel Dropoff",
        "description": "Dropoff at hotel in District 1."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "All entrance fees and boat tickets in Tan Lap",
      "Vietnamese lunch",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 at 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 4 passengers required for group departure."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options available on request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "TAN LAP FLOATING DAY TOUR / TAN LAP DAY TOUR",
    "source": "(TA) Tan Lap Floating Village.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 14)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "tan-lap-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Requires at least 4 passengers.",
        "priceVND": 2050000,
        "priceINR": 7585
      },
      {
        "id": "tan-lap-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (2-3 pax, 4-5 pax, 6+ pax)",
        "priceVND": 2950000,
        "priceINR": 10915
      }
    ],
    "destinations": [
      "Mekong Delta"
    ],
    "priceVND": 2050000,
    "priceINR": 7585
  },
  {
    "id": "mekong-can-tho-cai-rang-2d1n",
    "slug": "mekong-can-tho-cai-rang-2d1n",
    "title": "Mekong Delta & Cai Rang Floating Market 2-Day 1-Night Tour",
    "shortTitle": "Cai Rang Floating Market 2D1N",
    "destination": "Can Tho / Mekong Delta",
    "region": "South Vietnam",
    "category": "Culture",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:00 - 07:30)",
    "destinationDetails": "My Tho, Ben Tre & Can Tho City (~170 km south)",
    "description": "Embark on an unforgettable two-day voyage into the heart of the Mekong Delta. Experience My Tho and Ben Tre on Day 1, stay overnight in Can Tho city, and wake up early on Day 2 for an atmospheric boat cruise through Cai Rang Floating Market, catching the bustling trade of pineapple, watermelon, and noodle soup boats at its liveliest dawn hour.",
    "heroImage": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package",
      "4-Star Hotel Package",
      "5-Star Hotel Package",
      "Private Tour"
    ],
    "groupOptions": [
      "Join Group (Max 25)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach",
      "Motorboats & Sampans"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit Cai Rang Floating Market at dawn, the largest wholesale floating market in the Mekong",
      "Cruise Tien River, explore 4 sacred islands, and row sampan through Ben Tre coconut canals",
      "Visit Vinh Trang Pagoda and a traditional rice noodle making workshop",
      "Taste tropical fruits, honey tea, and fresh pineapple sliced directly on a market boat",
      "Overnight stay in Can Tho with choice of 3-Star, 4-Star, or 5-Star hotel",
      "Included meals: 2 Lunches, 1 Breakfast"
    ],
    "itinerary": [
      {
        "time": "Day 1: 07:00 - 07:30",
        "title": "Saigon to My Tho",
        "description": "Pickup in District 1. Visit Vinh Trang Pagoda and board boat to Unicorn Island."
      },
      {
        "time": "Day 1: 10:30",
        "title": "Ben Tre Island & Sampan Cruise",
        "description": "Honey tea tasting, folk music, coconut candy workshop, and hand-rowed sampan ride."
      },
      {
        "time": "Day 1: 12:30",
        "title": "Lunch Break",
        "description": "Vietnamese lunch at riverside restaurant. Cycling on village paths."
      },
      {
        "time": "Day 1: 14:30",
        "title": "Drive to Can Tho",
        "description": "Transfer ~2 hours to Can Tho city, the economic capital of the Mekong Delta. Check in hotel."
      },
      {
        "time": "Day 1: 18:00",
        "title": "Free Evening in Can Tho",
        "description": "Explore Ninh Kieu Wharf, night markets, or dine on local street food (dinner own expense)."
      },
      {
        "time": "Day 2: 06:30",
        "title": "Cai Rang Floating Market",
        "description": "Early boat departure to Cai Rang Floating Market. Watch hundreds of boats laden with fruits and vegetables. Try a floating coffee or noodle soup."
      },
      {
        "time": "Day 2: 09:00",
        "title": "Noodle Workshop & Fruit Orchard",
        "description": "Visit a traditional Hu Tieu noodle factory and stroll through a lush fruit orchard."
      },
      {
        "time": "Day 2: 11:30",
        "title": "Lunch & Checkout",
        "description": "Return to hotel, check out, and enjoy lunch at a local restaurant."
      },
      {
        "time": "Day 2: 13:00 - 17:30",
        "title": "Return to Saigon",
        "description": "Board vehicle for return drive to Ho Chi Minh City by ~17:30."
      }
    ],
    "inclusions": [
      "Round-trip air-conditioned transportation",
      "1 night hotel accommodation in Can Tho (3-Star, 4-Star, or 5-Star)",
      "Meals: 2 Lunches and 1 Breakfast",
      "All boat trips (My Tho river cruise, sampan, and Cai Rang market boat)",
      "All entrance fees",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Dinner on Day 1 (free choice in Can Tho)",
      "Single room supplement (if traveling solo)",
      "Personal expenses and drinks",
      "Tips for boat rowers and guide"
    ],
    "optionalItems": [
      "Single room supplement"
    ],
    "pickupInformation": "Pickup in District 1 between 07:00 and 07:30.",
    "dropoffInformation": "Dropoff at District 1 hotels on Day 2 at ~17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Early morning start on Day 2 to catch peak trading hours at Cai Rang Floating Market.",
      "Single room supplement applies for solo travelers."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches and 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "2D1N CAI RANG FLOATING MARKET / MEKONG - CAN THO 2D1N",
    "source": "TOUR MIỀN NAM EN.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 9, 10, 11)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "can-tho-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Standard 3-star hotel in Can Tho.",
        "priceVND": 1900000,
        "priceINR": 7030
      },
      {
        "id": "can-tho-4star",
        "name": "4-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Upscale 4-star hotel in Can Tho.",
        "priceVND": 2250000,
        "priceINR": 8325
      },
      {
        "id": "can-tho-5star",
        "name": "5-Star Luxury Hotel Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "5-star luxury hotel (e.g. Vinpearl or equivalent).",
        "priceVND": 3150000,
        "priceINR": 11655
      },
      {
        "id": "can-tho-private",
        "name": "Private 2D1N Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (2-3 pax, 4-5 pax, 6+ pax)",
        "priceVND": 5250000,
        "priceINR": 19425
      }
    ],
    "destinations": [
      "Can Tho",
      "Mekong Delta"
    ],
    "advisory": "Early Morning Departure: Day 2 requires an early morning start (~06:30 AM) to experience Cai Rang Floating Market at its peak trading activity before midday heat.",
    "priceVND": 1900000,
    "priceINR": 7030
  },
  {
    "id": "cu-chi-mekong-combo-2d1n",
    "slug": "cu-chi-mekong-combo-2d1n",
    "title": "Cu Chi Tunnels & Mekong Delta 2-Day 1-Night Combo Tour",
    "shortTitle": "Cu Chi & Mekong 2D1N",
    "destination": "Cu Chi / Mekong Delta",
    "region": "South Vietnam",
    "category": "History",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30)",
    "destinationDetails": "Cu Chi Tunnels, My Tho, Ben Tre & Can Tho",
    "description": "The ultimate Southern Vietnam two-day immersion. Spend Day 1 unearthing the wartime secrets of the Cu Chi Tunnels before traveling south to the Mekong Delta, followed by an overnight stay and a dawn visit to the Cai Rang Floating Market on Day 2.",
    "heroImage": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "2D1N Combo Package"
    ],
    "groupOptions": [
      "Join Group / Private"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Vehicle",
      "Riverboats & Sampans"
    ],
    "minimumPax": 2,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Comprehensive exploration of both Cu Chi Tunnels and Cai Rang Floating Market",
      "Overnight stay in the vibrant delta capital of Can Tho",
      "Sample local fruits, honey tea, and homemade meals",
      "2 days covering southern history, ecology, and floating markets"
    ],
    "itinerary": [
      {
        "time": "Day 1",
        "title": "Cu Chi Tunnels to Mekong Delta",
        "description": "Morning exploration of Cu Chi Tunnels. Afternoon transfer to My Tho/Ben Tre for boat cruise and continue to Can Tho."
      },
      {
        "time": "Day 2",
        "title": "Cai Rang Floating Market to Saigon",
        "description": "Early morning boat to Cai Rang Floating Market. Visit noodle factory and fruit orchard. Lunch and return to Saigon by ~17:30."
      }
    ],
    "inclusions": [
      "Round-trip transport",
      "1 night hotel",
      "Meals as scheduled",
      "All entrance fees and boats",
      "English guide"
    ],
    "exclusions": [
      "Dinners",
      "Shooting range bullets",
      "Single supplement",
      "Personal expenses"
    ],
    "optionalItems": [
      "Shooting range bullets"
    ],
    "pickupInformation": "Pickup in District 1 at 07:30.",
    "dropoffInformation": "Dropoff at District 1 hotels on Day 2 at ~17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Bring overnight luggage."
    ],
    "dietaryInformation": {
      "standard": "Lunches and breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian options available on request."
    },
    "supplier": "SST Travel",
    "supplierProductName": "2D1N - CU CHI & MEKONG",
    "source": "SST TRAVEL ho chi minh tour operators.pdf (Page 3)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cu-chi-mekong-2d1n-std",
        "name": "2D1N Standard Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "priceVND": 2300000,
        "priceINR": 8510
      }
    ],
    "destinations": [
      "Cu Chi",
      "Mekong Delta"
    ],
    "advisory": "Multi-Day Notice: Day 1 features historical Cu Chi Tunnels (tunnel crawl optional) followed by transfer to Can Tho. Day 2 features Cai Rang Floating Market.",
    "priceVND": 2300000,
    "priceINR": 8510
  },
  {
    "id": "phan-thiet-mui-ne-sand-dunes-day-tour",
    "slug": "phan-thiet-mui-ne-sand-dunes-day-tour",
    "title": "Mui Ne White & Red Sand Dunes Day Tour",
    "shortTitle": "Mui Ne Sand Dunes Day Tour",
    "destination": "Mui Ne / Phan Thiet",
    "region": "South Vietnam",
    "category": "Adventure",
    "duration": "Full-Day (~13 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (06:30 - 07:00)",
    "destinationDetails": "Mui Ne & Phan Thiet, Binh Thuan Province (~210 km via expressway)",
    "description": "Experience the surreal coastal desert landscapes of Mui Ne. Walk barefoot through the cool red waters of Fairy Stream (Suoi Tien), visit the bustling Mui Ne fishing village harbor with hundreds of round basket boats, and marvel at the colossal White and Red Sand Dunes with thrilling optional ATV or open-top Jeep rides.",
    "heroImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Expressway Tourist Coach / Limousine",
      "Sand Dune Jeep / ATV (optional)"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed Multilingual Guide",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Walk barefoot through the stunning red-and-white canyon of Fairy Stream (Suoi Tien)",
      "Photographic stop at Mui Ne Fishing Village filled with colorful round coracle boats",
      "Explore the vast, Sahara-like White Sand Dunes bordering Lotus Lake (Bau Trang)",
      "Optional adrenaline-pumping 4x4 Jeep or quad bike (ATV) ride over dune crests",
      "Watch the sunset glow cast across the Red Sand Dunes",
      "Expressway travel cutting transit time to just ~2.5 hours each way"
    ],
    "itinerary": [
      {
        "time": "06:30 - 07:00",
        "title": "Pickup in Saigon",
        "description": "Pickup from District 1 hotels. Travel via the Dau Giay - Phan Thiet expressway."
      },
      {
        "time": "10:00",
        "title": "Fairy Stream (Suoi Tien)",
        "description": "Walk barefoot through the ankle-deep stream flanked by sculpted orange clay formations and green palms."
      },
      {
        "time": "11:30",
        "title": "Fishing Village",
        "description": "View the picturesque coastal harbor packed with traditional fishing boats and bustling seafood trade."
      },
      {
        "time": "12:30",
        "title": "Seafood Lunch",
        "description": "Enjoy a delicious lunch at a beachfront restaurant."
      },
      {
        "time": "14:00",
        "title": "White Sand Dunes (Bau Trang)",
        "description": "Explore the majestic White Sand Dunes. Option to hire an open-top Jeep or ATV to drive up the dunes."
      },
      {
        "time": "16:00",
        "title": "Red Sand Dunes",
        "description": "Visit the golden-red sand dunes and enjoy sand-sledding or photography."
      },
      {
        "time": "16:45",
        "title": "Depart for Saigon",
        "description": "Board vehicle for return journey via expressway."
      },
      {
        "time": "19:30 - 20:00",
        "title": "Hotel Dropoff",
        "description": "Arrive back at District 1 hotels."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or VIP Limousine)",
      "All entrance fees (Fairy Stream, Fishing Village)",
      "Vietnamese set lunch",
      "English-speaking guide (or selected language on private tour)",
      "Bottled water"
    ],
    "exclusions": [
      "Jeep or ATV car ride on the sand dunes (optional)",
      "Sand-sledding board rental",
      "Drinks and personal expenses",
      "Tips for guide and driver"
    ],
    "optionalItems": [
      "Sand dune 4x4 Jeep / ATV rental",
      "Sand-sledding boards"
    ],
    "pickupInformation": "Pickup in District 1 between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~19:30 - 20:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Bring sunglasses, sun hat, sunscreen, and beach-friendly flip-flops for the stream walk.",
      "Sand dune Jeep/ATV rental is available on-site at your own expense."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese lunch included at beachfront restaurant.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "PHAN THIET MUI NE DAY TOUR",
    "source": "(TA) Phan Thiet Day Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 25, 26, 27)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "mui-ne-day-big",
        "name": "Big Group (Max 35)",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1200000,
        "priceINR": 4440
      },
      {
        "id": "mui-ne-day-small",
        "name": "Small Group (Max 20)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 20 pax",
        "priceVND": 1500000,
        "priceINR": 5550
      },
      {
        "id": "mui-ne-day-vip",
        "name": "VIP Group (Max 10)",
        "format": "vip_group",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1800000,
        "priceINR": 6660
      },
      {
        "id": "mui-ne-day-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (English, Chinese, Japanese, or Korean guide available)",
        "priceVND": 3250000,
        "priceINR": 12025
      }
    ],
    "destinations": [
      "Mui Ne",
      "Phan Thiet"
    ],
    "advisory": "Desert Climate Notice: Sand dunes can get hot and windy. Sunglasses, sunscreen, and secure footwear are recommended. Optional ATV or sand-slide activities are available at the dunes.",
    "priceVND": 1200000,
    "priceINR": 4440
  },
  {
    "id": "phan-thiet-mui-ne-2d1n",
    "slug": "phan-thiet-mui-ne-2d1n",
    "title": "Mui Ne Beach & Sand Dunes 2-Day 1-Night Tour",
    "shortTitle": "Mui Ne 2D1N Tour",
    "destination": "Mui Ne / Phan Thiet",
    "region": "South Vietnam",
    "category": "Island / Beach",
    "duration": "2 Days / 1 Night",
    "durationType": "multi_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (06:30 - 07:00)",
    "destinationDetails": "Mui Ne Coastal Resort Area, Binh Thuan Province",
    "description": "Escape to the coast for two days of sand dunes, sea breezes, and relaxation. Visit Bai Da Ong Dia, stroll through Fairy Stream, explore the fishing harbor, catch the sunrise over the White Sand Dunes, and enjoy an overnight stay in a beach resort.",
    "heroImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "3-Star Hotel Package"
    ],
    "groupOptions": [
      "Join Group (Max 25)"
    ],
    "transportOptions": [
      "Expressway Tourist Coach",
      "Sand Dune Jeep (optional)"
    ],
    "minimumPax": 1,
    "maximumPax": 25,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Relaxing 2-day beach break with hotel stay in Mui Ne",
      "Sunrise or sunset over the White and Red Sand Dunes",
      "Barefoot walk along Fairy Stream and visit Bai Da Ong Dia rocky beach",
      "Discover the vibrant fishing harbor with hundreds of round coracles",
      "2 Vietnamese lunches included"
    ],
    "itinerary": [
      {
        "time": "Day 1: 07:00",
        "title": "Saigon to Mui Ne",
        "description": "Pickup in District 1. Expressway drive to Phan Thiet. Visit Bai Da Ong Dia and Fairy Stream. Lunch and resort check-in."
      },
      {
        "time": "Day 1: 15:30",
        "title": "Red Sand Dunes Sunset",
        "description": "Afternoon visit to Red Sand Dunes for sunset. Free evening for seafood dining."
      },
      {
        "time": "Day 2: 05:00",
        "title": "White Sand Dunes Sunrise",
        "description": "Early morning drive to White Sand Dunes for sunrise. Optional ATV ride. Visit fishing village."
      },
      {
        "time": "Day 2: 11:30",
        "title": "Lunch & Return to Saigon",
        "description": "Check out, lunch, and return drive to Saigon by ~18:00."
      }
    ],
    "inclusions": [
      "Round-trip expressway transportation",
      "1 night 3-star resort accommodation",
      "2 lunches and 1 breakfast",
      "All sightseeing tickets",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Sand dune Jeep / ATV rental",
      "Dinner on Day 1",
      "Single room supplement",
      "Personal expenses"
    ],
    "optionalItems": [
      "Sand dune Jeep / ATV rental"
    ],
    "pickupInformation": "Pickup in District 1 between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff at District 1 hotels on Day 2 at ~18:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Single room supplement applies for solo guests."
    ],
    "dietaryInformation": {
      "standard": "2 Lunches and 1 Breakfast included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "PHAN THIET MUI NE 2D1N TOUR",
    "source": "(TA) Phan Thiet 2D1N.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 28)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "mui-ne-2d1n-3star",
        "name": "3-Star Hotel Package",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "priceVND": 2950000,
        "priceINR": 10915
      }
    ],
    "destinations": [
      "Mui Ne",
      "Phan Thiet"
    ],
    "priceVND": 2950000,
    "priceINR": 10915
  },
  {
    "id": "vung-tau-coastal-full-day-tour",
    "slug": "vung-tau-coastal-full-day-tour",
    "title": "Vung Tau Seaside & Giant Jesus Statue Full-Day Tour",
    "shortTitle": "Vung Tau Day Tour",
    "destination": "Vung Tau",
    "region": "South Vietnam",
    "category": "Day Trip",
    "duration": "Full-Day (~9 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "Vung Tau City, Ba Ria - Vung Tau Province (~100 km southeast)",
    "description": "Escape the urban hustle of Saigon to the refreshing coastal peninsula of Vung Tau. Climb the 32-meter Christ the King giant statue for panoramic ocean views from its shoulders, visit the French colonial White Palace (Bach Dinh), explore Thang Tam Whale Temple, and take in the sea breeze at Cape Nghinh Phong.",
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group Full-Day",
      "Small Group Full-Day",
      "VIP Group (Max 10)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach / VIP Limousine"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed Multilingual Guide",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Climb up inside the iconic 32-meter Christ the King Statue for breathtaking sea views",
      "Visit Bach Dinh (White Palace), the historic 19th-century French Governor's villa",
      "Discover Thang Tam Temple (Whale Temple) dedicated to the protector god of fishermen",
      "Take photos at Cape Nghinh Phong ('Wind-Catching Cape') with dramatic sea views",
      "Enjoy fresh seafood lunch at a beachside restaurant",
      "Relax on the sandy shores of Back Beach (Bai Sau)"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Pickup in Saigon",
        "description": "Pickup from District 1 hotels. Drive ~2 hours via expressway to Vung Tau."
      },
      {
        "time": "10:00",
        "title": "Christ the King Giant Statue",
        "description": "Climb 847 steps up Tao Phung Mountain to the 32m Christ Statue. Climb inside the statue to stand on its shoulders overlooking the ocean."
      },
      {
        "time": "12:00",
        "title": "Seafood Lunch",
        "description": "Enjoy a delicious seafood lunch at a local restaurant."
      },
      {
        "time": "13:30",
        "title": "Bach Dinh (White Palace)",
        "description": "Tour the French colonial summer mansion of Governor-General Paul Doumer and King Thanh Thai."
      },
      {
        "time": "14:45",
        "title": "Thang Tam Whale Temple & Cape Nghinh Phong",
        "description": "Visit the Whale Temple housing historic whale skeletons. Admire the dramatic rocky headland at Cape Nghinh Phong."
      },
      {
        "time": "15:45",
        "title": "Depart Vung Tau",
        "description": "Board vehicle for the return drive to Ho Chi Minh City."
      },
      {
        "time": "18:00",
        "title": "Hotel Dropoff",
        "description": "Arrive back at District 1 hotels."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or VIP Limousine)",
      "All entrance tickets (White Palace, Whale Temple)",
      "Seafood set lunch at local restaurant",
      "English-speaking guide (or selected language on private tour)",
      "Bottled water"
    ],
    "exclusions": [
      "Drinks during lunch",
      "Personal beach chair / umbrella rentals",
      "Personal expenses and tips"
    ],
    "optionalItems": [
      "Swimming at Back Beach"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~18:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Modest attire required to climb inside Christ Statue (no sleeveless shirts, short shorts, or hats).",
      "847 steps to reach the base of Christ Statue; comfortable walking shoes required."
    ],
    "dietaryInformation": {
      "standard": "Seafood lunch included at local restaurant.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "VUNG TAU FULL-DAY TOUR",
    "source": "(TA) VUNG TAU.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 29, 30, 31)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "vung-tau-big",
        "name": "Big Group Full-Day",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1000000,
        "priceINR": 3700
      },
      {
        "id": "vung-tau-small",
        "name": "Small Group Full-Day",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 20 pax",
        "priceVND": 1300000,
        "priceINR": 4810
      },
      {
        "id": "vung-tau-vip",
        "name": "VIP Group (Max 10)",
        "format": "vip_group",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1650000,
        "priceINR": 6105
      },
      {
        "id": "vung-tau-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (English, Chinese, Japanese, or Korean guide available)",
        "priceVND": 2850000,
        "priceINR": 10545
      }
    ],
    "destinations": [
      "Vung Tau"
    ],
    "advisory": "Attire Notice: Climbing inside the Christ of Vung Tau statue requires modest clothing (no sleeveless shirts, short shorts, or hats permitted inside the statue).",
    "priceVND": 1000000,
    "priceINR": 3700
  },
  {
    "id": "can-gio-monkey-island-mangrove-tour",
    "slug": "can-gio-monkey-island-mangrove-tour",
    "title": "Can Gio Mangrove Biosphere & Monkey Island Day Tour",
    "shortTitle": "Can Gio Monkey Island Tour",
    "destination": "Can Gio",
    "region": "South Vietnam",
    "category": "Nature",
    "duration": "Full-Day (~8 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (07:30 - 08:00)",
    "destinationDetails": "Can Gio Biosphere Reserve (~50 km southeast of Saigon)",
    "description": "Venture into the 'green lungs of Saigon' at the UNESCO-listed Can Gio Mangrove Forest. Encounter over a thousand semi-wild long-tailed macaques on Monkey Island, visit the crocodile breeding sanctuary, take an exhilarating speedboat through winding mangrove canals, and visit the historic Rung Sac Guerrilla Military Base.",
    "heroImage": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Tour"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach / Limousine",
      "Speedboat (Cano) through Mangroves"
    ],
    "minimumPax": 1,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Encounter over 1,000 playful monkeys in their natural mangrove habitat on Monkey Island",
      "Thrilling high-speed cano ride through deep mangrove river channels",
      "Explore the secret Rung Sac Guerrilla Military Base used during the Vietnam War",
      "Visit the crocodile breeding farm and try crocodile angling (optional)",
      "Seafood lunch at a local beachside restaurant and visit Can Gio seafood market"
    ],
    "itinerary": [
      {
        "time": "07:30 - 08:00",
        "title": "Pickup in Saigon",
        "description": "Pickup from District 1 hotels. Cross Binh Khanh ferry into Can Gio."
      },
      {
        "time": "09:30",
        "title": "Monkey Island & Crocodile Farm",
        "description": "Visit Lam Vien eco-park. Meet playful macaques, observe crocodile feeding, and see the reserve's wildlife museum."
      },
      {
        "time": "11:00",
        "title": "Speedboat to Rung Sac Guerrilla Base",
        "description": "Board high-speed cano carving through mangrove channels. Explore the reconstructed military base deep in the swamp."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy a fresh seafood lunch at a local restaurant."
      },
      {
        "time": "14:00",
        "title": "Can Gio Seafood Market",
        "description": "Visit the buzzing Hang Duong seafood market where fresh catch is displayed and cooked on the spot."
      },
      {
        "time": "15:00",
        "title": "Return to Saigon",
        "description": "Board vehicle for drive back to Ho Chi Minh City."
      },
      {
        "time": "17:00",
        "title": "Hotel Dropoff",
        "description": "Dropoff at District 1 hotels."
      }
    ],
    "inclusions": [
      "Transportation as booked (Coach, Van, or VIP Limousine)",
      "All entrance tickets (Monkey Island, Crocodile Reserve, Rung Sac Base)",
      "Speedboat (cano) ride through mangroves",
      "Vietnamese seafood lunch",
      "English-speaking guide",
      "Bottled water"
    ],
    "exclusions": [
      "Crocodile angling bait ticket",
      "Drinks and personal expenses",
      "Tips for cano driver and guide"
    ],
    "optionalItems": [
      "Crocodile angling"
    ],
    "pickupInformation": "Pickup in District 1 between 07:30 and 08:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Watch personal belongings closely on Monkey Island; monkeys are known to snatch glasses, hats, and phones.",
      "Insect repellent recommended for mangrove exploration."
    ],
    "dietaryInformation": {
      "standard": "Seafood set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "EXPLORE MONKEY ISLAND / CAN GIO DAY TOUR",
    "source": "(TA) Can Gio Day Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 22, 23, 24)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "can-gio-big",
        "name": "Big Group (Max 35)",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 850000,
        "priceINR": 3145
      },
      {
        "id": "can-gio-small",
        "name": "Small Group (Max 20)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 20 pax",
        "priceVND": 1000000,
        "priceINR": 3700
      },
      {
        "id": "can-gio-vip",
        "name": "VIP Group (Max 10)",
        "format": "vip_group",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1550000,
        "priceINR": 5735
      },
      {
        "id": "can-gio-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private",
        "priceVND": 2750000,
        "priceINR": 10175
      }
    ],
    "destinations": [
      "Can Gio"
    ],
    "advisory": "Wildlife Advisory: Wild monkeys on Monkey Island can be curious and agile. Please secure personal items, hats, sunglasses, and phones. Do not feed monkeys directly.",
    "priceVND": 850000,
    "priceINR": 3145
  },
  {
    "id": "cat-tien-national-park-jungle-trek",
    "slug": "cat-tien-national-park-jungle-trek",
    "title": "Cat Tien National Park Jungle Trekking & Wildlife Tour",
    "shortTitle": "Cat Tien Jungle Tour",
    "destination": "Cat Tien",
    "region": "South Vietnam",
    "category": "Adventure",
    "duration": "Full-Day (~11 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (06:30 - 07:00)",
    "destinationDetails": "Cat Tien National Park, Dong Nai Province (~150 km northeast)",
    "description": "Immerse yourself in one of Vietnam's most pristine tropical rainforest reserves. Cross the Dong Nai River into Cat Tien National Park, trek beneath monumental 500-year-old Tung trees, spot rare wildlife and bird species, and experience untouched primary jungle.",
    "heroImage": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Join Group (Min 2 pax)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Join Group (Min 2 pax)",
      "Private Charter (2-3 pax, 4-5 pax, 6+ pax)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Vehicle",
      "River Ferry",
      "Jungle Trekking on Foot"
    ],
    "minimumPax": 2,
    "maximumPax": 20,
    "guide": "Licensed Multilingual Nature Guide",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Trek beneath colossal 500-year-old Tung trees with roots as tall as houses",
      "Explore primary rainforest biodiversity with expert jungle guides",
      "Visit Ben Cu Rapids on the pristine Dong Nai River",
      "Observe endemic butterflies, primates, and tropical birds",
      "Enjoy a traditional forest lunch at the park headquarters"
    ],
    "itinerary": [
      {
        "time": "06:30 - 07:00",
        "title": "Depart Saigon",
        "description": "Pickup in District 1. Drive ~3.5 hours northeast to Cat Tien National Park."
      },
      {
        "time": "10:30",
        "title": "Cross Dong Nai River & Jungle Trek",
        "description": "Cross the river by local ferry. Begin guided 6-km trek through primary forest to the Giant Tung Tree and ancient botanical areas."
      },
      {
        "time": "12:30",
        "title": "Jungle Lunch",
        "description": "Enjoy lunch at the National Park restaurant."
      },
      {
        "time": "13:30",
        "title": "Ben Cu Rapids & Wildlife Exploration",
        "description": "Walk to Ben Cu Rapids and visit the Bear Rescue / Primate Conservation Center."
      },
      {
        "time": "15:30",
        "title": "Ferry Crossing & Return",
        "description": "Cross river back to vehicle and begin return drive."
      },
      {
        "time": "19:00 - 19:30",
        "title": "Hotel Dropoff",
        "description": "Dropoff at District 1 hotels."
      }
    ],
    "inclusions": [
      "Air-conditioned transportation",
      "Ferry crossing tickets and National Park entrance fees",
      "Vietnamese lunch",
      "English-speaking guide (or selected language on private)",
      "Bottled water"
    ],
    "exclusions": [
      "Leech socks (available on site)",
      "Personal expenses and tips"
    ],
    "optionalItems": [
      "Leech protection socks"
    ],
    "pickupInformation": "Pickup in District 1 between 06:30 and 07:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~19:00 - 19:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 2 passengers required for departure.",
      "Wear athletic hiking shoes and long socks; bring insect repellent."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included at park headquarters.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "CAT TIEN NATIONAL PARK JUNGLE / CÁT TIÊN DAY TOUR",
    "source": "(TA) Cat Tien National Park.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 43)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "cat-tien-join",
        "name": "Join Group Full-Day",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "notes": "Requires at least 2 passengers.",
        "priceVND": 2250000,
        "priceINR": 8325
      },
      {
        "id": "cat-tien-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private (English, Chinese, Japanese, or Korean guide available)",
        "priceVND": 3550000,
        "priceINR": 13135
      }
    ],
    "destinations": [
      "Cat Tien"
    ],
    "advisory": "Jungle Trekking Guidance: Sturdy hiking shoes, long trousers, and high socks are recommended. Insect and leech repellent are advisable during the rainy season (May–November).",
    "priceVND": 2250000,
    "priceINR": 8325
  },
  {
    "id": "hcm-city-half-day-pm",
    "slug": "hcm-city-half-day-pm",
    "title": "Ho Chi Minh City Highlights Half-Day Tour",
    "shortTitle": "Saigon Half-Day",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "City Tour",
    "duration": "Half-Day (~4 Hours)",
    "durationType": "half_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (13:00 - 13:30)",
    "destinationDetails": "Central Ho Chi Minh City Landmarks",
    "description": "An afternoon discovery of Saigon's must-see historical and architectural treasures. Explore the War Remnants Museum, Reunification Palace, Notre Dame Cathedral, Central Post Office, and finish with shopping at Ben Thanh Market.",
    "heroImage": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group Half-Day"
    ],
    "groupOptions": [
      "Big Group (Max 35)"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach"
    ],
    "minimumPax": 2,
    "maximumPax": 35,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Explore the War Remnants Museum's profound wartime exhibits",
      "Visit the historic Reunification Palace (former Independence Palace)",
      "Photograph the French colonial Notre Dame Cathedral & Central Post Office",
      "Explore Ben Thanh Market for souvenirs, spices, and coffee"
    ],
    "itinerary": [
      {
        "time": "13:00 - 13:30",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotels."
      },
      {
        "time": "13:45",
        "title": "War Remnants Museum",
        "description": "Visit the War Remnants Museum to view historic military displays and photography."
      },
      {
        "time": "15:00",
        "title": "Reunification Palace",
        "description": "Tour the reception halls, war command room, and presidential chambers."
      },
      {
        "time": "16:00",
        "title": "Notre Dame & Post Office",
        "description": "Admire French colonial architecture in the city center."
      },
      {
        "time": "16:45 - 17:30",
        "title": "Ben Thanh Market & Dropoff",
        "description": "Optional market visit and dropoff at hotel."
      }
    ],
    "inclusions": [
      "Air-conditioned transport",
      "All entrance tickets",
      "English guide",
      "Water"
    ],
    "exclusions": [
      "Lunch",
      "Drinks and personal expenses",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 between 13:00 and 13:30.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 2 passengers required. No lunch included."
    ],
    "dietaryInformation": {
      "standard": "No meals included on this half-day tour.",
      "vegetarianAvailable": false,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "No meals served on this half-day tour."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HCM CITY HALF DAY TOUR - PM",
    "source": "SST TRAVEL ho chi minh tour operators.pdf (Item 32)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hcm-half-join",
        "name": "Big Group Afternoon",
        "format": "join_group",
        "vehicleType": "AC Tourist Coach",
        "priceVND": 650000,
        "priceINR": 2405
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "priceVND": 650000,
    "priceINR": 2405
  },
  {
    "id": "hcm-city-full-day-tour",
    "slug": "hcm-city-full-day-tour",
    "title": "Ho Chi Minh City Highlights Full-Day City Tour",
    "shortTitle": "Saigon Full-Day Tour",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "City Tour",
    "duration": "Full-Day (~8 Hours)",
    "durationType": "full_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (08:00 - 08:30)",
    "destinationDetails": "District 1, District 3, and Chinatown (District 5)",
    "description": "The ultimate cultural exploration of Saigon. Visit the War Remnants Museum, Reunification Palace, Notre Dame Cathedral, Central Post Office, Chinatown (Cholon), Thien Hau Pagoda, and Binh Tay Market, complete with a traditional Vietnamese lunch.",
    "heroImage": "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Tour (English, Chinese, Japanese, Korean)"
    ],
    "groupOptions": [
      "Big Group (Max 35)",
      "Small Group (Max 20)",
      "VIP Group (Max 10)",
      "Private Charter"
    ],
    "transportOptions": [
      "Air-Conditioned Tourist Coach / Limousine"
    ],
    "minimumPax": 2,
    "maximumPax": 35,
    "guide": "Licensed Multilingual Guide",
    "languages": [
      "English",
      "Chinese",
      "Japanese",
      "Korean"
    ],
    "highlights": [
      "Visit Reunification Palace and War Remnants Museum",
      "Admire Notre Dame Cathedral and Central Post Office",
      "Explore vibrant Chinatown (Cholon) and 18th-century Thien Hau Temple",
      "Browse the lively wholesale stalls of Binh Tay Market",
      "Vietnamese lunch included at local restaurant"
    ],
    "itinerary": [
      {
        "time": "08:00 - 08:30",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotels."
      },
      {
        "time": "09:00",
        "title": "Reunification Palace & War Museum",
        "description": "Tour the former Presidential Palace and War Remnants Museum."
      },
      {
        "time": "11:30",
        "title": "Notre Dame & Post Office",
        "description": "Photograph French colonial landmarks."
      },
      {
        "time": "12:30",
        "title": "Lunch Break",
        "description": "Enjoy Vietnamese lunch at a local restaurant."
      },
      {
        "time": "14:00",
        "title": "Chinatown (Cholon) & Thien Hau Pagoda",
        "description": "Explore Cholon and light spiral incense coils at Thien Hau Temple."
      },
      {
        "time": "15:30",
        "title": "Binh Tay Market & Ben Thanh",
        "description": "Browse market stalls for local specialties and coffee."
      },
      {
        "time": "16:30 - 17:00",
        "title": "Hotel Dropoff",
        "description": "Return to hotel in District 1."
      }
    ],
    "inclusions": [
      "Air-conditioned transport",
      "All entrance tickets",
      "Vietnamese lunch",
      "English guide",
      "Water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 between 08:00 and 08:30.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~17:00.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Minimum 2 passengers required."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese set lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "HCM CITY FULL DAY TOUR",
    "source": "(TA) HCM City Day Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Items 33, 34, 35)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "hcm-full-big",
        "name": "Big Group (Max 35)",
        "format": "join_group",
        "vehicleType": "29-35 Seater AC Coach",
        "groupSize": "Max 35 pax",
        "priceVND": 1050000,
        "priceINR": 3885
      },
      {
        "id": "hcm-full-small",
        "name": "Small Group (Max 20)",
        "format": "small_group",
        "vehicleType": "16-Seater AC Van",
        "groupSize": "Max 20 pax",
        "priceVND": 1200000,
        "priceINR": 4440
      },
      {
        "id": "hcm-full-vip",
        "name": "VIP Group (Max 10)",
        "format": "vip_group",
        "vehicleType": "9-Seater Luxury D-Car Limousine",
        "groupSize": "Max 10 pax",
        "priceVND": 1450000,
        "priceINR": 5365
      },
      {
        "id": "hcm-full-private",
        "name": "Private Full-Day Tour",
        "format": "private",
        "vehicleType": "Private AC Vehicle",
        "groupSize": "Private",
        "priceVND": 2500000,
        "priceINR": 9250
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "advisory": "Museum & Temple Dress Code: War Remnants Museum and Thien Hau Pagoda require respectful attire with shoulders and knees covered.",
    "priceVND": 1050000,
    "priceINR": 3885
  },
  {
    "id": "saigon-private-half-day-jeep",
    "slug": "saigon-private-half-day-jeep",
    "title": "Saigon City Highlights by Vintage Army Jeep",
    "shortTitle": "Saigon Jeep Half-Day",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "Private Experience",
    "duration": "Half-Day (~4 Hours)",
    "durationType": "half_day",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (Morning 08:00 or Afternoon 13:00)",
    "destinationDetails": "Historic Saigon Landmarks via Open-Top Vintage Jeep",
    "description": "Experience Saigon from the open-air vantage point of an authentic restored American military vintage Jeep. Feel the city's pulse and tropical breeze as you rumble past French boulevards, the War Remnants Museum, Reunification Palace, and colonial avenues with your private guide.",
    "heroImage": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Private Vintage Jeep Half-Day"
    ],
    "groupOptions": [
      "Private Jeep (Max 4 pax per Jeep)"
    ],
    "transportOptions": [
      "Restored Open-Top Military Vintage Jeep with Driver"
    ],
    "minimumPax": 1,
    "maximumPax": 16,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Cruise through Saigon in a classic restored military vintage Jeep",
      "Open-air panoramic views of French colonial architecture and tree-lined avenues",
      "Visit Reunification Palace, War Remnants Museum, and Notre Dame Cathedral",
      "Personalized pace and flexible stops for memorable photos",
      "Includes lunch at a local restaurant"
    ],
    "itinerary": [
      {
        "time": "08:00 (or 13:00)",
        "title": "Jeep Pickup at Hotel",
        "description": "Your private vintage Jeep and guide pick you up at your hotel."
      },
      {
        "time": "08:30",
        "title": "Reunification Palace & War Museum",
        "description": "Visit the historic Presidential Palace and War Remnants Museum."
      },
      {
        "time": "10:30",
        "title": "French Colonial Boulevards",
        "description": "Rumble past Opera House, City Hall, Notre Dame Cathedral, and Post Office."
      },
      {
        "time": "11:30",
        "title": "Local Lunch",
        "description": "Savor authentic Vietnamese lunch at a traditional restaurant."
      },
      {
        "time": "12:30",
        "title": "Hotel Dropoff",
        "description": "Return to hotel in your vintage Jeep."
      }
    ],
    "inclusions": [
      "Private vintage Jeep with professional driver",
      "English-speaking guide",
      "All entrance fees",
      "Vietnamese lunch",
      "Bottled water"
    ],
    "exclusions": [
      "Personal expenses and drinks",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Private pickup at District 1 hotels.",
    "dropoffInformation": "Dropoff at District 1 hotels.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Jeep is open-top; wear sunglasses and sunscreen."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese lunch included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian meal options can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "SAI GON PRIVATE HALF-DAY CITY TOUR BY ARMY VINTAGE JEEP",
    "source": "(TA) Private Half Day Culture & History Tour.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 37)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "saigon-jeep-half-private",
        "name": "Private Vintage Jeep Tour",
        "format": "vintage_jeep",
        "vehicleType": "Open-Top Army Vintage Jeep",
        "groupSize": "Private (up to 4 pax/jeep)",
        "priceVND": 2300000,
        "priceINR": 8510
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "priceVND": 2300000,
    "priceINR": 8510
  },
  {
    "id": "saigon-by-night-jeep-tour",
    "slug": "saigon-by-night-jeep-tour",
    "title": "Saigon by Night Tour by Vintage Army Jeep",
    "shortTitle": "Saigon by Night Jeep",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "Private Experience",
    "duration": "Evening (~4 Hours)",
    "durationType": "evening",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (17:30 - 18:00)",
    "destinationDetails": "Illuminated Saigon Landmarks & Riverfront",
    "description": "Experience the electrifying nocturnal energy of Saigon in an open-top vintage Jeep. Feel the warm evening breeze as you cruise past illuminated French landmarks, bustling street night markets, and modern skyscraper skylines, followed by a delicious dinner.",
    "heroImage": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Private Vintage Jeep Night Tour"
    ],
    "groupOptions": [
      "Private Jeep (Max 4 pax per Jeep)"
    ],
    "transportOptions": [
      "Restored Open-Top Military Vintage Jeep with Driver"
    ],
    "minimumPax": 1,
    "maximumPax": 16,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Open-top vintage Jeep ride through illuminated nighttime Saigon",
      "Admire the dazzling City Hall, Opera House, and Bitexco & Landmark 81 towers",
      "Drive across the illuminated bridges spanning the Saigon River",
      "Enjoy dinner at a local restaurant included in the tour"
    ],
    "itinerary": [
      {
        "time": "17:30 - 18:00",
        "title": "Jeep Pickup",
        "description": "Pickup from District 1 hotel."
      },
      {
        "time": "18:15",
        "title": "Illuminated City Tour",
        "description": "Cruise past Nguyen Hue walking street, City Hall, and Opera House lit up with floodlights."
      },
      {
        "time": "19:00",
        "title": "Dinner",
        "description": "Enjoy dinner featuring Vietnamese cuisine at a local restaurant."
      },
      {
        "time": "20:15",
        "title": "Riverfront & Bridge Drive",
        "description": "Drive along the Saigon riverfront and across Thu Thiem Bridge for sweeping skyline photos."
      },
      {
        "time": "21:30",
        "title": "Hotel Dropoff",
        "description": "Return to hotel in District 1."
      }
    ],
    "inclusions": [
      "Private vintage Jeep with driver",
      "English guide",
      "Dinner",
      "Water"
    ],
    "exclusions": [
      "Drinks and personal expenses",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 between 17:30 and 18:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~21:30.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Bring camera/phone for nighttime skyline photography."
    ],
    "dietaryInformation": {
      "standard": "Vietnamese dinner included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian dinner can be requested at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "SAI GON BY NIGHT PRIVATE CITY TOUR WITH ARMY VINTAGE JEEP",
    "source": "SST TRAVEL ho chi minh tour operators.pdf (Item 38)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "saigon-night-jeep-private",
        "name": "Private Vintage Jeep Night Tour",
        "format": "vintage_jeep",
        "vehicleType": "Open-Top Army Vintage Jeep",
        "priceVND": 2450000,
        "priceINR": 9065
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "priceVND": 2450000,
    "priceINR": 9065
  },
  {
    "id": "saigon-private-foodie-night-tour",
    "slug": "saigon-private-foodie-night-tour",
    "title": "Saigon Street Food & Nightlife Tour (Motorbike / Jeep)",
    "shortTitle": "Saigon Night Foodie Tour",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "Food",
    "duration": "Evening (~4 Hours)",
    "durationType": "evening",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (17:30 - 18:00)",
    "destinationDetails": "District 1, District 3, District 4 & District 10 Street Food Hubs",
    "description": "Taste your way through the culinary heart of Saigon after dark. Ride on the back of a motorbike with a local licensed driver or in an open-top vintage Jeep, exploring off-the-beaten-path alleyways and tasting 6-8 authentic street food specialties: crispy Banh Xeo, grilled seafood, fresh spring rolls, Banh Mi, and sweet desserts.",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "By Motorbike with Driver",
      "By Army Vintage Jeep"
    ],
    "groupOptions": [
      "Private Experience"
    ],
    "transportOptions": [
      "Motorbike with Personal Driver & Helmet",
      "Restored Vintage Army Jeep"
    ],
    "minimumPax": 1,
    "maximumPax": 20,
    "guide": "Licensed English-Speaking Foodie Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Taste 6-8 iconic Vietnamese street food dishes at authentic local eateries",
      "Explore hidden alleys across District 3, District 4, and District 10",
      "Visit Ho Thi Ky wholesale flower market and night food street",
      "Ride on the back of a scooter or in a vintage military Jeep with professional drivers",
      "All food tastings and drinks included"
    ],
    "itinerary": [
      {
        "time": "17:30 - 18:00",
        "title": "Hotel Pickup",
        "description": "Meet your foodie guide and driver at your District 1 hotel."
      },
      {
        "time": "18:15",
        "title": "Banh Xeo & Banh Khot",
        "description": "Taste crispy Vietnamese savory pancakes wrapped in fresh herbs and mustard greens."
      },
      {
        "time": "19:00",
        "title": "District 4 Seafood Stalls",
        "description": "Visit the famous seafood haven of District 4 for grilled snails, scallops, and dipping sauces."
      },
      {
        "time": "20:00",
        "title": "Ho Thi Ky Flower Market",
        "description": "Stroll through the bustling night flower market and sample Cambodian-influenced street desserts."
      },
      {
        "time": "21:00",
        "title": "Sweet Che / Local Drink",
        "description": "Enjoy traditional sweet soup dessert or Vietnamese iced coffee overlooking the night streets."
      },
      {
        "time": "21:30",
        "title": "Hotel Dropoff",
        "description": "Driver returns you safely to your hotel."
      }
    ],
    "inclusions": [
      "Motorbike with professional driver & helmet, or vintage Jeep",
      "English-speaking foodie guide",
      "All 6-8 street food tastings and local drinks",
      "Bottled water"
    ],
    "exclusions": [
      "Alcoholic beverages beyond included tastings",
      "Personal shopping",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup at District 1 hotels.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~21:30.",
    "childPolicy": "Children over 6 recommended for motorbike; vintage Jeep suitable for all ages.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Come with an empty stomach!",
      "Inform guide of any food allergies in advance."
    ],
    "dietaryInformation": {
      "standard": "All street food tastings included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian street food tasting menu can be prepared with advance notice."
    },
    "supplier": "SST Travel",
    "supplierProductName": "PRIVATE FOODIE & CITY TOUR / PRIVATE FOODIE & CITY TOUR BY NIGHT",
    "source": "(TA) Private Foodie & City Tour by Night.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 40)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "foodie-motorbike",
        "name": "By Motorbike with Driver",
        "format": "motorbike",
        "vehicleType": "Motorbike with Driver & Helmet",
        "notes": "One guest per motorbike driver.",
        "priceVND": 2300000,
        "priceINR": 8510
      },
      {
        "id": "foodie-jeep",
        "name": "By Army Vintage Jeep",
        "format": "vintage_jeep",
        "vehicleType": "Restored Military Vintage Jeep",
        "notes": "Private open-air jeep ride.",
        "priceVND": 2950000,
        "priceINR": 10915
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "priceVND": 2300000,
    "priceINR": 8510
  },
  {
    "id": "private-dinner-cruise-saigon-river",
    "slug": "private-dinner-cruise-saigon-river",
    "title": "Saigon River Luxury Dinner Cruise & Skyline Views",
    "shortTitle": "Saigon River Dinner Cruise",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "Cruise",
    "duration": "Evening (~3-4 Hours)",
    "durationType": "evening",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1 (18:30) or meet at Bach Dang Pier",
    "destinationDetails": "Saigon River, Ho Chi Minh City",
    "description": "Sail past the glittering skyline of Ho Chi Minh City on an elegant evening river cruise. Indulge in a multi-course Vietnamese dinner while enjoying live traditional and acoustic music as iconic landmarks like Bitexco Tower and Landmark 81 light up the night sky.",
    "heroImage": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "Private Dinner Cruise"
    ],
    "groupOptions": [
      "Private Charter / Reserved Cruise Table"
    ],
    "transportOptions": [
      "Private AC Car / Van",
      "Saigon River Cruise Ship"
    ],
    "minimumPax": 1,
    "maximumPax": 30,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "2-hour night cruise along the Saigon River",
      "Lavish multi-course Vietnamese set dinner on board",
      "Unobstructed views of the dazzling city skyline and Landmark 81",
      "Live musical performances during dinner",
      "Round-trip hotel transfers in District 1 included"
    ],
    "itinerary": [
      {
        "time": "18:30",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotel. Transfer to Bach Dang Wharf."
      },
      {
        "time": "19:00",
        "title": "Boarding",
        "description": "Welcome drink upon boarding the cruise ship. Settle at reserved table."
      },
      {
        "time": "19:30 - 21:15",
        "title": "Dinner & River Cruise",
        "description": "Cruise departs along the Saigon River toward Thu Thiem and Landmark 81. Savor multi-course dinner accompanied by live music."
      },
      {
        "time": "21:30",
        "title": "Disembark & Hotel Dropoff",
        "description": "Ship docks back at Bach Dang Wharf. Transfer back to hotel."
      }
    ],
    "inclusions": [
      "Round-trip hotel transfers in District 1",
      "2-hour Saigon River cruise ticket",
      "Multi-course set dinner on board",
      "Live music performance",
      "English-speaking guide"
    ],
    "exclusions": [
      "Beverages ordered at the bar",
      "Personal expenses",
      "Tips"
    ],
    "optionalItems": [
      "Bar drinks and wine"
    ],
    "pickupInformation": "Pickup at District 1 hotels at 18:30.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~21:45.",
    "childPolicy": "Under 4: Free. 4-7: 75% adult rate. 8+: Adult rate.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Smart casual attire recommended."
    ],
    "dietaryInformation": {
      "standard": "Multi-course Vietnamese dinner on cruise.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian set menu available upon request at booking."
    },
    "supplier": "SST Travel",
    "supplierProductName": "PRIVATE DINNER ON CRUISE / DINNER CRUISE ON SAI GON RIVER",
    "source": "(TA) Dinner Cruise on Sai Gon River.pdf / SST TRAVEL ho chi minh tour operators.pdf (Item 39)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "dinner-cruise-private",
        "name": "Private Dinner Cruise Package",
        "format": "private",
        "vehicleType": "Private Transfer + Cruise Ship",
        "priceVND": 2950000,
        "priceINR": 10915
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "priceVND": 2950000,
    "priceINR": 10915
  },
  {
    "id": "saigon-craft-beer-tour",
    "slug": "saigon-craft-beer-tour",
    "title": "Saigon Craft Beer & Taproom Discovery Tour",
    "shortTitle": "Saigon Craft Beer Tour",
    "destination": "Ho Chi Minh City",
    "region": "South Vietnam",
    "category": "Food",
    "duration": "Evening (~4 Hours)",
    "durationType": "evening",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Hotel pickup in District 1, HCMC (18:00)",
    "destinationDetails": "Craft Breweries & Taprooms across Saigon",
    "description": "Discover why Saigon is Southeast Asia's buzzing capital of craft beer. Travel by motorbike or private car with your local guide to 3-4 premier microbreweries and taprooms, sampling innovative brews crafted with local ingredients like dragon fruit, passion fruit, and Vietnamese peppercorn, paired with gourmet pub bites.",
    "heroImage": "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "By Motorbike with Driver",
      "By Air-Conditioned Car"
    ],
    "groupOptions": [
      "Join / Private Group"
    ],
    "transportOptions": [
      "Motorbike with Driver & Helmet",
      "Air-Conditioned Private Car"
    ],
    "minimumPax": 1,
    "maximumPax": 15,
    "guide": "Licensed English-Speaking Guide",
    "languages": [
      "English"
    ],
    "highlights": [
      "Visit 3-4 top microbreweries and craft beer taprooms in Saigon",
      "Taste a variety of unique Vietnamese craft beers (IPAs, sours, stouts)",
      "Learn about the brewing process and local ingredient infusions",
      "Paired with savory gourmet beer snacks and tapas",
      "Choose between riding on the back of a motorbike or in an air-conditioned car"
    ],
    "itinerary": [
      {
        "time": "18:00",
        "title": "Hotel Pickup",
        "description": "Pickup from District 1 hotel."
      },
      {
        "time": "18:30",
        "title": "First Taproom & Tasting Flight",
        "description": "Visit the first craft brewery for an introduction to Vietnam's craft revolution and a tasting flight."
      },
      {
        "time": "19:30",
        "title": "Second Microbrewery & Food Pairing",
        "description": "Sample innovative seasonal ales paired with artisan Vietnamese tapas."
      },
      {
        "time": "20:30",
        "title": "Rooftop Craft Taproom",
        "description": "Enjoy views over Saigon while tasting dessert stouts or tropical sours."
      },
      {
        "time": "21:45 - 22:00",
        "title": "Hotel Dropoff",
        "description": "Return to hotel safely."
      }
    ],
    "inclusions": [
      "Transportation as selected (Motorbike or AC Car)",
      "Craft beer tasting flights at all stops",
      "Beer snack pairings / finger foods",
      "English-speaking guide"
    ],
    "exclusions": [
      "Additional drinks ordered outside the tasting flight",
      "Personal expenses",
      "Tips"
    ],
    "optionalItems": [],
    "pickupInformation": "Pickup in District 1 at 18:00.",
    "dropoffInformation": "Dropoff at District 1 hotels at ~22:00.",
    "childPolicy": "Must be 18 years or older for alcohol consumption.",
    "cancellationPolicy": "Standard operator cancellation policy applies. Contact concierge for cancellation terms.",
    "importantNotes": [
      "Participants must be of legal drinking age."
    ],
    "dietaryInformation": {
      "standard": "Craft beer tastings and pub snacks included.",
      "vegetarianAvailable": true,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Vegetarian snack options can be arranged."
    },
    "supplier": "SST Travel",
    "supplierProductName": "SAIGON CRAFT BEER TOURS (MOTORBIKE / CAR)",
    "source": "SST TRAVEL ho chi minh tour operators.pdf (Items 41 & 42)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "craft-beer-bike",
        "name": "By Motorbike with Driver",
        "format": "motorbike",
        "vehicleType": "Motorbike with Driver & Helmet",
        "priceVND": 1200000,
        "priceINR": 4440
      },
      {
        "id": "craft-beer-car",
        "name": "By Air-Conditioned Car",
        "format": "private",
        "vehicleType": "Air-Conditioned Car",
        "priceVND": 1750000,
        "priceINR": 6475
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "advisory": "Age Restriction: Guests must be 18 years of age or older to consume alcoholic beverages in accordance with Vietnamese law.",
    "priceVND": 1200000,
    "priceINR": 4440
  },
  {
    "id": "hanoi-noi-bai-airport-transfer",
    "slug": "hanoi-noi-bai-airport-transfer",
    "title": "Hanoi Noi Bai Airport (HAN) Private Transfer",
    "shortTitle": "Hanoi Airport Transfer",
    "destination": "Hanoi",
    "region": "Transfers",
    "category": "Transfer",
    "duration": "One-Way (~45-60 Minutes)",
    "durationType": "transfer",
    "departureCity": "Hanoi",
    "departureDetails": "Noi Bai Airport Arrival Hall (HAN) or Hanoi Old Quarter Hotel",
    "destinationDetails": "Hanoi City Center or Noi Bai International Airport",
    "description": "Seamless, stress-free private airport arrival or departure transfer between Hanoi Noi Bai International Airport (HAN) and your hotel in central Hanoi. Professional driver meets you at the arrival gate holding a personalized name sign, assists with luggage, and transports you in a clean, modern air-conditioned vehicle.",
    "heroImage": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "7-Seater Private Car (7S)",
      "16-Seater Private Van (16S)",
      "29-Seater Private Bus (29S)"
    ],
    "groupOptions": [
      "7-Seater (1-3 pax + luggage)",
      "16-Seater (4-8 pax + luggage)",
      "29-Seater (9-18 pax + luggage)"
    ],
    "transportOptions": [
      "7-Seater SUV/MPV",
      "16-Seater Minivan",
      "29-Seater Tourist Coach"
    ],
    "minimumPax": 1,
    "maximumPax": 29,
    "guide": "Professional Driver (Basic English / Concierge Dispatch)",
    "languages": [
      "English"
    ],
    "highlights": [
      "Reliable door-to-door private airport transfer",
      "Personalized meet-and-greet with name sign at the arrival hall",
      "Flight tracking to accommodate delays automatically",
      "Choice of 7-Seater, 16-Seater, or 29-Seater vehicle to suit your party and luggage",
      "All toll fees, fuel, and airport parking fees included"
    ],
    "itinerary": [
      {
        "time": "Arrival Transfer",
        "title": "Flight Tracking & Meet at Arrival Gate",
        "description": "Driver monitors your flight status, meets you outside the baggage claim holding a VIETANA name sign, assists with luggage, and drives you directly to your hotel."
      },
      {
        "time": "Departure Transfer",
        "title": "Hotel Pickup to Airport",
        "description": "Driver meets you at your hotel lobby at your requested pickup time (typically 3 hours before international flights) and transfers you to the departure terminal."
      }
    ],
    "inclusions": [
      "Private vehicle with professional driver",
      "Airport parking and expressway toll fees",
      "Meet-and-greet service with name board",
      "Luggage assistance",
      "Bottled water"
    ],
    "exclusions": [
      "Tips for driver",
      "Extra stops outside standard route"
    ],
    "optionalItems": [],
    "pickupInformation": "Noi Bai International Terminal (Arrival Column 10-12) or hotel lobby in Hanoi.",
    "dropoffInformation": "Direct dropoff at your hotel or airport departure terminal.",
    "childPolicy": "Infants and children count as passengers for vehicle capacity regulations.",
    "cancellationPolicy": "Cancel up to 24 hours prior to transfer time without penalty.",
    "importantNotes": [
      "Please provide flight number, arrival date/time, and number of luggage pieces at booking.",
      "Maximum wait time is 60 minutes after actual flight landing time."
    ],
    "dietaryInformation": {
      "standard": "No meals included on transfer service.",
      "vegetarianAvailable": false,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Transfer service only."
    },
    "supplier": "SST Travel",
    "supplierProductName": "AIRPORT PICK UP AND DROP OFF (7S / 16S / 29S) - HANOI",
    "source": "BẢNG GIÁ ĐẠI LÝ - TOUR MIỀN BẮC (Items 30, 31, 32)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "han-transfer-7s",
        "name": "7-Seater Private Car (7S)",
        "format": "private",
        "vehicleType": "7-Seater SUV / MPV",
        "groupSize": "Max 3-4 pax + 3 luggage",
        "notes": "Ideal for couples and small families.",
        "priceVND": 500000,
        "priceINR": 1850
      },
      {
        "id": "han-transfer-16s",
        "name": "16-Seater Private Van (16S)",
        "format": "private",
        "vehicleType": "16-Seater Ford Transit / Hyundai Solati",
        "groupSize": "Max 8-10 pax + 8 luggage",
        "notes": "Ideal for larger families and groups.",
        "priceVND": 800000,
        "priceINR": 2960
      },
      {
        "id": "han-transfer-29s",
        "name": "29-Seater Private Bus (29S)",
        "format": "private",
        "vehicleType": "29-Seater Tourist Coach",
        "groupSize": "Max 18-20 pax + 20 luggage",
        "notes": "Ideal for tour groups and delegations.",
        "priceVND": 1650000,
        "priceINR": 6105
      }
    ],
    "destinations": [
      "Hanoi"
    ],
    "advisory": "Flight Tracking Notice: Driver monitors arrival flights in real time. Please provide flight number and arrival time at time of booking for terminal greeting.",
    "priceVND": 500000,
    "priceINR": 1850
  },
  {
    "id": "ho-chi-minh-tan-son-nhat-airport-transfer",
    "slug": "ho-chi-minh-tan-son-nhat-airport-transfer",
    "title": "Ho Chi Minh Tan Son Nhat Airport (SGN) Private Transfer",
    "shortTitle": "Saigon Airport Transfer",
    "destination": "Ho Chi Minh City",
    "region": "Transfers",
    "category": "Transfer",
    "duration": "One-Way (~30-45 Minutes)",
    "durationType": "transfer",
    "departureCity": "Ho Chi Minh City",
    "departureDetails": "Tan Son Nhat Airport Arrival Column 10-12 (SGN) or District 1 Hotel",
    "destinationDetails": "Central Ho Chi Minh City or Tan Son Nhat Airport",
    "description": "Comfortable, safe private airport transfer between Tan Son Nhat International Airport (SGN) and your accommodation in central Ho Chi Minh City. Avoid taxi queues and scams with a pre-booked vehicle, personalized driver greeting, and air-conditioned transit.",
    "heroImage": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80"
    ],
    "tourFormats": [
      "7-Seater Private Car (7S)",
      "16-Seater Private Van (16S)",
      "29-Seater Private Bus (29S)"
    ],
    "groupOptions": [
      "7-Seater (1-3 pax + luggage)",
      "16-Seater (4-8 pax + luggage)",
      "29-Seater (9-18 pax + luggage)"
    ],
    "transportOptions": [
      "7-Seater SUV/MPV",
      "16-Seater Minivan",
      "29-Seater Tourist Coach"
    ],
    "minimumPax": 1,
    "maximumPax": 29,
    "guide": "Professional Driver (Basic English / Concierge Dispatch)",
    "languages": [
      "English"
    ],
    "highlights": [
      "Pre-arranged private transfer with zero airport taxi hassles",
      "Personalized meet-and-greet with name sign at arrival gate",
      "Real-time flight monitoring for delay protection",
      "Clean, modern, air-conditioned vehicle with licensed driver",
      "All tolls, parking fees, and airport charges included"
    ],
    "itinerary": [
      {
        "time": "Arrival Transfer",
        "title": "Meet & Greet at Tan Son Nhat",
        "description": "Driver tracks your flight, welcomes you at the arrival hall with a personalized name sign, helps with bags, and drives you safely to your hotel."
      },
      {
        "time": "Departure Transfer",
        "title": "Hotel to Airport",
        "description": "Driver meets you at your hotel lobby at the agreed time and drops you off at the international/domestic departure hall."
      }
    ],
    "inclusions": [
      "Private vehicle with professional driver",
      "All airport parking and toll charges",
      "Personalized name board greeting",
      "Luggage assistance",
      "Bottled water"
    ],
    "exclusions": [
      "Tips for driver",
      "Extra stops outside direct route"
    ],
    "optionalItems": [],
    "pickupInformation": "Tan Son Nhat International Arrival Hall (Column 10-12) or hotel in HCMC.",
    "dropoffInformation": "Direct dropoff at your hotel or airport departure terminal.",
    "childPolicy": "Children count toward vehicle passenger capacity.",
    "cancellationPolicy": "Cancel up to 24 hours before scheduled transfer without penalty.",
    "importantNotes": [
      "Please provide flight number, arrival time, and luggage count when booking.",
      "Driver waits up to 60 minutes from actual landing time."
    ],
    "dietaryInformation": {
      "standard": "No meals included on transfer service.",
      "vegetarianAvailable": false,
      "jainAvailable": false,
      "pureVegAvailable": false,
      "notes": "Transfer service only."
    },
    "supplier": "SST Travel",
    "supplierProductName": "AIRPORT PICK UP AND DROP OFF (7S / 16S / 29S) - HCM",
    "source": "SST TRAVEL ho chi minh tour operators.pdf (Items 44, 45, 46)",
    "sourceUpdatedAt": "2026",
    "variants": [
      {
        "id": "sgn-transfer-7s",
        "name": "7-Seater Private Car (7S)",
        "format": "private",
        "vehicleType": "7-Seater SUV / MPV",
        "groupSize": "Max 3-4 pax + 3 luggage",
        "priceVND": 500000,
        "priceINR": 1850
      },
      {
        "id": "sgn-transfer-16s",
        "name": "16-Seater Private Van (16S)",
        "format": "private",
        "vehicleType": "16-Seater Ford Transit / Hyundai Solati",
        "groupSize": "Max 8-10 pax + 8 luggage",
        "priceVND": 900000,
        "priceINR": 3330
      },
      {
        "id": "sgn-transfer-29s",
        "name": "29-Seater Private Bus (29S)",
        "format": "private",
        "vehicleType": "29-Seater Tourist Coach",
        "groupSize": "Max 18-20 pax + 20 luggage",
        "priceVND": 1750000,
        "priceINR": 6475
      }
    ],
    "destinations": [
      "Ho Chi Minh City"
    ],
    "advisory": "Airport Meeting Point: Chauffeur waits at arrival column 10 (International) or column 4 (Domestic) with a VIETANA nameboard.",
    "priceVND": 500000,
    "priceINR": 1850
  }
];
export const getTourExperienceById = (id: string): TourExperience | undefined => {
  return TOURS_EXPERIENCES_DATA.find(t => t.id.toLowerCase() === id.toLowerCase() || t.slug.toLowerCase() === id.toLowerCase());
};

export const getTourExperienceBySlug = (slug: string): TourExperience | undefined => {
  return TOURS_EXPERIENCES_DATA.find(t => t.slug.toLowerCase() === slug.toLowerCase());
};

export const getAllDestinations = (): string[] => {
  const dests = new Set<string>();
  TOURS_EXPERIENCES_DATA.forEach(t => {
    if (t.destinations && t.destinations.length > 0) {
      t.destinations.forEach(d => {
        if (d && d !== 'Transfers') dests.add(d);
      });
    } else if (t.destination && t.destination !== 'Transfers') {
      dests.add(t.destination);
    }
  });
  return Array.from(dests).sort();
};

export const getAllCategories = (): TourCategory[] => {
  const cats = new Set<TourCategory>();
  TOURS_EXPERIENCES_DATA.forEach(t => cats.add(t.category));
  return Array.from(cats);
};

export const searchToursExperiences = ({
  query = '',
  region = 'ALL',
  destination = 'ALL',
  category = 'ALL',
  duration = 'ALL',
}: {
  query?: string;
  region?: string;
  destination?: string;
  category?: string;
  duration?: string;
}): TourExperience[] => {
  return TOURS_EXPERIENCES_DATA.filter(t => {
    // Query search
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q) || t.shortTitle.toLowerCase().includes(q);
      const matchDest = t.destination.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchHighlights = t.highlights.some(h => h.toLowerCase().includes(q));
      if (!matchTitle && !matchDest && !matchDesc && !matchHighlights) {
        return false;
      }
    }

    // Region filter
    if (region !== 'ALL') {
      if (region.toUpperCase() === 'TRANSFERS') {
        if (t.region !== 'Transfers') return false;
      } else if (t.region.toUpperCase() !== region.toUpperCase()) {
        return false;
      }
    }

    // Destination filter
    if (destination !== 'ALL') {
      const dLower = destination.toLowerCase();
      const matches = t.destinations && t.destinations.length > 0
        ? t.destinations.some(d => d.toLowerCase() === dLower)
        : t.destination.toLowerCase() === dLower;
      if (!matches) return false;
    }

    // Category filter
    if (category !== 'ALL' && t.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Duration filter
    if (duration !== 'ALL') {
      const types = t.durationTypes && t.durationTypes.length > 0
        ? t.durationTypes
        : [t.durationType];
      if (duration === 'Half Day' && !types.includes('half_day')) return false;
      if (duration === 'Full Day' && !types.includes('full_day')) return false;
      if (duration === 'Evening' && !types.includes('evening')) return false;
      if (duration === 'Multi Day' && !types.includes('multi_day')) return false;
      if (duration === 'Transfer' && !types.includes('transfer')) return false;
    }

    return true;
  });
};

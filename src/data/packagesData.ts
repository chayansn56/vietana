import { Itinerary } from '../hooks/useAIPlanner';

export interface PackageProduct {
  id: string;
  title: string;
  duration: string;
  badge: string;
  desc: string;
  img: string;
  destinations: string[];
  hotels: string[];
  inclusions: string[];
  exclusions: string[];
  days: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    food: string[];
  }[];
  isJainVegFriendly?: boolean;
}

export interface CategoryData {
  name: string;
  tagline: string;
  subsections: string[];
  packages: PackageProduct[];
}

export const ITINERARIES_DATABASE: PackageProduct[] = [
  {
    id: "budget-explorer",
    title: "Vietnam Budget Explorer (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Budget Friendly",
    desc: "A classic budget-focused introduction to the cultural landmarks of Hanoi and the emerald karsts of Ha Long Bay.",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay"],
    hotels: [
      "Hanoi: 3-Star Golden Sun Suites (or similar) - 3 Nights",
      "Ha Long Bay: 3-Star Oriental Sails Cruise (or similar) - 1 Night"
    ],
    inclusions: [
      "03 Nights hotel accommodation in Hanoi on twin/triple sharing basis",
      "01 Night overnight cabin accommodation on Ha Long Bay cruise",
      "Daily buffet breakfast at the hotel",
      "Full board meals on the cruise (Breakfast, Lunch, Dinner)",
      "Airport transfers (Noi Bai Airport to hotel and back) in private A/C vehicles",
      "Guided sightseeing tours in Hanoi and Ha Long Bay (shared/SIC basis)",
      "Vietnam visa approval/support letter assistance",
      "Local SIM card with high-speed internet data (1 per booking)"
    ],
    exclusions: [
      "International flight ticket / airfare booking costs",
      "Vietnam e-visa stamping/entry fees",
      "Personal expenses (laundry, telephone calls, tips)",
      "Meals other than those specified in inclusions",
      "Travel insurance"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Hanoi & Old Quarter Explorations",
        description: "Touch down in the thousand-year-old capital. Warm local welcome and transfer to your cozy hotel.",
        activities: [
          "Noi Bai Airport private vehicle pickup and drop to Old Quarter hotel",
          "Check-in and orientation of the historic 36 guild streets",
          "Evening stroll around the lantern-lit Hoan Kiem Lake"
        ],
        food: [
          "Traditional Vietnamese Pho at local veg-friendly stalls",
          "Aromatic egg coffee at the famous Cafe Giang"
        ]
      },
      {
        day: 2,
        title: "Hanoi City Heritage & Culture",
        description: "Dive deep into the history and architectural wonders of Hanoi's ancient dynasties.",
        activities: [
          "Visit Temple of Literature (Vietnam's first national university)",
          "Explore the historic Ho Chi Minh Mausoleum and One Pillar Pagoda",
          "Walk through the French Quarter and watch the Hanoi Train pass by the narrow tracks"
        ],
        food: [
          "Indian lunch at Dalcheeni Indian Restaurant",
          "Local street treats like vegetarian Banh Mi"
        ]
      },
      {
        day: 3,
        title: "Hanoi to Ha Long Bay Overnight Cruise",
        description: "Embark on an unforgettable voyage through the towering karst formations of Ha Long Bay.",
        activities: [
          "Transfer from Hanoi to Ha Long harbor in shared coach",
          "Board the traditional cruise boat and check in to your cabin",
          "Sail past stunning limestone islands and explore Sung Sot (Surprise) Cave"
        ],
        food: [
          "Fresh vegetarian/seafood buffet lunch on board",
          "Sunset dinner on the sundeck under the stars"
        ]
      },
      {
        day: 4,
        title: "Ti Top Peak, Kayaking & Return to Hanoi",
        description: "Catch a golden sunrise over the misty bay, climb the peaks, and return to the city.",
        activities: [
          "Climb to the summit of Ti Top Island for panoramic views of the bay",
          "Kayak through Luon Cave or enjoy a relaxed morning swim",
          "Disembark the cruise and transfer back to Hanoi hotel"
        ],
        food: [
          "Brunch on board the cruise",
          "Evening dinner of traditional Indian comfort food in Hanoi"
        ]
      },
      {
        day: 5,
        title: "Souvenir Shopping & Departure",
        description: "Pick up souvenirs and bid farewell to Vietnam as you transfer to the airport.",
        activities: [
          "Morning shopping at Dong Xuan Market or Old Quarter boutiques",
          "Private vehicle transfer from Hanoi hotel to Noi Bai International Airport",
          "Board return flight home"
        ],
        food: [
          "Quick lunch or snacks at airport cafes"
        ]
      }
    ]
  },
  {
    id: "hanoi-escape",
    title: "Hanoi & Halong Escape (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Comfort Explorer",
    desc: "A premium cultural exploration of Hanoi combined with a high-end overnight cruise in the emerald waters of Ha Long Bay.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay"],
    hotels: [
      "Hanoi: 4-Star Silk Path Boutique Hotel (or similar) - 3 Nights",
      "Ha Long Bay: 4-Star Bhaya Cruise (or similar) - 1 Night"
    ],
    inclusions: [
      "03 Nights premium hotel accommodation in Hanoi",
      "01 Night luxury overnight boutique cruise in Ha Long Bay",
      "Daily buffet breakfast at the hotel",
      "Gourmet multi-course meals on the cruise",
      "All airport and cruise transfers in private premium vehicles",
      "Private guided city tour in Hanoi",
      "Complimentary E-Visa assistance support",
      "Local SIM card with high-speed internet data"
    ],
    exclusions: [
      "International airfare",
      "Vietnam e-visa entry fee",
      "Personal expenses and tips",
      "Meals not specified in the itinerary",
      "Travel insurance"
    ],
    days: [
      {
        day: 1,
        title: "Hanoi Welcoming & Luxury Spa Session",
        description: "Arrive in style with a private transfer and unwind with a premium spa experience.",
        activities: [
          "Private airport pickup and luxury transfer to Hanoi boutique hotel",
          "Relaxing evening 60-minute massage at La Spa Old Quarter",
          "Night view walk at St. Joseph's Cathedral"
        ],
        food: [
          "Fusion Vietnamese dinner at a premium boutique restaurant",
          "Premium specialty coffee at Cafe Dinh"
        ]
      },
      {
        day: 2,
        title: "Premium Hanoi Insights Tour",
        description: "Explore the local culture, galleries, and history of Hanoi in a private vehicle.",
        activities: [
          "Private guided tour of the Tran Quoc Pagoda on West Lake",
          "Visit the Temple of Literature and Hanoi Citadel",
          "Exclusive puppet show seating at Thang Long Water Puppet Theatre"
        ],
        food: [
          "Authentic Indian lunch at Namaste Hanoi",
          "Fine dining Vietnamese dinner at Cau Go Restaurant"
        ]
      },
      {
        day: 3,
        title: "Luxury Cruise Boarding & Halong Cruise",
        description: "Set sail in a premium vessel among the limestone rocks of Ha Long Bay.",
        activities: [
          "Private luxury transfer from Hanoi to Halong Bay",
          "Board Bhaya Cruise and enjoy a welcome drink",
          "Kayak through local lagoons and swim at quiet beaches"
        ],
        food: [
          "Gourmet lunch buffet on board",
          "Sumptuous dinner menu curated by cruise chefs"
        ]
      },
      {
        day: 4,
        title: "Tai Chi, Surprise Cave & Return to Hanoi",
        description: "Greet the morning with Tai Chi on deck, explore local caves, and return to Hanoi.",
        activities: [
          "Morning Tai Chi session on the cruise sundeck",
          "Explore the massive Sung Sot Cave structures",
          "Private vehicle return transfer to Hanoi hotel for your final night"
        ],
        food: [
          "Traditional breakfast and brunch on board",
          "Dinner at a local fine dining restaurant in Hanoi"
        ]
      },
      {
        day: 5,
        title: "Old Quarter Shopping & Departure",
        description: "Pick up souvenirs and transfer to the airport for your flight home.",
        activities: [
          "Free time for shopping silk, coffee, and crafts",
          "Private airport transfer for your departure flight"
        ],
        food: [
          "Cafe snacks or quick bites before boarding"
        ]
      }
    ]
  },
  {
    id: "danang-discovery",
    title: "Da Nang & Hoi An Discovery (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Heritage & Beach",
    desc: "Experience the historic trading port of Hoi An combined with the beaches and iconic bridges of Da Nang.",
    img: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
    destinations: ["Da Nang", "Hoi An"],
    hotels: [
      "Da Nang: 4-Star Canvas Danang Beach Hotel (or similar) - 2 Nights",
      "Hoi An: 4-Star Mulberry Collection Silk Village (or similar) - 2 Nights"
    ],
    inclusions: [
      "02 Nights beachside hotel accommodation in Da Nang",
      "02 Nights heritage resort accommodation in Hoi An",
      "Daily buffet breakfast at hotels",
      "Private vehicle transfers for all airport drops and city travel",
      "Admission tickets to Ba Na Hills, Golden Bridge cable car, and Marble Mountains",
      "Lantern boat ride in Hoi An Ancient Town",
      "E-visa approval letter assistance and Local SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "Vietnam e-visa stamping fee",
      "Meals not specified in the inclusions",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Da Nang & Marble Mountains",
        description: "Arrive at Da Nang Airport and explore the mystical cave temples of Marble Mountains.",
        activities: [
          "Private vehicle pickup from Da Nang Airport to beachside hotel",
          "Guided excursion to Marble Mountains and Linh Ung Pagoda",
          "Evening stroll along My Khe Beach"
        ],
        food: [
          "Indian dinner at Family Indian Restaurant Da Nang",
          "Local specialty snacks near the beach"
        ]
      },
      {
        day: 2,
        title: "Ba Na Hills & Iconic Golden Bridge",
        description: "Ride the world's longest single-cable car up to Ba Na Hills and walk on the Golden Bridge.",
        activities: [
          "Full-day trip to Sun World Ba Na Hills",
          "Walk on the famous Golden Bridge held by giant stone hands",
          "Explore the French Village, flower gardens, and Linh Ung Pagoda peak"
        ],
        food: [
          "Buffet lunch at Ba Na Hills restaurant",
          "Vietnamese dinner back in Da Nang city"
        ]
      },
      {
        day: 3,
        title: "Transfer to Hoi An & Lantern Boat Ride",
        description: "Check in to your Hoi An resort and take a lantern boat ride down the Thu Bon River.",
        activities: [
          "Transfer from Da Nang to Hoi An via private vehicle",
          "Walking tour of Hoi An Ancient Town (Japanese Covered Bridge, Assembly Halls)",
          "Evening boat ride releasing paper lanterns on the river"
        ],
        food: [
          "Lunch at local Cao Lau noodle shop",
          "Dinner at Ganesh Indian Restaurant Hoi An"
        ]
      },
      {
        day: 4,
        title: "Coconut Forest Basket Boat & Organic Village",
        description: "Spin through the water palms in a circular basket boat and explore local farming villages.",
        activities: [
          "Basket boat spin ride at Bay Mau Coconut Forest",
          "Bicycle ride to Tra Que Organic Vegetable Village",
          "Optional tailor session in Hoi An Ancient Town"
        ],
        food: [
          "Organic lunch at Tra Que village",
          "Evening drinks at Reaching Out Teahouse"
        ]
      },
      {
        day: 5,
        title: "Departure from Da Nang",
        description: "Free morning for last-minute shopping before transfer to Da Nang Airport.",
        activities: [
          "Check-out from Hoi An resort",
          "Private vehicle transfer to Da Nang Airport for your return flight"
        ],
        food: [
          "Cafe snacks in Hoi An before checkout"
        ]
      }
    ]
  },
  {
    id: "vietnam-classic",
    title: "Vietnam Classic (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "First-Timer Favorite",
    desc: "The ultimate classic introduction covering Hanoi, Ha Long Bay, Da Nang, and the heritage town of Hoi An.",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay", "Da Nang", "Hoi An"],
    hotels: [
      "Hanoi: 4-Star Silk Path Boutique Hotel - 2 Nights",
      "Ha Long Bay: 4-Star Bhaya Cruise - 1 Night",
      "Da Nang/Hoi An: 4-Star Canvas Danang Beach Hotel - 3 Nights"
    ],
    inclusions: [
      "02 Nights hotel accommodation in Hanoi",
      "01 Night luxury overnight cabin on Ha Long Bay cruise",
      "03 Nights beachside hotel accommodation in Da Nang/Hoi An",
      "Daily buffet breakfast at hotels",
      "Full board meals on the cruise (Lunch, Dinner, Brunch)",
      "Private vehicle transfers for all airport drops and city-to-city transfers",
      "Admission tickets to Ba Na Hills, Golden Bridge, and Halong Bay cave tours",
      "E-visa support letter and Local SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa entry fees",
      "Meals not specified in the itinerary",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Hanoi & Old Quarter Stroll",
        description: "Arrive in Hanoi, the cultural capital, and explore the bustling streets of the Old Quarter.",
        activities: [
          "Private airport transfer from Noi Bai Airport to Hanoi hotel",
          "Orientation walk around the Hoan Kiem Lake",
          "Explore the 36 Old Streets"
        ],
        food: [
          "Vegetarian dining options at local cafes",
          "Traditional egg coffee tasting"
        ]
      },
      {
        day: 2,
        title: "Hanoi Cultural Insights Tour",
        description: "Guided private tour of Hanoi's primary historic and cultural landmarks.",
        activities: [
          "Visit Temple of Literature and Ho Chi Minh Mausoleum",
          "Walk the French Quarter and observe the Hanoi Train passage",
          "Sit down for a Water Puppet Show"
        ],
        food: [
          "Lunch at Dalcheeni Indian Restaurant",
          "Dinner at local Vietnamese vegetarian cafe"
        ]
      },
      {
        day: 3,
        title: "Hanoi to Ha Long Bay Cruise",
        description: "Scenic transfer to Ha Long Bay harbor and embarkation on an overnight luxury cruise.",
        activities: [
          "Transfer to Ha Long Bay in private vehicle",
          "Board cruise ship and sail past limestone cliffs",
          "Explore Sung Sot Cave and kayak in lagoons"
        ],
        food: [
          "Buffet lunch on board the cruise",
          "Gourmet seafood/veg dinner on deck"
        ]
      },
      {
        day: 4,
        title: "Flight to Da Nang & My Khe Beach",
        description: "Morning cruise activities followed by a flight to the beachside city of Da Nang.",
        activities: [
          "Tai Chi on deck and visit Ti Top Island peak",
          "Private transfer to Hanoi Airport for flight to Da Nang",
          "Private pickup at Da Nang Airport and check in to beachside hotel"
        ],
        food: [
          "Brunch on board the cruise",
          "Indian dinner at Family Indian Restaurant Da Nang"
        ]
      },
      {
        day: 5,
        title: "Ba Na Hills & Golden Bridge Peak Tour",
        description: "Spend the day on the mountaintops of Ba Na Hills walking the Golden Bridge.",
        activities: [
          "Full-day excursion to Sun World Ba Na Hills",
          "Ride the scenic cable car and walk on the Golden Bridge",
          "Explore Linh Ung Pagoda and the French Village gardens"
        ],
        food: [
          "Buffet lunch at Ba Na Hills buffet restaurant",
          "Seafood dinner at Be Man Da Nang beachside"
        ]
      },
      {
        day: 6,
        title: "Marble Mountains & Lantern-lit Hoi An",
        description: "Discover Marble Mountain caves and spend the afternoon in the ancient town of Hoi An.",
        activities: [
          "Private guided tour to Marble Mountains cave shrines",
          "Transfer to Hoi An and walking tour of the Ancient Town heritage houses",
          "Lantern boat ride on the Thu Bon River at dusk"
        ],
        food: [
          "Lunch at Cao Lau noodle restaurant in Hoi An",
          "Dinner at Ganesh Indian Restaurant Hoi An"
        ]
      },
      {
        day: 7,
        title: "Departure from Da Nang",
        description: "Free morning for beach activities and souvenir shopping before airport transfer.",
        activities: [
          "Free morning on My Khe Beach",
          "Private transfer to Da Nang Airport for your return flight"
        ],
        food: [
          "Quick breakfast at hotel and coffee before departure"
        ]
      }
    ]
  },
  {
    id: "vietnam-complete",
    title: "Vietnam Complete (10D9N)",
    duration: "10 Days / 9 Nights",
    badge: "Comprehensive Grand Tour",
    desc: "A complete grand tour connecting the North, the Central coast, and the high-energy Southern metropolis of Saigon.",
    img: "https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay", "Da Nang", "Hoi An", "Ho Chi Minh City"],
    hotels: [
      "Hanoi: 4-Star Silk Path Boutique Hotel - 2 Nights",
      "Ha Long Bay: 4-Star Bhaya Cruise - 1 Night",
      "Da Nang: 4-Star Canvas Danang Beach Hotel - 3 Nights",
      "Ho Chi Minh City: 4-Star Liberty Central Saigon Centre - 3 Nights"
    ],
    inclusions: [
      "02 Nights hotel accommodation in Hanoi",
      "01 Night luxury overnight cabin on Ha Long Bay cruise",
      "03 Nights beachside hotel accommodation in Da Nang/Hoi An",
      "03 Nights central hotel accommodation in Ho Chi Minh City",
      "Daily buffet breakfast at hotels",
      "Full board meals on the cruise",
      "Private vehicle transfers for all airport pickups, drops, and city transit",
      "Guided excursions to Ba Na Hills, Marble Mountains, Cu Chi Tunnels, and Mekong Delta",
      "Hoi An Ancient Town lantern boat tickets",
      "E-visa support letter and Local SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa stamping fees",
      "Meals not specified in inclusions",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Hanoi & City Walk",
        description: "Touch down in the north capital and enjoy a relaxed introduction to Hanoi.",
        activities: [
          "Private airport pickup and drop at Hanoi hotel",
          "Relaxed walk around Hoan Kiem Lake and Old Quarter streets"
        ],
        food: [
          "Egg coffee tasting at local cafe",
          "Traditional Pho soup dinner"
        ]
      },
      {
        day: 2,
        title: "Hanoi Heritage Tour & Water Puppets",
        description: "Explore the historic, religious, and political monuments of Hanoi.",
        activities: [
          "Private guided tour to Temple of Literature, One Pillar Pagoda, and Hanoi Train street",
          "Evening Water Puppet show attendance"
        ],
        food: [
          "Indian lunch at Dalcheeni Hanoi",
          "Dinner at a local gourmet Vietnamese restaurant"
        ]
      },
      {
        day: 3,
        title: "Hanoi to Ha Long Bay Cruise Voyage",
        description: "Voyage among thousands of karst formations in emerald waters.",
        activities: [
          "Private transfer from Hanoi to Ha Long Bay harbor",
          "Board overnight cruise and check in to cabin",
          "Explore Surprise Cave and swim/kayak in calm waters"
        ],
        food: [
          "Buffet lunch on board standard cruise",
          "Sunset dinner buffet under the stars"
        ]
      },
      {
        day: 4,
        title: "Flight to Da Nang & Beach Stroll",
        description: "Morning cruise activities followed by a flight to Da Nang beachside.",
        activities: [
          "Tai Chi on deck and visit Ti Top Island",
          "Private transfer to Hanoi Airport for flight to Da Nang",
          "Private pickup at Da Nang Airport to My Khe Beach hotel"
        ],
        food: [
          "Brunch on board the cruise",
          "Indian dinner at Family Indian Restaurant Da Nang"
        ]
      },
      {
        day: 5,
        title: "Ba Na Hills Mountaintop & Golden Bridge",
        description: "Walk the iconic Golden Bridge and explore Ba Na Hills theme park.",
        activities: [
          "Full-day excursion to Sun World Ba Na Hills",
          "Ride the record-setting cable car and walk on the Golden Bridge",
          "Explore French Village gardens and Linh Ung Pagoda"
        ],
        food: [
          "Buffet lunch at Ba Na Hills restaurant",
          "Local seafood dinner at Da Nang beachside"
        ]
      },
      {
        day: 6,
        title: "Marble Mountains & Lantern-lit Hoi An Ancient Town",
        description: "Explore Marble Mountain caves and transfer to Hoi An ancient town.",
        activities: [
          "Guided private tour of Marble Mountain cave shrines",
          "Walking tour of Hoi An Ancient Town heritage streets",
          "Lantern boat ride on the Thu Bon River at night"
        ],
        food: [
          "Lunch at a local Cao Lau noodle house",
          "Dinner at Ganesh Indian Restaurant Hoi An"
        ]
      },
      {
        day: 7,
        title: "Flight to Ho Chi Minh City & Nightlife Walk",
        description: "Fly to the southern metropolis of Saigon and experience the night energy.",
        activities: [
          "Private transfer to Da Nang Airport for flight to Ho Chi Minh City",
          "Private pickup at HCMC Airport and check in to central Saigon hotel",
          "Evening walk around Nguyen Hue Walking Street and Bitexco Tower"
        ],
        food: [
          "Lunch at local noodle shop",
          "Dinner at Tandoor Indian Restaurant HCMC"
        ]
      },
      {
        day: 8,
        title: "Cu Chi Tunnels Guided Tour",
        description: "Crawl through the historic network of underground wartime tunnels.",
        activities: [
          "Half-day excursion to the Cu Chi Tunnels with local guide",
          "Return to Saigon and visit War Remnants Museum and Independence Palace"
        ],
        food: [
          "Traditional Com Tam (broken rice) lunch",
          "Saigon street food tasting in District 4"
        ]
      },
      {
        day: 9,
        title: "Mekong Delta Waterways & Floating Markets",
        description: "Take a boat down the lush delta canals and observe the floating market traders.",
        activities: [
          "Full-day trip to Mekong Delta (My Tho / Ben Tre)",
          "Boat tour along canals and visit local fruit orchards and honey farms",
          "Return to Ho Chi Minh City for final evening"
        ],
        food: [
          "Delta specialty lunch at local garden restaurant",
          "Farewell dinner at Saigon River cruise dinner"
        ]
      },
      {
        day: 10,
        title: "Souvenir Shopping & Departure",
        description: "Pick up souvenirs at Ben Thanh Market and transfer to the airport.",
        activities: [
          "Shopping at Ben Thanh Market or Saigon Square",
          "Private transfer to Tan Son Nhat International Airport for return flight home"
        ],
        food: [
          "Quick breakfast at hotel and coffee before departure"
        ]
      }
    ]
  },
  {
    id: "vietnam-honeymoon",
    title: "Vietnam Honeymoon (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Romance & Luxury",
    desc: "A romantically paced escape featuring private dinners, couple's spa treatments, and a luxury Halong cruise.",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay", "Hoi An"],
    hotels: [
      "Hanoi: 4-Star Silk Path Boutique Hotel - 1 Night",
      "Ha Long Bay: 5-Star Indochine Cruise (Luxury) - 1 Night",
      "Hoi An: 4-Star Mulberry Collection Silk Village (Resort) - 3 Nights"
    ],
    inclusions: [
      "01 Night luxury boutique hotel in Hanoi with honeymoon room decor",
      "01 Night 5-Star luxury overnight cabin on Ha Long Bay cruise",
      "03 Nights romantic heritage resort accommodation in Hoi An",
      "Daily buffet breakfast at hotels",
      "Full board fine dining meals on the cruise",
      "All airport and destination transfers in private premium vehicles",
      "Private candle-lit dinner in Hoi An",
      "Private lantern boat ride and couple spa treatment in Hoi An",
      "E-visa support letter and Local SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa stamping fees",
      "Meals not specified in inclusions",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Hanoi & Romantic Dinner",
        description: "Land in Hanoi with a private pick-up, enjoy room decoration, and sit down for a romantic dinner.",
        activities: [
          "Private premium vehicle transfer from airport to Hanoi hotel",
          "Welcome drink and special room decoration",
          "Evening stroll around Hoan Kiem Lake"
        ],
        food: [
          "Candlelit Vietnamese fusion dinner at Cau Go Restaurant",
          "Gourmet coffee at Hanoi corner cafe"
        ]
      },
      {
        day: 2,
        title: "Luxury Overnight Ha Long Bay Cruise",
        description: "Transfer to Ha Long Bay and board a luxury 5-star cruise vessel.",
        activities: [
          "Private vehicle transfer from Hanoi to Ha Long Bay",
          "Board Indochine Cruise and check in to private balcony cabin",
          "Explore Lan Ha Bay lagoons and quiet limestone beaches"
        ],
        food: [
          "Gourmet buffet lunch on board",
          "Fine dining seafood dinner on the cruise deck"
        ]
      },
      {
        day: 3,
        title: "Flight to Da Nang & Romantic Hoi An Resort",
        description: "Fly to Da Nang and transfer to your peaceful heritage resort in Hoi An.",
        activities: [
          "Tai Chi on deck and exploration of floating cave lagoons",
          "Private transfer to Hanoi Airport for flight to Da Nang",
          "Private transfer from Da Nang Airport to Hoi An resort"
        ],
        food: [
          "Brunch on board the cruise",
          "Dinner at Ganesh Indian Restaurant Hoi An"
        ]
      },
      {
        day: 4,
        title: "Hoi An Walking Tour & Candlelit River Dinner",
        description: "Discover the yellow-walled ancient streets and enjoy a private candlelit river dinner.",
        activities: [
          "Private walking tour of Hoi An Ancient Town (Japanese Covered Bridge, heritage houses)",
          "Private boat ride releasing floating lanterns on the Thu Bon River",
          "Exclusive riverside dinner table reservation"
        ],
        food: [
          "Lunch at local cafe",
          "Private candlelit dinner at a riverside garden restaurant"
        ]
      },
      {
        day: 5,
        title: "Couple's Spa Session & Beach Day",
        description: "Unwind with a premium couple's massage and relax at An Bang Beach.",
        activities: [
          "90-minute couple's massage and herbal bath treatment at resort spa",
          "Afternoon relaxation on the sands of An Bang Beach",
          "Evening bike ride through local rice fields"
        ],
        food: [
          "Healthy organic lunch at beachside cafe",
          "Cocktails and dinner at Shore Club An Bang"
        ]
      },
      {
        day: 6,
        title: "Departure from Da Nang",
        description: "Bid farewell to Vietnam as you transfer to Da Nang Airport for your flight home.",
        activities: [
          "Check-out from Hoi An resort",
          "Private transfer to Da Nang Airport for return flight"
        ],
        food: [
          "Quick breakfast at hotel before checkout"
        ]
      }
    ]
  },
  {
    id: "vietnam-family",
    title: "Vietnam Family Fun (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Family Friendly",
    desc: "A carefully paced tour featuring theme parks, easy bike rides, connecting rooms, and safety-verified transport.",
    img: "https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=800&q=80",
    destinations: ["Hanoi", "Ninh Binh", "Da Nang"],
    hotels: [
      "Hanoi: 4-Star Silk Path Boutique Hotel - 2 Nights",
      "Ninh Binh: 4-Star Emeralda Resort Ninh Binh - 1 Night",
      "Da Nang: 4-Star Canvas Danang Beach Hotel - 3 Nights"
    ],
    inclusions: [
      "02 Nights family-friendly hotel in Hanoi",
      "01 Night luxury eco-resort in Ninh Binh",
      "03 Nights family beachside resort in Da Nang",
      "Daily buffet breakfast at hotels",
      "Private vehicle transfers for all airport drops, pickups, and excursions",
      "All admission tickets (Trang An boat ride, Hang Mua, Ba Na Hills cable car)",
      "E-visa support letter and Local SIM cards"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa entry fees",
      "Meals not specified in inclusions",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Hanoi & Rickshaw Old Quarter Ride",
        description: "Arrive in Hanoi and explore the Old Quarter streets in a traditional cyclo rickshaw.",
        activities: [
          "Private airport transfer to Hanoi hotel",
          "1-hour cyclo rickshaw ride through Hanoi Old Quarter streets",
          "Walk around Hoan Kiem Lake and watch local street artists"
        ],
        food: [
          "Egg coffee and fruit juices at local cafe",
          "Dinner at a child-friendly Vietnamese restaurant"
        ]
      },
      {
        day: 2,
        title: "Hanoi Street Train & Water Puppet Show",
        description: "See the famous train pass by narrow residential tracks and watch a water puppet show.",
        activities: [
          "Visit Hanoi Train Street and sit at a safe trackside cafe",
          "Explore Temple of Literature gardens",
          "Evening Water Puppet show at Thang Long Theatre"
        ],
        food: [
          "Indian lunch at Namaste Hanoi",
          "Local sweet treats and pastries at French bakery"
        ]
      },
      {
        day: 3,
        title: "Transfer to Ninh Binh & Trang An Boat Ride",
        description: "Travel to Ninh Binh, float down river tunnels, and explore Bich Dong cave pagoda.",
        activities: [
          "Private vehicle transfer from Hanoi to Ninh Binh",
          "Trang An rowing boat ride through limestone caves and river gorges",
          "Explore the historic Bich Dong cave pagoda gate"
        ],
        food: [
          "Lunch at local Ninh Binh garden restaurant",
          "Dinner at Emeralda Resort restaurant"
        ]
      },
      {
        day: 4,
        title: "Hang Mua Dragon Peak & Flight to Da Nang",
        description: "Climb Hang Mua steps for spectacular views before taking a flight to Da Nang.",
        activities: [
          "Climb the steps of Hang Mua Peak to see the stone dragon and valley views",
          "Private transfer to Hanoi Airport for flight to Da Nang",
          "Private pickup at Da Nang Airport and check in to beachside hotel"
        ],
        food: [
          "Quick lunch near airport",
          "Indian dinner at Family Indian Restaurant Da Nang"
        ]
      },
      {
        day: 5,
        title: "Ba Na Hills Theme Park & Golden Bridge",
        description: "Spend a full day in the mountaintops of Ba Na Hills walking the Golden Bridge.",
        activities: [
          "Full-day trip to Sun World Ba Na Hills",
          "Ride the scenic cable car and walk on the Golden Bridge",
          "Explore the Fantasy Park indoor amusement rides and gardens"
        ],
        food: [
          "Buffet lunch at Ba Na Hills buffet restaurant",
          "Seafood dinner at beachside restaurant in Da Nang"
        ]
      },
      {
        day: 6,
        title: "Marble Mountains & Hoi An Basket Boats",
        description: "Discover Marble Mountain caves and ride basket boats through water palms.",
        activities: [
          "Visit Marble Mountain cave shrines",
          "Spin ride in traditional round basket boats at Bay Mau Coconut Forest",
          "Evening walking tour of lantern-lit Hoi An Ancient Town"
        ],
        food: [
          "Lunch at local cafe in Hoi An",
          "Dinner at Ganesh Indian Restaurant Hoi An"
        ]
      },
      {
        day: 7,
        title: "Departure from Da Nang",
        description: "Free morning at My Khe Beach before private transfer to Da Nang Airport.",
        activities: [
          "Morning swimming and beach activities at My Khe Beach",
          "Private transfer to Da Nang Airport for departure flight home"
        ],
        food: [
          "Breakfast at hotel and cafe bites before checkout"
        ]
      }
    ]
  },
  {
    id: "phuquoc-paradise",
    title: "Phu Quoc Paradise (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Beach Resort Getaway",
    desc: "Immerse yourself in a tropical island paradise with pristine sand beaches, water parks, and sunset cruises.",
    img: "https://images.unsplash.com/photo-1579624956553-9111c6d32f52?w=800&q=80",
    destinations: ["Phu Quoc"],
    hotels: [
      "Phu Quoc: 4-Star Novotel Phu Quoc Resort (or similar) - 4 Nights"
    ],
    inclusions: [
      "04 Nights luxury beachside resort accommodation in Phu Quoc",
      "Daily buffet breakfast at resort",
      "Private vehicle transfers for all airport drops, pickups, and island travel",
      "Hon Thom Cable Car and Sun World Water Park tickets",
      "Full-day island boat cruise with snorkeling",
      "E-visa support letter and Local SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa stamping fees",
      "Meals not specified in inclusions",
      "Personal expenses"
    ],
    days: [
      {
        day: 1,
        title: "Arrival in Phu Quoc & Sunset Beach Walk",
        description: "Land on the tropical island of Phu Quoc, check in to your resort, and enjoy the sunset.",
        activities: [
          "Private airport pickup and transfer to Novotel Phu Quoc Resort",
          "Check-in and relaxation by the private beach",
          "Evening sunset stroll on Long Beach"
        ],
        food: [
          "Dinner at resort beachfront grill",
          "Tropical mocktails at beach lounge"
        ]
      },
      {
        day: 2,
        title: "Vinpearl Safari & Sleepless Grand World",
        description: "Observe wildlife at Vinpearl Safari and explore the Venetian canals of Grand World.",
        activities: [
          "Morning excursion to Vinpearl Safari Phu Quoc",
          "Visit Grand World Phu Quoc (Venetian canals, bamboo temple, local show)",
          "Evening shopping at local boutiques"
        ],
        food: [
          "Lunch at Safari park cafe",
          "Dinner at Grand World local restaurant"
        ]
      },
      {
        day: 3,
        title: "Hon Thom Cable Car & Sun World Water Park",
        description: "Ride the world's longest over-sea cable car and enjoy water park rides at Pine Island.",
        activities: [
          "Ride the Hon Thom over-sea cable car",
          "Full day at Sun World Aquatopia Water Park on Hon Thom island",
          "Evening return via cable car and watch sunset at Sunset Town"
        ],
        food: [
          "Buffet lunch on Hon Thom island",
          "Dinner at Sunset Town local restaurant"
        ]
      },
      {
        day: 4,
        title: "Island Snorkeling Cruise & Sao Beach Walk",
        description: "Take a boat cruise to small southern islets for snorkeling and walk the powder-white sands of Sao Beach.",
        activities: [
          "Full-day southern island boat tour (Mong Tay / Gam Ghi / May Rut islands)",
          "Snorkeling and swimming in crystal clear turquoise waters",
          "Afternoon walk on the white sands of Sao Beach"
        ],
        food: [
          "Local lunch served on board the boat",
          "Barbecue seafood dinner at Phu Quoc Night Market"
        ]
      },
      {
        day: 5,
        title: "Checkout & Departure",
        description: "Free morning for resort activities before private airport transfer.",
        activities: [
          "Morning swimming in resort pool or beach",
          "Private transfer to Phu Quoc Airport for return flight home"
        ],
        food: [
          "Breakfast at hotel and cafe snacks before checkout"
        ]
      }
    ]
  },
  {
    id: "luxury-vietnam",
    title: "Luxury Vietnam (8D7N)",
    duration: "8 Days / 7 Nights",
    badge: "Ultra-Luxe & VIP",
    desc: "The absolute pinnacle of luxury. 5-star properties, private speedboats, fine dining, and VIP fast-track airport handling.",
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
    destinations: ["Hanoi", "Ha Long Bay", "Hoi An"],
    hotels: [
      "Hanoi: 5-Star Capella Hanoi (or similar) - 2 Nights",
      "Ha Long Bay: 5-Star Emperor Cruises (or similar) - 1 Night",
      "Hoi An: 5-Star Four Seasons Resort The Nam Hai (or similar) - 4 Nights"
    ],
    inclusions: [
      "02 Nights luxury accommodation at Capella Hanoi",
      "01 Night ultra-luxury private suite cabin on Emperor Cruises Ha Long",
      "04 Nights luxury villa accommodation at Four Seasons The Nam Hai",
      "Daily gourmet breakfast at properties",
      "All fine dining meals on the cruise",
      "All airport and destination transfers in private luxury/VIP class vehicles",
      "Private guided excursions with local experts",
      "Complimentary E-visa premium handling and Local high-speed SIM card"
    ],
    exclusions: [
      "International and domestic flight tickets",
      "E-visa stamping entry fees",
      "Meals not specified in inclusions",
      "Personal gratuities/tips"
    ],
    days: [
      {
        day: 1,
        title: "VIP Hanoi Arrival & Fine Dining",
        description: "Experience VIP fast-track airport customs and private luxury transfer to your 5-star hotel.",
        activities: [
          "VIP airport fast-track customs clearance on arrival at Noi Bai Airport",
          "Private luxury vehicle transfer to Capella Hanoi",
          "Welcome champagne reception and orientation",
          "Relaxed evening stroll around Hoan Kiem Lake"
        ],
        food: [
          "Fine dining multi-course dinner at Hibana by Koki (Michelin-starred)",
          "Specialty tea or cocktails at hotel lounge"
        ]
      },
      {
        day: 2,
        title: "Private Hanoi Art & Heritage Walk",
        description: "Discover Hanoi's historic galleries, French architecture, and temples with a private art historian guide.",
        activities: [
          "Private guided art and architecture walk through the French Quarter",
          "Exclusive behind-the-scenes visit to Temple of Literature and Fine Arts Museum",
          "Hanoi street train viewing from private balcony club seats"
        ],
        food: [
          "Gourmet Indian lunch at Dalcheeni",
          "Exclusive Vietnamese cuisine dinner at Cau Go Resto"
        ]
      },
      {
        day: 3,
        title: "Ultra-Luxury Ha Long Cruise Boarding",
        description: "Travel in a private VIP limousine to Ha Long Bay and board an ultra-luxury heritage cruise.",
        activities: [
          "Private luxury limousine transfer from Hanoi to Halong harbor",
          "Board Emperor Cruises luxury vessel, checking in to your private balcony royal suite",
          "Sail past remote islands and enjoy a private speed boat excursion to hidden lagoons"
        ],
        food: [
          "Gourmet lunch served on board with fine wines",
          "Royal dinner feast in the cruise dining room"
        ]
      },
      {
        day: 4,
        title: "Tai Chi, Speedboat & Flight to Da Nang",
        description: "Start the day with Tai Chi on deck, speedboat through cave tunnels, and fly to Da Nang.",
        activities: [
          "Tai Chi session on deck and speedboat excursion to local fishing lagoons",
          "Private luxury transfer to Hanoi Airport for flight to Da Nang",
          "Private luxury pickup at Da Nang Airport to Four Seasons The Nam Hai villa"
        ],
        food: [
          "A la carte brunch on the cruise",
          "Dinner at Four Seasons beach club grill"
        ]
      },
      {
        day: 5,
        title: "Private Ba Na Hills VIP Excursion",
        description: "Excursion to Ba Na Hills with priority queue access for cable cars and Golden Bridge.",
        activities: [
          "Private guided VIP excursion to Ba Na Hills",
          "Priority boarding for cable cars and private guide on the Golden Bridge",
          "Afternoon relaxation back at your luxury villa"
        ],
        food: [
          "Gourmet lunch buffet at private Ba Na Hills lounge",
          "Fine dining Vietnamese/French dinner at Four Seasons"
        ]
      },
      {
        day: 6,
        title: "Hoi An Ancient Town Art Walk & Private Boat",
        description: "Discover the art scene of Hoi An and ride a private hand-crafted boat on the river.",
        activities: [
          "Private art and history walking tour of Hoi An Ancient Town heritage sites",
          "Private cruise on a hand-crafted wooden boat on the Thu Bon River with refreshments",
          "Release custom biodegradable lanterns on the water"
        ],
        food: [
          "Lunch at Mango Mango Hoi An",
          "Private candlelit dinner at a heritage house garden"
        ]
      },
      {
        day: 7,
        title: "Luxury Spa Day & Cooking Masterclass",
        description: "Unwind with a signature spa treatment and participate in a private Vietnamese cooking class.",
        activities: [
          "Private cooking masterclass at Four Seasons organic farm with executive chef",
          "90-minute signature couple's spa therapy at the Heart of the Earth Spa",
          "Relaxed beach evening in your private cabana"
        ],
        food: [
          "Lunch cooked during your masterclass session",
          "Exclusive farewell beachside seafood barbecue dinner"
        ]
      },
      {
        day: 8,
        title: "Departure from Da Nang",
        description: "Private VIP transfer to Da Nang Airport for your departure flight home.",
        activities: [
          "Morning relaxation and packing at your villa",
          "Private luxury vehicle transfer to Da Nang Airport for return flight"
        ],
        food: [
          "Gourmet breakfast at resort before checkout"
        ]
      }
    ]
  }
];

export const BY_THEME_CATEGORIES: CategoryData[] = [
  {
    name: "First Time in Vietnam",
    tagline: "Never been to Vietnam? Start here.",
    subsections: ["Vietnam Essentials", "Best of Vietnam", "Complete Vietnam", "Vietnam in 7 Days", "Vietnam in 10 Days"],
    packages: [
      ITINERARIES_DATABASE[0], // Budget Explorer
      ITINERARIES_DATABASE[3], // Classic
      ITINERARIES_DATABASE[4]  // Complete
    ]
  },
  {
    name: "Beach Escapes",
    tagline: "Sun, sand and island adventures.",
    subsections: ["Phu Quoc Escapes", "Da Nang Beaches", "Nha Trang Getaways", "Island Hopping", "Luxury Beach Resorts"],
    packages: [
      ITINERARIES_DATABASE[2], // Da Nang & Hoi An
      ITINERARIES_DATABASE[7]  // Phu Quoc Paradise
    ]
  },
  {
    name: "Honeymoons & Romance",
    tagline: "Designed for unforgettable moments.",
    subsections: ["Romantic Escapes", "Luxury Honeymoons", "Beach Honeymoons", "Private Villas", "Anniversary Trips"],
    packages: [
      ITINERARIES_DATABASE[5]  // Honeymoon
    ]
  },
  {
    name: "Family Holidays",
    tagline: "Experiences for every generation.",
    subsections: ["Family Favorites", "Kid-Friendly Adventures", "Multi-Generation Tours", "Theme Park Holidays", "Relaxed Family Escapes"],
    packages: [
      ITINERARIES_DATABASE[6]  // Family Fun
    ]
  },
  {
    name: "Culinary Experiences",
    tagline: "Taste the real Vietnam.",
    subsections: ["Street Food Journeys", "Cooking Classes", "Coffee Experiences", "Regional Food Trails", "Market & Culture Tours"],
    packages: [
      ITINERARIES_DATABASE[0], // Budget Explorer
      ITINERARIES_DATABASE[3]  // Classic
    ]
  },
  {
    name: "City Discovery",
    tagline: "Vietnam's most vibrant cities.",
    subsections: ["Hanoi Discovery", "Saigon Explorer", "Da Nang City Breaks", "Weekend Escapes", "Nightlife Experiences"],
    packages: [
      ITINERARIES_DATABASE[1], // Hanoi & Halong Escape
      ITINERARIES_DATABASE[4]  // Complete
    ]
  },
  {
    name: "Nature & Adventure",
    tagline: "Vietnam beyond the cities.",
    subsections: ["Sapa Adventures", "Ha Giang Expeditions", "Cave Exploration", "Trekking Journeys", "Outdoor Escapes"],
    packages: [
      ITINERARIES_DATABASE[0], // Budget Explorer (Northern focus)
      ITINERARIES_DATABASE[6]  // Family (Ninh Binh caves)
    ]
  },
  {
    name: "Luxury Vietnam",
    tagline: "Vietnam at its finest.",
    subsections: ["Signature Luxury", "Luxury Cruises", "Private Journeys", "Wellness Retreats", "VIP Experiences"],
    packages: [
      ITINERARIES_DATABASE[8]  // Luxury Vietnam
    ]
  }
];

export const BY_REGION_CATEGORIES: CategoryData[] = [
  {
    name: "Northern Vietnam",
    tagline: "Mountains, culture, heritage and iconic landscapes.",
    subsections: ["Hanoi & Culture", "Ha Long Bay Cruises", "Ninh Binh Nature", "Sapa Trekking", "Ha Giang Loops"],
    packages: [
      ITINERARIES_DATABASE[0], // Budget Explorer
      ITINERARIES_DATABASE[1]  // Hanoi & Halong Escape
    ]
  },
  {
    name: "Central Vietnam",
    tagline: "Beaches, romance and timeless heritage.",
    subsections: ["Da Nang City & Beach", "Hoi An Ancient Town", "Hue Imperial Heritage", "Ba Na Hills Day Trips"],
    packages: [
      ITINERARIES_DATABASE[2]  // Da Nang & Hoi An Discovery
    ]
  },
  {
    name: "Southern Vietnam",
    tagline: "Island life, energy and tropical escapes.",
    subsections: ["Saigon City Discovery", "Mekong Delta Rivers", "Phu Quoc Resorts", "Southern Journeys"],
    packages: [
      ITINERARIES_DATABASE[7]  // Phu Quoc Paradise
    ]
  },
  {
    name: "Complete Vietnam",
    tagline: "See the best of Vietnam in one journey.",
    subsections: ["7 Day Vietnam", "10 Day Vietnam", "12 Day Vietnam", "North to South Grand Tours"],
    packages: [
      ITINERARIES_DATABASE[3], // Classic
      ITINERARIES_DATABASE[4], // Complete
      ITINERARIES_DATABASE[8]  // Luxury
    ]
  }
];

// Tag Jain & Vegetarian friendly packages dynamically
const JAIN_VEG_FRIENDLY_IDS = ['budget-explorer', 'vietnam-classic', 'vietnam-family', 'luxury-vietnam'];
ITINERARIES_DATABASE.forEach(pkg => {
  if (JAIN_VEG_FRIENDLY_IDS.includes(pkg.id)) {
    pkg.isJainVegFriendly = true;
  }
});
// Re-assign references in categories just to be safe
BY_THEME_CATEGORIES.forEach(cat => {
  cat.packages = cat.packages.map(p => ITINERARIES_DATABASE.find(db => db.id === p.id) || p);
});
BY_REGION_CATEGORIES.forEach(cat => {
  cat.packages = cat.packages.map(p => ITINERARIES_DATABASE.find(db => db.id === p.id) || p);
});


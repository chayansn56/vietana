import { Itinerary } from '../hooks/useAIPlanner';

export interface PackageProduct {
  id: string;
  category: string;
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
  // First Time in Vietnam
  {
    id: "unforgettable-vietnam",
    category: "First Time in Vietnam",
    title: "Unforgettable Vietnam (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Classic Route",
    desc: "A beautiful introductory tour connecting the French colonial sights of Hanoi with the coastal beauty of Da Nang.",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    destinations: ["Hanoi", "Da Nang"],
    hotels: [
      "Hanoi: 4-Star Boutique Hotel - 3 Nights",
      "Da Nang: 4-Star Beachfront Resort - 1 Night"
    ],
    inclusions: [
      "Airport transfers in private A/C vehicles",
      "Domestic flight ticket from Hanoi to Da Nang",
      "Daily breakfast at the hotels",
      "Guided Hanoi street food walking tour",
      "Ninh Binh Day trip (Trang An & Mua Cave)",
      "Ba Na Hills & Golden Bridge VIP tour"
    ],
    exclusions: [
      "International airfare and flight booking fees",
      "Vietnam visa stamping fees",
      "Personal expenses and meals not listed"
    ],
    days: [
      { day: 1, title: "Hanoi Arrival & Street Food", description: "Arrive in Hanoi, check in to your hotel, and spend the evening enjoying authentic local street food." },
      { day: 2, title: "Hanoi City & Train Street Heritage", description: "Tour the Ho Chi Minh Mausoleum, Temple of Literature, and see the famous Train Street." },
      { day: 3, title: "Ninh Binh Day Trip", description: "Take a sampan boat ride in Trang An and hike up the Mua Cave peak." },
      { day: 4, title: "Flight to Da Nang & Hoi An Ancient Town", description: "Fly to Da Nang, check in, and spend the evening amidst Hoi An's colorful lanterns." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", description: "Excursion to Ba Na Hills and departure from Da Nang Airport." }
    ]
  },
  {
    id: "explore-hcmc-beach",
    category: "First Time in Vietnam",
    title: "Explore Ho Chi Minh with Beach (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "City & Coast",
    desc: "Explore the bustling metropolis of Saigon combined with a relaxing beach holiday at the seaside destination of Vung Tau.",
    img: "https://images.unsplash.com/photo-1509060464153-44667396260f?w=800&q=80",
    destinations: ["Ho Chi Minh City", "Vung Tau"],
    hotels: [
      "Ho Chi Minh City: 4-Star Boutique Hotel - 3 Nights",
      "Vung Tau: 4-Star Seaside Resort - 1 Night"
    ],
    inclusions: [
      "Airport and city transfers in private vehicles",
      "Daily breakfast at hotels",
      "Saigon City guided heritage tour",
      "Cu Chi Tunnels historical excursion",
      "Mekong Delta day tour with boat cruise",
      "Vung Tau city tour"
    ],
    exclusions: [
      "International flights",
      "E-visa stamping/entry fees",
      "Personal tips and spending"
    ],
    days: [
      { day: 1, title: "Saigon Arrival & Bitexco View", description: "Arrive in HCMC, check-in, and view the metropolitan skyline from the Skydeck." },
      { day: 2, title: "Cu Chi Tunnels & French Heritage", description: "Explore the tunnels and visit the Notre Dame Cathedral." },
      { day: 3, title: "Mekong Delta Waterway Excursion", description: "Boat cruise through coconut groves, honey farms, and canal villages." },
      { day: 4, title: "Transfer to Vung Tau Beach", description: "Drive to Vung Tau beach, check in to resort, and relax by the sea." },
      { day: 5, title: "Christ Statue & Saigon Airport Transfer", description: "Climb the Christ Statue and return to Saigon Airport for departure." }
    ]
  },
  {
    id: "vietnam-highlights",
    category: "First Time in Vietnam",
    title: "Vietnam Highlights (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Top Sights",
    desc: "A fast-paced journey covering the ultimate highlights of Northern, Central, and Southern Vietnam.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    destinations: ["Hanoi", "Da Nang", "Ho Chi Minh City"],
    hotels: [
      "Hanoi: 4-Star Hotel - 2 Nights",
      "Da Nang: 4-Star Resort - 2 Nights",
      "Ho Chi Minh City: 4-Star Hotel - 1 Night"
    ],
    inclusions: [
      "All airport and destination transfers in private A/C vehicles",
      "Domestic flights: Hanoi to Da Nang, Da Nang to Saigon",
      "Daily breakfast",
      "Halong Bay luxury day cruise",
      "Hoi An Ancient Town tour",
      "Ba Na Hills & Golden Bridge tour",
      "Mekong Delta day tour"
    ],
    exclusions: [
      "International flight bookings",
      "Visa entry costs",
      "Personal items"
    ],
    days: [
      { day: 1, title: "Hanoi Arrival & cyclo ride", description: "Arrive in Hanoi, check in, and enjoy a cyclo ride through the Old Quarter." },
      { day: 2, title: "Halong Bay Luxury Day Cruise", description: "Drive to Halong Bay, board a luxury day cruise, and kayak through limestone karsts." },
      { day: 3, title: "Fly to Da Nang & Hoi An", description: "Fly to Da Nang, visit Marble Mountains, and explore Hoi An." },
      { day: 4, title: "Ba Na Hills & Golden Bridge", description: "Spend a full day visiting the French Village and Golden Bridge." },
      { day: 5, title: "Fly to Saigon & City Tour", description: "Fly to HCMC, tour War Remnants Museum and Independence Palace." },
      { day: 6, title: "Mekong Delta & Departure", description: "Explore Mekong Delta and head to Saigon Airport for departure." }
    ]
  },

  // Beach Escapes
  {
    id: "vinwonders-kiss-sea",
    category: "Beach Escapes",
    title: "Vin Wonders and Kiss of the Sea (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Theme Parks & Sun",
    desc: "An action-packed luxury holiday combining Phu Quoc theme parks and show elements with Central Vietnam beach vibes.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    destinations: ["Phu Quoc", "Da Nang", "Ho Chi Minh City"],
    hotels: [
      "Phu Quoc: 4-Star Resort - 3 Nights",
      "Da Nang: 4-Star Resort - 3 Nights",
      "Ho Chi Minh City: 4-Star Hotel - 1 Night"
    ],
    inclusions: [
      "All private airport and land transfers",
      "Domestic flights: Phu Quoc to Da Nang, Da Nang to Saigon",
      "VinWonders Phu Quoc & Vinpearl Safari entrance tickets",
      "Kiss of the Sea show admission ticket",
      "Hoi An Ancient town and Ba Na Hills tours"
    ],
    exclusions: [
      "International flights",
      "E-visa stamping/entry fees",
      "Meals other than breakfast"
    ],
    days: [
      { day: 1, title: "Phu Quoc Arrival & Sunset Town", description: "Arrive in Phu Quoc, check-in, and explore European-style Sunset Town." },
      { day: 2, title: "Vinpearl Safari & VinWonders Fun", description: "Full-day fun at Vinpearl Safari and VinWonders amusement park." },
      { day: 3, title: "Phu Quoc Island Tour & Kiss of the Sea", description: "Explore Starfish Beach, visit local pearl farm, and watch the spectacular show." },
      { day: 4, title: "Fly to Da Nang & Hoi An Town", description: "Fly to Da Nang, check-in, and stroll Hoi An lanterns." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", description: "Full day at Ba Na Hills cable car and French gardens." },
      { day: 6, title: "Marble Mountains & Beach Day", description: "Visit Marble Mountains and relax on My Khe beach." },
      { day: 7, title: "Fly to Saigon & Departure", description: "Fly to Saigon and catch your international connecting flight home." }
    ]
  },
  {
    id: "phuquoc-island-tour",
    category: "Beach Escapes",
    title: "Phu Quoc with 3 / 4 Island Tour (4n Phu Quoc)",
    duration: "5 Days / 4 Nights",
    badge: "Island Hopping",
    desc: "Deep dive into the tropical southern islands of Phu Quoc, featuring white beaches, coral reefs, and the Hon Thom cable car.",
    img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    destinations: ["Phu Quoc"],
    hotels: [
      "Phu Quoc: 4-Star Beachfront Resort - 4 Nights"
    ],
    inclusions: [
      "Private airport transfers",
      "Daily breakfast at the resort",
      "Speedboat 4-Island Tour (May Rut, Gam Ghi, Mong Tay, Buom)",
      "Snorkeling gear and seafood lunch during island tour",
      "Hon Thom Cable Car tickets"
    ],
    exclusions: [
      "Airfare",
      "Visa fees",
      "Dinner meals"
    ],
    days: [
      { day: 1, title: "Phu Quoc Arrival & Grand World", description: "Arrive in Phu Quoc, private check-in, and evening tour of Grand World 'Venice' city." },
      { day: 2, title: "Speedboat 4-Island Tour & Snorkeling", description: "Embark on a speedboat tour to pristine islands, snorkeling, and a beach BBQ lunch." },
      { day: 3, title: "Hon Thom Cable Car & Aquatopia", description: "Ride the world's longest over-sea cable car to Hon Thom Pineapple Island and play at the waterpark." },
      { day: 4, title: "Starfish Beach & Pepper Farm", description: "Relax at Starfish Beach, visit local pepper and honey farms." },
      { day: 5, title: "Resort Leisure & Departure", description: "Enjoy pool amenities before checkout and private airport transfer." }
    ]
  },
  {
    id: "danang-gateway",
    category: "Beach Escapes",
    title: "Da Nang Gateway (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Beach & Heritage",
    desc: "A tailored coastal escape in Da Nang, featuring Cham Island boat excursions and Ba Na Hills amusement park.",
    img: "https://images.unsplash.com/photo-1559592481-74153c497958?w=800&q=80",
    destinations: ["Da Nang"],
    hotels: [
      "Da Nang: 4-Star Beachfront Hotel - 4 Nights"
    ],
    inclusions: [
      "Private round-trip airport transfers",
      "Cham Island Speedboat tour with snorkeling & lunch",
      "Ba Na Hills & Golden Bridge tickets with private transfers",
      "Hoi An Ancient Town guided walk"
    ],
    exclusions: [
      "Flights",
      "Personal tips",
      "E-visa fees"
    ],
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
    id: "mesmerizing-dalat",
    category: "Honeymoons & Romance",
    title: "Mesmerizing Dalat (4D3N)",
    duration: "4 Days / 3 Nights",
    badge: "Romantic Highlands",
    desc: "Escape to the French-style highlands of Da Lat, the ultimate romantic getaway with waterfalls and flower valleys.",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80",
    destinations: ["Ho Chi Minh City", "Da Lat"],
    hotels: [
      "Ho Chi Minh City: 4-Star Hotel - 1 Night",
      "Da Lat: 4-Star Romantic Resort - 2 Nights"
    ],
    inclusions: [
      "All airport and land transfers in private vehicles",
      "Domestic flight from Saigon to Da Lat",
      "Dalat city valley tour",
      "Clay tunnel and flower garden tickets"
    ],
    exclusions: [
      "International airfare",
      "Meals not listed in inclusions"
    ],
    days: [
      { day: 1, title: "Saigon Arrival & Dinner Cruise", description: "Arrive in HCMC, check-in, and enjoy a romantic dinner cruise on Saigon River." },
      { day: 2, title: "Fly to Da Lat - City of Love", description: "Fly to Da Lat. Check-in to a romantic resort, and stroll around Xuan Huong Lake." },
      { day: 3, title: "Valley of Love & Clay Tunnel", description: "Explore the Valley of Love, Datanla waterfalls alpine coaster, and the Clay Tunnel." },
      { day: 4, title: "Flower Gardens & Return", description: "Visit Dalat flower garden, Linh Phuoc pagoda, and return to airport." }
    ]
  },
  {
    id: "honeymoon-getaway",
    category: "Honeymoons & Romance",
    title: "Honeymoon Getaway (8D7N)",
    duration: "8 Days / 7 Nights",
    badge: "Grand Romance",
    desc: "A comprehensive grand tour for honeymooners covering Vietnam's top romantic spots from Hanoi to Phu Quoc.",
    img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    destinations: ["Hanoi", "Da Nang", "Phu Quoc", "Ho Chi Minh City"],
    hotels: [
      "Hanoi: Luxury Boutique - 2 Nights",
      "Da Nang: Beachfront Resort - 2 Nights",
      "Phu Quoc: Romantic Pool Villa - 2 Nights",
      "Ho Chi Minh City: 4-Star Hotel - 1 Night"
    ],
    inclusions: [
      "Private transfers and domestic flights",
      "Daily couple's breakfast",
      "Halong Bay luxury day cruise",
      "Ba Na Hills & Hoi An lantern boat ride",
      "Phu Quoc sunset cruise with candlelit dinner"
    ],
    exclusions: [
      "International flights",
      "Personal tips",
      "Visa entry costs"
    ],
    days: [
      { day: 1, title: "Hanoi Arrival & Spa Session", description: "Arrive in Hanoi, check-in, and enjoy a signature couple's spa therapy." },
      { day: 2, title: "Halong Bay Luxury Cruise", description: "Day cruise with gourmet meals and kayaking." },
      { day: 3, title: "Fly to Da Nang & Hoi An Boat Ride", description: "Fly to Da Nang, check-in, and ride a lantern boat in Hoi An." },
      { day: 4, title: "Ba Na Hills & Golden Bridge", description: "Spend a beautiful day together on the Golden Bridge." },
      { day: 5, title: "Fly to Phu Quoc Island", description: "Fly to Phu Quoc island, check-in to your private pool villa." },
      { day: 6, title: "Sunset Cruise & Candlelit Dinner", description: "Catamaran sunset cruise and candlelight seafood dinner on the beach." },
      { day: 7, title: "Fly to Saigon & Rooftop Bar", description: "Fly to Saigon, check-in, and enjoy rooftop cocktails." },
      { day: 8, title: "Departure from HCMC", description: "Checkout and transfer to Saigon Airport." }
    ]
  },
  {
    id: "valley-of-love",
    category: "Honeymoons & Romance",
    title: "Valley of Love (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Valley & Coast",
    desc: "A beautiful combination of Da Lat's romantic hills and Vung Tau's golden sunset beaches.",
    img: "https://images.unsplash.com/photo-1519225495810-7517c2965a7a?w=800&q=80",
    destinations: ["Ho Chi Minh City", "Da Lat", "Vung Tau"],
    hotels: [
      "Ho Chi Minh City: 4-Star - 2 Nights",
      "Da Lat: 4-Star Resort - 2 Nights",
      "Vung Tau: 4-Star Beach resort - 2 Nights"
    ],
    inclusions: [
      "All land transfers in private A/C vehicles",
      "Daily breakfast at hotels",
      "Dalat waterfall coaster and Valley of Love tickets",
      "Vung Tau beach tour"
    ],
    exclusions: [
      "Flights",
      "Personal items"
    ],
    days: [
      { day: 1, title: "Saigon Arrival & Walking Street", description: "Arrive in HCMC, check-in, and explore Nguyen Hue walking street." },
      { day: 2, title: "Cu Chi Tunnels historical tour", description: "Tour the historic tunnels and visit Ben Thanh Market." },
      { day: 3, title: "Drive to Da Lat Highlands", description: "Private drive to Da Lat, check-in, and visit Dalat Night Market." },
      { day: 4, title: "Valley of Love & Waterfall", description: "Explore the Valley of Love and Datanla waterfalls." },
      { day: 5, title: "Drive to Vung Tau Beach", description: "Drive to Vung Tau beach and catch the sunset on Back Beach." },
      { day: 6, title: "Vung Tau City Sightseeing", description: "Visit the Lighthouse, Giant Christ Statue, and enjoy local seafood." },
      { day: 7, title: "Return to Saigon Airport", description: "Transfer directly to HCMC Airport for departure." }
    ]
  },

  // Family Holidays
  {
    id: "explore-vietnam",
    category: "Family Holidays",
    title: "Explore Vietnam (10D9N)",
    duration: "10 Days / 9 Nights",
    badge: "Grand Family Tour",
    desc: "The ultimate family tour connecting Saigon, Phu Quoc theme parks, historic Hanoi, and Da Nang.",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    destinations: ["Ho Chi Minh City", "Phu Quoc", "Hanoi", "Da Nang"],
    hotels: [
      "Ho Chi Minh City: 4-Star - 2 Nights",
      "Phu Quoc: Family Resort - 3 Nights",
      "Hanoi: 4-Star Hotel - 3 Nights",
      "Da Nang: Beach Resort - 1 Night"
    ],
    inclusions: [
      "All airport and city transfers in family private A/C coaches",
      "Domestic flights: SGN-PQC, PQC-HAN, HAN-DAD",
      "VinWonders Phu Quoc & Safari entrance tickets",
      "Halong Bay day cruise from Hanoi",
      "Ba Na Hills & Hoi An ancient town tours"
    ],
    exclusions: [
      "International airfare",
      "Visa fees",
      "Meals not listed"
    ],
    days: [
      { day: 1, title: "Saigon Welcoming & Indian Dinner", description: "Arrive in Saigon, private transfer to hotel, and enjoy a family dinner." },
      { day: 2, title: "Saigon City & Ben Thanh Shopping", description: "Explore Independence Palace, Notre Dame, and Ben Thanh Market." },
      { day: 3, title: "Fly to Phu Quoc & Safari", description: "Fly to Phu Quoc and visit Vinpearl Open Safari park." },
      { day: 4, title: "VinWonders Theme Park", description: "Full-day fun at VinWonders theme park and water park." },
      { day: 5, title: "Phu Quoc Snorkeling Tour", description: "Boat trip to islands for snorkeling, fishing, and sunset." },
      { day: 6, title: "Fly to Hanoi & Water Puppet Show", description: "Fly to Hanoi, check-in, and attend a Water Puppet Show." },
      { day: 7, title: "Halong Bay Cruise excursion", description: "Day cruise to see limestone peaks, caves, and kayak." },
      { day: 8, title: "Hanoi Train Street & Fly to Da Nang", description: "Visit Train Street, fly to Da Nang, and walk through Hoi An lanterns." },
      { day: 9, title: "Ba Na Hills & Golden Bridge", description: "Full day at Ba Na Hills cable car and bridge." },
      { day: 10, title: "Da Nang Airport Departure", description: "Checkout and transfer to Da Nang Airport for departure." }
    ]
  },
  {
    id: "best-of-vietnam",
    category: "Family Holidays",
    title: "Best of Vietnam (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Highlights Family",
    desc: "A beautiful highlights package for families, featuring a Halong Bay overnight cruise, Ba Na Hills, and Saigon.",
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    destinations: ["Hanoi", "Da Nang", "Ho Chi Minh City"],
    hotels: [
      "Hanoi: 4-Star - 3 Nights",
      "Da Nang: 4-Star - 2 Nights",
      "Ho Chi Minh City: 4-Star - 1 Night"
    ],
    inclusions: [
      "Private transfers and domestic flights",
      "Halong Bay overnight luxury cruise",
      "Ba Na Hills and Hoi An ancient town tours",
      "Cu Chi Tunnels Saigon excursion"
    ],
    exclusions: [
      "Flights",
      "Visas",
      "Tips"
    ],
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
    id: "incredible-hanoi-danang",
    category: "Family Holidays",
    title: "Incredible Hanoi and Da Nang (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Short Family Break",
    desc: "Ideal for a short family break connecting the culture of Hanoi and the beaches of Central Vietnam.",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    destinations: ["Hanoi", "Da Nang"],
    hotels: [
      "Hanoi: 4-Star - 2 Nights",
      "Da Nang: 4-Star - 2 Nights"
    ],
    inclusions: [
      "Private airport and hotel transfers",
      "Domestic flight from Hanoi to Da Nang",
      "Halong Bay luxury day cruise",
      "Ba Na Hills cable car and Golden Bridge tickets",
      "Hoi An Ancient town tour"
    ],
    exclusions: [
      "Airfare",
      "E-visa",
      "Tips"
    ],
    days: [
      { day: 1, title: "Hanoi Arrival & Cycle Tour", description: "Arrive in Hanoi, check-in, and enjoy a cycle ride through 36 guild streets." },
      { day: 2, title: "Halong Bay Day Cruise", description: "Excursion to Halong Bay, board cruise, explore caves." },
      { day: 3, title: "Fly to Da Nang & Hoi An Town", description: "Fly to Da Nang and walk through illuminated Hoi An." },
      { day: 4, title: "Ba Na Hills & Golden Bridge", description: "Cable car up Ba Na Hills and snap photos on Golden Bridge." },
      { day: 5, title: "Marble Mountains & Departure", description: "Explore Marble Mountains cave temples and transfer to airport." }
    ]
  }
];

export const BY_THEME_CATEGORIES: CategoryData[] = [
  {
    name: "First Time in Vietnam",
    tagline: "Never been to Vietnam? Start here.",
    subsections: ["Vietnam Essentials", "Best of Vietnam", "Complete Vietnam"],
    packages: [
      ITINERARIES_DATABASE[0], // Unforgettable Vietnam
      ITINERARIES_DATABASE[1], // Explore Ho Chi Minh with Beach
      ITINERARIES_DATABASE[2]  // Vietnam Highlights
    ]
  },
  {
    name: "Beach Escapes",
    tagline: "Sun, sand and island adventures.",
    subsections: ["Phu Quoc Escapes", "Da Nang Beaches", "Island Hopping"],
    packages: [
      ITINERARIES_DATABASE[3], // Vin Wonders and Kiss of the sea
      ITINERARIES_DATABASE[4], // Phu Quoc with 3 / 4 Island Tour
      ITINERARIES_DATABASE[5], // Da Nang Gateway
      ITINERARIES_DATABASE[1]  // Explore Ho Chi Minh with Beach
    ]
  },
  {
    name: "Honeymoons & Romance",
    tagline: "Designed for unforgettable moments.",
    subsections: ["Romantic Escapes", "Luxury Honeymoons"],
    packages: [
      ITINERARIES_DATABASE[6], // Mesmerizing Dalat
      ITINERARIES_DATABASE[7], // Honeymoon Getaway
      ITINERARIES_DATABASE[8], // Valley of Love
      ITINERARIES_DATABASE[3]  // Vin Wonders and Kiss of the sea
    ]
  },
  {
    name: "Family Holidays",
    tagline: "Experiences for every generation.",
    subsections: ["Family Favorites", "Kid-Friendly Adventures"],
    packages: [
      ITINERARIES_DATABASE[9],  // Explore Vietnam
      ITINERARIES_DATABASE[10], // Best of Vietnam
      ITINERARIES_DATABASE[11]  // Incredible Hanoi and Da Nang
    ]
  }
];

export const BY_REGION_CATEGORIES: CategoryData[] = [
  {
    name: "Northern Vietnam",
    tagline: "Mountains, culture, heritage and iconic landscapes.",
    subsections: ["Hanoi & Culture", "Ha Long Bay Cruises"],
    packages: [
      ITINERARIES_DATABASE[0], // Unforgettable Vietnam
      ITINERARIES_DATABASE[11] // Incredible Hanoi and Da Nang
    ]
  },
  {
    name: "Central Vietnam",
    tagline: "Beaches, romance and timeless heritage.",
    subsections: ["Da Nang City & Beach", "Hoi An Ancient Town"],
    packages: [
      ITINERARIES_DATABASE[0], // Unforgettable Vietnam
      ITINERARIES_DATABASE[2], // Vietnam Highlights
      ITINERARIES_DATABASE[5]  // Da Nang Gateway
    ]
  },
  {
    name: "Southern Vietnam",
    tagline: "Island life, energy and tropical escapes.",
    subsections: ["Saigon City Discovery", "Phu Quoc Resorts"],
    packages: [
      ITINERARIES_DATABASE[1], // Explore Ho Chi Minh with Beach
      ITINERARIES_DATABASE[4], // Phu Quoc with 3 / 4 Island Tour
      ITINERARIES_DATABASE[8]  // Valley of Love
    ]
  },
  {
    name: "Complete Vietnam",
    tagline: "See the best of Vietnam in one journey.",
    subsections: ["7 Day Vietnam", "10 Day Vietnam"],
    packages: [
      ITINERARIES_DATABASE[2], // Vietnam Highlights
      ITINERARIES_DATABASE[3], // Vin Wonders and Kiss of the sea
      ITINERARIES_DATABASE[7], // Honeymoon Getaway
      ITINERARIES_DATABASE[9], // Explore Vietnam
      ITINERARIES_DATABASE[10] // Best of Vietnam
    ]
  }
];

// Tag Jain & Vegetarian friendly packages dynamically
const JAIN_VEG_FRIENDLY_IDS = ['unforgettable-vietnam', 'vietnam-highlights', 'phuquoc-island-tour', 'best-of-vietnam'];
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

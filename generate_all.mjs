import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// List of all 80 packages from proposed_80_itineraries.md
const rawPackages = [
  // Group 1: First Time in Vietnam
  {
    id: "vietnam-highlights-express",
    category: "First Time in Vietnam",
    title: "Vietnam Highlights Express (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Top Seller",
    destinations: ["Hanoi", "Halong Bay", "Saigon"],
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    hotels: ["Hanoi: 4-star boutique (2 Nights)", "Halong Bay: Luxury Cruise (1 Night)", "Saigon: 4-star luxury (2 Nights)"]
  },
  {
    id: "classic-trio-discovery",
    category: "First Time in Vietnam",
    title: "Classic Trio Discovery (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Popular",
    destinations: ["Hanoi", "Da Nang", "Hoi An", "Saigon"],
    img: "https://images.unsplash.com/photo-1509060464153-44667396260f?w=800&q=80",
    hotels: ["Hanoi: 4-star boutique (2 Nights)", "Da Nang: Beachfront Resort (2 Nights)", "Saigon: 4-star boutique (2 Nights)"]
  },
  {
    id: "hanoi-da-nang-gateway",
    category: "First Time in Vietnam",
    title: "Hanoi & Da Nang Gateway (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Short Getaway",
    destinations: ["Hanoi", "Da Nang", "Ba Na Hills"],
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    hotels: ["Hanoi: 4-star boutique (2 Nights)", "Da Nang: Beachfront Resort (2 Nights)"]
  },
  {
    id: "saigon-beach-combo",
    category: "First Time in Vietnam",
    title: "Saigon & Beach Combo (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Best Value",
    destinations: ["Saigon", "Vung Tau Beach"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Saigon: 4-star luxury (2 Nights)", "Vung Tau: Seaside Resort (2 Nights)"]
  },
  {
    id: "northern-jewels",
    category: "First Time in Vietnam",
    title: "Northern Jewels (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Scenic Route",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Hanoi: 4-star boutique (3 Nights)", "Halong Bay: Luxury Cruise (1 Night)", "Ninh Binh: Bungalow (1 Night)"]
  },
  {
    id: "vietnam-grand-heritage",
    category: "First Time in Vietnam",
    title: "Vietnam Grand Heritage (10D9N)",
    duration: "10 Days / 9 Nights",
    badge: "In-Depth",
    destinations: ["Hanoi", "Halong Bay", "Sapa", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    hotels: ["Hanoi: 4-star boutique (2 Nights)", "Halong Bay: Cruise (1 Night)", "Sapa: Mountain View (2 Nights)", "Da Nang: Beach Resort (2 Nights)", "Saigon: 4-star hotel (2 Nights)"]
  },
  {
    id: "budget-friendly-essentials",
    category: "First Time in Vietnam",
    title: "Budget-Friendly Essentials (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Budget Choice",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Hanoi: 3-star boutique (3 Nights)", "Ninh Binh: Homestay (1 Night)"]
  },
  {
    id: "saigon-mekong-delta-explorer",
    category: "First Time in Vietnam",
    title: "Saigon & Mekong Delta Explorer (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Culture Focus",
    destinations: ["Saigon", "Mekong River"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Saigon: 4-star boutique (3 Nights)", "Mekong Delta: Riverside Lodge (1 Night)"]
  },
  {
    id: "central-vietnam-essentials",
    category: "First Time in Vietnam",
    title: "Central Vietnam Essentials (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Short Break",
    destinations: ["Da Nang", "Hoi An Town"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Da Nang: Beachfront Resort (3 Nights)", "Hoi An: Riverside Villa (1 Night)"]
  },
  {
    id: "the-absolute-vietnam",
    category: "First Time in Vietnam",
    title: "The Absolute Vietnam (9D8N)",
    duration: "9 Days / 8 Nights",
    badge: "Classic Grand",
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Hanoi: 4-star (2 Nights)", "Halong Bay: Cruise (1 Night)", "Da Nang: Resort (3 Nights)", "Saigon: 4-star (2 Nights)"]
  },

  // Group 2: Beach Escapes
  {
    id: "phu-quoc-island-sanctuary",
    category: "Beach Escapes",
    title: "Phu Quoc Island Sanctuary (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Island Life",
    destinations: ["Phu Quoc Island"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Phu Quoc: 4-star beachfront resort (4 Nights)"]
  },
  {
    id: "da-nang-shoreline-escape",
    category: "Beach Escapes",
    title: "Da Nang Shoreline Escape (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Beach & Town",
    destinations: ["Da Nang Beach", "Hoi An Ancient Town"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Da Nang: My Khe Beach Hotel (3 Nights)", "Hoi An: Ancient Town Villa (1 Night)"]
  },
  {
    id: "nha-trang-sun-sand",
    category: "Beach Escapes",
    title: "Nha Trang Sun & Sand (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Sun & Fun",
    destinations: ["Nha Trang Beach", "VinWonders"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Nha Trang: Beach Resort (4 Nights)"]
  },
  {
    id: "phu-quoc-saigon-coast-city",
    category: "Beach Escapes",
    title: "Phu Quoc & Saigon Coast-to-City (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Dual Vibe",
    destinations: ["Phu Quoc", "Saigon"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Phu Quoc: Beach Resort (3 Nights)", "Saigon: City Hotel (2 Nights)"]
  },
  {
    id: "da-nang-hue-heritage-coast",
    category: "Beach Escapes",
    title: "Da Nang & Hue Heritage Coast (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Coast & Culture",
    destinations: ["Da Nang Beach", "Hue Imperial City"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Da Nang: Beach Resort (4 Nights)", "Hue: Boutique Hotel (1 Night)"]
  },
  {
    id: "nha-trang-mui-ne-dunes",
    category: "Beach Escapes",
    title: "Nha Trang & Mui Ne Dunes (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Adventure Coast",
    destinations: ["Nha Trang", "Mui Ne Sand Dunes"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Nha Trang: Beach Hotel (3 Nights)", "Mui Ne: Beachfront Resort (2 Nights)"]
  },
  {
    id: "tropical-twin-islands",
    category: "Beach Escapes",
    title: "Tropical Twin Islands (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Island Hopping",
    destinations: ["Phu Quoc", "Con Dao Island"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Phu Quoc: Beach Resort (3 Nights)", "Con Dao: Eco Resort (3 Nights)"]
  },
  {
    id: "luxury-beach-cruise-combo",
    category: "Beach Escapes",
    title: "Luxury Beach & Cruise Combo (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Elite Escapes",
    destinations: ["Da Nang Beach", "Halong Bay Luxury Cruise"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Da Nang: 5-Star Beach Villa (4 Nights)", "Halong Bay: Luxury Cruise (2 Nights)"]
  },
  {
    id: "mui-ne-desert-coastline",
    category: "Beach Escapes",
    title: "Mui Ne Desert Coastline (4D3N)",
    duration: "4 Days / 3 Nights",
    badge: "Mini Getaway",
    destinations: ["Saigon", "Mui Ne Dunes & Beach"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Saigon: 4-star (1 Night)", "Mui Ne: Dunes Resort (2 Nights)"]
  },
  {
    id: "hidden-beach-explorer",
    category: "Beach Escapes",
    title: "Hidden Beach Explorer (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Unexplored",
    destinations: ["Quy Nhon", "Nha Trang"],
    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
    hotels: ["Quy Nhon: Beach Resort (3 Nights)", "Nha Trang: Coastal Hotel (2 Nights)"]
  },

  // Group 3: Honeymoons & Romance
  {
    id: "dalat-highlands-romance",
    category: "Honeymoons & Romance",
    title: "Dalat Highlands Romance (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Sweetheart Special",
    destinations: ["Saigon", "Da Lat Valley of Love"],
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    hotels: ["Saigon: City Hotel (2 Nights)", "Da Lat: Romantic Villa (2 Nights)"]
  },
  {
    id: "romantic-halong-hanoi",
    category: "Honeymoons & Romance",
    title: "Romantic Halong & Hanoi (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Couples Cruise",
    destinations: ["Hanoi", "Halong Bay Luxury Private Cabin", "Ninh Binh"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Hanoi: Boutique Hotel (2 Nights)", "Halong Bay: Private Cabin (2 Nights)", "Ninh Binh: Ecolodge (1 Night)"]
  },
  {
    id: "phu-quoc-couples-getaway",
    category: "Honeymoons & Romance",
    title: "Phu Quoc Couples Getaway (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Secluded Luxury",
    destinations: ["Phu Quoc Luxury Beach Villa", "Saigon Rooftop Dining"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Phu Quoc: Pool Villa (4 Nights)", "Saigon: Luxury Boutique (1 Night)"]
  },
  {
    id: "hoi-an-lantern-lit-romance",
    category: "Honeymoons & Romance",
    title: "Hoi An Lantern Lit Romance (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Quaint Charm",
    destinations: ["Da Nang", "Hoi An Riverside Resort"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Da Nang: Coastal Resort (1 Night)", "Hoi An: Riverside Heritage Hotel (3 Nights)"]
  },
  {
    id: "highlands-coast-honeymoon",
    category: "Honeymoons & Romance",
    title: "Highlands & Coast Honeymoon (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Romantic Peaks",
    destinations: ["Da Lat", "Nha Trang Beach Resort"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Da Lat: Pine Valley Resort (3 Nights)", "Nha Trang: Overwater Villa (3 Nights)"]
  },
  {
    id: "ultra-luxe-private-hideaway",
    category: "Honeymoons & Romance",
    title: "Ultra-Luxe Private Hideaway (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Ultimate Romance",
    destinations: ["Ninh Van Bay Private Pool Villa", "Saigon"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Ninh Van Bay: Six Senses (4 Nights)", "Saigon: Park Hyatt (2 Nights)"]
  },
  {
    id: "northern-mountain-romance",
    category: "Honeymoons & Romance",
    title: "Northern Mountain Romance (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Cozy Retreat",
    destinations: ["Hanoi", "Sapa Mountain Retreat"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Hanoi: French Quarter Hotel (2 Nights)", "Sapa: Mountain Ecolodge (3 Nights)"]
  },
  {
    id: "vietnam-romantic-grand-tour",
    category: "Honeymoons & Romance",
    title: "Vietnam Romantic Grand Tour (10D9N)",
    duration: "10 Days / 9 Nights",
    badge: "Forever Us",
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Da Lat", "Saigon"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Hanoi: 5-Star (2 Nights)", "Halong Bay: VIP Cruise (1 Night)", "Da Nang: Resort (3 Nights)", "Da Lat: Palace Hotel (2 Nights)", "Saigon: 5-Star (1 Night)"]
  },
  {
    id: "secluded-island-honeymoon",
    category: "Honeymoons & Romance",
    title: "Secluded Island Honeymoon (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Paradise Found",
    destinations: ["Con Dao Luxury Beachfront"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Con Dao: Six Senses (4 Nights)"]
  },
  {
    id: "sapa-sapa-valley-escape",
    category: "Honeymoons & Romance",
    title: "Sapa & Sapa Valley Escape (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Valley View",
    destinations: ["Hanoi", "Sapa Topas Ecolodge"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Hanoi: Boutique Hotel (1 Night)", "Sapa: Topas Ecolodge (3 Nights)"]
  },

  // Group 4: Family Holidays
  {
    id: "vietnam-theme-park-extravaganza",
    category: "Family Holidays",
    title: "Vietnam Theme Park Extravaganza (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Kids Favorite",
    destinations: ["Da Nang Ba Na Hills", "Phu Quoc VinWonders & Safari"],
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    hotels: ["Da Nang: Family Suite (3 Nights)", "Phu Quoc: Vinpearl Resort (3 Nights)"]
  },
  {
    id: "family-fun-in-phu-quoc",
    category: "Family Holidays",
    title: "Family Fun in Phu Quoc (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Island Fun",
    destinations: ["Phu Quoc Safari & Waterpark"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Phu Quoc: Beachfront Family Resort (4 Nights)"]
  },
  {
    id: "saigon-mekong-fun",
    category: "Family Holidays",
    title: "Saigon & Mekong Fun (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Active Family",
    destinations: ["Saigon", "Mekong Delta Family Farm"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Saigon: Family Suite (3 Nights)", "Mekong Delta: Farm Lodge (1 Night)"]
  },
  {
    id: "central-vietnam-family-classic",
    category: "Family Holidays",
    title: "Central Vietnam Family Classic (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Culture & Beach",
    destinations: ["Da Nang", "Hoi An Lantern Making"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Da Nang: My Khe Beach Hotel (3 Nights)", "Hoi An: Family Villa (2 Nights)"]
  },
  {
    id: "hanoi-ninh-binh-family-adventure",
    category: "Family Holidays",
    title: "Hanoi & Ninh Binh Family Adventure (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Eco-Adventure",
    destinations: ["Hanoi", "Trang An Boat Ride & Mua Cave"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Hanoi: City Hotel (3 Nights)", "Ninh Binh: Family Homestay (2 Nights)"]
  },
  {
    id: "vietnam-grand-family-tour",
    category: "Family Holidays",
    title: "Vietnam Grand Family Tour (9D8N)",
    duration: "9 Days / 8 Nights",
    badge: "Mega-Holiday",
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Hanoi: City Hotel (2 Nights)", "Halong Bay: Cruise (1 Night)", "Da Nang: Beach Resort (3 Nights)", "Saigon: 4-star Family Suite (2 Nights)"]
  },
  {
    id: "theme-parks-beaches-combo",
    category: "Family Holidays",
    title: "Theme Parks & Beaches Combo (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Theme Parks",
    destinations: ["Nha Trang VinWonders", "Da Nang Ba Na Hills"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Nha Trang: Vinpearl Resort (3 Nights)", "Da Nang: Ba Na Hills French Village (2 Nights)"]
  },
  {
    id: "mekong-delta-saigon-kids-special",
    category: "Family Holidays",
    title: "Mekong Delta & Saigon Kids Special (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Kid Friendly",
    destinations: ["Saigon", "Mekong Delta"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Saigon: Boutique Hotel (3 Nights)", "Mekong Delta: Jungle Eco Lodge (2 Nights)"]
  },
  {
    id: "sapa-family-mountain-eco-tour",
    category: "Family Holidays",
    title: "Sapa Family Mountain Eco-Tour (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Eco Tour",
    destinations: ["Hanoi", "Sapa Easy Trek & Cable Car"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Hanoi: French Quarter Hotel (2 Nights)", "Sapa: Bamboo Hotel (3 Nights)"]
  },
  {
    id: "dalat-saigon-family-cooler",
    category: "Family Holidays",
    title: "Dalat & Saigon Family Cooler (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Highlands Cool",
    destinations: ["Saigon", "Da Lat Alpine Coaster"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Saigon: Downtown Suite (2 Nights)", "Da Lat: Pine Resort (3 Nights)"]
  },

  // Group 5: Culinary Experiences
  {
    id: "vegetarian-vietnam-foodie-trail",
    category: "Culinary Experiences",
    title: "Vegetarian Vietnam Foodie Trail (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Veg Gastronomy",
    destinations: ["Hanoi Veg Street Food", "Hoi An Organic Farming", "Saigon Veg Eats"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Hanoi: Old Quarter Hotel (2 Nights)", "Hoi An: Eco Lodge (2 Nights)", "Saigon: Central Hotel (1 Night)"]
  },
  {
    id: "vietnamese-coffee-cafe-culture",
    category: "Culinary Experiences",
    title: "Vietnamese Coffee & Cafe Culture (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Coffee Trail",
    destinations: ["Hanoi Cafe Apartments", "Buon Ma Thuot Coffee Capital"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Hanoi: Boutique Hotel (2 Nights)", "Buon Ma Thuot: Eco Lodge (2 Nights)"]
  },
  {
    id: "jain-vegetarian-heritage-tour",
    category: "Culinary Experiences",
    title: "Jain & Vegetarian Heritage Tour (7D6N)",
    duration: "7 Days / 6 Nights",
    badge: "Strict Veg",
    destinations: ["Hanoi", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Hanoi: City Hotel (2 Nights)", "Da Nang: Beach Resort (2 Nights)", "Saigon: Central Hotel (2 Nights)"]
  },
  {
    id: "saigon-mekong-cooking-academy",
    category: "Culinary Experiences",
    title: "Saigon & Mekong Cooking Academy (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Cooking Classes",
    destinations: ["Saigon Culinary Masterclass", "Mekong Delta Farm-to-Table"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Saigon: Boutique Hotel (3 Nights)", "Mekong Delta: Farm Lodge (1 Night)"]
  },
  {
    id: "hanoi-michelin-street-culinary",
    category: "Culinary Experiences",
    title: "Hanoi Michelin & Street Culinary (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Fine Dining",
    destinations: ["Hanoi Old Quarter Walks"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Hanoi: Old Quarter Luxury Hotel (4 Nights)"]
  },
  {
    id: "hoi-an-organic-farm-herb-village",
    category: "Culinary Experiences",
    title: "Hoi An Organic Farm & Herb Village (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Organic Farm",
    destinations: ["Hoi An Eco-Resort & Cooking Class"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Hoi An: Eco-Resort (4 Nights)"]
  },
  {
    id: "hue-imperial-royal-dining",
    category: "Culinary Experiences",
    title: "Hue Imperial & Royal Dining (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Royal Cuisine",
    destinations: ["Hue Royal Cuisine Tasting", "Da Nang"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Hue: Heritage Hotel (3 Nights)", "Da Nang: Beach Resort (1 Night)"]
  },
  {
    id: "north-to-south-culinary-grand-tour",
    category: "Culinary Experiences",
    title: "North-to-South Culinary Grand Tour (9D8N)",
    duration: "9 Days / 8 Nights",
    badge: "Epicurean Trail",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Saigon"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Hanoi: Boutique (2 Nights)", "Halong Bay: Luxury Cruise (1 Night)", "Hoi An: Boutique (3 Nights)", "Saigon: Boutique (2 Nights)"]
  },
  {
    id: "mekong-river-floating-market-feast",
    category: "Culinary Experiences",
    title: "Mekong River Floating Market Feast (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Local Flavors",
    destinations: ["Saigon", "Can Tho Market Tours"],
    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
    hotels: ["Saigon: Downtown (2 Nights)", "Can Tho: Riverside (2 Nights)"]
  },
  {
    id: "veg-friendly-sapa-sapa-valley",
    category: "Culinary Experiences",
    title: "Veg-Friendly Sapa & Sapa Valley (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Healthy Living",
    destinations: ["Hanoi", "Sapa Cooking & Tea Experience"],
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    hotels: ["Hanoi: City Hotel (2 Nights)", "Sapa: Mountain Lodge (3 Nights)"]
  },

  // Group 6: City Discovery
  {
    id: "saigon-shopping-fashion-spree",
    category: "City Discovery",
    title: "Saigon Shopping & Fashion Spree (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Shopaholic",
    destinations: ["Saigon Markets & Shopping Malls"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Saigon: Central Retail District Hotel (4 Nights)"]
  },
  {
    id: "hanoi-heritage-french-quarter",
    category: "City Discovery",
    title: "Hanoi Heritage & French Quarter (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "City Sights",
    destinations: ["Hanoi Historical Walk & Cyclo"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Hanoi: French Quarter Boutique Hotel (4 Nights)"]
  },
  {
    id: "dual-city-explorer",
    category: "City Discovery",
    title: "Dual City Explorer (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Two Capitals",
    destinations: ["Hanoi Capital", "Saigon Metropolis"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Hanoi: Old Quarter Hotel (3 Nights)", "Saigon: District 1 Hotel (2 Nights)"]
  },
  {
    id: "da-nang-hoi-an-night-discovery",
    category: "City Discovery",
    title: "Da Nang & Hoi An Night Discovery (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Night Explorer",
    destinations: ["Da Nang Bridges & Lantern Towns"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Da Nang: My Khe Beach Hotel (2 Nights)", "Hoi An: Ancient Town Villa (2 Nights)"]
  },
  {
    id: "saigon-vung-tau-coastal-city",
    category: "City Discovery",
    title: "Saigon & Vung Tau Coastal City (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Metropolis & Bay",
    destinations: ["Saigon City Hub", "Vung Tau"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Saigon: Boutique (3 Nights)", "Vung Tau: Seaside Resort (2 Nights)"]
  },
  {
    id: "hanoi-ninh-binh-ancient-capital",
    category: "City Discovery",
    title: "Hanoi & Ninh Binh Ancient Capital (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Heritage Walks",
    destinations: ["Hanoi Capital", "Ninh Binh"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Hanoi: Boutique Hotel (3 Nights)", "Ninh Binh: Ecolodge (1 Night)"]
  },
  {
    id: "saigon-craft-beer-nightlife",
    category: "City Discovery",
    title: "Saigon Craft Beer & Nightlife (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Saigon Nights",
    destinations: ["Saigon Night Clubs & Rooftop Lounges"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Saigon: Rooftop Pool Hotel (4 Nights)"]
  },
  {
    id: "hanoi-art-museums-railway-street",
    category: "City Discovery",
    title: "Hanoi Art, Museums & Railway Street (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Art & Culture",
    destinations: ["Hanoi Galleries & Train Street"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Hanoi: Art Deco Boutique Hotel (4 Nights)"]
  },
  {
    id: "vietnam-urban-grand-tour",
    category: "City Discovery",
    title: "Vietnam Urban Grand Tour (8D7N)",
    duration: "8 Days / 7 Nights",
    badge: "Urban Explorer",
    destinations: ["Hanoi", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Hanoi: Boutique (3 Nights)", "Da Nang: Seaside (2 Nights)", "Saigon: High-Rise (2 Nights)"]
  },
  {
    id: "saigon-shopping-mekong-weekend",
    category: "City Discovery",
    title: "Saigon Shopping & Mekong Weekend (4D3N)",
    duration: "4 Days / 3 Nights",
    badge: "Quick Trip",
    destinations: ["Saigon Retail & Floating Market"],
    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
    hotels: ["Saigon: Retail District Hotel (3 Nights)"]
  },

  // Group 7: Nature & Adventure
  {
    id: "sapa-roof-indochina-trek",
    category: "Nature & Adventure",
    title: "Sapa Roof of Indochina Trek (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Fansipan Climber",
    destinations: ["Sapa Mountain Hikes & Fansipan Peak"],
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    hotels: ["Sapa: Valley Lodge (4 Nights)"]
  },
  {
    id: "ha-giang-loop-scenic-ride",
    category: "Nature & Adventure",
    title: "Ha Giang Loop Scenic Ride (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Motorbike Loop",
    destinations: ["Ha Giang Motorbike/Car Loop", "Hanoi"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Ha Giang: Hilltribe Homestays (4 Nights)", "Hanoi: City Hotel (1 Night)"]
  },
  {
    id: "ninh-binh-karst-valley-explorer",
    category: "Nature & Adventure",
    title: "Ninh Binh Karst Valley Explorer (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Eco Adventure",
    destinations: ["Trang An Caves & Mua Peak"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Ninh Binh: Riverside Bungalow (4 Nights)"]
  },
  {
    id: "phong-nha-cave-expedition",
    category: "Nature & Adventure",
    title: "Phong Nha Cave Expedition (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Caving",
    destinations: ["Paradise Cave & Phong Nha National Park"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Phong Nha: Lake House Resort (4 Nights)"]
  },
  {
    id: "ba-be-lake-kayak-jungle",
    category: "Nature & Adventure",
    title: "Ba Be Lake Kayak & Jungle (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Jungle kayak",
    destinations: ["Ba Be Lake National Park", "Hanoi"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Ba Be Lake: Eco Lodge (3 Nights)", "Hanoi: Boutique (1 Night)"]
  },
  {
    id: "ban-gioc-waterfall-cao-bang",
    category: "Nature & Adventure",
    title: "Ban Gioc Waterfall & Cao Bang (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Waterfalls",
    destinations: ["Ban Gioc Falls", "Cao Bang Caves"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Ban Gioc: Eco Resort (3 Nights)", "Cao Bang: Boutique Hotel (2 Nights)"]
  },
  {
    id: "central-highlands-forest-trek",
    category: "Nature & Adventure",
    title: "Central Highlands Forest Trek (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Forest Hike",
    destinations: ["Dalat Hikes & Waterfalls", "Nha Trang"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Da Lat: Eco Cabin (3 Nights)", "Nha Trang: Beach Hotel (2 Nights)"]
  },
  {
    id: "vietnam-active-grand-adventure",
    category: "Nature & Adventure",
    title: "Vietnam Active Grand Adventure (10D9N)",
    duration: "10 Days / 9 Nights",
    badge: "Mega-Adventure",
    destinations: ["Hanoi", "Sapa", "Ninh Binh", "Phong Nha Caves"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Hanoi: City Hotel (1 Night)", "Sapa: Bamboo (3 Nights)", "Ninh Binh: Ecolodge (2 Nights)", "Phong Nha: River Resort (3 Nights)"]
  },
  {
    id: "cat-ba-island-rock-climbing",
    category: "Nature & Adventure",
    title: "Cat Ba Island & Rock Climbing (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Coastal Climb",
    destinations: ["Cat Ba Island Hikes", "Lan Ha Bay Kayaking"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Cat Ba: Sea View Resort (3 Nights)", "Lan Ha: Overwater Eco Lodge (1 Night)"]
  },
  {
    id: "mekong-delta-eco-biking",
    category: "Nature & Adventure",
    title: "Mekong Delta Eco-Biking (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Countryside Bike",
    destinations: ["Saigon", "Mekong Countryside Cycling"],
    img: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800&q=80",
    hotels: ["Saigon: Central Hotel (1 Night)", "Mekong Delta: Countryside Homestay (3 Nights)"]
  },

  // Group 8: Luxury Vietnam
  {
    id: "halong-bay-ultra-luxury-cruise",
    category: "Luxury Vietnam",
    title: "Halong Bay Ultra-Luxury Cruise (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Presidential",
    destinations: ["Hanoi", "Halong Bay Luxury Cruise"],
    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
    hotels: ["Hanoi: Sofitel Legend Metropole (2 Nights)", "Halong Bay: Emperor Private Cruise Suite (2 Nights)"]
  },
  {
    id: "ninh-van-bay-luxury-wellness",
    category: "Luxury Vietnam",
    title: "Ninh Van Bay Luxury Wellness (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Villas & Spa",
    destinations: ["Nha Trang", "Ninh Van Bay Six Senses Wellness"],
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    hotels: ["Nha Trang: 5-Star Beach Resort (1 Night)", "Ninh Van Bay: Six Senses Water Villa (4 Nights)"]
  },
  {
    id: "da-nang-hoi-an-ultra-luxe",
    category: "Luxury Vietnam",
    title: "Da Nang & Hoi An Ultra-Luxe (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "5-Star Elite",
    destinations: ["Da Nang", "Hoi An"],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    hotels: ["Da Nang: InterContinental Sun Peninsula (3 Nights)", "Hoi An: Four Seasons Nam Hai (1 Night)"]
  },
  {
    id: "saigon-phu-quoc-presidential-escape",
    category: "Luxury Vietnam",
    title: "Saigon & Phu Quoc Presidential Escape (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Ultimate Luxe",
    destinations: ["Saigon", "Phu Quoc"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&q=80",
    hotels: ["Saigon: Park Hyatt Saigon (2 Nights)", "Phu Quoc: Regent Resort Pool Villa (3 Nights)"]
  },
  {
    id: "lan-ha-bay-cat-ba-island-cruise",
    category: "Luxury Vietnam",
    title: "Lan Ha Bay & Cat Ba Island Cruise (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Exclusive Yacht",
    destinations: ["Lan Ha Bay Luxury Charter Cruise"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    hotels: ["Lan Ha Bay: Private Yacht Charter (4 Nights)"]
  },
  {
    id: "saigon-con-dao-six-senses-luxury",
    category: "Luxury Vietnam",
    title: "Saigon & Con Dao Six Senses Luxury (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Private Island",
    destinations: ["Saigon", "Con Dao Six Senses Resort"],
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    hotels: ["Saigon: The Reverie Saigon (2 Nights)", "Con Dao: Six Senses Ocean Front Villa (3 Nights)"]
  },
  {
    id: "sapa-luxury-mountain-retreat",
    category: "Luxury Vietnam",
    title: "Sapa Luxury Mountain Retreat (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Luxe Mountain",
    destinations: ["Sapa", "Hanoi"],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    hotels: ["Sapa: Hotel de la Coupole (3 Nights)", "Hanoi: Metropole Opera Wing (1 Night)"]
  },
  {
    id: "vietnam-luxury-grand-tour",
    category: "Luxury Vietnam",
    title: "Vietnam Luxury Grand Tour (9D8N)",
    duration: "9 Days / 8 Nights",
    badge: "Luxe Classic",
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Saigon"],
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    hotels: ["Hanoi: Sofitel Legend Metropole (2 Nights)", "Halong Bay: Elite Cruise (1 Night)", "Da Nang: InterContinental (3 Nights)", "Saigon: Park Hyatt (2 Nights)"]
  },
  {
    id: "quy-nhon-anantara-private-pool-villas",
    category: "Luxury Vietnam",
    title: "Quy Nhon Anantara Private Pool Villas (5D4N)",
    duration: "5 Days / 4 Nights",
    badge: "Elite Beachfront",
    destinations: ["Quy Nhon"],
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    hotels: ["Quy Nhon: Anantara Private Pool Villa (4 Nights)"]
  },
  {
    id: "mekong-delta-luxury-river-charter",
    category: "Luxury Vietnam",
    title: "Mekong Delta Luxury River Charter (6D5N)",
    duration: "6 Days / 5 Nights",
    badge: "Boutique Sail",
    destinations: ["Saigon", "Aqua Mekong River Cruise"],
    img: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&q=80",
    hotels: ["Saigon: Park Hyatt (2 Nights)", "Mekong River: Aqua Mekong Suite (3 Nights)"]
  }
];

// Helper to expand raw packages with details
function expandPackage(pkg) {
  const parseDays = parseInt(pkg.duration.split(' ')[0]);
  const days = [];
  
  // High quality day generator templates based on locations
  for (let i = 1; i <= parseDays; i++) {
    let title = "Day Program";
    let description = "Explore the local culture, sights, and hidden gems of Vietnam.";
    
    // Choose typical days based on itinerary flow
    if (i === 1) {
      title = `${pkg.destinations[0]} Arrival & Evening Leisure`;
      description = `Arrive at the airport. Private transfer to your premium hotel/resort. Enjoy an orientation walk and a relaxing welcome dinner.`;
    } else if (i === parseDays) {
      title = `Farewell ${pkg.destinations[pkg.destinations.length - 1]}`;
      description = `Leisure morning, enjoy pool amenities, shop for souvenirs, and private transfer to the airport for your flight back home.`;
    } else {
      // Mid days
      const currentDestIndex = Math.min(Math.floor((i - 1) / (parseDays - 2) * pkg.destinations.length), pkg.destinations.length - 1);
      const dest = pkg.destinations[currentDestIndex];
      
      if (dest.includes("Hanoi")) {
        title = "Hanoi City Discovery & Train Street Heritage";
        description = "Discover the historic Temple of Literature, Tran Quoc Pagoda, and the French colonial architectural gems. Spend the afternoon experiencing Hanoi's famous Train Street Cafe culture.";
      } else if (dest.includes("Halong")) {
        title = "Halong Bay Luxury Cruise & Karst Sailing";
        description = "Travel to Halong Bay. Board your luxury boat, sail through the breathtaking limestone karsts, visit cave systems, and kayak in emerald waters.";
      } else if (dest.includes("Saigon") || dest.includes("HCMC")) {
        title = "Saigon War Heritage & Ben Thanh Market Tour";
        description = "Excursion to the historical Cu Chi Tunnels. Return to the city for a walking tour of Notre Dame, the central Post Office, and shopping at Ben Thanh market.";
      } else if (dest.includes("Da Nang")) {
        title = "Ba Na Hills & Golden Bridge VIP Tour";
        description = "Ride the world-class cable car up Ba Na Hills. Walk across the stunning Golden Bridge, visit the French Alpine village, and capture panoramic photos.";
      } else if (dest.includes("Hoi An")) {
        title = "Hoi An Ancient Lantern Town Guided Walk";
        description = "Stroll along Hoi An's narrow streets, admire ancient merchant houses, visit assembly halls, and take a romantic lantern boat ride on the Thu Bon river.";
      } else if (dest.includes("Phu Quoc")) {
        title = "Phu Quoc Safari or Speedboat Island Snorkeling";
        description = "Visit Vinpearl Safari, the largest semi-wild zoo, or embark on a speedboat cruise to pristine islands (May Rut/Gam Ghi) for coral snorkeling and beach relaxation.";
      } else if (dest.includes("Ninh Binh")) {
        title = "Ninh Binh Karst Boat Ride & Mua Peak Hike";
        description = "Row boat cruise through Trang An's scenic waterway valleys. Challenge yourself with a hike up Mua Cave peak for the dragon statue panoramic view.";
      } else if (dest.includes("Sapa")) {
        title = "Sapa Rice Terraces Valley Hike & Fansipan Peak";
        description = "Trek through Sapa's picturesque rice terrace valleys. Ride the cable car to Fansipan Peak, known as the 'Roof of Indochina' for spectacular mountain views.";
      } else if (dest.includes("Mekong")) {
        title = "Mekong River Canal Cruise & Floating Village";
        description = "Boat cruise through Ben Tre coconut groves. Visit traditional honey farms, ride hand-rowed sampans through narrow canals, and listen to local folk music.";
      } else if (dest.includes("Da Lat")) {
        title = "Da Lat Valley of Love & Datanla Coaster";
        description = "Enjoy Da Lat's refreshing highland weather. Visit the Valley of Love, stroll Flower Gardens, and ride the alpine coaster at Datanla Waterfalls.";
      } else if (dest.includes("Nha Trang")) {
        title = "Nha Trang Bay Islands Cruise & VinWonders Fun";
        description = "Take a private speedboat around Nha Trang bay, swim in crystal-clear waters, or enjoy thrilling slides and rides at VinWonders theme park.";
      } else if (dest.includes("Con Dao")) {
        title = "Con Dao Secluded Beaches & Marine Conservation";
        description = "Enjoy pristine white beaches, explore coastal hiking trails, and learn about Con Dao's sea turtle conservation and historic heritage.";
      } else if (dest.includes("Mui Ne")) {
        title = "Mui Ne White Sand Dunes Jeep Safari";
        description = "Hop on a sunset or sunrise jeep safari to the spectacular Red and White Sand Dunes, walk the Fairy Stream, and visit local fishing harbors.";
      } else {
        title = `${dest} Local Discovery & Leisure`;
        description = `Explore local scenic points, historic temples, craft markets, and enjoy authentic regional cuisine at your own pace.`;
      }
    }

    days.push({
      day: i,
      title: title,
      description: description,
      activities: [`Guided tour of ${pkg.destinations.join(' & ')} points of interest`, "Private vehicle transfer with local English-speaking guide"],
      food: i === 1 ? ["Dinner"] : i === parseDays ? ["Breakfast"] : ["Breakfast", "Lunch"]
    });
  }

  // Generically compile inclusions and exclusions
  const inclusions = [
    "Airport transfers in private A/C luxury vehicles",
    "Daily gourmet breakfast at all hotels/resorts",
    "Local English-speaking tour guides for sightseeing",
    "All entrance tickets, cruise admissions, and cable car fees",
    "24/7 dedicated local WhatsApp helpline during travel"
  ];
  if (pkg.destinations.length > 1 && !pkg.title.includes("Mui Ne") && !pkg.title.includes("Vung Tau")) {
    inclusions.push("Domestic flights within Vietnam (as per routing)");
  }

  return {
    ...pkg,
    desc: `A premium tour tailored for Indian travelers visiting ${pkg.destinations.join(" & ")}, offering comfortable private transportation, choice hotels, and vegetarian/Jain food accessibility.`,
    inclusions: inclusions,
    exclusions: [
      "International flights to/from Vietnam",
      "E-visa stamping and processing fees",
      "Personal tips, shopping, and items of a personal nature",
      "Gala dinner surcharges on holidays (if applicable)"
    ],
    days: days
  };
}

async function run() {
  console.log("Expanding all 80 itineraries...");
  const fullPackages = rawPackages.map(p => expandPackage(p));

  // 1. Write src/data/packagesData.ts
  const codePath = path.join(process.cwd(), 'src', 'data', 'packagesData.ts');
  const codeContent = `// Automatically generated file. Do not edit directly.
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

export const ITINERARIES_DATABASE: PackageProduct[] = ${JSON.stringify(fullPackages, null, 2)};

export const BY_THEME_CATEGORIES: CategoryData[] = [
  {
    name: "First Time in Vietnam",
    tagline: "Never been to Vietnam? Start here.",
    subsections: ["Vietnam Essentials", "Best of Vietnam", "Complete Vietnam"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "First Time in Vietnam")
  },
  {
    name: "Beach Escapes",
    tagline: "Sun, sand and island adventures.",
    subsections: ["Phu Quoc Escapes", "Da Nang Beaches", "Nha Trang Getaways"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Beach Escapes")
  },
  {
    name: "Honeymoons & Romance",
    tagline: "Designed for unforgettable moments.",
    subsections: ["Romantic Escapes", "Luxury Honeymoons", "Anniversary Trips"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Honeymoons & Romance")
  },
  {
    name: "Family Holidays",
    tagline: "Experiences for every generation.",
    subsections: ["Family Favorites", "Kid-Friendly Adventures", "Theme Park Holidays"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Family Holidays")
  },
  {
    name: "Culinary Experiences",
    tagline: "Taste the real Vietnam.",
    subsections: ["Street Food Journeys", "Cooking Classes", "Coffee Experiences"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Culinary Experiences")
  },
  {
    name: "City Discovery",
    tagline: "Vietnam's most vibrant cities.",
    subsections: ["Hanoi Discovery", "Saigon Explorer"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "City Discovery")
  },
  {
    name: "Nature & Adventure",
    tagline: "Vietnam beyond the cities.",
    subsections: ["Sapa Adventures", "Cave Exploration", "Trekking Journeys"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Nature & Adventure")
  },
  {
    name: "Luxury Vietnam",
    tagline: "Vietnam at its finest.",
    subsections: ["Signature Luxury", "Wellness Retreats"],
    packages: ITINERARIES_DATABASE.filter(p => p.category === "Luxury Vietnam")
  }
];

export const BY_REGION_CATEGORIES: CategoryData[] = [
  {
    name: "Northern Vietnam",
    tagline: "Mountains, culture, heritage and iconic landscapes.",
    subsections: ["Hanoi & Culture", "Ha Long Bay Cruises"],
    packages: ITINERARIES_DATABASE.filter(p => p.destinations.some(d => d.includes("Hanoi") || d.includes("Sapa") || d.includes("Halong") || d.includes("Ha Giang") || d.includes("Ninh Binh") || d.includes("Ba Be") || d.includes("Ban Gioc")))
  },
  {
    name: "Central Vietnam",
    tagline: "Beaches, romance and timeless heritage.",
    subsections: ["Da Nang City & Beach", "Hoi An Ancient Town"],
    packages: ITINERARIES_DATABASE.filter(p => p.destinations.some(d => d.includes("Da Nang") || d.includes("Hoi An") || d.includes("Hue") || d.includes("Quy Nhon")))
  },
  {
    name: "Southern Vietnam",
    tagline: "Island life, energy and tropical escapes.",
    subsections: ["Saigon City Discovery", "Phu Quoc Resorts"],
    packages: ITINERARIES_DATABASE.filter(p => p.destinations.some(d => d.includes("Saigon") || d.includes("Phu Quoc") || d.includes("Mekong") || d.includes("Vung Tau") || d.includes("Con Dao") || d.includes("Mui Ne")))
  },
  {
    name: "Complete Vietnam",
    tagline: "See the best of Vietnam in one journey.",
    subsections: ["7 Day Vietnam", "10 Day Vietnam"],
    packages: ITINERARIES_DATABASE.filter(p => p.destinations.length >= 3)
  }
];

// Jain/Veg tags
const JAIN_VEG_FRIENDLY_IDS = [
  "vegetarian-vietnam-foodie-trail", "jain-vegetarian-heritage-tour",
  "veg-friendly-sapa-sapa-valley", "vietnam-highlights-express",
  "classic-trio-discovery", "saigon-mekong-delta-explorer"
];
ITINERARIES_DATABASE.forEach(p => {
  if (JAIN_VEG_FRIENDLY_IDS.includes(p.id) || p.title.toLowerCase().includes("veg") || p.title.toLowerCase().includes("jain")) {
    p.isJainVegFriendly = true;
  }
});
`;

  fs.writeFileSync(codePath, codeContent, 'utf8');
  console.log(`Saved 80 packages database directly to ${codePath}`);

  // 2. Puppeteer compile all 80 PDFs
  console.log("Launching Puppeteer for A4 PDF compilation...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const logoBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'vietana_logo.png')).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  for (const pkg of fullPackages) {
    const page = await browser.newPage();
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
            Phone (IN): +91 99532 94543<br/>
            Phone (VN): +84 90 243 4006<br/>
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
          VIETANA DMC HCMC © 2026 | VIETANA@vietana.com | booking@vietana.com | +91 99532 94543
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'load' });
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

    console.log(`Generated PDF for: ${pkg.title}`);
    await page.close();
  }

  await browser.close();
  console.log("All 80 PDFs successfully generated!");
}

run().catch(console.error);

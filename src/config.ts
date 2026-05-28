export const WHATSAPP_NUMBERS = {
  INDIA: "919953294543",
  VIETNAM: "84904123456",
  DEFAULT: "919953294543"
};

export const buildWhatsAppLink = (phone: string, text?: string): string => {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const WHATSAPP_INDIA = buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_VIETNAM = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_DEFAULT = WHATSAPP_INDIA;

export const TRIP_BUILDER_CONSTANTS = {
  flight: 25000,
  visa: 2100,
  transitPerHop: 3000
};

export const TRIP_BUILDER_RATES = {
  budget: 3300,
  comfort: 6500,
  luxury: 12000
};

export const TRIP_BUILDER_CITIES = [
  "Hanoi", "Sapa", "Halong Bay", "Ninh Binh", "Da Nang", "Hoi An", "Hue", "Nha Trang", "Da Lat", "Ho Chi Minh City", "Phu Quoc"
];

export const MAP_DESTINATIONS = [
  {name:'Sapa', time:'Sep - Nov, Mar - May', desc:'Misty mountains and terraced rice fields.', lat:22.3364, lng:103.8438, img:'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80'},
  {name:'Hanoi', time:'Oct - Apr', desc:'The cultural and historical heart of Vietnam.', lat:21.0285, lng:105.8542, img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80'},
  {name:'Ha Long Bay', time:'Oct - Apr', desc:'Thousands of limestone karsts in emerald waters.', lat:20.9101, lng:107.1839, img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80'},
  {name:'Ninh Binh', time:'Jan - Mar, May - Aug', desc:'The Halong Bay on land with stunning rivers.', lat:20.2539, lng:105.9750, img:'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80'},
  {name:'Phong Nha', time:'Feb - Aug', desc:'World-class caves and jungle adventures.', lat:17.5947, lng:106.2842, img:'https://images.unsplash.com/photo-1541355416-64fae10f135b?w=400&q=80'},
  {name:'Hue', time:'Jan - Aug', desc:'Ancient imperial city and royal tombs.', lat:16.4637, lng:107.5909, img:'https://images.unsplash.com/photo-1548023487-1cbb394f28ba?w=400&q=80'},
  {name:'Da Nang', time:'Feb - May', desc:'Modern city with beautiful beaches and bridges.', lat:16.0544, lng:108.2022, img:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80'},
  {name:'Hoi An', time:'Feb - Apr', desc:'Charming lantern-lit ancient trading port.', lat:15.8801, lng:108.3380, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'},
  {name:'Mui Ne', time:'Nov - Apr', desc:'Red and white sand dunes with kitesurfing.', lat:10.9575, lng:108.2753, img:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80'},
  {name:'Ho Chi Minh City', time:'Dec - Apr', desc:'The vibrant, energetic southern metropolis.', lat:10.8231, lng:106.6297, img:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80'},
  {name:'Mekong Delta', time:'Sep - Nov', desc:'Lush waterways and floating markets.', lat:10.0452, lng:105.7469, img:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80'},
  {name:'Phu Quoc', time:'Nov - Apr', desc:'Tropical island paradise with white sand beaches.', lat:10.2289, lng:103.9572, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}
];

export const MAP_DEFAULT_ROUTE: [number, number][] = [
  [21.0285, 105.8542], // Hanoi
  [16.0544, 108.2022], // Da Nang
  [10.8231, 106.6297]  // Ho Chi Minh City
];

export const NAV_LINKS = [
  { key: 'services', href: '#services' },
  { key: 'packages', href: '#packages' },
  { key: 'aiPlanner', href: '#', isPlanner: true },
  { key: 'food', href: '#food' },
  { key: 'experiences', href: '#hidden' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
];

export const SERVICES = [
  { ico: '📋', key: 'visa' },
  { ico: '🗺️', key: 'planning' },
  { ico: '🚗', key: 'pickup' },
  { ico: '🏨', key: 'hotel' },
  { ico: '📶', key: 'sim' },
  { ico: '🎫', key: 'tickets' },
  { ico: '🍛', key: 'food' },
  { ico: '✨', key: 'tailored' },
  { ico: '🛡️', key: 'support' }
];

export const PACKAGES = [
  { t: 'Best Heritage Sites', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/World%20heritage%20sites%20Vietnam%20travel_0.jpg', b: 'Culture & History', d: 'Explore UNESCO attractions.' },
  { t: 'Adventure Trails', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Adventure%20itinerary%20Vietnam.jpg', b: 'Thrills', d: 'Exciting outdoor experiences.' },
  { t: 'Couples’ Retreat', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Romantic%20getaway%20Vietnam.jpg', b: 'Romantic', d: 'Timeless romantic getaways.' },
  { t: 'Coast and Islands', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Vietnam%20beach%20holiday.jpg', b: 'Beaches', d: 'Soak up the sun.' },
  { t: 'Family Vacation', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Family%20holiday%20in%20Vietnam.jpg', b: 'All Ages', d: 'Nature and culture for all ages.' },
  { t: 'Green Getaway', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Green%20travel%20ideas%20Vietnam.jpg', b: 'Eco-Tourism', d: 'Pristine, sustainable travel.' }
];

export const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=90',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=90',
  'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1920&q=90'
];

export const MAGIC_DESTINATIONS = [
  { label: "Ha Noi", desc: "The capital of Vietnam, known for its centuries-old architecture and a rich culture with Southeast Asian, Chinese and French influences." },
  { label: "Ha Long Bay", desc: "Emerald waters and thousands of towering limestone islands topped by rainforests. A UNESCO World Heritage site." },
  { label: "Sapa", desc: "A colorful and charming town overlooking the terraced rice fields of the Muong Hoa Valley." },
  { label: "Ninh Binh", desc: "Nicknamed 'Ha Long Bay on land', featuring winding rivers through striking limestone karsts." },
  { label: "Ha Giang", desc: "Stunning mountainous landscapes, deep valleys, winding roads, and authentic local minority cultures." },
  { label: "Mai Chau", desc: "A relaxed, rural valley with stilt houses and lush green paddy fields." },
  { label: "Cao Bang", desc: "Home to the magnificent Ban Gioc Waterfall and vast unspoiled nature." },
  { label: "Moc Chau", desc: "A plateau famous for its rolling tea hills and beautiful flower seasons." },
  { label: "Ba Be Lake", desc: "Vietnam's largest natural lake surrounded by dramatic limestone peaks and thick evergreen forests." },
  { label: "Da Nang", desc: "A modern coastal city known for its sandy beaches, Ba Na Hills, and the iconic Golden Bridge." },
  { label: "Hoi An", desc: "An exceptionally well-preserved Ancient Town, famous for its glowing lanterns and custom tailors." },
  { label: "Hue", desc: "The former imperial capital of Vietnam, lined with ancient tombs, pagodas, and the grand Citadel." },
  { label: "Phong Nha", desc: "The adventure capital of Vietnam, boasting the world's most spectacular cave systems." },
  { label: "Nha Trang", desc: "A high-energy beach resort city with beautiful bays, diving spots, and offshore islands." },
  { label: "Da Lat", desc: "The 'City of Eternal Spring', featuring pine forests, waterfalls, and French colonial heritage." },
  { label: "Quy Nhon", desc: "A peaceful coastal city offering beautiful, uncrowded beaches and rich Cham history." },
  { label: "Phu Yen", desc: "Famous for its stunning coastal roads and the unique basalt rock columns of Ganh Da Dia." },
  { label: "Ly Son Island", desc: "A pristine volcanic island known as the 'garlic kingdom' with crystal clear waters." },
  { label: "Ho Chi Minh City", desc: "The bustling, energetic economic heart of Vietnam. A vibrant mix of old and new." },
  { label: "Phu Quoc", desc: "A tropical paradise island offering white-sand beaches, luxury resorts, and dense jungles." },
  { label: "Can Tho", desc: "The largest city in the Mekong Delta, famous for its lively Cai Rang Floating Market." },
  { label: "Con Dao", desc: "A remote archipelago with spectacular marine life, untouched beaches, and a deep history." },
  { label: "Mui Ne", desc: "A coastal resort town famous for its expansive red and white sand dunes and kite surfing." },
  { label: "Ben Tre", desc: "The 'Coconut Capital' of the Mekong Delta, offering peaceful boat rides through shady canals." },
  { label: "Chau Doc", desc: "A culturally diverse border town featuring floating villages and the beautiful Tra Su Mangrove Forest." },
  { label: "Vung Tau", desc: "A popular coastal city and weekend getaway, known for its beaches and the giant Christ of Vung Tau." },
  { label: "Tay Ninh", desc: "Home to the striking Ba Den Mountain and the colorful Cao Dai Holy See." },
  { label: "Dong Thap", desc: "Famous for its beautiful lotus fields and the rich biodiversity of Tram Chim National Park." },
  { label: "An Giang", desc: "A peaceful province characterized by endless rice fields, sugar palms, and vibrant Khmer culture." },
  { label: "Vinh Long", desc: "A lush island setting in the Mekong Delta, famous for fruit orchards and traditional homestays." }
];

export const EXPERIENCES = [
  { id: 1, t: 'Hidden Temple of Hue', d: 'A 12th-century pagoda hidden in the pine forests.', lat: 16.4677, lng: 107.5905, img: 'https://images.unsplash.com/photo-1583569704200-8b43bd1265fa?w=600&q=80' },
  { id: 2, t: 'Midnight Food Train', d: 'Dine on a moving train through Hanoi\'s narrow streets.', lat: 21.0285, lng: 105.8542, img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
  { id: 3, t: 'Secret Lagoon of Ninh Binh', d: 'A crystal clear lagoon accessible only by a small cave.', lat: 20.2178, lng: 105.9382, img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80' },
  { id: 4, t: 'The Last Weaver of Sapa', d: 'Meet the only remaining practitioner of an ancient indigo technique.', lat: 22.3364, lng: 103.8438, img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=600&q=80' },
  { id: 5, t: 'Lantern Maker\'s Garden', d: 'Create your own lantern in a private 200-year-old courtyard.', lat: 15.8801, lng: 108.3384, img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80' },
  { id: 6, t: 'Coffee in the Clouds', d: 'A floating cafe at the edge of Da Lat\'s highest peak.', lat: 11.9404, lng: 108.4583, img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80' },
  { id: 7, t: 'Jazz in the Alleyway', d: 'Speakeasy jazz club hidden behind a noodle shop in HCMC.', lat: 10.7769, lng: 106.7009, img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80' },
  { id: 8, t: 'Waterfall Meditation', d: 'Private sunrise meditation at the base of Ban Gioc.', lat: 22.8550, lng: 106.7228, img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80' },
  { id: 9, t: 'The Salt Fields of Mui Ne', d: 'Watch the sunrise reflect off the pristine salt crystals.', lat: 10.9333, lng: 108.2833, img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=800&q=80' },
  { id: 10, t: 'Fisherman\'s Secret Cove', d: 'A hidden beach in Quy Nhon only known to locals.', lat: 13.7767, lng: 109.2242, img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' }
];

export const VEG_ITEMS = [
  { 
    id: 'pho-chay',
    name: 'Phở Chay (Veg Pho)', 
    desc: 'A soul-warming, aromatic vegetarian version of Vietnam\'s national dish, featuring a rich, spiced broth and delicate rice noodles.',
    tags: ['Must Try', 'Light'],
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80'
  },
  { 
    id: 'banh-mi-chay',
    name: 'Bánh Mì Chay', 
    desc: 'The legendary Vietnamese baguette, but made entirely vegetarian. Crispy on the outside, soft inside, filled with tofu and fresh herbs.',
    tags: ['Street Food', 'Crunchy'],
    img: 'https://images.unsplash.com/photo-1600454021970-351feb4a506e?w=800&q=80'
  },
  { 
    id: 'goi-cuon-chay',
    name: 'Gỏi Cuốn Chay', 
    desc: 'Fresh spring rolls packed with crisp vegetables, herbs, and tofu. Served with a savory dipping sauce.',
    tags: ['Healthy', 'Fresh'],
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80'
  },
  { 
    id: 'com-tam-chay',
    name: 'Cơm Tấm Chay', 
    desc: 'Broken rice served with a variety of vegetarian toppings like shredded "skin", steamed "egg" meatloaf, and grilled tofu.',
    tags: ['Filling', 'Southern Style'],
    img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80'
  },
  { 
    id: 'bun-chay',
    name: 'Bún Chay', 
    desc: 'A vibrant noodle bowl with rice vermicelli, fresh greens, and crispy tofu, topped with crushed peanuts and a tangy dressing.',
    tags: ['Refreshing', 'Classic'],
    img: 'https://images.unsplash.com/photo-1563812836267-33109a902787?w=800&q=80'
  },
  { 
    id: 'dau-hu-ca-chua',
    name: 'Đậu Hũ Sốt Cà Chua', 
    desc: 'Golden fried tofu cubes simmered in a rich, tangy tomato sauce. A comforting staple of Vietnamese home cooking.',
    tags: ['Comfort Food', 'Savory'],
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'
  },
  { 
    id: 'nom-hoa-chuoi',
    name: 'Nộm Hoa Chuối', 
    desc: 'A crunchy, refreshing salad made from banana blossoms, herbs, and peanuts, tossed in a balanced sweet and sour dressing.',
    tags: ['Salad', 'Unique'],
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
  },
  { 
    id: 'che-xoi',
    name: 'Chè & Xôi (Desserts)', 
    desc: 'A delightful selection of traditional Vietnamese sweet soups and sticky rice, perfect for satisfying your sweet tooth.',
    tags: ['Sweet', 'Traditional'],
    img: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=80'
  },
  { 
    id: 'rau-muong-xao-toi',
    name: 'Rau Muống Xào Tỏi', 
    desc: 'Water spinach stir-fried with fragrant garlic. A simple yet incredibly flavorful side dish loved across Vietnam.',
    tags: ['Popular', 'Garlic'],
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80'
  },
  { 
    id: 'indian-veg',
    name: 'North & South Indian Veg', 
    desc: 'Authentic Indian vegetarian favorites like Paneer Butter Masala, Dal Makhani, and crispy Dosas, found in major cities.',
    tags: ['Comfort', 'Indian'],
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80'
  }
];

export const NON_VEG_ITEMS = [
  { 
    id: 'pho-ga',
    name: 'Phở Gà (Chicken Pho)', 
    desc: 'A delicate and clear chicken noodle soup. The broth is simmered for hours with ginger and star anise for deep flavor.',
    tags: ['Must Try', 'Healthy'],
    img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80'
  },
  { 
    id: 'bun-cha',
    name: 'Bún Chả (Grilled Pork)', 
    desc: 'The iconic Hanoi dish of grilled pork patties and slices served in a warm dipping sauce with vermicelli and herbs.',
    tags: ['Iconic', 'Hanoi'],
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80'
  },
  { 
    id: 'banh-xeo',
    name: 'Bánh Xèo (Crispy Pancake)', 
    desc: 'Sizzling savory crepes filled with shrimp, pork, and bean sprouts. Wrap them in lettuce leaves for the ultimate bite.',
    tags: ['Crispy', 'Hands-on'],
    img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&q=80'
  },
  { 
    id: 'cao-lau',
    name: 'Cao Lầu (Hoi An Noodles)', 
    desc: 'A legendary noodle dish found only in Hoi An, featuring thick noodles, succulent pork, and crunchy rice crackers.',
    tags: ['Regional', 'Ancient Town'],
    img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80'
  },
  { 
    id: 'bun-ga',
    name: 'Bún Gà (Chicken Noodle Soup)', 
    desc: 'Flavorful rice vermicelli soup with tender chicken pieces, often seasoned with lemongrass and chili for a little kick.',
    tags: ['Comforting', 'Spicy Hint'],
    img: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=800&q=80'
  },
  { 
    id: 'com-tam-suon',
    name: 'Cơm Tấm Sườn Nướng', 
    desc: 'The definitive Saigon breakfast: broken rice topped with a perfectly grilled, marinated pork chop and a fried egg.',
    tags: ['Saigon Classic', 'Hearty'],
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
  },
  { 
    id: 'banh-mi-thit',
    name: 'Bánh Mì Thịt Nướng', 
    desc: 'Vietnamese baguette filled with smoky grilled pork, pâté, pickled vegetables, and fresh cilantro.',
    tags: ['Street Food', 'Favorite'],
    img: 'https://images.unsplash.com/photo-1600454021970-351feb4a506e?w=800&q=80'
  },
  { 
    id: 'nem-ran',
    name: 'Nem Rán (Spring Rolls)', 
    desc: 'Crispy, golden-fried spring rolls filled with minced pork, wood-ear mushrooms, and vermicelli. A celebration staple.',
    tags: ['Crunchy', 'Appetizer'],
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80'
  },
  { 
    id: 'cha-ca-la-vong',
    name: 'Chả Cá Lã Vọng', 
    desc: 'Turmeric-marinated fish grilled with a mountain of fresh dill and spring onions. A true Hanoi specialty.',
    tags: ['Specialty', 'Flavorful'],
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80'
  },
  { 
    id: 'ga-nuong-mat-ong',
    name: 'Gà Nướng Mật Ong', 
    desc: 'Succulent chicken marinated in local honey and spices, then flame-grilled to perfection with a sticky, sweet glaze.',
    tags: ['Grilled', 'Sweet & Savory'],
    img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80'
  }
];

export const CAFES = [
  '☕ The Note Coffee', '☕ Cộng Cà Phê', '☕ Cafe Giảng (Egg Coffee)', '☕ Ru Nam Bistro', '☕ L\'Usine'
];

export const MAGIC_MODE_SLIDES = [
  'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80',
  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&q=80',
  'https://images.unsplash.com/photo-1542012843-0570b7787fc5?w=1600&q=80',
  'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80'
];

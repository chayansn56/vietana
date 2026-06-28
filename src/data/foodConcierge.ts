export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface RestaurantDetails {
  id: string;
  name: string;
  city: string;
  cuisine: string;
  priceRange: PriceRange;
  rating: number; // e.g., 4.5
  heroImage: string;
  interiorImages?: string[]; // No food closeups, just interiors/ambience
  shortDesc: string;
  vietanaNotes: string; // "One of our favorite dishes..."
  tags: string[]; // e.g., ['Vegetarian Friendly', 'Open until late']
  suitableFor: string[]; // e.g., ['Family', 'Couples', 'Solo Travelers']
  googleMapsUrl?: string;
  openingHours?: string;
  whatsappReservation?: string;
  isOwnedAndLoved?: boolean; // Special badge trigger
}

export interface DishDetails {
  id: string;
  name: string;
  subtitle: string; // e.g., 'Central Vietnam Specialty'
  heroImage: string;
  story: string; // 'Best enjoyed in Da Nang and Hoi An...'
  vietanaNotes: string;
  recommendedCities: string[];
}

export interface FoodCollection {
  id: string;
  title: string;
  items: (RestaurantDetails | DishDetails)[];
}

export interface ConciergeCategory {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string; // Header image for the side sheet
  collections: FoodCollection[];
}

// ---------------------------------------------------------------------------
// RESTAURANT ECOSYSTEM (EXTRACTED FROM DIRETORY & AUDITED)
// ---------------------------------------------------------------------------

const BENARAS: RestaurantDetails = {
  id: 'benaras',
  name: 'Benaras Indian Restaurant & Club',
  city: 'Ho Chi Minh City',
  cuisine: 'North & South Indian',
  priceRange: '$$$',
  rating: 4.7,
  heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80',
  shortDesc: 'A premium, upscale venue serving authentic Indian recipes and signature cocktails.',
  vietanaNotes: 'Excellent premium dining setting suited for group events and luxury travelers. Highly recommended.',
  tags: ['Vegetarian Friendly', 'Cocktail Bar', 'Luxury Setting'],
  suitableFor: ['Groups', 'Couples', 'Corporate Meetings'],
  googleMapsUrl: 'https://maps.google.com/?q=Benaras+Indian+Restaurant+Ho+Chi+Minh'
};

const NATRAJ: RestaurantDetails = {
  id: 'natraj',
  name: 'Natraj Indian Cuisine',
  city: 'Ho Chi Minh City',
  cuisine: 'North Indian',
  priceRange: '$$',
  rating: 4.4,
  heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  shortDesc: 'Cozy, traditional eatery offering comfort North Indian food in the heart of Dist 1.',
  vietanaNotes: 'Conveniently located near Bui Thi Xuan, known for its hearty curries and garlic naan.',
  tags: ['Family Friendly', 'Authentic', 'Casual Dining'],
  suitableFor: ['Family', 'Solo Travelers', 'Groups'],
  googleMapsUrl: 'https://maps.google.com/?q=Natraj+Indian+Cuisine+Ho+Chi+Minh'
};

const DAHI_HANDI: RestaurantDetails = {
  id: 'dahi-handi',
  name: 'Dahi Handi Restaurant',
  city: 'Ho Chi Minh City',
  cuisine: 'North & South Indian (Thalis)',
  priceRange: '$$',
  rating: 4.5,
  heroImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
  shortDesc: 'Known for traditional thalis and street food snacks near Ben Thanh Market.',
  vietanaNotes: 'Their lunch thali is one of the most authentic and affordable comfort meals in the city.',
  tags: ['Vegetarian Friendly', 'Thali Special', 'Casual'],
  suitableFor: ['Solo Travelers', 'Family', 'Budget Travelers'],
  googleMapsUrl: 'https://maps.google.com/?q=Dahi+Handi+Restaurant+Saigon'
};

const PRANAM_BHARAT: RestaurantDetails = {
  id: 'pranam-bharat',
  name: 'Pranam Bharat Restaurant',
  city: 'Ho Chi Minh City',
  cuisine: 'North Indian Classics',
  priceRange: '$$',
  rating: 4.6,
  heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  shortDesc: 'Spacious dining spot in Thao Dien catering to rich curries and oven-fresh tandoori breads.',
  vietanaNotes: 'Great vegetarian variety. Popular among expats in the District 2 enclave.',
  tags: ['Vegetarian Friendly', 'Spacious', 'Outdoor Seating'],
  suitableFor: ['Family', 'Groups', 'Expats'],
  googleMapsUrl: 'https://maps.google.com/?q=Pranam+Bharat+Restaurant+Saigon'
};

const TANISHQ: RestaurantDetails = {
  id: 'tanishq',
  name: 'Tanishq Pure Veg Restaurant',
  city: 'Ho Chi Minh City',
  cuisine: 'Pure Vegetarian & Jain',
  priceRange: '$$',
  rating: 4.8,
  heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
  shortDesc: 'A strictly vegetarian kitchen serving pure veg and Jain customizations.',
  vietanaNotes: 'The absolute best choice for travelers with strict dietary rules. Conveniently located near Ben Thanh.',
  tags: ['Pure Vegetarian', 'Jain Food Available', 'Gluten Free Options'],
  suitableFor: ['Pure Vegetarians', 'Families', 'Elderly Travelers'],
  googleMapsUrl: 'https://maps.google.com/?q=Tanishq+Pure+Veg+Restaurant+Saigon'
};

const TANDOOR: RestaurantDetails = {
  id: 'tandoor',
  name: 'Tandoor Indian Cuisine',
  city: 'Ho Chi Minh City',
  cuisine: 'North Indian & Kebabs',
  priceRange: '$$$',
  rating: 4.7,
  heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
  shortDesc: 'An award-winning fine dining restaurant serving exquisite kebabs and tandoori specials.',
  vietanaNotes: 'Elegant ambience on Ngo Duc Ke. Their butter chicken and mutton seekh kebabs are legendary.',
  tags: ['Fine Dining', 'Halal Friendly', 'Award Winner'],
  suitableFor: ['Couples', 'Corporate Dinner', 'Gourmet Lovers'],
  googleMapsUrl: 'https://maps.google.com/?q=Tandoor+Indian+Cuisine+Saigon'
};

const SAGAR: RestaurantDetails = {
  id: 'sagar',
  name: 'Sagar Indian Cuisine',
  city: 'Da Lat',
  cuisine: 'North Indian Comfort',
  priceRange: '$$',
  rating: 4.5,
  heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
  shortDesc: 'Warm, cozy diner in the cool mountains of Da Lat serving piping hot curries.',
  vietanaNotes: 'Perfect stop to enjoy hot tea and delicious curry in the chilly Da Lat weather.',
  tags: ['Cozy Ambience', 'Warm Staff', 'Comfort Food'],
  suitableFor: ['Family', 'Couples', 'Mountain Trekkers'],
  googleMapsUrl: 'https://maps.google.com/?q=Sagar+Indian+Cuisine+Dalat'
};

const INDIAGATE: RestaurantDetails = {
  id: 'indiagate',
  name: 'IndiaGate Indian Restaurant',
  city: 'Da Lat',
  cuisine: 'North Indian Tandoor',
  priceRange: '$$',
  rating: 4.6,
  heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80',
  shortDesc: 'Vibrant local spot in Da Lat offering excellent tandoori grills and family thalis.',
  vietanaNotes: 'Run by a welcoming team. The butter naan and chicken tikka are hot favorites.',
  tags: ['Tandoor Special', 'Friendly Service', 'Scenic Stop'],
  suitableFor: ['Family', 'Groups', 'Solo Travelers'],
  googleMapsUrl: 'https://maps.google.com/?q=IndiaGate+Indian+Restaurant+Dalat'
};

const MI_QUANG_CO_VIEN: RestaurantDetails = {
  id: 'mi-quang-co-vien',
  name: 'Mì Quảng Cô Viên',
  city: 'Da Nang',
  cuisine: 'Vietnamese',
  priceRange: '$',
  rating: 4.8,
  heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
  shortDesc: 'A humble, legendary spot serving the definitive bowl of Mi Quang.',
  vietanaNotes: 'One of our absolute favorite places and a must-try for first-time visitors.',
  tags: ['Local Secret', 'Authentic'],
  suitableFor: ['Solo Travelers', 'Couples', 'Foodies'],
  googleMapsUrl: 'https://maps.google.com',
  isOwnedAndLoved: true,
};

const DISH_MI_QUANG: DishDetails = {
  id: 'dish-mi-quang',
  name: 'Mì Quảng',
  subtitle: 'Central Vietnam Specialty',
  heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80',
  story: 'Comforting, rich, and deeply tied to the heritage of Central Vietnam. Best enjoyed in Da Nang and Hoi An.',
  vietanaNotes: 'One of our favorite dishes and a must-try for first-time visitors.',
  recommendedCities: ['Da Nang', 'Hoi An'],
};

// CATEGORIES

export const CATEGORY_INDIAN_COMFORT: ConciergeCategory = {
  id: 'indian-comfort',
  title: 'Indian Comfort',
  subtitle: 'Familiar flavors, wherever you are in Vietnam.',
  heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
  collections: [
    {
      id: 'hcmc-indian-restaurants',
      title: 'Top Spots in Ho Chi Minh City',
      items: [BENARAS, TANDOOR, DAHI_HANDI, NATRAJ, PRANAM_BHARAT, TANISHQ]
    },
    {
      id: 'dalat-indian-restaurants',
      title: 'Cozy Dining in Da Lat',
      items: [SAGAR, INDIAGATE]
    }
  ]
};

export const CATEGORY_VEG_JAIN: ConciergeCategory = {
  id: 'vegetarian-jain',
  title: 'Vegetarian & Jain',
  subtitle: 'Pure, clean, and uncompromisingly delicious vegetarian spots.',
  heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80',
  collections: [
    {
      id: 'pure-vegetarian-hcmc',
      title: 'Strict Veg & Jain Friendly (HCMC)',
      items: [TANISHQ, PRANAM_BHARAT, DAHI_HANDI, BENARAS]
    }
  ]
};

export const CATEGORY_VIETNAMESE: ConciergeCategory = {
  id: 'vietnamese-favorites',
  title: 'Vietnamese Favorites',
  subtitle: 'The soul of Vietnam, served daily.',
  heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
  collections: [
    {
      id: 'mi-quang',
      title: 'Mi Quang Specialties',
      items: [MI_QUANG_CO_VIEN, DISH_MI_QUANG]
    }
  ]
};

export const CATEGORY_CAFES: ConciergeCategory = {
  id: 'cafes',
  title: 'Cafés & Hidden Gems',
  subtitle: 'Where time slows down.',
  heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
  collections: [
    {
      id: 'sunset-cafes',
      title: 'Sunset Cafés',
      items: []
    }
  ]
};

export const CATEGORY_LOCAL_KNOWLEDGE: ConciergeCategory = {
  id: 'local-knowledge',
  title: 'Local Knowledge',
  subtitle: 'Years of living and eating in Vietnam.',
  heroImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
  collections: []
};

// Combine for easy mapping
export const ALL_CATEGORIES = [
  CATEGORY_INDIAN_COMFORT,
  CATEGORY_VEG_JAIN,
  CATEGORY_VIETNAMESE,
  CATEGORY_CAFES,
  CATEGORY_LOCAL_KNOWLEDGE
];

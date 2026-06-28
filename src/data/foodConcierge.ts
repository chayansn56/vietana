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
// MOCK DATA ECOSYSTEM
// ---------------------------------------------------------------------------

const ROYAL_INDIAN: RestaurantDetails = {
  id: 'royal-indian',
  name: 'Royal Indian',
  city: 'Ho Chi Minh City',
  cuisine: 'North Indian',
  priceRange: '$$',
  rating: 4.5,
  heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // Restaurant interior
  shortDesc: 'Authentic flavors from the north served in an elegant, welcoming space.',
  vietanaNotes: 'Perfect for families and first-time travelers. Open until late.',
  tags: ['Vegetarian Friendly', 'Family Friendly', 'Late Night'],
  suitableFor: ['Family', 'Groups', 'Late Night'],
  googleMapsUrl: 'https://maps.google.com',
};

const MI_QUANG_CO_VIEN: RestaurantDetails = {
  id: 'mi-quang-co-vien',
  name: 'Mì Quảng Cô Viên',
  city: 'Da Nang',
  cuisine: 'Vietnamese',
  priceRange: '$',
  rating: 4.8,
  heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', // Restaurant interior
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
  heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80', // Atmosphere/Market
  story: 'Comforting, rich, and deeply tied to the heritage of Central Vietnam. Best enjoyed in Da Nang and Hoi An.',
  vietanaNotes: 'One of our favorite dishes and a must-try for first-time visitors.',
  recommendedCities: ['Da Nang', 'Hoi An'],
};

// CATEGORIES

export const CATEGORY_INDIAN_COMFORT: ConciergeCategory = {
  id: 'indian-comfort',
  title: 'Indian Comfort',
  subtitle: 'Familiar flavors, wherever you are.',
  heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80', // Family dining
  collections: [
    {
      id: 'north-indian-classics',
      title: 'North Indian Classics',
      items: [ROYAL_INDIAN]
    },
    {
      id: 'family-friendly',
      title: 'Family Friendly',
      items: [ROYAL_INDIAN]
    }
  ]
};

export const CATEGORY_VEG_JAIN: ConciergeCategory = {
  id: 'vegetarian-jain',
  title: 'Vegetarian & Jain',
  subtitle: 'Pure, clean, and uncompromisingly delicious.',
  heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80', // Healthy lifestyle dining
  collections: [
    {
      id: 'pure-vegetarian',
      title: 'Pure Vegetarian',
      items: [ROYAL_INDIAN] // Just as a placeholder
    }
  ]
};

export const CATEGORY_VIETNAMESE: ConciergeCategory = {
  id: 'vietnamese-favorites',
  title: 'Vietnamese Favorites',
  subtitle: 'The soul of Vietnam, served daily.',
  heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', // Vibrant street scene / restaurant
  collections: [
    {
      id: 'mi-quang',
      title: 'Mi Quang',
      items: [MI_QUANG_CO_VIEN, DISH_MI_QUANG]
    }
  ]
};

export const CATEGORY_CAFES: ConciergeCategory = {
  id: 'cafes',
  title: 'Cafés & Hidden Gems',
  subtitle: 'Where time slows down.',
  heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80', // Cafe interior
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
  heroImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80', // Team eating together
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

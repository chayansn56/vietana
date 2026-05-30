import { Package, ServiceItem } from '../types';

export interface PackageData extends Package {
  destinations?: string[];
}

export const NAV_LINKS = [
  { key: 'services', href: '#services' },
  { key: 'packages', href: '#packages' },
  { key: 'aiPlanner', href: '#', isPlanner: true },
  { key: 'food', href: '#food' },
  { key: 'experiences', href: '#hidden' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  { ico: 'ClipboardList', key: 'visa' },
  { ico: 'Map', key: 'planning' },
  { ico: 'Car', key: 'pickup' },
  { ico: 'Building', key: 'hotel' },
  { ico: 'Wifi', key: 'sim' },
  { ico: 'Ticket', key: 'tickets' },
  { ico: 'Soup', key: 'food' },
  { ico: 'Sparkles', key: 'tailored' },
  { ico: 'MessageCircle', key: 'support' }
];

export const PACKAGES: PackageData[] = [
  { t: 'Best Heritage Sites', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/World%20heritage%20sites%20Vietnam%20travel_0.jpg', b: 'Culture & History', d: 'Explore UNESCO attractions.', destinations: ['Hanoi', 'Halong Bay', 'Hue', 'Hoi An'] },
  { t: 'Adventure Trails', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Adventure%20itinerary%20Vietnam.jpg', b: 'Thrills', d: 'Exciting outdoor experiences.', destinations: ['Sapa', 'Da Nang', 'Da Lat', 'Ninh Binh'] },
  { t: 'Couples’ Retreat', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Romantic%20getaway%20Vietnam.jpg', b: 'Romantic', d: 'Timeless romantic getaways.', destinations: ['Phu Quoc', 'Da Lat', 'Hoi An'] },
  { t: 'Coast and Islands', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Vietnam%20beach%20holiday.jpg', b: 'Beaches', d: 'Soak up the sun.', destinations: ['Da Nang', 'Nha Trang', 'Phu Quoc'] },
  { t: 'Family Vacation', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Family%20holiday%20in%20Vietnam.jpg', b: 'All Ages', d: 'Nature and culture for all ages.', destinations: ['Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Phu Quoc'] },
  { t: 'Green Getaway', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Green%20travel%20ideas%20Vietnam.jpg', b: 'Eco-Tourism', d: 'Pristine, sustainable travel.', destinations: ['Ninh Binh', 'Sapa', 'Da Lat'] }
];

export const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1531737212413-667205e1cda7?auto=format&fit=crop&w=1920&q=80', // Misty/Light Halong Bay
  'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1920&q=80', // HCMC River
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80', // Hoi An Lanterns
  'https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?auto=format&fit=crop&w=1920&q=80', // Ninh Binh landscape
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1920&q=80' // Mountain terraces
];

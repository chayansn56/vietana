import { Package, ServiceItem } from '../types';

export interface PackageData extends Package {
  destinations?: string[];
}

export const NAV_LINKS = [
  { key: 'destinations', href: '#destinations' },
  { key: 'essentials', href: '#services' },
  { key: 'food', href: '#food' },
  { key: 'experiences', href: '#experiences', isExperiences: true },
  { key: 'journal', href: '#journal' },
  { key: 'team', href: '#team' },
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
  { t: 'Food Adventures', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80', b: '🍜 Culinary', d: 'Taste your way through the streets of Vietnam.', destinations: ['Hanoi', 'Hoi An', 'Ho Chi Minh City'] },
  { t: 'Beach Escapes', img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1600&q=80', b: '🏖 Relaxation', d: 'Pristine white sands and crystal clear waters.', destinations: ['Phu Quoc', 'Nha Trang', 'Da Nang'] },
  { t: 'Honeymoons', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80', b: '💕 Romance', d: 'Intimate moments and unforgettable sunsets.', destinations: ['Da Lat', 'Ha Long Bay', 'Hoi An'] },
  { t: 'Family Holidays', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80', b: '👨‍👩‍👧 All Ages', d: 'Memories the whole family will cherish.', destinations: ['Da Nang', 'Ninh Binh', 'Ho Chi Minh City'] },
  { t: 'City Discovery', img: 'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=1600&q=80', b: '🏙 Urban', d: 'Vibrant nightlife, culture, and architecture.', destinations: ['Ho Chi Minh City', 'Hanoi'] },
  { t: 'Luxury Vietnam', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80', b: '✨ Premium', d: 'The absolute pinnacle of luxury and service.', destinations: ['Ha Long Bay', 'Phu Quoc', 'Ninh Binh'] }
];

export const HERO_SLIDES = [
  '/hero_sapa.png',
  '/hero_hoian.png',
  '/hero_halong.png',
  '/hero_2.png',
  '/hero_4.png',
  '/hero_5.png'
];

export const VIETNAM_TOP_10 = [
  'https://images.unsplash.com/photo-1531737212413-667205e1cda7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1534008757030-27299c4371b6?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1920&q=80'
];

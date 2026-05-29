import { Package, ServiceItem } from '../types';

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

export const PACKAGES: Package[] = [
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

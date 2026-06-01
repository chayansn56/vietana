export interface Destination {
  name: string;
  time: string;
  desc: string;
  lat: number;
  lng: number;
  img: string;
  images?: string[];
}

export interface Experience {
  id: number;
  t: string;
  d: string;
  lat: number;
  lng: number;
  img: string;
}

export interface FoodItem {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  img: string;
}

export interface MagicDestination {
  label: string;
  desc: string;
}

export interface Package {
  t: string;
  img: string;
  b: string;
  d: string;
}

export interface ServiceItem {
  ico: string;
  key: string;
}

export interface TripEstimate {
  flight: number;
  visa: number;
  transfers: number;
  hotels: number;
  food: number;
  transport: number;
  experiences: number;
  dailyTotal: number;
  total: number;
}

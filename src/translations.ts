import { en } from './locales/en';
import { hi } from './locales/hi';
import { vi } from './locales/vi';

export type Language = 'EN' | 'HI' | 'VI';

export interface TranslationSchema {
  nav: {
    destinations: string;
    experiences: string;
    journal: string;
    team: string;
    cta: string;
    essentials?: string;
    food?: string;
    flights?: string;
  };
  hero: {
    welcome: string;
    tagline: string;
    sub: string;
    support: string;
    discover: string;
    plan: string;
  };
  services: {
    title: string;
    subtitle: string;
    ghost: string;
    visa: { t: string; d: string };
    planning: { t: string; d: string };
    pickup: { t: string; d: string };
    hotel: { t: string; d: string };
    sim: { t: string; d: string };
    tickets: { t: string; d: string };
    food: { t: string; d: string };
    tailored: { t: string; d: string };
    support: { t: string; d: string };
  };
  food: {
    title: string;
    heading: string;
    sub: string;
    filters: { all: string; veg: string; nonVeg: string };
  };
  exp: {
    title: string;
    heading: string;
    sub: string;
    orb: string;
    reset: string;
  };
  planner: {
    title: string;
    tagline: string;
    greeting: string;
    where: string;
    live: string;
    status: string;
    labels: {
      vibe: string;
      style: string;
      food: string;
      group: string;
      nightlife: string;
      focus: string;
      extras: string;
    };
    email: string;
  };
  contact: {
    title: string;
    heading: string;
    sub: string;
    cta: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  EN: en,
  HI: hi,
  VI: vi
};

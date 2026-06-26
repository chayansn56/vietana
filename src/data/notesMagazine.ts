export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  id: string;
  title: string;
  intro: string;
  image: string;
  author?: string;
  sourceName?: string;
  sourceUrl?: string;
  isComingSoon?: boolean;
  sections?: ArticleSection[];
}

export interface Collection {
  id: string;
  icon: string;
  title: string;
  image: string;
  articles: Article[];
}

import { essentialsArticles } from './journal/essentials';
import { destinationsArticles } from './journal/destinations';
import { foodArticles } from './journal/food';
import { honeymoonArticles } from './journal/honeymoons';
import { familyArticles } from './journal/family';
import { coffeeArticles } from './journal/coffee';
import { hiddenArticles } from './journal/hidden';
import { nightlifeArticles } from './journal/nightlife';

export const magazineData = {
  featured: [
    {
      id: "f1",
      title: "The Ultimate Guide to Getting a Vietnam E-Visa for Indian Citizens (2025)",
      intro: "Everything you need to know about applying for, tracking, and using your Vietnam e-Visa as an Indian passport holder.",
      author: "Vietana Visa Team",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80",
      sections: [
        {
          heading: "Vietnam E-Visa for Indians: The Basics",
          paragraphs: [
            "Vietnam is increasingly becoming the top choice for Indian travelers seeking luxury, culture, and natural beauty. Fortunately, the visa process for Indian citizens is entirely digital and highly efficient.",
            "Since August 2023, Vietnam has expanded its e-visa validity to 90 days for multiple entries, making it easier than ever to plan extended luxury itineraries or combine Vietnam with neighboring countries."
          ]
        },
        {
          heading: "Step-by-Step Application Process",
          paragraphs: [
            "Applying for a Vietnam e-visa takes about 10-15 minutes. Here is the exact process:"
          ],
          list: [
            "Visit the official Vietnam Immigration Portal (avoid third-party agencies charging premium fees for free forms).",
            "Upload a standard passport-sized photograph (4x6 cm) without glasses, and a clear scan of your passport data page.",
            "Fill out the application form with your exact details as printed on the passport.",
            "Pay the $25 USD processing fee using an international credit or debit card.",
            "Receive your registration code. The processing time is typically 3-5 working days."
          ]
        },
        {
          heading: "Why Vietana Handled Visas are Better",
          paragraphs: [
            "While the e-visa process is simple, minor errors (like incorrect date formats or uploading a blurry passport scan) can lead to delays or rejections at the immigration counter. At Vietana, we handle the entire visa process for you as part of our premium concierge service. You arrive, we handle the friction."
          ]
        }
      ]
    }
  ] as Article[],

  collections: [
    {
      id: "c1",
      icon: "✈️",
      title: "Travel Essentials",
      image: "https://images.unsplash.com/photo-1544252890-48e025805d76?w=800&q=80",
      articles: essentialsArticles
    },
    {
      id: "c2",
      icon: "📍",
      title: "Destinations",
      image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
      articles: destinationsArticles
    },
    {
      id: "c3",
      icon: "🍛",
      title: "Food & Culture",
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
      articles: foodArticles
    },
    {
      id: "c4",
      icon: "❤️",
      title: "Honeymoons",
      image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
      articles: honeymoonArticles
    },
    {
      id: "c5",
      icon: "👨‍👩‍👧",
      title: "Family Journeys",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
      articles: familyArticles
    },
    {
      id: "c6",
      icon: "☕",
      title: "Coffee & Cafés",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
      articles: coffeeArticles
    },
    {
      id: "c7",
      icon: "🏍",
      title: "Hidden Vietnam",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      articles: hiddenArticles
    },
    {
      id: "c8",
      icon: "🌃",
      title: "Nightlife",
      image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
      articles: nightlifeArticles
    }
  ] as Collection[]
};

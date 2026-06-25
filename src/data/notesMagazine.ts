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

export const magazineData = {
  featured: [
    {
      id: "f1",
      title: "The Ultimate Guide to Getting a Vietnam E-Visa for Indian Citizens (2025)",
      intro: "Everything you need to know about applying for, tracking, and using your Vietnam e-Visa as an Indian passport holder.",
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
    },
    {
      id: "f2",
      title: "Top Indian & Jain Restaurants in Ho Chi Minh City",
      intro: "A curated guide to finding authentic vegetarian and Jain-friendly dining in Vietnam's most vibrant city.",
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=1600&q=80",
      sections: [
        {
          heading: "Navigating Vietnam as a Vegetarian",
          paragraphs: [
            "Vietnam is a food lover's paradise, but for Indian travelers with strict dietary requirements—such as pure vegetarian or Jain diets—it can be intimidating. The language barrier often makes it difficult to ensure no fish sauce or meat broth is used.",
            "However, Ho Chi Minh City has a thriving Indian community and an incredible selection of authentic Indian restaurants that cater specifically to these needs."
          ]
        },
        {
          heading: "Our Top Recommendations",
          list: [
            "Shanti Indian Cuisine - Located in District 1, they offer a separate Jain menu and exceptional North Indian curries.",
            "Baba's Kitchen - A staple on Bui Vien street. Known for their generous portions and strict adherence to vegetarian prep upon request.",
            "Dalcheeni - For a more upscale dining experience offering royal Indian cuisine by the Saigon River.",
            "Benaras - Club & Restaurant - Offering modern Indian fusion in a premium setting, perfect for an evening out."
          ]
        },
        {
          heading: "The Vietana Food Concierge",
          paragraphs: [
            "When you travel with Vietana, you never have to worry about your next meal. We curate daily dining reservations based on your exact dietary profile, ensuring that every meal is both culturally immersive and strictly adheres to your preferences—whether that is pure veg, Jain, or Halal."
          ]
        }
      ]
    },
    {
      id: "f3",
      title: "Top Places To Visit In Vietnam",
      intro: "From the northern mountains to the southern delta, discover the absolute best places to visit.",
      image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=1600&q=80",
      sourceName: "Lonely Planet",
      sourceUrl: "https://www.lonelyplanet.com/articles/best-places-to-visit-in-vietnam"
    }
  ] as Article[],

  collections: [
    {
      id: "c1",
      icon: "✈️",
      title: "Travel Essentials",
      image: "https://images.unsplash.com/photo-1544252890-48e025805d76?w=800&q=80",
      articles: [
        {
          id: "te1",
          title: "Vietnam Travel Guide",
          intro: "The official guide to exploring Vietnam.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sourceName: "Vietnam Travel",
          sourceUrl: "https://vietnam.travel/"
        },
        {
          id: "te2",
          title: "First-Time Visitor Guide",
          intro: "Essential tips for your first time in Vietnam.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/articles/vietnam-tips-a-guide"
        },
        {
          id: "te3",
          title: "Traveling On A Budget",
          intro: "How to see the best of Vietnam without breaking the bank.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/articles/vietnam-on-a-budget"
        },
        {
          id: "te4",
          title: "Getting Around Vietnam",
          intro: "Planes, trains, and automobiles: navigating the country.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/articles/getting-around-vietnam"
        },
        {
          id: "te5",
          title: "Best Time To Visit Vietnam",
          intro: "Understanding the complex weather systems of Vietnam.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/articles/best-time-to-visit-vietnam"
        }
      ]
    },
    {
      id: "c2",
      icon: "📍",
      title: "Destinations",
      image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
      articles: [
        {
          id: "d1",
          title: "Ho Chi Minh City",
          intro: "The bustling southern metropolis formerly known as Saigon.",
          image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/destinations/vietnam/ho-chi-minh-city"
        },
        {
          id: "d2",
          title: "Hanoi",
          intro: "The historic and cultured capital in the north.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sourceName: "Lonely Planet",
          sourceUrl: "https://www.lonelyplanet.com/destinations/vietnam/hanoi"
        },
        {
          id: "d3",
          title: "Da Nang",
          intro: "The rapidly growing coastal city with beautiful beaches and mountains.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          isComingSoon: true
        },
        {
          id: "d4",
          title: "Hoi An",
          intro: "The incredibly charming ancient town famous for its lanterns.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          isComingSoon: true
        },
        {
          id: "d5",
          title: "Phu Quoc",
          intro: "Vietnam's premier island getaway with stunning resorts.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          isComingSoon: true
        }
      ]
    },
    {
      id: "c3",
      icon: "🍛",
      title: "Food & Culture",
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
      articles: [
        {
          id: "fc1",
          title: "Indian Food in Vietnam",
          intro: "Where to find the best dal makhani and garlic naan when you're craving home.",
          image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
          isComingSoon: true
        },
        {
          id: "fc2",
          title: "Vegetarian Vietnam",
          intro: "A complete guide to navigating and enjoying Vietnam as a vegetarian.",
          image: "https://images.unsplash.com/photo-1544252890-48e025805d76?w=800&q=80",
          sourceName: "Vietnam Travel",
          sourceUrl: "https://vietnam.travel/things-to-do/vegetarian-guide-vietnam"
        },
        {
          id: "fc3",
          title: "Coffee Culture",
          intro: "Understanding the deep roots of Vietnamese coffee and cafe life.",
          image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
          isComingSoon: true
        },
        {
          id: "fc4",
          title: "Mi Quang Explained",
          intro: "The ultimate guide to central Vietnam's most famous noodle dish.",
          image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
          isComingSoon: true
        },
        {
          id: "fc5",
          title: "Jain-Friendly Vietnam",
          intro: "How to travel Vietnam while strictly adhering to Jain dietary requirements.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          isComingSoon: true
        }
      ]
    },
    {
      id: "c4",
      icon: "❤️",
      title: "Honeymoons",
      image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
      articles: []
    },
    {
      id: "c5",
      icon: "👨‍👩‍👧",
      title: "Family Journeys",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
      articles: []
    },
    {
      id: "c6",
      icon: "☕",
      title: "Coffee & Cafés",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
      articles: []
    },
    {
      id: "c7",
      icon: "🏍",
      title: "Hidden Vietnam",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      articles: []
    },
    {
      id: "c8",
      icon: "🌃",
      title: "Nightlife",
      image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
      articles: []
    }
  ] as Collection[]
};

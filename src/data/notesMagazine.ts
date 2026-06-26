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
            "Since August 2023, Vietnam has expanded its e-visa validity to 90 days for multiple entries, making it easier than ever to plan extended luxury itineraries."
          ]
        },
        {
          heading: "Step-by-Step Application Process",
          paragraphs: ["Applying for a Vietnam e-visa takes about 10-15 minutes. Here is the exact process:"],
          list: [
            "Visit the official Vietnam Immigration Portal.",
            "Upload a standard passport-sized photograph (4x6 cm) without glasses, and a clear scan of your passport data page.",
            "Fill out the application form with your exact details as printed on the passport.",
            "Pay the $25 USD processing fee using an international credit or debit card."
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
      articles: [
        {
          id: "te1", title: "Packing for Two Climates: North vs South", author: "Priya Sharma",
          intro: "How to pack smartly when your itinerary includes the chilly mountains of Sapa and the tropical heat of Ho Chi Minh City.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "The Climate Divide",
            paragraphs: ["Vietnam is long and narrow, meaning you can experience winter in Hanoi while sweating in Saigon. Always pack layers.", "A light down jacket is essential for the north in December, while breathable cottons are perfect for the south."]
          }]
        },
        {
          id: "te2", title: "Mastering the Grab App in Vietnam", author: "Anonymous",
          intro: "A complete guide to using Vietnam's most essential ride-hailing and food delivery app without getting scammed.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sections: [{
            heading: "Your Digital Chauffeur",
            paragraphs: ["Grab is the Uber of Southeast Asia. Link your credit card before arriving to avoid carrying cash.", "Always double-check the license plate, and never accept rides from drivers who ask you to cancel the app booking."]
          }]
        },
        {
          id: "te3", title: "Money Matters: Cash, Cards, and ATMs", author: "Rahul Desai",
          intro: "Everything you need to know about currency exchange, zero-forex cards, and the best ATMs for Indian travelers.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "Navigating the Dong",
            paragraphs: ["Vietnamese currency has a lot of zeros! 1 USD is roughly 25,000 VND.", "Most premium places accept cards, but keep cash for street food. Agribank and VPBank usually have higher withdrawal limits for international cards."]
          }]
        },
        {
          id: "te4", title: "Staying Connected: E-SIMs vs Local SIMs", author: "Anjali Gupta",
          intro: "Our honest review of Viettel, Vinaphone, and Mobifone, and the easiest way to get 4G data upon landing.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Staying Online",
            paragraphs: ["Viettel offers the best coverage in remote areas like Ha Giang. For city hoppers, an E-SIM purchased online before departure is the most frictionless option."]
          }]
        },
        {
          id: "te5", title: "The Essential Vietnamese Phrasebook", author: "Anonymous",
          intro: "10 basic phrases that will earn you a smile and better service from locals across the country.",
          image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
          sections: [{
            heading: "Speak Like a Local",
            paragraphs: ["A little effort goes a long way. Learn 'Xin chào' (Hello) and 'Cảm ơn' (Thank you). Note that pronunciation relies heavily on tones, so don't be afraid to use translation apps to bridge the gap."]
          }]
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
          id: "d1", title: "48 Hours in Hanoi's Old Quarter", author: "Vikram Singh",
          intro: "A whirlwind two-day itinerary covering the best egg coffee, historical sites, and hidden alleyways in the capital.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "The Ancient Capital",
            paragraphs: ["Hanoi is a sensory overload. Spend your morning wandering the 36 streets, each historically dedicated to a specific trade. Don't miss the Water Puppet Theatre in the evening."]
          }]
        },
        {
          id: "d2", title: "Finding Peace in Ninh Binh", author: "Anonymous",
          intro: "Why the 'Halong Bay on land' should be at the absolute top of your Northern Vietnam travel list.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Limestone Magic",
            paragraphs: ["Trang An offers peaceful boat rides through caves and towering karsts. It's significantly less crowded than Halong Bay and offers stunning bicycle routes through rice paddies."]
          }]
        },
        {
          id: "d3", title: "The Magic of Hoi An's Lantern Festival", author: "Meera Patel",
          intro: "A first-hand account of experiencing the full moon lantern festival in Vietnam's most romantic ancient town.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "A City Aglow",
            paragraphs: ["Every full moon, the old town turns off its electric lights. The river fills with floating paper lanterns, creating an atmosphere that feels entirely suspended in time."]
          }]
        },
        {
          id: "d4", title: "Da Lat: A Slice of Europe in Asia", author: "Karan & Neha",
          intro: "Exploring the cool climate, pine forests, and French colonial architecture of the Central Highlands.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          sections: [{
            heading: "The City of Eternal Spring",
            paragraphs: ["Escape the heat in Da Lat. Known for its flower farms, quirky architecture like the Crazy House, and romantic lakes, it's a favorite getaway for locals and expats alike."]
          }]
        },
        {
          id: "d5", title: "Beyond Phu Quoc: The Con Dao Islands", author: "Anonymous",
          intro: "Ditching the crowds to explore Vietnam's most pristine and historically significant archipelago.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sections: [{
            heading: "Untouched Paradise",
            paragraphs: ["Con Dao is what Phu Quoc was 15 years ago. Expect empty beaches, incredible scuba diving, and a poignant history rooted in its past as a penal colony."]
          }]
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
          id: "fc1", title: "A Vegetarian's Guide to Street Food", author: "Sneha Reddy",
          intro: "How to safely navigate the bustling street food scene when you don't eat meat or seafood.",
          image: "https://images.unsplash.com/photo-1544252890-48e025805d76?w=800&q=80",
          sections: [{
            heading: "Eating 'Chay'",
            paragraphs: ["Look for the word 'Chay' (vegetarian) on restaurant signs. Many local Buddhists eat vegetarian on the 1st and 15th of the lunar month, so options are plentiful if you know where to look."]
          }]
        },
        {
          id: "fc2", title: "The Art of the Vietnamese Ao Dai", author: "Anonymous",
          intro: "Understanding the history, significance, and where to get a custom-tailored traditional dress in just 24 hours.",
          image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
          sections: [{
            heading: "Elegance Tailored",
            paragraphs: ["Hoi An is the tailoring capital of Vietnam. Getting an Ao Dai made to your exact measurements is an experience in itself, taking just 24 hours and showcasing incredible local craftsmanship."]
          }]
        },
        {
          id: "fc3", title: "Finding Authentic Jain Food in Saigon", author: "The Mehta Family",
          intro: "Our journey discovering restaurants that perfectly cater to strict Jain dietary requirements.",
          image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
          sections: [{
            heading: "No Roots, No Problem",
            paragraphs: ["District 1 in Ho Chi Minh City has a surprising number of Indian restaurants willing to prepare food without onion, garlic, or root vegetables. Shanti and Baba's Kitchen are our top picks."]
          }]
        },
        {
          id: "fc4", title: "The Mid-Autumn Festival", author: "Arjun Kapoor",
          intro: "Mooncakes, dragon dances, and celebrating one of Vietnam's most important cultural holidays.",
          image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
          sections: [{
            heading: "Children's Festival",
            paragraphs: ["Tet Trung Thu is magical. Streets in Cho Lon (Chinatown) are flooded with colorful lanterns and the rhythmic drumming of lion dances echoes through the night."]
          }]
        },
        {
          id: "fc5", title: "From Phở to Bún Chả: A Noodle Story", author: "Anonymous",
          intro: "Decoding the incredible variety of Vietnamese noodle soups beyond the internationally famous Pho.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "Beyond Pho",
            paragraphs: ["While Pho is iconic, dishes like Bun Bo Hue (spicy beef noodle soup) and Bun Cha (grilled pork with noodles) offer entirely different flavor profiles that define regional Vietnamese cuisine."]
          }]
        }
      ]
    },
    {
      id: "c4",
      icon: "❤️",
      title: "Honeymoons",
      image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
      articles: [
        {
          id: "hm1", title: "A Luxury Escape to Six Senses Ninh Van Bay", author: "Rohan & Aisha",
          intro: "Our dream honeymoon spent in a private pool villa accessible only by boat.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sections: [{
            heading: "Barefoot Luxury",
            paragraphs: ["Tucked away on a dramatic bay, this resort defines seclusion. Waking up to panoramic ocean views from our hilltop villa was the ultimate post-wedding relaxation."]
          }]
        },
        {
          id: "hm2", title: "Cruising Halong Bay in Style", author: "Anonymous",
          intro: "Why booking a boutique luxury cruise was the best decision we made for our romantic getaway.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Sailing the Karsts",
            paragraphs: ["Skip the day boats and opt for a 2-night boutique cruise. Watching the sunset over the limestone pillars from a private balcony with a glass of champagne is unforgettable."]
          }]
        },
        {
          id: "hm3", title: "The Romance of Hoi An at Twilight", author: "Deepak & Simran",
          intro: "Sunset boat rides, tailored suits, and candlelit dinners by the Thu Bon River.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "Lantern-lit Nights",
            paragraphs: ["Hoi An was made for couples. We highly recommend booking a private wooden boat at dusk to release paper lanterns onto the river for good luck in your marriage."]
          }]
        },
        {
          id: "hm4", title: "Secluded Luxury in Phu Quoc", author: "Anonymous",
          intro: "Finding the perfect resort away from the crowds for a deeply relaxing retreat.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "Island Solitude",
            paragraphs: ["Phu Quoc's southern tip is bustling, but the north holds hidden luxury gems. Resorts here offer private beaches where you feel like the only two people on the island."]
          }]
        },
        {
          id: "hm5", title: "A Couple's Spa Journey in Da Nang", author: "Varun & Shruti",
          intro: "Reviewing the best couples' wellness retreats and mud baths on the central coast.",
          image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
          sections: [{
            heading: "Healing Waters",
            paragraphs: ["Da Nang's luxury resorts have mastered the art of wellness. A private couples' mud bath followed by a traditional Vietnamese massage is the perfect way to unwind."]
          }]
        }
      ]
    },
    {
      id: "c5",
      icon: "👨‍👩‍👧",
      title: "Family Journeys",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
      articles: [
        {
          id: "fj1", title: "Navigating Vietnam with Toddlers", author: "The Joshi Family",
          intro: "Tips, tricks, and the realities of traveling with strollers and young children in bustling cities.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          sections: [{
            heading: "Embracing the Chaos",
            paragraphs: ["Strollers are tough on Hanoi's sidewalks. We recommend a good baby carrier. Locals adore children, so expect your little ones to be treated like royalty everywhere you go."]
          }]
        },
        {
          id: "fj2", title: "Sun World Ba Na Hills: A Kid's Paradise", author: "Anonymous",
          intro: "Is the Golden Bridge and French Village worth the hype? A family review.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Theme Park in the Clouds",
            paragraphs: ["Accessible by a record-breaking cable car, Ba Na Hills features indoor arcades, rides, and the famous hands bridge. It's a full day of exhausting, incredible fun for kids."]
          }]
        },
        {
          id: "fj3", title: "Educational Travel: The Cu Chi Tunnels", author: "Rajesh Kumar",
          intro: "How to make a trip to the historic tunnels engaging and educational for teenagers.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "Living History",
            paragraphs: ["Crawling through the widened tunnels gives teens a visceral understanding of history that textbooks can't provide. It's eye-opening and highly recommended for older kids."]
          }]
        },
        {
          id: "fj4", title: "A Family Cooking Class in Hoi An", author: "The Agarwal Family",
          intro: "Farming in Tra Que village and learning to roll our own fresh spring rolls together.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "Farm to Table",
            paragraphs: ["We spent the morning wearing conical hats, watering herbs, and then cooking lunch. It was the perfect hands-on activity that kept everyone from ages 8 to 80 engaged."]
          }]
        },
        {
          id: "fj5", title: "Beach Days in Nha Trang", author: "Anonymous",
          intro: "Why this coastal city is the ultimate stress-free beach destination for families with kids of all ages.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sections: [{
            heading: "Resort Living",
            paragraphs: ["With VinWonders amusement park on its own island and endless sandy beaches, Nha Trang offers easy, accessible family fun with top-tier resort amenities."]
          }]
        }
      ]
    },
    {
      id: "c6",
      icon: "☕",
      title: "Coffee & Cafés",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
      articles: [
        {
          id: "cc1", title: "The Ultimate Egg Coffee Trail in Hanoi", author: "Aditya Verma",
          intro: "We visited 5 famous cafes to find the absolute best Cà Phê Trứng in the city.",
          image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
          sections: [{
            heading: "Liquid Tiramisu",
            paragraphs: ["Invented during a milk shortage, egg coffee is whipped egg yolks, sugar, and condensed milk over strong robusta. Cafe Giang remains the original and best."]
          }]
        },
        {
          id: "cc2", title: "Coconut Coffee: The Perfect Summer Drink", author: "Anonymous",
          intro: "Why Cong Caphe's signature icy coconut coffee became our daily obsession in Vietnam.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "Tropical Caffeine",
            paragraphs: ["Blending frozen coconut cream with rich Vietnamese espresso creates a slushy-like beverage that perfectly combats the intense afternoon heat of Saigon."]
          }]
        },
        {
          id: "cc3", title: "Hidden Cafe Apartments of Saigon", author: "Kriti Sanon",
          intro: "Exploring the iconic 9-story cafe apartment building on Nguyen Hue Walking Street.",
          image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
          sections: [{
            heading: "Vertical Cafe Hopping",
            paragraphs: ["Pay 3,000 VND for the elevator, go to the top, and walk down. Each floor reveals uniquely designed boutique cafes, vintage shops, and stunning balcony views."]
          }]
        },
        {
          id: "cc4", title: "Salt Coffee in Hue: A Strange Delight", author: "Anonymous",
          intro: "Discovering the salty, sweet, and creamy coffee creation born in the imperial city.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "The Salty Secret",
            paragraphs: ["A layer of salty cream balances the bitterness of the coffee and the sweetness of the condensed milk, creating a complex and highly addictive flavor profile."]
          }]
        },
        {
          id: "cc5", title: "The Slow Drip: Understanding Phin Coffee", author: "Ravi & Pooja",
          intro: "The history of the Vietnamese Phin filter and why good things take time.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "Patience in a Cup",
            paragraphs: ["Watching coffee slowly drip through a metal filter into a pool of condensed milk forces you to slow down. It's a daily meditation practiced by millions of locals."]
          }]
        }
      ]
    },
    {
      id: "c7",
      icon: "🏍",
      title: "Hidden Vietnam",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      articles: [
        {
          id: "hv1", title: "Motorbiking the Ha Giang Loop", author: "Kabir Singh",
          intro: "Four days of breathtaking mountain passes, remote villages, and unparalleled freedom.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          sections: [{
            heading: "The Final Frontier",
            paragraphs: ["The far north offers the most dramatic scenery in Southeast Asia. Deep canyons, winding roads, and the rich culture of ethnic minority groups make this an epic adventure."]
          }]
        },
        {
          id: "hv2", title: "Exploring the Caves of Phong Nha", author: "Anonymous",
          intro: "Venture deep into the jungle to see some of the largest and most spectacular caves on earth.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Subterranean Wonders",
            paragraphs: ["Home to the world's largest cave (Son Doong), this national park is a playground for adventurers. Even the accessible caves like Paradise Cave are mind-blowing in scale."]
          }]
        },
        {
          id: "hv3", title: "The Quiet Charm of Quy Nhon", author: "Neha Sharma",
          intro: "Ditching Da Nang and Nha Trang for a sleepy coastal town with untouched beaches.",
          image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
          sections: [{
            heading: "The Empty Coast",
            paragraphs: ["Ky Co beach boasts crystal clear waters without the massive crowds. Quy Nhon is perfect for travelers wanting to experience authentic coastal living."]
          }]
        },
        {
          id: "hv4", title: "Homestay Life in Mai Chau", author: "Anonymous",
          intro: "Sleeping in a traditional stilt house and waking up to misty rice paddies.",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
          sections: [{
            heading: "Valley Retreat",
            paragraphs: ["Just a few hours from Hanoi, Mai Chau offers a peaceful escape. Cycling through the rice fields and eating home-cooked meals with a White Thai family is unforgettable."]
          }]
        },
        {
          id: "hv5", title: "The Floating Markets of the Mekong", author: "Siddharth Rao",
          intro: "Waking up at 4 AM to witness the chaotic, colorful trading on the river.",
          image: "https://images.unsplash.com/photo-1550686524-7e50eb956334?w=800&q=80",
          sections: [{
            heading: "Life on the Water",
            paragraphs: ["Cai Rang floating market is a whirlwind of boats tossing pineapples and serving hot noodle soup directly over the water. A fascinating glimpse into Delta life."]
          }]
        }
      ]
    },
    {
      id: "c8",
      icon: "🌃",
      title: "Nightlife",
      image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
      articles: [
        {
          id: "nl1", title: "Rooftop Bars of Ho Chi Minh City", author: "Rohan Das",
          intro: "Where to find the best cocktails and panoramic views of the glittering skyline.",
          image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&q=80",
          sections: [{
            heading: "Sky High Elegance",
            paragraphs: ["From the historic Saigon Saigon Bar to the ultra-modern Chill Skybar, the city's rooftop scene is world-class. Dress to impress and enjoy the sunset."]
          }]
        },
        {
          id: "nl2", title: "Bia Hoi Corner: Hanoi's Cheap Beer Culture", author: "Anonymous",
          intro: "Sitting on tiny plastic stools and drinking fresh beer for 20 cents a glass.",
          image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
          sections: [{
            heading: "The Plastic Stool Experience",
            paragraphs: ["Ta Hien street is chaotic, loud, and incredibly fun. Bia Hoi is brewed daily and drinking it elbow-to-elbow with locals is a quintessential Hanoi experience."]
          }]
        },
        {
          id: "nl3", title: "Beach Clubs in Da Nang", author: "Natasha Gill",
          intro: "Fire shows, DJs, and dancing by the ocean until the early hours.",
          image: "https://images.unsplash.com/photo-1559828456-11f81d86d6ba?w=800&q=80",
          sections: [{
            heading: "Oceanfront Parties",
            paragraphs: ["My Khe beach transforms at night. Venues like Sailing Club offer fire dancers, international DJs, and premium cabanas right on the sand."]
          }]
        },
        {
          id: "nl4", title: "The Speakeasies of Saigon", author: "Anonymous",
          intro: "Finding the hidden, unmarked cocktail bars tucked away in old colonial buildings.",
          image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
          sections: [{
            heading: "Hidden Mixology",
            paragraphs: ["Behind unmarked doors and up dark staircases lie some of Asia's best cocktail bars, serving innovative drinks infused with local ingredients like fish sauce and pho spices."]
          }]
        },
        {
          id: "nl5", title: "A Night on the Saigon River", author: "Vikram & Ananya",
          intro: "Reviewing the luxury dinner cruises that offer a different perspective of the city at night.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
          sections: [{
            heading: "Cruising the Metropolis",
            paragraphs: ["Floating past the illuminated Landmark 81 building while enjoying a five-course dinner and live jazz is the perfect way to spend your final night in Vietnam."]
          }]
        }
      ]
    }
  ] as Collection[]
};

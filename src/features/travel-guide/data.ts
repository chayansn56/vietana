export interface Article {
  id: string;
  title: string;
  keywords: string[];
  content: string;
  category: 'planning' | 'in-vietnam' | 'help';
}

export const ARTICLES: Article[] = [
  {
    id: 'visa',
    title: 'Vietnam Visa Guide',
    keywords: ['visa', 'evisa', 'passport', 'fee', 'processing', 'approval'],
    category: 'planning',
    content: `
      ## Vietnam e-Visa for Indian Passport Holders
      
      Vietnam offers a simple online e-Visa for citizens of India. Here is everything you need to know to get your e-Visa processed smoothly.
      
      ### 📋 Visa Requirements
      - **Passport Validity**: Minimum of 6 months remaining from your planned entry date.
      - **Passport Scan**: Clear color copy of your passport photo page (JPG/PNG format).
      - **Portrait Photo**: Clear portrait photo (4x6 cm, white background, no glasses).
      
      ### ⏱️ Processing Timelines & Fees
      - **Standard Processing**: 3 - 5 business days.
      - **Official Fee**: $25 USD (Single Entry) or $50 USD (Multiple Entry).
      - **Emergency Processing**: Available through VIETANA support channels if needed under 24 hours.
      
      ### 🔗 Actionable Step
      - Apply only via the official government portal or request direct assistance from the VIETANA Operations Team.
      - Planning your trip budget? Visit our **[Budget Planner](/travel-guide/budget)**.
    `
  },
  {
    id: 'budget',
    title: 'Budget Planner',
    keywords: ['budget', 'cost', 'price', 'inr', 'rupee', 'expense', 'hotel', 'flight'],
    category: 'planning',
    content: `
      ## Vietnam Travel Budget Planner (in INR)
      
      Estimate your total holiday expenses before departing. Vietnam offers incredible luxury at extremely reasonable rates.
      
      ### 💰 Average Cost Breakdown (per traveler)
      - **Flights**: ₹28,000 - ₹35,000 (Roundtrip Delhi/Mumbai to Da Nang/Hanoi).
      - **Accommodation (Comfort Tier)**: ₹4,500 - ₹6,000 per night (Double occupancy).
      - **Accommodation (Luxury Tier)**: ₹12,000 - ₹25,000 per night (5-star resorts).
      - **Meals & Daily Out-of-Pocket**: ₹1,500 - ₹3,000 per day (Includes premium dining & transfers).
      
      ### 💡 Budget Optimization Tips
      - Mid-week flight departures are usually ₹5,000 cheaper than weekends.
      - Book hotels 30-45 days in advance.
      - Wondering when to travel? View our **[Best Time to Visit](/travel-guide/weather)** guide.
    `
  },
  {
    id: 'weather',
    title: 'Best Time to Visit',
    keywords: ['weather', 'season', 'month', 'rain', 'temperature', 'climate', 'best time'],
    category: 'planning',
    content: `
      ## Weather Seasons in Vietnam
      
      Vietnam has a diverse climate. The best time to visit depends heavily on which regions you are exploring.
      
      ### 🌤️ Weather by Region
      - **North (Hanoi & Halong Bay)**: Best from October to April (Cool, dry winters). May to September is hot and rainy.
      - **Central (Da Nang & Hoi An)**: Best from February to August (Sunny beach weather). Avoid October to December (Typhoon season).
      - **South (Saigon & Mekong Delta)**: Warm year-round. Dry season is November to April. Rainy season is May to October (brief daily showers).
      
      ### 🏝️ Beach Tip
      - Looking for beaches? Read our **[Food & Dining Guide](/travel-guide/food)** to find dining options in Da Nang.
    `
  },
  {
    id: 'food',
    title: 'Food Guide',
    keywords: ['food', 'vegetarian', 'jain', 'dining', 'restaurant', 'meal', 'breakfast'],
    category: 'in-vietnam',
    content: `
      ## Vegetarian & Jain Dining in Vietnam
      
      Finding vegetarian and Jain food is simple and fully mapped for Indian travelers.
      
      ### 🍜 Local Vegetarian (Chay) Cuisine
      - Vietnamese Buddhism ensures a rich variety of vegan/vegetarian dining. Look for restaurants with signs displaying **"Quán Chay"** (Vegetarian Eatery).
      - Popular dishes: *Phở Chay* (Veg noodle soup), *Bánh Mì Chay* (Veg baguette sandwich).
      
      ### 🇮🇳 Indian & Jain Restaurants Hubs
      - **Da Nang**: Family Indian Restaurant, Maharaja Indian Restaurant (both offer full Jain menus).
      - **Hoi An**: Baba's Kitchen (located near Hoi An Ancient Town).
      - **Hanoi**: Namaste Hanoi, Khazaana Indian Restaurant.
    `
  },
  {
    id: 'transportation',
    title: 'Transportation Guidelines',
    keywords: ['transport', 'taxi', 'grab', 'flight', 'train', 'driver', 'car'],
    category: 'in-vietnam',
    content: `
      ## Getting Around Vietnam
      
      Vietnam offers modern, affordable transportation networks.
      
      ### 📱 Grab App (Recommended)
      - Download **Grab** before you land. It works exactly like Uber/Ola and avoids taxi fare disputes.
      - Set up your credit card in the app for cashless transactions.
      
      ### 🚗 Private Transfers
      - For inter-city transfers (e.g. Da Nang to Hoi An), booking private cars with English-speaking drivers is highly recommended. Contact VIETANA support to map this.
    `
  },
  {
    id: 'currency',
    title: 'Currency & Payments',
    keywords: ['currency', 'dong', 'vnd', 'money', 'cash', 'atm', 'card'],
    category: 'in-vietnam',
    content: `
      ## Managing Money in Vietnam
      
      The official currency is the **Vietnamese Dong (VND)**.
      
      ### 💵 Cash vs Cards
      - Vietnam is still a cash-heavy society. Street food vendors, local shops, and entry tickets require cash.
      - **Exchange Rate**: ₹1 INR is approximately 300 VND.
      - **Card Payments**: Widely accepted in comfort hotels and high-end restaurants.
    `
  },
  {
    id: 'esim',
    title: 'eSIM & Connectivity',
    keywords: ['esim', 'sim', 'internet', 'data', 'wifi', 'network'],
    category: 'in-vietnam',
    content: `
      ## Stay Connected in Vietnam
      
      High-speed mobile internet is available across Vietnam.
      
      ### 📶 eSIM (Recommended)
      - Purchase an eSIM online before you fly. Simply scan the QR code to activate data immediately upon landing.
      - Major reliable networks: **Viettel**, **Vinaphone**, **Mobifone**.
    `
  },
  {
    id: 'tips',
    title: 'Travel Tips',
    keywords: ['tips', 'etiquette', 'culture', 'dress', 'temple', 'custom'],
    category: 'help',
    content: `
      ## Practical Travel Tips
      
      Ensure a smooth cultural experience in Vietnam.
      
      ### 🏯 Temple Etiquette
      - Dress modestly when visiting temples and pagodas (shoulders and knees covered).
      - Remove shoes where requested.
      
      ### 💬 Basic Phrases
      - *Xin Chào* (Hello)
      - *Cảm ơn* (Thank you)
    `
  },
  {
    id: 'safety',
    title: 'Safety & Scams',
    keywords: ['safety', 'scam', 'taxi', 'insurance', 'emergency', 'police'],
    category: 'help',
    content: `
      ## Stay Safe in Vietnam
      
      Vietnam is generally an extremely safe country for travelers, but simple precautions help.
      
      ### 🛡️ Common Scams to Avoid
      - **Unmetered Taxis**: Never accept rides from drivers who approach you directly at airport exits. Always use Grab.
      - **Shoe Soles repair**: Street shoe-shine vendors may try to repair your shoes unsolicited. Decline firmly.
      
      ### 🏥 Travel Insurance
      - Having comprehensive travel health insurance is mandatory for e-Visa entries.
    `
  },
  {
    id: 'emergency',
    title: 'Emergency Contacts',
    keywords: ['emergency', 'police', 'ambulance', 'support', 'contact', 'number'],
    category: 'help',
    content: `
      ## Emergency Hotline Numbers
      
      Keep these contacts handy during your journey.
      
      ### 📞 Local Emergency Lines
      - **Police**: 113
      - **Fire Brigade**: 114
      - **Ambulance / Medical**: 115
      
      ### 🇻🇳 VIETANA Dedicated Concierge
      - **Direct Support**: +84 902 434 006
      - **WhatsApp Help**: Available 24/7 during your travel dates.
    `
  }
];

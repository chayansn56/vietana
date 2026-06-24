import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Helper to extract JSON from text
const extractJSON = (text) => {
  try {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match) return JSON.parse(match[1]);
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

// Comprehensive mock database for fallback generation
const MOCK_CITIES = {
  "Hanoi": {
    sights: ["Hoan Kiem Lake & Ngoc Son Temple", "Hanoi Old Quarter Walk", "Temple of Literature", "Ho Chi Minh Mausoleum", "Hanoi Street Train Cafe"],
    food: ["Egg Coffee at Café Giảng", "Pho at Pho Gia Truyen", "Authentic Bun Cha", "Dalcheeni Indian Restaurant (Jain/Veg options)"]
  },
  "Ha Long Bay": {
    sights: ["Luxury Overnight Cruise Boarding", "Sung Sot (Surprise) Cave Expedition", "Ti Top Island Panoramic Peak", "Luon Cave Kayaking", "Floating Fishing Village Visit"],
    food: ["Seafood Feast on Board", "Sunken Rock Cafe Cocktails", "Local Grilled Squid Pies"]
  },
  "Da Nang": {
    sights: ["Ba Na Hills & Golden Bridge", "Marble Mountains Cave Temples", "Dragon Bridge Fire Show", "My Khe Beach Sunset", "Son Tra Peninsula Lady Buddha"],
    food: ["Mi Quang Noodles at Ba Mua", "Fresh Seafood at Be Man", "Family Indian Restaurant", "Hanoi Corner Coconut Coffee"]
  },
  "Hoi An": {
    sights: ["Japanese Covered Bridge & Ancient Town", "Lantern-lit Thu Bon River Boat Ride", "Tra Que Vegetable Village Tour", "Bay Mau Coconut Basket Boat Spin", "Custom Tailor Fitting Session"],
    food: ["Cao Lau Noodles at Thanh Cao Lau", "Banh Mi Phuong", "Reaching Out Teahouse", "Ganesh Indian Restaurant"]
  },
  "Ho Chi Minh City": {
    sights: ["Ben Thanh Market Explorations", "War Remnants Museum", "Cu Chi Tunnels Guided Crawl", "Saigon Central Post Office & Notre-Dame", "Bitexco Financial Skydeck View"],
    food: ["Com Tam (Broken Rice) at Moc", "Egg Coffee at Okkio", "Tandoor Indian Restaurant HCMC", "Saigon Street Food Tour"]
  },
  "Ninh Binh": {
    sights: ["Trang An Boat Tour & Caves", "Hang Mua Peak Dragon Trail", "Bai Dinh Pagoda Complex", "Bich Dong Pagoda Cave Temple"],
    food: ["Com Chay (Crispy Rice)", "Local Mountain Goat Specialties", "Chapa Vegetarian Restaurant"]
  },
  "Sapa": {
    sights: ["Fansipan Mountain Cable Car", "Cat Cat H'mong Tribal Village", "Muong Hoa Valley Terraced Rice Fields", "Love Waterfall Forest Walk"],
    food: ["Salmon Hotpot", "Hill Station Craft Beer & Local Food", "Hmong Herbal Tea"]
  }
};

// Generates a mock itinerary dynamically based on inputs
const generateMockItinerary = (message, context) => {
  const lowerMsg = message.toLowerCase();
  
  // Extract parameters
  let duration = 5;
  const durationMatch = lowerMsg.match(/(\d+)\s*days?/);
  if (durationMatch) {
    duration = Math.min(30, Math.max(3, parseInt(durationMatch[1])));
  }

  let style = context?.style || 'comfort';
  if (lowerMsg.includes('luxury')) style = 'luxury';
  if (lowerMsg.includes('budget')) style = 'budget';
  if (lowerMsg.includes('premium')) style = 'premium';

  // Extract cities
  const selectedCities = [];
  Object.keys(MOCK_CITIES).forEach(city => {
    if (lowerMsg.includes(city.toLowerCase()) || (context?.focus && context.focus.toLowerCase().includes(city.toLowerCase()))) {
      selectedCities.push(city);
    }
  });

  if (selectedCities.length === 0) {
    selectedCities.push("Hanoi", "Ha Long Bay");
  }

  const days = [];
  const title = `${duration}-Day Custom ${style.charAt(0).toUpperCase() + style.slice(1)} Journey: ${selectedCities.join(' & ')}`;

  for (let d = 1; d <= duration; d++) {
    // Distribute days across selected cities
    const cityIndex = Math.floor(((d - 1) / duration) * selectedCities.length);
    const city = selectedCities[cityIndex] || selectedCities[0];
    const cityData = MOCK_CITIES[city];

    // Select sights and food offset by day to avoid duplicate items
    const sight1 = cityData.sights[(d - 1) % cityData.sights.length];
    const sight2 = cityData.sights[d % cityData.sights.length];
    const food1 = cityData.food[(d - 1) % cityData.food.length];
    const food2 = cityData.food[d % cityData.food.length];

    days.push({
      day: d,
      title: `${city} Highlights & Discovery`,
      description: `Immerse yourself in the gorgeous cultural sights and unique lifestyle of ${city}. Enjoy carefully curated experiences matching your ${style} preference.`,
      activities: [sight1, sight2],
      food: [food1, food2]
    });
  }

  return { title, days };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, context } = req.body;
  const lowerMsg = message.toLowerCase();

  // If Gemini API Key is configured, use real Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextString = "";
      if (context) {
        contextString = "Current User Preferences Context:\n" + Object.entries(context)
          .filter(([_, v]) => v !== "" && v !== null)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join("\n");
      }

      const systemInstruction = `You are VIETANA, a friendly, warm, and highly knowledgeable local expert travel guide for Indian travelers visiting Vietnam.
You know EVERYTHING about Vietnam's destinations, food recommendations, FAQs, and services.
Your goal is to answer customer questions naturally, provide top recommendations, interesting facts, and gently guide them to plan their trip.

${contextString}

INSTRUCTIONS FOR OUTPUT:
Always respond in JSON format ONLY. 
Your response MUST be a valid JSON object matching this schema:
{
  "text": "Your friendly, html-formatted conversational response here. Use <strong>, <br>, <em>, etc. for formatting.",
  "extractedPreferences": {
    "focus": "Update if they mention a destination (e.g. Hanoi, Da Nang), otherwise leave null",
    "vibe": "Update if they mention a vibe (e.g. relaxing, adventure, romantic), otherwise leave null",
    "food": "Update if they mention food preferences (e.g. vegetarian, spicy, street food), otherwise leave null",
    "style": "Update if they mention luxury, budget, family, etc., otherwise leave null"
  },
  "itinerary": {
    "title": "A premium descriptive title for the journey (only provide this object if they request an itinerary, plan, or if they submit parameters from the custom builder, otherwise leave this whole field null)",
    "days": [
      {
        "day": 1,
        "title": "Day's theme or focus (e.g., Charming Old Quarter Explorations)",
        "description": "Compelling 1-2 sentence overview of the day's flow",
        "activities": ["List 2-3 specific sights or activities"],
        "food": ["List 1-2 specific restaurants, cafes, or street food items matching their style"]
      }
    ]
  }
}
DO NOT output any markdown blocks outside the JSON, just the JSON string.
`;

      const contents = [
        ...(history || []),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents,
        config: { systemInstruction }
      });

      const parsed = extractJSON(response.text);
      if (parsed) {
        return res.status(200).json(parsed);
      }
      return res.status(200).json({ text: response.text, extractedPreferences: {} });
    } catch (err) {
      console.error("Gemini API error inside serverless function:", err);
      // Fallback to mock on API error
    }
  }

  // MOCK FALLBACK (Dynamic, beautiful itineraries)
  let text = "Vietnam has so much to offer! Tell me about the places you'd like to visit or your favorite travel style.";
  let extractedPrefs = {};
  let itinerary = null;

  // Extract preferences from user message
  const words = lowerMsg.split(/\s+/);
  const foundCities = Object.keys(MOCK_CITIES).filter(city => lowerMsg.includes(city.toLowerCase()));
  
  if (foundCities.length > 0) {
    extractedPrefs.focus = foundCities[0];
  }
  if (lowerMsg.includes('relax')) extractedPrefs.vibe = 'Relaxing';
  if (lowerMsg.includes('adventure')) extractedPrefs.vibe = 'Adventure';
  if (lowerMsg.includes('romantic') || lowerMsg.includes('honeymoon')) extractedPrefs.vibe = 'Romantic';
  
  if (lowerMsg.includes('veg') || lowerMsg.includes('jain') || lowerMsg.includes('indian')) {
    extractedPrefs.food = 'Indian Veg';
  } else if (lowerMsg.includes('street') || lowerMsg.includes('cafe')) {
    extractedPrefs.food = 'Street Food & Cafes';
  }

  if (lowerMsg.includes('luxury')) extractedPrefs.style = 'luxury';
  if (lowerMsg.includes('budget')) extractedPrefs.style = 'budget';
  if (lowerMsg.includes('premium')) extractedPrefs.style = 'premium';

  // Check if they want an itinerary
  if (lowerMsg.includes('itinerary') || lowerMsg.includes('plan') || lowerMsg.includes('parameter') || lowerMsg.includes('days')) {
    itinerary = generateMockItinerary(message, { ...context, ...extractedPrefs });
    text = `Here is your customized **${itinerary.days.length}-day journey blueprint** focusing on **${extractedPrefs.focus || 'Vietnam Highlights'}**! We've balanced this for your **${extractedPrefs.style || 'comfort'}** style. Check out the interactive timeline on the right.`;
  } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    text = "Hello! I am your local Vietana expert. Ready to plan a memorable escape to Vietnam? Tell me how many days you have and which cities you want to explore!";
  } else if (foundCities.length > 0) {
    text = `<strong>${foundCities.join(' & ')}</strong> is a marvelous choice! Famous for its scenic spots, rich heritage, and amazing food. Would you like me to draw up a customized itinerary blueprint for you?`;
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return res.status(200).json({
    text: text,
    extractedPreferences: extractedPrefs,
    itinerary: itinerary
  });
}

import { GoogleGenAI } from '@google/genai';
import { TravelerProfile, ItineraryDay } from '../core/journey/state';

export interface PlannerResult {
  itinerary: {
    title: string;
    days: ItineraryDay[];
  };
}

export async function designJourney(
  profile: TravelerProfile,
  message: string,
  apiKey?: string
): Promise<PlannerResult> {
  const systemInstruction = `You are the VIETANA AI Journey Planner.
Design the route order, night distribution, hotel classes, activities, and transfers based on this traveler profile:
${JSON.stringify(profile)}

Output a structured JSON matching this schema:
{
  "itinerary": {
    "title": "A descriptive title for this journey",
    "days": [
      {
        "day": 1,
        "city": "Ho Chi Minh City",
        "hotelClass": "Comfort (4-star)",
        "activities": ["Cafe Apartment", "Nguyen Hue Walking Street"],
        "transfers": "Airport Private Greeting",
        "foodOptions": ["Indian Restaurant Name"],
        "description": "Short overview of the day"
      }
    ]
  }
}
Return valid JSON only. Do not include markdown blocks outside the JSON.`;

  let responseText = "";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: `Generate itinerary for: ${message}` }] }],
        config: { systemInstruction }
      });
      responseText = response.text || "{}";
    } catch (e) {
      console.error("Gemini call failed in planner, trying Groq", e);
    }
  }

  if (!responseText && process.env.GROQ_API_KEY) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          response_format: { type: "json_object" },
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Generate itinerary for: ${message}` }
          ]
        })
      });
      if (response.ok) {
        const result = await response.json();
        responseText = result.choices?.[0]?.message?.content || '{}';
      }
    } catch (e) {
      console.error("Groq call failed in planner:", e);
    }
  }

  try {
    const cleanJson = responseText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson || "{}");
    return {
      itinerary: parsed.itinerary || { title: "Vietnam Tour", days: [] }
    };
  } catch (e) {
    return {
      itinerary: { title: "Vietnam Tour", days: [] }
    };
  }
}

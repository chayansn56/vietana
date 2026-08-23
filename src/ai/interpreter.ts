import { GoogleGenAI } from '@google/genai';
import { TravelerProfile } from '../core/journey/state';

export interface InterpreterResult {
  travelerProfile: Partial<TravelerProfile>;
  extractedPreferences: {
    focus: string | null;
    vibe: string | null;
    food: string | null;
    style: string | null;
  };
}

export async function interpretIntent(
  message: string,
  history: any[],
  apiKey?: string
): Promise<InterpreterResult> {
  const systemInstruction = `You are the VIETANA AI Interpreter (Intent Parser).
Analyze the conversation and extract key traveler criteria into a JSON object matching this schema:
{
  "travelerProfile": {
    "pax": {
      "adults": 2,
      "children": 0
    },
    "duration": 8,
    "budget": 200000,
    "travelStyle": "comfort",
    "foodPreference": "all",
    "departureCity": "Delhi",
    "flightType": "round",
    "visaType": "single"
  },
  "extractedPreferences": {
    "focus": "destination name if mentioned, e.g. Hanoi",
    "vibe": "vibe if mentioned, e.g. relaxing",
    "food": "food if mentioned, e.g. vegetarian",
    "style": "style if mentioned, e.g. comfort"
  }
}
Return valid JSON only. Do not include markdown blocks outside the JSON.`;

  let responseText = "";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...(history || []),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: { systemInstruction }
      });
      responseText = response.text || "{}";
    } catch (e) {
      console.error("Gemini call failed in interpreter, trying Groq", e);
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
            ...(history || []).map(h => ({
              role: h.role === 'model' ? 'assistant' : 'user',
              content: h.parts?.[0]?.text || ''
            })),
            { role: 'user', content: message }
          ]
        })
      });
      if (response.ok) {
        const result = await response.json();
        responseText = result.choices?.[0]?.message?.content || '{}';
      }
    } catch (e) {
      console.error("Groq call failed in interpreter:", e);
    }
  }

  // Fallback / local parsing if API keys are missing
  try {
    const cleanJson = responseText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson || "{}");
    return {
      travelerProfile: parsed.travelerProfile || {},
      extractedPreferences: parsed.extractedPreferences || {
        focus: null,
        vibe: null,
        food: null,
        style: null
      }
    };
  } catch (e) {
    return {
      travelerProfile: {},
      extractedPreferences: { focus: null, vibe: null, food: null, style: null }
    };
  }
}

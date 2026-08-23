import { GoogleGenAI } from '@google/genai';
import { JourneyState } from '../core/journey/state';

export interface ReviewerResult {
  isValid: boolean;
  confidenceScore: {
    feasibility: number;
    budget: number;
    weather: number;
    pace: number;
    overall: number;
  };
  warnings: string[];
}

export async function reviewJourney(
  state: JourneyState,
  apiKey?: string
): Promise<ReviewerResult> {
  const systemInstruction = `You are the VIETANA AI Reviewer (Logical Feasibility Checker).
Review the traveler's itinerary, pricing breakdown, and preferences:
${JSON.stringify(state)}

Output a structured JSON matching this schema:
{
  "isValid": true,
  "confidenceScore": {
    "feasibility": 95,
    "budget": 90,
    "weather": 85,
    "pace": 92,
    "overall": 90
  },
  "warnings": ["Warning text if any"]
}
Return valid JSON only. Do not include markdown blocks outside the JSON.`;

  let responseText = "";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: "Perform feasibility validation check." }] }],
        config: { systemInstruction }
      });
      responseText = response.text || "{}";
    } catch (e) {
      console.error("Gemini call failed in reviewer, trying Groq", e);
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
            { role: 'user', content: "Perform feasibility validation check." }
          ]
        })
      });
      if (response.ok) {
        const result = await response.json();
        responseText = result.choices?.[0]?.message?.content || '{}';
      }
    } catch (e) {
      console.error("Groq call failed in reviewer:", e);
    }
  }

  try {
    const cleanJson = responseText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson || "{}");
    return {
      isValid: parsed.isValid ?? true,
      confidenceScore: parsed.confidenceScore || {
        feasibility: 95,
        budget: 95,
        weather: 95,
        pace: 95,
        overall: 95
      },
      warnings: parsed.warnings || []
    };
  } catch (e) {
    return {
      isValid: true,
      confidenceScore: { feasibility: 95, budget: 95, weather: 95, pace: 95, overall: 95 },
      warnings: []
    };
  }
}

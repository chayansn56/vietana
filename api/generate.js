import { GoogleGenAI } from "@google/genai";

const extractJSON = (text) => {
  try {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match) return JSON.parse(match[1]);
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, context, systemKnowledge } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel' });
  }

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
You know EVERYTHING about the website's destinations, food recommendations, FAQs, and services based on the knowledge base provided below.
Your goal is to answer customer questions naturally, provide top recommendations, interesting facts, and gently guide them to plan their trip.

${contextString}

--- KNOWLEDGE BASE ---
${systemKnowledge || "No specific website knowledge provided."}

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

    const rawText = response.text;
    const parsed = extractJSON(rawText);

    if (parsed) {
      return res.status(200).json(parsed);
    } else {
      return res.status(200).json({ text: rawText, extractedPreferences: {} });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response from AI' });
  }
}

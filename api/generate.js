import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, context } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let contextString = "";
    if (context) {
      contextString = "Current User Preferences:\n" + Object.entries(context)
        .filter(([_, v]) => v !== "" && v !== null)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n");
    }

    const systemInstruction = `You are VIETANA, an expert travel planner for Indian travelers going to Vietnam. 
      Be warm, professional, and helpful. Focus on food (especially Indian/Vegetarian options if requested), safety, and local experiences. 
      Keep responses relatively concise and suitable for a chat bubble.
      
      ${contextString}
      
      If the user seems ready to finalize, suggest they 'Generate Itinerary'.`;

    // Map existing history format to the genai SDK format
    const contents = [
      ...(history || []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
      config: { systemInstruction }
    });

    const text = response.text;

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response from AI' });
  }
}


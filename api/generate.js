import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, context } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    let contextString = "";
    if (context) {
      contextString = "Current User Preferences:\n" + Object.entries(context)
        .filter(([_, v]) => v !== "" && v !== null)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are VIETANA, an expert travel planner for Indian travelers going to Vietnam. 
      Be warm, professional, and helpful. Focus on food (especially Indian/Vegetarian options if requested), safety, and local experiences. 
      Keep responses relatively concise and suitable for a chat bubble.
      
      ${contextString}
      
      If the user seems ready to finalize, suggest they 'Generate Itinerary'.`
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Logic to extract options if the AI provides any (simple parsing)
    // Or we can just return the text.
    
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response from AI' });
  }
}

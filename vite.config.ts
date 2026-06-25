import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

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

const apiGeneratePlugin = () => ({
  name: 'api-generate',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/generate' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const { message, history, context } = data;
            
            if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Neither GEMINI_API_KEY nor OPENAI_API_KEY is configured' }));
            }
 
            // Read data files to build context
            const destPath = path.resolve(__dirname, 'src/data/destinations.ts');
            const foodPath = path.resolve(__dirname, 'src/data/food.ts');
            const faqPath = path.resolve(__dirname, 'src/data/faq.ts');
            
            let websiteKnowledge = "--- KNOWLEDGE BASE ---\n";
            try {
              if (fs.existsSync(destPath)) websiteKnowledge += fs.readFileSync(destPath, 'utf8') + '\n';
              if (fs.existsSync(foodPath)) websiteKnowledge += fs.readFileSync(foodPath, 'utf8') + '\n';
              if (fs.existsSync(faqPath)) websiteKnowledge += fs.readFileSync(faqPath, 'utf8') + '\n';
            } catch (e) {
              console.error("Failed to read knowledge base files", e);
            }
 
            let contextString = "";
            if (context) {
              contextString = "Current User Preferences Context:\n" + Object.entries(context)
                .filter(([_, v]) => v !== "" && v !== null)
                .map(([k, v]) => `- ${k}: ${v}`)
                .join("\n");
            }
 
            const systemInstruction = `You are VIETANA, a friendly, warm, and highly knowledgeable local expert travel guide for Indian travelers visiting Vietnam.
You know EVERYTHING about the website's destinations, food recommendations, FAQs, and services based on the knowledge base provided below.
Your goal is to answer customer questions naturally, provide top recommendations, interesting facts (like top 5 facts if they ask about a city like Hanoi), and gently guide them to plan their trip.
 
${contextString}
 
${websiteKnowledge}
 
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
        "activities": ["List 2-3 specific sights or activities from the destinations database"],
        "food": ["List 1-2 specific restaurants, cafes, or street food items from the food database matching their style"]
      }
    ]
  }
}
DO NOT output any markdown blocks outside the JSON, just the JSON string.
`;
 
            let responseText = "";
 
            if (process.env.OPENAI_API_KEY) {
              const formattedMessages = [
                { role: 'system', content: systemInstruction }
              ];
              if (history && history.length > 0) {
                history.forEach(item => {
                  const role = item.role === 'model' ? 'assistant' : item.role;
                  const text = item.parts?.[0]?.text || '';
                  formattedMessages.push({ role, content: text });
                });
              }
              formattedMessages.push({ role: 'user', content: message });
 
              const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                  model: 'gpt-4o-mini',
                  messages: formattedMessages,
                  response_format: { type: 'json_object' }
                })
              });
 
              if (!openAiResponse.ok) {
                const errorText = await openAiResponse.text();
                throw new Error(`OpenAI API returned error: ${openAiResponse.status} - ${errorText}`);
              }
 
              const openAiData = await openAiResponse.json();
              responseText = openAiData.choices?.[0]?.message?.content || '{}';
            } else {
              const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
              const contents = [
                ...(history || []),
                { role: 'user', parts: [{ text: message }] }
              ];
 
              const response = await ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents,
                config: { systemInstruction }
              });
 
              responseText = response.text;
            }
 
            const parsed = extractJSON(responseText);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
            if (parsed) {
              res.end(JSON.stringify(parsed));
            } else {
              // Fallback if AI fails to format JSON
              res.end(JSON.stringify({ text: rawText, extractedPreferences: {} }));
            }
          } catch (error) {
            console.error('Gemini API Error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to generate response from AI' }));
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), apiGeneratePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

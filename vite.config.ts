import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

dotenv.config();
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
            const apiKey = process.env.GEMINI_API_KEY;
            
            const { processJourneyRequest } = await server.ssrLoadModule('./src/api/journey.ts');
            
            const requestPayload = {
              message: data.message,
              history: data.history || [],
              contextState: data.contextState
            };
            
            const state = await processJourneyRequest(requestPayload, apiKey);
            
            let chatResponseText = '';
            if (apiKey) {
              try {
                const ai = new GoogleGenAI({ apiKey });
                const systemInstruction = `You are VINA (BETA), the local AI travel expert of VIETANA.
You specialize in helping Indian travelers plan their trips to Vietnam.
We provide premium local planning, direct support over WhatsApp, flight booking, visa filing, and dedicated care for Jain & pure vegetarian food requirements.

Based on the traveler's message, current profile context, and itinerary details, write a friendly, highly helpful, and conversational response in English.
If the traveler asks a question (like sightseeing recommendations, vegetarian food, or travel pace), answer it directly with high-quality local insights.
Keep your response under 3-4 paragraphs. Use HTML formatting for bullet points, bolding (<strong>), or paragraphs (<p>). Do not write markdown style; output raw HTML tags since the UI renders it via dangerouslySetInnerHTML.

Current traveler preferences context:
${JSON.stringify(state.travelerProfile)}

Itinerary (if designed):
${JSON.stringify(state.itinerary)}`;

                const response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: [
                    ...(data.history || []).map(h => ({
                      role: h.role === 'model' ? 'model' : 'user',
                      parts: [{ text: h.parts?.[0]?.text || '' }]
                    })),
                    { role: 'user', parts: [{ text: data.message }] }
                  ],
                  config: { systemInstruction }
                });
                chatResponseText = response.text || '';
              } catch (e) {
                console.error('Gemini call failed in chat generation:', e);
              }
            }

            if (!chatResponseText && process.env.GROQ_API_KEY) {
              try {
                const systemInstruction = `You are VINA (BETA), the local AI travel expert of VIETANA.
You specialize in helping Indian travelers plan their trips to Vietnam.
We provide premium local planning, direct support over WhatsApp, flight booking, visa filing, and dedicated care for Jain & pure vegetarian food requirements.

Based on the traveler's message, current profile context, and itinerary details, write a friendly, highly helpful, and conversational response in English.
If the traveler asks a question (like sightseeing recommendations, vegetarian food, or travel pace), answer it directly with high-quality local insights.
Keep your response under 3-4 paragraphs. Use HTML formatting for bullet points, bolding (<strong>), or paragraphs (<p>). Do not write markdown style; output raw HTML tags since the UI renders it via dangerouslySetInnerHTML.

Current traveler preferences context:
${JSON.stringify(state.travelerProfile)}

Itinerary (if designed):
${JSON.stringify(state.itinerary)}`;

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                      { role: 'system', content: systemInstruction },
                      ...(data.history || []).map(h => ({
                        role: h.role === 'model' ? 'assistant' : 'user',
                        content: h.parts?.[0]?.text || ''
                      })),
                      { role: 'user', content: data.message }
                    ]
                  })
                });
                if (response.ok) {
                  const result = await response.json();
                  chatResponseText = result.choices?.[0]?.message?.content || '';
                }
              } catch (e) {
                console.error('Groq call failed in chat generation:', e);
              }
            }

            if (!chatResponseText) {
              const query = data.message.toLowerCase();
              if (query.includes('hanoi') || query.includes('halong') || query.includes('ha long')) {
                chatResponseText = `<p>Hanoi and Ha Long Bay are excellent destinations! I recommend a 2-day cruise in Ha Long Bay followed by exploring the Old Quarter in Hanoi. For Indian dining in Hanoi, you can visit <strong>Zaika Indian Restaurant</strong> or <strong>Little India</strong>.</p><p>Would you like to build a custom itinerary for Northern Vietnam?</p>`;
              } else if (query.includes('ho chi minh') || query.includes('hcmc') || query.includes('saigon')) {
                chatResponseText = `<p>Ho Chi Minh City is a vibrant metropolis! You should check out the historic <strong>Ben Thanh Market</strong>, the Notre-Dame Cathedral, and take a day trip to the <strong>Cu Chi Tunnels</strong>. For pure vegetarian Indian meals, you can enjoy delicious food at <strong>Tandoor Vietnam</strong> or <strong>Shanti Indian Cuisine</strong> in District 1.</p>`;
              } else if (query.includes('veg') || query.includes('jain') || query.includes('food') || query.includes('restaurant')) {
                chatResponseText = `<p>We specialize in vegetarian and Jain meals! Throughout Vietnam (Hanoi, Da Nang, Hoi An, HCMC), we partner with top-rated Indian restaurants like <strong>Tandoor</strong>, <strong>Ganesh</strong>, and <strong>Baba's Kitchen</strong> to ensure 100% kitchen separation and authentic pure veg/Jain food.</p>`;
              } else if (query.includes('da nang') || query.includes('hoi an') || query.includes('beach')) {
                chatResponseText = `<p>Central Vietnam is perfect for beaches and culture! You can spend days relaxing at My Khe Beach in Da Nang and walking through the lantern-lit streets of <strong>Hoi An Ancient Town</strong>. Don't miss the Ba Na Hills Golden Bridge!</p>`;
              } else {
                chatResponseText = `<p>Namaste! I've designed a custom travel plan matching your request. Based on your inputs, I recommend starting in Hanoi and ending in Ho Chi Minh City for a complete cultural and sightseeing experience.</p><p>What specific sights or dining needs would you like to explore next?</p>`;
              }
            }

            const clientResponse = {
              text: chatResponseText,
              extractedPreferences: {
                focus: state.travelerProfile.departureCity,
                vibe: state.travelerProfile.travelStyle,
                food: state.travelerProfile.foodPreference,
                style: state.travelerProfile.travelStyle
              },
              itinerary: state.itinerary.length > 0 ? {
                title: `${state.travelerProfile.duration}-Day Itinerary`,
                days: state.itinerary.map(day => ({
                  day: day.day,
                  title: day.city,
                  description: day.description || '',
                  activities: day.activities,
                  food: day.foodOptions || []
                }))
              } : null
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(clientResponse));
          } catch (error) {
            console.error('API gateway processing error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to generate response from AI' }));
          }
        });
        return;
      }
      if (req.url === '/api/inquiry' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', async () => {
          try {
            req.body = JSON.parse(body);
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (jsonBody) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(jsonBody));
            };
            
            const { default: inquiryHandler } = await import('./api/inquiry.js');
            await inquiryHandler(req, res);
          } catch (e) {
            console.error('Local inquiry error:', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
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
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  return {
    base: './',
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

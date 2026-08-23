import dotenv from 'dotenv';
dotenv.config();

async function testGroq() {
  const start = Date.now();
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'hi' }]
      })
    });
    console.log('Groq status:', res.status, 'Time taken:', (Date.now() - start), 'ms');
    if (!res.ok) console.log(await res.text());
  } catch (e) {
    console.log('Groq error:', e.message);
  }
}

async function testGemini() {
  const start = Date.now();
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'hi' }] }]
      })
    });
    console.log('Gemini status:', res.status, 'Time taken:', (Date.now() - start), 'ms');
  } catch (e) {
    console.log('Gemini error:', e.message);
  }
}

async function run() {
  await testGroq();
  await testGemini();
}
run();

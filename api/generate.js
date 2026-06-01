export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const lowerMsg = message.toLowerCase();
  
  // Simulated AI Logic
  let text = "That's a great question! Vietnam has so much to offer. Could you tell me a bit more about what you're looking for?";
  const prefs = {};

  if (lowerMsg.includes('hanoi')) {
    text = "<strong>Hanoi</strong> is incredible! Here are top facts: <br>1. It's the capital of Vietnam. <br>2. Famous for its Old Quarter and 36 guild streets. <br>3. Home to delicious Phở. <br>4. You can see the historic Hoan Kiem Lake. <br>5. It's a great hub for Indian travelers with plenty of Indian veg options!";
    prefs.focus = 'Hanoi';
  } else if (lowerMsg.includes('cafe') || lowerMsg.includes('coffee')) {
    text = "Vietnam is famous for its coffee culture! You must try <em>Egg Coffee (Cà Phê Trứng)</em> or a traditional <em>Cà Phê Sữa Đá</em>. We highly recommend checking out The Note Coffee in Hanoi!";
    prefs.food = 'cafes';
  } else if (lowerMsg.includes('veg') || lowerMsg.includes('jain') || lowerMsg.includes('indian')) {
    text = "Don't worry about food! Vietnam has amazing Indian restaurants like <em>Dalcheeni</em> and <em>Namaste Hanoi</em> that serve authentic Vegetarian and Jain food.";
    prefs.food = 'Indian Veg';
  } else if (lowerMsg.includes('da nang') || lowerMsg.includes('beach')) {
    text = "Da Nang is perfect for a relaxing beach vibe! It's famous for the Golden Bridge and beautiful coastal resorts. Perfect for families or romantic getaways.";
    prefs.focus = 'Da Nang';
    prefs.vibe = 'Relaxing';
  } else if (lowerMsg.includes('itinerary') || lowerMsg.includes('plan')) {
    text = "I'd love to help you plan an itinerary! Since I have an idea of your preferences, let's generate a customized blueprint for your trip. Click the button below when you're ready to plan!";
  } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    text = "Hello there! How can I help you plan your perfect trip to Vietnam today? Ask me about cities, food, or packages!";
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return res.status(200).json({
    text: text,
    extractedPreferences: prefs
  });
}

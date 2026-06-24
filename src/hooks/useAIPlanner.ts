import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { MAP_DESTINATIONS } from '../data/destinations';
import { CAFES, INDIAN_VEG_ITEMS, INDIAN_NON_VEG_ITEMS, VIETNAMESE_VEG_ITEMS, VIETNAMESE_NON_VEG_ITEMS } from '../data/food';
import { SERVICES, PACKAGES } from '../data/siteContent';

export interface Message {
  text: string;
  type: 'bot' | 'user' | 'blueprint';
}

export interface Preferences {
  focus?: string;
  vibe?: string;
  style?: string;
  food?: string;
  group?: string;
  nightlife?: string;
  extras?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  food: string[];
}

export interface Itinerary {
  title: string;
  days: ItineraryDay[];
}

const getSystemKnowledge = () => {
  return JSON.stringify({
    destinations: MAP_DESTINATIONS,
    food: {
      cafes: CAFES,
      indian_veg: INDIAN_VEG_ITEMS,
      indian_non_veg: INDIAN_NON_VEG_ITEMS,
      vietnamese_veg: VIETNAMESE_VEG_ITEMS,
      vietnamese_non_veg: VIETNAMESE_NON_VEG_ITEMS
    },
    services: SERVICES,
    packages: PACKAGES
  });
};

export const useAIPlanner = (initialDestination?: string, initialPrompt?: string) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{role: string, parts: {text: string}[]}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    focus: initialDestination || undefined
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (messages.length > 0) return;
    initialized.current = true;
    
    // Initial greeting
    const greeting = "Namaste! I'm your local Vietana expert. Ask me anything about Vietnam, from the best Indian restaurants in Hanoi to hidden gems in Da Nang! How can I help you plan your dream trip today?";
    setMessages([{ text: greeting, type: 'bot' }]);
    // DO NOT add the bot greeting to the history array. Gemini requires history to start with a 'user' message.
    setHistory([]);

    if (initialPrompt) {
      setTimeout(() => {
        handleSend(initialPrompt);
      }, 1500);
    }
  }, [initialDestination, initialPrompt]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setIsTyping(true);
    setOptions([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history,
          context: preferences,
          systemKnowledge: getSystemKnowledge()
        })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      
      const newBotMsg = data.text;
      const extractedPrefs = data.extractedPreferences || {};

      setMessages(prev => [...prev, { text: newBotMsg, type: 'bot' }]);
      
      setHistory(prev => [
        ...prev, 
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: newBotMsg }] }
      ]);

      // If an itinerary is returned, save it
      if (data.itinerary) {
        setItinerary(data.itinerary);
      }

      // Update preferences safely
      setPreferences(prev => {
        const next = { ...prev };
        if (extractedPrefs.focus && extractedPrefs.focus.toLowerCase() !== 'null') next.focus = extractedPrefs.focus;
        if (extractedPrefs.vibe && extractedPrefs.vibe.toLowerCase() !== 'null') next.vibe = extractedPrefs.vibe;
        if (extractedPrefs.style && extractedPrefs.style.toLowerCase() !== 'null') next.style = extractedPrefs.style;
        if (extractedPrefs.food && extractedPrefs.food.toLowerCase() !== 'null') next.food = extractedPrefs.food;
        return next;
      });

      // Show blueprint button if they seem ready
      if (newBotMsg.toLowerCase().includes('generate itinerary') || newBotMsg.toLowerCase().includes('ready to plan') || data.itinerary) {
        setMessages(prev => [...prev, { text: '', type: 'blueprint' }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment!", type: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished: false,
    preferences,
    itinerary,
    handleSend
  };
};

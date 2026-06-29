import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { MAP_DESTINATIONS } from '../data/destinations';
import { CAFES, INDIAN_VEG_ITEMS, INDIAN_NON_VEG_ITEMS, VIETNAMESE_VEG_ITEMS, VIETNAMESE_NON_VEG_ITEMS } from '../data/food';
import { SERVICES, PACKAGES } from '../data/siteContent';
import { usePlannerStore, Message, Preferences, Itinerary, ItineraryDay } from '../store/plannerStore';

export type { Message, Preferences, ItineraryDay, Itinerary };

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
  
  const store = usePlannerStore();
  const { messages, history, preferences, itinerary, setMessages, setHistory, setPreferences, setItinerary, resetPlanner } = store;

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  
  const initialized = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // If opened with an initial destination from the package page
    if (initialDestination && preferences.focus !== initialDestination) {
      setPreferences({ ...preferences, focus: initialDestination });
    }

    if (initialPrompt) {
      setTimeout(() => {
        handleSend(initialPrompt);
      }, 1500);
    }
  }, [initialDestination, initialPrompt]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    setMessages((prev: Message[]) => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setIsTyping(true);
    setOptions([]);

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
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

      setMessages((prev: Message[]) => [...prev, { text: newBotMsg, type: 'bot' }]);
      
      setHistory((prev: any[]) => [
        ...prev, 
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: newBotMsg }] }
      ]);

      if (data.itinerary) {
        setItinerary(data.itinerary);
      }

      setPreferences((prev: Preferences) => {
        const next = { ...prev };
        if (extractedPrefs.focus && extractedPrefs.focus.toLowerCase() !== 'null') next.focus = extractedPrefs.focus;
        if (extractedPrefs.vibe && extractedPrefs.vibe.toLowerCase() !== 'null') next.vibe = extractedPrefs.vibe;
        if (extractedPrefs.style && extractedPrefs.style.toLowerCase() !== 'null') next.style = extractedPrefs.style;
        if (extractedPrefs.food && extractedPrefs.food.toLowerCase() !== 'null') next.food = extractedPrefs.food;
        return next;
      });

      if (newBotMsg.toLowerCase().includes('generate itinerary') || newBotMsg.toLowerCase().includes('ready to plan') || data.itinerary) {
        setMessages((prev: Message[]) => [...prev, { text: '', type: 'blueprint' }]);
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      console.error(error);
      setMessages((prev: Message[]) => [...prev, { text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment!", type: 'bot' }]);
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
    handleSend,
    resetPlanner
  };
};

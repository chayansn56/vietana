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
  const { messages, history, preferences, itinerary, setMessages, setHistory, setPreferences, setItinerary } = store;

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [showWhatsAppExportOptions, setShowWhatsAppExportOptions] = useState(false);
  
  const initialized = useRef(false);
  const lastProcessedPrompt = useRef<string | null>(null);

  useEffect(() => {
    localStorage.setItem('vietana_ai_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('vietana_ai_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('vietana_ai_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (itinerary) {
      localStorage.setItem('vietana_ai_itinerary', JSON.stringify(itinerary));
    } else {
      localStorage.removeItem('vietana_ai_itinerary');
    }
  }, [itinerary]);

  useEffect(() => {
    if (initialPrompt) {
      if (lastProcessedPrompt.current === initialPrompt) return;
      lastProcessedPrompt.current = initialPrompt;

      // Clear cache to start clean with this query
      setMessages([]);
      setHistory([]);
      setPreferences({});
      setItinerary(null);
      setShowWhatsAppExportOptions(false);
      localStorage.removeItem('vietana_ai_messages');
      localStorage.removeItem('vietana_ai_history');
      localStorage.removeItem('vietana_ai_preferences');
      localStorage.removeItem('vietana_ai_itinerary');
      
      setTimeout(() => {
        handleSend(initialPrompt);
      }, 500);
    } else {
      if (initialized.current) return;
      initialized.current = true;
      
      if (messages.length === 0) {
        const greeting = "Namaste! I'm your local Vietana expert. Ask me anything about Vietnam, from the best Indian restaurants in Hanoi to hidden gems in Da Nang! How can I help you plan your dream trip today?";
        setMessages([{ text: greeting, type: 'bot' }]);
        setHistory([]);
      }
    }
  }, [initialDestination, initialPrompt]);

  const resetPlanner = () => {
    store.resetPlanner();
    setShowWhatsAppExportOptions(false);
    localStorage.removeItem('vietana_ai_messages');
    localStorage.removeItem('vietana_ai_history');
    localStorage.removeItem('vietana_ai_preferences');
    localStorage.removeItem('vietana_ai_itinerary');
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    const lowerText = text.toLowerCase();
    const isWhatsAppRequest = lowerText.includes('whatsapp') && (
      lowerText.includes('send') || 
      lowerText.includes('share') || 
      lowerText.includes('itinerary') || 
      lowerText.includes('plan') || 
      lowerText.includes('export')
    );

    if (isWhatsAppRequest) {
      setMessages(prev => [...prev, { text, type: 'user' }]);
      setInputValue('');
      setIsTyping(true);
      setOptions([]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Yeah absolutely! I can help you send this itinerary to WhatsApp right away.", type: 'bot' }]);
        setIsTyping(false);
        setShowWhatsAppExportOptions(true);
      }, 800);
      return;
    }

    setMessages(prev => [...prev, { text, type: 'user' }]);
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

  const handleResumeChat = () => {
    setShowWhatsAppExportOptions(false);
    setMessages(prev => [...prev, { text: "Sure, let's continue refining your itinerary! What would you like to change?", type: 'bot' }]);
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
    showWhatsAppExportOptions,
    setShowWhatsAppExportOptions,
    handleSend,
    resetPlanner,
    handleResumeChat
  };
};

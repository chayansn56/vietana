import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

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

export const useAIPlanner = (initialDestination?: string, initialPrompt?: string) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{role: string, parts: {text: string}[]}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
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
    setHistory([{ role: 'model', parts: [{ text: greeting }] }]);

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
          context: preferences
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
      if (newBotMsg.toLowerCase().includes('generate itinerary') || newBotMsg.toLowerCase().includes('ready to plan')) {
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
    handleSend
  };
};

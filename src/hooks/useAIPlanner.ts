import { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { IntentService } from '../services/intentService';

interface Message {
  text: string;
  type: 'bot' | 'user' | 'blueprint';
}

interface Preferences {
  vibe: string;
  style: string;
  food: string;
  group: string;
  nightlife: string;
  focus: string;
  extras: string;
}

const CORE_QUESTIONS = [
  { field: 'vibe', q: "First, what's your ultimate Vietnam dream?", opts: ['🏖️ Beautiful Beaches','🗺️ Hidden & Adventure','⚖️ A mix of both'] },
  { field: 'style', q: "What is your travel style and budget?", opts: ['✨ Premium & Luxury','🎒 Backpacking & Budget','🏨 Smart Comfortable Stays'] },
  { field: 'food', q: "Is food comfort important to you?", opts: ['🍛 Need Indian food mostly','🍜 Excited for local food','⚖️ Balance of both'] },
  { field: 'extras', q: "How do you like your travel pace?", opts: ['Chill & slow','Packed with adventure','Balanced'] },
  { field: 'nightlife', q: "Are you looking for vibrant nightlife or peaceful escapes?", opts: ['🌙 Vibrant Nightlife','🧘 Peaceful & Quiet','⚖️ A bit of both'] }
];

export const useAIPlanner = (initialDestination?: string) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [refinementMode, setRefinementMode] = useState(false);
  
  const [preferences, setPreferences] = useState<Preferences>({
    vibe: 'Not set',
    style: 'Not set',
    food: 'Not set',
    group: 'Not set',
    nightlife: 'Not set',
    focus: initialDestination || 'Not set',
    extras: 'Not set'
  });

  const addBotMsg = (text: string, opts: string[] = [], delay = 500) => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text, type: 'bot' }]);
      setOptions(opts);
    }, delay);
    return timer;
  };

  useEffect(() => {
    if (messages.length > 0) return;

    let active = true;
    let timer: NodeJS.Timeout;

    if (initialDestination) {
      const welcomeText = `I see you are interested in exploring <strong>${initialDestination}</strong>. Let's build your trip around this beautiful destination!`;
      setMessages([{ text: welcomeText, type: 'bot' }]);
      setPreferences(prev => ({ ...prev, focus: initialDestination }));
      const firstQ = CORE_QUESTIONS[0];
      setIsTyping(true);
      timer = setTimeout(() => {
        if (!active) return;
        setIsTyping(false);
        setMessages(prev => [...prev, { text: firstQ.q, type: 'bot' }]);
        setOptions(firstQ.opts);
      }, 500);
    } else {
      const firstQ = CORE_QUESTIONS[0];
      setMessages([{ text: t.planner.greeting, type: 'bot' }]);
      setIsTyping(true);
      timer = setTimeout(() => {
        if (!active) return;
        setIsTyping(false);
        setMessages(prev => [...prev, { text: firstQ.q, type: 'bot' }]);
        setOptions(firstQ.opts);
      }, 500);
    }

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [initialDestination]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isFinished) return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setOptions([]);

    const intent = IntentService.parseIntent(text);

    switch (intent.type) {
      case 'generate':
        setIsFinished(true);
        addBotMsg("Beautiful! 🌿 Crafting your personalized Vietnam story based on your preferences...");
        setTimeout(() => {
          setMessages(prev => [...prev, { text: '', type: 'blueprint' }]);
        }, 1500);
        return;
      
      case 'refine':
        setRefinementMode(true);
        addBotMsg("😊 No worries. I may have missed something. Tell me what feels wrong and I’ll improve it.", ['🍛 Food','🌊 Beaches','🌃 Nightlife','💰 Budget','💕 Romance','👨‍👩‍👧 Family','🌴 Hidden places']);
        return;

      case 'food_preference':
        setPreferences(prev => ({ ...prev, food: intent.payload }));
        addBotMsg(`🍛 Got it. Updated your journey:<br><br>Indian food priority: HIGH<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change pace', 'Add luxury']);
        return;

      case 'group_preference':
        setPreferences(prev => ({ ...prev, group: intent.payload }));
        addBotMsg(`🏠 Got it. Updated your journey:<br><br>Family comfort mode: ON<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change food', 'Add luxury']);
        return;

      case 'unknown':
      default:
        const currentQ = CORE_QUESTIONS.find(q => preferences[q.field as keyof Preferences] === 'Not set');
        
        if (currentQ && !refinementMode) {
          const nextPrefs = { ...preferences, [currentQ.field]: text };
          setPreferences(nextPrefs);
          
          const nextQ = CORE_QUESTIONS.find(q => nextPrefs[q.field as keyof Preferences] === 'Not set');
          if (nextQ) {
            addBotMsg(nextQ.q, nextQ.opts);
          } else {
            addBotMsg("YOUR VIETANA™ MATCH is ready! I have high confidence in these recommendations based on your profile.<br><br>Does everything look good?", ['Generate Itinerary', 'Change something']);
          }
        } else {
          setRefinementMode(false);
          addBotMsg("Got it! I've updated your plan with those details. Should we generate your final match now?", ['Generate Itinerary', 'Wait, add one more thing']);
        }
        break;
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished,
    preferences,
    handleSend
  };
};

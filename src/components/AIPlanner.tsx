import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
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

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<{ text: string; type: 'bot' | 'user' }[]>([]);
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
  
  const pcMsgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialDestination) {
        const welcomeText = `I see you are interested in exploring <strong>${initialDestination}</strong>. Let's build your trip around this beautiful destination!`;
        setMessages([{ text: welcomeText, type: 'bot' }]);
        setPreferences(prev => ({ ...prev, focus: initialDestination }));
        const firstQ = CORE_QUESTIONS[0];
        addBotMsg(firstQ.q, firstQ.opts);
      } else {
        const firstQ = CORE_QUESTIONS[0];
        setMessages([{ text: t.planner.greeting, type: 'bot' }]);
        addBotMsg(firstQ.q, firstQ.opts);
      }
    } else {
        resetPlanner();
    }
  }, [isOpen, initialDestination, t]);

  const resetPlanner = () => {
    setMessages([]);
    setInputValue('');
    setOptions([]);
    setIsFinished(false);
    setRefinementMode(false);
    setPreferences({
      vibe: 'Not set',
      style: 'Not set',
      food: 'Not set',
      group: 'Not set',
      nightlife: 'Not set',
      focus: initialDestination || 'Not set',
      extras: 'Not set'
    });
  };

  const addBotMsg = (text: string, opts: string[] = [], delay = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text, type: 'bot' }]);
      setOptions(opts);
    }, delay);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isFinished) return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setOptions([]);

    const lowerText = text.toLowerCase();

    // 1. GENERATE ITINERARY
    if (lowerText.includes("generate") || lowerText.includes("final")) {
      setIsFinished(true);
      addBotMsg("Beautiful! 🌿 Crafting your personalized Vietnam story based on your preferences...");
      setTimeout(() => {
        addBotMsg("Done! YOUR VIETANA™ MATCH is ready. You can now contact our team via WhatsApp or Email to finalize your bookings.");
      }, 1500);
      return;
    }

    // 2. NEGATIONS / REFINEMENT
    let negations = ["no", "wrong", "not this", "don't like", "change", "something else", "nope", "not good", "hmm", "maybe not"];
    if (negations.some(n => lowerText === n || lowerText.startsWith(n + " "))) {
      setRefinementMode(true);
      addBotMsg("😊 No worries. I may have missed something. Tell me what feels wrong and I’ll improve it.", ['🍛 Food','🌊 Beaches','🌃 Nightlife','💰 Budget','💕 Romance','👨‍👩‍👧 Family','🌴 Hidden places']);
      return;
    }

    // 3. SPECIAL HEURISTICS
    if (lowerText.includes("indian food") || lowerText.includes("indian")) {
      setPreferences(prev => ({ ...prev, food: "Indian" }));
      addBotMsg(`🍛 Got it. Updated your journey:<br><br>Indian food priority: HIGH<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change pace', 'Add luxury']);
      return;
    }
    
    if (lowerText.includes("parent") || lowerText.includes("elderly") || lowerText.includes("family")) {
      setPreferences(prev => ({ ...prev, group: "Family/Elderly" }));
      addBotMsg(`🏠 Got it. Updated your journey:<br><br>Family comfort mode: ON<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change food', 'Add luxury']);
      return;
    }

    // 4. SEQUENTIAL QUESTIONS
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
  };

  useEffect(() => {
    if (pcMsgsRef.current) {
      pcMsgsRef.current.scrollTop = pcMsgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-6xl"
      className="h-[85vh] max-h-[850px] flex flex-col md:flex-row p-0 overflow-hidden"
    >
      <div className="flex-1 md:flex-[0.65] flex flex-col border-r border-white/5 relative z-10 bg-brand-green-extra-dark/95">
        <div className="p-12 pb-6 text-left">
          <Heading as="h3" className="text-white text-3xl mb-3 flex items-center gap-3 font-serif font-normal">
            🌿 {t.planner.title}
          </Heading>
          <Text variant="white" size="sm" className="opacity-40 leading-relaxed font-light tracking-wide">
            {t.planner.tagline}
          </Text>
        </div>
        
        <div ref={pcMsgsRef} className="flex-1 overflow-y-auto px-12 flex flex-col gap-7 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-5 items-start animate-[msgFadeIn_0.6s_var(--ease-smooth)_forwards] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-muted flex shrink-0 items-center justify-center relative shadow-strong after:content-[''] after:absolute after:inset-[-3px] after:rounded-full after:border after:border-brand-gold/20 after:animate-[aiPulse_2.5s_infinite_ease-in-out]" />
              )}
              <div className={`max-w-[85%] ${msg.type === 'user' ? 'bg-white/5 border border-white/10 rounded-[18px_18px_4px_18px] p-4 backdrop-blur-md' : ''}`}>
                <Text 
                  variant="white" 
                  size="md" 
                  className={`leading-relaxed [&_strong]:text-brand-gold-light [&_strong]:font-medium ${msg.type === 'bot' ? 'opacity-90' : ''}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 py-4">
              {[0, 1, 2].map(n => (
                <span key={n} className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-dot" style={{ animationDelay: n === 0 ? '-0.32s' : n === 1 ? '-0.16s' : '0s' }} />
              ))}
            </div>
          )}
        </div>

        <div className="p-12 pt-6 bg-gradient-to-t from-brand-green-extra-dark via-brand-green-extra-dark/40 to-transparent relative">
          {options.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-7 justify-center px-4">
              {options.map((opt, i) => (
                <div 
                  key={i} 
                  className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-[0.8rem] transition-all duration-300 cursor-pointer hover:bg-brand-gold/10 hover:border-brand-gold hover:text-brand-gold-light hover:-translate-y-0.5" 
                  onClick={() => handleSend(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
          
          <div className="relative bg-white/5 border border-white/15 rounded-2xl p-2 transition-all duration-300 shadow-deep focus-within:border-brand-gold/40">
            <div className="flex items-center gap-3">
              <button className="bg-transparent border-none text-white/30 text-xl px-4 cursor-pointer hover:text-brand-gold transition-colors">🎤</button>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none py-4 text-white text-lg font-light outline-none placeholder:text-white/25" 
                placeholder={t.planner.where} 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="bg-white text-black border-none rounded-full w-11 h-11 flex shrink-0 items-center justify-center cursor-pointer transition-all duration-300 ease-smooth mr-1 hover:bg-brand-gold hover:scale-105 hover:-rotate-12" onClick={() => handleSend()}>
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-[0.35] flex-col bg-black/25 p-12 relative z-10 backdrop-blur-xl border-l border-white/5">
        <Card variant="glass" padding="lg" hover={false} className="h-full border-white/5">
          <Heading as="h4" className="text-[0.75rem] font-bold tracking-[0.2em] text-white/30 uppercase mb-8 flex items-center gap-4 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-brand-gold after:to-transparent">
            {t.planner.live}
          </Heading>
          
          <div className="flex flex-col gap-9 flex-1 mt-4">
            {[
              { label: t.planner.labels.vibe, value: preferences.vibe, icon: '✨' },
              { label: t.planner.labels.style, value: preferences.style, icon: '🏰' },
              { label: t.planner.labels.food, value: preferences.food, icon: '🍲' },
              { label: t.planner.labels.group, value: preferences.group, icon: '👥' },
              { label: t.planner.labels.nightlife, value: preferences.nightlife, icon: '🌙' },
              { label: t.planner.labels.focus, value: preferences.focus, icon: '🎯' },
              { label: t.planner.labels.extras, value: preferences.extras, icon: '📍' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <div className="text-[0.65rem] text-white/25 uppercase tracking-widest font-bold">{item.icon} {item.label}</div>
                <Text variant="white" className="text-brand-gold-light font-light leading-tight min-h-[1.5rem]">
                  {item.value}
                </Text>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-col gap-4">
            <Button 
              variant="glass"
              className="w-full text-sm font-medium border-white/10"
              onClick={() => window.open(`https://wa.me/919953294543?text=${encodeURIComponent(`Hi VIETANA! I just finished my planning session:\n\nVibe: ${preferences.vibe}\nStyle: ${preferences.style}\nFood: ${preferences.food}\nFocus: ${preferences.focus}\n\nI'd like to discuss this further!`)}`, '_blank')}
            >
              💬 WhatsApp VIETANA™
            </Button>
            <Button 
              variant="ghost"
              className="w-full text-sm text-white/60 hover:text-white"
              onClick={() => window.open('mailto:info@vietana.com')}
            >
              ✉ Email VIETANA™
            </Button>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes msgFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes aiPulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
      `}</style>
    </Modal>
  );
};

export default AIPlanner;

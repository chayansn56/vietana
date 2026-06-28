import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { MessagingService } from '../services/messagingService';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import { useAIPlanner } from '../hooks/useAIPlanner';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import Icon, { IconName } from './ui/Icon';
import { featureFlags } from '../config/featureFlags';
import { generateAffiliateUrl } from '../utils/affiliate';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';

/** Lightweight HTML sanitizer — strips script/iframe/on* attributes */
const sanitize = (html: string): string => {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
};

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialPrompt?: string;
}

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination, initialPrompt }) => {
  const { t, language } = useTranslation();
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'deals' | 'pricing'>('itinerary');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const getLanguageTag = (lang: string) => {
    if (lang === 'HI') return 'hi-IN';
    if (lang === 'VI') return 'vi-VN';
    return 'en-US';
  };

  const { speak, cancel, isSpeaking } = useSpeechSynthesis(getLanguageTag(language));

  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished,
    preferences,
    itinerary,
    handleSend,
    resetPlanner
  } = useAIPlanner(isOpen ? initialDestination : undefined, isOpen ? initialPrompt : undefined);

  const recognitionRef = useRef<any>(null);

  // Automatically reset planner on open to ensure a fresh session
  useEffect(() => {
    if (isOpen) {
      resetPlanner();
    }
  }, [isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getLanguageTag(language);

      recognition.onstart = () => {
        setIsListening(true);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // Stop talking when user speaks
        }
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [handleSend, language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError("Speech recognition is not supported in this browser. Please try Chrome or Safari.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if (!ttsEnabled) return;
    speak('bot-speech', text);
  };

  // Speak when new message from bot arrives
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.type === 'bot') {
        speakText(lastMsg.text);
      }
    }
  }, [messages, ttsEnabled]);

  // Auto trigger popup action card when itinerary is generated
  useEffect(() => {
    if (itinerary) {
      setShowActionPopup(true);
      speakText("I have created your custom itinerary. Would you like me to send it over WhatsApp or Email?");
    }
  }, [itinerary]);

  const pcMsgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pcMsgsRef.current) {
      pcMsgsRef.current.scrollTop = pcMsgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-6xl"
      className={`h-[100dvh] md:h-[85vh] max-h-none md:max-h-[850px] flex flex-col md:flex-row p-0 overflow-hidden glass-dark rounded-none md:rounded-[32px] transition-all duration-700 ${
        isListening 
          ? 'shadow-[0_0_60px_rgba(168,85,247,0.35)]' 
          : isSpeaking 
            ? 'shadow-[0_0_60px_rgba(232,200,74,0.35)]' 
            : 'shadow-heavy'
      }`}
    >
      {/* Background Orbs for Organic Lush Vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full  pointer-events-none z-0 hidden animate-blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full  pointer-events-none z-0 hidden animate-blob-float" style={{ animationDelay: '2s' }} />

      {/* Dynamic Voice Ambient Glow Ring */}
      <div className={`absolute inset-0 border-2 rounded-[32px] pointer-events-none z-50 transition-all duration-700 ${
        isListening 
          ? 'border-brand-gold/40 opacity-100 shadow-[inset_0_0_30px_rgba(212,175,55,0.25)]' 
          : isSpeaking 
            ? 'border-brand-gold/40 opacity-100 shadow-[inset_0_0_30px_rgba(232,200,74,0.25)]' 
            : 'border-transparent opacity-0 shadow-none'
      }`} />

      {/* LEFT: Chat Consultation (Lush Glassmorphism) */}
      <div className="flex-1 md:flex-[0.58] flex flex-col relative z-10 border-r border-white/5 w-full bg-gradient-to-b from-[#0F2622] via-[#0B1A18] to-[#071110]">
        <div className="p-6 md:p-10 pb-4 md:pb-6 text-left relative flex justify-between items-start">
          <div>
            <Heading as="h3" variant="white" className="text-2xl md:text-3xl font-serif tracking-wide flex items-center gap-3">
              <span className="text-brand-gold-light"><Icon name="Leaf" size={24} className="md:w-8 md:h-8" /></span> {t.planner.title}
            </Heading>
            <Text variant="none" className="text-white/50 text-xs md:text-sm mt-2 font-light tracking-wide">
              {t.planner.tagline}
            </Text>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => {
                const newVal = !ttsEnabled;
                setTtsEnabled(newVal);
                if (!newVal) {
                  cancel();
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all duration-300 text-xs cursor-pointer font-medium uppercase tracking-wider ${
                ttsEnabled ? 'border-brand-gold/30 bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-white/40 hover:text-white/60'
              }`}
              title={ttsEnabled ? "Mute Voice" : "Unmute Voice"}
            >
              <Icon name={ttsEnabled ? "Volume2" : "VolumeX"} size={12} /> {ttsEnabled ? "Voice On" : "Mute"}
            </button>
            <button
              onClick={resetPlanner}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 hover:border-brand-gold/30 hover:bg-white/5 text-white/60 hover:text-brand-gold transition-all duration-300 text-xs cursor-pointer font-medium uppercase tracking-wider"
              title="Reset Chat"
            >
              <Icon name="RotateCcw" size={12} /> Clear
            </button>
          </div>
        </div>

        <div ref={pcMsgsRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-4 flex flex-col gap-4 md:gap-6 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, i) => {
            if (msg.type === 'blueprint') {
              const whatsappIndiaLink = MessagingService.generateBlueprintWhatsApp(preferences.focus, preferences.vibe, preferences.style, preferences.food, 'INDIA');
              const whatsappVietnamLink = MessagingService.generateBlueprintWhatsApp(preferences.focus, preferences.vibe, preferences.style, preferences.food, 'VIETNAM');
              const emailLink = MessagingService.generateBlueprintEmail(preferences.focus, preferences.vibe, preferences.style, preferences.food);
              return (
                <div key={i} className="animate-msg-fade-in w-full my-6 flex justify-center">
                  <div className="bg-brand-green-dark/40 border border-brand-gold/30 rounded-3xl p-8  shadow-gold max-w-[500px] w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
                    <Heading as="h4" variant="none" className="text-xl font-serif text-brand-gold-light mb-4 flex justify-center items-center gap-2">
                      <Icon name="Sparkles" size={20} /> Your Vietnam Journey Blueprint
                    </Heading>
                    <Text variant="none" className="text-sm font-light text-white/80 leading-relaxed mb-8">
                      Your trip will focus on <span className="text-brand-gold-light font-medium italic">{preferences.focus || 'Vietnam'}</span>, 
                      balancing <span className="text-brand-gold-light font-medium italic">{preferences.food || 'local gastronomy'}</span> and <span className="text-brand-gold-light font-medium italic">{preferences.style || 'bespoke comfort'}</span>.
                    </Text>

                    <div className="flex flex-col gap-3">
                      <a href={whatsappIndiaLink} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 text-white py-3 px-6 rounded-2xl transition-all duration-300 text-sm tracking-wide flex justify-center items-center gap-2">
                        <Icon name="MessageCircle" size={16} /> WhatsApp India
                      </a>
                      <a href={whatsappVietnamLink} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 text-white py-3 px-6 rounded-2xl transition-all duration-300 text-sm tracking-wide flex justify-center items-center gap-2">
                        <Icon name="MessageCircle" size={16} /> WhatsApp Vietnam
                      </a>
                      <a href={emailLink} className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors mt-2 flex justify-center items-center gap-2">
                        <Icon name="Mail" size={12} /> support@vietana.com
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className={`flex gap-4 items-end animate-msg-fade-in ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-brand-green-dark flex shrink-0 items-center justify-center shadow-strong border border-white/10 mb-2">
                    <span className="text-white flex items-center justify-center"><Icon name="Leaf" size={14} /></span>
                  </div>
                )}
                <div className={`max-w-[80%] relative group/msg ${msg.type === 'user'
                    ? 'bg-gradient-to-r from-brand-gold/10 to-brand-gold/20 border border-brand-gold/30 rounded-2xl rounded-br-sm p-5 shadow-soft text-right'
                    : 'bg-gradient-to-br from-brand-green/30 via-white/5 to-brand-gold/5 border border-white/10 rounded-2xl rounded-bl-sm p-5 pr-12 shadow-soft text-left'
                  }`}>
                  <Text
                    variant="none"
                    className={`leading-relaxed text-base md:text-lg ${msg.type === 'user' ? 'text-white' : 'text-white/90'} [&_strong]:text-brand-gold-light [&_strong]:font-medium`}
                    dangerouslySetInnerHTML={{ __html: sanitize(msg.text) }}
                  />
                  {msg.type === 'bot' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-60 md:opacity-0 group-hover/msg:opacity-100 transition-opacity duration-300 text-white/40 hover:text-brand-gold cursor-pointer p-1.5 rounded-lg hover:bg-white/5"
                      title="Read Aloud"
                    >
                      <Icon name="Volume2" size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {isTyping && (
             <div className="flex gap-4 items-end animate-msg-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-brand-green-dark flex shrink-0 items-center justify-center shadow-strong border border-white/10 mb-2">
                  <span className="text-white flex items-center justify-center"><Icon name="Leaf" size={14} /></span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm p-5 ">
                   <div className="flex items-center gap-1.5 h-6">
                    {[0, 1, 2].map(n => (
                      <span key={n} className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 animate-pulse-dot" style={{ animationDelay: `${n * 0.2}s` }} />
                    ))}
                  </div>
                </div>
             </div>
          )}

          {isListening && (
            <div className="flex flex-col items-center justify-center py-6 gap-3 animate-msg-fade-in bg-black/20 rounded-2xl border border-white/5 p-4 my-2">
              <div className="siri-orb-container">
                <div className="siri-orb-layer-1" />
                <div className="siri-orb-layer-2" />
                <div className="siri-orb-layer-3" />
              </div>
              <Text variant="none" className="text-xs font-semibold text-brand-gold tracking-widest animate-pulse uppercase">
                Vietana Listening...
              </Text>
            </div>
          )}
        </div>

        <div className="p-4 md:p-8 pt-4 md:pt-6 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {options.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {options.map((opt, i) => (
                <button
                  key={i}
                  className="bg-white/5 border border-white/10 text-white/80 px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:bg-brand-gold/20 hover:border-brand-gold/50 hover:text-white shadow-sm hover:shadow-gold hover:-translate-y-0.5"
                  onClick={() => handleSend(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {showActionPopup && itinerary && (
            <div className="mb-4 bg-gradient-to-r from-brand-green-dark to-brand-green border border-brand-gold/30 rounded-2xl p-5 shadow-lg animate-msg-fade-in flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                  <Icon name="Sparkles" size={20} />
                </div>
                <div className="text-left">
                  <Heading as="h5" variant="none" className="text-white text-sm font-semibold">Quotation & Itinerary Ready!</Heading>
                  <Text variant="none" className="text-white/60 text-xs">Share it instantly with the customer.</Text>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => {
                    const itemsList = itinerary.days.map(d => `Day ${d.day}: ${d.title}\n- Activities: ${d.activities.join(', ')}`).join('\n\n');
                    const message = `Hello! I've designed your custom Vietnam itinerary:\n\n*${itinerary.title}*\n\n${itemsList}`;
                    window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, message), '_blank');
                  }}
                  className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon name="MessageCircle" size={14} /> Send WhatsApp
                </button>
                <button
                  onClick={() => {
                    const itemsList = itinerary.days.map(d => `Day ${d.day}: ${d.title}\n- Activities: ${d.activities.join(', ')}`).join('\n\n');
                    const subject = `Your Custom Vietana Vietnam Journey`;
                    const body = `Hi! Here is your custom itinerary:\n\n${itinerary.title}\n\n${itemsList}`;
                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                  }}
                  className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon name="Mail" size={14} /> Email Quote
                </button>
                <button
                  onClick={() => setShowActionPopup(false)}
                  className="text-white/40 hover:text-white/80 p-2 text-xs cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {isSpeaking && (
            <div className="flex items-center gap-3 justify-center mb-3 animate-msg-fade-in bg-brand-gold/5 border border-brand-gold/10 p-2.5 rounded-xl">
              <div className="speaking-wave-container">
                <div className="speaking-wave-bar" />
                <div className="speaking-wave-bar" />
                <div className="speaking-wave-bar" />
                <div className="speaking-wave-bar" />
                <div className="speaking-wave-bar" />
              </div>
              <span className="text-xs font-medium text-brand-gold-light uppercase tracking-wider animate-pulse">Vietana Speaking...</span>
            </div>
          )}

          <div className="text-[10px] text-white/40 font-mono tracking-wider mb-2 text-left pl-2">
            💡 Try: "make it veg-only", "add a day in Da Lat", or "upgrade to 5★ hotels"
          </div>

          {speechError && (
            <div className="mb-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-2.5 rounded-xl flex items-center justify-between gap-3 animate-msg-fade-in text-left">
              <div className="flex items-center gap-2">
                <Icon name="AlertCircle" size={14} className="shrink-0" />
                <span>{speechError}</span>
              </div>
              <button 
                onClick={() => setSpeechError(null)}
                className="text-white/40 hover:text-white/80 p-0.5 rounded-md hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          <div className={`relative bg-white/5 border rounded-2xl p-2 transition-all duration-300 shadow-inner ${
            isListening ? 'border-brand-gold/50 bg-brand-gold/5' : 'border-white/10 focus-within:border-brand-gold/40 focus-within:bg-white/10'
          }`}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isListening ? 'bg-brand-gold text-brand-green-extra-dark animate-pulse' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
                title={isListening ? "Listening..." : "Click to Speak"}
              >
                <Icon name="Mic" size={20} />
              </button>
              <input
                type="text"
                className="flex-1 bg-transparent border-none py-3 text-white text-lg font-light outline-none placeholder:text-white/30"
                placeholder={isListening ? "Listening..." : (t.planner.where || "Ask anything about Vietnam...")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isListening}
              />
              <button
                className="bg-brand-gold text-brand-green-extra-dark border-none rounded-xl px-6 py-3 font-semibold transition-all duration-300 mr-1 disabled:opacity-40 hover:bg-brand-gold-light hover:shadow-gold"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isListening}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Itinerary Visualizer or Live Preferences */}
      <div className="hidden md:flex flex-[0.42] flex-col bg-gradient-to-br from-[#121A1D] via-[#0F1417] to-[#080B0D] p-8 md:p-10 relative z-10 border-l border-white/5 shadow-inner border-t-0 border-b-0 border-r-0 rounded-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {itinerary ? (
          /* Structured Day-by-Day Timeline Accordion */
          <div className="flex flex-col h-full">
            <div className="mb-6 pb-4 border-b border-white/5">
              <Text variant="none" className="text-xs text-brand-gold uppercase tracking-[0.2em] font-semibold mb-1">
                JOURNEY TIMELINE
              </Text>
              <Heading as="h4" variant="none" className="text-xl font-serif text-white tracking-wide leading-tight mb-4">
                {itinerary.title}
              </Heading>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${activeTab === 'itinerary' ? 'bg-brand-gold text-brand-green-extra-dark' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                >
                  Itinerary
                </button>
                {featureFlags.enableAffiliateLinks && (
                  <button 
                    onClick={() => setActiveTab('deals')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${activeTab === 'deals' ? 'bg-brand-gold text-brand-green-extra-dark' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    Smart Deals
                  </button>
                )}
              </div>
            </div>

            {activeTab === 'itinerary' && (
              <>
                <div className="flex-1 flex flex-col gap-4 relative pl-4 border-l border-dashed border-white/10">
                {itinerary.days.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div key={day.day} className="relative group transition-all duration-300">
                      {/* Timeline Node dot */}
                      <div className={`absolute -left-[21px] top-4 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isExpanded ? 'bg-brand-gold shadow-[0_0_8px_rgba(201,168,76,0.8)] scale-125' : 'bg-white/20 group-hover:bg-white/50'
                      }`} />

                      {/* Day Card */}
                      <div 
                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                          isExpanded ? 'bg-brand-green-dark/20 border-brand-gold/30 shadow-soft' : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      >
                        <div className="flex justify-between items-center">
                          <Heading as="h5" variant="none" className="text-sm font-serif text-brand-gold-light tracking-wide">
                            Day {day.day}: {day.title}
                          </Heading>
                          <span className="text-white/40 text-xs transition-transform duration-300">
                            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                          </span>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 flex flex-col gap-4 animate-msg-fade-in">
                            <Text variant="none" className="text-white/70 text-xs italic font-light leading-relaxed">
                              {day.description}
                            </Text>

                            {/* Sights checklist */}
                            {day.activities?.length > 0 && (
                              <div>
                                <Text variant="none" className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1.5 font-semibold flex items-center gap-1">
                                  <Icon name="MapPin" size={10} className="text-brand-gold" /> Exploration Points
                                </Text>
                                <div className="flex flex-col gap-1 pl-1">
                                  {day.activities.map((act, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs text-white/90 font-light">
                                      <span className="text-brand-gold-light font-medium mt-0.5">✓</span>
                                      <span>{act}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Food Suggestions */}
                            {day.food?.length > 0 && (
                              <div>
                                <Text variant="none" className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1.5 font-semibold flex items-center gap-1">
                                  <Icon name="Soup" size={10} className="text-brand-gold" /> Gastronomy Picks
                                </Text>
                                <div className="flex flex-col gap-1 pl-1">
                                  {day.food.map((f, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80 font-light italic">
                                      <span className="text-brand-gold/60 mt-0.5">✦</span>
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <Button
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-green-extra-dark py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                      const itemsList = itinerary.days.map(d => `Day ${d.day}: ${d.title}\n- Activities: ${d.activities.join(', ')}`).join('\n\n');
                      const message = `Hello Vietana! I've designed an itinerary blueprint:\n\n*${itinerary.title}*\n\n${itemsList}`;
                      window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, message), '_blank');
                    }}
                  >
                    <Icon name="MessageCircle" size={18} /> Book this Itinerary
                  </Button>
                </div>
              </>
            )}

            {activeTab === 'deals' && (
              <div className="flex-1 flex flex-col gap-4">
                <Text variant="none" className="text-white/60 text-sm leading-relaxed mb-4">
                  Based on your itinerary, we've found the best deals for flights, hotels, and insurance.
                </Text>
                
                <div className="grid grid-cols-1 gap-3">
                  <a href={generateAffiliateUrl('flight', 'Vietnam')} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 hover:border-brand-gold/50 p-4 rounded-2xl flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center"><Icon name="Plane" size={18} /></div>
                      <div>
                        <Heading as="h5" variant="none" className="text-white text-sm font-semibold">Flights to Vietnam</Heading>
                        <Text variant="none" className="text-white/40 text-xs">Compare prices on Skyscanner</Text>
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-white/30 group-hover:text-brand-gold transition-colors" />
                  </a>

                  <a href={generateAffiliateUrl('hotel', 'Vietnam')} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 hover:border-brand-gold/50 p-4 rounded-2xl flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center"><Icon name="Castle" size={18} /></div>
                      <div>
                        <Heading as="h5" variant="none" className="text-white text-sm font-semibold">Hotels & Stays</Heading>
                        <Text variant="none" className="text-white/40 text-xs">Up to 15% off on Booking.com</Text>
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-white/30 group-hover:text-brand-gold transition-colors" />
                  </a>

                  <a href={generateAffiliateUrl('insurance', 'Vietnam')} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 hover:border-brand-gold/50 p-4 rounded-2xl flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center"><Icon name="Shield" size={18} /></div>
                      <div>
                        <Heading as="h5" variant="none" className="text-white text-sm font-semibold">Travel Insurance</Heading>
                        <Text variant="none" className="text-white/40 text-xs">Stay protected with World Nomads</Text>
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-white/30 group-hover:text-brand-gold transition-colors" />
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Default: Live Preferences Checklist */
          <div className="flex flex-col h-full justify-between">
            <div>
              <Heading as="h4" variant="none" className="text-white/40 tracking-[0.2em] text-xs uppercase mb-10 flex items-center gap-4 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-brand-gold/50 after:to-transparent">
                {t.planner.live}
              </Heading>

              <div className="flex flex-col gap-8 flex-1 mt-2">
                {[
                  { label: t.planner.labels.vibe, value: preferences.vibe, icon: 'Sparkles' as IconName },
                  { label: t.planner.labels.style, value: preferences.style, icon: 'Castle' as IconName },
                  { label: t.planner.labels.food, value: preferences.food, icon: 'Soup' as IconName },
                  { label: t.planner.labels.group, value: preferences.group, icon: 'Users' as IconName },
                  { label: t.planner.labels.nightlife, value: preferences.nightlife, icon: 'Moon' as IconName },
                  { label: t.planner.labels.focus, value: preferences.focus, icon: 'Target' as IconName },
                  { label: t.planner.labels.extras, value: preferences.extras, icon: 'MapPin' as IconName }
                ].map((item, i) => {
                  const isSet = !!item.value;
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <Text variant="none" className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                        <span className="opacity-70"><Icon name={item.icon} size={14} /></span> {item.label}
                      </Text>
                      <Text
                        variant="none"
                        className={`text-base leading-tight min-h-6 transition-all duration-500 ${
                          isSet ? 'text-brand-gold-light font-medium' : 'text-white/20 italic'
                        }`}
                      >
                        {item.value || 'Not set'}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12">
              <Button
                variant="glass"
                className="w-full bg-white/5 border-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/40 text-white flex items-center justify-center gap-2"
                onClick={() => window.open(MessagingService.generateBlueprintWhatsApp(preferences.focus, preferences.vibe, preferences.style, preferences.food, 'INDIA'), '_blank')}
              >
                <Icon name="MessageCircle" size={18} /> Ask an Expert
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AIPlanner;

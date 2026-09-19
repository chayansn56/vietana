import './ai-planner.css';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import { useAIPlanner } from '../hooks/useAIPlanner';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import Icon from './ui/Icon';

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
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

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
    handleSend,
    resetPlanner,
    showWhatsAppExportOptions,
    setShowWhatsAppExportOptions,
    handleResumeChat,
    preferences,
    itinerary
  } = useAIPlanner(isOpen ? initialDestination : undefined, isOpen ? initialPrompt : undefined);

  const recognitionRef = useRef<any>(null);

  // Automatically reset planner on open to ensure a fresh session (unless we are feeding it a specific initial query)
  useEffect(() => {
    if (isOpen) {
      if (!initialPrompt) {
        resetPlanner();
      }
    }
  }, [isOpen, initialPrompt]);

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
          window.speechSynthesis.cancel();
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

      return () => {
        try {
          recognition.stop();
        } catch(e) {}
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const speakText = (text: string) => {
    if (!ttsEnabled) return;
    speak('planner-message', text);
  };

  const handleSendToWhatsApp = () => {
    let summary = "Hi VIETANA! I was planning a trip with VINA AI:\n";
    if (preferences.focus) summary += `- Focus: ${preferences.focus}\n`;
    if (preferences.vibe) summary += `- Vibe: ${preferences.vibe}\n`;
    if (preferences.style) summary += `- Style: ${preferences.style}\n`;
    if (preferences.food) summary += `- Food: ${preferences.food}\n`;
    if (itinerary) {
      summary += `\nItinerary: ${itinerary.title}\n`;
      itinerary.days.slice(0, 3).forEach(d => {
        summary += `- Day ${d.day}: ${d.title}\n`;
      });
      if (itinerary.days.length > 3) {
        summary += `...and ${itinerary.days.length - 3} more days!\n`;
      }
    }
    summary += "\nPlease help me customize and book this trip!";
    window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, summary), '_blank');
    setShowWhatsAppExportOptions(false);
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

  // Cancel voice speech when modal is closed or unmounted
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

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
      maxWidth="max-w-2xl"
      className={`h-[85vh] w-[92vw] md:w-full max-h-[800px] flex flex-col p-0 overflow-hidden bg-[#24150E] border-[5px] border-[#D4AF37] rounded-[24px] transition-all duration-700 ${
        isListening 
          ? 'shadow-[0_0_60px_rgba(168,85,247,0.35)]' 
          : isSpeaking 
          ? 'shadow-[0_0_60px_rgba(232,200,74,0.35)]' 
          : 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      }`}
    >
      {/* Leather Cover stitches */}
      <div className="absolute inset-1.5 border-2 border-dashed border-[#FAF8F3]/15 rounded-[18px] pointer-events-none z-10 hidden md:block" />

      {/* Main Single-Column Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full bg-[#FAF8F3] text-[#12302B] h-full max-h-full min-h-0">
        {/* Absolute Close button at top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8.5 h-8.5 rounded-full border border-[#E6D9BF] bg-[#FAF8F3] hover:bg-black/5 text-[#12302B] hover:text-red-500 transition-all duration-300 cursor-pointer shadow-xs active:scale-95 touch-manipulation"
          title="Close VINA"
        >
          <Icon name="X" size={14} />
        </button>

        {/* Dynamic VINA Header */}
        <div className="p-6 md:p-10 pb-4 md:pb-6 text-left relative flex justify-between items-start border-b border-[#E6D9BF]">
          <div>
            <Heading as="h3" variant="none" className="text-xl md:text-3xl font-serif tracking-wide flex items-center gap-3 text-[#12302B] max-w-[160px] xs:max-w-none">
              <span className="text-[#B8860B]"><Icon name="Bot" size={24} /></span> VINA (BETA)
            </Heading>
            <Text variant="none" className="text-[#12302B]/60 text-[10px] md:text-sm mt-1 font-semibold tracking-wide">
              Travel Gets Better with VIETANA
            </Text>
          </div>
          <div className="flex items-center gap-1.5 mt-1 pr-9 md:pr-0">
            <button
              onClick={() => {
                const newVal = !ttsEnabled;
                setTtsEnabled(newVal);
                if (!newVal) {
                  cancel();
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-all duration-300 text-xs cursor-pointer font-bold uppercase tracking-wider ${
                ttsEnabled ? 'border-[#12302B]/30 bg-[#12302B]/10 text-[#12302B]' : 'border-[#E6D9BF] text-[#12302B]/60 hover:text-[#12302B]'
              }`}
              title={ttsEnabled ? "Mute Voice" : "Unmute Voice"}
            >
              <Icon name={ttsEnabled ? "Volume2" : "VolumeX"} size={12} /><span className="hidden sm:inline"> {ttsEnabled ? "Voice On" : "Mute"}</span>
            </button>
            <button
              onClick={resetPlanner}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#E6D9BF] hover:border-[#12302B]/30 hover:bg-black/5 text-[#12302B]/60 hover:text-[#12302B] transition-all duration-300 text-xs cursor-pointer font-bold uppercase tracking-wider"
              title="Reset Chat"
            >
              <Icon name="RotateCcw" size={12} /><span className="hidden sm:inline"> Clear</span>
            </button>
          </div>
        </div>

        {/* Chat Message Scroll */}
        <div ref={pcMsgsRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-6 flex flex-col gap-4 scroll-smooth scrollbar-thin scrollbar-thumb-[#12302B]/10 scrollbar-track-transparent bg-repeat opacity-[0.98]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')` }}>
          {messages.map((msg, i) => {
            if (msg.type === 'blueprint') {
              return null; // Skip redundant blueprint box since we handle lead info in detail modals
            }

            return (
              <div key={i} className={`flex gap-3 items-end animate-msg-fade-in ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#12302B] flex shrink-0 items-center justify-center shadow-sm border border-[#E6D9BF] mb-1">
                    <span className="text-white flex items-center justify-center"><Icon name="Bot" size={14} /></span>
                  </div>
                )}
                <div className={`max-w-[85%] relative group/msg ${msg.type === 'user'
                    ? 'bg-[#F0EAD6] border border-[#E6D9BF] rounded-2xl rounded-br-sm p-4 shadow-xs text-right text-[#12302B] font-serif italic text-sm'
                    : 'bg-white border border-[#E6D9BF] rounded-2xl rounded-bl-sm p-4 pr-10 shadow-xs text-left text-[#12302B] text-sm'
                  }`}>
                  <Text
                    variant="none"
                    className={`leading-relaxed text-sm ${msg.type === 'user' ? 'text-[#12302B] font-semibold' : 'text-[#12302B]/90'} [&_strong]:text-[#8B6508] [&_strong]:font-bold`}
                    dangerouslySetInnerHTML={{ __html: sanitize(msg.text) }}
                  />
                </div>
              </div>
            );
          })}
          
          {isTyping && (
             <div className="flex gap-3 items-end animate-msg-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#12302B] flex shrink-0 items-center justify-center shadow-sm border border-[#E6D9BF] mb-1">
                  <span className="text-white flex items-center justify-center"><Icon name="Bot" size={14} /></span>
                </div>
                <div className="bg-white border border-[#E6D9BF] rounded-2xl rounded-bl-sm p-4 shadow-xs">
                   <div className="flex items-center gap-1.5 h-4">
                    {[0, 1, 2].map(n => (
                      <span key={n} className="w-1.5 h-1.5 rounded-full bg-[#12302B]/40 animate-pulse-dot" style={{ animationDelay: `${n * 0.2}s` }} />
                    ))}
                  </div>
                </div>
             </div>
          )}

          {isListening && (
            <div className="flex flex-col items-center justify-center py-4 gap-2 bg-[#FAF8F3] border border-[#E6D9BF] rounded-2xl p-3 my-1 shadow-inner">
              <Text variant="none" className="text-[10px] font-bold text-[#8B6508] tracking-widest animate-pulse uppercase">
                VINA Listening...
              </Text>
            </div>
          )}
        </div>

        {showWhatsAppExportOptions ? (
          <div className="p-6 border-t border-[#E6D9BF] bg-[#FAF8F3] flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10 shrink-0">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 border-none cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Icon name="MessageCircle" size={14} /> Send to WhatsApp
            </button>
            <button
              onClick={handleResumeChat}
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#E6D9BF] text-[#12302B] hover:bg-black/5 text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <Icon name="RefreshCw" size={14} /> Resume Chat
            </button>
          </div>
        ) : (
          <>
            {/* Input Options */}
            <div className="p-4 pt-2 relative border-t border-[#E6D9BF] bg-[#FAF8F3]">
              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      className="bg-white border border-[#E6D9BF] text-[#12302B] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:bg-[#12302B] hover:text-white shadow-xs cursor-pointer"
                      onClick={() => handleSend(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input Form */}
            <div className="p-4 pt-2 pb-4 border-t border-[#E6D9BF]/30 bg-[#FAF8F3] relative z-10 shrink-0">
              <div className={`relative bg-white border rounded-2xl p-1.5 transition-all shadow-inner ${
                isListening ? 'border-purple-500/50 bg-purple-500/5' : 'border-[#E6D9BF] focus-within:border-[#12302B]'
              }`}>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                      isListening ? 'bg-purple-600 text-white animate-pulse' : 'text-[#12302B]/40 hover:text-[#12302B]'
                    }`}
                    title={isListening ? "Listening..." : "Click to Speak"}
                  >
                    <Icon name="Mic" size={18} />
                  </button>
                  <input
                    type="text"
                    className="flex-1 min-w-0 bg-transparent border-none py-2 text-[#12302B] text-sm font-medium outline-none placeholder:text-[#12302B]/35"
                    placeholder={isListening ? "Listening..." : "Ask VINA anything..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isListening}
                  />
                  <button
                    className="bg-[#12302B] hover:bg-[#1E4D45] text-white border-none w-9 h-9 rounded-xl flex items-center justify-center transition-all mr-1 disabled:opacity-40 cursor-pointer"
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isListening}
                    title="Send"
                  >
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AIPlanner;

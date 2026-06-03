import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { MessagingService } from '../services/messagingService';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import { useAIPlanner } from '../hooks/useAIPlanner';
import Icon, { IconName } from './ui/Icon';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialPrompt?: string;
}

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination, initialPrompt }) => {
  const { t } = useTranslation();
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished,
    preferences,
    handleSend
  } = useAIPlanner(isOpen ? initialDestination : undefined, isOpen ? initialPrompt : undefined);

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
      className="h-[85vh] max-h-[850px] flex flex-col md:flex-row p-0 overflow-hidden glass-dark rounded-[32px] shadow-heavy"
    >
      {/* Background Orbs for Organic Lush Vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full  pointer-events-none z-0 hidden animate-blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full  pointer-events-none z-0 hidden animate-blob-float" style={{ animationDelay: '2s' }} />

      {/* LEFT: Chat Consultation (Lush Glassmorphism) */}
      <div className="flex-1 md:flex-[0.65] flex flex-col relative z-10 border-r border-white/5 w-full">
        <div className="p-6 md:p-10 pb-4 md:pb-6 text-left relative">
          <Heading as="h3" variant="white" className="text-2xl md:text-3xl font-serif tracking-wide flex items-center gap-3">
            <span className="text-brand-gold-light"><Icon name="Leaf" size={24} className="md:w-8 md:h-8" /></span> {t.planner.title}
          </Heading>
          <Text variant="none" className="text-white/50 text-xs md:text-sm mt-2 font-light tracking-wide">
            {t.planner.tagline}
          </Text>
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
                      Your trip will focus on <span className="text-brand-gold-light font-medium italic">{preferences.focus}</span>, 
                      balancing <span className="text-brand-gold-light font-medium italic">{preferences.food}</span> and <span className="text-brand-gold-light font-medium italic">{preferences.style}</span>.
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
                <div className={`max-w-[80%] ${msg.type === 'user'
                    ? 'bg-brand-gold/15 border border-brand-gold/20 rounded-2xl rounded-br-sm p-5  shadow-soft text-right'
                    : 'bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm p-5  shadow-soft text-left'
                  }`}>
                  <Text
                    variant="none"
                    className={`leading-relaxed text-base md:text-lg ${msg.type === 'user' ? 'text-white' : 'text-white/90'} [&_strong]:text-brand-gold-light [&_strong]:font-medium`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
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

          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-2 transition-all duration-300 shadow-inner focus-within:border-brand-gold/40 focus-within:bg-white/10 ">
            <div className="flex items-center gap-3">
              <span className="text-white/30 pl-4 flex items-center justify-center"><Icon name="Mic" size={20} /></span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none py-3 text-white text-lg font-light outline-none placeholder:text-white/30"
                placeholder={t.planner.where || "Ask anything about Vietnam..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="bg-brand-gold text-brand-green-extra-dark border-none rounded-xl px-6 py-3 font-semibold transition-all duration-300 mr-1 disabled:opacity-40 hover:bg-brand-gold-light hover:shadow-gold"
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Live Preferences (Glassmorphic Ticket) */}
      <div className="hidden md:flex flex-[0.35] flex-col glass-dark bg-black/40 p-10 relative z-10 border-l border-white/5 shadow-inner border-t-0 border-b-0 border-r-0 rounded-none">
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

        <div className="mt-12 flex flex-col gap-4">
          <Button
            variant="glass"
            className="w-full bg-white/5 border-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/40 text-white flex items-center justify-center gap-2"
            onClick={() => window.open(MessagingService.generateBlueprintWhatsApp(preferences.focus, preferences.vibe, preferences.style, preferences.food, 'INDIA'), '_blank')}
          >
            <Icon name="MessageCircle" size={18} /> Ask an Expert
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AIPlanner;

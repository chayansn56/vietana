import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';
import { useAIPlanner } from '../hooks/useAIPlanner';
import { WHATSAPP_INDIA, WHATSAPP_VIETNAM } from '../config';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination }) => {
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
  } = useAIPlanner(isOpen ? initialDestination : undefined);
  
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
      className="h-[85vh] max-h-[850px] flex flex-col md:flex-row p-0 overflow-hidden"
    >
      <div className="flex-1 md:flex-[0.65] flex flex-col border-r border-white/5 relative z-10 bg-brand-green-extra-dark/95">
        <div className="p-12 pb-6 text-left">
          <Heading as="h3" size="lg" variant="white" className="mb-3 flex items-center gap-3 font-normal">
            🌿 {t.planner.title}
          </Heading>
          <Text variant="white" size="sm" className="opacity-60 leading-relaxed font-light tracking-wide">
            {t.planner.tagline}
          </Text>
        </div>
        
        <div ref={pcMsgsRef} className="flex-1 overflow-y-auto px-12 flex flex-col gap-7 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, i) => {
            if (msg.type === 'blueprint') {
              const whatsappIndiaText = `Hi VIETANA! I just finished my planning session:\n\nFocus: ${preferences.focus}\nVibe: ${preferences.vibe}\nStyle: ${preferences.style}\nFood: ${preferences.food}\n\nI'd like to discuss this further!`;
              const whatsappVietnamText = `Hi VIETANA! I just finished my planning session:\n\nFocus: ${preferences.focus}\nVibe: ${preferences.vibe}\nStyle: ${preferences.style}\nFood: ${preferences.food}\n\nI'd like to discuss this further!`;
              
              const whatsappIndiaLink = `https://wa.me/919953294543?text=${encodeURIComponent(whatsappIndiaText)}`;
              const whatsappVietnamLink = `https://wa.me/84904123456?text=${encodeURIComponent(whatsappVietnamText)}`;
              
              return (
                <div key={i} className="animate-msg-fade-in w-full my-4 px-2">
                  <div className="bg-brand-green-dark/45 border border-brand-gold/25 rounded-2xl p-6 backdrop-blur-md shadow-heavy max-w-[580px] mx-auto text-left relative overflow-hidden">
                    <Heading as="h4" size="sm" font="serif" variant="accent" className="mb-4 flex items-center gap-2 tracking-wide">
                      ✨ Your Vietnam Journey Blueprint
                    </Heading>
                    <Text variant="white" size="sm" weight="light" className="leading-relaxed mb-6 text-white/80">
                      I've gathered your preferences. Your trip will focus on <span className="text-brand-gold-light font-serif italic text-[1rem] mx-0.5">{preferences.focus}</span>, balancing <span className="text-brand-gold-light font-serif italic text-[1rem] mx-0.5">{preferences.food}</span> and <span className="text-brand-gold-light font-serif italic text-[1rem] mx-0.5">{preferences.style}</span>.
                    </Text>
                    
                    <div className="flex flex-col gap-3">
                      <a 
                        href={whatsappIndiaLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent border border-brand-green text-brand-green-light hover:bg-brand-green/10 font-semibold py-3 px-5 rounded-xl transition-all duration-300 text-sm tracking-wide text-center"
                      >
                        💬 WhatsApp India
                      </a>
                      <a 
                        href={whatsappVietnamLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white/90 hover:border-white/40 hover:bg-white/5 font-semibold py-3 px-5 rounded-xl transition-all duration-300 text-sm tracking-wide text-center"
                      >
                        💬 WhatsApp Vietnam
                      </a>
                      <a 
                        href={`mailto:support@vietana.com?subject=My%20Vietnam%20Journey%20Blueprint&body=${encodeURIComponent(whatsappIndiaText)}`}
                        className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white/90 hover:border-white/40 hover:bg-white/5 font-semibold py-3 px-5 rounded-xl transition-all duration-300 text-sm tracking-wide text-center"
                      >
                        ✉ support@vietana.com
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className={`flex gap-5 items-start animate-msg-fade-in ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.type === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-muted flex shrink-0 items-center justify-center relative shadow-strong after:content-[''] after:absolute after:inset-[-3px] after:rounded-full after:border after:border-brand-gold/20 after:animate-ai-pulse">
                    <span className="text-white text-base relative z-10">🌿</span>
                  </div>
                )}
                <div className={`max-w-[85%] ${
                  msg.type === 'user' 
                    ? 'bg-brand-gold/10 border border-brand-gold/20 rounded-2xl rounded-br-sm p-4 backdrop-blur-md text-white shadow-soft ml-auto' 
                    : 'bg-white/[0.03] border border-white/5 rounded-2xl rounded-bl-sm p-4 backdrop-blur-sm shadow-sm text-white/95'
                }`}>
                  <Text 
                    variant="white" 
                    size="md" 
                    className="leading-relaxed [&_strong]:text-brand-gold-light [&_strong]:font-medium"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              </div>
            );
          })}
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
            <div className="flex flex-wrap gap-3 mb-6 justify-center px-4">
              {options.map((opt, i) => (
                <div 
                  key={i} 
                  className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer hover:bg-brand-gold/10 hover:border-brand-gold hover:text-brand-gold-light hover:-translate-y-0.5" 
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
              <button 
                className="bg-white text-black border-none rounded-full w-11 h-11 flex shrink-0 items-center justify-center cursor-pointer transition-all duration-300 ease-smooth mr-1 hover:bg-brand-gold hover:scale-105 hover:-rotate-12" 
                onClick={() => handleSend()}
                disabled={isFinished}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-[0.35] flex-col bg-black/25 p-12 relative z-10 backdrop-blur-xl border-l border-white/5">
        <Card variant="glass" padding="lg" hover={false} className="h-full border-white/5">
          <Heading as="h4" size="xs" font="sans" className="text-white/30 tracking-[0.2em] uppercase mb-8 flex items-center gap-4 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-brand-gold after:to-transparent">
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
            ].map((item, i) => {
              const isSet = item.value && item.value !== 'Not set';
              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <Text size="xs" variant="none" weight="bold" className="text-white/35 uppercase tracking-widest">
                    {item.icon} {item.label}
                  </Text>
                  <Text 
                    variant="none" 
                    weight={isSet ? 'medium' : 'light'}
                    className={`leading-tight min-h-6 transition-all duration-300 ${
                      isSet ? 'text-brand-gold-light' : 'text-white/20 italic'
                    }`}
                  >
                    {item.value}
                  </Text>
                </div>
              );
            })}
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
    </Modal>
  );
};

export default AIPlanner;

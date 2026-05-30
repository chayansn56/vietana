import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';
import Button from './ui/Button';

const FAQS = [
  { 
    q: 'Do Indian travelers need a visa for Vietnam?', 
    a: 'Yes. Most Indian travelers require a Vietnam visa. VIETANA helps simplify the process and provides fast support, often within 24 hours depending on requirements.' 
  },
  { 
    q: 'Can VIETANA customize my entire trip?', 
    a: 'Absolutely. We do not believe in rigid fixed tours. Every trip can be tailored around your budget, travel style, food preferences and interests.' 
  },
  { 
    q: 'Is Indian food available in Vietnam?', 
    a: 'Yes. From North Indian and South Indian meals to vegetarian, Jain and vegan options, we help travelers feel comfortable while still experiencing authentic Vietnam. Your food comfort matters to us.' 
  },
  { 
    q: 'Will someone help us while we are in Vietnam?', 
    a: 'Yes. Our support team is available in India and Vietnam. We provide local assistance and help when needed before and during your journey.' 
  },
  { 
    q: 'Do you only offer luxury travel?', 
    a: 'No. We create experiences ranging from budget-friendly adventures to premium luxury journeys.' 
  },
  { 
    q: 'Can you arrange airport pickup and local transport?', 
    a: 'Yes. Airport pickup, local transport, private cars and travel coordination can all be arranged for a smoother experience.' 
  },
  { 
    q: 'What if I want hidden places and not tourist spots?', 
    a: 'That is one of our strengths. We focus on experiences discovered through local knowledge — hidden cafés, food streets, lesser-known destinations and unique experiences.' 
  },
  { 
    q: 'Can I talk in Hindi or English?', 
    a: 'Yes. We support travelers in Hindi and English so communication always feels easy and familiar.' 
  }
];

interface FAQProps {
  onOpenPlanner?: (dest?: string, prompt?: string) => void;
}

const FAQ: React.FC<FAQProps> = ({ onOpenPlanner }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [customQuestion, setCustomQuestion] = useState('');

  const formatText = (text: string): React.ReactNode => {
    if (!text.includes('VIETANA')) return text;
    return text.split(/(VIETANA)/g).map((part, i) =>
      part === 'VIETANA' ? (
        <React.Fragment key={i}>
          <img src="/vietana_logo.png" className="h-[1.2em] inline-block align-middle mx-1 brightness-110" alt="" />
          VIETANA
        </React.Fragment>
      ) : part
    );
  };

  const handleWhatsApp = () => {
    const text = `Hello VIETANA,
I have a question:
${customQuestion || 'I want to know more about travel in Vietnam.'}`;
    window.open(`https://wa.me/919953294543?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Section id="faq" variant="cream" spacing="md" className="py-12 md:py-16">
      <Container>
        <SectionHeader 
          label="Common Questions"
          title="🌿 Frequently Asked Questions"
          description="Everything Indian travelers usually ask before visiting Vietnam."
        />

        <div className="max-w-3xl mx-auto flex flex-col gap-3 relative z-10 w-full px-4 md:px-0">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className={`cursor-pointer transition-all duration-300 ease-in-out border rounded-2xl overflow-hidden
                  ${isOpen ? 'border-brand-gold/40 shadow-sm bg-gradient-to-br from-white to-surface-warm' : 'border-black/5 bg-white hover:border-brand-gold/30'}`} 
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4">
                  <h4 className="flex-1 m-0 text-[14px] md:text-[15px] font-semibold text-brand-green-dark leading-snug">
                    {formatText(faq.q)}
                  </h4>
                  <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-transform duration-300 shrink-0 text-xl font-light
                    ${isOpen ? 'text-brand-gold rotate-180' : 'text-brand-gold/60 group-hover:text-brand-gold'}`}>
                    {isOpen ? '−' : '+'}
                  </div>
                </div>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-5 md:px-6 pb-5 m-0 text-[13px] text-[#5f6b7a] leading-[1.5]">
                    {formatText(faq.a)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Ask Your Own Question Card */}
          <div className="mt-8 bg-white/80 backdrop-blur-md border border-brand-green-dark/10 rounded-[24px] p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <h4 className="text-xl md:text-2xl font-serif text-brand-green-dark mb-2 font-bold flex items-center gap-2">
                ❓ Ask Your Own Question
              </h4>
              <p className="text-[#5f6b7a] text-sm mb-6">
                Can't find your answer? Ask us anything about Vietnam travel.
              </p>
              
              <textarea 
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Examples:&#10;• Is vegetarian food available in Da Nang?&#10;• Best honeymoon destination in Vietnam?&#10;• How much cash should I carry?&#10;• Is Grab available everywhere?&#10;• Which city has the best nightlife?"
                className="w-full h-32 bg-white/60 border border-brand-green-dark/15 rounded-xl p-4 text-sm text-brand-green-dark placeholder:text-[#5f6b7a]/60 outline-none focus:border-brand-gold/60 focus:bg-white transition-all resize-none mb-6"
              />

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
                {onOpenPlanner && (
                  <Button 
                    className="flex-1 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-green-extra-dark font-semibold text-xs tracking-widest uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    onClick={() => onOpenPlanner(undefined, "I have a travel question")}
                  >
                    🤖 Ask VIETANA AI
                  </Button>
                )}
                <Button 
                  className="flex-1 py-3 bg-brand-green hover:bg-brand-green-light text-white font-semibold text-xs tracking-widest uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  onClick={handleWhatsApp}
                >
                  💬 Ask on WhatsApp
                </Button>
              </div>

              <div className="text-center pt-5 border-t border-brand-green-dark/5">
                <p className="text-[#5f6b7a] text-[13px] font-medium italic mb-1">
                  Travel Gets Better with VIETANA™
                </p>
                <p className="text-[#5f6b7a] text-xs">
                  Need a custom answer? We're only one message away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;

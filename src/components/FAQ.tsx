import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import BrandName from './ui/BrandName';
import { WHATSAPP_DEFAULT } from '../utils/whatsapp';

interface FAQProps {
  onOpenPlanner?: (dest?: string, prompt?: string) => void;
}

const INFO_CARDS = [
  { icon: '✈️', title: 'Visa', text: 'Covered.' },
  { icon: '🍛', title: 'Food', text: 'No worries.' },
  { icon: '🤝', title: 'Support', text: 'Always nearby.' },
  { icon: '🚕', title: 'Transport', text: 'Easy.' },
  { icon: '✨', title: 'Experiences', text: 'Personalized.' },
  { icon: '💬', title: 'Language', text: 'English • Hindi • Vietnamese.' }
];

const Clarity: React.FC<FAQProps> = ({ onOpenPlanner }) => {
  const handleWhatsApp = () => {
    window.open(`${WHATSAPP_DEFAULT}`, '_blank');
  };

  return (
    <Section id="faq" className="bg-[#FAF8F3] py-20 flex flex-col justify-center min-h-[400px]">
      <Container>
        
        {/* Header */}
        <div className="text-center mb-12">
          <Heading as="h2" size="3xl" font="serif" className="mb-3 font-normal text-[#1D1D1F]">
            Clarity & Peace of Mind
          </Heading>
          <Text size="md" className="text-[#1D1D1F]/75 font-light">
            A few things travelers often ask.
          </Text>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          {INFO_CARDS.map((card, i) => (
            <div 
              key={i} 
              className="bg-[#FFFFFF] rounded-[24px] p-6 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-[2px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#1D1D1F]/5"
            >
              <span className="text-xl">{card.icon}</span>
              <Text size="sm" weight="medium" className="text-[#1D1D1F] m-0">
                {card.title} <span className="text-[#1D1D1F]/55 mx-1">→</span> <span className="font-light text-[#1D1D1F]/75">{card.text}</span>
              </Text>
            </div>
          ))}
        </div>

        {/* Bottom Pill */}
        <div className="flex justify-center">
          <div className="bg-[#FFFFFF] rounded-full px-6 py-4 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1D1D1F]/5">
            <Text size="sm" weight="medium" className="text-[#1D1D1F]/85 uppercase tracking-widest mr-2">
              Still Curious?
            </Text>
            
            <button 
              onClick={() => onOpenPlanner?.()} 
              className="text-sm font-medium text-[#1D1D1F] hover:text-brand-gold transition-colors flex items-center gap-2"
            >
              🤖 Ask <BrandName className="ml-1" /> AI
            </button>

            <span className="hidden sm:inline text-[#1D1D1F]/20">•</span>

            <button 
              onClick={handleWhatsApp}
              className="text-sm font-medium text-[#1D1D1F] hover:text-[#25D366] transition-colors flex items-center gap-2"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>

      </Container>
    </Section>
  );
};

export default Clarity;

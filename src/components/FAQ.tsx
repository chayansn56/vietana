import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';
import Button from './ui/Button';
import { WHATSAPP_DEFAULT } from '../utils/whatsapp';

interface FAQProps {
  onOpenPlanner?: (dest?: string, prompt?: string) => void;
}

const INFO_CARDS = [
  { 
    icon: 'Plane', 
    title: 'Visa Assistance', 
    text: 'Covered.', 
    detail: 'We assist with the entire e-visa application process. For Indian passport holders, we prepare all documents and ensure approval within 3-4 working days.',
    featured: true
  },
  { 
    icon: 'Utensils', 
    title: 'Food Confidence', 
    text: 'No worries.', 
    detail: 'Dedicated Jain kitchens, verified vegetarian dining spots, and pure veg options are mapped out for your specific route. Our local support checks with restaurant chefs in real-time.',
    featured: true
  },
  { 
    icon: 'Handshake', 
    title: 'On-Ground Support', 
    text: 'Always nearby.', 
    detail: 'Our on-ground local team is based in Ho Chi Minh City and Delhi, available 24/7 on WhatsApp for routing, translations, and emergency medical assistance.' 
  },
  { 
    icon: 'Car', 
    title: 'Private Transport', 
    text: 'Easy.', 
    detail: 'Private, air-conditioned cars with trusted local English-speaking drivers are pre-booked for all your city transfers and sightseeing tours.' 
  },
  { 
    icon: 'Sparkles', 
    title: 'Bespoke Travel', 
    text: 'Personalized.', 
    detail: 'Completely customized itineraries tailored to your speed. No rigid timelines or forced group schedules — your travel vibe, your way.' 
  },
  { 
    icon: 'MessageCircle', 
    title: 'Language Solutions', 
    text: 'We speak your tongue.', 
    detail: 'Our guides speak English and Hindi, and our mobile support team translates to Vietnamese in real-time if you are exploring on your own.' 
  }
];

const Clarity: React.FC<FAQProps> = ({ onOpenPlanner }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleWhatsApp = () => {
    window.open(`${WHATSAPP_DEFAULT}`, '_blank');
  };

  return (
    <Section id="faq" className="bg-surface-cream py-20 flex flex-col justify-center min-h-[400px]">
      <Container>
        
        {/* Header */}
        <div className="text-center mb-12">
          <Heading as="h2" size="3xl" font="serif" className="mb-3 font-normal text-brand-green-dark">
            Clarity & Peace of Mind
          </Heading>
          <Text size="md" className="text-text-subtle font-light">
            A few things travelers often ask.
          </Text>
        </div>

        {/* The Grid — featured cards first, then supporting cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {INFO_CARDS.map((card, i) => {
            const isExpanded = expandedCard === i;
            const isFeatured = card.featured;
            return (
              <div 
                key={i} 
                className={`rounded-xl p-5 cursor-pointer transition-all duration-300 ${isFeatured ? 'bg-white border-l-4 border-brand-green shadow-sm hover:shadow-md md:col-span-1' : 'bg-white/60 border border-black/5 hover:bg-white hover:border-brand-green/30'} ${isExpanded ? 'shadow-md' : ''}`}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className={`flex items-center justify-center shrink-0 ${isFeatured ? 'w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green' : 'w-6 h-6 text-brand-green-light'}`}>
                    <Icon name={card.icon} size={isFeatured ? 16 : 13} strokeWidth={1.5} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <Text size="sm" weight={isFeatured ? 'bold' : 'medium'} className="text-text-dark m-0">
                      {card.title}
                    </Text>
                    {!isFeatured && (
                      <Text size="xs" variant="muted" className="font-light mt-0.5">
                        {card.text}
                      </Text>
                    )}
                  </div>
                  {isFeatured && (
                    <span className="text-brand-green text-[10px] font-bold tracking-wider uppercase transition-opacity shrink-0">
                      {isExpanded ? 'Hide' : 'Info'}
                    </span>
                  )}
                </div>
                
                {/* Accordion Detail Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <Text size="xs" className="text-text-subtle font-light leading-relaxed border-t border-black/5 pt-3 mt-3">
                        {card.detail}
                      </Text>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Pill */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full px-6 py-4 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5">
            <Text size="sm" weight="medium" className="text-text-subtle uppercase tracking-widest mr-2">
              Still Curious?
            </Text>
            
            <Button 
              variant="ghost"
              onClick={() => onOpenPlanner?.()} 
              className="text-sm font-medium hover:text-brand-gold flex items-center gap-2"
            >
              <Icon name="Sparkles" size={16} className="text-brand-gold" /> Ask <BrandName className="ml-1" /> AI
            </Button>

            <span className="hidden sm:inline text-black/20">•</span>

            <Button 
              variant="ghost"
              onClick={handleWhatsApp}
              className="text-sm font-medium hover:text-[#25D366] flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.887-6.967C16.586 1.968 14.116.944 11.492.944c-5.439 0-9.863 4.422-9.867 9.856-.001 1.714.453 3.39 1.316 4.873L1.9 21.082l5.806-1.522c.002-.001.002-.001.006-.002zM18.91 16.584c-.33-.165-1.95-.963-2.253-1.074-.302-.11-.522-.165-.742.165-.22.33-.853 1.074-1.045 1.293-.192.22-.385.247-.715.082-1.003-.502-1.95-1.168-2.77-1.95-.66-.628-1.21-1.378-1.547-2.18-.19-.33-.02-.51.144-.674.15-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.082-.165-.742-1.787-1.018-2.447-.269-.648-.54-.56-.742-.57-.19-.01-.41-.01-.63-.01s-.58.085-.88.415c-.3.33-1.155 1.127-1.155 2.748s1.18 3.19 1.346 3.41c.165.22 2.32 3.54 5.62 4.97 1.96.85 2.7 1.02 3.65.88.58-.085 1.95-.8 2.223-1.57.275-.77.275-1.43.19-1.57-.083-.14-.303-.22-.633-.385z" />
              </svg>
              WhatsApp Us
            </Button>
          </div>
        </div>

      </Container>
    </Section>
  );
};

export default Clarity;

import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';

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

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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

  return (
    <Section id="faq" variant="cream" spacing="lg">
      <Container>
        <SectionHeader 
          label="Common Questions"
          title="Frequently Asked Questions"
        />

        <div className="max-w-4xl mx-auto flex flex-col gap-5 relative z-10">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <Card 
                key={i} 
                hover={false}
                padding="none"
                variant="white"
                className={`cursor-pointer transition-all duration-500 ease-smooth border
                  ${isOpen ? 'border-brand-gold/60 shadow-gold hover:shadow-gold-hover bg-gradient-to-br from-white to-surface-warm' : 'border-black/5 shadow-sm hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold-hover bg-white'}`} 
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="p-8 md:p-10 flex items-center justify-between gap-6">
                  <Heading as="h4" size="sm" font="sans" className="flex-1 leading-tight m-0 tracking-wide text-brand-green-dark">
                    {formatText(faq.q)}
                  </Heading>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ease-smooth shrink-0 text-2xl font-light border
                    ${isOpen ? 'bg-brand-gold border-brand-gold text-white rotate-180 shadow-md scale-110' : 'bg-transparent border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold/5'}`}>
                    {isOpen ? '−' : '+'}
                  </div>
                </div>
                <div 
                  className={`transition-all duration-500 ease-smooth overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <Text size="md" variant="subtle" weight="light" className="px-8 md:px-10 pb-10 m-0 leading-relaxed">
                    {formatText(faq.a)}
                  </Text>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;

import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const openContactPanel = () => {
    window.open('https://wa.me/919953294543', '_blank');
  };

  return (
    <Section id="contact" variant="dark" spacing="lg" className="text-center">
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 z-0 bg-brand-blue -top-24 -left-24" />
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-20 z-0 bg-brand-gold -bottom-24 -right-24" />
      
      <Container className="relative z-10">
        <span className="inline-block text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-brand-gold mb-5 reveal">
          {t.contact.title}
        </span>
        <Heading as="h2" className="text-[2.5rem] md:text-[3.5rem] leading-tight mb-6 text-white reveal">
          {t.contact.heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Heading>
        <Text variant="white" size="lg" className="opacity-70 font-light reveal">
          {t.contact.sub}
        </Text>
        
        <div className="mt-12 flex justify-center reveal reveal-d1">
          <Button 
            onClick={openContactPanel} 
            variant="glass"
            className="px-14 py-5 font-bold tracking-[2px] border-brand-blue text-brand-blue-light hover:bg-brand-blue/10"
          >
            {t.contact.cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;

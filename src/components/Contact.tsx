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
        <Heading 
          as="h4"
          size="xs"
          font="sans"
          variant="accent"
          className="inline-block mb-5 tracking-[0.28em] uppercase reveal"
        >
          {t.contact.title}
        </Heading>

        <Heading as="h2" variant="white" className="leading-tight mb-6 reveal">
          {t.contact.heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Heading>
        <Text variant="white" size="lg" weight="light" className="opacity-70 reveal">
          {t.contact.sub}
        </Text>
        
        <div className="mt-12 flex justify-center reveal delay-100">
          <Button 
            onClick={openContactPanel} 
            variant="glass"
            className="px-12 py-4 font-bold tracking-widest border-brand-blue text-brand-blue-light hover:bg-brand-blue/10"
          >
            {t.contact.cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;

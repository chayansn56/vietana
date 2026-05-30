import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openContactPanel = () => {
    setIsModalOpen(true);
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-4xl" className="overflow-hidden">
        <div className="bg-brand-green-dark p-8 md:p-12 text-left max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold/30">
          <div className="mb-10 text-center">
            <span className="text-brand-green-dark bg-brand-gold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold mb-6 inline-block">🌿 Talk to Us</span>
            <Heading as="h2" size="2xl" variant="white" className="mb-4">Talk to Someone Who Understands Your Travel Style</Heading>
            <Text variant="white" className="opacity-80 max-w-2xl mx-auto leading-relaxed">
              No confusion. No stress. Just local support from people who understand both India and Vietnam.<br/>
              Message us on WhatsApp — we reply quickly in Hindi & English.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 border-t border-b border-white/10 py-10">
            {/* INDIA */}
            <div className="space-y-6">
              <Text size="sm" variant="gold" weight="bold" className="tracking-widest border-b border-brand-gold/20 pb-2 inline-block">🇮🇳 INDIA — NEW DELHI</Text>
              <Heading as="h3" size="lg" variant="white">Vikram Sonker</Heading>
              <div className="space-y-4 text-white/70 font-medium">
                <p className="flex items-center gap-3"><span className="text-xl">📞</span> +91 9953294543</p>
                <p className="flex items-start gap-3"><span className="text-xl">📍</span> <span>RZ 35/36, Indra Park Extension<br/>Near Hanuman Mandir<br/>Uttam Nagar, East Delhi<br/>110059</span></p>
              </div>
              <Button variant="outline" className="w-full mt-6 text-brand-gold border-brand-gold/50 hover:bg-brand-gold hover:text-brand-green-dark" onClick={() => window.open('https://maps.google.com/?q=RZ+35/36,+Indra+Park+Extension+Uttam+Nagar,+East+Delhi+110059', '_blank')}>
                📍 View on Maps
              </Button>
            </div>

            {/* VIETNAM */}
            <div className="space-y-6">
              <Text size="sm" variant="gold" weight="bold" className="tracking-widest border-b border-brand-gold/20 pb-2 inline-block">🇻🇳 VIETNAM — HO CHI MINH CITY</Text>
              <Heading as="h3" size="lg" variant="white">Chayan Soni</Heading>
              <div className="space-y-4 text-white/70 font-medium">
                <p className="flex items-center gap-3"><span className="text-xl">📞</span> +84 902 434 006</p>
                <p className="flex items-start gap-3"><span className="text-xl">📍</span> <span>45 Nguyễn Quý Đức<br/>An Phú Ward<br/>Ho Chi Minh City<br/>Vietnam</span></p>
              </div>
              <Button variant="outline" className="w-full mt-6 text-brand-gold border-brand-gold/50 hover:bg-brand-gold hover:text-brand-green-dark" onClick={() => window.open('https://maps.google.com/?q=45+Nguyễn+Quý+Đức+An+Phú+Ho+Chi+Minh+City+Vietnam', '_blank')}>
                📍 View on Maps
              </Button>
            </div>
          </div>

          {/* ONLINE */}
          <div className="mb-10">
            <Text size="sm" variant="gold" weight="bold" className="tracking-widest mb-6 text-center border-b border-brand-gold/20 pb-2 inline-block w-full">🌐 ONLINE</Text>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-white/80 font-medium">
              <div className="text-center md:text-left space-y-3">
                <p>Website: <a href="https://www.vietana.com" className="text-brand-blue-light hover:underline ml-2">www.vietana.com</a></p>
                <p>Email: <a href="mailto:miquang.cv@gmail.com" className="text-brand-blue-light hover:underline ml-2">miquang.cv@gmail.com</a></p>
              </div>
              <div className="h-16 w-px bg-white/20 hidden md:block"></div>
              <div className="space-y-2 text-sm text-center md:text-left text-white/90">
                <p className="flex items-center gap-2"><span>🕒</span> Open Every Day</p>
                <p className="flex items-center gap-2"><span className="text-brand-whatsapp">✓</span> Fast Response</p>
                <p className="flex items-center gap-2"><span className="text-brand-whatsapp">✓</span> Hindi & English Support</p>
                <p className="flex items-center gap-2"><span className="text-brand-whatsapp">✓</span> Local Vietnam Expertise</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <Text variant="gold" className="italic mb-8 font-medium">Travel Gets Better with VIETANA™</Text>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="mailto:miquang.cv@gmail.com" className="flex-1 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-light py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-brand-blue/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
                <span className="text-lg">✉️</span> Send Email
              </a>
              <a href="https://wa.me/919953294543" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
                <span className="text-lg">💬</span> WhatsApp India (+91)
              </a>
              <a href="https://wa.me/84902434006" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
                <span className="text-lg">💬</span> WhatsApp Vietnam (+84)
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </Section>
  );
};

export default Contact;

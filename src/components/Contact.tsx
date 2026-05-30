import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-4xl" 
      variant="light"
      className="overflow-hidden !bg-white/90 backdrop-blur-[20px] !rounded-[32px] shadow-2xl border border-white/40"
    >
      <div className="p-8 md:p-12 text-left max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-green/30">
        <div className="mb-10 text-center animate-fade-in scale-100">
          <span className="text-brand-green-dark bg-brand-gold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold mb-6 inline-block shadow-sm">🌿 Talk to Us</span>
          <Heading as="h2" size="2xl" variant="dark" className="mb-4 text-brand-green-extra-dark">Talk to Someone Who Understands Your Travel Style</Heading>
          <Text variant="dark" className="opacity-80 max-w-2xl mx-auto leading-relaxed">
            No confusion. No stress.<br/>
            Just local support from people who understand both India and Vietnam.<br/><br/>
            Message us on WhatsApp — we reply quickly in Hindi & English.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 border-t border-b border-brand-green/10 py-10">
          {/* INDIA */}
          <div className="space-y-6">
            <Text size="sm" variant="accent" weight="bold" className="tracking-widest border-b border-brand-green/20 pb-2 inline-block">🇮🇳 INDIA — NEW DELHI</Text>
            <Heading as="h3" size="lg" variant="dark" className="text-brand-green-dark">Vikram Sonker</Heading>
            <div className="space-y-4 text-text-dark font-medium">
              <p className="flex items-center gap-3"><span className="text-xl">📞</span> +91 9953294543</p>
              <p className="flex items-center gap-3"><span className="text-xl">✉️</span> <a href="mailto:vikram@vietana.com" className="hover:text-brand-gold hover:underline">vikram@vietana.com</a></p>
              <p className="flex items-start gap-3"><span className="text-xl">📍</span> <span>RZ 35/36, Indra Park Ext.<br/>Hanuman Mandir<br/>Uttam Nagar<br/>East Delhi – 110059</span></p>
            </div>
            <Button variant="outline" className="w-full mt-6 text-brand-green-dark border-brand-green/30 hover:bg-brand-green-dark hover:text-brand-gold" onClick={() => window.open('https://maps.google.com/?q=RZ+35/36,+Indra+Park+Extension+Uttam+Nagar,+East+Delhi+110059', '_blank')}>
              📍 View on Maps
            </Button>
          </div>

          {/* VIETNAM */}
          <div className="space-y-6">
            <Text size="sm" variant="accent" weight="bold" className="tracking-widest border-b border-brand-green/20 pb-2 inline-block">🇻🇳 VIETNAM — HO CHI MINH CITY</Text>
            <Heading as="h3" size="lg" variant="dark" className="text-brand-green-dark">Chayan Soni</Heading>
            <div className="space-y-4 text-text-dark font-medium">
              <p className="flex items-center gap-3"><span className="text-xl">📞</span> +84 902434006</p>
              <p className="flex items-center gap-3"><span className="text-xl">✉️</span> <a href="mailto:chayan@vietana.com" className="hover:text-brand-gold hover:underline">chayan@vietana.com</a></p>
              <p className="flex items-start gap-3"><span className="text-xl">📍</span> <span>45 Nguyễn Quý Đức<br/>An Phú<br/>Ho Chi Minh City</span></p>
            </div>
            <Button variant="outline" className="w-full mt-6 text-brand-green-dark border-brand-green/30 hover:bg-brand-green-dark hover:text-brand-gold" onClick={() => window.open('https://maps.google.com/?q=45+Nguyễn+Quý+Đức+An+Phú+Ho+Chi+Minh+City+Vietnam', '_blank')}>
              📍 View on Maps
            </Button>
          </div>
        </div>

        {/* ONLINE */}
        <div className="mb-10">
          <Text size="sm" variant="accent" weight="bold" className="tracking-widest mb-6 text-center border-b border-brand-green/20 pb-2 inline-block w-full">🌐 ONLINE</Text>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-text-dark font-medium">
            <div className="text-center md:text-left space-y-3">
              <p>Website: <a href="https://www.vietana.com" className="text-brand-green-dark font-bold hover:underline ml-2 hover:text-brand-gold">www.vietana.com</a></p>
              <p>General Info: <a href="mailto:info@vietana.com" className="text-brand-green-dark font-bold hover:underline ml-2 hover:text-brand-gold">info@vietana.com</a></p>
              <p>Bookings: <a href="mailto:bookings@vietana.com" className="text-brand-green-dark font-bold hover:underline ml-2 hover:text-brand-gold">bookings@vietana.com</a></p>
            </div>
            <div className="h-20 w-px bg-brand-green/20 hidden md:block"></div>
            <div className="space-y-2 text-sm text-center md:text-left text-text-dark">
              <p className="flex items-center gap-2"><span>🕒</span> Open Every Day</p>
              <p className="flex items-center gap-2"><span className="text-brand-whatsapp font-bold">✓</span> Fast Response</p>
              <p className="flex items-center gap-2"><span className="text-brand-whatsapp font-bold">✓</span> Hindi & English</p>
              <p className="flex items-center gap-2"><span className="text-brand-whatsapp font-bold">✓</span> Local Vietnam Expertise</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-brand-green/10">
          <Text variant="accent" className="italic mb-8 font-bold">Travel Gets Better with VIETANA™</Text>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="mailto:info@vietana.com" className="flex-1 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-dark py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-brand-blue/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
              <span className="text-lg">✉️</span> Send Email
            </a>
            <a href="https://wa.me/919953294543" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/15 border border-[#25D366]/50 text-[#1EAA52] py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/30 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
              <span className="text-lg">💬</span> WhatsApp India
            </a>
            <a href="https://wa.me/84902434006" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/15 border border-[#25D366]/50 text-[#1EAA52] py-4 px-4 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/30 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs">
              <span className="text-lg">💬</span> WhatsApp Vietnam
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;

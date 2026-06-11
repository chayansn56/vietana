import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SERVICES } from '../data/siteContent';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import Modal from './ui/Modal';
import Button from './ui/Button';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Grid from './ui/Grid';
import Card from './ui/Card';
import { Heading, Text } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';
import BrandName, { FormatBrand } from './ui/BrandName';

interface ServiceModalItem {
  key: string;
  iconName: IconName;
  title: string;
  content: string;
  cta: string;
  action: 'planner' | 'whatsapp';
}

const SERVICE_MODAL_DATA: ServiceModalItem[] = [
  {
    key: 'visa',
    iconName: 'ClipboardList',
    title: "Visa Assistance — VIETANA™",
    content: "<strong>Documents</strong><br>✓ Passport (6+ months)<br>✓ Passport photo<br>✓ Passport scan<br>✓ Travel dates<br><br><strong>Time</strong><br>⏱ 3–5 working days<br>⚡ Urgent: 24–48 hrs<br><br><strong>Official:</strong><br><a href='https://evisa.gov.vn' target='_blank'>https://evisa.gov.vn</a>",
    cta: "VIETANA™ can guide you",
    action: 'whatsapp'
  },
  {
    key: 'planning',
    iconName: 'Map',
    title: "Custom Planning — VIETANA™",
    content: "<strong>Perfect for</strong><br>💕 Honeymoon<br>👨‍👩‍👧 Family<br>✨ Luxury<br>🌴 Hidden experiences<br><br><strong>Built around</strong><br>💰 Budget<br>🍛 Food<br>🎯 Travel style",
    cta: "Plan with VIETANA™",
    action: 'planner'
  },
  {
    key: 'pickup',
    iconName: 'Car',
    title: "Airport Pickup — VIETANA™",
    content: "<strong>Included</strong><br>✓ AC vehicle<br>✓ Flight tracking<br>✓ Hotel drop-off<br>✓ Arrival assistance<br><br>🚘 Sedan • SUV • Van",
    cta: "Book with VIETANA™",
    action: 'whatsapp'
  },
  {
    key: 'hotel',
    iconName: 'Building',
    title: "Hotel Booking — VIETANA™",
    content: "<strong>Stay options</strong><br>✓ Budget<br>✓ Premium<br>✓ Family<br>✓ Honeymoon<br><br>🍛 Indian food nearby available",
    cta: "Find my stay with VIETANA™",
    action: 'planner'
  },
  {
    key: 'sim',
    iconName: 'Wifi',
    title: "SIM & Travel Essentials — VIETANA™",
    content: "<strong>Ready instantly</strong><br>✓ eSIM support<br>✓ Local SIM<br>✓ Grab setup<br>✓ Maps help<br><br>📱 Stay connected from arrival",
    cta: "Setup with VIETANA™",
    action: 'whatsapp'
  },
  {
    key: 'tickets',
    iconName: 'Ticket',
    title: "Tickets & Guides — VIETANA™",
    content: "<strong>Popular bookings</strong><br>✓ Ba Na Hills<br>✓ Ha Long Cruise<br>✓ VinWonders<br>✓ Local guides<br><br>🎟 Book before landing",
    cta: "Reserve with VIETANA™",
    action: 'whatsapp'
  },
  {
    key: 'food',
    iconName: 'Soup',
    title: "Food Support — VIETANA™",
    content: "<strong>Available</strong><br>✓ Vegetarian<br>✓ Jain<br>✓ North Indian<br>✓ South Indian<br><br>🍜 Hidden food recommendations included",
    cta: "Eat better with VIETANA™",
    action: 'planner'
  },
  {
    key: 'tailored',
    iconName: 'Sparkles',
    title: "Tailored Experiences — VIETANA™",
    content: "<strong>Choose your vibe</strong><br>💕 Honeymoon<br>🌃 Nightlife<br>📸 Hidden gems<br>👨‍👩‍👧 Family journeys<br><br>🌴 Built around you",
    cta: "Travel your way with VIETANA™",
    action: 'planner'
  },
  {
    key: 'support',
    iconName: 'MessageCircle',
    title: "Local Support — VIETANA™",
    content: "<strong>Always available</strong><br>✓ Hindi & English<br>✓ India + Vietnam support<br>✓ Local guidance<br><br>📍 Real people on the ground",
    cta: "Talk with VIETANA™",
    action: 'whatsapp'
  }
];

interface ServicesProps {
    onOpenPlanner: (destination?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenPlanner }) => {
  const { t } = useTranslation();
  const [selectedSrv, setSelectedSrv] = useState<ServiceModalItem | null>(null);

  const openSrvModal = (key: string) => {
    const data = SERVICE_MODAL_DATA.find(d => d.key === key);
    if (data) setSelectedSrv(data);
  };

  const closeSrvModal = () => setSelectedSrv(null);

  return (
    <Section id="services" variant="warm" spacing="lg" className="relative overflow-hidden">
      {/* Colorful Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-gold/15 rounded-full  hidden animate-blob-float opacity-70" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-blue/10 rounded-full  hidden animate-blob-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-brand-green/10 rounded-full  hidden animate-blob-float opacity-50" style={{ animationDelay: '4s' }} />
      </div>
      
      <Container className="relative z-10">
        <div className="mb-20 reveal text-center flex flex-col items-center">
          <Heading as="h2" size="4xl" font="sans" className="inline-block mb-4 tracking-[0.1em] font-extrabold bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold text-transparent bg-clip-text drop-shadow-sm uppercase">
            {t.services.title}
          </Heading>
          <Text size="xl" className="font-serif font-light text-text-dark/80 tracking-wide max-w-2xl">
            {t.services.subtitle}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((s, i) => {
            const serviceData = t.services[s.key as keyof typeof t.services];
            if (typeof serviceData === 'string') return null;
            
            // Bento Box layout spanning
            let spanClass = 'md:col-span-1 md:row-span-1';
            if (i === 0) spanClass = 'md:col-span-2 md:row-span-2';
            else if (i === 3) spanClass = 'md:row-span-2';
            else if (i === 4) spanClass = 'md:col-span-2 md:row-span-1';
            else if (i === 7) spanClass = 'md:col-span-2 md:row-span-1';

            return (
              <div 
                key={i} 
                className={`group relative cursor-pointer reveal transition-all duration-700 active:scale-95 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden ${spanClass}`}
                onClick={() => openSrvModal(s.key)}
              >
                {/* Liquid Glass Background */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:bg-white/60" />
                
                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] border border-brand-green/30 shadow-[inset_0_0_20px_rgba(61,139,125,0.1)]" />

                <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between">
                  <div className="w-16 h-16 rounded-[1.5rem] mb-6 flex items-center justify-center bg-white/70 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon name={s.ico as IconName} size={32} className="text-brand-green-dark" />
                  </div>
                  
                  <div>
                    <Heading as="h3" size="md" font="sans" className="mb-3 text-text-dark font-extrabold tracking-tight group-hover:text-brand-green-dark transition-colors">
                      {serviceData.t}
                    </Heading>
                    <Text size="base" variant="subtle" className="font-medium group-hover:text-text-dark/90 transition-colors">
                      {serviceData.d}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <Modal 
        isOpen={!!selectedSrv} 
        onClose={closeSrvModal}
        maxWidth="max-w-md"
        className="p-12"
      >
        {selectedSrv && (
          <div className="flex flex-col gap-6">
            <Heading 
              as="h3"
              size="md"
              font="sans"
              className="text-white flex items-center gap-2 [&_strong]:text-brand-gold-light" 
            >
              <Icon name={selectedSrv.iconName} size={24} className="text-brand-gold" />
              <FormatBrand text={selectedSrv.title} />
            </Heading>

            <Text 
              variant="white"
              size="sm"
              className="leading-relaxed text-white/80 [&_strong]:text-brand-gold-light [&_strong]:font-semibold [&_a]:text-brand-blue [&_a]:font-semibold [&_a:hover]:underline" 
              dangerouslySetInnerHTML={{ __html: selectedSrv.content }} 
            />
            <Button 
              className="w-full flex items-center justify-center gap-2"
              variant="primary"
              onClick={() => {
                closeSrvModal();
                if (selectedSrv.action === 'planner') {
                  onOpenPlanner();
                } else {
                  window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT), '_blank');
                }
              }}
            >
              <Icon name={selectedSrv.action === 'whatsapp' ? 'MessageCircle' : 'Sparkles'} size={18} />
              <FormatBrand text={selectedSrv.cta} />
            </Button>
          </div>
        )}
      </Modal>
    </Section>
  );
};

export default Services;

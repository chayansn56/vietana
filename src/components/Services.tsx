import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import SectionHeader from './ui/SectionHeader';

const SERVICE_MODAL_DATA = [
  {
    key: 'visa',
    title: "📋 Visa Assistance — VIETANA™",
    content: "<strong>Documents</strong><br>✓ Passport (6+ months)<br>✓ Passport photo<br>✓ Passport scan<br>✓ Travel dates<br><br><strong>Time</strong><br>⏱ 3–5 working days<br>⚡ Urgent: 24–48 hrs<br><br><strong>Official:</strong><br><a href='https://evisa.gov.vn' target='_blank'>https://evisa.gov.vn</a>",
    cta: "💬 VIETANA™ can guide you"
  },
  {
    key: 'planning',
    title: "🗺️ Custom Planning — VIETANA™",
    content: "<strong>Perfect for</strong><br>💕 Honeymoon<br>👨‍👩‍👧 Family<br>✨ Luxury<br>🌴 Hidden experiences<br><br><strong>Built around</strong><br>💰 Budget<br>🍛 Food<br>🎯 Travel style",
    cta: "✨🤖 Plan with VIETANA™"
  },
  {
    key: 'pickup',
    title: "🚗 Airport Pickup — VIETANA™",
    content: "<strong>Included</strong><br>✓ AC vehicle<br>✓ Flight tracking<br>✓ Hotel drop-off<br>✓ Arrival assistance<br><br>🚘 Sedan • SUV • Van",
    cta: "💬 Book with VIETANA™"
  },
  {
    key: 'hotel',
    title: "🏨 Hotel Booking — VIETANA™",
    content: "<strong>Stay options</strong><br>✓ Budget<br>✓ Premium<br>✓ Family<br>✓ Honeymoon<br><br>🍛 Indian food nearby available",
    cta: "✨🤖 Find my stay with VIETANA™"
  },
  {
    key: 'sim',
    title: "📶 SIM & Travel Essentials — VIETANA™",
    content: "<strong>Ready instantly</strong><br>✓ eSIM support<br>✓ Local SIM<br>✓ Grab setup<br>✓ Maps help<br><br>📱 Stay connected from arrival",
    cta: "💬 Setup with VIETANA™"
  },
  {
    key: 'tickets',
    title: "🎫 Tickets & Guides — VIETANA™",
    content: "<strong>Popular bookings</strong><br>✓ Ba Na Hills<br>✓ Ha Long Cruise<br>✓ VinWonders<br>✓ Local guides<br><br>🎟 Book before landing",
    cta: "💬 Reserve with VIETANA™"
  },
  {
    key: 'food',
    title: "🍛 Food Support — VIETANA™",
    content: "<strong>Available</strong><br>✓ Vegetarian<br>✓ Jain<br>✓ North Indian<br>✓ South Indian<br><br>🍜 Hidden food recommendations included",
    cta: "✨🤖 Eat better with VIETANA™"
  },
  {
    key: 'tailored',
    title: "✨ Tailored Experiences — VIETANA™",
    content: "<strong>Choose your vibe</strong><br>💕 Honeymoon<br>🌃 Nightlife<br>📸 Hidden gems<br>👨‍👩‍👧 Family journeys<br><br>🌴 Built around you",
    cta: "✨🤖 Travel your way with VIETANA™"
  },
  {
    key: 'support',
    title: "🛡️ Local Support — VIETANA™",
    content: "<strong>Always available</strong><br>✓ Hindi & English<br>✓ India + Vietnam support<br>✓ Local guidance<br><br>📍 Real people on the ground",
    cta: "💬 Talk with VIETANA™"
  }
];

const SERVICES = [
  { ico: '📋', key: 'visa' },
  { ico: '🗺️', key: 'planning' },
  { ico: '🚗', key: 'pickup' },
  { ico: '🏨', key: 'hotel' },
  { ico: '📶', key: 'sim' },
  { ico: '🎫', key: 'tickets' },
  { ico: '🍛', key: 'food' },
  { ico: '✨', key: 'tailored' },
  { ico: '🛡️', key: 'support' }
];

interface ServicesProps {
    onOpenPlanner: (destination?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenPlanner }) => {
  const { t } = useTranslation();
  const [selectedSrv, setSelectedSrv] = useState<any>(null);

  const openSrvModal = (key: string) => {
    const data = SERVICE_MODAL_DATA.find(d => d.key === key);
    setSelectedSrv(data);
  };

  const closeSrvModal = () => setSelectedSrv(null);

  return (
    <section id="services" className="bg-[var(--wm)] relative overflow-hidden py-40 pb-48">
      <div className="absolute top-8 -right-4 font-serif text-clamp-5-14vw-13rem font-light text-[var(--g)]/5 tracking-wider pointer-events-none select-none z-0">
        {t.services.ghost}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          label={t.services.title}
          title={t.services.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((s, i) => {
            const serviceData = t.services[s.key as keyof typeof t.services];
            if (typeof serviceData === 'string') return null;
            
            return (
              <div 
                key={i} 
                className="group bg-white rounded-[var(--r)] p-9 border border-[var(--g)]/10 shadow-[var(--sh0)] relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--sh3)] cursor-pointer r"
                onClick={() => openSrvModal(s.key)}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--g)] to-[var(--gold)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[var(--e2)]" />
                
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-3xl bg-gradient-to-br from-[var(--g)]/5 to-[var(--gold)]/10 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-gradient-to-br group-hover:from-[var(--g)]/15 group-hover:to-[var(--gold)]/20 transition-all duration-500 ease-[var(--e3)]">
                  {s.ico}
                </div>
                
                <h3 className="text-lg font-medium mb-2 text-[var(--g)]">
                  {serviceData.t}
                </h3>
                <p className="text-[0.83rem] text-[var(--ts)] leading-relaxed">
                  {serviceData.d}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedSrv} 
        onClose={closeSrvModal}
        maxWidth="max-w-md"
        className="p-12"
      >
        {selectedSrv && (
          <div className="flex flex-col gap-6">
            <div 
              className="text-xl font-bold text-white flex items-center gap-2 [&_strong]:text-[var(--gold3)]" 
              dangerouslySetInnerHTML={{ __html: selectedSrv.title }} 
            />
            <div 
              className="text-[0.95rem] leading-relaxed text-white/80 [&_strong]:text-[var(--gold3)] [&_strong]:font-semibold [&_a]:text-[var(--blue)] [&_a]:font-semibold [&_a:hover]:underline" 
              dangerouslySetInnerHTML={{ __html: selectedSrv.content }} 
            />
            <Button 
              className="w-full"
              variant="primary"
              onClick={() => {
                if (selectedSrv.cta.includes('✨🤖')) {
                  closeSrvModal();
                  onOpenPlanner();
                } else {
                  window.open('https://wa.me/919953294543', '_blank');
                }
              }}
            >
              {selectedSrv.cta.includes('✨🤖') ? '✨🤖 ' : '💬 '}
              {selectedSrv.cta.replace('✨🤖 ', '').replace('💬 ', '')}
            </Button>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Services;

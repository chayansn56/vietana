import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import './Services.css';

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
    <section id="services">
      <div className="sg-ghost">{t.services.ghost}</div>
      <div className="sh r">
        <span className="lbl">{t.services.title}</span>
        <h2>{t.services.subtitle}</h2>
      </div>
      <div className="srvg">
        {SERVICES.map((s, i) => {
          const serviceData = t.services[s.key as keyof typeof t.services];
          if (typeof serviceData === 'string') return null;
          const delayClass = `d${(i % 3) + 1}`;
          return (
            <div key={i} className={`sc r ${delayClass}`} onClick={() => openSrvModal(s.key)}>
              <div className="sc-ico">{s.ico}</div>
              <h3>{serviceData.t}</h3>
              <p>{serviceData.d}</p>
            </div>
          );
        })}
      </div>

      {/* SERVICE MODAL */}
      {selectedSrv && (
        <div className="srv-modal-overlay show" onClick={(e) => e.target === e.currentTarget && closeSrvModal()}>
          <div className="srv-modal">
            <button className="srv-close" onClick={closeSrvModal}>×</button>
            <div className="srv-title" dangerouslySetInnerHTML={{ __html: selectedSrv.title }}></div>
            <div className="srv-content" dangerouslySetInnerHTML={{ __html: selectedSrv.content }}></div>
            <button 
                className="srv-cta-btn"
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
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

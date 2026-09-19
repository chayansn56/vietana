import React, { useState } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import ServicePopup, { ServiceDetail } from './ServicePopup';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';

// Artistic Botanical Luxury Card Styling
const MINIMAL_CARD_CLASS = 'bg-white/85 dark:bg-[#0A1C18]/85 backdrop-blur-xl border border-[#1E4D45]/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgb(30,77,69,0.08)] hover:-translate-y-1 hover:bg-white/95 dark:hover:bg-[#0A1C18]/95 transition-all duration-500 overflow-hidden relative group';
const MINIMAL_HIGHLIGHT_CARD_CLASS = 'bg-white/85 dark:bg-[#0A1C18]/85 backdrop-blur-xl border-2 border-brand-gold/30 shadow-[0_4px_20px_rgb(212,175,55,0.05)] hover:shadow-[0_12px_32px_rgb(212,175,55,0.12)] hover:-translate-y-1 hover:bg-white/95 dark:hover:bg-[#0A1C18]/95 transition-all duration-500 overflow-hidden relative group';

const PREMIUM_SERVICES: (ServiceDetail & { bentoClass: string; iconColor: string })[] = [
  {
    id: 'visa',
    icon: 'ClipboardList',
    shortTitle: 'Visa Assistance',
    shortDesc: 'Fast, simple and stress-free entry. Step-by-step guidance.',
    popupTitle: 'Fast, Simple and Stress-Free.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-2 lg:row-span-1 ${MINIMAL_HIGHLIGHT_CARD_CLASS}`,
    iconColor: 'text-brand-gold',
    priceInr: 15000,
    priceTagline: 'EVISA (IN 24 H)',
    highlight: true,
    content: (
      <>
        <p>Getting your Vietnam e-visa is simple. Just send us the following via WhatsApp, Zalo, or email, and we'll guide you through the process:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passport copy (valid for at least 6 months)</li>
          <li>Passport-style photograph</li>
        </ul>
        <p>Complete end-to-end e-Visa processing. We also help with declarations and other travel requirements, so you don’t have to figure everything out yourself.</p>
        <div className="mt-8 p-5 bg-red-50/50 border border-red-100 rounded-xl">
          <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Icon name="Zap" size={16} /> Urgent Visa
          </p>
          <p className="text-sm text-[#1E4D45]/80">Need it urgently? Flight already booked? Traveling within the next 24 hours? Expedited options are available for urgent situations to ensure you don't miss your flight.</p>
        </div>
      </>
    )
  },
  {
    id: 'airport',
    icon: 'Car',
    shortTitle: 'Premium Transfers',
    shortDesc: 'Start relaxed. Dedicated private AC transport waiting for you.',
    popupTitle: 'Start Relaxed From Minute One.',
    image: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: 1700,
    content: (
      <>
        <p>After a long flight, the last thing you need is confusion.</p>
        <p>Whether you’re traveling alone, with family, or in a larger group, we can arrange comfortable transportation based on your requirements.</p>
        <p className="font-medium text-[#1E4D45]">Reliable, premium vehicles tailored to your group size. No haggling with taxis.</p>
      </>
    )
  },
  {
    id: 'sim',
    icon: 'Wifi',
    shortTitle: 'SIM & Connectivity',
    shortDesc: 'eSIMs or physical local SIM cards ready on day one.',
    popupTitle: 'Stay Connected.',
    image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: 850,
    content: (
      <>
        <p>Need an eSIM or a local physical SIM card? We have you covered.</p>
        <p>We’ll help you stay connected from the moment you arrive so you can contact loved ones, use maps, and book rides seamlessly.</p>
      </>
    )
  },
  {
    id: 'culinary',
    icon: 'Soup',
    shortTitle: 'Culinary Concierge',
    shortDesc: 'Michelin reservations and strict dietary accommodations.',
    popupTitle: 'Taste Vietnam, Your Way.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-2 lg:row-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: 0,
    content: (
      <>
        <p>Vietnam is a culinary paradise, but navigating dietary restrictions or securing high-end tables can be challenging.</p>
        <p>Whether you require Halal, Vegan, Gluten-Free, or want access to Vietnam's finest dining and Michelin-starred restaurants, our local teams curate and reserve the best tables for you.</p>
      </>
    )
  },
  {
    id: 'tickets',
    icon: 'Ticket',
    shortTitle: 'Attraction Tickets',
    shortDesc: 'Pre-book Ba Na Hills, VinWonders, and local guides.',
    popupTitle: 'Explore With Confidence.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: 2500,
    content: (
      <>
        <p>Planning to visit Ba Na Hills, VinWonders, Ha Long Bay or other attractions?</p>
        <p>We can help arrange tickets, day tours and trusted local guides before you even land to ensure a seamless experience.</p>
      </>
    )
  },
  {
    id: 'yacht',
    icon: 'Anchor',
    shortTitle: 'Private Yachts',
    shortDesc: 'Exclusive luxury on the water. Sunset cruises & Ha Long.',
    popupTitle: 'Sail In Luxury.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: -1,
    content: (
      <>
        <p>Experience Vietnam from the water in complete privacy and luxury.</p>
        <p>Book a private yacht for unforgettable coastal experiences, complete with a dedicated crew and premium catering. Perfect for sunset river cruises in Saigon or multi-day charters in Ha Long Bay.</p>
      </>
    )
  },
  {
    id: 'photo',
    icon: 'Camera',
    shortTitle: 'Professional Photo',
    shortDesc: 'Local vetted photographers for honeymoons and families.',
    popupTitle: 'Capture Memories Beautifully.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: -1,
    content: (
      <>
        <p>Ideal for honeymoons in Hoi An, family trips in Da Nang, or special celebrations anywhere in Vietnam.</p>
        <p>We arrange vetted local professional photographers to capture your journey so you can focus on enjoying the moment.</p>
      </>
    )
  },
  {
    id: 'local',
    icon: 'MessageCircle',
    shortTitle: '24/7 On-Ground Concierge',
    shortDesc: 'Real support from our local teams via WhatsApp.',
    popupTitle: 'Real People. Real Support.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    bentoClass: `lg:col-span-2 lg:row-span-1 ${MINIMAL_CARD_CLASS}`,
    iconColor: 'text-[#1E4D45]',
    priceInr: 0,
    content: (
      <>
        <p>Traveling to a new country comes with questions, language barriers, and last-minute changes.</p>
        <p>Managed directly by our local teams in Hanoi, Da Nang, and Ho Chi Minh City. We provide seamless itinerary management, recommendations, and emergency support.</p>
        <p className="mt-6 font-medium text-[#1E4D45]">Help is always within reach.</p>
      </>
    )
  }
];

export default function Services({ limit }: { limit?: number }) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  
  const displayServices = limit ? PREMIUM_SERVICES.slice(0, limit) : PREMIUM_SERVICES;

  React.useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent;
      const serviceId = customEvent.detail;
      const found = PREMIUM_SERVICES.find(s => s.id === serviceId);
      if (found) {
        setSelectedService(found);
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Check for pending service triggers on initial load
    const pending = localStorage.getItem('vietana_open_service');
    if (pending) {
      localStorage.removeItem('vietana_open_service');
      const found = PREMIUM_SERVICES.find(s => s.id === pending);
      if (found) {
        setSelectedService(found);
        setTimeout(() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }

    window.addEventListener('select_service', handleSelectService);
    return () => window.removeEventListener('select_service', handleSelectService);
  }, []);

  return (
    <Section id="services" spacing="xl" className="relative overflow-hidden bg-[#0A1C18]">
      {/* Custom Background Image - Fully Visible & Sharp */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url('/custom_bg.png')` }}
      />
      {/* Dark overlay to ensure text readability (No Blur) */}
      <div className="absolute inset-0 z-0 bg-black/30" />
      
      <Container className="relative z-20 max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-3 block">
            CONCIERGE SERVICES
          </span>
          <Heading as="h2" size="4xl" font="serif" className="text-white tracking-tight mb-4">
            Travel Services & Support
          </Heading>
          <div className="w-16 h-px bg-brand-gold mx-auto mb-6"></div>
          <Text variant="none" className="text-white/80 font-light leading-relaxed">
            Everything you need for a comfortable Vietnam holiday. No guesswork, no stress.
          </Text>
        </div>

        {/* UI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-auto">
          {displayServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`rounded-2xl p-8 cursor-pointer flex flex-col justify-between ${service.bentoClass}`}
            >
              {/* Animated Top Border on Hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1E4D45] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className={`${service.iconColor} p-0 flex items-center justify-start relative`}>
                  <Icon name={service.icon} size={28} />
                  {service.highlight && (
                    <div className="absolute -top-1 -right-4 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Heading as="h4" variant="none" className="text-xl font-medium text-[#1E4D45] dark:text-white font-serif tracking-tight">
                    {service.shortTitle}
                  </Heading>
                  <p className="text-sm text-[#1E4D45]/70 dark:text-white/60 font-light leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* View Details Link & Quick Contact */}
              <div className="mt-8 pt-4 border-t border-[#1E4D45]/5 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-4 text-[#1E4D45]/40">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('open_whatsapp', { detail: { message: `Hi VIETANA, I'm interested in the ${service.shortTitle} concierge service.` } }));
                    }}
                    className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 group/icon cursor-pointer bg-transparent border-none p-0"
                    aria-label="Contact via WhatsApp"
                    title="WhatsApp"
                  >
                    <Icon name="MessageCircle" size={16} />
                  </button>
                  <a 
                    href="mailto:vietana@vietana.com" 
                    onClick={(e) => e.stopPropagation()} 
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 group/icon"
                    aria-label="Contact via Email"
                    title="Email"
                  >
                    <Icon name="Mail" size={16} />
                  </a>
                </div>
                <span className="text-[#1E4D45] text-[10px] tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 flex items-center gap-1 group-hover:translate-x-1 transition-all duration-300">
                  Open ➔
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ledger Bottom Note */}
        <div className="bg-white border border-[#1E4D45]/10 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm relative mt-8">
          <p className="text-lg font-serif italic text-[#1E4D45] mb-2">"Your Vietnam Begins Here."</p>
          <Text size="sm" variant="none" className="text-[#1E4D45]/75 font-light">
            Managed directly by our teams in Hanoi, Da Nang, and Ho Chi Minh City to guarantee 24/7 on-ground assistance.
          </Text>
        </div>
      </Container>

      <ServicePopup
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </Section>
  );
}

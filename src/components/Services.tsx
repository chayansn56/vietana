import React, { useState } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import ServicePopup, { ServiceDetail } from './ServicePopup';

const PREMIUM_SERVICES: ServiceDetail[] = [
  {
    id: 'visa',
    icon: 'FileText',
    shortTitle: 'Visa Assistance',
    shortDesc: 'Fast, simple and stress-free.',
    popupTitle: 'Fast, Simple and Stress-Free.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Getting your Vietnam e-visa is simple. Just send us the following via WhatsApp, Zalo, or email, and we’ll guide you through the process:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passport copy (valid for at least 6 months)</li>
          <li>Passport-style photograph</li>
        </ul>
        <p>We also help with declarations and other travel requirements, so you don’t have to figure everything out yourself.</p>
        <div className="mt-8 p-5 bg-white border border-black/5 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-[#1E4D45] uppercase tracking-wider mb-2">Urgent Visa</p>
          <p className="text-sm">Need it urgently? Flight already booked? Traveling within the next 24 hours? Get in touch with us. Expedited options are available for urgent situations.</p>
        </div>
      </>
    )
  },
  {
    id: 'airport',
    icon: 'Car',
    shortTitle: 'Airport Pickup',
    shortDesc: 'Start relaxed from minute one.',
    popupTitle: 'Start Relaxed From Minute One.',
    image: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>After a long flight, the last thing you need is confusion.</p>
        <p>Whether you’re traveling alone, with family, or in a larger group, we can arrange comfortable transportation based on your requirements.</p>
        <p className="font-medium text-[#1E4D45]">Simple, reliable and convenient.</p>
      </>
    )
  },
  {
    id: 'hotel',
    icon: 'Building',
    shortTitle: 'Hotel Booking',
    shortDesc: 'Stay your way.',
    popupTitle: 'Stay Your Way.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>From hostels and budget hotels to premium resorts and luxury stays, we’ll help you find accommodation that suits your travel style and budget.</p>
        <p>Our recommendations are based on experience and what works best for different types of travelers.</p>
      </>
    )
  },
  {
    id: 'sim',
    icon: 'Wifi',
    shortTitle: 'SIM & Essentials',
    shortDesc: 'Stay connected.',
    popupTitle: 'Stay Connected.',
    image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Need an eSIM or a local SIM card?</p>
        <p>Need help setting up Grab, maps or other travel apps?</p>
        <p className="font-medium text-[#1E4D45]">No problem.</p>
        <p>We’ll help you stay connected from the moment you arrive.</p>
      </>
    )
  },
  {
    id: 'tickets',
    icon: 'Ticket',
    shortTitle: 'Tickets & Guides',
    shortDesc: 'Explore with confidence.',
    popupTitle: 'Explore With Confidence.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Planning to visit Ba Na Hills, VinWonders, Ha Long Bay or other attractions?</p>
        <p>We can help arrange tickets, day tours and trusted local guides.</p>
      </>
    )
  },
  {
    id: 'food',
    icon: 'Utensils',
    shortTitle: 'Food Support',
    shortDesc: 'Because food matters.',
    popupTitle: 'Because Food Matters.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Whether you’re looking for Indian food, vegetarian options, Jain meals, halal restaurants or authentic Vietnamese dishes, we’ll be happy to point you in the right direction.</p>
        <p>Over the years, we’ve built strong relationships with restaurants across Vietnam and understand the preferences of Indian travelers.</p>
      </>
    )
  },
  {
    id: 'local',
    icon: 'Heart',
    shortTitle: 'Local Support',
    shortDesc: 'Real people. Real support.',
    popupTitle: 'Real People. Real Support.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Traveling to a new country comes with questions.</p>
        <p>Language barriers.</p>
        <p>Last-minute changes.</p>
        <p>Unexpected situations.</p>
        <p className="mt-6 font-medium text-[#1E4D45]">With our presence in both India and Vietnam, help is always within reach.</p>
      </>
    )
  },
  {
    id: 'special',
    icon: 'Sparkles',
    shortTitle: 'Special Requests',
    shortDesc: 'Travel your way.',
    popupTitle: 'Travel Your Way.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Honeymoons, family trips, celebrations, hidden gems, nightlife or something completely unique.</p>
        <p className="font-medium text-[#1E4D45]">If it’s possible, we’ll do our best to make it happen.</p>
      </>
    )
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <Section id="services" spacing="xl" className="bg-[#FAF7F0] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-[#E9DFC8]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[-5%] w-[400px] h-[400px] bg-[#AAB7A1]/15 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-20 max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B8860B] uppercase mb-3 block">
            CONCIERGE SERVICES
          </span>
          <Heading as="h2" size="4xl" font="serif" className="text-[#1E4D45] tracking-tight mb-4">
            The Travel Ledger
          </Heading>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-6"></div>
          <Text variant="none" className="text-[#555555] font-light leading-relaxed">
            From seamless e-visa approvals to dedicated Indian & Jain culinary guidance, our local team logs every detail to safeguard your itinerary.
          </Text>
        </div>

        {/* Vintage Guest Book Ledger */}
        <div className="vintage-ledger rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-lg p-6 sm:p-10 mb-20">
          {/* Header row of Ledger */}
          <div className="hidden sm:flex border-b-2 border-[#1E4D45]/20 pb-4 text-[#B8860B] font-mono text-[10px] tracking-widest uppercase">
            <div className="w-[10%]">ENTRY</div>
            <div className="w-[30%]">DEPARTMENT</div>
            <div className="w-[50%]">LOGGED DESCRIPTION</div>
            <div className="w-[10%] text-right">ACTION</div>
          </div>

          {/* Ledger rows */}
          <div className="flex flex-col">
            {PREMIUM_SERVICES.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="ledger-row py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center text-left cursor-pointer border-b border-[#E8E4D9]/60 hover:bg-[#FAF7F0]/40 transition duration-300"
              >
                {/* Entry ID */}
                <div className="w-[10%] font-mono text-xs text-[#B8860B] mb-2 sm:mb-0">
                  #00{index + 1}
                </div>

                {/* Service Department / Icon */}
                <div className="w-full sm:w-[30%] flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="text-[#1E4D45] shrink-0">
                    <Icon name={service.icon} size={18} strokeWidth={1.5} />
                  </div>
                  <Heading as="h4" variant="none" className="text-base font-bold text-[#1E4D45]">
                    {service.shortTitle}
                  </Heading>
                </div>

                {/* Logged Description */}
                <div className="w-full sm:w-[50%] text-xs sm:text-sm text-[#555555] font-light pr-4 mb-4 sm:mb-0">
                  {service.shortDesc}
                </div>

                {/* View Stamp */}
                <div className="w-full sm:w-[10%] sm:text-right">
                  <span className="inline-block text-[9px] font-mono font-bold tracking-widest uppercase text-[#B8860B] border border-[#D4AF37]/50 rounded px-2.5 py-1 hover:bg-[#D4AF37]/10 transition duration-300">
                    OPEN
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Bottom Note */}
        <div className="bg-[#FAF7F0] border border-[#E8E4D9] rounded-xl p-8 text-center max-w-2xl mx-auto shadow-sm relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF7F0] px-4 text-[#B8860B] font-mono text-[9px] tracking-widest uppercase">
            OFFICIAL STAMP
          </div>
          <p className="text-xl font-serif italic text-[#1E4D45] mb-2">"Feel Vietnam, Your Way."</p>
          <Text size="sm" variant="none" className="text-[#555555]/80 font-light">
            With certified ground handlers in HCMC and local assistance centers in Hanoi and Da Nang, our ledger stays fully interactive for you.
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
};

export default Services;

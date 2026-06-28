import React, { useState } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import ServicePopup, { ServiceDetail } from './ServicePopup';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';

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
        <p>Getting your Vietnam e-visa is simple. Just send us the following via WhatsApp, Zalo, or email, and we'll guide you through the process:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passport copy (valid for at least 6 months)</li>
          <li>Passport-style photograph</li>
        </ul>
        <p>We also help with declarations and other travel requirements, so you don't have to figure everything out yourself.</p>
        <div className="mt-8 p-5 bg-white border border-black/5 rounded-xl shadow-sm">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-wider mb-2">Urgent Visa</p>
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
        <p>Whether you're traveling alone, with family, or in a larger group, we can arrange comfortable transportation based on your requirements.</p>
        <p className="font-medium text-brand-green">Simple, reliable and convenient.</p>
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
        <p>From hostels and budget hotels to premium resorts and luxury stays, we'll help you find accommodation that suits your travel style and budget.</p>
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
        <p className="font-medium text-brand-green">No problem.</p>
        <p>We'll help you stay connected from the moment you arrive.</p>
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
        <p>Whether you're looking for Indian food, vegetarian options, Jain meals, halal restaurants or authentic Vietnamese dishes, we'll be happy to point you in the right direction.</p>
        <p>Over the years, we've built strong relationships with restaurants across Vietnam and understand the preferences of Indian travelers.</p>
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
        <p className="mt-6 font-medium text-brand-green">With our presence in both India and Vietnam, help is always within reach.</p>
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
        <p className="font-medium text-brand-green">If it's possible, we'll do our best to make it happen.</p>
      </>
    )
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <Section id="services" spacing="xl" className="bg-[#FAF7F0] dark:bg-surface-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-surface-warm/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[-5%] w-[400px] h-[400px] bg-[#AAB7A1]/15 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-20 max-w-[1200px]">
        <SectionHeader
          label="CONCIERGE SERVICES"
          title="The Travel Ledger"
          description="From seamless e-visa approvals to dedicated Indian and Jain culinary guidance, our local team logs every detail to safeguard your itinerary."
        />

        {/* Editorial card grid row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {PREMIUM_SERVICES.slice(0, 4).map((service, index) => (
            <Card
              key={service.id}
              variant="editorial"
              padding="none"
              hover
              onClick={() => setSelectedService(service)}
              className="cursor-pointer"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.shortTitle}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-sage flex items-center justify-center shrink-0">
                    <Icon name={service.icon} size={14} strokeWidth={1.5} />
                  </span>
                  <Heading as="h4" variant="none" className="text-sm font-bold text-brand-green dark:text-brand-gold-light">
                    {service.shortTitle}
                  </Heading>
                </div>
                <Text size="xs" variant="none" className="font-light text-text-muted dark:text-white/70">
                  {service.shortDesc}
                </Text>
              </div>
            </Card>
          ))}
        </div>

        {/* Editorial card grid row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PREMIUM_SERVICES.slice(4).map((service) => (
            <Card
              key={service.id}
              variant="editorial"
              padding="none"
              hover
              onClick={() => setSelectedService(service)}
              className="cursor-pointer"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.shortTitle}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-brand-sage flex items-center justify-center shrink-0">
                    <Icon name={service.icon} size={14} strokeWidth={1.5} />
                  </span>
                  <Heading as="h4" variant="none" className="text-sm font-bold text-brand-green dark:text-brand-gold-light">
                    {service.shortTitle}
                  </Heading>
                </div>
                <Text size="xs" variant="none" className="font-light text-text-muted dark:text-white/70">
                  {service.shortDesc}
                </Text>
              </div>
            </Card>
          ))}
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

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
    image: 'https://images.unsplash.com/photo-1559588556-9b34dbce2940?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Getting your Vietnam e-visa is simple.</p>
        <p>Just send us:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passport copy (valid for at least 6 months)</li>
          <li>Passport photograph</li>
        </ul>
        <p>Via WhatsApp, Zalo or email, and we’ll guide you through the process.</p>
        <p>We also help with declarations and other travel requirements, so you don’t have to figure everything out yourself.</p>
        <div className="mt-8 p-5 bg-[#FAF8F3] border border-[#E9DFC8] rounded-xl">
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
    image: 'https://images.unsplash.com/photo-1542837265-8b38ebbd79ad?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1520697830682-898fc1e284b2?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80',
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

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <Section id="services" spacing="xl" className="bg-[#FAF8F3] relative overflow-hidden">
      
      {/* Background Ambience: Grain + Warmth */}
      <div className="absolute inset-0 bg-grain mix-blend-multiply opacity-50 pointer-events-none"></div>
      
      {/* Curved Top Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" style={{ transform: 'rotate(180deg)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50,16.5,100,32.5,150,47.5A788.66,788.66,0,0,0,321.39,56.44Z" fill="#000000"></path>
        </svg>
      </div>

      <Container className="relative z-20 pt-16 md:pt-24">
        <div className="mb-20 md:mb-24 flex flex-col items-center text-center">
          <span className="text-[#AAB7A1] text-xs md:text-sm tracking-[0.25em] font-bold uppercase mb-6">
            The Essentials
          </span>
          <Heading as="h2" size="4xl" font="serif" className="text-[#2E2E2E] mb-8 leading-tight">
            Everything you need for a<br className="hidden md:block"/> smoother Vietnam journey.
          </Heading>
          <Text size="lg" className="text-[#5C5C5C] font-light max-w-2xl mx-auto space-y-4">
            <p>Planning a trip to Vietnam shouldn’t feel complicated.</p>
            <p>Whether it’s getting your visa, finding the right hotel, arranging airport transfers, staying connected, or simply knowing who to call when you need help, we’re here to make things easier.</p>
            <p className="font-medium text-[#1E4D45]">Because sometimes, it’s the little things that make the biggest difference.</p>
          </Text>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24 max-w-6xl mx-auto">
          {PREMIUM_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 cursor-pointer shadow-[0_12px_40px_rgba(46,46,46,0.04)] border border-[#E9DFC8]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(46,46,46,0.08)] flex flex-col"
            >
              <div className="mb-6 text-[#1E4D45] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name={service.icon} size="md" />
              </div>
              
              <h3 className="text-xl text-[#2E2E2E] font-serif mb-3">
                {service.shortTitle}
              </h3>
              
              <p className="text-[#5C5C5C] text-sm font-light leading-relaxed flex-1 mb-8">
                {service.shortDesc}
              </p>

              <div className="flex items-center text-xs font-semibold tracking-wider text-[#AAB7A1] uppercase group-hover:text-[#1E4D45] transition-colors duration-300">
                Learn More 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bottom Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#E9DFC8] shadow-[0_12px_40px_rgba(46,46,46,0.06)] group max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply transition-transform duration-[20s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/60 to-transparent mix-blend-normal"></div>

          <div className="relative z-10 p-10 md:p-20 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-serif text-[#2E2E2E] mb-8 leading-tight">
              More Than Just Bookings
            </h3>
            <div className="w-12 h-[2px] bg-[#AAB7A1] mb-8 mx-auto"></div>
            <div className="text-[#5C5C5C] text-lg font-light space-y-6">
              <p>At VIETANA, we believe travel is not only about visiting places.</p>
              <p>It’s about feeling comfortable, confident and well looked after throughout your journey.</p>
              <p>And wherever you go in Vietnam, it’s always good to know that someone is there to help when needed.</p>
              <p className="text-2xl text-[#1E4D45] italic mt-10 font-serif">Feel Vietnam, Your Way.</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Curved Bottom Divider (optional, if we want to transition back to dark footer, etc) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50,16.5,100,32.5,150,47.5A788.66,788.66,0,0,0,321.39,56.44Z" fill="#0A0F1C"></path>
        </svg>
      </div>

      <ServicePopup 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </Section>
  );
};

export default Services;

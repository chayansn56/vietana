import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';
import ServicePopup, { ServiceDetail } from './ServicePopup';

const PREMIUM_SERVICES: ServiceDetail[] = [
  {
    id: 'visa',
    icon: 'FileText',
    shortTitle: 'Visa Assistance',
    shortDesc: 'Fast, simple, and stress-free e-visas.',
    popupTitle: 'Fast, Simple and Stress-Free.',
    glowColor: '#3B82F6', // Blue + Green feel
    gradient: 'from-blue-600 to-emerald-500',
    animationClass: 'animate-passport-float',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Getting your Vietnam e-visa is simple.</p>
        <p className="mt-4">Just send us:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Passport copy (valid for at least 6 months)</li>
          <li>Passport photograph</li>
        </ul>
        <p className="mt-4">Via WhatsApp, Zalo or email, and we’ll guide you through the process.</p>
        <p className="mt-4">We also help with declarations and other travel requirements, so you don’t have to figure everything out yourself.</p>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-sm">Standard processing time:<br/><span className="text-white font-medium">3–5 working days.</span></p>
        </div>
      </>
    ),
    banner: (
      <>
        <h4 className="text-brand-gold font-medium mb-2">Need it urgently?</h4>
        <p className="text-sm text-white/80">Flight already booked? Traveling within the next 24 hours? Get in touch with us. Expedited options are available for urgent situations.</p>
      </>
    )
  },
  {
    id: 'airport',
    icon: 'Car',
    shortTitle: 'Airport Pickup',
    shortDesc: 'Start relaxed from minute one.',
    popupTitle: 'Start Relaxed From Minute One.',
    glowColor: '#F59E0B', // Soft orange and gold
    gradient: 'from-orange-500 to-amber-600',
    animationClass: 'animate-headlights-move',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>After a long flight, the last thing you need is confusion.</p>
        <p className="mt-4">Whether you’re traveling alone, with family, or in a larger group, we can arrange comfortable transportation based on your requirements.</p>
        <p className="mt-4 font-medium text-white">Simple, reliable and convenient.</p>
      </>
    )
  },
  {
    id: 'hotel',
    icon: 'Building',
    shortTitle: 'Hotel Booking',
    shortDesc: 'Find accommodation that suits your style.',
    popupTitle: 'Stay Your Way.',
    glowColor: '#D4AF37', // Warm beige and gold
    gradient: 'from-[#D4AF37] to-[#8B7355]',
    animationClass: 'animate-parallax-bg',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>From hostels and budget hotels to premium resorts and luxury stays, we’ll help you find accommodation that suits your travel style and budget.</p>
        <p className="mt-4">Our recommendations are based on experience and what works best for different types of travelers.</p>
      </>
    )
  },
  {
    id: 'sim',
    icon: 'Wifi',
    shortTitle: 'SIM & Travel Essentials',
    shortDesc: 'Stay connected from the moment you arrive.',
    popupTitle: 'Stay Connected.',
    glowColor: '#0EA5E9', // Sky blue
    gradient: 'from-sky-400 to-blue-600',
    animationClass: 'animate-signal-pulse',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Need an eSIM or a local SIM card?</p>
        <p className="mt-2">Need help setting up Grab, maps or other travel apps?</p>
        <p className="mt-4 text-white font-medium">No problem.</p>
        <p className="mt-4">We’ll help you stay connected from the moment you arrive.</p>
      </>
    )
  },
  {
    id: 'tickets',
    icon: 'Ticket',
    shortTitle: 'Tickets & Local Guides',
    shortDesc: 'Explore attractions with confidence.',
    popupTitle: 'Explore With Confidence.',
    glowColor: '#10B981', // Green and blue
    gradient: 'from-emerald-500 to-cyan-600',
    animationClass: 'animate-slow-zoom',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Planning to visit Ba Na Hills, VinWonders, Ha Long Bay or other attractions?</p>
        <p className="mt-4">We can help arrange tickets, day tours and trusted local guides.</p>
      </>
    )
  },
  {
    id: 'food',
    icon: 'Utensils',
    shortTitle: 'Food Support',
    shortDesc: 'Because food matters.',
    popupTitle: 'Because Food Matters.',
    glowColor: '#EF4444', // Warm red and gold
    gradient: 'from-red-500 to-orange-500',
    animationClass: 'animate-steam-rise',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Whether you’re looking for Indian food, vegetarian options, Jain meals, halal restaurants or authentic Vietnamese dishes, we’ll be happy to point you in the right direction.</p>
        <p className="mt-4">Over the years, we’ve built strong relationships with restaurants across Vietnam and understand the preferences of Indian travelers.</p>
      </>
    )
  },
  {
    id: 'local',
    icon: 'Heart',
    shortTitle: 'Local Support',
    shortDesc: 'Real people. Real support.',
    popupTitle: 'Real People. Real Support.',
    glowColor: '#059669', // Emerald green
    gradient: 'from-emerald-600 to-green-800',
    animationClass: 'animate-heartbeat',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Traveling to a new country comes with questions.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Language barriers.</li>
          <li>Last-minute changes.</li>
          <li>Unexpected situations.</li>
        </ul>
        <p className="mt-6">With our presence in both India and Vietnam, help is always within reach.</p>
      </>
    )
  },
  {
    id: 'special',
    icon: 'Sparkles',
    shortTitle: 'Special Requests',
    shortDesc: 'Travel your way.',
    popupTitle: 'Travel Your Way.',
    glowColor: '#8B5CF6', // Purple and gold
    gradient: 'from-violet-600 to-fuchsia-600',
    animationClass: 'animate-sparkle-twinkle',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    content: (
      <>
        <p>Honeymoons, family trips, celebrations, hidden gems, nightlife or something completely unique.</p>
        <p className="mt-4 text-white font-medium">If it’s possible, we’ll do our best to make it happen.</p>
      </>
    )
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <Section id="services" spacing="xl" className="bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/5 via-black to-black opacity-60"></div>
      
      <Container className="relative z-10">
        <div className="mb-20 md:mb-24 flex flex-col items-center text-center">
          <span className="text-brand-gold text-sm md:text-base tracking-[0.2em] font-medium uppercase mb-4 animate-fade-in">
            The Essentials
          </span>
          <Heading as="h2" size="4xl" font="serif" className="text-white mb-6">
            Everything you need for a smoother Vietnam journey.
          </Heading>
          <Text variant="white" size="lg" className="opacity-70 font-light max-w-3xl mx-auto">
            Planning a trip to Vietnam shouldn’t feel complicated.<br/><br/>
            Whether it’s getting your visa, finding the right hotel, arranging airport transfers, staying connected, or simply knowing who to call when you need help, we’re here to make things easier.<br/><br/>
            <span className="text-white font-medium">Because sometimes, it’s the little things that make the biggest difference.</span>
          </Text>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {PREMIUM_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-[#111] rounded-3xl p-6 md:p-8 cursor-pointer border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-[#151515] overflow-hidden"
              style={{
                animation: `nfloat ${3 + (idx % 3)}s ${idx * 0.2}s infinite ease-in-out alternate`
              }}
            >
              {/* Dynamic Glow Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${service.glowColor}, transparent)` }}
              ></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-lg transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${service.glowColor}20`, color: service.glowColor }}
                >
                  <Icon name={service.icon} size="md" />
                </div>
                
                <h3 className="text-xl text-white font-medium mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                    style={{ backgroundImage: `linear-gradient(to right, #fff, ${service.glowColor})` }}>
                  {service.shortTitle}
                </h3>
                
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              {/* Small preview image that slides up on hover */}
              <div 
                className="absolute inset-x-0 bottom-0 h-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0 opacity-30"
                style={{ WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent)' }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/80 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bottom Section */}
        <div className="relative rounded-3xl overflow-hidden mt-12 md:mt-24 bg-black border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] group">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-brand-gold/20 to-blue-900/40 opacity-50 animate-gradient-shift bg-[length:200%_200%] mix-blend-overlay"></div>
          
          <div className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-[20s] group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-16 lg:p-20 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-tight animate-text-glow">
              More Than Just Bookings
            </h3>
            <div className="w-16 h-1 bg-brand-gold mb-8 mx-auto rounded-full"></div>
            <Text variant="white" size="lg" className="opacity-80 font-light space-y-4">
              <p>At VIETANA, we believe travel is not only about visiting places.</p>
              <p>It’s about feeling comfortable, confident and well looked after throughout your journey.</p>
              <p>And wherever you go in Vietnam, it’s always good to know that someone is there to help when needed.</p>
              <p className="text-xl text-brand-gold italic mt-8 font-serif">Feel Vietnam, Your Way.</p>
            </Text>
          </div>
        </div>
      </Container>

      {/* The rich interactive popup */}
      <ServicePopup 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </Section>
  );
};

export default Services;

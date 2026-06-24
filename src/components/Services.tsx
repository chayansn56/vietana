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
  const [isGridVisible, setIsGridVisible] = useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsGridVisible(true);
      }
    }, { threshold: 0.1 });

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="services" spacing="xl" className="bg-[#FAF8F3] relative overflow-hidden">
      {/* Ambient Magic Background Glows */}
      <div className="absolute top-20 -left-20 w-[40rem] h-[40rem] bg-[#AAB7A1]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-[40rem] h-[40rem] bg-[#E9DFC8]/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E4D45' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50,16.5,100,32.5,150,47.5A788.66,788.66,0,0,0,321.39,56.44Z" fill="#000000"></path>
        </svg>
      </div>

      <Container className="relative z-20 pt-16 md:pt-24">
        <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
          <span className="text-[#AAB7A1] text-[11px] tracking-[0.3em] font-semibold uppercase mb-6">
            The Essentials
          </span>
          
          <Heading as="h2" size="4xl" font="serif" className="text-[#1D1D1F] mb-6 leading-[1.1] tracking-tight">
            Everything you need.<br className="hidden md:block"/> 
            <span className="text-[#86868B]">Nothing you don't.</span>
          </Heading>
          <Text size="lg" className="text-[#86868B] font-light max-w-2xl mx-auto space-y-2 relative text-[19px] leading-[1.4]">
            <p>Whether it’s getting your visa, finding the right hotel, or staying connected, we handle the friction so you don't have to.</p>
          </Text>
        </div>

        {/* Minimalist Grid - Apple Style */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-32 max-w-7xl mx-auto px-4"
        >
          {PREMIUM_SERVICES.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`group relative bg-white/70 backdrop-blur-2xl rounded-[32px] p-8 cursor-pointer border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col ${
                isGridVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
              } hover:scale-[1.02] hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]`}
            >
              {/* Apple-style Squircle Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-[#FAF8F3] border border-[#E9DFC8]/40 shadow-sm flex items-center justify-center mb-8 text-[#1E4D45] group-hover:scale-110 transition-transform duration-500 ease-out">
                <Icon name={service.icon} size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[22px] font-semibold text-[#1D1D1F] mb-3 tracking-tight">
                {service.shortTitle}
              </h3>
              
              <p className="text-[#86868B] text-[15px] font-normal leading-relaxed flex-1 mb-8">
                {service.shortDesc}
              </p>

              <div className="flex items-center text-[15px] font-medium text-[#1E4D45] transition-opacity duration-300">
                Learn more 
                <span className="ml-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">›</span>
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

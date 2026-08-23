import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';



const LiveClock = ({ timeZone, label }: { timeZone: string, label: string }) => {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </div>
      <Text size="xs" weight="bold" className="uppercase tracking-widest text-text-dark/70">
        {label} — {time}
      </Text>
    </div>
  );
};

const AnimatedMapLine = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto h-32 flex items-center justify-between mt-12 mb-20 px-4">
      {/* Delhi */}
      <div className="flex flex-col items-center z-10 bg-white px-1.5 sm:px-3">
        <div className="w-3 h-3 rounded-full bg-[#1D1D1F] mb-3" />
        <Text size="none" weight="medium" className="uppercase tracking-widest text-[#1D1D1F] whitespace-nowrap text-[10px] sm:text-xs md:text-sm">
          🇮🇳 Delhi
        </Text>
      </div>

      {/* Dotted Line Animation */}
      <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 overflow-hidden h-4 flex items-center z-0">
        <svg width="100%" height="2" className="w-full">
          <motion.line 
            x1="0" y1="1" x2="100%" y2="1" 
            stroke="currentColor" className="text-text-dark" 
            strokeWidth="2" 
            strokeDasharray="4 8"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* HCMC */}
      <div className="flex flex-col items-center z-10 bg-white px-1.5 sm:px-3">
        <div className="w-3 h-3 rounded-full bg-[#1D1D1F] mb-3" />
        <Text size="none" weight="medium" className="uppercase tracking-widest text-[#1D1D1F] whitespace-nowrap text-[10px] sm:text-xs md:text-sm">
          Ho Chi Minh City 🇻🇳
        </Text>
      </div>
    </div>
  );
};

const Connection: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div id="team" className="font-sans text-[#1D1D1F] bg-white">
      <AnimatePresence>
        {copiedText && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[10000] bg-brand-green text-white px-5 py-3 rounded-full shadow-lg text-xs font-semibold tracking-wider uppercase flex items-center gap-2 border border-brand-green-light"
          >
            <Icon name="Check" size={14} className="text-brand-gold" /> Copied {copiedText} Address!
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* BOTTOM AREA: Slightly darker Ivory */}
      <div className="bg-white py-16">
        <Container>
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <Text size="sm" weight="bold" className="uppercase tracking-[0.2em] text-text-dark/60 mb-6">
              Your Local Connection To Vietnam
            </Text>
            
            <AnimatedMapLine />

            <Heading as="h2" size="4xl" font="serif" className="mb-6 font-normal">
              One Team. Two Countries.
            </Heading>
            <Text size="lg" className="text-text-dark/70 font-light leading-relaxed max-w-xl mx-auto">
              Small enough to care. Experienced enough to help. Helping travelers experience Vietnam with confidence.
            </Text>
          </div>

          {/* 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            {/* India Card */}
            <div className="bg-white rounded-[24px] overflow-hidden group hover:-translate-y-1 transition-transform duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80" 
                  alt="Aesthetic coffee setup" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8">
                <Text size="sm" weight="semibold" className="uppercase tracking-widest text-text-dark/50 mb-2">
                  🇮🇳 India
                </Text>
                <Heading as="h3" size="xl" font="serif" className="mb-6">
                  Before You Fly
                </Heading>
                <ul className="space-y-3">
                  {['Trip Planning', 'Guest Relations', 'Travel Guidance'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-dark/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-dark/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bridging Card */}
            <div className="bg-white rounded-[24px] overflow-hidden group hover:-translate-y-1 transition-transform duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80" 
                  alt="Airplane window clouds" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8">
                <Text size="sm" weight="semibold" className="uppercase tracking-widest text-text-dark/50 mb-2">
                  🌏 Bridging Both Worlds
                </Text>
                <Heading as="h3" size="xl" font="serif" className="mb-6">
                  Understanding Both Sides
                </Heading>
                <ul className="space-y-3">
                  {['Cultures', 'Experiences', 'Perspectives'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-dark/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-dark/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vietnam Card */}
            <div className="bg-white rounded-[24px] overflow-hidden group hover:-translate-y-1 transition-transform duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80" 
                  alt="Vietnam aesthetic" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8">
                <Text size="sm" weight="semibold" className="uppercase tracking-widest text-text-dark/50 mb-2">
                  🇻🇳 Vietnam
                </Text>
                <Heading as="h3" size="xl" font="serif" className="mb-6">
                  On The Ground
                </Heading>
                <ul className="space-y-3">
                  {['Experiences', 'Recommendations', 'Support'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-dark/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-dark/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </div>



      {/* BOTTOM AREA: Soft Sand (Offices, Contact & Quote) */}
      <div className="bg-white py-16">
        <Container>
          
          {/* Offices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {/* India Office */}
            <div className="bg-white rounded-[24px] p-8 border border-[#1D1D1F]/5">
              <LiveClock timeZone="Asia/Kolkata" label="🇮🇳 Delhi" />
              <Heading as="h3" size="2xl" font="serif" className="mb-6">
                Delhi
              </Heading>
              <Text className="text-[#1D1D1F]/70 mb-4 font-light leading-relaxed max-w-xs">
                B-37, Indra Park Extension, <br/>
                Uttam Nagar East, <br/>
                Delhi – 110059, India
              </Text>
              <div className="flex items-center gap-2 mb-8">
                <Icon name="Phone" size={16} className="text-[#1D1D1F]/50" />
                <a href="tel:+919990977002" className="text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors font-medium text-sm no-underline">
                  +91 9990977002
                </a>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => copyToClipboard("B-37, Indra Park Extension, Uttam Nagar East, Delhi – 110059, India", "Delhi")}
                  className="px-6 py-3 border border-[#1D1D1F]/10 rounded-full text-sm font-medium hover:bg-[#1D1D1F]/5 transition-colors"
                >
                  Copy Address
                </button>
                <button 
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="w-12 h-12 flex items-center justify-center border border-text-dark/10 rounded-full hover:bg-text-dark/5 transition-colors"
                >
                  <Icon name="Map" size={16} />
                </button>
              </div>
            </div>

            {/* Vietnam Office */}
            <div className="bg-white rounded-[24px] p-8 border border-[#1D1D1F]/5">
              <LiveClock timeZone="Asia/Ho_Chi_Minh" label="🇻🇳 Ho Chi Minh City" />
              <Heading as="h3" size="2xl" font="serif" className="mb-6">
                Ho Chi Minh City
              </Heading>
              <Text className="text-text-dark/70 mb-8 font-light leading-relaxed max-w-xs">
                45 Nguyễn Quý Đức, <br/>
                An Phú, Bình Trưng, <br/>
                Ho Chi Minh City 756000, Vietnam
              </Text>
              <div className="flex gap-4">
                <button 
                  onClick={() => copyToClipboard("45 Nguyễn Quý Đức, An Phú, Bình Trưng, Ho Chi Minh City 756000, Vietnam", "HCMC")}
                  className="px-6 py-3 border border-text-dark/10 rounded-full text-sm font-medium hover:bg-text-dark/5 transition-colors"
                >
                  Copy Address
                </button>
                <button 
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="w-12 h-12 flex items-center justify-center border border-text-dark/10 rounded-full hover:bg-text-dark/5 transition-colors"
                >
                  <Icon name="Map" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Pills */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="mailto:vietana@vietana.com"
              className="group bg-white px-8 py-5 rounded-full flex items-center gap-4 shadow-sm border border-text-dark/5 hover:shadow-md hover:px-10 transition-all duration-300"
            >
              <Icon name="Mail" size={20} className="text-text-dark/60" />
              <div>
                <Text size="xs" weight="bold" className="uppercase tracking-wider text-text-dark/50 block mb-0.5">
                  General Enquiries
                </Text>
                <Text size="md" weight="medium" className="text-text-dark">
                  vietana@vietana.com
                </Text>
              </div>
            </a>
            
            <a 
              href="mailto:booking@vietana.com"
              className="group bg-white px-8 py-5 rounded-full flex items-center gap-4 shadow-sm border border-text-dark/5 hover:shadow-md hover:px-10 transition-all duration-300"
            >
              <Icon name="BookOpen" size={20} className="text-text-dark/60" />
              <div>
                <Text size="xs" weight="bold" className="uppercase tracking-wider text-text-dark/50 block mb-0.5">
                  Bookings
                </Text>
                <Text size="md" weight="medium" className="text-text-dark">
                  booking@vietana.com
                </Text>
              </div>
            </a>
          </div>

          {/* Final Quote & Secret Weapon */}
          <div className="text-center pb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <Heading as="h2" size="4xl" font="serif" className="mb-6 font-normal tracking-tight text-text-dark">
                Great journeys are built on trust.
              </Heading>
              <Text size="xl" className="text-text-dark/60 font-light italic mb-20">
                Feel Vietnam, Your Way.
              </Text>
            </motion.div>

            {/* Secret Weapon */}
            <div className="inline-block relative">
              <Text size="sm" weight="medium" className="uppercase tracking-[0.2em] text-text-dark px-2">
                Travel Gets Better With <BrandName />
              </Text>
              <motion.svg 
                className="absolute -bottom-4 left-0 w-full h-4 overflow-visible"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.path
                  d="M 5 10 Q 50 0 95 10 Q 150 20 195 5"
                  fill="transparent"
                  stroke="currentColor" className="text-text-dark"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { 
                      pathLength: 1, 
                      opacity: 0.6,
                      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } 
                    }
                  }}
                />
              </motion.svg>
            </div>
          </div>

        </Container>
      </div>

    </div>
  );
};

export default Connection;

import React from 'react';
import Modal from './ui/Modal';
import { motion } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBuilder: () => void;
}

const CARDS = [
  {
    id: 1,
    icon: '🌿',
    title: 'Local Presence',
    desc: 'Real support from people living and working in Vietnam.',
    image: '/why_1.png',
  },
  {
    id: 2,
    icon: '🍛',
    title: 'Food Confidence',
    desc: 'Indian, vegetarian and local food recommendations throughout your journey.',
    image: '/why_2.png',
  },
  {
    id: 3,
    icon: '💬',
    title: 'Human Support',
    desc: 'Hindi and English assistance before and during your trip.',
    image: '/why_3.png',
  },
  {
    id: 4,
    icon: '✨',
    title: 'Personalized Journeys',
    desc: 'No fixed packages. Every journey is shaped around you.',
    image: '/why_4.png',
  },
  {
    id: 5,
    icon: '📍',
    title: 'Trusted Local Network',
    desc: 'Hotels. Restaurants. Guides. Experiences.',
    image: '/why_5.png',
  },
  {
    id: 6,
    icon: '🛡',
    title: 'Peace Of Mind',
    desc: 'Travel should feel exciting. Not overwhelming.',
    image: '/why_6.png',
  }
];

const PILLARS = [
  { icon: '🇻🇳', text: 'Local Knowledge' },
  { icon: '🍛', text: 'Food Confidence' },
  { icon: '💬', text: 'Human Support' },
  { icon: '✨', text: 'Personalized Travel' },
];

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenBuilder }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      variant="light"
      maxWidth="max-w-[950px]"
      className="!bg-[rgba(255,255,255,0.70)] !backdrop-blur-[35px] !border !border-[rgba(255,255,255,0.5)] !rounded-[36px] overflow-y-auto max-h-[85vh] relative custom-scrollbar"
      style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.08)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[36px] z-[-1]">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 left-10 w-[300px] h-[300px] bg-[#EAF7FF] rounded-full blur-[80px] opacity-60"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#F1FFF3] rounded-full blur-[90px] opacity-50"
        />
      </div>

      <div className="p-[30px] md:p-[50px] relative z-10 text-left flex flex-col items-start">
        
        {/* Header */}
        <p className="text-[14px] font-semibold tracking-[2px] text-[#3D8B7D] uppercase mb-4">
          🌿 Why Vietana?
        </p>

        {/* Main Title */}
        <h2 className="font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] font-bold text-[38px] md:text-[54px] leading-[1.15] text-[#1F2328] mb-4">
          Travel Gets Better<br/>with VIETANA™
        </h2>

        {/* Subtitle */}
        <p className="text-[18px] font-normal text-[#68707B] mb-12">
          Thoughtful travel. Local knowledge. Human support.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16">
          {CARDS.map((card) => (
            <motion.div 
              key={card.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-[rgba(255,255,255,0.55)] backdrop-blur-[25px] rounded-[28px] overflow-hidden flex flex-col sm:flex-row shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-white/60 text-left h-full"
            >
              <div className="w-full sm:w-[140px] h-[180px] sm:h-auto shrink-0 relative">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-[18px] font-semibold text-[#1F2328] mb-2 flex items-center gap-2">
                  <span>{card.icon}</span> {card.title}
                </h3>
                <p className="text-[#68707B] text-[15px] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="max-w-[700px] mx-auto text-center mb-12">
          <h3 className="text-[24px] md:text-[28px] font-semibold text-[#2E3135] leading-snug mb-10">
            Not a marketplace.<br className="hidden md:block" />
            Not another package company.<br className="hidden md:block" />
            Just thoughtful travel and people who genuinely care.
          </h3>

          {/* Pillars */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {PILLARS.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-[rgba(255,255,255,0.6)] backdrop-blur-md border border-white/50 rounded-full px-5 py-2.5 flex items-center gap-2 text-[14px] text-[#2E3135] font-medium shadow-sm"
              >
                <span>{pillar.icon}</span>
                {pillar.text}
              </div>
            ))}
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#3D8B7D]/30 to-transparent mx-auto mb-8"></div>

          {/* Signature & Button */}
          <p className="text-[16px] font-medium text-[#3D8B7D] mb-8">
            Travel Gets Better with VIETANA™
          </p>

          <button 
            onClick={() => {
              onClose();
              onOpenBuilder();
            }}
            className="group relative px-8 py-4 bg-white rounded-full text-[#3D8B7D] font-semibold tracking-wide text-[16px] transition-all duration-300 shadow-[0_8px_20px_rgba(61,139,125,0.15)] hover:shadow-[0_12px_25px_rgba(61,139,125,0.25)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-[#EAF7FF]/50 transition-colors duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              ✨ Start Planning
            </span>
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default AboutModal;

import React from 'react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import { WHATSAPP_DEFAULT, VIETANA_WHATSAPP_INDIA, VIETANA_WHATSAPP_VIETNAM } from '../utils/whatsapp';
import { Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A1110] text-white border-t border-white/5 py-12 px-8 select-none z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
        {/* Left: Branding & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
          <Heading as="h2" size="xl" variant="none" className="text-[#3A9BD9] tracking-wider mb-1 font-serif">
            VIETANA
          </Heading>
          <Text variant="white" size="sm" className="opacity-70">
            Bespoke curations for Indian travelers visiting Vietnam.
          </Text>
        </div>

        {/* Center: Small Compact Presence Stack (Vietnam & India side-by-side, Social underneath) */}
        <div className="flex flex-col items-center gap-4 text-white/90 w-full max-w-lg px-4 md:px-0">
          {/* Top row: Side-by-side offices */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 w-full">
            {/* Vietnam Office (Left) */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 flex-1">
              <span className="text-sm">🇻🇳</span>
              <span className="text-[10px] font-serif font-bold text-white/80 leading-tight">Vietnam Operations Ho Chi Minh City</span>
              <a 
                href={`https://wa.me/${VIETANA_WHATSAPP_VIETNAM}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] font-mono font-bold tracking-widest text-[#3A9BD9] hover:text-white transition-colors"
              >
                WhatsApp +84 902 434 006 ↗
              </a>
            </div>

            {/* India Office (Right) */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 flex-1">
              <span className="text-sm">🇮🇳</span>
              <span className="text-[10px] font-serif font-bold text-white/80 leading-tight">India Concierge Desk New Delhi</span>
              <a 
                href={`https://wa.me/${VIETANA_WHATSAPP_INDIA}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] font-mono font-bold tracking-widest text-[#E8C84A] hover:text-white transition-colors"
              >
                WhatsApp +91 99909 77002 ↗
              </a>
            </div>
          </div>

          {/* Horizontal separator */}
          <div className="w-full h-px bg-[#3A9BD9]/20 max-w-xs" />

          {/* Bottom row: Social presence under them */}
          <div className="flex items-center gap-2 justify-center">
            <a 
              href="https://www.instagram.com/vietanaofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-[#3A9BD9] hover:bg-white/10 transition-colors touch-manipulation"
              title="Instagram"
              aria-label="Follow Vietana on Instagram"
            >
              <Instagram size={15} />
            </a>
            <a 
              href="https://www.facebook.com/vietanaofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-[#3A9BD9] hover:bg-white/10 transition-colors touch-manipulation"
              title="Facebook"
              aria-label="Follow Vietana on Facebook"
            >
              <Facebook size={15} />
            </a>
            <span className="text-[10px] font-mono font-bold text-white/60 select-text">@vietanaofficial</span>
          </div>
        </div>

        {/* Right: CTA button */}
        <div className="flex justify-center md:justify-end shrink-0">
          <Button 
            onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
            className="px-8 py-3.5 text-sm font-bold bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 touch-manipulation"
          >
            Start Planning Now <span className="ml-1">✨</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between w-full text-center md:text-left gap-4">
        <div className="flex flex-col">
          <Text variant="white" size="xs" className="opacity-60">
            © {currentYear} VIETANA Travel. All Rights Reserved.
          </Text>
          <Text variant="white" size="xxs" className="opacity-40 tracking-wider mt-1.5 uppercase font-sans">
            Vietnam Desk: +84 902 434 006 | India Desk: +91 99909 77002 | Emergency: 113 / 115
          </Text>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 list-none p-0 m-0">
          {[
            { label: 'Destinations', path: '/#destinations' },
            { label: 'Tours & Experiences', path: '/tours-experiences' },
            { label: 'Attractions', path: '/attractions' },
            { label: 'Packages', path: '/packages' },
            { label: 'Services', path: '/#services' },
            { label: 'Food Guide', path: '/food' },
            { label: 'Journal', path: '/journal' }
          ].map((link) => (
            <li key={link.label}>
              <a 
                href={link.path} 
                className="no-underline group py-1.5 px-2 inline-block touch-manipulation"
              >
                <Text 
                  size="xs" 
                  variant="none"
                  className="text-white/60 transition-colors duration-300 group-hover:text-[#3A9BD9]"
                >
                  {link.label}
                </Text>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

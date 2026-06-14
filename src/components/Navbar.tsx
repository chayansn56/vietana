import React, { useState } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { WHATSAPP_DEFAULT, buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';

interface NavbarProps {
  scrolled: boolean;
  navClass: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
  onOpenExperiences: () => void;
  onOpenMapCurtain: () => void;
  onOpenAbout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner, onOpenContact, onOpenExperiences, onOpenMapCurtain, onOpenAbout }) => {
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const isLight = navClass === 'light';

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangOpen(!langOpen);
  };

  const handleLangChange = (lang: 'EN' | 'HI' | 'VI') => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setEmergencyOpen(true)}
        className="fixed top-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2 rounded-full border border-red-500 bg-red-500/10 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(239,68,68,0.3)] animate-pulse hover:animate-none"
      >
        <Icon name="AlertCircle" size={16} />
        <span className="text-xs font-bold tracking-widest uppercase">Emergency</span>
      </button>

      <nav 
        id="nav" 
        className={`fixed left-1/2 -translate-x-1/2 z-[1000] px-6 md:px-10 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gap-2 md:gap-4 w-[95%] max-w-7xl rounded-full border shadow-[0_10px_30px_rgba(0,0,0,0.1)]
          ${scrolled ? 'top-4 py-3 bg-white/30 backdrop-blur-[20px] border-white/40' : 'top-6 py-4 bg-black/20 backdrop-blur-[10px] border-white/20'}`}
      >
        <a href="#" className="flex shrink-0 items-center gap-2 no-underline group/logo">
          <img src="/vietana_logo.png" className="h-[35px] md:h-[45px]" alt="Vietana Logo" />
          <Heading 
            as="span" 
            size="xl" 
            font="serif" 
            weight="semibold"
            variant="none" 
            className={`hidden sm:block tracking-wider transition-colors duration-400 ${scrolled ? 'text-brand-green-dark drop-shadow-sm' : 'text-white drop-shadow-md'}`}
          >
            VIETANA
          </Heading>
        </a>
        
        <ul className="hidden lg:flex gap-8 list-none items-center flex-wrap">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.isPlanner) {
                    e.preventDefault();
                    onOpenPlanner();
                  } else if ((link as any).isExperiences) {
                    e.preventDefault();
                    onOpenExperiences();
                  } else if (link.href === '#contact') {
                    e.preventDefault();
                    onOpenContact();
                  } else if (link.key === 'about') {
                    e.preventDefault();
                    onOpenAbout();
                  }
                }}
                className="relative no-underline group"
              >
                <Text 
                  size="sm" 
                  variant="none"
                  weight="bold"
                  className={`tracking-widest uppercase text-xs transition-colors duration-300 hover:text-brand-gold drop-shadow-sm
                    ${scrolled ? 'text-text-dark/90' : 'text-white/90'}
                    [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-[-4px] [&::after]:left-0 [&::after]:right-[100%] [&::after]:h-[2px] [&::after]:bg-brand-gold [&::after]:transition-[right] [&::after]:duration-400 [&::after]:ease-soft hover:[&::after]:right-0`}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Text>
              </a>
            </li>
          ))}

        </ul>

        <div className="flex items-center gap-4 shrink-0">


          <button 
            onClick={() => onOpenMapCurtain()}
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors border ${isLight ? 'glass border-brand-green/20 text-brand-green-extra-dark hover:bg-brand-green/10' : 'glass-dark border-white/20 text-surface-cream hover:bg-white/10'}`}
          >
            <Icon name="Map" size={14} />
            <span className="text-xs tracking-[0.1em] font-medium uppercase">Map</span>
          </button>
          
          <div className="relative flex items-center">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer  transition-all duration-350 ease-soft whitespace-nowrap select-none border
                ${isLight ? 'glass border-black/10 hover:bg-black/5' : 'glass-dark border-white/22 hover:bg-white/10 hover:border-white/45'}`} 
              onClick={toggleLang}
            >
              <Text size="xs" variant="none" weight="medium" className={`tracking-wide flex items-center gap-1.5 ${isLight ? 'text-text-muted' : 'text-white/88'}`}>
                <Icon name="Globe" size={14} /><span id="langLabel">{language}</span>
              </Text>
              <Icon name="ChevronDown" size={14} className={`opacity-60 transition-transform duration-300 ${isLight ? 'text-text-muted' : 'text-white/88'} ${langOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <div className={`absolute top-[calc(100%+0.6rem)] right-0 glass-dark rounded-xl overflow-hidden min-w-[155px] shadow-deep transition-all duration-300 ease-smooth z-[600]
              ${langOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
            >
              {[
                { code: 'EN', flag: '🇺🇸', name: 'English' },
                { code: 'HI', flag: '🇮🇳', name: 'Hindi' },
                { code: 'VI', flag: '🇻🇳', name: 'Vietnamese' }
              ].map((lang) => (
                <button 
                  key={lang.code}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-250 no-underline border-none bg-transparent cursor-pointer
                    ${language === lang.code ? 'bg-brand-gold/8' : 'hover:bg-brand-gold/12'}`} 
                  onClick={() => handleLangChange(lang.code as any)}
                >
                  <span className="text-base">{lang.flag}</span>
                  <Text size="sm" variant="none" className={`flex-1 ${language === lang.code ? 'text-brand-gold font-medium' : 'text-white/78'}`}>
                    {lang.name}
                  </Text>
                  <Text size="xs" variant="none" className="opacity-50 text-white/78">
                    {lang.code}
                  </Text>
                  {language === lang.code && <Icon name="Check" size={16} className="ml-auto text-brand-gold" />}
                </button>
              ))}
            </div>
          </div>

          <div 
            className={`flex lg:hidden flex-col gap-[5px] cursor-pointer p-1.25 z-[500] group`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-x-[4.2px] translate-y-[4.2px]' : ''}`}></span>
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 translate-x-[4.2px] -translate-y-[4.2px]' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div 
        id="mob" 
        className={`fixed inset-0 z-[390] glass-dark flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ease-soft
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <a 
            key={link.key}
            href={link.href} 
            className="no-underline"
            onClick={(e) => {
              if (link.isPlanner) {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenPlanner();
              } else if ((link as any).isExperiences) {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenExperiences();
              } else if (link.href === '#contact') {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenContact();
              } else if (link.key === 'about') {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenAbout();
              } else {
                setMobileMenuOpen(false);
              }
            }}
          >
            <Heading 
              as="span" 
              size="xl" 
              font="serif" 
              weight="light"
              variant="none"
              className={`text-white/80 transition-all duration-500 ease-smooth hover:text-brand-gold block text-4xl
                ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </Heading>
          </a>
        ))}
        <div className="h-px w-2/3 bg-white/10 my-4"></div>

        <button 
          onClick={() => { setMobileMenuOpen(false); setEmergencyOpen(true); }}
          className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 transition-colors no-underline w-full max-w-[200px] cursor-pointer"
        >
          <Icon name="AlertCircle" size={20} />
          <span className="text-lg font-medium tracking-wide uppercase">Emergency</span>
        </button>
        
        <button 
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenMapCurtain();
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-brand-gold/20 border border-brand-gold/50 text-brand-gold transition-colors"
        >
          <Icon name="Map" size={20} />
          <span className="text-lg font-medium tracking-wide">Explore Map</span>
        </button>

        <div className="flex gap-4 mt-2">
            {['EN', 'HI', 'VI'].map((l) => (
              <button 
                key={l}
                className="bg-transparent border border-white text-white px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => { setLanguage(l as any); setMobileMenuOpen(false); }}
              >
                {l}
              </button>
            ))}
        </div>
        <a href={buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT)} className="text-brand-gold text-xl no-underline flex items-center gap-2" target="_blank" rel="noreferrer">
          <Icon name="MessageCircle" size={24} /> +91 9953294543
        </a>
      </div>

      {/* Click outside to close lang drop */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}

      <Modal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} maxWidth="max-w-xl">
        <div className="p-8 flex flex-col gap-6 relative">
          <button 
            onClick={() => setEmergencyOpen(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="X" size={24} />
          </button>
          
          <div className="flex flex-col items-center text-center mb-2">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4">
              <Icon name="AlertTriangle" size={32} />
            </div>
            <Heading as="h3" size="2xl" font="serif" className="text-white">Emergency Support</Heading>
            <Text variant="none" className="text-white/70 mt-2">Download essential guides and protocols for immediate assistance.</Text>
          </div>

          <div className="flex flex-col gap-4">
            <a 
              href="/vietana_emergency_medical_card.pdf"
              download
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-500/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Icon name="HeartPulse" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Medical Assistance</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Emergency Medical Card</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-red-400 transition-colors" />
            </a>

            <a 
              href="/vietana_embassy_and_consular_assistance.pdf"
              download
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-gold/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                <Icon name="Flag" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Embassy & Consular Assistance</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Missions & Crisis Numbers</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-brand-gold transition-colors" />
            </a>

            <a 
              href="/vietana_travel_emergency_guide.pdf"
              download
              onClick={() => setEmergencyOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all group no-underline"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Icon name="ShieldAlert" size={24} />
              </div>
              <div className="flex-1">
                <Text variant="none" weight="bold" className="text-white text-left">Travel Emergencies & Essential Support</Text>
                <Text variant="none" size="xs" className="text-white/50 text-left">Baggage, Flights, Scams</Text>
              </div>
              <Icon name="Download" size={20} className="text-white/30 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;

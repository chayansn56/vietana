import React, { useState } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { WHATSAPP_DEFAULT, buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';

interface NavbarProps {
  scrolled: boolean;
  navClass: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner, onOpenContact }) => {
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

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
      <nav 
        id="nav" 
        className={`fixed top-0 left-0 right-0 z-[1000] px-[var(--spacing-layout)] flex items-center justify-between transition-all duration-550 ease-soft gap-4
          ${scrolled ? (isLight ? 'py-3.5 glass shadow-soft' : 'py-3.5 glass-dark shadow-strong') : 'py-6'}`}
      >
        <a href="#" className="flex shrink-0 items-center gap-2 no-underline">
          <img src="/vietana_logo.png" className="h-[45px]" alt="Vietana Logo" />
          <Heading 
            as="span" 
            size="xl" 
            font="serif" 
            weight="semibold"
            variant="none" 
            className={`tracking-wider transition-colors duration-400 ${isLight ? 'text-brand-blue-dark' : 'text-brand-blue'}`}
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
                  } else if (link.href === '#contact') {
                    e.preventDefault();
                    onOpenContact();
                  }
                }}
                className="relative no-underline group"
              >
                <Text 
                  size="sm" 
                  variant="none"
                  weight="normal"
                  className={`tracking-wide transition-colors duration-300 hover:text-brand-gold
                    ${isLight ? 'text-text-muted' : 'text-white/78'}
                    [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-[-2px] [&::after]:left-0 [&::after]:right-[100%] [&::after]:h-px [&::after]:bg-brand-gold [&::after]:transition-[right] [&::after]:duration-400 [&::after]:ease-soft hover:[&::after]:right-0`}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Text>
              </a>
            </li>
          ))}
          <li>
            <Button 
              onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
              size="sm"
              className="px-5 py-2 font-semibold text-xs tracking-wider"
            >
              {t.nav.cta}
            </Button>
          </li>
        </ul>

        <div className="flex items-center gap-4 shrink-0">
          <div className="relative flex items-center">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer backdrop-blur-md transition-all duration-350 ease-soft whitespace-nowrap select-none border
                ${isLight ? 'glass border-black/10 hover:bg-black/5' : 'glass-dark border-white/22 hover:bg-white/10 hover:border-white/45'}`} 
              onClick={toggleLang}
            >
              <Text size="xs" variant="none" weight="medium" className={`tracking-wide flex items-center gap-1.5 ${isLight ? 'text-text-muted' : 'text-white/88'}`}>
                <span>🌐</span><span id="langLabel">{language}</span>
              </Text>
              <span className={`text-xxs opacity-60 transition-transform duration-300 ${isLight ? 'text-text-muted' : 'text-white/88'} ${langOpen ? 'rotate-180' : ''}`}>▾</span>
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
                  {language === lang.code && <span className="ml-auto text-xs text-brand-gold">✓</span>}
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
              } else if (link.href === '#contact') {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenContact();
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
        <div className="flex gap-4">
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
        <a href={buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT)} className="text-brand-gold text-xl no-underline" target="_blank" rel="noreferrer">
          💬 +91 9953294543
        </a>
      </div>

      {/* Click outside to close lang drop */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}
    </>
  );
};

export default Navbar;

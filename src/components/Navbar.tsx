import React, { useState } from 'react';
import { NAV_LINKS, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';

interface NavbarProps {
  scrolled: boolean;
  navClass: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner }) => {
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const getNavLabel = (name: string) => {
    switch(name) {
      case 'Services': return t.nav.services;
      case 'Packages': return t.nav.packages;
      case 'AI Planner': return t.nav.aiPlanner;
      case 'Food': return t.nav.food;
      case 'Experiences': return t.nav.experiences;
      case 'About': return t.nav.about;
      case 'Contact': return t.nav.contact;
      default: return name;
    }
  };

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangOpen(!langOpen);
  };

  const handleLangChange = (lang: 'EN' | 'HI' | 'VI') => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const isLight = navClass === 'light';

  return (
    <>
      <nav 
        id="nav" 
        className={`fixed top-0 left-0 right-0 z-[1000] px-[var(--spacing-layout)] flex items-center justify-between transition-all duration-550 ease-soft gap-4
          ${scrolled ? (isLight ? 'py-3.5 bg-white/92 backdrop-blur-3xl border-b border-brand-green/8 shadow-soft' : 'py-3.5 bg-brand-green-extra-dark/60 backdrop-blur-3xl border-b border-brand-gold/10 shadow-strong') : 'py-6.5'}`}
      >
        <a href="#" className={`font-serif text-3xl font-semibold tracking-wider transition-colors duration-400 flex shrink-0 items-center gap-2 no-underline ${isLight ? 'text-brand-blue-dark' : 'text-brand-blue'}`}>
          <img src="/vietana_logo.png" className="h-[45px]" alt="Vietana Logo" />
          VIETANA
        </a>
        
        <ul className="hidden lg:flex gap-8 list-none items-center flex-wrap">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.isPlanner) {
                    e.preventDefault();
                    onOpenPlanner();
                  }
                }}
                className={`text-[0.82rem] font-normal tracking-wide transition-colors duration-300 relative no-underline hover:text-brand-gold
                  ${isLight ? 'text-text-muted' : 'text-white/78'}
                  [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-[-2px] [&::after]:left-0 [&::after]:right-[100%] [&::after]:h-px [&::after]:bg-brand-gold [&::after]:transition-[right] [&::after]:duration-400 [&::after]:ease-soft hover:[&::after]:right-0`}
              >
                {getNavLabel(link.name)}
              </a>
            </li>
          ))}
          <li>
            <Button 
              onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
              size="sm"
              className="px-5.5 py-2 font-semibold text-[0.79rem] tracking-wider"
            >
              {t.nav.cta}
            </Button>
          </li>
        </ul>

        <div className="flex items-center gap-4 shrink-0">
          <div className="relative flex items-center">
            <div 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.74rem] font-medium tracking-wide cursor-pointer backdrop-blur-md transition-all duration-350 ease-soft whitespace-nowrap select-none border
                ${isLight ? 'bg-brand-green/8 border-brand-green/18 text-text-muted hover:bg-brand-green/14' : 'bg-white/10 border-white/22 text-white/88 hover:bg-white/18 hover:border-white/45'}`} 
              onClick={toggleLang}
            >
              <span>🌐</span><span id="langLabel">{language}</span>
              <span className={`text-[0.55rem] opacity-60 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>
            
            <div className={`absolute top-[calc(100%+0.6rem)] right-0 bg-brand-green-extra-dark/95 backdrop-blur-3xl border border-brand-gold/18 rounded-lg overflow-hidden min-w-[155px] shadow-deep transition-all duration-300 ease-smooth z-[600]
              ${langOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
            >
              {[
                { code: 'EN', flag: '🇺🇸', name: 'English' },
                { code: 'HI', flag: '🇮🇳', name: 'Hindi' },
                { code: 'VI', flag: '🇻🇳', name: 'Vietnamese' }
              ].map((lang) => (
                <button 
                  key={lang.code}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-[0.81rem] text-left transition-colors duration-250 no-underline border-none bg-transparent cursor-pointer
                    ${language === lang.code ? 'text-brand-gold bg-brand-gold/8' : 'text-white/78 hover:text-brand-gold-light hover:bg-brand-gold/12'}`} 
                  onClick={() => handleLangChange(lang.code as any)}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="flex-1">{lang.name}</span>
                  <span className="text-[0.7rem] opacity-50">{lang.code}</span>
                  {language === lang.code && <span className="ml-auto text-[0.7rem]">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div 
            className={`flex lg:hidden flex-col gap-[5px] cursor-pointer p-1.25 z-[500] group`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-x-[4.7px] translate-y-[4.7px]' : ''}`}></span>
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 translate-x-[4.7px] -translate-y-[4.7px]' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div 
        id="mob" 
        className={`fixed inset-0 z-[390] bg-brand-green-extra-dark flex flex-col items-center justify-center gap-9 transition-opacity duration-500 ease-soft
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className={`font-serif text-4xl font-light text-white/80 transition-all duration-500 ease-smooth no-underline hover:text-brand-gold
              ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            onClick={() => {
              setMobileMenuOpen(false);
              if (link.isPlanner) onOpenPlanner();
            }}
          >
            {getNavLabel(link.name)}
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
        <a href="https://wa.me/919953294543" className="text-brand-gold text-xl no-underline" target="_blank" rel="noreferrer">
          💬 +91 9953294543
        </a>
      </div>

      {/* Click outside to close lang drop */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}
    </>
  );
};

export default Navbar;

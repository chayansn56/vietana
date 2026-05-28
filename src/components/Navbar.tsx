import React, { useState } from 'react';
import { NAV_LINKS, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';

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
        className={`fixed top-0 left-0 right-0 z-[1000] px-[6%] flex items-center justify-between transition-all duration-550 ease-[var(--e1)] gap-4
          ${scrolled ? (isLight ? 'py-3.5 bg-white/92 backdrop-blur-3xl border-b border-[var(--g)]/8 shadow-[0_1px_0_rgba(13,79,46,0.06),0_6px_28px_rgba(13,79,46,0.07)]' : 'py-3.5 bg-black/60 backdrop-blur-3xl border-b border-[var(--gold)]/10 shadow-[0_1px_0_rgba(201,168,76,0.06),0_12px_40px_rgba(0,0,0,0.22)]') : 'py-6.5'}`}
      >
        <a href="#" className={`font-serif text-3xl font-semibold tracking-wider transition-colors duration-400 flex shrink-0 items-center gap-2 no-underline ${isLight ? 'text-[var(--blue3)]' : 'text-[var(--blue)]'}`}>
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
                className={`text-[0.82rem] font-normal tracking-wide transition-colors duration-300 relative no-underline hover:text-[var(--gold)]
                  ${isLight ? 'text-[var(--tm)]' : 'text-white/78'}
                  [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-[-2px] [&::after]:left-0 [&::after]:right-[100%] [&::after]:h-px [&::after]:bg-[var(--gold)] [&::after]:transition-[right] [&::after]:duration-400 [&::after]:ease-[var(--e1)] hover:[&::after]:right-0`}
              >
                {getNavLabel(link.name)}
              </a>
            </li>
          ))}
          <li>
            <a 
              href={WHATSAPP_DEFAULT} 
              className="bg-[var(--gold)] text-[var(--gd)] px-5.5 py-2 rounded-full font-semibold text-[0.79rem] tracking-wider shadow-[0_2px_18px_rgba(201,168,76,0.4)] transition-all duration-400 ease-[var(--e2)] no-underline hover:bg-[var(--gold3)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,168,76,0.5)]" 
              target="_blank" 
              rel="noreferrer"
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4 shrink-0">
          <div className="relative flex items-center">
            <div 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.74rem] font-medium tracking-wide cursor-pointer backdrop-blur-md transition-all duration-350 ease-[var(--e1)] whitespace-nowrap select-none border
                ${isLight ? 'bg-[var(--g)]/8 border-[var(--g)]/18 text-[var(--tm)] hover:bg-[var(--g)]/14' : 'bg-white/10 border-white/22 text-white/88 hover:bg-white/18 hover:border-white/45'}`} 
              onClick={toggleLang}
            >
              <span>🌐</span><span id="langLabel">{language}</span>
              <span className={`text-[0.55rem] opacity-60 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>
            
            <div className={`absolute top-[calc(100%+0.6rem)] right-0 bg-black/95 backdrop-blur-3xl border border-[var(--gold)]/18 rounded-[var(--rs)] overflow-hidden min-w-[155px] shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[var(--e2)] z-[600]
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
                    ${language === lang.code ? 'text-[var(--gold)] bg-[var(--gold)]/8' : 'text-white/78 hover:text-[var(--gold3)] hover:bg-[var(--gold)]/12'}`} 
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
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-[var(--e1)] ${isLight ? 'bg-[var(--g)]' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-x-[4.7px] translate-y-[4.7px]' : ''}`}></span>
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-[var(--e1)] ${isLight ? 'bg-[var(--g)]' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-5.5 h-[1.5px] rounded-sm transition-all duration-350 ease-[var(--e1)] ${isLight ? 'bg-[var(--g)]' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 translate-x-[4.7px] -translate-y-[4.7px]' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div 
        id="mob" 
        className={`fixed inset-0 z-[390] bg-[var(--gx)] flex flex-col items-center justify-center gap-9 transition-opacity duration-500 ease-[var(--e1)]
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className={`font-serif text-4xl font-light text-white/80 transition-all duration-500 ease-[var(--e2)] no-underline hover:text-[var(--gold)]
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
        <a href="https://wa.me/919953294543" className="text-[var(--gold)] text-xl no-underline" target="_blank" rel="noreferrer">
          💬 +91 9953294543
        </a>
      </div>

      {/* Click outside to close lang drop */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}
    </>
  );
};

export default Navbar;

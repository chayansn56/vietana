import React, { useState } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { WHATSAPP_DEFAULT, buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import { events } from '../utils/events';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import ThemeToggle from './ui/ThemeToggle';

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
  onOpenFlightSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled: scrolledParam, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner, onOpenContact, onOpenExperiences, onOpenMapCurtain, onOpenAbout, onOpenFlightSearch }) => {
  const scrolled = scrolledParam;
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [expDropOpen, setExpDropOpen] = useState(false);

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
        className={`fixed left-1/2 -translate-x-1/2 z-[1000] px-4 lg:px-5 xl:px-8 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gap-2 lg:gap-3 w-[98%] max-w-[1400px] rounded-full border 
          ${mobileMenuOpen
            ? 'top-6 py-4 border-transparent shadow-none bg-transparent'
            : (scrolledParam
              ? 'top-4 py-3 bg-surface-dark/85 supports-[backdrop-filter]:bg-surface-dark/60 backdrop-blur-[20px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'top-6 py-4 bg-surface-dark/85 supports-[backdrop-filter]:bg-surface-dark/60 backdrop-blur-[10px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
            )}`}
      >
        <a href="#" className="flex shrink-0 items-center gap-2 no-underline group/logo">
          <img
            src="/vietana_logo.png"
            className="h-[35px] md:h-[45px] transition-all duration-300"
            alt="Vietana Logo"
          />
          <Heading
            as="span"
            size="xl"
            font="serif"
            weight="semibold"
            variant="none"
            className="hidden sm:block tracking-wider transition-colors duration-400 text-white drop-shadow-md"
          >
            VIETANA
          </Heading>
        </a>

        <ul className="hidden lg:flex gap-2 lg:gap-3 xl:gap-6 list-none items-center flex-nowrap shrink-0">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="relative">
              {link.key === 'experiences' ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setExpDropOpen(!expDropOpen);
                    }}
                    className="focus-ring relative no-underline bg-transparent border-none p-0 cursor-pointer flex items-center gap-1 group"
                  >
                    <Text
                      size="sm"
                      variant="none"
                      weight="bold"
                      className={`tracking-widest uppercase text-xs transition-colors duration-300 hover:text-brand-gold drop-shadow-sm
                        ${scrolled ? 'text-text-dark/90' : 'text-white/90'}
                        ${expDropOpen ? 'text-brand-gold' : ''}`}
                    >
                      {t.nav[link.key as keyof typeof t.nav]}
                    </Text>
                    <Icon
                      name="ChevronDown"
                      size={12}
                      className={`transition-transform duration-300 ${scrolled ? 'text-text-dark/70' : 'text-white/70'} ${expDropOpen ? 'rotate-180 text-brand-gold' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-[calc(100%+0.8rem)] left-0 glass-dark rounded-xl overflow-hidden min-w-[200px] shadow-deep border border-white/10 transition-all duration-300 ease-smooth z-[600]
                    ${expDropOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
                  >
                    <a
                      href="#experiences"
                      onClick={(e) => {
                        setExpDropOpen(false);
                        const el = document.getElementById('experiences');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-250 hover:bg-brand-gold/12 no-underline text-white/80"
                    >
                      <Icon name="Compass" size={14} className="text-brand-gold" />
                      <Text size="sm" variant="none" className="text-white/80 font-medium">
                        Curated Experiences
                      </Text>
                    </a>

                    <button
                      onClick={() => {
                        setExpDropOpen(false);
                        onOpenExperiences();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-250 hover:bg-brand-gold/12 border-none bg-transparent cursor-pointer text-white/80"
                    >
                      <Icon name="Sparkles" size={14} className="text-brand-gold" />
                      <Text size="sm" variant="none" className="text-white/80 font-medium">
                        Hidden Experiences
                      </Text>
                    </button>
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  className="focus-ring relative no-underline group"
                  onClick={(e) => {
                    if ((link as any).isPlanner) {
                      e.preventDefault();
                      onOpenPlanner();
                    } else if (link.href === '#contact') {
                      e.preventDefault();
                      onOpenContact();
                    } else if (link.key === 'about') {
                      e.preventDefault();
                      onOpenAbout();
                    } else if (link.key === 'flights') {
                      e.preventDefault();
                      onOpenFlightSearch();
                    }
                  }}
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
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-3 xl:gap-5 shrink-0">
          <button
            onClick={() => onOpenMapCurtain()}
            className={`focus-ring hidden sm:flex items-center justify-center gap-1.5 px-3 h-10 rounded-full transition-all duration-300 border backdrop-blur-md ${isLight ? 'bg-white/40 border-[#1D1D1F]/15 text-[#1D1D1F] hover:bg-white/60 shadow-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'}`}
          >
            <Icon name="Map" size={14} />
            <span className="text-xs tracking-[0.1em] font-medium uppercase">Map</span>
          </button>

          <ThemeToggle isNavbar={true} isLight={isLight} />

          <div className="relative flex items-center">
            <div
              className={`flex items-center justify-center gap-1.5 px-3 h-10 rounded-full cursor-pointer transition-all duration-300 ease-soft whitespace-nowrap select-none border backdrop-blur-md
                ${isLight ? 'bg-white/40 border-black/15 hover:bg-white/60 shadow-sm text-text-muted' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 shadow-[0_2px_10px_rgba(0,0,0,0.2)] text-white/90'}`}
              onClick={toggleLang}
            >
              <Text size="xs" variant="none" weight="medium" className="tracking-wide flex items-center gap-1.5 font-medium">
                <Icon name="Globe" size={14} /><span id="langLabel">{language}</span>
              </Text>
              <Icon name="ChevronDown" size={14} className={`opacity-70 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </div>

            <div className={`absolute top-[calc(100%+0.8rem)] right-0 glass-dark rounded-xl overflow-hidden min-w-[155px] shadow-deep transition-all duration-300 ease-smooth z-[600] border border-white/10
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

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className={`flex lg:hidden flex-col items-center justify-center gap-[6px] cursor-pointer w-10 h-10 z-[500] group bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-4 h-[1.5px] rounded-full transition-all duration-300 ease-in-out ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-x-[0px] translate-y-[7.5px]' : ''}`}></span>
            <span className={`block w-4 h-[1.5px] rounded-full transition-all duration-300 ease-in-out ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-4 h-[1.5px] rounded-full transition-all duration-300 ease-in-out ${isLight ? 'bg-brand-green' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 translate-x-[0px] -translate-y-[7.5px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        id="mob"
        className={`fixed inset-0 z-[390] bg-brand-green-extra-dark overflow-y-auto transition-opacity duration-500 ease-soft
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="mt-28 pb-16 px-6 flex flex-col items-center gap-6 w-full">
          {NAV_LINKS.map((link) => (
            link.key === 'experiences' ? (
              <div key={link.key} className="flex flex-col items-center gap-2">
                <Heading
                  as="span"
                  size="xl"
                  font="serif"
                  weight="light"
                  variant="none"
                  className={`text-brand-gold block text-4xl transition-all duration-500 ease-smooth
                    ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Heading>
                <div className="flex flex-col gap-2 items-center mt-1">
                  <a
                    href="#experiences"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const el = document.getElementById('experiences');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/60 hover:text-white text-lg no-underline py-1"
                  >
                    — Curated Experiences
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenExperiences();
                    }}
                    className="text-white/60 hover:text-white text-lg bg-transparent border-none cursor-pointer py-1"
                  >
                    — Hidden Experiences
                  </button>
                </div>
              </div>
            ) : (
              <a
                key={link.key}
                href={link.href}
                className="focus-ring no-underline"
                onClick={(e) => {
                  if ((link as any).isPlanner) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenPlanner();
                  } else if (link.href === '#contact') {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenContact();
                  } else if (link.key === 'about') {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenAbout();
                  } else if (link.key === 'flights') {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenFlightSearch();
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
            )
          ))}
          <div className="h-px w-2/3 bg-white/10 my-4"></div>

          <button
            onClick={() => { setMobileMenuOpen(false); events.dispatch('open-emergency'); }}
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

          <div className="flex items-center gap-4 mt-2">
            {['EN', 'HI', 'VI'].map((l) => (
              <button
                key={l}
                className="bg-transparent border border-white text-white px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => { setLanguage(l as any); setMobileMenuOpen(false); }}
              >
                {l}
              </button>
            ))}
            <div className="border-l border-white/20 pl-4">
              <ThemeToggle isNavbar={true} isLight={false} />
            </div>
          </div>
          <a href={buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT)} className="text-brand-gold text-xl no-underline flex items-center gap-2" target="_blank" rel="noreferrer">
            <Icon name="MessageCircle" size={24} /> +91 9953294543
          </a>
        </div>
      </div>

      {/* Click outside to close drops */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}
      {expDropOpen && <div className="fixed inset-0 z-[999]" onClick={() => setExpDropOpen(false)}></div>}
    </>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { NAV_LINKS } from '../data/siteContent';
import { WHATSAPP_DEFAULT, buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import ThemeToggle from './ui/ThemeToggle';

interface NavbarProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
  onOpenExperiences: () => void;
  onOpenMapCurtain: () => void;
  onOpenFlightSearch: () => void;
  onOpenLogin: () => void;
}

const NAVIGATION_ITEMS = [
  {
    key: 'explore',
    label: 'Explore',
    items: [
      { label: 'Destinations', href: '#destinations', action: 'portal_destinations' },

      { label: 'Travel Journal (🔥 RECOMMENDED)', href: '/journal', target: '_blank', action: 'external' },
      { label: 'Things to Do (🔥 RECOMMENDED)', href: '#experiences', action: 'portal_experiences' }
    ]
  },
  {
    key: 'tours_and_tickets',
    label: 'Tours & Tickets',
    items: [
      { isHeader: true, label: '🧭 Tours & Experiences (50+ Tours)' },
      { label: 'All Tours & Experiences', href: '/tours-experiences', action: 'portal_tours-experiences' },
      { label: 'North Vietnam', href: '/tours-experiences', action: 'portal_tours-experiences', filter: 'North Vietnam' },
      { label: 'Central Vietnam', href: '/tours-experiences', action: 'portal_tours-experiences', filter: 'Central Vietnam' },
      { label: 'South Vietnam', href: '/tours-experiences', action: 'portal_tours-experiences', filter: 'South Vietnam' },
      { label: 'Airport & Intercity Transfers', href: '/tours-experiences', action: 'portal_tours-experiences', filter: 'Transfers' },
      { isDivider: true, label: '' },
      { isHeader: true, label: '🎟️ Attraction Tickets (228 Products)' },
      { label: 'All Attraction Tickets', href: '/attractions', action: 'portal_attractions' },
      { label: 'North Vietnam', href: '/attractions', action: 'portal_attractions', filter: 'NORTH VIETNAM' },
      { label: 'Central Vietnam', href: '/attractions', action: 'portal_attractions', filter: 'CENTRAL VIETNAM' },
      { label: 'South Vietnam', href: '/attractions', action: 'portal_attractions', filter: 'SOUTH VIETNAM' },
      { label: 'Theme Parks & Cable Cars', href: '/attractions', action: 'portal_attractions', filter: 'Theme Park' }
    ]
  },
  {
    key: 'packages',
    label: 'Packages',
    items: [
      { label: 'All Itineraries', href: '/packages', action: 'portal_packages', filter: 'All' },
      { label: 'First Time in Vietnam', href: '/packages', action: 'portal_packages', filter: 'Classic' },
      { label: 'Honeymoon & Romance', href: '/packages', action: 'portal_packages', filter: 'Honeymoon' },
      { label: 'Family Holidays', href: '/packages', action: 'portal_packages', filter: 'Family' },
      { label: 'Luxury Escapes', href: '/packages', action: 'portal_packages', filter: 'Luxury' }
    ]
  },
  {
    key: 'plan_my_trip',
    label: '🔥 Plan My Trip',
    items: [
      { label: 'VINA AI ( BETA )', href: '#planner', action: 'planner' }
    ]
  },
  {
    key: 'concierge_services',
    label: 'Concierge Services',
    href: '#services',
    action: 'portal_services'
  },
  {
    key: 'about',
    label: 'About',
    items: [
      { label: 'About VIETANA', href: '#team', action: 'portal_about' },
      { label: 'Why Choose Us', href: 'why-choose-us', action: 'portal_why-choose-us' },
      { label: 'Food Guide', href: '/food', action: 'portal_food' }
    ]
  }
];

const Navbar: React.FC<NavbarProps> = ({ scrolled: scrolledParam, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner, onOpenExperiences, onOpenMapCurtain, onOpenFlightSearch, onOpenLogin }) => {
  const scrolled = scrolledParam;
  const { language, setLanguage, t } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [expDropOpen, setExpDropOpen] = useState(false);
  const [isEmergencyPulsing, setIsEmergencyPulsing] = useState(true);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isLight, setIsLight] = useState(true);
  const shouldShowLight = isLight;

  console.log("Navbar State:", { scrolledParam, scrolled, isLight, shouldShowLight });

  React.useEffect(() => {
    const timer = setTimeout(() => setIsEmergencyPulsing(false), 3000);
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('#nav')) {
        return;
      }
      setLangOpen(false);
      setCurrOpen(false);
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const updateTheme = () => {
      setIsLight(!document.documentElement.classList.contains('dark'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangOpen(!langOpen);
    setCurrOpen(false);
    setActiveDropdown(null);
  };
  
  const toggleCurr = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrOpen(!currOpen);
    setLangOpen(false);
    setActiveDropdown(null);
  };

  const handleLangChange = (lang: 'EN' | 'HI' | 'VI') => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <>
      <nav 
        id="nav" 
        className={`fixed left-1/2 -translate-x-1/2 z-[1000] px-6 md:px-10 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gap-2 md:gap-4 w-[95%] max-w-[1360px] rounded-full border 
          ${mobileMenuOpen 
            ? 'top-6 py-4 border-transparent shadow-none bg-transparent' 
            : (scrolledParam 
                ? (shouldShowLight 
                    ? 'top-4 py-3 bg-[#FAF8F3]/98 supports-[backdrop-filter]:bg-[#FAF8F3]/92 backdrop-blur-[24px] border-[#E6D9BF] shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
                    : 'top-4 py-3 bg-[#111111]/98 supports-[backdrop-filter]:bg-[#111111]/92 backdrop-blur-[24px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                  ) 
                : (shouldShowLight
                    ? 'top-6 py-4 bg-[#FAF8F3]/98 supports-[backdrop-filter]:bg-[#FAF8F3]/92 backdrop-blur-[24px] border-[#E6D9BF] shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
                    : 'top-6 py-4 bg-[#111111]/98 supports-[backdrop-filter]:bg-[#111111]/92 backdrop-blur-[24px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                  )
              )}`}
      >
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex shrink-0 items-center gap-2 no-underline group/logo"
        >
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
            className="block tracking-wider transition-colors duration-400 text-[#4592d9]"
          >
            VIETANA
          </Heading>
        </a>
        
        <ul className="hidden lg:flex gap-4 xl:gap-5 list-none items-center flex-nowrap shrink-0">
          {NAVIGATION_ITEMS.map((menu) => (
            <li 
              key={menu.key} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(menu.key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLangOpen(false);
                  setCurrOpen(false);
                  if ((menu as any).action) {
                    if ((menu as any).action === 'portal_services') {
                      window.history.pushState({}, '', `/services`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      setActiveDropdown(null);
                    }
                  } else {
                    setActiveDropdown(activeDropdown === menu.key ? null : menu.key);
                  }
                }}
                className="relative no-underline bg-transparent border-none p-0 cursor-pointer flex items-center gap-1 group"
              >
                <Text 
                  size="sm" 
                  variant="none"
                  weight="bold"
                  className={`tracking-widest uppercase text-xs transition-colors duration-300 hover:text-brand-gold drop-shadow-sm flex items-center gap-0.5
                    ${shouldShowLight ? 'text-brand-green-dark' : 'text-white/90'}
                    ${activeDropdown === menu.key ? 'text-brand-gold' : ''}`}
                >
                  {menu.label}
                  {menu.key === 'packages' && (
                    <span className="text-[10px] animate-pulse ml-0.5" title="Hot Packages">🔥</span>
                  )}
                </Text>
                {menu.items && (
                  <Icon 
                    name="ChevronDown" 
                    size={12} 
                    className={`transition-transform duration-300 ${shouldShowLight ? 'text-brand-green-dark/70' : 'text-white/70'} ${activeDropdown === menu.key ? 'rotate-180 text-brand-gold' : ''}`} 
                  />
                )}
              </button>
              
              {/* Dropdown Menu (Liquid Glass / Apple style) */}
              {menu.items && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-full pt-3 left-0 transition-all duration-300 ease-smooth z-[600]
                    ${activeDropdown === menu.key ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
                >
                <div className="bg-[#FAF8F3]/95 dark:bg-[#111111]/90 supports-[backdrop-filter]:bg-[#FAF8F3]/85 supports-[backdrop-filter]:dark:bg-[#111111]/80 backdrop-blur-xl rounded-2xl overflow-hidden min-w-[280px] shadow-deep border border-black/5 dark:border-white/10 py-2">
                  {menu.items.map((sub, idx) => {
                    if ((sub as any).isDivider) {
                      return <div key={idx} className="my-1.5 border-t border-black/10 dark:border-white/10" />;
                    }
                    if ((sub as any).isHeader) {
                      return (
                        <div key={idx} className="px-4 pt-2.5 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5 select-none">
                          {sub.label}
                        </div>
                      );
                    }
                    return (
                    <a
                      key={idx}
                      href={sub.href}
                      target={(sub as any).target || undefined}
                      rel={(sub as any).target === '_blank' ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (sub.action === 'external') {
                          setActiveDropdown(null);
                          return;
                        }
                        setActiveDropdown(null);
                        
                        // Handle custom triggers
                        if (sub.action === 'map') {
                          e.preventDefault();
                          onOpenMapCurtain();
                        } else if (sub.action === 'flights') {
                          e.preventDefault();
                          onOpenFlightSearch();
                        } else if (sub.action === 'planner') {
                          e.preventDefault();
                          onOpenPlanner();
                        } else if (sub.action === 'builder') {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('open_builder'));
                        } else if (sub.action === 'emergency_sos') {
                          e.preventDefault();
                          setEmergencyOpen(true);
                        } else if (sub.action && sub.action.startsWith('portal_services_')) {
                          e.preventDefault();
                          const serviceType = sub.action.replace('portal_services_', '');
                          localStorage.setItem('vietana_open_service', serviceType);
                          window.history.pushState({}, '', `/services`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } else if (sub.action && sub.action.startsWith('portal_')) {
                          e.preventDefault();
                          const target = sub.action.replace('portal_', '');
                          if ((sub as any).filter) {
                            if (target === 'attractions') {
                              if (['SOUTH VIETNAM', 'CENTRAL VIETNAM', 'NORTH VIETNAM'].includes((sub as any).filter)) {
                                localStorage.setItem('pending_attraction_region', (sub as any).filter);
                              } else {
                                localStorage.setItem('pending_attraction_type', (sub as any).filter);
                              }
                            } else if (target === 'tours-experiences') {
                              localStorage.setItem('pending_tour_region', (sub as any).filter);
                            } else {
                              localStorage.setItem('pending_package_category', (sub as any).filter);
                            }
                          }
                          window.history.pushState({}, '', `/${target}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } else if (sub.action && sub.action.startsWith('guide_')) {
                          e.preventDefault();
                          const target = sub.action.replace('guide_', '');
                          window.history.pushState({}, '', `/travel-guide/${target}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } else {
                          // Standard section scroll
                          const targetId = sub.href.replace('#', '');
                          const isHome = window.location.pathname === '/' || window.location.pathname === '';
                          
                          if (!isHome && sub.href.startsWith('#')) {
                            if ((sub as any).dest) {
                              localStorage.setItem('pending_destination', (sub as any).dest);
                            } else if ((sub as any).filter) {
                              localStorage.setItem('pending_package_category', (sub as any).filter);
                            } else if ((sub as any).serviceId) {
                              localStorage.setItem('pending_service', (sub as any).serviceId);
                            }
                            window.location.href = `/${sub.href}`;
                            return;
                          }

                          e.preventDefault();
                          const isCustomAction = (sub as any).dest || (sub as any).filter || (sub as any).serviceId;
                          if (!isCustomAction) {
                            const el = document.getElementById(targetId);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', `/${targetId}`);
                            }
                          } else {
                            window.history.pushState(null, '', `/${targetId}`);
                          }

                          // Dispatch custom events for inter-component interaction
                          if ((sub as any).dest) {
                            window.dispatchEvent(new CustomEvent('select_destination', { detail: (sub as any).dest }));
                          } else if ((sub as any).filter) {
                            window.dispatchEvent(new CustomEvent('select_package_category', { detail: (sub as any).filter }));
                          } else if ((sub as any).serviceId) {
                            window.dispatchEvent(new CustomEvent('select_service', { detail: (sub as any).serviceId }));
                          }
                        }
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 no-underline text-[#12302B] dark:text-white/80"
                    >
                      <Text size="sm" variant="none" className="font-semibold text-xs tracking-wide flex items-center justify-between w-full gap-2 whitespace-nowrap">
                        {sub.label.includes('(🔥 RECOMMENDED)') ? (
                          <>
                            <span>{sub.label.replace(' (🔥 RECOMMENDED)', '')}</span>
                            <span className="text-[7.5px] text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] px-1 py-0.5 rounded font-black tracking-normal uppercase shrink-0">
                              🔥 RECOMMENDED
                            </span>
                          </>
                        ) : (
                          sub.label
                        )}
                      </Text>
                    </a>
                    );
                  })}
                </div>
              </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">


          <div className="hidden sm:block">
            <ThemeToggle isNavbar={true} isLight={isLight} />
          </div>
          
          <div className="hidden md:flex relative items-center">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer  transition-all duration-350 ease-soft whitespace-nowrap select-none border
                ${shouldShowLight ? 'glass border-black/10 hover:bg-black/5' : 'glass-dark border-white/22 hover:bg-white/10 hover:border-white/45'}`} 
              onClick={toggleLang}
            >
              <Text size="xs" variant="none" weight="medium" className={`tracking-wide flex items-center gap-1.5 ${shouldShowLight ? 'text-text-muted' : 'text-white/88'}`}>
                <Icon name="Globe" size={14} /><span id="langLabel">{language}</span>
              </Text>
              <Icon name="ChevronDown" size={14} className={`opacity-60 transition-transform duration-300 ${shouldShowLight ? 'text-text-muted' : 'text-white/88'} ${langOpen ? 'rotate-180' : ''}`} />
            </div>

            <div className={`absolute top-[calc(100%+0.8rem)] right-0 glass-dark rounded-xl overflow-hidden min-w-[155px] shadow-deep transition-all duration-300 ease-smooth z-[600] border border-white/10
              ${langOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
            >
              {[
                { code: 'EN', name: 'English' },
                { code: 'HI', name: 'Hindi' },
                { code: 'VI', name: 'Vietnamese' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-250 no-underline border-none bg-transparent cursor-pointer
                    ${language === lang.code ? 'bg-brand-gold/8' : 'hover:bg-brand-gold/12'}`}
                  onClick={() => handleLangChange(lang.code as any)}
                >
                  <Text size="sm" variant="none" className={`flex-1 ${language === lang.code ? 'text-brand-gold font-medium' : 'text-white/78'}`}>
                    {lang.name}
                  </Text>
                  <Text size="xs" variant="none" className="opacity-50 text-white/78 font-bold">
                    {lang.code}
                  </Text>
                  {language === lang.code && <Icon name="Check" size={16} className="ml-auto text-brand-gold" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex relative items-center">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-350 ease-soft whitespace-nowrap select-none border
                ${shouldShowLight ? 'glass border-black/10 hover:bg-black/5' : 'glass-dark border-white/22 hover:bg-white/10 hover:border-white/45'}`} 
              onClick={toggleCurr}
            >
              <Text size="xs" variant="none" weight="medium" className={`tracking-wide flex items-center gap-1.5 ${shouldShowLight ? 'text-text-muted' : 'text-white/88'}`}>
                <span>{currency}</span>
              </Text>
              <Icon name="ChevronDown" size={14} className={`opacity-60 transition-transform duration-300 ${shouldShowLight ? 'text-text-muted' : 'text-white/88'} ${currOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <div className={`absolute top-[calc(100%+0.6rem)] right-0 glass-dark rounded-xl overflow-hidden min-w-[120px] shadow-deep transition-all duration-300 ease-smooth z-[600]
              ${currOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
            >
              {[
                { code: 'INR', symbol: '₹', name: 'Rupee' },
                { code: 'USD', symbol: '$', name: 'Dollar' },
                { code: 'EUR', symbol: '€', name: 'Euro' },
                { code: 'VND', symbol: '₫', name: 'Dong' }
              ].map((curr) => (
                <button 
                  key={curr.code}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors duration-250 no-underline border-none bg-transparent cursor-pointer
                    ${currency === curr.code ? 'bg-brand-gold/8' : 'hover:bg-brand-gold/12'}`} 
                  onClick={() => {
                    setCurrency(curr.code as Currency);
                    setCurrOpen(false);
                  }}
                >
                  <span className="text-base font-bold text-white/50">{curr.symbol}</span>
                  <Text size="sm" variant="none" className={`flex-1 ${currency === curr.code ? 'text-brand-gold font-medium' : 'text-white/78'}`}>
                    {curr.code}
                  </Text>
                  {currency === curr.code && <Icon name="Check" size={16} className="ml-auto text-brand-gold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Header buttons removed to declutter navigation and prevent overflow */}

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className={`flex lg:hidden flex-col items-center justify-center gap-[6px] cursor-pointer w-10 h-10 z-[500] group bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${mobileMenuOpen ? 'bg-white' : (isLight ? 'bg-brand-green' : 'bg-white')} ${mobileMenuOpen ? 'rotate-45 translate-x-[4.2px] translate-y-[4.2px]' : ''}`}></span>
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${mobileMenuOpen ? 'bg-white' : (isLight ? 'bg-brand-green' : 'bg-white')} ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-350 ease-soft ${mobileMenuOpen ? 'bg-white' : (isLight ? 'bg-brand-green' : 'bg-white')} ${mobileMenuOpen ? '-rotate-45 translate-x-[4.2px] -translate-y-[4.2px]' : ''}`}></span>
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
          {NAVIGATION_ITEMS.map((menu) => (
            <div key={menu.key} className="flex flex-col items-center gap-2 w-full">
              <button 
                onClick={() => {
                  if ((menu as any).action === 'portal_services') {
                    window.history.pushState({}, '', `/services`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    setMobileMenuOpen(false);
                  } else {
                    setMobileOpenSection(mobileOpenSection === menu.key ? null : menu.key);
                  }
                }}
                className="no-underline bg-transparent border-none text-white/90 transition-all duration-300 hover:text-brand-gold text-2xl font-normal tracking-wider cursor-pointer font-serif flex items-center justify-center gap-2 mx-auto py-2"
              >
                {menu.label}
                {menu.items && (
                  <Icon name="ChevronDown" size={14} className={`transition-transform duration-300 ${mobileOpenSection === menu.key ? 'rotate-180 text-brand-gold' : ''}`} />
                )}
              </button>
              
              {/* Accordion children */}
              {menu.items && mobileOpenSection === menu.key && (
                <div className="flex flex-col gap-1.5 items-center mt-2 bg-white/[0.03] w-full max-w-[300px] p-3 rounded-2xl border border-white/5">
                  {menu.items.map((sub, idx) => {
                    if ((sub as any).isDivider) {
                      return <div key={idx} className="my-1.5 w-full border-t border-white/10" />;
                    }
                    if ((sub as any).isHeader) {
                      return (
                        <div key={idx} className="w-full text-center pt-2 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold select-none">
                          {sub.label}
                        </div>
                      );
                    }
                    return (
                    <a
                      key={idx}
                      href={sub.href}
                      target={(sub as any).target || undefined}
                      rel={(sub as any).target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-white/70 hover:text-[#FAF8F3] text-[10px] no-underline py-2 px-3 font-sans font-bold tracking-widest uppercase hover:bg-white/5 rounded-xl transition-all duration-200 w-full text-center"
                      onClick={(e) => {
                        if (sub.action === 'external') {
                          setMobileMenuOpen(false);
                          setMobileOpenSection(null);
                          return;
                        }
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setMobileOpenSection(null);
                        
                        // Handle custom action routes
                        if (sub.action && sub.action.startsWith('portal_')) {
                          const target = sub.action.replace('portal_', '');
                          if ((sub as any).filter) {
                            if (target === 'attractions') {
                              if (['SOUTH VIETNAM', 'CENTRAL VIETNAM', 'NORTH VIETNAM'].includes((sub as any).filter)) {
                                localStorage.setItem('pending_attraction_region', (sub as any).filter);
                              } else {
                                localStorage.setItem('pending_attraction_type', (sub as any).filter);
                              }
                            } else if (target === 'tours-experiences') {
                              localStorage.setItem('pending_tour_region', (sub as any).filter);
                            } else {
                              localStorage.setItem('pending_package_category', (sub as any).filter);
                            }
                          }
                          window.history.pushState({}, '', `/${target}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                          return;
                        }

                        if (sub.action && sub.action.startsWith('guide_')) {
                          const target = sub.action.replace('guide_', '');
                          window.history.pushState({}, '', `/travel-guide/${target}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                          return;
                        }

                        if (sub.action === 'emergency_sos') {
                          setEmergencyOpen(true);
                          return;
                        }

                        if (sub.action === 'map') {
                          onOpenMapCurtain();
                          return;
                        } else if (sub.action === 'flights') {
                          onOpenFlightSearch();
                          return;
                        } else if (sub.action === 'planner') {
                          onOpenPlanner();
                          return;
                        } else if (sub.action === 'builder') {
                          window.dispatchEvent(new CustomEvent('open_builder'));
                          return;
                        }

                        // Standard section scroll with homepage redirect
                        const targetId = sub.href.replace('#', '');
                        const isHome = window.location.pathname === '/' || window.location.pathname === '';
                        
                        if (!isHome && sub.href.startsWith('#')) {
                          if ((sub as any).dest) {
                            localStorage.setItem('pending_destination', (sub as any).dest);
                          } else if ((sub as any).filter) {
                            localStorage.setItem('pending_package_category', (sub as any).filter);
                          } else if ((sub as any).serviceId) {
                            localStorage.setItem('pending_service', (sub as any).serviceId);
                          }
                          window.location.href = `/${sub.href}`;
                          return;
                        }

                        const isCustomAction = (sub as any).dest || (sub as any).filter || (sub as any).serviceId;
                        if (!isCustomAction) {
                          const el = document.getElementById(targetId);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }

                        // Dispatch custom events for inter-component interaction
                        if ((sub as any).dest) {
                          window.dispatchEvent(new CustomEvent('select_destination', { detail: (sub as any).dest }));
                        } else if ((sub as any).filter) {
                          window.dispatchEvent(new CustomEvent('select_package_category', { detail: (sub as any).filter }));
                        } else if ((sub as any).serviceId) {
                          window.dispatchEvent(new CustomEvent('select_service', { detail: (sub as any).serviceId }));
                        }
                      }}
                    >
                      {sub.label}
                    </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="h-px w-2/3 bg-white/10 my-4"></div>

          {/* High-visibility Gold CTA Button */}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              const isHome = window.location.pathname === '/' || window.location.pathname === '';
              if (!isHome) {
                window.location.href = '/#inquiry';
              } else {
                const el = document.getElementById('inquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full max-w-[240px] bg-brand-gold hover:bg-[#d8b83a] text-[#12302B] py-3.5 px-6 rounded-full font-serif font-bold text-sm tracking-wider uppercase shadow-lg transition-colors border-none flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="Sparkles" size={16} />
            Get Free Quote
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); setEmergencyOpen(true); }}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 transition-colors no-underline w-full max-w-[240px] cursor-pointer"
          >
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Emergency</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMapCurtain();
            }}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold transition-colors w-full max-w-[240px] cursor-pointer"
          >
            <Icon name="Map" size={16} />
            <span className="text-sm font-semibold tracking-wider">Explore Map</span>
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
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open_whatsapp'))} 
            className="bg-transparent border-none cursor-pointer text-brand-gold text-xl flex items-center gap-2 font-sans hover:opacity-80 transition-opacity"
          >
            <Icon name="MessageCircle" size={24} /> WhatsApp
          </button>
        </div>
      </div>

      {/* Click outside to close drops */}
      {langOpen && <div className="fixed inset-0 z-[999]" onClick={() => setLangOpen(false)}></div>}
      {expDropOpen && <div className="fixed inset-0 z-[999]" onClick={() => setExpDropOpen(false)}></div>}
    </>
  );
};

export default Navbar;

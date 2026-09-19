import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from './contexts/LanguageContext';

// Standard Components (Top of the page)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import InquiryForm from './components/InquiryForm';
import ThankYouPage from './components/ThankYouPage';
import PlanMyTripWidget from './components/PlanMyTripWidget';
import StickyMobileFooterCTA from './components/StickyMobileFooterCTA';
import QuickQuoteSection from './components/QuickQuoteSection';
import Icon from './components/ui/Icon';
import { trackEvent } from './utils/analytics';
import { initAttribution } from './utils/attribution';

// Layout Components
import ProgressBar from './components/layout/ProgressBar';
import BackToTop from './components/layout/BackToTop';
import FloatingHelpAndChat from './components/layout/FloatingHelpAndChat';
import WhatsAppPopup from './components/ui/WhatsAppPopup';
import Separator from './components/ui/layout/Separator';
import HowItWorks from './components/HowItWorks';
import CompactTrustProof from './components/CompactTrustProof';
import ExperiencesPreview from './components/ExperiencesPreview';
import WhyVietana from './components/WhyVietana';

// Hooks
import { useScroll } from './hooks/useScroll';
import { useMetadata } from './hooks/useMetadata';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

// Lazy Loaded Components (Below the fold)
const Destinations = lazy(() => import('./components/Destinations'));
const Team = lazy(() => import('./components/Team'));
const Journal = lazy(() => import('./components/Journal'));
const Services = lazy(() => import('./components/Services'));
const Packages = lazy(() => import('./components/Packages'));
const Food = lazy(() => import('./components/Food'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Modals
const AIPlanner = lazy(() => import('./components/AIPlanner'));
const MagicMode = lazy(() => import('./components/MagicMode'));
const ThingsToDo = lazy(() => import('./components/ThingsToDo'));
const MapCurtain = lazy(() => import('./components/MapCurtain'));
const FlightSearchModal = lazy(() => import('./components/FlightSearchModal'));
const PackageCatalogue = lazy(() => import('./components/PackageCatalogue'));
const AttractionCatalogue = lazy(() => import('./components/AttractionCatalogue'));

import SEO from './components/seo/SEO';
import AgentDashboard from './apps/agent/AgentDashboard';
import AdminDashboard from './apps/admin/AdminDashboard';
import TravelerDashboard from './apps/traveler/TravelerDashboard';
import PartnerDashboard from './apps/partner/PartnerDashboard';
import LoginModal from './components/LoginModal';
import CommandPalette from './components/CommandPalette';
import TravelGuidePage from './features/travel-guide/TravelGuidePage';

export default function App() {
  const { t } = useTranslation();
  const { scrollProgress, isScrolled, scrollY } = useScroll();
  useIntersectionObserver();
  useMetadata('Feel Vietnam, Your Way', 'Premium bespoke travel for Indian travelers. Locally managed from Ho Chi Minh City.');

  useEffect(() => {
    initAttribution();
  }, []);

  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  
  const [builderDestinations, setBuilderDestinations] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_cities');
    return cached ? JSON.parse(cached) : [];
  });
  
  const [builderSights, setBuilderSights] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_sights');
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    localStorage.setItem('vietana_trip_cities', JSON.stringify(builderDestinations));
  }, [builderDestinations]);

  useEffect(() => {
    localStorage.setItem('vietana_trip_sights', JSON.stringify(builderSights));
  }, [builderSights]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFlightSearchOpen, setIsFlightSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState<string | undefined>();

  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleOpenWhatsApp = (e: any) => {
      if (e.detail?.message) {
        setWhatsappMessage(e.detail.message);
      } else {
        setWhatsappMessage(undefined);
      }
      setIsWhatsAppOpen(true);
    };
    window.addEventListener('open_whatsapp', handleOpenWhatsApp);
    return () => window.removeEventListener('open_whatsapp', handleOpenWhatsApp);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleOpenPackageCatalogue = () => {
      handlePortalNavigate('packages' as any);
    };
    const handleOpenBuilder = () => {
      setBuilderDestinations([]);
      setIsBuilderOpen(true);
    };
    window.addEventListener('open_package_catalogue', handleOpenPackageCatalogue);
    window.addEventListener('open_builder', handleOpenBuilder);
    return () => {
      window.removeEventListener('open_package_catalogue', handleOpenPackageCatalogue);
      window.removeEventListener('open_builder', handleOpenBuilder);
    };
  }, []);

  const [initialAttractionProductId, setInitialAttractionProductId] = useState<string | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      const searchParams = new URLSearchParams(window.location.search);
      const ticketParam = searchParams.get('ticket') || searchParams.get('id');

      if (path === 'agent') {
        setActivePortal('agent');
      } else if (path === 'admin') {
        setActivePortal('admin');
      } else if (path === 'traveler') {
        setActivePortal('traveler');
      } else if (path === 'partner') {
        setActivePortal('partner');
      } else if (path === 'food') {
        setActivePortal('food');
      } else if (path.startsWith('travel-guide')) {
        setActivePortal('travel-guide' as any);
      } else if (path === 'experiences' || path === 'things-to-do') {
        setActivePortal('experiences' as any);
      } else if (path === 'packages' || path === 'itineraries') {
        setActivePortal('packages' as any);
      } else if (path.startsWith('attractions/') || path.startsWith('attraction-tickets/')) {
        const parts = path.split('/');
        const prodId = parts[1] || null;
        setInitialAttractionProductId(prodId);
        setActivePortal('attractions' as any);
      } else if (path === 'attractions' || path === 'attraction-tickets') {
        setInitialAttractionProductId(ticketParam);
        setActivePortal('attractions' as any);
      } else if (path === 'planner') {
        openPlanner();
      } else if (path === 'contact') {
        setActivePortal('contact');
      } else if (path === 'about') {
        setActivePortal('about');
      } else if (path === 'services') {
        setActivePortal('services');
      } else if (path === 'why-choose-us') {
        setActivePortal('why-choose-us');
      } else if (path === 'destinations') {
        setActivePortal('destinations');
      } else if (path === 'journal') {
        setActivePortal('journal');
      } else if (path === 'flights') {
        setIsFlightSearchOpen(true);
      } else {
        setActivePortal(null);
        setIsPlannerOpen(false);
        setIsFlightSearchOpen(false);
        
        // Map clean routing tags to element IDs
        let targetId = path;
        
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    const timer = setTimeout(handleLocationChange, 800);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const openPlanner = (destination?: string, prompt?: string) => {
    setInitialDestination(destination);
    setInitialPrompt(prompt);
    setIsPlannerOpen(true);
  };

  const handlePortalNavigate = (portal: string | null) => {
    setActivePortal(portal);
    if (portal) {
      window.history.pushState({}, '', `/${portal}`);
    } else {
      setInitialAttractionProductId(null);
      window.history.pushState({}, '', '/');
    }
  };

  // Mobile Inquiry Drawer States (Homepage Time Trigger)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const previousFocusEl = useRef<HTMLElement | null>(null);
  const drawerHeadingRef = useRef<HTMLHeadingElement>(null);
  const bodyPreviousOverflow = useRef<string>('');

  // Monitor viewport changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle focus movement & background scroll lock
  useEffect(() => {
    if (isDrawerOpen) {
      if (isMobile) {
        bodyPreviousOverflow.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }

      setTimeout(() => {
        if (drawerHeadingRef.current) {
          drawerHeadingRef.current.focus();
        }
      }, 100);
    } else {
      if (isMobile && bodyPreviousOverflow.current !== undefined) {
        document.body.style.overflow = bodyPreviousOverflow.current;
      }

      if (previousFocusEl.current && document.body.contains(previousFocusEl.current)) {
        previousFocusEl.current.focus();
      }
    }

    return () => {
      if (isDrawerOpen && isMobile && bodyPreviousOverflow.current !== undefined) {
        document.body.style.overflow = bodyPreviousOverflow.current;
      }
    };
  }, [isDrawerOpen, isMobile]);

  // Handle Escape key closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  const handleManualOpen = () => {
    if (document.activeElement) {
      previousFocusEl.current = document.activeElement as HTMLElement;
    }
    setIsDrawerOpen(true);
    trackEvent('inquiry_drawer_impression', { trigger_type: 'manual' });
  };

  const handleDismiss = () => {
    setIsDrawerOpen(false);
    sessionStorage.setItem('vietana_quote_popup_dismissed', 'true');
    trackEvent('inquiry_drawer_dismiss');
  };

  const handleFormSubmitSuccess = () => {
    sessionStorage.setItem('vietana_quote_submitted', 'true');
    // Note: inquiry_drawer_submit event is dispatched inside InquiryForm.tsx
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 2000);
  };

  const shouldReduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (activePortal === 'agent') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-2 border-b flex justify-between items-center text-xs select-none">
          <span className="font-semibold text-gray-500">VIETANA Agent Portal Sandbox Mode</span>
          <button 
            onClick={() => handlePortalNavigate(null)}
            className="bg-[#12302B] text-white px-3 py-1 rounded-md cursor-pointer font-bold uppercase tracking-wider"
          >
            ➔ Go to Public Website
          </button>
        </div>
        <AgentDashboard />
      </div>
    );
  }

  if (activePortal === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-2 border-b flex justify-between items-center text-xs select-none">
          <span className="font-semibold text-gray-500">VIETANA Control Center Sandbox Mode</span>
          <button 
            onClick={() => handlePortalNavigate(null)}
            className="bg-[#12302B] text-white px-3 py-1 rounded-md cursor-pointer font-bold uppercase tracking-wider"
          >
            ➔ Go to Public Website
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  if (activePortal === 'traveler') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-2 border-b flex justify-between items-center text-xs select-none">
          <span className="font-semibold text-gray-500">VIETANA Traveler Portal Sandbox Mode</span>
          <button 
            onClick={() => handlePortalNavigate(null)}
            className="bg-[#12302B] text-white px-3 py-1 rounded-md cursor-pointer font-bold uppercase tracking-wider"
          >
            ➔ Go to Public Website
          </button>
        </div>
        <TravelerDashboard />
      </div>
    );
  }

  if (activePortal === 'partner') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white px-6 py-2 border-b flex justify-between items-center text-xs select-none">
          <span className="font-semibold text-gray-500">VIETANA Partner Portal Sandbox Mode</span>
          <button 
            onClick={() => handlePortalNavigate(null)}
            className="bg-[#12302B] text-white px-3 py-1 rounded-md cursor-pointer font-bold uppercase tracking-wider"
          >
            ➔ Go to Public Website
          </button>
        </div>
        <PartnerDashboard />
      </div>
    );
  }

  if ((activePortal as any) === 'travel-guide') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col">
        <div className="bg-white px-6 py-2 border-b flex justify-between items-center text-xs select-none">
          <span className="font-semibold text-gray-500">VIETANA Knowledge Center</span>
          <button 
            onClick={() => handlePortalNavigate(null)}
            className="bg-[#12302B] text-white px-3 py-1 rounded-md cursor-pointer font-bold uppercase tracking-wider"
          >
            ➔ Go to Public Website
          </button>
        </div>
        <TravelGuidePage />
      </div>
    );
  }

  if (activePortal === 'food') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar 
          scrolled={true}
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          onOpenPlanner={() => openPlanner()} 
          onOpenExperiences={() => handlePortalNavigate('experiences' as any)}
          onOpenMapCurtain={() => setIsMapOpen(true)}
          onOpenFlightSearch={() => setIsFlightSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading food guide...</div>}>
            <Food />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if ((activePortal as any) === 'experiences') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar 
          scrolled={true}
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          onOpenPlanner={() => openPlanner()} 
          onOpenExperiences={() => handlePortalNavigate('experiences' as any)}
          onOpenMapCurtain={() => setIsMapOpen(true)}
          onOpenFlightSearch={() => setIsFlightSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading experiences discovery platform...</div>}>
            <ThingsToDo 
              onOpenPlanner={(dest, prompt) => openPlanner(dest, prompt)}
            />
          </Suspense>
        </main>
        <Footer />

        <AnimatePresence>
          {isPlannerOpen && (
            <AIPlanner 
              isOpen={isPlannerOpen}
              onClose={() => setIsPlannerOpen(false)}
              initialPrompt={initialPrompt}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  if ((activePortal as any) === 'packages') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar 
          scrolled={true}
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          onOpenPlanner={() => openPlanner()} 
          onOpenExperiences={() => handlePortalNavigate('experiences' as any)}
          onOpenMapCurtain={() => setIsMapOpen(true)}
          onOpenFlightSearch={() => setIsFlightSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading packages catalogue...</div>}>
            <PackageCatalogue 
              onClose={() => handlePortalNavigate(null)}
              onQuoteClick={() => {
                handlePortalNavigate(null);
                setTimeout(() => {
                  const el = document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          </Suspense>
        </main>
        <Footer />

        <AnimatePresence>
          {isPlannerOpen && (
            <AIPlanner 
              isOpen={isPlannerOpen}
              onClose={() => setIsPlannerOpen(false)}
              initialPrompt={initialPrompt}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  if ((activePortal as any) === 'attractions') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar 
          scrolled={true}
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          onOpenPlanner={() => openPlanner()} 
          onOpenExperiences={() => handlePortalNavigate('experiences' as any)}
          onOpenMapCurtain={() => setIsMapOpen(true)}
          onOpenFlightSearch={() => setIsFlightSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading attraction tickets catalogue...</div>}>
            <AttractionCatalogue 
              initialProductId={initialAttractionProductId}
              onClose={() => handlePortalNavigate(null)}
              onQuoteClick={() => {
                handlePortalNavigate(null);
                setTimeout(() => {
                  const el = document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'destinations') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Destinations />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'services') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1 bg-white">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Services limit={100} />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'why-choose-us') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading...</div>}>
            <About onOpenBuilder={() => setIsBuilderOpen(true)} />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'about') {
    return (
      <div className="min-h-screen bg-white flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading about portal...</div>}>
            <Team />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'contact') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">Loading contact portal...</div>}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (activePortal === 'journal') {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex flex-col selection:bg-brand-gold selection:text-black">
        <SEO />
        <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onOpenPlanner={() => openPlanner()} onOpenExperiences={() => handlePortalNavigate('experiences')} onOpenMapCurtain={() => setIsMapOpen(true)} onOpenFlightSearch={() => setIsFlightSearchOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
        <main className="pt-24 flex-1">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Journal />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  if (hash === '#/thank-you') {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-brand-gold selection:text-black">
        <SEO />
        <ThankYouPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-black text-[#12302B] dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-brand-gold selection:text-black">
      <SEO />
      <ProgressBar progress={scrollProgress} />
      <BackToTop visible={scrollY > 700} />
      {(!isDrawerOpen && !isLoginOpen && !isPaletteOpen && !isPlannerOpen && !isMagicModeOpen && !isExperiencesOpen && !isMapOpen && !isFlightSearchOpen && !mobileMenuOpen) && (
        <FloatingHelpAndChat 
          onPlannerClick={() => openPlanner()} 
          onWhatsAppClick={() => setIsWhatsAppOpen(true)}
        />
      )}

      <Navbar
        scrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
        onOpenExperiences={() => handlePortalNavigate('experiences' as any)}
        onOpenMapCurtain={() => setIsMapOpen(true)}
        onOpenFlightSearch={() => setIsFlightSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main>
        <Hero onOpenMagic={() => setIsMagicModeOpen(true)} />
        
        <Suspense fallback={<SectionPlaceholder />}>
          <Packages 
            onOpenBuilder={(dest) => { setBuilderDestinations(dest || []); setIsBuilderOpen(true); }} 
            onOpenPlanner={(dest, prompt) => openPlanner(dest, prompt)}
          />
          <ExperiencesPreview onOpenExperiences={() => handlePortalNavigate('experiences' as any)} />
          <WhyVietana />
          <InquiryForm />
        </Suspense>
      </main>

      <AnimatePresence>
        {isPlannerOpen && (
          <Suspense>
            <AIPlanner 
              isOpen={isPlannerOpen} 
              onClose={() => { setIsPlannerOpen(false); setInitialDestination(undefined); setInitialPrompt(undefined); }} 
              initialDestination={initialDestination}
              initialPrompt={initialPrompt}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMagicModeOpen && (
          <Suspense>
            <MagicMode 
              isOpen={isMagicModeOpen} 
              onClose={() => setIsMagicModeOpen(false)} 
              onOpenPlanner={(dest) => openPlanner(dest)}
              onOpenBuilder={() => { setBuilderDestinations([]); setIsBuilderOpen(true); }}
              onOpenPackages={() => {
                const packagesSection = document.getElementById('experiences');
                if (packagesSection) {
                  packagesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <Suspense>
        <MapCurtain 
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          onOpenPlanner={(dest) => openPlanner(dest)}
          selectedCities={builderDestinations}
          selectedSights={builderSights}
          onAddCity={(city) => {
            setBuilderDestinations(prev => {
              const next = prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city];
              setIsBuilderOpen(true);
              return next;
            });
          }}
          onAddSight={(city, sight) => {
            setBuilderDestinations(prev => prev.includes(city) ? prev : [...prev, city]);
            setBuilderSights(prev => prev.includes(sight) ? prev.filter(s => s !== sight) : [...prev, sight]);
            setIsBuilderOpen(true);
          }}
        />
        <FlightSearchModal 
          isOpen={isFlightSearchOpen}
          onClose={() => setIsFlightSearchOpen(false)}
        />
      </Suspense>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(role) => {
          handlePortalNavigate(role);
          setIsLoginOpen(false);
        }}
      />

      <CommandPalette 
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={handlePortalNavigate}
      />

      <WhatsAppPopup 
        isOpen={isWhatsAppOpen} 
        onClose={() => setIsWhatsAppOpen(false)} 
        customMessage={whatsappMessage}
      />

      <PlanMyTripWidget />
      {!isDrawerOpen && !mobileMenuOpen && <StickyMobileFooterCTA />}
      <Footer />

      {/* Floating CTA Trigger Button (Mobile Only) */}
      {isMobile && !isDrawerOpen && !mobileMenuOpen && (
        <div className="fixed bottom-24 right-4 z-[999] pointer-events-auto pb-[env(safe-area-inset-bottom)]">
          <button
            onClick={handleManualOpen}
            className="w-14 h-14 rounded-full bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] shadow-lg flex items-center justify-center border-none cursor-pointer active:scale-95 transition-transform duration-200"
            aria-label="Get Free Quote"
          >
            <Icon name="Sparkles" size={24} className="text-[#12302B]" />
          </button>
        </div>
      )}

      {/* Premium Mobile Bottom Drawer Modal / Desktop Centered Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 z-[190000] flex items-end md:items-center justify-center select-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title-home"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-[#0E1B19]/80 backdrop-blur-xs"
            />

            {/* Bottom Sheet content container */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full md:max-w-2xl md:rounded-2xl max-h-[88dvh] bg-white dark:bg-[#121214] border-t md:border border-[#E6D9BF]/40 dark:border-white/10 rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden pb-[env(safe-area-inset-bottom)] z-10"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1 bg-gray-200 dark:bg-white/10 rounded-full mx-auto my-3 shrink-0 md:hidden" />

              {/* Header */}
              <div className="px-6 pb-4 border-b border-[#E6D9BF]/15 dark:border-white/5 flex justify-between items-start shrink-0">
                <div>
                  <h3 
                    id="drawer-title-home" 
                    ref={drawerHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-lg font-bold text-[#12302B] dark:text-white outline-none"
                  >
                    Planning your Vietnam trip?
                  </h3>
                  <p className="text-xxs text-gray-500 dark:text-gray-400 mt-1 font-light leading-relaxed max-w-[280px]">
                    Tell us what you’re looking for and our local travel team will help you build the right experience.
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition border-none cursor-pointer text-gray-500 dark:text-gray-400 shrink-0"
                  aria-label="Close quote drawer"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <InquiryForm onSuccess={handleFormSubmitSuccess} isDrawer={true} minimal={true} />
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>
      </div>
    );
  }

const SectionPlaceholder = () => (
  <div className="w-full py-24 bg-surface-cream overflow-hidden border-t border-black/5 dark:border-white/5">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="flex flex-col items-center md:items-start gap-4 mb-12">
        <div className="h-3 w-24 skeleton"></div>
        <div className="h-10 w-64 skeleton"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full h-80 skeleton rounded-2xl"></div>
            <div className="h-6 w-3/4 skeleton"></div>
            <div className="h-4 w-1/2 skeleton"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

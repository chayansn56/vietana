import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslation } from './contexts/LanguageContext';

// Standard Components (Top of the page)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Layout Components
import ProgressBar from './components/layout/ProgressBar';
import BackToTop from './components/layout/BackToTop';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import FloatingPlanner from './components/layout/FloatingPlanner';
import Separator from './components/ui/layout/Separator';

// Hooks
import { useScroll } from './hooks/useScroll';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useMetadata } from './hooks/useMetadata';
import { useNavStyle } from './hooks/useNavStyle';

// Lazy Loaded Components (Below the fold)
const Destinations = lazy(() => import('./components/Destinations'));
const Team = lazy(() => import('./components/Team'));
const Journal = lazy(() => import('./components/Journal'));
const Services = lazy(() => import('./components/Services'));
const Packages = lazy(() => import('./components/Packages'));
const Food = lazy(() => import('./components/Food'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Modals
const AIPlanner = lazy(() => import('./components/AIPlanner'));
const MagicMode = lazy(() => import('./components/MagicMode'));
const CustomTripBuilder = lazy(() => import('./components/CustomTripBuilder'));
const ExperiencesDrawer = lazy(() => import('./components/ExperiencesDrawer'));
const MapCurtain = lazy(() => import('./components/MapCurtain'));

import SEO from './components/seo/SEO';

export default function App() {
  const { t } = useTranslation();
  const { scrollProgress, isScrolled, scrollY } = useScroll();
  useIntersectionObserver();
  useMetadata('Feel Vietnam, Your Way', 'Premium bespoke travel for Indian travelers. Locally managed from Ho Chi Minh City.');

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

  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navClass = useNavStyle(scrollY, isScrolled);

  const openPlanner = (destination?: string, prompt?: string) => {
    setInitialDestination(destination);
    setInitialPrompt(prompt);
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-brand-gold selection:text-black">
      <SEO />
      <ProgressBar progress={scrollProgress} />
      <BackToTop visible={scrollY > 700} />
      <FloatingWhatsApp />
      <FloatingPlanner onClick={() => openPlanner()} />

      <Navbar 
        scrolled={isScrolled}
        navClass={navClass}
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
        onOpenContact={() => setIsContactOpen(true)}
        onOpenExperiences={() => setIsExperiencesOpen(true)}
        onOpenMapCurtain={() => setIsMapOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main>
        <Hero onOpenMagic={() => { setBuilderDestinations([]); setIsBuilderOpen(true); }} />
        
        <Suspense fallback={<SectionPlaceholder />}>
          <Destinations />
          <Separator variant="green" />
          <Packages 
            onOpenBuilder={(dest) => { setBuilderDestinations(dest || []); setIsBuilderOpen(true); }} 
            onOpenPlanner={(dest, prompt) => openPlanner(dest, prompt)}
          />
          <Separator variant="gold" />
          <Services />
          <Separator variant="green" />
          <Food />
          <Separator variant="gold" />
          <Team />
          <Separator variant="green" />
          <Journal />
          <FAQ onOpenPlanner={(dest, prompt) => openPlanner(dest, prompt)} />
          <Separator variant="gold" />
          <Testimonials />
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
            />
          </Suspense>
        )}
      </AnimatePresence>

      <Suspense>
        <CustomTripBuilder 
          isOpen={isBuilderOpen} 
          onClose={() => setIsBuilderOpen(false)} 
          initialDestinations={builderDestinations}
          initialSights={builderSights}
          onUpdateCities={setBuilderDestinations}
          onUpdateSights={setBuilderSights}
          onOpenAIPlanner={(prompt) => openPlanner(undefined, prompt)}
        />
        <ExperiencesDrawer 
          isOpen={isExperiencesOpen}
          onClose={() => setIsExperiencesOpen(false)}
          onOpenPlanner={(dest) => openPlanner(dest)}
        />
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
        <Contact 
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
        <About 
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          onOpenBuilder={() => setIsBuilderOpen(true)}
        />
      </Suspense>

      <Footer />
    </div>
  );
}

const SectionPlaceholder = () => (
  <div className="h-96 w-full bg-surface-warm animate-pulse flex items-center justify-center text-text-subtle">
    Loading content...
  </div>
);

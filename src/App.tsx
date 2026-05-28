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
import FloatingOrb from './components/layout/FloatingOrb';
import Separator from './components/ui/layout/Separator';

// Hooks
import { useScroll } from './hooks/useScroll';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useMetadata } from './hooks/useMetadata';

// Lazy Loaded Components (Below the fold)
const Services = lazy(() => import('./components/Services'));
const Packages = lazy(() => import('./components/Packages'));
const Food = lazy(() => import('./components/Food'));
const ComboSection = lazy(() => import('./components/ComboSection'));
const FAQ = lazy(() => import('./components/FAQ'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Modals
const AIPlanner = lazy(() => import('./components/AIPlanner'));
const MagicMode = lazy(() => import('./components/MagicMode'));
const CustomTripBuilder = lazy(() => import('./components/CustomTripBuilder'));

export default function App() {
  const { t } = useTranslation();
  const { scrollProgress, isScrolled, scrollY } = useScroll();
  useIntersectionObserver();
  useMetadata('Feel Vietnam, Your Way', 'Premium bespoke travel for Indian travelers. Locally managed from Ho Chi Minh City.');

  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navClass, setNavClass] = useState('');

  useEffect(() => {
    const sections = ['services', 'packages', 'food', 'about', 'contact'];
    let currentNavClass = isScrolled ? 'glassy' : '';
    
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          if (['services', 'packages', 'food', 'about'].includes(id)) {
            currentNavClass = 'light';
          }
        }
      }
    }
    setNavClass(currentNavClass);
  }, [scrollY, isScrolled]);

  const openPlanner = (destination?: string) => {
    setInitialDestination(destination);
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-cream">
      <ProgressBar progress={scrollProgress} />
      <BackToTop visible={scrollY > 700} />
      <FloatingOrb onClick={() => openPlanner()} />

      <Navbar 
        scrolled={isScrolled}
        navClass={navClass}
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
      />

      <main>
        <Hero onOpenMagic={() => setIsMagicModeOpen(true)} />
        
        <Suspense fallback={<SectionPlaceholder />}>
          <Services onOpenPlanner={(dest) => openPlanner(dest)} />
          <Separator variant="green" />
          <Packages onOpenBuilder={() => setIsBuilderOpen(true)} />
          <Separator variant="gold" />
          <Food />
          <ComboSection onOpenPlanner={(dest) => openPlanner(dest)} />
          <FAQ />
          <About />
          <Contact />
        </Suspense>
      </main>

      <AnimatePresence>
        {isPlannerOpen && (
          <Suspense>
            <AIPlanner 
              isOpen={isPlannerOpen} 
              onClose={() => { setIsPlannerOpen(false); setInitialDestination(undefined); }} 
              initialDestination={initialDestination}
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

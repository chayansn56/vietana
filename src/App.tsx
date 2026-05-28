import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AIPlanner from './components/AIPlanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Food from './components/Food';
import ComboSection from './components/ComboSection';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import CustomTripBuilder from './components/CustomTripBuilder';
import Footer from './components/Footer';
import MagicMode from './components/MagicMode';

// Layout Components
import ProgressBar from './components/layout/ProgressBar';
import BackToTop from './components/layout/BackToTop';
import FloatingOrb from './components/layout/FloatingOrb';

// Hooks
import { useScroll } from './hooks/useScroll';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

export default function App() {
  const { scrollProgress, isScrolled, scrollY } = useScroll();
  useIntersectionObserver();

  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navClass, setNavClass] = useState('');

  useEffect(() => {
    // Nav Classes (Glassy vs Light)
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
        <Services onOpenPlanner={(dest) => openPlanner(dest)} />
        <div className="h-px mx-[var(--spacing-layout)] bg-gradient-to-r from-transparent via-brand-green/10 to-transparent" />
        <Packages onOpenBuilder={() => setIsBuilderOpen(true)} />
        <div className="h-px mx-[var(--spacing-layout)] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent" />
        <Food />
        <ComboSection onOpenPlanner={(dest) => openPlanner(dest)} />
        <FAQ />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {isPlannerOpen && (
          <AIPlanner 
            isOpen={isPlannerOpen} 
            onClose={() => { setIsPlannerOpen(false); setInitialDestination(undefined); }} 
            initialDestination={initialDestination}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMagicModeOpen && (
          <MagicMode 
            isOpen={isMagicModeOpen} 
            onClose={() => setIsMagicModeOpen(false)} 
            onOpenPlanner={(dest) => openPlanner(dest)}
          />
        )}
      </AnimatePresence>

      <CustomTripBuilder 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)} 
      />

      <Footer />
    </div>
  );
}

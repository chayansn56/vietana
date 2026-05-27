import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AIPlanner from './components/AIPlanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Footer from './components/Footer';
import MagicMode from './components/MagicMode';

export default function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const btt = document.getElementById('btt');
      if (btt) {
        if (window.scrollY > 700) btt.classList.add('show');
        else btt.classList.remove('show');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openPlanner = (destination?: string) => {
    setInitialDestination(destination);
    setIsPlannerOpen(true);
  };

  return (
    <div className="app-container">
      <div id="pg" style={{ width: scrolled ? '100%' : '0%' }}></div>
      <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* FLOATING AI ORB */}
      <div id="ai-orb" onClick={() => openPlanner()}>
        <div className="orb-label">AI PLANNER</div>
        <div className="orb-core"></div>
        <div className="orb-glow"></div>
        <div className="orb-sparkle">✨</div>
      </div>

      <Navbar 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
      />

      <main>
        <Hero onOpenMagic={() => setIsMagicModeOpen(true)} />
        <Services />
        <div className="divl"></div>
        <Packages />
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

      <Footer />
    </div>
  );
}

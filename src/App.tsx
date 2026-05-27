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
import { useTranslation } from './contexts/LanguageContext';

export default function App() {
  const { t } = useTranslation();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navClass, setNavClass] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      const wh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      
      // Scroll Progress
      const progress = (st / (dh - wh)) * 100;
      setScrollProgress(progress);

      setScrolled(st > 80);

      // Nav Classes (Glassy vs Light)
      const sections = ['services', 'packages', 'food', 'about', 'contact'];
      let currentNavClass = st > 80 ? 'glassy' : '';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            if (id === 'services' || id === 'packages' || id === 'food' || id === 'about') {
              currentNavClass = 'light';
            }
          }
        }
      }
      setNavClass(currentNavClass);

      // Back to top
      const btt = document.getElementById('btt');
      if (btt) {
        if (st > 700) btt.classList.add('show');
        else btt.classList.remove('show');
      }
    };

    // Intersection Observer for Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.r').forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const openPlanner = (destination?: string) => {
    setInitialDestination(destination);
    setIsPlannerOpen(true);
  };

  return (
    <div className="app-container">
      <div id="pg" style={{ width: `${scrollProgress}%` }}></div>
      <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* FLOATING AI ORB */}
      <div id="ai-orb" onClick={() => openPlanner()}>
        <div className="orb-label">{t.nav.aiPlanner}</div>
        <div className="orb-core"></div>
        <div className="orb-glow"></div>
        <div className="orb-sparkle">✨</div>
      </div>

      <Navbar 
        scrolled={scrolled}
        navClass={navClass}
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
      />

      <main>
        <Hero onOpenMagic={() => setIsMagicModeOpen(true)} />
        <Services onOpenPlanner={(dest) => openPlanner(dest)} />
        <div className="divl"></div>
        <Packages onOpenBuilder={() => setIsBuilderOpen(true)} />
        <div className="divl"></div>
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

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
import OverlayLayout from './components/layout/OverlayLayout';
import Separator from './components/ui/layout/Separator';

// Hooks
import { useScroll } from './hooks/useScroll';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useMetadata } from './hooks/useMetadata';
import { useNavStyle } from './hooks/useNavStyle';
import { useDebounce } from './hooks/useDebounce';

import { useUIStore } from './contexts/UIContext';

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

import SEO from './components/seo/SEO';

export default function App() {
  const { t } = useTranslation();
  const { scrollProgress, isScrolled, scrollY } = useScroll();
  useIntersectionObserver();
  useMetadata('Feel Vietnam, Your Way', 'Premium bespoke travel for Indian travelers. Locally managed from Ho Chi Minh City.');

  const { setModalOpen, setPlannerInitialData, setBuilderDestinations } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navClass = useNavStyle(scrollY, isScrolled);

  const openPlanner = (destination?: string, prompt?: string) => {
    setPlannerInitialData({ destination, prompt });
    setModalOpen('planner', true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-brand-gold selection:text-black">
      <SEO />
      <ProgressBar progress={scrollProgress} />
      <BackToTop visible={scrollY > 700} />

      <OverlayLayout />

      <Navbar
        scrolled={isScrolled}
        navClass={navClass}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenPlanner={() => openPlanner()}
        onOpenContact={() => setModalOpen('contact', true)}
        onOpenExperiences={() => setModalOpen('experiences', true)}
        onOpenMapCurtain={() => setModalOpen('map', true)}
        onOpenAbout={() => setModalOpen('about', true)}
        onOpenFlightSearch={() => setModalOpen('flightSearch', true)}
      />

      <main>
        <Hero onOpenMagic={() => setModalOpen('magicMode', true)} />

        <Suspense fallback={<SectionPlaceholder />}>
          <Destinations />
          <Separator variant="green" />
          <Packages
            onOpenBuilder={(dest) => { setBuilderDestinations(dest || []); setModalOpen('builder', true); }}
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

      <Footer />
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

import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';
import ThemeToggle from '../ui/ThemeToggle';

interface FloatingPlannerProps {
  onClick: () => void;
}

const FloatingPlanner: React.FC<FloatingPlannerProps> = ({ onClick }) => {
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show floats once user scrolls past the hero section (200px)
      if (window.scrollY > 200) {
        setShowFloat(true);
      } else {
        setShowFloat(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showFloat) return null;

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[310] flex flex-col gap-3 pointer-events-none">
      {/* Hide floating ThemeToggle on mobile since it's in the mobile menu */}
      <div className="pointer-events-auto hidden md:block">
        <ThemeToggle />
      </div>
      <button
        onClick={onClick}
        className="pointer-events-auto cursor-pointer flex items-center justify-center gap-2 px-3.5 md:px-5 h-14 w-14 md:w-auto bg-gradient-to-r from-brand-gold to-brand-gold-light text-[#1D1D1F] rounded-full shadow-[0_8px_32px_rgba(201,168,76,0.3)] border border-brand-gold/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 group relative"
        title="Open Smart Planner"
        aria-label="Open Smart Planner"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D1D1F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1D1D1F]"></span>
        </span>
        <Icon name="Sparkles" size={18} className="text-[#1D1D1F] animate-pulse" />
        <span className="hidden md:inline font-serif font-bold text-sm tracking-wide whitespace-nowrap">Smart Planner</span>
      </button>
    </div>
  );
};

export default FloatingPlanner;

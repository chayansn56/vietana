import React from 'react';
import Icon from '../ui/Icon';
import ThemeToggle from '../ui/ThemeToggle';

interface FloatingPlannerProps {
  onClick: () => void;
}

const FloatingPlanner: React.FC<FloatingPlannerProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 left-8 z-[310] flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
      <button
        onClick={onClick}
        className="pointer-events-auto cursor-pointer flex items-center justify-center gap-3.5 px-5 h-14 bg-gradient-to-r from-brand-gold to-brand-gold-light text-[#1D1D1F] rounded-full shadow-[0_8px_32px_rgba(201,168,76,0.3)] border border-brand-gold/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 group relative"
        title="Open Smart Planner"
        aria-label="Open Smart Planner"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D1D1F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1D1D1F]"></span>
        </span>
        <Icon name="Sparkles" size={18} className="text-[#1D1D1F] animate-pulse" />
        <span className="font-serif font-bold text-sm tracking-wide">Smart Planner</span>
      </button>
    </div>
  );
};

export default FloatingPlanner;

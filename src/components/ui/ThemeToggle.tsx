import React, { useEffect, useState } from 'react';
import Icon from './Icon';

interface ThemeToggleProps {
  className?: string;
  isNavbar?: boolean;
  isLight?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, isNavbar = false, isLight = false }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('vietana_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    // Enable smooth transition only during toggle
    document.documentElement.classList.add('theme-transitioning');
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('vietana_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('vietana_theme', 'light');
      }
      return next;
    });
    // Remove after transition completes
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`focus-ring ${className || 'cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-sky-400/30 bg-gradient-to-br from-[#00F0FF] via-[#2563EB] to-[#EF4444] text-white shadow-[0_4px_14px_rgba(56,189,248,0.4)] hover:shadow-[0_4px_22px_rgba(239,68,68,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto'}`}
    >
      {isDark ? (
        <Icon name="Sun" size={16} className="text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
      ) : (
        <Icon name="Moon" size={16} className="text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      )}
    </button>
  );
};

export default ThemeToggle;

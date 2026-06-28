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
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`focus-ring ${className || 'cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border-none bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-green text-white shadow-[0_4px_12px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_18px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto'}`}
    >
      {isDark ? <Icon name="Sun" size={16} className="text-white" /> : <Icon name="Moon" size={16} className="text-white" />}
    </button>
  );
};

export default ThemeToggle;

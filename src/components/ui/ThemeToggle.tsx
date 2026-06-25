import React, { useEffect, useState } from 'react';
import Icon from './Icon';

const ThemeToggle: React.FC = () => {
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
      className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-[#1D1D1F]/10 bg-[#1D1D1F]/5 text-[#1D1D1F] dark:border-white/20 dark:bg-white/10 dark:text-white hover:bg-[#1D1D1F]/10 dark:hover:bg-white/25 transition-all duration-300 pointer-events-auto shadow-sm"
    >
      {isDark ? <Icon name="Sun" size={16} /> : <Icon name="Moon" size={16} />}
    </button>
  );
};

export default ThemeToggle;

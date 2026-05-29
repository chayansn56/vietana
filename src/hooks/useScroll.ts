import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrolled: boolean;
  direction: 'up' | 'down';
}

export const useScroll = (threshold = 80) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
    direction: 'down',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;

    const handleScroll = () => {
      // Cancel any pending frame to avoid stacking updates
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

        setScrollState({
          scrollY: currentScrollY,
          scrollProgress: progress,
          isScrolled: currentScrollY > threshold,
          direction: currentScrollY > lastScrollY ? 'down' : 'up',
        });

        lastScrollY = currentScrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return scrollState;
};

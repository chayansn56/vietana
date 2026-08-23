import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './ui/Icon';

export default function StickyMobileFooterCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the hero section (roughly 70vh)
      const threshold = window.innerHeight * 0.7;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToInquiry = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[800] px-4 pb-4 pt-3 bg-black/75 supports-[backdrop-filter]:bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Close button */}
          <button 
            onClick={() => setIsDismissed(true)} 
            className="absolute top-2 right-2 text-white/30 hover:text-white/60 p-1"
          >
            <Icon name="X" size={10} />
          </button>

          <div className="flex flex-col text-left py-1">
            <span className="text-xs text-white font-bold tracking-wide">
              Get Your Custom Travel Plan
            </span>
            <span className="text-[10px] text-white/60">
              Visa • Hotels • Tours • Local Expert
            </span>
          </div>

          <button
            onClick={handleScrollToInquiry}
            className="bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] px-4 py-2 rounded-lg text-xxs font-extrabold tracking-widest uppercase flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <Icon name="Sparkles" size={11} className="text-[#12302B]" /> Get Free Quote
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

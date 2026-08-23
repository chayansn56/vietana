import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './ui/Icon';

export default function PlanMyTripWidget() {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleScrollToInquiry = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* DESKTOP WIDGET VIEW */}
      <div className="hidden lg:block fixed right-0 top-[35%] z-[900]">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="flex items-center"
        >
          {/* Close button for full collapsibility */}
          <button
            onClick={() => setIsDismissed(true)}
            className="bg-[#12302B] text-white/70 hover:text-white border border-[#E6D9BF]/20 rounded-l-md p-1.5 shadow-md cursor-pointer hover:bg-[#1E4D45] transition-colors"
            title="Hide Button"
          >
            <Icon name="X" size={12} />
          </button>

          {/* Trigger Button */}
          <button
            onClick={handleScrollToInquiry}
            className="bg-[#1E4D45] dark:bg-[#1A2120] text-white border-y border-l border-[#E6D9BF] dark:border-white/10 py-5 px-3.5 rounded-l-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col items-center gap-3 cursor-pointer group hover:bg-[#12302B] dark:hover:bg-[#252E2D] transition-all duration-300"
          >
            <Icon name="Sparkles" size={16} className="animate-pulse text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span 
              className="font-serif text-xxs font-bold uppercase tracking-[0.2em] whitespace-nowrap text-[#FAF8F3]"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              GET FREE QUOTE
            </span>
          </button>
        </motion.div>
      </div>

      {/* MOBILE STICKY BUTTON VIEW - DISABLED TO PREVENT MOBILE CLUTTER & OVERLAPS */}
      {/* We already have Hero CTAs and the bottom StickyMobileFooterCTA which handle quotes */}
    </>
  );
}

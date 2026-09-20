import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../../utils/whatsapp';

interface FloatingHelpAndChatProps {
  onPlannerClick: () => void;
  onWhatsAppClick: () => void;
}

const FloatingHelpAndChat: React.FC<FloatingHelpAndChatProps> = ({ onPlannerClick, onWhatsAppClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY >= 200) {
        setMenuOpen(false); // Close help menu on scroll
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    onWhatsAppClick();
  };

  const handleLiveConcierge = () => {
    setMenuOpen(false);
    onWhatsAppClick();
  };

  const isAtHero = scrollY < 200;

  return (
    <div className="fixed bottom-[84px] right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[1010] flex flex-col items-end gap-3 pointer-events-none pb-[env(safe-area-inset-bottom)]">
      
      {/* 1. Hero Mode: Show Combined "Need Help?" Expandable Menu */}
      {isAtHero && (
        <div className="flex flex-col items-end gap-2.5 relative">
          {/* Expanded Menu Options */}
          <div 
            className={`flex flex-col gap-2 items-end transition-all duration-300 origin-bottom ${
              menuOpen 
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
            }`}
          >
            {/* Live Concierge Option */}
            <button
              onClick={handleLiveConcierge}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLiveConcierge();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-[#1C1C1E] text-[#12302B] dark:text-white border border-[#E6D9BF] dark:border-white/15 shadow-md hover:-translate-y-0.5 transition-transform duration-200 text-[10px] font-extrabold tracking-widest uppercase cursor-pointer touch-manipulation"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              💬 Live Concierge
            </button>

            {/* Plan Itinerary Option */}
            <button
              onClick={() => {
                setMenuOpen(false);
                onPlannerClick();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                onPlannerClick();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-[#1C1C1E] text-[#12302B] dark:text-white border border-[#E6D9BF] dark:border-white/15 shadow-md hover:-translate-y-0.5 transition-transform duration-200 text-[10px] font-extrabold tracking-widest uppercase cursor-pointer touch-manipulation"
            >
              <Icon name="Sparkles" size={11} className="text-brand-gold" />
              ✈️ Plan Your Trip
            </button>
          </div>

          {/* Main "Need Help?" Trigger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onTouchEnd={(e) => {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-[#12302B] rounded-full shadow-[0_8px_24px_rgba(201,168,76,0.25)] border border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-300 font-serif font-bold text-xs cursor-pointer select-none active:scale-95 touch-manipulation"
            aria-expanded={menuOpen}
          >
            <Icon name="HelpCircle" size={14} className={menuOpen ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
            <span>Need Help?</span>
          </button>
        </div>
      )}

      {/* 2. Scroll Mode: Show Single Compact WhatsApp Button */}
      {!isAtHero && (
        <div className="pointer-events-auto">
          <button 
            type="button"
            className="cursor-pointer flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border-none touch-manipulation"
            onClick={handleWhatsApp}
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-95">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.061-.3-.15-1.265-.462-2.406-1.479-.889-.788-1.487-1.761-1.663-2.061-.175-.3-.019-.461.132-.611.134-.133.3-.35.45-.524.148-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.148-.673-1.611-.922-2.206-.24-.579-.481-.501-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.767-.722 2.016-1.422.249-.701.249-1.301.173-1.422-.074-.122-.274-.196-.575-.346zm-5.454 5.928c-1.353 0-2.678-.363-3.834-1.049l-.275-.164-2.85.746.761-2.779-.18-.286c-.751-1.196-1.147-2.585-1.147-4.024 0-4.14 3.37-7.51 7.51-7.51 2.007 0 3.896.782 5.315 2.203 1.419 1.42 2.2 3.311 2.2 5.318 0 4.14-3.371 7.51-7.51 7.51zm0-16.713C7.307 3.597 3.4 7.502 3.4 12.235c0 1.517.397 2.998 1.15 4.305L3 21l4.606-1.206c1.268.686 2.688 1.049 4.14 1.049h.004c4.735 0 8.591-3.86 8.594-8.595 0-2.296-.893-4.455-2.516-6.079-1.624-1.624-3.784-2.518-6.082-2.518z"/>
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default FloatingHelpAndChat;

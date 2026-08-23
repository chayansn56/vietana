import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../../utils/whatsapp';
import { trackEvent } from '../../utils/analytics';

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage?: string;
}

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({ isOpen, onClose, customMessage }) => {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleConnect = () => {
    let number = WHATSAPP_NUMBERS.VIETNAM;
    // Strip leading zero and prepend "84" if not present
    const formattedNum = number.startsWith('0') ? `84${number.slice(1)}` : number;
    number = formattedNum;
    const message = 'Hi VIETANA, I found you through the VIETANA website and would like help planning my Vietnam trip.';
    const eventName = 'whatsapp_click';

    // Track GA4 event immediately before opening WhatsApp
    trackEvent(eventName, {
      whatsapp_team: 'vietnam'
    });

    const link = buildWhatsAppLink(number, message);
    window.open(link, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200000] flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0E1B19]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-white dark:bg-[#121214] text-[#12302B] dark:text-white rounded-[24px] shadow-2xl border border-[#E6D9BF]/30 dark:border-white/10 p-6 md:p-8 w-full max-w-sm z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition border-none cursor-pointer text-gray-500 dark:text-gray-400"
              aria-label="Close"
            >
              <Icon name="X" size={14} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.724-1.458L0 24zm6.07-4.223c1.552.922 3.125 1.411 4.793 1.412 5.51 0 9.991-4.488 9.994-10.003.002-2.671-1.03-5.182-2.906-7.06C16.03 2.25 13.523 1.218 10.85 1.22 5.337 1.22.856 5.707.853 11.22c-.001 1.77.473 3.498 1.373 5.03l-.1.365-.956 3.494 3.575-.937.382-.228zM17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.061-.3-.15-1.265-.462-2.406-1.479-.889-.788-1.487-1.761-1.663-2.061-.175-.3-.019-.461.132-.611.134-.133.3-.35.45-.524.148-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.148-.673-1.611-.922-2.206-.24-.579-.481-.501-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.767-.722 2.016-1.422.249-.701.249-1.301.173-1.422-.074-.122-.274-.196-.575-.346z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-[#12302B] dark:text-white">
                Chat with VIETANA on WhatsApp
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-light">
                Connect directly with our support team to plan your trip.
              </p>
            </div>

            {/* Selection Options */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#FAF8F3] dark:bg-white/5 border-2 border-[#E6D9BF] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-xs relative overflow-hidden group">
                <div className="flex flex-col items-center w-full">
                  <h4 className="font-serif text-sm font-extrabold text-[#12302B] dark:text-white uppercase tracking-wider mb-4">
                    Choose an Office
                  </h4>
                  
                  <div className="flex flex-col w-full gap-3">
                    <button
                      onClick={() => {
                        const message = customMessage || 'Hi VIETANA India, I found you through the VIETANA website and would like help planning my Vietnam trip.';
                        trackEvent('whatsapp_click', { whatsapp_team: 'india' });
                        const link = buildWhatsAppLink("919990977002", message);
                        window.open(link, '_blank', 'noopener,noreferrer');
                        onClose();
                      }}
                      className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Icon name="MessageCircle" size={14} /> 🇮🇳 Connect India (+91)
                    </button>
                    
                    <button
                      onClick={() => {
                        const message = customMessage || 'Hi VIETANA Vietnam, I found you through the VIETANA website and would like help planning my Vietnam trip.';
                        trackEvent('whatsapp_click', { whatsapp_team: 'vietnam' });
                        const link = buildWhatsAppLink("84902434006", message);
                        window.open(link, '_blank', 'noopener,noreferrer');
                        onClose();
                      }}
                      className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition duration-200 border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Icon name="MessageCircle" size={14} /> 🇻🇳 Connect Vietnam (+84)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppPopup;


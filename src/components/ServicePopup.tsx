import React, { useEffect, useState } from 'react';
import { Heading } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';
import { WHATSAPP_DEFAULT } from '../utils/whatsapp';

export interface ServiceDetail {
  id: string;
  icon: IconName;
  shortTitle: string;
  shortDesc: string;
  popupTitle: string;
  content: React.ReactNode;
  image: string;
}

interface ServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

const ServicePopup: React.FC<ServicePopupProps> = ({ isOpen, onClose, service }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isVisible) return;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleCopyChecklist = () => {
    if (!service) return;
    // Extract plain text helper
    let text = `${service.popupTitle}\n\n`;
    if (service.id === 'visa') {
      text += `Vietnam E-Visa Checklist:\n- Passport copy (valid for at least 6 months)\n- Passport-style photograph\n\nUrgent Visa Support:\nNeed it urgently? Flight already booked? Traveling within 24 hours? Get in touch with Vietana!`;
    } else if (service.id === 'airport') {
      text += `Airport pickup & transfers arranged by Vietana based on group size, luggage, and luxury comfort requirements.`;
    } else {
      text += service.shortDesc;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!service) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Blurred Backdrop */}
      <div 
        className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Content - Elegant Box */}
      <div 
        className={`relative w-[95vw] max-w-5xl h-[85dvh] md:h-[70vh] max-h-[800px] md:max-h-[600px] overflow-y-auto md:overflow-hidden rounded-2xl bg-surface-ivory dark:bg-surface-dark shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-white/80 dark:bg-surface-dark/80 hover:bg-white dark:hover:bg-surface-dark text-text-charcoal dark:text-white shadow-sm transition-colors backdrop-blur-md border border-black/5 dark:border-white/10"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Left Side: Cinematic Imagery */}
        <div className="relative w-full h-1/3 md:h-full md:w-5/12 overflow-hidden shrink-0 bg-black">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out opacity-90"
            style={{ 
              backgroundImage: `url(${service.image})`,
              transform: `scale(1.15) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
            }}
          />
        </div>

        {/* Right Side: Content Container */}
        <div className="relative w-full h-2/3 md:h-full md:w-7/12 flex flex-col bg-surface-ivory dark:bg-surface-dark overflow-hidden">
          
          {/* Tightly Packed Content Area */}
          <div className="flex-1 flex flex-col justify-start p-5 md:p-8 lg:p-10 overflow-y-auto">
            <div className="mb-4">
              <div className="w-10 h-[2px] bg-brand-green mb-4"></div>
              <div className="flex items-center gap-2 mb-2 text-brand-green dark:text-brand-sage">
                <Icon name={service.icon} size={16} />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">
                  {service.shortTitle}
                </span>
              </div>
              <Heading as="h2" size="2xl" font="serif" className="text-text-charcoal dark:text-white mb-3 leading-tight">
                {service.popupTitle}
              </Heading>
            </div>

            <div className="text-text-charcoal dark:text-white/80 space-y-3 text-sm md:text-base font-light leading-snug">
              {service.content}
            </div>

            {/* Copy Checklist Action */}
            <div className="mt-4">
              <button 
                onClick={handleCopyChecklist}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-green dark:text-brand-gold-light hover:text-brand-green-light dark:hover:text-brand-gold underline decoration-dotted transition-colors"
              >
                <Icon name={copied ? 'Check' : 'Copy'} size={12} />
                {copied ? 'Checklist Copied!' : 'Copy Checklist to Clipboard'}
              </button>
            </div>
          </div>

          {/* Tight Footer for Contact Actions */}
          <div className="shrink-0 p-5 md:p-6 lg:px-10 border-t border-black/5 dark:border-white/10 bg-surface-ivory/80 dark:bg-surface-dark/80 backdrop-blur-md">
            <p className="text-xs text-text-subtle dark:text-white/50 mb-4 uppercase tracking-widest font-semibold">Contact Concierge</p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-medium text-text-charcoal bg-white shadow-sm"
              >
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={() => window.open('https://zalo.me/84902434006', '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 hover:border-[#0068FF] hover:bg-[#0068FF] hover:text-white transition-all text-sm font-medium text-text-charcoal bg-white shadow-sm"
              >
                <span className="font-bold tracking-tighter">Zalo</span>
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:booking@vietana.com'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 hover:border-brand-green hover:bg-brand-green hover:text-white transition-all text-sm font-medium text-text-charcoal bg-white shadow-sm"
              >
                <Icon name="Mail" size={16} />
                <span>Email</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServicePopup;

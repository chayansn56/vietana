import React, { useEffect, useState } from 'react';
import { Heading } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';
import Button from './ui/Button';

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Blurred Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Content - Contained to fit one screen */}
      <div 
        className={`relative w-[95vw] max-w-5xl h-[85dvh] md:h-[70vh] max-h-[800px] md:max-h-[600px] overflow-hidden rounded-2xl bg-surface-ivory shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-white/50 hover:bg-white text-charcoal shadow-sm transition-colors backdrop-blur-md border border-black/5"
        >
          <Icon name="X" size="sm" />
        </button>

        {/* Left Side: Cinematic Imagery */}
        <div className="relative w-full h-2/5 md:h-full md:w-5/12 overflow-hidden shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] animate-slow-parallax"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        </div>

        {/* Right Side: Content */}
        <div className="relative w-full h-3/5 md:h-full md:w-7/12 p-6 md:p-10 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-surface-ivory">
          
          <div className="mb-6 md:mb-10">
            <div className="w-12 h-1 bg-brand-green mb-6"></div>
            <div className="flex items-center gap-3 mb-3">
              <Icon name={service.icon} size="sm" className="text-brand-green" />
              <span className="text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase">
                {service.shortTitle}
              </span>
            </div>
            <Heading as="h2" size="3xl" font="serif" className="text-text-charcoal mb-4 leading-tight">
              {service.popupTitle}
            </Heading>
          </div>

          <div className="text-text-muted space-y-4 md:space-y-6 text-base md:text-lg font-light leading-relaxed flex-1">
            {service.content}
          </div>

          <div className="mt-8 pt-6 md:mt-12 md:pt-8 border-t border-black/10">
            <p className="text-sm text-text-subtle mb-4 uppercase tracking-wider font-medium">Contact Your Concierge</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent px-4 py-2 flex items-center gap-2 text-sm" onClick={() => window.open('https://wa.me/message/RWHIX4D7ZZYCP1', '_blank')}>
                <Icon name="MessageCircle" size="sm" />
                WhatsApp
              </Button>
              <Button variant="outline" className="border-[#0068FF] text-[#0068FF] hover:bg-[#0068FF] hover:text-white px-4 py-2 flex items-center gap-2 text-sm" onClick={() => window.open('https://zalo.me/84834880993', '_blank')}>
                <span className="font-bold tracking-tighter">Zalo</span>
              </Button>
              <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-4 py-2 flex items-center gap-2 text-sm" onClick={() => window.location.href = 'mailto:booking@vietana.com'}>
                <Icon name="Mail" size="sm" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;

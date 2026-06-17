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

      {/* Modal Content - Fullscreen or near fullscreen */}
      <div 
        className={`relative w-full h-full md:w-[95vw] md:h-[95vh] lg:max-w-7xl overflow-hidden md:rounded-2xl bg-surface-ivory shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/50 hover:bg-white text-charcoal shadow-sm transition-colors backdrop-blur-md border border-black/5"
        >
          <Icon name="X" size="sm" />
        </button>

        {/* Left Side: Cinematic Imagery */}
        <div className="relative w-full h-1/3 md:h-full md:w-1/2 overflow-hidden shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] animate-slow-parallax"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        </div>

        {/* Right Side: Content */}
        <div className="relative w-full h-2/3 md:h-full md:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar flex flex-col bg-surface-ivory">
          
          <div className="mb-8 md:mb-12">
            <div className="w-12 h-1 bg-brand-green mb-8"></div>
            <div className="flex items-center gap-3 mb-4">
              <Icon name={service.icon} size="sm" className="text-brand-green" />
              <span className="text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase">
                {service.shortTitle}
              </span>
            </div>
            <Heading as="h2" size="4xl" font="serif" className="text-text-charcoal mb-4 leading-tight">
              {service.popupTitle}
            </Heading>
          </div>

          <div className="text-text-muted space-y-6 text-lg font-light leading-relaxed flex-1">
            {service.content}
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-dark text-white border-transparent" onClick={() => window.open('https://wa.me/message/RWHIX4D7ZZYCP1', '_blank')}>
              Speak with your concierge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;

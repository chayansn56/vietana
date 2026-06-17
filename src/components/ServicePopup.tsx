import React, { useEffect, useState } from 'react';
import { Heading } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';

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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
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
        className={`relative w-full h-full max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl bg-surface-ivory shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-white/80 hover:bg-white text-text-charcoal shadow-sm transition-colors backdrop-blur-md border border-black/5"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Left Side: Cinematic Imagery */}
        <div className="relative w-full h-1/3 md:h-full md:w-5/12 overflow-hidden shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] animate-slow-parallax"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        </div>

        {/* Right Side: Content Container */}
        <div className="relative w-full h-2/3 md:h-full md:w-7/12 flex flex-col bg-surface-ivory">
          
          {/* Tightly Packed Content Area */}
          <div className="flex-1 flex flex-col justify-center p-5 md:p-8 lg:p-10">
            <div className="mb-4">
              <div className="w-10 h-[2px] bg-brand-green mb-4"></div>
              <div className="flex items-center gap-2 mb-2 text-brand-green">
                <Icon name={service.icon} size={16} />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-brand-sage uppercase">
                  {service.shortTitle}
                </span>
              </div>
              <Heading as="h2" size="2xl" font="serif" className="text-text-charcoal mb-3 leading-tight">
                {service.popupTitle}
              </Heading>
            </div>

            <div className="text-text-muted space-y-3 text-sm md:text-base font-light leading-snug">
              {service.content}
            </div>
          </div>

          {/* Tight Footer for Contact Actions */}
          <div className="shrink-0 p-5 md:p-6 lg:px-10 border-t border-black/5 bg-surface-ivory/80 backdrop-blur-md">
            <p className="text-xs text-text-subtle mb-4 uppercase tracking-widest font-semibold">Contact Concierge</p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => window.open('https://wa.me/message/RWHIX4D7ZZYCP1', '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-medium text-text-charcoal bg-white shadow-sm"
              >
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={() => window.open('https://zalo.me/84834880993', '_blank')}
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

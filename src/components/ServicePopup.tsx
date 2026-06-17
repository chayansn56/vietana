import React, { useEffect, useState } from 'react';
import { Heading, Text } from './ui/Typography';
import Icon, { IconName } from './ui/Icon';
import Modal from './ui/Modal';
import Button from './ui/Button';

export interface ServiceDetail {
  id: string;
  icon: IconName;
  shortTitle: string;
  shortDesc: string;
  popupTitle: string;
  content: React.ReactNode;
  image: string;
  glowColor: string;
  gradient: string;
  animationClass: string;
  banner?: React.ReactNode;
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
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!service) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Blurred Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl transition-all duration-500 flex flex-col md:flex-row ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
        }`}
        style={{ boxShadow: `0 20px 80px ${service.glowColor}40` }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors backdrop-blur-md"
        >
          <Icon name="X" size="sm" />
        </button>

        {/* Left Side: Imagery & Animation */}
        <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 z-10 mix-blend-overlay`}></div>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 animate-parallax-bg"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10"></div>
          
          {/* Animated Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className={`p-6 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_30px_${service.glowColor}80] ${service.animationClass}`}>
              <Icon name={service.icon} size="xl" className="text-white" />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="relative w-full md:w-7/12 p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Icon name={service.icon} size="sm" className="text-white/80" />
              </div>
              <span className="text-sm font-medium tracking-wider text-white/60 uppercase">
                {service.shortTitle}
              </span>
            </div>
            <Heading as="h2" size="2xl" font="serif" className="text-white mb-4 leading-tight">
              {service.popupTitle}
            </Heading>
          </div>

          <div className="text-white/70 space-y-4 font-light leading-relaxed flex-1">
            {service.content}
          </div>

          {service.banner && (
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icon name="AlertCircle" size="xl" />
              </div>
              {service.banner}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="w-full sm:w-auto" onClick={() => window.open('https://wa.me/message/RWHIX4D7ZZYCP1', '_blank')}>
              Talk to us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;

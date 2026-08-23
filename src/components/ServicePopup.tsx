import React, { useEffect, useState } from 'react';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import { useCurrency } from '../contexts/CurrencyContext';

export interface ServiceDetail {
  id: string;
  icon: any;
  shortTitle: string;
  shortDesc: string;
  popupTitle: string;
  image: string;
  content: React.ReactNode;
  priceInr: number;
  priceTagline?: string;
  highlight?: boolean;
}

interface ServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

export default function ServicePopup({ isOpen, onClose, service }: ServicePopupProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      // Trigger the unfold animation slightly after rendering
      setTimeout(() => setIsUnfolded(true), 50);
    } else {
      setIsUnfolded(false);
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsRendered(false), 500); // Wait for fold animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered || !service) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none" style={{ perspective: '1200px' }}>
      {/* Dark Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-500 ease-out
          ${isUnfolded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* The Paper Container */}
      <div 
        className={`relative w-full max-w-[600px] max-h-[90vh] flex flex-col pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isUnfolded ? 'opacity-100 scale-100 rotate-x-0 rotate-y-0 translate-y-0' : 'opacity-0 scale-50 rotate-x-[40deg] -rotate-y-[20deg] translate-y-20'}`}
        style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
      >
        {/* Paper Background - White Notebook Style */}
        <div className="absolute inset-0 bg-white dark:bg-[#1A1A1A] rounded-[2px] shadow-2xl overflow-hidden">
          {/* Notebook horizontal blue lines */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none dark:opacity-10" 
            style={{ 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #3b82f6 27px, #3b82f6 28px)', 
              backgroundPositionY: '40px' 
            }} 
          />
          {/* Notebook vertical red line */}
          <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-[1px] bg-red-500/30 dark:bg-red-500/20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[34px] sm:left-[50px] w-[1px] bg-red-500/10 dark:bg-red-500/5 pointer-events-none" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#1E4D45] dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors border-none cursor-pointer"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Scrollable Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 scrollbar-hide flex flex-col items-center text-center">
          
          <div className={`transition-all duration-700 delay-200 ${isUnfolded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-brand-gold mx-auto mb-3 relative">
              <Icon name={service.icon} size={20} />
              {service.highlight && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </div>

            {service.highlight && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 rounded-full text-[9px] font-bold tracking-widest uppercase mb-3">
                <Icon name="Zap" size={10} />
                Urgent 24H
              </div>
            )}

            <Heading as="h2" size="xl" font="serif" className="text-[#12302B] dark:text-white mb-3 leading-tight">
              {service.popupTitle}
            </Heading>
            
            <div className="w-8 h-px bg-brand-gold mx-auto mb-4"></div>

            <div className="prose prose-[#12302B] dark:prose-invert prose-p:leading-snug prose-p:text-xs prose-p:m-1 prose-li:text-xs text-left mx-auto max-w-sm">
              {service.content}
            </div>
          </div>

          <div className={`mt-6 w-full max-w-sm mx-auto pt-4 border-t border-black/10 dark:border-white/10 transition-all duration-700 delay-400 ${isUnfolded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Text size="xs" variant="none" className="text-black/50 dark:text-white/50 uppercase tracking-widest font-bold mb-1 text-[9px]">
              Estimated Pricing
            </Text>
            
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-serif text-[#1E4D45] dark:text-brand-gold">
                {formatPrice(service.priceInr)}
              </div>
              {service.priceTagline && (
                <span className="text-[10px] font-bold text-[#1E4D45]/70 dark:text-white/70 uppercase tracking-widest">
                  for {service.priceTagline}
                </span>
              )}
            </div>
            
            {service.priceInr !== -1 && service.priceInr !== 0 && (
              <Text size="xs" variant="none" className="text-[#12302B]/40 dark:text-white/40 mt-2 block italic leading-tight px-2 text-[9px]">
                *T&C apply. Price is indicative.
              </Text>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

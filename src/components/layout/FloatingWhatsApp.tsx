import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { Text } from '../ui/Typography';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../../utils/whatsapp';

const FloatingWhatsApp: React.FC = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.default, "Hi Vietana! I'm interested in planning a journey to Vietnam."), '_blank');
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-[310] cursor-pointer flex items-center transition-transform duration-500 ease-elastic hover:-translate-y-1 group"
      onClick={handleWhatsApp}
    >
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-full px-5 py-3 pr-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-green">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Concierge" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <Text size="xxs" className="uppercase tracking-widest text-black/50 font-bold mb-[2px]">
            Local Concierge
          </Text>
          <Text size="sm" className="font-semibold text-black leading-none">
            Chat with us
          </Text>
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;

import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';

interface FloatingOrbProps {
  onClick: () => void;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed bottom-8 right-8 z-[310] w-17 h-17 cursor-pointer flex items-center justify-center transition-transform duration-500 ease-elastic hover:scale-110 hover:rotate-5 md:bottom-8 md:right-8 sm:bottom-6 sm:right-6 group"
      onClick={onClick}
    >
      <div className="absolute top-[-30px] text-[0.6rem] font-bold text-brand-gold tracking-[0.15em] uppercase whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {t.nav.aiPlanner}
      </div>
      
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--color-brand-gold),var(--color-brand-green))] shadow-[0_0_30px_rgba(201,168,76,0.4),inset_0_0_15px_rgba(255,255,255,0.3)]" />
      
      <div className="absolute inset-[-10px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)] animate-orb-glow" />
      
      <div className="absolute text-xl drop-shadow-[0_0_5px_var(--color-brand-gold)] animate-orb-spin">
        ✨
      </div>
    </div>
  );
};

export default FloatingOrb;

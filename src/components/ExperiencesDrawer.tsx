import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';
import { EXPERIENCES } from '../data/experiences';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

interface ExperiencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
}

const ExperiencesDrawer: React.FC<ExperiencesDrawerProps> = ({ isOpen, onClose, onOpenPlanner }) => {
  const { t } = useTranslation();
  const [selectedExp, setSelectedExp] = useState<typeof EXPERIENCES[0] | null>(null);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-surface-cream shadow-2xl z-[2001] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-black/5 bg-surface-cream/80 backdrop-blur-md z-10 sticky top-0">
              <div>
                <Text className="text-editorial-meta text-brand-gold mb-1 editorial-line-accent inline-block">
                  {t.exp.title}
                </Text>
                <Heading as="h2" className="text-3xl font-serif text-brand-green-extra-dark tracking-tight leading-none mt-2">
                  Hidden Secrets
                </Heading>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors"
              >
                <Icon name="X" size={20} className="text-brand-green-extra-dark" />
              </button>
            </div>

            {/* List of Experiences */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold/30 scrollbar-track-transparent p-8 pb-32">
              <div className="flex flex-col gap-12">
                {EXPERIENCES.map((exp, idx) => (
                  <div 
                    key={exp.id} 
                    className="group cursor-pointer flex flex-col gap-4 relative"
                    onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                  >
                    <div className="flex gap-6 items-start">
                      <div className="w-10 pt-2 shrink-0">
                        <Text className="text-editorial-meta text-black/30 group-hover:text-brand-gold transition-colors duration-500">
                          No. {String(idx + 1).padStart(2, '0')}
                        </Text>
                      </div>
                      <div className="flex-1">
                        <Heading as="h3" className="text-2xl font-serif text-brand-green-extra-dark mb-2 group-hover:text-brand-gold-muted transition-colors duration-500">
                          {exp.t}
                        </Heading>
                        <Text className="text-sm font-light text-text-muted leading-relaxed mb-4">
                          {exp.d}
                        </Text>
                        <div className="flex items-center gap-4">
                          <button 
                            className="editorial-border px-6 py-2 text-[0.6rem] tracking-[0.2em] uppercase text-brand-green-extra-dark hover:bg-brand-green-extra-dark hover:text-white transition-colors duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              onOpenPlanner(exp.t);
                            }}
                          >
                            Add to Itinerary
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Expandable Image */}
                    <div 
                      className={`w-full overflow-hidden transition-all duration-700 ease-in-out origin-top ${selectedExp?.id === exp.id ? 'h-[300px] mt-2 opacity-100' : 'h-0 opacity-0'}`}
                    >
                      <img src={exp.img} alt={exp.t} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    
                    {/* Separator line */}
                    {idx < EXPERIENCES.length - 1 && (
                       <div className="w-full h-px bg-black/5 mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll indicator for drawer */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface-cream to-transparent pointer-events-none z-10" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExperiencesDrawer;

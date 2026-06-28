import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

const VietnamMap = React.lazy(() => import('./map/VietnamVectorMap'));

interface MapCurtainProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
  selectedCities?: string[];
  onAddCity?: (city: string) => void;
  selectedSights?: string[];
  onAddSight?: (city: string, sight: string) => void;
}

const MapCurtain: React.FC<MapCurtainProps> = ({ isOpen, onClose, selectedCities = [], onAddCity, selectedSights = [], onAddSight }) => {
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
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[3000] bg-[#FAF8F3] dark:bg-[#111615] flex flex-col"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 lg:px-12 bg-[#FAF8F3]/80 dark:bg-[#111615]/80 backdrop-blur-xl absolute top-0 left-0 right-0 z-[3010] border-b border-[#111111]/5 dark:border-white/10 shadow-sm">
            <div>
              <Text className="text-[10px] tracking-widest uppercase text-[#1E4D45] dark:text-brand-gold font-bold mb-1">
                Cartography
              </Text>
              <Heading as="h2" className="text-2xl font-serif text-[#111111] dark:text-white tracking-wider">
                Explore Vietnam
              </Heading>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#1A2120] hover:bg-[#F2EFE8] dark:hover:bg-[#1A2120]/80 transition-colors border border-[#111111]/10 dark:border-white/10 shadow-sm"
            >
              <Text className="text-xs tracking-[0.2em] uppercase text-[#111111]/70 dark:text-white/70 group-hover:text-[#111111] dark:group-hover:text-white font-bold hidden sm:block">
                Close Map
              </Text>
              <Icon name="X" size={18} className="text-[#111111] dark:text-white" />
            </button>
          </div>

          {/* Map Area */}
          <div className="flex-1 w-full h-full relative pt-[88px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-[#FAF8F3] dark:bg-[#111615]">
                <Text font="serif" className="text-[#1E4D45] dark:text-brand-gold text-xl animate-pulse tracking-wider">
                  Drawing map...
                </Text>
              </div>
            }>
              <VietnamMap 
                selectedCities={selectedCities} 
                onAddCity={onAddCity} 
                selectedSights={selectedSights} 
                onAddSight={onAddSight} 
              />
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapCurtain;

import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import Card from './ui/Card';
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
          className="fixed inset-0 z-[3000] bg-surface-cream dark:bg-surface-dark flex flex-col"
        >
          <Card variant="glass-panel" className="flex items-center justify-between p-4 sm:p-6 lg:px-12 absolute top-0 left-0 right-0 z-[3010] !rounded-none border-t-0 border-x-0 !shadow-sm">
            <div>
              <Text className="text-mini tracking-widest uppercase text-brand-green dark:text-brand-gold font-bold mb-1">
                Cartography
              </Text>
              <Heading as="h2" className="text-2xl font-serif text-text-dark dark:text-white tracking-wider">
                Explore Vietnam
              </Heading>
            </div>
            <Button
              variant="ghost" size="sm"
              onClick={onClose}
              className="rounded-full shadow-sm group border border-text-dark/5 dark:border-white/10"
            >
              <Text className="text-xs tracking-[0.2em] uppercase font-bold hidden sm:block m-0">
                Close Map
              </Text>
              <Icon name="X" size={18} />
            </Button>
          </Card>

          {/* Map Area */}
          <div className="flex-1 w-full h-full relative pt-[88px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-surface-cream dark:bg-surface-dark">
                <Text font="serif" className="text-brand-green dark:text-brand-gold text-xl animate-pulse tracking-wider">
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

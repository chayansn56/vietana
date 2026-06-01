import React, { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAP_DESTINATIONS } from '../data/destinations';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

const LeafletMap = React.lazy(() => import('./map/LeafletMap'));

interface MapCurtainProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
}

const MapCurtain: React.FC<MapCurtainProps> = ({ isOpen, onClose, onOpenPlanner }) => {
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([MAP_DESTINATIONS[idx].lat, MAP_DESTINATIONS[idx].lng]);
  };

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
          className="fixed inset-0 z-[3000] bg-brand-green-extra-dark flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 lg:px-12 bg-black/20 backdrop-blur-md absolute top-0 left-0 right-0 z-[3010] border-b border-white/10">
            <div>
              <Text className="text-editorial-meta text-brand-gold mb-1">Cartography</Text>
              <Heading as="h2" className="text-2xl font-serif text-surface-cream tracking-wider">
                Explore Vietnam
              </Heading>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 px-4 py-2 rounded-full glass-dark hover:bg-white/10 transition-colors border border-white/20"
            >
              <Text className="text-xs tracking-[0.2em] uppercase text-white/70 group-hover:text-white hidden sm:block">Close Map</Text>
              <Icon name="X" size={18} className="text-white" />
            </button>
          </div>

          {/* Map Area */}
          <div className="flex-1 w-full h-full relative">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-gold font-serif text-xl animate-pulse bg-brand-green-extra-dark">Charting course...</div>}>
              <LeafletMap 
                  destinations={MAP_DESTINATIONS}
                  selectedCityIdx={selectedCityIdx}
                  mapCenter={mapCenter}
                  onCityClick={handleCityClick}
              />
            </Suspense>

            <AnimatePresence>
              {selectedCityIdx !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-[450px] bg-surface-cream/95 backdrop-blur-xl p-8 shadow-2xl z-[3050] rounded-2xl border border-black/5"
                >
                  <button 
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-black/50 hover:text-black"
                    onClick={() => setSelectedCityIdx(null)}
                  >
                    <Icon name="X" size={16} />
                  </button>
                  
                  <Text className="text-editorial-meta text-brand-gold mb-4 editorial-line-accent inline-block">
                    Destination
                  </Text>
                  
                  <Heading as="h3" className="text-3xl font-serif text-brand-green-extra-dark mb-4 mt-2">
                    {MAP_DESTINATIONS[selectedCityIdx].name}
                  </Heading>
                  
                  <Text className="text-[0.6rem] tracking-[0.2em] uppercase text-black/50 mb-6">
                    Optimal Season: <span className="text-brand-green-extra-dark font-bold">{MAP_DESTINATIONS[selectedCityIdx].time}</span>
                  </Text>
                  
                  <Text className="text-sm font-light text-text-muted leading-relaxed mb-8">
                    {MAP_DESTINATIONS[selectedCityIdx].desc}
                  </Text>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <button 
                      className="w-full sm:w-auto editorial-border px-8 py-3 text-[0.65rem] tracking-[0.2em] uppercase text-brand-green-extra-dark hover:bg-brand-green-extra-dark hover:text-white transition-colors duration-500"
                      onClick={() => {
                        onClose();
                        onOpenPlanner(MAP_DESTINATIONS[selectedCityIdx].name);
                      }}
                    >
                      Plan Visit
                    </button>
                    <button 
                      className="w-full sm:w-auto text-[0.65rem] tracking-[0.2em] uppercase text-black/40 hover:text-brand-gold transition-colors duration-300 border-b border-transparent hover:border-brand-gold pb-1 text-center"
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(MAP_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`, '_blank')}
                    >
                      Google Maps
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapCurtain;

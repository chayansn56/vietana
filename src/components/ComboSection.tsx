import React, { useState, useMemo, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';
import { MAP_DESTINATIONS } from '../data/destinations';
import { EXPERIENCES } from '../data/experiences';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Section from './ui/layout/Section';

const LeafletMap = React.lazy(() => import('./map/LeafletMap'));

interface ComboSectionProps {
    onOpenPlanner: (destination?: string) => void;
}

const ComboSection: React.FC<ComboSectionProps> = ({ onOpenPlanner }) => {
  const { t } = useTranslation();
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([MAP_DESTINATIONS[idx].lat, MAP_DESTINATIONS[idx].lng]);
  };

  return (
    <Section id="combo-section" variant="none" spacing="none" className="w-full bg-surface-cream items-stretch overflow-hidden">
      
      {/* MAP (Clean Integration) */}
      <div id="explore-vietnam" className="w-full relative bg-brand-green-extra-dark flex flex-col items-center justify-center p-8 lg:p-0 min-h-[600px] lg:h-[800px] overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-noise opacity-50 z-0 pointer-events-none" />
        
        <div className="absolute top-12 right-12 lg:right-24 z-20 text-right">
           <Text className="text-editorial-meta text-white/50 mb-2">Cartography</Text>
           <Heading className="text-surface-cream text-3xl font-serif italic">Vietnam</Heading>
        </div>

        <div className="relative w-full max-w-[1200px] h-[70vh] lg:h-[90%] flex items-center justify-center z-10 px-4 lg:px-12 py-24">
          <div className="w-full h-full rounded-2xl overflow-hidden editorial-border-white shadow-2xl relative border border-white/10">
            <Suspense fallback={<div className="w-full h-full bg-brand-green-dark animate-pulse flex items-center justify-center text-brand-gold font-serif text-xl">Charting course...</div>}>
                <LeafletMap 
                    destinations={MAP_DESTINATIONS}
                    selectedCityIdx={selectedCityIdx}
                    mapCenter={mapCenter}
                    onCityClick={handleCityClick}
                />
            </Suspense>
          </div>

          <AnimatePresence>
            {selectedCityIdx !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-12 lg:bottom-24 left-1/2 -translate-x-1/2 w-[90%] lg:w-[450px] glass p-8 shadow-heavy z-[100] rounded-2xl"
              >
                <div className="absolute top-6 right-6 cursor-pointer text-xl text-black/30 hover:text-black transition-colors" onClick={() => setSelectedCityIdx(null)}>×</div>
                
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
                    onClick={() => onOpenPlanner(MAP_DESTINATIONS[selectedCityIdx].name)}
                  >
                    Plan Visit
                  </button>
                  <button 
                    className="w-full sm:w-auto text-[0.65rem] tracking-[0.2em] uppercase text-black/40 hover:text-brand-gold transition-colors duration-300 border-b border-transparent hover:border-brand-gold pb-1 text-center"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(MAP_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`, '_blank')}
                  >
                    View on Map
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default ComboSection;

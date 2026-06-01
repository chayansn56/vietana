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
  const [selectedExp, setSelectedExp] = useState<typeof EXPERIENCES[0] | null>(null);
  
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([MAP_DESTINATIONS[idx].lat, MAP_DESTINATIONS[idx].lng]);
  };

  return (
    <Section id="combo-section" variant="none" spacing="none" className="flex flex-col lg:flex-row w-full lg:h-screen lg:max-h-[1080px] min-h-[900px] lg:min-h-0 bg-surface-cream items-stretch overflow-hidden">
      
      {/* LEFT: EXPERIENCES (Editorial Showcase) */}
      <div id="experiences" className="flex-1 lg:flex-[0.5] relative py-20 px-12 lg:px-20 border-r border-black/5 flex flex-col z-10 bg-surface-cream">
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full  hidden animate-blob-float pointer-events-none z-0" />
        <div className="mb-10 reveal">
          <Text className="text-editorial-meta text-brand-gold mb-4 editorial-line-accent inline-block">
            {t.exp.title}
          </Text>
          <Heading as="h2" className="text-5xl lg:text-6xl font-serif text-brand-green-extra-dark mt-2 tracking-tight leading-none">
            Hidden<br/>Secrets
          </Heading>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold/30 scrollbar-track-transparent pr-4 pb-24 relative">
          <div className="flex flex-col gap-10">
            {EXPERIENCES.map((exp, idx) => (
              <div 
                key={exp.id} 
                className="group cursor-pointer flex gap-8 items-start reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedExp(exp)}
              >
                <div className="w-12 pt-2">
                  <Text className="text-editorial-meta text-black/30 group-hover:text-brand-gold transition-colors duration-500">
                    No. {String(idx + 1).padStart(2, '0')}
                  </Text>
                </div>
                <div className="flex-1">
                  <Heading as="h3" className="text-2xl font-serif text-brand-green-extra-dark mb-1 group-hover:text-brand-gold-muted transition-colors duration-500">
                    {exp.t}
                  </Heading>
                  <div className="max-h-0 overflow-hidden group-hover:max-h-48 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:mt-3">
                    <Text className="text-sm font-light text-text-muted leading-relaxed max-w-sm mb-4">
                      {exp.d}
                    </Text>
                    <button className="text-editorial-meta border-b border-brand-gold pb-1 text-brand-green-extra-dark hover:text-brand-gold transition-colors duration-300">
                      Discover
                    </button>
                  </div>
                </div>
                <div className="w-24 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out shrink-0">
                  <img src={exp.img} alt={exp.t} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Fade */}
        <div className="hidden absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-surface-cream via-surface-cream/90 to-transparent pointer-events-none z-20 flex flex-col items-center justify-end pb-10">
           <motion.div 
             animate={{ height: ["0px", "40px", "0px"], y: [0, 20, 40], opacity: [0, 1, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="w-[1px] bg-brand-gold mb-2"
             style={{ transformOrigin: "top" }}
           />
           <div className="bg-surface-cream px-6 py-3 rounded-full border editorial-border shadow-soft flex items-center gap-3 animate-pulse">
             <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
             <Text className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-brand-green-extra-dark">
               Scroll List
             </Text>
           </div>
        </div>
      </div>

      {/* RIGHT: MAP (Clean Integration) */}
      <div id="explore-vietnam" className="flex-1 lg:flex-[0.5] relative bg-brand-green-extra-dark flex flex-col items-center justify-center p-8 lg:p-0 min-h-[600px] overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-noise opacity-50 z-0 pointer-events-none" />
        
        <div className="absolute top-12 right-12 z-20 text-right">
           <Text className="text-editorial-meta text-white/50 mb-2">Cartography</Text>
           <Heading className="text-surface-cream text-2xl font-serif italic">Vietnam</Heading>
        </div>

        <div className="relative w-full max-w-[800px] h-[70vh] lg:h-full flex items-center justify-center z-10 px-4 lg:px-12 py-24">
          <div className="w-full h-full rounded-none overflow-hidden editorial-border-white shadow-2xl relative">
            <Suspense fallback={<div className="w-full h-full bg-brand-green-dark animate-pulse flex items-center justify-center text-brand-gold font-serif">Charting course...</div>}>
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
                className="absolute bottom-12 lg:bottom-24 left-1/2 -translate-x-1/2 w-[90%] lg:w-[400px] glass p-8 shadow-heavy z-[100] rounded-2xl"
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
                
                <div className="flex items-center gap-6">
                  <button 
                    className="editorial-border px-8 py-3 text-[0.65rem] tracking-[0.2em] uppercase text-brand-green-extra-dark hover:bg-brand-green-extra-dark hover:text-white transition-colors duration-500"
                    onClick={() => onOpenPlanner(MAP_DESTINATIONS[selectedCityIdx].name)}
                  >
                    Plan Visit
                  </button>
                  <button 
                    className="text-[0.65rem] tracking-[0.2em] uppercase text-black/40 hover:text-brand-gold transition-colors duration-300 border-b border-transparent hover:border-brand-gold pb-1"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(MAP_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`, '_blank')}
                  >
                    Map
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal 
        isOpen={!!selectedExp} 
        onClose={() => setSelectedExp(null)}
        maxWidth="max-w-[700px]"
        className="glass p-0 overflow-hidden rounded-2xl shadow-heavy"
      >
        {selectedExp && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
              <img src={selectedExp.img} alt={selectedExp.t} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-noise">
              <Text className="text-editorial-meta text-brand-gold mb-6 editorial-line-accent inline-block">
                Experience
              </Text>
              <Heading as="h3" className="text-4xl font-serif text-brand-green-extra-dark mb-6 leading-tight">
                {selectedExp.t}
              </Heading>
              <Text className="text-sm font-light text-text-muted leading-relaxed mb-12">
                {selectedExp.d}
              </Text>
              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  className="editorial-border py-4 text-xs tracking-[0.2em] uppercase text-brand-green-extra-dark hover:bg-brand-green-extra-dark hover:text-white transition-colors duration-500 w-full"
                  onClick={() => { setSelectedExp(null); onOpenPlanner(selectedExp.t); }}
                >
                  Add to Itinerary
                </button>
                <button 
                  className="py-4 text-xs tracking-[0.2em] uppercase text-black/50 hover:text-brand-gold transition-colors duration-300 w-full"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedExp.t)}`, '_blank')}
                >
                  Locate on Map
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
};

export default ComboSection;

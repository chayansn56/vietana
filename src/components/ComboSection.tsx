import React, { useState, useMemo, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';
import { MAP_DESTINATIONS, EXPERIENCES } from '../config';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';
import Section from './ui/layout/Section';

const LeafletMap = React.lazy(() => import('./map/LeafletMap'));

interface ComboSectionProps {
    onOpenPlanner: (destination?: string) => void;
}

const ComboSection: React.FC<ComboSectionProps> = ({ onOpenPlanner }) => {
  const { t } = useTranslation();
  const [shattered, setShattered] = useState(false);
  const [selectedExp, setSelectedExp] = useState<typeof EXPERIENCES[0] | null>(null);
  
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const nodes = useMemo(() => {
    return EXPERIENCES.map((exp) => ({
      ...exp,
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`,
      dur: `${3 + Math.random() * 3}s`,
      del: `${Math.random() * 2}s`
    }));
  }, []);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([MAP_DESTINATIONS[idx].lat, MAP_DESTINATIONS[idx].lng]);
  };

  return (
    <Section id="combo-section" variant="none" spacing="none" className="flex flex-wrap w-full min-h-[800px] bg-white items-stretch">
      
      {/* LEFT: EXPERIENCES */}
      <div id="experiences" className="flex-1 min-w-[320px] relative py-24 px-[2%] flex items-center justify-center overflow-hidden border-r border-black/5 bg-brand-green-extra-dark min-h-[800px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,79,46,0.2)_0%,transparent_70%)] z-0" />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 animate-blob-float bg-brand-blue top-[10%] left-[10%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 animate-blob-float [animation-delay:-5s] bg-brand-green bottom-[10%] right-[10%]" />
        
        {!shattered ? (
          <div className="relative z-10 cursor-pointer transition-transform duration-600 ease-elastic text-center hover:scale-105" onClick={() => setShattered(true)}>
            <div className="w-56 h-56 rounded-full orb-style flex flex-col items-center justify-center p-8 shadow-strong">
              <Heading as="span" size="xs" font="sans" className="text-brand-gold tracking-[0.28em] uppercase mb-2">{t.exp.title}</Heading>
              <Heading as="h2" size="lg" variant="white" className="mb-2">Unlock<br />15 Hidden Experiences</Heading>
              <Text variant="white" size="xs" className="opacity-60 font-bold tracking-[0.1em] uppercase">Tap to Explore</Text>
            </div>
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-brand-gold/30 animate-spin" style={{ animationDuration: '15s' }} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-[5]">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                className="absolute cursor-pointer transition-all duration-400 group" 
                style={{ top: node.top, left: node.left }}
                onClick={() => setSelectedExp(node)}
              >
                <div 
                    className="animate-nfloat" 
                    style={{ '--float-dur': node.dur, '--float-del': node.del } as React.CSSProperties}
                >
                  <div className="w-3.5 h-3.5 bg-brand-gold rounded-full shadow-[0_0_15px_var(--color-brand-gold)] relative group-hover:scale-[1.8] group-hover:bg-white group-hover:shadow-[0_0_25px_#fff] transition-all duration-300">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/85 text-white px-4 py-2 rounded-lg text-xxs whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 border border-white/10 backdrop-blur-md group-hover:opacity-100 group-hover:bottom-8">
                      {node.t}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="glass" 
              size="sm" 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" 
              onClick={() => setShattered(false)}
            >
              ← Back
            </Button>
          </div>
        )}

        <Modal 
          isOpen={!!selectedExp} 
          onClose={() => setSelectedExp(null)}
          maxWidth="max-w-[500px]"
          className="bg-brand-green-dark border-brand-gold/20 overflow-hidden"
        >
          {selectedExp && (
            <>
              <img src={selectedExp.img} alt={selectedExp.t} className="w-full h-64 object-cover" />
              <div className="p-8">
                <Heading as="h3" size="lg" variant="accent" className="mb-4">
                  {selectedExp.t}
                </Heading>
                <Text variant="white" className="opacity-70 leading-relaxed mb-8">
                  {selectedExp.d}
                </Text>
                <div className="flex gap-4">
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedExp.t)}`, '_blank')}
                  >
                    📍 View on Map
                  </Button>
                  <Button 
                    variant="glass" 
                    className="flex-1"
                    onClick={() => { setSelectedExp(null); onOpenPlanner(selectedExp.t); }}
                  >
                    Plan with AI
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>

      {/* RIGHT: MAP */}
      <div id="explore-vietnam" className="flex-1 min-w-[320px] relative py-24 px-[2%] bg-surface-cream flex flex-col items-center justify-center min-h-[800px]">
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-180 vertical-rl text-center font-serif text-[clamp(3.5rem,8vw,7rem)] font-light text-brand-green/5 tracking-[0.1em] whitespace-nowrap pointer-events-none select-none z-0">
          FEEL VIETNAM YOUR WAY
        </div>
        <div className="mb-8 text-center reveal">
          <Heading as="h2" size="2xl" className="text-text-dark font-normal">
            Explore Vietnam
          </Heading>
        </div>
        
        <div className="relative w-full max-w-[600px] flex flex-col lg:flex-row justify-center items-center reveal delay-100">
          <div className="w-full aspect-square rounded-3xl overflow-hidden border-8 border-white shadow-heavy relative z-[2] h-[500px]">
            <Suspense fallback={<div className="w-full h-full bg-brand-green-extra-dark/10 animate-pulse flex items-center justify-center">Loading Map...</div>}>
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative lg:absolute lg:top-1/2 lg:-right-15 lg:-translate-y-1/2 w-full lg:w-[260px] bg-white/98 backdrop-blur-2xl rounded-2xl p-6 shadow-deep z-[100] border border-black/5 mt-8 lg:mt-0"
              >
                <div className="absolute top-4 right-4 cursor-pointer text-2xl text-text-subtle leading-none" onClick={() => setSelectedCityIdx(null)}>×</div>
                <img src={MAP_DESTINATIONS[selectedCityIdx].img} alt={MAP_DESTINATIONS[selectedCityIdx].name} className="w-full h-32 object-cover rounded-xl mb-4" />
                <Heading as="h3" size="md" weight="bold" className="text-text-dark mb-1.5">
                  {MAP_DESTINATIONS[selectedCityIdx].name}
                </Heading>
                <Text size="xs" weight="bold" className="text-brand-gold uppercase mb-2.5 tracking-wider">
                  Best time: {MAP_DESTINATIONS[selectedCityIdx].time}
                </Text>
                <Text size="sm" variant="muted" className="leading-relaxed mb-5">
                  {MAP_DESTINATIONS[selectedCityIdx].desc}
                </Text>
                <div className="flex flex-col gap-2.5">
                  <Button variant="primary" size="sm" className="w-full" onClick={() => onOpenPlanner(MAP_DESTINATIONS[selectedCityIdx].name)}>Plan My Trip</Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(MAP_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`, '_blank')}
                  >
                    View on Map
                  </Button>
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

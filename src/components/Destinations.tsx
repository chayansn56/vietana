import React, { useState, useRef } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { CITIES, CityDestination } from '../data/destinations';
import Modal from './ui/Modal';
import Icon from './ui/Icon';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../services/CardSoundService';

const getWeatherForCity = (cityName: string) => {
  switch (cityName) {
    case 'Sapa': return { icon: '🌤️', temp: '18°C', desc: 'Cool & Misty' };
    case 'Hanoi': return { icon: '☀️', temp: '26°C', desc: 'Pleasant' };
    case 'Ha Long Bay': return { icon: '🌤️', temp: '25°C', desc: 'Breezy' };
    case 'Ninh Binh': return { icon: '☀️', temp: '27°C', desc: 'Clear Skies' };
    case 'Da Nang': return { icon: '☀️', temp: '29°C', desc: 'Tropical Sun' };
    case 'Hoi An': return { icon: '☀️', temp: '28°C', desc: 'Sunny' };
    case 'Da Lat': return { icon: '🌤️', temp: '20°C', desc: 'Cool Breeze' };
    case 'Nha Trang': return { icon: '☀️', temp: '30°C', desc: 'Perfect Beach' };
    case 'Ho Chi Minh City': return { icon: '🌦️', temp: '31°C', desc: 'Warm Showers' };
    case 'Phu Quoc': return { icon: '☀️', temp: '32°C', desc: 'Humid & Sunny' };
    default: return { icon: '☀️', temp: '28°C', desc: 'Sunny' };
  }
};

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<CityDestination | null>(null);
  const [expandedSight, setExpandedSight] = useState<string | null>(null);
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const triggerScrollSound = () => {
    soundService.playSwish();
  };

  const handleCardHover = () => {
    soundService.playTick();
  };

  const scrollDeck = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      triggerScrollSound();
    }
  };

  return (
    <Section id="destinations" spacing="lg" className="bg-[#FAF8F3] text-[#1D1D1F] relative overflow-hidden transition-colors duration-500">
      {/* Background blobs for premium bright aesthetic */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] bg-[#EAF7FF] rounded-full blur-[100px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] bg-[#F1FFF3] rounded-full blur-[100px] opacity-50 pointer-events-none z-0" />

      <Container className="relative z-10 w-full max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#3D8B7D] uppercase mb-3 block">
              🌿 CHOOSE YOUR VIBE
            </span>
            <Heading as="h2" size="4xl" font="serif" className="text-[#1D1D1F] tracking-tight mb-4">
              Explore Destinations
            </Heading>
            <Heading as="h3" size="lg" className="font-sans font-light text-[#1D1D1F]/70 tracking-wide max-w-2xl">
              Sensory travel folders crafted dynamically. Hover to slide the view open.
            </Heading>
          </div>

          {/* Slide Deck Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollDeck('left')}
              className="w-12 h-12 rounded-full border border-black/10 bg-white hover:bg-[#FAF8F3] hover:border-black/25 flex items-center justify-center text-black/60 hover:text-black transition-all cursor-pointer shadow-sm active:scale-95 btn-pressable"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => scrollDeck('right')}
              className="w-12 h-12 rounded-full border border-black/10 bg-white hover:bg-[#FAF8F3] hover:border-black/25 flex items-center justify-center text-black/60 hover:text-black transition-all cursor-pointer shadow-sm active:scale-95 btn-pressable"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Postcard Deck Scrollbar Area */}
        <div
          ref={sliderRef}
          onScroll={triggerScrollSound}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-12 pt-4 relative z-10 w-full"
        >
          {CITIES.slice(0, 10).map((city) => (
            <motion.div
              key={city.id}
              className="w-[85vw] sm:w-[320px] h-[450px] skeuo-paper rounded-[2rem] skeuo-shadow flex flex-col justify-between shrink-0 snap-start relative overflow-hidden group cursor-pointer hover:border-brand-gold/45 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500"
              onClick={() => setSelectedCity(city)}
              onMouseEnter={handleCardHover}
              whileHover={{
                y: [0, -6, 0],
                transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Postcard folder structure - Image hidden in bottom half, slides up to reveal */}
              <div className="absolute inset-x-0 bottom-[120px] top-0 z-0 overflow-hidden rounded-[1.5rem] m-4 bg-[#F2EFE8] border border-black/5 shadow-inner">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.coverImage})` }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Slit folder shadow cover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              {/* Top Weather Indicator in card */}
              <div className="p-6 relative z-10 flex justify-between items-start">
                <span className="bg-black/5 backdrop-blur-md text-[#1E4D45] px-3 py-1 rounded-full text-[0.65rem] tracking-wider uppercase font-bold border border-black/5 shadow-sm">
                  {getWeatherForCity(city.name).icon} {getWeatherForCity(city.name).temp}
                </span>
                <span className="text-[10px] tracking-widest text-[#3D8B7D] uppercase font-bold bg-[#3D8B7D]/10 px-2.5 py-1 rounded-full border border-[#3D8B7D]/10">
                  EXPLORE
                </span>
              </div>

              {/* Bottom Card Title Detail Drawer */}
              <div className="p-6 bg-transparent relative z-10 border-t border-black/5 flex flex-col gap-1 shrink-0 rounded-b-[2rem]">
                <Heading as="h4" variant="none" className="text-xl font-serif text-[#1D1D1F] tracking-wide leading-tight">
                  {city.name}
                </Heading>
                <Text variant="none" className="text-[#3D8B7D] text-[0.65rem] uppercase tracking-widest font-semibold block">
                  📍 {city.shortDesc}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all cities button */}
        <div className="mt-14 text-center">
          <button
            className="px-8 py-4 bg-white hover:bg-[#FAF8F3] text-brand-gold hover:text-brand-gold-muted border border-black/10 rounded-full tracking-widest uppercase text-xs font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 mx-auto cursor-pointer hover:-translate-y-0.5 active:scale-95 btn-pressable"
            onClick={() => setIsAllCitiesOpen(true)}
          >
            Click to view more cities <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </Container>

      {/* City Detail Modal */}
      <Modal isOpen={!!selectedCity} onClose={() => { setSelectedCity(null); setExpandedSight(null); }} maxWidth="max-w-4xl">
        {selectedCity && (
          <div className="flex flex-col text-left max-h-[85vh] md:max-h-[90vh]">
            {/* Modal Header Image */}
            <div 
              className="w-full h-48 md:h-80 bg-cover bg-center relative shrink-0"
              style={{ backgroundImage: `url(${selectedCity.coverImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/100 via-surface-dark/40 to-transparent" />
              
              {/* Weather Forecast Badge */}
              {(() => {
                const w = getWeatherForCity(selectedCity.name);
                return (
                  <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-white/90 shadow-md">
                    <span className="text-sm">{w.icon}</span>
                    <span className="text-[10px] tracking-wider uppercase font-bold">{w.temp} • {w.desc}</span>
                  </div>
                );
              })()}

              <div className="absolute bottom-6 left-6 md:left-10 pr-6 z-10">
                <Heading as="h2" size="3xl" font="serif" variant="none" className="text-white mb-1 md:mb-2 text-3xl md:text-4xl">
                  {selectedCity.name}
                </Heading>
                <Text size="sm" variant="none" className="text-brand-gold font-medium tracking-wider uppercase text-xs md:text-sm">
                  {selectedCity.shortDesc}
                </Text>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-10 bg-surface-dark flex-1 overflow-y-auto custom-scrollbar">
              <Text size="md" variant="none" className="text-white/80 font-light leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
                {selectedCity.fullDesc}
              </Text>

              <Heading as="h4" size="lg" font="serif" variant="none" className="text-white mb-6 border-b border-white/10 pb-4">
                Top Sightseeing Spots
              </Heading>

              <div className="flex flex-col gap-3 md:gap-4">
                {selectedCity.sights.map((sight) => {
                  const isExpanded = expandedSight === sight.id;
                  return (
                    <div 
                      key={sight.id}
                      className="bg-black/40 rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-white/20 transition-colors duration-300"
                      onClick={() => setExpandedSight(isExpanded ? null : sight.id)}
                    >
                      <div className="flex items-center gap-4 p-3 md:p-4">
                        <div 
                           className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-cover bg-center shrink-0"
                           style={{ backgroundImage: `url(${sight.image})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <Heading as="h5" size="md" variant="none" className="text-white/90 group-hover:text-brand-gold transition-colors text-base md:text-lg truncate whitespace-normal line-clamp-2">
                            {sight.name}
                          </Heading>
                          <Text size="xs" variant="none" className="text-white/50 mt-1 hidden md:block">
                            Click to {isExpanded ? 'hide' : 'view'} details
                          </Text>
                        </div>
                        <div className="pr-2 md:pr-4 text-white/40 shrink-0">
                          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
                        </div>
                      </div>
                      
                      {/* Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 md:px-6 md:pb-6 pt-0 border-t border-white/5 mt-2">
                              <Text size="sm" variant="none" className="text-brand-gold/90 font-light italic text-xs md:text-sm">
                                {sight.description}
                              </Text>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* All Cities Modal */}
      <Modal isOpen={isAllCitiesOpen} onClose={() => setIsAllCitiesOpen(false)} maxWidth="max-w-6xl">
        <div className="p-6 md:p-10 flex flex-col max-h-[85vh] md:max-h-[90vh]">
          <div className="mb-8 border-b border-white/10 pb-6 shrink-0">
            <Heading as="h2" size="3xl" font="serif" className="text-white tracking-tight mb-2">
              All Destinations
            </Heading>
            <Text variant="white" size="md" className="opacity-70 font-light">
              Explore our complete collection of Vietnam's most beautiful tourist cities.
            </Text>
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 -mx-6 px-6 -mb-6 pb-6 md:-mx-10 md:px-10 md:-mb-10 md:pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {CITIES.map((city) => (
                <div 
                  key={`all-${city.id}`} 
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-brand-gold/30 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-500"
                  onClick={() => {
                    setIsAllCitiesOpen(false);
                    setTimeout(() => setSelectedCity(city), 300); // Wait for modal close transition
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${city.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 flex flex-col justify-end">
                    <Heading as="h3" size="xl" variant="none" className="text-white mb-1 transform transition-transform duration-500 group-hover:-translate-y-1 text-lg md:text-2xl leading-tight">
                      {city.name}
                    </Heading>
                    <div className="overflow-hidden">
                      <Text 
                        variant="none" 
                        size="xs" 
                        className="text-white/80 md:text-white/70 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 line-clamp-2 text-[10px] md:text-xs leading-snug"
                      >
                        {city.shortDesc}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </Section>
  );
};

export default Destinations;

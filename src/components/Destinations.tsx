import React, { useState } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { CITIES, CityDestination } from '../data/destinations';
import Modal from './ui/Modal';
import Icon from './ui/Icon';
import SectionHeader from './ui/SectionHeader';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../services/CardSoundService';

const getWeatherForCity = (cityName: string) => {
  switch (cityName) {
    case 'Sapa': return { icon: '🌤️', temp: '18°C', desc: 'Cool & Misty', coord: '22.3364° N, 103.8438° E' };
    case 'Hanoi': return { icon: '☀️', temp: '26°C', desc: 'Pleasant', coord: '21.0285° N, 105.8542° E' };
    case 'Ha Long Bay': return { icon: '🌤️', temp: '25°C', desc: 'Breezy', coord: '20.9758° N, 107.0460° E' };
    case 'Ninh Binh': return { icon: '☀️', temp: '27°C', desc: 'Clear Skies', coord: '20.2506° N, 105.9745° E' };
    case 'Da Nang': return { icon: '☀️', temp: '29°C', desc: 'Tropical Sun', coord: '16.0544° N, 108.2022° E' };
    case 'Hoi An': return { icon: '☀️', temp: '28°C', desc: 'Sunny', coord: '15.8801° N, 108.3380° E' };
    case 'Da Lat': return { icon: '🌤️', temp: '20°C', desc: 'Cool Breeze', coord: '11.9404° N, 108.4583° E' };
    case 'Nha Trang': return { icon: '☀️', temp: '30°C', desc: 'Perfect Beach', coord: '12.2388° N, 109.1967° E' };
    case 'Ho Chi Minh City': return { icon: '🌦️', temp: '31°C', desc: 'Warm Showers', coord: '10.8231° N, 106.6297° E' };
    case 'Phu Quoc': return { icon: '☀️', temp: '32°C', desc: 'Humid & Sunny', coord: '10.2899° N, 103.9840° E' };
    default: return { icon: '☀️', temp: '28°C', desc: 'Sunny', coord: '14.0583° N, 108.2772° E' };
  }
};

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<CityDestination | null>(null);
  const [expandedSight, setExpandedSight] = useState<string | null>(null);
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false);

  const handleCardHover = () => {
    soundService.playTick();
  };

  // Rotational angles for polaroid scrapbook aesthetic
  const getAngle = (index: number) => {
    const angles = [-1.5, 1, -2, 1.8, -1, 2, -1.2, 1.5];
    return angles[index % angles.length];
  };

  return (
    <Section id="destinations" spacing="lg" className="bg-[#FAF7F0] text-[#111111] relative overflow-hidden">
      {/* Subtle organic decorations */}
      <div className="absolute top-[5%] left-[-2%] w-[300px] h-[300px] bg-[#E9DFC8]/25 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-2%] w-[350px] h-[350px] bg-[#AAB7A1]/20 rounded-full blur-[90px] pointer-events-none" />

      <Container className="relative z-10 w-full max-w-[1400px]">
        <SectionHeader
          label="EXPLORE THE REGIONS"
          title="Destinations Portfolio"
          description="A curated folder of sensory landscapes, historical towns, and modern ports. Click on any postcard to review local coordinates, temperature, and detailed sightseeing guides."
          centered
        />

        {/* Polaroid Scrapbook Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-12 px-2">
          {CITIES.slice(0, 8).map((city, idx) => {
            const rotAngle = getAngle(idx);
            const weather = getWeatherForCity(city.name);
            return (
              <div 
                key={city.id}
                style={{ transform: `rotate(${rotAngle}deg)` }}
                className="polaroid-frame group cursor-pointer bg-white"
                onClick={() => setSelectedCity(city)}
                onMouseEnter={handleCardHover}
              >
                {/* Polaroid Photo area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0] border border-black/5">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${city.coverImage})` }}
                  />
                  {/* Stamp style overlay */}
                  <div className="absolute top-3 right-3 text-[11px] font-mono bg-[#FAF7F0]/80 text-[#B8860B] border border-[#D4AF37]/35 rounded px-2 py-0.5 pointer-events-none shadow-sm">
                    {weather.icon} {weather.temp}
                  </div>
                </div>

                {/* Polaroid Title/Label area */}
                <div className="pt-5 pb-1 text-left">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-lg font-bold text-[#1E4D45] tracking-tight">
                      {city.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-[#B8860B] font-mono tracking-widest uppercase mt-1 flex items-center gap-1">
                    <Icon name="MapPin" size={10} /> {weather.coord}
                  </p>
                  <p className="text-xs text-[#555555] font-light mt-2 line-clamp-2 leading-relaxed">
                    {city.shortDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all cities button */}
        <div className="mt-16 text-center">
          <button
            className="px-8 py-4 bg-[#1E4D45] hover:bg-[#12302B] text-white rounded-md tracking-widest uppercase text-xs font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 mx-auto cursor-pointer hover:-translate-y-0.5 active:scale-95 btn-pressable"
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
                  <div className="absolute top-6 right-6 bg-[#FAF7F0] border border-[#D4AF37]/30 px-3 py-1.5 rounded flex items-center gap-2 text-[#1E4D45] shadow-md">
                    <span className="text-sm">{w.icon}</span>
                    <span className="text-[10px] tracking-wider uppercase font-mono font-bold">{w.temp} • {w.desc}</span>
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
              <Text size="md" variant="none" className="text-white/80 font-light leading-relaxed mb-8 md:mb-10 text-sm md:text-base max-w-prose">
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
        <div className="p-6 md:p-10 flex flex-col max-h-[85vh] md:max-h-[90vh] bg-[#FAF7F0] rounded-2xl">
          <div className="mb-8 border-b border-[#E8E4D9] pb-6 shrink-0">
            <Heading as="h2" size="3xl" font="serif" className="text-brand-green-dark tracking-tight mb-2">
              All Destinations
            </Heading>
            <Text variant="none" size="md" className="text-[#555555] font-light">
              Explore our complete collection of Vietnam's most beautiful tourist cities.
            </Text>
          </div>

          <div className="overflow-y-auto flex-1 -mx-6 px-6 -mb-6 pb-6 md:-mx-10 md:px-10 md:-mb-10 md:pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {CITIES.map((city) => (
                <div 
                  key={`all-${city.id}`} 
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-brand-green/30 hover:border-brand-green hover:shadow-[0_4px_20px_rgba(30,77,69,0.15)] transition-all duration-500"
                  onClick={() => {
                    setIsAllCitiesOpen(false);
                    setTimeout(() => setSelectedCity(city), 300);
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out md:group-hover:scale-110"
                    style={{ backgroundImage: `url(${city.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 md:group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 flex flex-col justify-end">
                    <Heading as="h3" size="xl" variant="none" className="text-white mb-1 transform transition-transform duration-500 md:group-hover:-translate-y-1 text-lg md:text-2xl leading-tight">
                      {city.name}
                    </Heading>
                    <div className="overflow-hidden">
                      <Text 
                        variant="none" 
                        size="xs" 
                        className="text-white/80 md:text-white/70 transform md:translate-y-full md:opacity-0 transition-all duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100 line-clamp-2 text-[10px] md:text-xs leading-snug"
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

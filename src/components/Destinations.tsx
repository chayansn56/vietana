import React, { useState } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { CITIES, CityDestination } from '../data/destinations';
import Modal from './ui/Modal';
import Icon from './ui/Icon';
import Particles from './ui/Particles';

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<CityDestination | null>(null);
  const [expandedSight, setExpandedSight] = useState<string | null>(null);
  const [isAllCitiesOpen, setIsAllCitiesOpen] = useState(false);

  return (
    <Section id="destinations" spacing="lg" className="bg-black text-white relative">
      <Container>
        <div className="mb-16 md:mb-20 flex flex-col justify-start gap-4">
          <Heading as="h2" size="3xl" font="serif" className="text-white tracking-tight">
            {t.nav.destinations}
          </Heading>
          <Text variant="white" size="lg" className="opacity-70 font-light max-w-2xl">
            We don't just take you places. We take you to the feeling of Vietnam. 
            Discover regions that match your deepest travel desires.
          </Text>
        </div>

        {/* 10 Cities Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CITIES.slice(0, 10).map((city) => (
            <div 
              key={city.id} 
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500"
              onClick={() => setSelectedCity(city)}
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

        {/* Click to see more */}
        <div className="mt-12 text-center">
          <button 
            className="text-brand-gold hover:text-brand-gold-muted tracking-widest uppercase text-sm font-semibold transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center justify-center gap-2 mx-auto"
            onClick={() => setIsAllCitiesOpen(true)}
          >
            Click to see more cities like this <Icon name="ArrowRight" size={16} />
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
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 md:px-6 md:pb-6 pt-0 border-t border-white/5 mt-2">
                          <Text size="sm" variant="none" className="text-brand-gold/90 font-light italic text-xs md:text-sm">
                            {sight.description}
                          </Text>
                        </div>
                      </div>
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
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500"
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

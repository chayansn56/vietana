import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';

const DESTINATIONS = [
  {
    name: 'Ha Long Bay',
    img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-2',
    desc: 'Emerald waters and limestone islands.'
  },
  {
    name: 'Ho Chi Minh City',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    desc: 'The vibrant heart of the south.'
  },
  {
    name: 'Hoi An',
    img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1600&q=80',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    desc: 'Lantern-lit ancient streets.'
  },
  {
    name: 'Da Nang',
    img: 'https://images.unsplash.com/photo-1581026046187-5775cb56b3e7?w=1600&q=80',
    colSpan: 'col-span-1 md:col-span-1',
    rowSpan: 'row-span-1',
    desc: 'Where city meets the sea.'
  },
  {
    name: 'Phu Quoc',
    img: 'https://images.unsplash.com/photo-1557053910-d7d8e6eb8b1e?w=1600&q=80',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-1',
    desc: 'White sands and pristine sunsets.'
  }
];

const Destinations: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section id="destinations" spacing="lg" className="bg-black text-white relative">
      <Container>
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Heading as="h2" size="3xl" font="serif" className="text-white mb-6 tracking-tight">
              {t.nav.destinations}
            </Heading>
            <Text variant="white" size="lg" className="opacity-70 font-light">
              We don't just take you places. We take you to the feeling of Vietnam. 
              Discover regions that match your deepest travel desires.
            </Text>
          </div>
        </div>

        {/* CSS Grid Masonry-like layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {DESTINATIONS.map((dest, i) => (
            <div 
              key={i} 
              className={`relative group rounded-3xl overflow-hidden cursor-pointer ${dest.colSpan} ${dest.rowSpan}`}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.img})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                <Heading as="h3" size="2xl" variant="none" className="text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {dest.name}
                </Heading>
                <div className="overflow-hidden">
                  <Text 
                    variant="none" 
                    size="sm" 
                    className="text-white/80 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {dest.desc}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Destinations;

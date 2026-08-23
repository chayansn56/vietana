import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import { EXPERIENCES_DATA } from '../data/experiencesData';

interface ExperiencesPreviewProps {
  onOpenExperiences: () => void;
}

export default function ExperiencesPreview({ onOpenExperiences }: ExperiencesPreviewProps) {
  const previewItems = EXPERIENCES_DATA.slice(0, 12);

  return (
    <Section id="experiences-preview" className="py-16 md:py-24 bg-white border-y border-gray-100 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: 'url(/experiences_bg.png)' }} 
      />
      
      <Container className="max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-1 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs mb-3 select-none">
            🔥 RECOMMENDED
          </div>
          <Heading as="h2" size="3xl" font="serif" className="mb-4 tracking-tight uppercase flex items-center justify-center font-black select-none gap-[1px] text-blue-700 drop-shadow-lg">
            Curated Experiences
          </Heading>
          <Text className="text-blue-700 max-w-2xl drop-shadow-md font-medium">
            Hover over the cards below to reveal more details about our curated adventures.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {previewItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full h-[260px] group cursor-pointer [perspective:1000px]"
              onClick={onOpenExperiences}
            >
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-sm group-hover:shadow-[0_0_30px_rgba(230,217,191,0.8)] rounded-xl">
                
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#FAF8F3] border border-[#E6D9BF]/30 rounded-xl overflow-hidden flex flex-col">
                  <div className="h-36 overflow-hidden relative shrink-0">
                    <img 
                      src={item.images.thumbnail || item.images.hero} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-center bg-white">
                    <h3 className="font-serif font-bold text-lg text-[#12302B] mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.destination} • {item.category}
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#FAF8F3] border border-[#E6D9BF]/60 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 text-center shadow-inner">
                  <div className="w-10 h-10 rounded-full bg-[#E6D9BF]/30 flex items-center justify-center mb-3 text-[#12302B]">
                    <Icon name="Compass" size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#12302B] mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-light mb-4 line-clamp-3">
                    {item.oneLineSummary || `Experience the beauty of ${item.destination} through our curated ${item.category} offering.`}
                  </p>
                  <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#12302B] hover:text-[#1E4D45] transition-colors bg-[#E6D9BF]/20 px-3 py-1.5 rounded-full border border-[#E6D9BF]/50 hover:bg-[#E6D9BF]/40">
                    View Details <Icon name="ArrowRight" size={10} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={onOpenExperiences}
            className="group relative overflow-hidden bg-[#12302B] text-white px-10 py-4 rounded-full text-sm font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer border-none flex items-center gap-3 hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10">Explore All Experiences</span>
            <Icon name="ArrowRight" size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-[#1E4D45] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></div>
          </button>
        </div>
      </Container>
    </Section>
  );
}

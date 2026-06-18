import React, { useState } from 'react';
import { motion } from 'motion/react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { 
  ALL_CATEGORIES, 
  ConciergeCategory, 
  CATEGORY_INDIAN_COMFORT,
  CATEGORY_VEG_JAIN,
  CATEGORY_VIETNAMESE,
  CATEGORY_CAFES,
  CATEGORY_LOCAL_KNOWLEDGE 
} from '../data/foodConcierge';
import FoodSideSheet from './food/FoodSideSheet';

const Food: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ConciergeCategory | null>(null);

  const openCategory = (category: ConciergeCategory) => {
    setSelectedCategory(category);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeSideSheet = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Section id="food" className="relative py-32 bg-[#F5F5F7] text-[#1D1D1F] overflow-hidden">
        <Container>
          
          {/* Main Hero Header */}
          <div className="mb-20 text-center max-w-4xl mx-auto reveal">
            <Text size="lg" weight="medium" className="uppercase tracking-[0.3em] text-brand-gold mb-6">
              VIETANA Food Concierge™
            </Text>
            <Heading as="h2" size="4xl" font="serif" className="mb-6 font-extrabold text-[#1D1D1F]">
              A Taste Of Home
            </Heading>
            <Text size="xl" className="text-[#86868B] font-light leading-relaxed">
              Because great journeys shouldn't come with food worries. 
              Discover our carefully curated ecosystem of comfort, flavor, and local secrets.
            </Text>
          </div>

          {/* Hero Image (Family Dining - No closeups) */}
          <motion.div 
            className="w-full h-[60vh] min-h-[400px] rounded-3xl overflow-hidden mb-24 shadow-2xl relative cursor-pointer group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => openCategory(CATEGORY_INDIAN_COMFORT)}
          >
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=2000&q=80" 
              alt="Family dining" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
              <div>
                <Text variant="white" weight="bold" size="sm" className="uppercase tracking-widest mb-2">Featured Collection</Text>
                <Heading as="h3" size="3xl" font="serif" variant="white" className="m-0 drop-shadow-lg">
                  Indian Comfort
                </Heading>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium hover:bg-white/30 transition-colors">
                Explore Curation
              </div>
            </div>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            
            {/* Indian Comfort (Already featured above, but keeping for grid completeness or could omit) */}
            
            {/* Vegetarian & Jain */}
            <div 
              className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all duration-500 overflow-hidden relative"
              onClick={() => openCategory(CATEGORY_VEG_JAIN)}
            >
              <div className="absolute top-0 right-0 w-1/2 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <img 
                  src={CATEGORY_VEG_JAIN.heroImage} 
                  alt={CATEGORY_VEG_JAIN.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="relative z-20 max-w-[60%]">
                <Text size="sm" weight="bold" className="uppercase tracking-widest text-brand-green mb-4">Plant Based</Text>
                <Heading as="h3" size="2xl" font="serif" className="text-[#1D1D1F] mb-4">
                  {CATEGORY_VEG_JAIN.title}
                </Heading>
                <Text className="text-[#86868B] mb-8">
                  {CATEGORY_VEG_JAIN.subtitle}
                </Text>
                <div className="inline-flex items-center gap-2 text-[#1D1D1F] font-medium group-hover:text-brand-green transition-colors">
                  Explore <span className="text-xl leading-none">&rarr;</span>
                </div>
              </div>
            </div>

            {/* Vietnamese Favorites */}
            <div 
              className="bg-brand-green rounded-3xl p-8 shadow-sm group cursor-pointer hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
              onClick={() => openCategory(CATEGORY_VIETNAMESE)}
            >
              <div className="absolute inset-0 opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500">
                <img src={CATEGORY_VIETNAMESE.heroImage} alt="Vietnamese" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <Text size="sm" weight="bold" className="uppercase tracking-widest text-brand-gold mb-4">Local Soul</Text>
                <Heading as="h3" size="xl" font="serif" variant="white" className="mb-2">
                  {CATEGORY_VIETNAMESE.title}
                </Heading>
              </div>
              <div className="relative z-10 mt-auto">
                 <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-green transition-colors">
                    <span className="text-xl">&rarr;</span>
                 </div>
              </div>
            </div>

            {/* Cafes */}
            <div 
              className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 group cursor-pointer hover:shadow-xl transition-all duration-500 min-h-[300px] flex flex-col"
              onClick={() => openCategory(CATEGORY_CAFES)}
            >
              <div className="flex-1 mb-6 rounded-2xl overflow-hidden relative">
                 <img src={CATEGORY_CAFES.heroImage} alt="Cafes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <Heading as="h3" size="lg" font="serif" className="text-[#1D1D1F] mb-1">
                  {CATEGORY_CAFES.title}
                </Heading>
                <Text size="sm" className="text-[#86868B]">
                  {CATEGORY_CAFES.subtitle}
                </Text>
              </div>
            </div>

            {/* Local Knowledge */}
            <div 
              className="lg:col-span-2 bg-[#1D1D1F] rounded-3xl p-8 md:p-12 shadow-sm group cursor-pointer hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              onClick={() => openCategory(CATEGORY_LOCAL_KNOWLEDGE)}
            >
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                <img src={CATEGORY_LOCAL_KNOWLEDGE.heroImage} alt="Team" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-center max-w-lg">
                <Heading as="h3" size="2xl" font="serif" variant="white" className="mb-6">
                  {CATEGORY_LOCAL_KNOWLEDGE.title}
                </Heading>
                <Text size="lg" className="text-white/80 font-light leading-relaxed mb-8">
                  Good food isn't just about taste. It's about comfort, memories, and bringing people together. Discover our trusted circle.
                </Text>
                <div className="inline-flex items-center gap-2 text-white font-medium group-hover:text-brand-gold transition-colors">
                  Read Our Story <span className="text-xl leading-none">&rarr;</span>
                </div>
              </div>
            </div>

          </div>

        </Container>
      </Section>

      {/* The Ecosystem Side Sheet */}
      <FoodSideSheet 
        isOpen={selectedCategory !== null}
        onClose={closeSideSheet}
        category={selectedCategory}
      />
    </>
  );
};

export default Food;

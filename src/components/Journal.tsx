import React, { useState } from 'react';
import { motion } from 'motion/react'; // Trigger Vercel build
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
import BrandName from './ui/BrandName';
import Icon from './ui/Icon';
import { magazineData, Article, Collection } from '../data/notesMagazine';
import NotesSideSheet from './NotesSideSheet';

const Journal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Function to open side sheet with an article
  const openArticle = (article: Article) => {
    setActiveArticle(article);
  };

  return (
    <div id="journal" className="bg-[#FAF8F3] min-h-screen font-sans text-[#2B2B2B]">
      
      {/* Side Sheet */}
      <NotesSideSheet 
        isOpen={activeArticle !== null} 
        onClose={() => setActiveArticle(null)} 
        article={activeArticle} 
      />

      {/* HERO SECTION */}
      <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555921015-5532091f6026?w=2000&q=80" 
          alt="Hoi An Lanterns" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1D1D1F]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/80 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            <Heading as="h1" size="5xl" font="serif" className="mb-4 drop-shadow-lg tracking-wide">
              NOTES FROM VIETNAM
            </Heading>
            <Text size="xl" className="font-light opacity-90 drop-shadow-md max-w-2xl mx-auto mb-8">
              Stories, guides and inspiration from the people who call Vietnam home.
            </Text>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-[#2B2B2B]/50" />
              </div>
              <input 
                type="text" 
                placeholder="Search destinations, guides or experiences..." 
                className="w-full bg-white/90 backdrop-blur-md text-[#2B2B2B] placeholder:text-[#2B2B2B]/50 rounded-full py-5 pl-14 pr-8 outline-none focus:bg-white focus:ring-2 focus:ring-[#1E4D45]/50 transition-all shadow-lg text-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CURATED COLLECTIONS */}
      <div className="pt-16 pb-8 overflow-hidden">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Heading as="h2" size="3xl" font="serif" className="text-[#1E4D45] mb-2">
              Curated Collections
            </Heading>
            <Text className="text-[#2B2B2B]/60 text-lg">Hand-picked guides for your journey.</Text>
          </motion.div>
        </Container>

        {/* Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-12 pt-4 px-4 md:px-12 xl:px-24 gap-8 snap-x snap-mandatory hide-scrollbar">
          {magazineData.collections.map((collection, i) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-[300px] md:w-[400px] snap-center group cursor-pointer"
              // For MVP, clicking a collection opens its first article if it exists, or just a dummy placeholder if empty
              onClick={() => {
                if (collection.articles.length > 0) {
                  openArticle(collection.articles[0]);
                } else {
                  openArticle({
                    id: `dummy-${collection.id}`,
                    title: `Exploring ${collection.title}`,
                    intro: `The best of ${collection.title.toLowerCase()} is coming soon.`,
                    image: collection.image,
                    isComingSoon: true
                  });
                }
              }}
            >
              <div className="bg-[#FFFFFF] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                    <span>{collection.icon}</span>
                    <Text size="xs" weight="bold" className="uppercase tracking-widest text-[#1E4D45]">
                      {collection.articles.length} Stories
                    </Text>
                  </div>
                </div>
                <div className="p-8 flex justify-between items-end">
                  <Heading as="h3" size="2xl" font="serif" className="text-[#1D1D1F]">
                    {collection.title}
                  </Heading>
                  <span className="text-[#1E4D45] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED STORIES */}
      <div className="py-8 pb-20">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <Heading as="h2" size="4xl" font="serif" className="text-[#1D1D1F] mb-4">
              Featured Stories
            </Heading>
            <Text className="text-[#2B2B2B]/60 text-lg max-w-xl mx-auto">
              Essential reading to inspire and prepare you for the road ahead.
            </Text>
          </motion.div>

          {/* Staggered 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Story 1: Large Left */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 group cursor-pointer"
              onClick={() => openArticle(magazineData.featured[0])}
            >
              <div className="bg-[#FFFFFF] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <div className="h-[400px] overflow-hidden relative">
                  <img 
                    src={magazineData.featured[0].image} 
                    alt={magazineData.featured[0].title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-10 md:p-12">
                  <Heading as="h3" size="3xl" font="serif" className="text-[#1D1D1F] mb-4 group-hover:text-[#1E4D45] transition-colors">
                    {magazineData.featured[0].title}
                  </Heading>
                  <div className="flex items-center text-[#1E4D45] font-medium tracking-wide">
                    Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stories 2 & 3: Stacked Right */}
            <div className="md:col-span-5 flex flex-col gap-8 md:pt-16">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group cursor-pointer"
                onClick={() => openArticle(magazineData.featured[1])}
              >
                <div className="bg-[#FFFFFF] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="h-[250px] overflow-hidden relative">
                    <img 
                      src={magazineData.featured[1].image} 
                      alt={magazineData.featured[1].title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8">
                    <Heading as="h3" size="2xl" font="serif" className="text-[#1D1D1F] mb-4 group-hover:text-[#1E4D45] transition-colors">
                      {magazineData.featured[1].title}
                    </Heading>
                    <div className="flex items-center text-[#1E4D45] font-medium tracking-wide">
                      Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group cursor-pointer"
                onClick={() => openArticle(magazineData.featured[2])}
              >
                <div className="bg-[#FFFFFF] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="h-[250px] overflow-hidden relative">
                    <img 
                      src={magazineData.featured[2].image} 
                      alt={magazineData.featured[2].title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8">
                    <Heading as="h3" size="2xl" font="serif" className="text-[#1D1D1F] mb-4 group-hover:text-[#1E4D45] transition-colors">
                      {magazineData.featured[2].title}
                    </Heading>
                    <div className="flex items-center text-[#1E4D45] font-medium tracking-wide">
                      Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </Container>
      </div>



      {/* Hide scrollbar styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Journal;

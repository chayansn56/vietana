import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
import Icon from './ui/Icon';
import { magazineData, Article } from '../data/notesMagazine';
import NotesSideSheet from './NotesSideSheet';

const Journal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const openArticle = (article: Article) => {
    setActiveArticle(article);
  };

  return (
    <div id="journal" className="bg-[#FAF8F3] min-h-screen font-sans text-[#2B2B2B] pb-24">
      
      {/* Side Sheet */}
      <NotesSideSheet 
        isOpen={activeArticle !== null} 
        onClose={() => setActiveArticle(null)} 
        article={activeArticle} 
      />

      {/* PANORAMIC APP HEADER */}
      <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555921015-5532091f6026?w=2000&q=80" 
          alt="Hoi An Lanterns" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1D1D1F]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/10 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <Heading as="h1" size="4xl" font="serif" className="mb-2 drop-shadow-md tracking-wide text-white">
              Notes From Vietnam
            </Heading>
            <Text size="md" className="font-light opacity-90 drop-shadow-sm max-w-lg mx-auto mb-6">
              Stories and guides from the people who call Vietnam home.
            </Text>

            {/* Apple Style Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Icon name="Search" size={16} className="text-[#2B2B2B]/50" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/95 backdrop-blur-xl text-[#2B2B2B] placeholder:text-[#2B2B2B]/40 rounded-full py-3 pl-10 pr-6 outline-none focus:bg-white focus:ring-2 focus:ring-[#1E4D45]/30 transition-all shadow-sm text-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CURATED COLLECTIONS */}
      <div className="pt-8 pb-4 overflow-hidden -mt-4 relative z-10">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex justify-between items-end"
          >
            <div>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1D1D1F]">
                Curated Collections
              </Heading>
            </div>
            <span className="text-[#1E4D45] text-sm font-semibold tracking-wide cursor-pointer hover:underline">See All</span>
          </motion.div>
        </Container>

        {/* Compact Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-8 pt-2 px-4 md:px-12 xl:px-24 gap-4 snap-x snap-mandatory hide-scrollbar">
          {magazineData.collections.map((collection, i) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="shrink-0 w-[240px] md:w-[280px] snap-center group cursor-pointer"
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
              <div className="bg-[#FFFFFF] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-[#1D1D1F]/5">
                <div className="h-[140px] overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                    <span className="scale-75">{collection.icon}</span>
                    <Text size="xs" weight="bold" className="uppercase tracking-widest text-[#1E4D45] text-[10px]">
                      {collection.articles.length} Stories
                    </Text>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <Heading as="h3" size="lg" font="serif" className="text-[#1D1D1F] truncate">
                    {collection.title}
                  </Heading>
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F3] flex items-center justify-center text-[#1E4D45] group-hover:bg-[#1E4D45] group-hover:text-white transition-colors">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED STORIES - COMPACT GRID */}
      <div className="py-8">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex justify-between items-end"
          >
            <div>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1D1D1F]">
                Featured Stories
              </Heading>
            </div>
          </motion.div>

          {/* 3-Column App Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {magazineData.featured.map((story, i) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer flex"
                onClick={() => openArticle(story)}
              >
                <div className="flex flex-col bg-[#FFFFFF] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-[#1D1D1F]/5 w-full">
                  <div className="h-[200px] overflow-hidden relative shrink-0">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <Text size="xs" weight="bold" className="tracking-widest uppercase text-[#1E4D45] mb-2 opacity-80 text-[10px]">
                      Featured
                    </Text>
                    <Heading as="h3" size="xl" font="serif" className="text-[#1D1D1F] mb-3 group-hover:text-[#1E4D45] transition-colors line-clamp-2">
                      {story.title}
                    </Heading>
                    <Text size="sm" className="text-[#2B2B2B]/60 mb-6 line-clamp-3 flex-1">
                      {story.intro}
                    </Text>
                    <div className="flex items-center text-[#1E4D45] text-sm font-semibold tracking-wide">
                      Read Story <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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

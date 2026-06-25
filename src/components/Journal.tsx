import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
import Icon from './ui/Icon';
import { magazineData, Article } from '../data/notesMagazine';
import NotesSideSheet from './NotesSideSheet';

const highlightText = (text: string, query: string) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-amber-200 text-black px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const Journal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();
  const filteredStories = q
    ? magazineData.featured.filter(s =>
        s.title.toLowerCase().includes(q) || s.intro?.toLowerCase().includes(q)
      )
    : magazineData.featured;
  const filteredCollections = q
    ? magazineData.collections.filter(c =>
        c.title.toLowerCase().includes(q)
      )
    : magazineData.collections;

  const openArticle = (article: Article) => {
    setActiveArticle(article);
  };

  // Staggered angles for Polaroid collage feel
  const getAngle = (index: number) => {
    const angles = [-2, 1.5, -1, 2, -1.8, 1.2];
    return angles[index % angles.length];
  };

  return (
    <div id="journal" className="bg-[#FAF7F0] bg-noise min-h-screen text-[#111111] pb-24">
      {/* Side Sheet */}
      <NotesSideSheet 
        isOpen={activeArticle !== null} 
        onClose={() => setActiveArticle(null)} 
        article={activeArticle} 
      />

      {/* PANORAMIC HEADER */}
      <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden border-b border-[#E8E4D9]">
        <img 
          src="https://images.unsplash.com/photo-1555921015-5532091f6026?w=2000&q=80" 
          alt="Hoi An Lanterns - Vietnam Travel Guide" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1C18]/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <Heading as="h2" size="4xl" font="serif" className="mb-2 drop-shadow-md tracking-wide text-white">
              Notes From Vietnam
            </Heading>
            <Text size="sm" className="font-light opacity-90 drop-shadow-sm max-w-lg mx-auto mb-6">
              Stories, letters, and regional maps logbook.
            </Text>

            {/* Apple Style Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Icon name="Search" size={15} className="text-[#1E4D45]" />
              </div>
              <input 
                type="text" 
                placeholder="Search journal..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#E8E4D9] text-[#1E4D45] placeholder:text-[#1E4D45]/50 rounded-md py-3.5 pl-11 pr-6 outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm text-xs font-mono"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CURATED COLLECTIONS */}
      <div className="pt-16 pb-4 overflow-hidden relative z-10">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-between items-end border-b border-[#E8E4D9] pb-4"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B8860B] uppercase mb-1 block">REGIONAL LOGBOOKS</span>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1E4D45]">
                Curated Collections
              </Heading>
            </div>
          </motion.div>
        </Container>

        {/* Compact Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-8 pt-2 px-4 md:px-12 xl:px-24 gap-6 snap-x snap-mandatory hide-scrollbar">
          {filteredCollections.map((collection, i) => (
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
              <div className="bg-[#FFFFFF] border border-[#E8E4D9] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="h-[140px] overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={`Curated collection of travel stories for ${collection.title}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F0] border border-[#D4AF37]/30 rounded px-2 py-0.5 shadow-sm">
                    <Text size="xs" variant="none" className="uppercase tracking-widest text-[#B8860B] font-mono text-[9px] font-bold">
                      {collection.articles.length} Stories
                    </Text>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-[#FAF7F0]/30">
                  <Heading as="h3" size="lg" font="serif" className="text-[#1E4D45] truncate text-base">
                    {highlightText(collection.title, searchQuery)}
                  </Heading>
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F0] border border-[#E8E4D9] flex items-center justify-center text-[#1E4D45] group-hover:bg-[#1E4D45] group-hover:text-white transition-colors">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer */}
          <div className="w-4 md:w-12 xl:w-24 shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* FEATURED STORIES - POLAROID WALL */}
      <div className="py-12">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex justify-between items-end border-b border-[#E8E4D9] pb-4"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B8860B] uppercase mb-1 block">TRAVEL DIARIES</span>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1E4D45]">
                Featured Stories
              </Heading>
            </div>
          </motion.div>

          {/* Polaroid Layout Staggered Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 xl:gap-14 px-2">
            {filteredStories.length === 0 ? (
              <div className="col-span-3 py-16 text-center text-[#555555]/50 text-sm font-light font-mono">
                No stories logged for "{searchQuery}".
              </div>
            ) : filteredStories.map((story, i) => {
              const rotAngle = getAngle(i);
              return (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ transform: `rotate(${rotAngle}deg)` }}
                  className="polaroid-frame group cursor-pointer bg-white"
                  onClick={() => openArticle(story)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0] border border-black/5">
                    <img 
                      src={story.image} 
                      alt={`Featured travel story: ${story.title}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF7F0]/90 text-[8px] tracking-widest text-[#B8860B] font-mono border border-[#D4AF37]/35 rounded px-2 py-0.5 shadow-sm">
                      FEATURED
                    </div>
                  </div>
                  
                  {/* Title & Caption */}
                  <div className="pt-5 pb-1 text-left">
                    <h3 className="font-serif text-base font-bold text-[#1E4D45] group-hover:text-[#B8860B] transition-colors leading-snug line-clamp-2">
                      {highlightText(story.title, searchQuery)}
                    </h3>
                    <p className="text-[11px] text-[#555555] font-light leading-relaxed mt-2 line-clamp-3">
                      {highlightText(story.intro || '', searchQuery)}
                    </p>
                    <div className="flex items-center text-[#B8860B] font-mono text-[9px] tracking-widest uppercase mt-4">
                      READ RECORD ➔
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>

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

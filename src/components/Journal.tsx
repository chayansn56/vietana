import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
import Button from './ui/Button';
import Input from './ui/Input';
import Icon from './ui/Icon';
import { magazineData, Article } from '../data/notesMagazine';
import NotesSideSheet from './NotesSideSheet';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';

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

const Journal: React.FC<{ limit?: number }> = ({ limit }) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();
  const filteredStories = q
    ? magazineData.featured.filter(s =>
      s.title.toLowerCase().includes(q) || s.intro?.toLowerCase().includes(q)
    )
    : magazineData.featured;

  const displayedStories = limit ? filteredStories.slice(0, limit) : filteredStories;
  const filteredCollections = q
    ? magazineData.collections.filter(c =>
      c.title.toLowerCase().includes(q)
    )
    : magazineData.collections;

  const selectedCollection = magazineData.collections.find(c => c.id === selectedCollectionId) || magazineData.collections[0];

  const openArticle = (article: Article) => {
    setActiveArticle(article);
  };

  // Staggered angles for Polaroid collage feel
  const getAngle = (index: number) => {
    const angles = [-2, 1.5, -1, 2, -1.8, 1.2];
    return angles[index % angles.length];
  };

  return (
    <div id="journal" className="notebook-paper min-h-screen text-[#111111] pb-24 relative overflow-hidden">
      {/* Side Sheet */}
      <NotesSideSheet
        isOpen={activeArticle !== null}
        onClose={() => setActiveArticle(null)}
        article={activeArticle}
      />

      {/* PANORAMIC HEADER */}
      {/* PANORAMIC HEADER */}
      <div className="relative min-h-[350px] md:h-[360px] w-full overflow-hidden border-b border-[#E8E4D9] flex items-center py-12 md:py-0">
        <img 
          src="/journal_bg.png" 
          alt="VIETANA Journal" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability without blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] via-transparent to-transparent" />
        
        <div className="relative w-full z-10 px-4 md:px-10 mt-6 md:mt-8">
          <Container className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left text-white flex-1 max-w-xl"
            >
              <Heading as="h2" size="4xl" font="serif" className="mb-2 drop-shadow-md tracking-wide text-white">
                Notes From Vietnam
              </Heading>
              <Text size="sm" className="font-light opacity-90 drop-shadow-sm max-w-lg mb-6">
                Stories, letters, and regional maps logbook.
              </Text>

              {/* Apple Style Search Bar */}
              <div className="max-w-md relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Icon name="Search" size={15} className="text-[#1E4D45] dark:text-[#AAB7A1]" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search journal..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF7F0] dark:bg-[#1A2120] border border-[#E8E4D9] dark:border-white/10 text-[#1E4D45] dark:text-white placeholder:text-[#1E4D45]/50 dark:placeholder:text-[#AAB7A1]/50 rounded-md py-3.5 pl-11 pr-6 outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm text-xs font-mono"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full md:w-[350px] glass-dark border border-white/10 rounded-2xl p-6 text-left relative overflow-hidden shadow-lg"
            >
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2 block">SHARE YOUR JOURNEY</span>
              <Heading as="h3" size="lg" font="serif" className="mb-2 text-white leading-tight">
                Send Your Own Story
              </Heading>
              <Text size="xs" className="font-light opacity-80 mb-5 leading-relaxed text-[#E8E4D9]">
                Every traveler sees Vietnam differently. Whether it's a hidden café or a misty morning, we'd love to feature your memories.
              </Text>
              <button 
                onClick={() => window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, "please this is my story upload it on vietana JOURNAL ."), '_blank')}
                className="w-full py-2.5 px-4 bg-brand-gold hover:bg-brand-gold-light text-[#111111] font-bold tracking-wider uppercase text-[10px] rounded-lg shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Icon name="MessageCircle" size={14} className="group-hover:scale-110 transition-transform" />
                Message Us on WhatsApp
              </button>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* CURATED COLLECTIONS */}
      <div className="pt-16 pb-4 overflow-hidden relative z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-between items-end border-b border-border-divider pb-4"
          >
            <div>
              <span className="text-xs font-bold tracking-wide-em text-brand-sage uppercase mb-1 block">REGIONAL LOGBOOKS</span>
              <Heading as="h2" size="2xl" font="serif" className="text-brand-green">
                Curated Collections
              </Heading>
            </div>
          </motion.div>
        </Container>

        {/* Compact Horizontal Scroll */}
        {filteredCollections.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-text-subtle/60 text-sm font-light mb-2">No collections match "{searchQuery}".</p>
            <p className="text-xs text-text-subtle/50 font-light">Clear the search to browse all collections.</p>
            <Button
              variant="secondary" size="sm"
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs font-semibold tracking-wider uppercase"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-8 pt-2 px-4 md:px-12 xl:px-24 gap-6 snap-x snap-mandatory hide-scrollbar">
            {filteredCollections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`shrink-0 w-[240px] md:w-[280px] snap-center group cursor-pointer border-2 rounded-2xl p-1 transition-all duration-300 ${selectedCollectionId === collection.id ? 'border-brand-gold-muted scale-[1.02] shadow-md bg-white/50' : 'border-transparent'
                  }`}
                onClick={() => setSelectedCollectionId(collection.id)}
              >
                <div className="bg-white dark:bg-surface-dark border border-border-divider dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="h-[140px] overflow-hidden relative">
                    <img
                      src={collection.image}
                      alt={`Curated collection of travel stories for ${collection.title}`}
                      className="w-full h-full object-cover img-zoom"
                    />
                    <div className="absolute top-3 left-3 bg-surface-linen dark:bg-surface-dark border border-brand-gold/30 dark:border-white/10 rounded px-2 py-0.5 shadow-sm">
                      <Text size="xs" variant="none" className="uppercase tracking-widest text-brand-sage font-mono text-xs font-bold">
                        {collection.articles.length} Stories
                      </Text>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-surface-linen/30 dark:bg-black/20">
                    <Heading as="h3" size="lg" font="serif" className="text-brand-green dark:text-white truncate text-base">
                      {highlightText(collection.title, searchQuery)}
                    </Heading>
                    <div className="w-7 h-7 rounded-full bg-surface-linen dark:bg-surface-dark border border-border-divider dark:border-white/10 flex items-center justify-center text-brand-green dark:text-white group-hover:bg-brand-green group-hover:text-white transition-colors">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Spacer */}
            <div className="w-4 md:w-12 xl:w-24 shrink-0 pointer-events-none" />
          </div>
        )}

        {/* Active Collection Articles Display */}
        <Container className="mt-4 mb-8">
          <div className="bg-white/40 border border-[#E8E4D9] rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E8E4D9] pb-4 text-left">
              <Heading as="h3" size="xl" font="serif" className="text-[#1E4D45] flex items-center gap-2 m-0">
                <span className="text-xl">{selectedCollection.icon}</span> {selectedCollection.title} Guides
              </Heading>
              <span className="text-[10px] font-mono bg-[#B8860B]/10 text-[#B8860B] font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                {selectedCollection.articles.length} Journals Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {selectedCollection.articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="bg-white border border-border-divider rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full group"
                >
                  <div className="h-32 overflow-hidden relative border-b border-border-divider/40">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-brand-green line-clamp-2 mb-1.5 group-hover:text-brand-gold-muted transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-tiny text-text-subtle font-light line-clamp-3 leading-relaxed">
                        {article.intro}
                      </p>
                    </div>
                    <span className="text-tiny text-brand-gold-muted font-mono mt-4 block font-bold tracking-widest uppercase">
                      READ RECORD ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* FEATURED STORIES - POLAROID WALL */}
      <div className="py-12 relative z-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex justify-between items-end border-b-2 border-black/10 pb-4"
          >
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-brand-sage uppercase mb-1 block">TRAVEL DIARIES</span>
              <Heading as="h2" size="2xl" font="serif" className="text-brand-green">
                Featured Stories
              </Heading>
            </div>
          </motion.div>

          {/* Editorial Magazine Grid */}
          <div className="space-y-8">
            {filteredStories.length === 0 ? (
              <div className="py-16 text-center text-text-subtle/60 text-sm font-light">
                <p className="mb-2">No stories match "{searchQuery}".</p>
                <p className="text-xs">Try a different search or browse the curated collections above.</p>
              </div>
            ) : filteredStories.slice(0, limit).map((story, i) => {
              const rotAngle = getAngle(i);
              return (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ transform: `rotate(${rotAngle}deg)` }}
                  className="polaroid-frame group cursor-pointer bg-white p-4 pb-6 shadow-xl relative border border-gray-200"
                  onClick={() => openArticle(story)}
                >
                  <div className="tape"></div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0] border border-black/5">
                    <img 
                      src={story.image} 
                      alt={`Featured travel story: ${story.title}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.1] contrast-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF7F0]/90 text-[8px] tracking-widest text-[#B8860B] font-mono border border-[#D4AF37]/35 rounded px-2 py-0.5 shadow-sm">
                      FEATURED
                    </div>
                  </div>
                  
                  {/* Title & Caption */}
                  <div className="pt-5 pb-1 text-center">
                    <h3 className="font-serif text-lg font-bold text-[#1E4D45] group-hover:text-[#B8860B] transition-colors leading-snug line-clamp-2">
                      {highlightText(story.title, searchQuery)}
                    </h3>
                    <p className="text-[11px] text-[#555555] font-serif italic leading-relaxed mt-2 line-clamp-3">
                      {highlightText(story.intro || '', searchQuery)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>


      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .notebook-paper {
          background-color: #FAF7F0;
          background-image: 
            linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
            linear-gradient(#e1d9c1 1px, transparent 1px);
          background-size: 100% 32px;
        }
        .tape {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 90px;
          height: 28px;
          background-color: rgba(232, 228, 217, 0.9);
          border-left: 2px dashed rgba(0,0,0,0.15);
          border-right: 2px dashed rgba(0,0,0,0.15);
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          z-index: 20;
        }
      `}} />
    </div>
  );
};

export default Journal;

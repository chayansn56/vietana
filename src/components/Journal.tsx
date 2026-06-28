import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
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

const Journal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState('c1');
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] dark:from-[#111615] via-transparent to-transparent" />
        
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
              <span className="text-xs font-bold tracking-[0.25em] text-brand-sage uppercase mb-1 block">REGIONAL LOGBOOKS</span>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1E4D45]">
                Curated Collections
              </Heading>
            </div>
          </motion.div>
        </Container>

        {/* Compact Horizontal Scroll */}
        {filteredCollections.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#555555]/60 text-sm font-light mb-2">No collections match "{searchQuery}".</p>
            <p className="text-xs text-[#555555]/50 font-light">Clear the search to browse all collections.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-5 py-2 bg-[#1E4D45] text-white text-xs font-semibold tracking-wider uppercase rounded transition-colors hover:bg-[#12302B] cursor-pointer"
            >
              Clear Search
            </button>
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
              className={`shrink-0 w-[240px] md:w-[280px] snap-center group cursor-pointer border-2 rounded-2xl p-1 transition-all duration-300 ${
                selectedCollectionId === collection.id ? 'border-[#B8860B] scale-[1.02] shadow-md bg-white/50' : 'border-transparent'
              }`}
              onClick={() => setSelectedCollectionId(collection.id)}
            >
              <div className="bg-white dark:bg-[#1A2120] border border-[#E8E4D9] dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="h-[140px] overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={`Curated collection of travel stories for ${collection.title}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F0] dark:bg-[#111615] border border-[#D4AF37]/30 dark:border-white/10 rounded px-2 py-0.5 shadow-sm">
                    <Text size="xs" variant="none" className="uppercase tracking-widest text-brand-sage font-mono text-xs font-bold">
                      {collection.articles.length} Stories
                    </Text>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-[#FAF7F0]/30 dark:bg-black/20">
                  <Heading as="h3" size="lg" font="serif" className="text-[#1E4D45] dark:text-white truncate text-base">
                    {highlightText(collection.title, searchQuery)}
                  </Heading>
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F0] dark:bg-[#111615] border border-[#E8E4D9] dark:border-white/10 flex items-center justify-center text-[#1E4D45] dark:text-white group-hover:bg-[#1E4D45] group-hover:text-white transition-colors">
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
            <div className="flex justify-between items-center mb-8 border-b border-[#E8E4D9] pb-4">
              <Heading as="h3" size="xl" font="serif" className="text-[#1E4D45] flex items-center gap-2">
                <span className="text-xl">{selectedCollection.icon}</span> {selectedCollection.title} Guides
              </Heading>
              <span className="text-xs font-mono bg-brand-sage/10 text-brand-sage font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedCollection.articles.length} Journals Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {selectedCollection.articles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => openArticle(article)}
                  className="bg-white border border-[#E8E4D9] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full group"
                >
                  <div className="h-32 overflow-hidden relative border-b border-[#E8E4D9]/40">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1E4D45] line-clamp-2 mb-1.5 group-hover:text-[#B8860B] transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-[#555555] font-light line-clamp-3 leading-relaxed">
                        {article.intro}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#B8860B] font-mono mt-4 block font-bold tracking-widest uppercase">
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
      <div className="py-12">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex justify-between items-end border-b border-[#E8E4D9] pb-4"
          >
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-brand-sage uppercase mb-1 block">TRAVEL DIARIES</span>
              <Heading as="h2" size="2xl" font="serif" className="text-[#1E4D45]">
                Featured Stories
              </Heading>
            </div>
          </motion.div>

          {/* Editorial Magazine Grid */}
          <div className="space-y-8">
            {filteredStories.length === 0 ? (
              <div className="py-16 text-center text-[#555555]/60 text-sm font-light">
                <p className="mb-2">No stories match "{searchQuery}".</p>
                <p className="text-xs">Try a different search or browse the curated collections above.</p>
              </div>
            ) : (
              <>
                {/* Hero story — full-width, image-led */}
                {filteredStories[0] && (
                  <motion.div
                    key={filteredStories[0].id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-[#E8E4D9] shadow-sm transition-all duration-500 hover:shadow-lg"
                    onClick={() => openArticle(filteredStories[0])}
                  >
                    <div className="md:grid md:grid-cols-2 md:gap-0">
                      <div className="h-56 md:h-full min-h-[280px] overflow-hidden">
                        <img 
                          src={filteredStories[0].image} 
                          alt={`Featured travel story: ${filteredStories[0].title}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 md:p-10 flex flex-col justify-center">
                        <span className="text-brand-sage text-[11px] font-bold tracking-widest uppercase mb-2">Featured Story</span>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E4D45] group-hover:text-[#B8860B] transition-colors leading-tight mb-3">
                          {highlightText(filteredStories[0].title, searchQuery)}
                        </h3>
                        <p className="text-sm text-[#555555] font-light leading-relaxed line-clamp-3 mb-6">
                          {highlightText(filteredStories[0].intro || '', searchQuery)}
                        </p>
                        <span className="text-[#B8860B] font-mono text-xs tracking-widest uppercase inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read Record <span className="text-lg leading-none">→</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Remaining stories — horizontal editorial cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredStories.slice(1).map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-[#E8E4D9] shadow-sm transition-all duration-500 hover:shadow-lg"
                      onClick={() => openArticle(story)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={story.image} 
                          alt={`Featured travel story: ${story.title}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-bold text-[#1E4D45] group-hover:text-[#B8860B] transition-colors leading-snug line-clamp-2 mb-2">
                          {highlightText(story.title, searchQuery)}
                        </h3>
                        <p className="text-sm text-[#555555] font-light leading-relaxed line-clamp-2 mb-4">
                          {highlightText(story.intro || '', searchQuery)}
                        </p>
                        <span className="text-[#B8860B] font-mono text-[11px] tracking-widest uppercase inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Read <span className="text-base leading-none">→</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>
      </div>

      {/* SUBMIT STORY CTA */}
      <div className="py-16 bg-[#1E4D45] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <Container>
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto py-8">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-sage uppercase mb-4 block">SHARE YOUR JOURNEY</span>
            <Heading as="h2" size="3xl" font="serif" className="mb-6 text-white drop-shadow-md">
              Send Your Own Story
            </Heading>
            <Text size="md" className="font-light opacity-90 mb-10 leading-relaxed text-[#E8E4D9]">
              Every traveler sees Vietnam differently. Whether it's a hidden café in Hanoi or a misty morning in Sapa, we'd love to feature your travel memories in our journal. 
            </Text>
            <button 
              onClick={() => window.open(buildWhatsAppLink(WHATSAPP_NUMBERS.DEFAULT, "please this is my story upload it on vietana JOURNAL ."), '_blank')}
              className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-[#111111] font-bold tracking-widest uppercase text-sm rounded-full shadow-[0_8px_32px_rgba(201,168,76,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.5)] transition-all duration-300 flex items-center gap-3 cursor-pointer group"
            >
              <Icon name="MessageCircle" size={20} className="group-hover:scale-110 transition-transform" />
              Message Us on WhatsApp
            </button>
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

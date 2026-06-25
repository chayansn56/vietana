import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import { Article } from '../data/notesMagazine';

interface NotesSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const NotesSideSheet: React.FC<NotesSideSheetProps> = ({ isOpen, onClose, article }) => {
  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1900] bg-[#1D1D1F]/40 backdrop-blur-sm"
          />

          {/* Side Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[2000] h-full w-[100%] md:w-[80%] max-w-4xl bg-[#FAF8F3] shadow-2xl overflow-y-auto md:rounded-l-[32px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              <Icon name="X" size={24} className="text-[#1D1D1F]" />
            </button>

            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                <Heading as="h1" size="4xl" font="serif" className="mb-4">
                  {article.title}
                </Heading>
                <Text size="xl" className="font-light opacity-90 max-w-2xl">
                  {article.intro}
                </Text>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 max-w-3xl">
              {article.isComingSoon ? (
                <div className="bg-white rounded-[24px] p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#1D1D1F]/5">
                  <span className="text-4xl block mb-4">✍️</span>
                  <Heading as="h3" size="2xl" font="serif" className="mb-4 text-[#1D1D1F]">
                    Currently Crafting
                  </Heading>
                  <Text className="text-[#1D1D1F]/60">
                    Our team is currently on the ground gathering the best insights, photos, and recommendations for this guide. It will be available soon.
                  </Text>
                </div>
              ) : article.sections && article.sections.length > 0 ? (
                <div className="space-y-12">
                  {article.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      {section.heading && (
                        <Heading as="h2" size="2xl" font="serif" className="text-[#1D1D1F] border-b border-[#1D1D1F]/10 pb-4 mb-6">
                          {section.heading}
                        </Heading>
                      )}
                      {section.paragraphs?.map((p, pIdx) => (
                        <Text key={pIdx} size="lg" className="text-[#1D1D1F]/80 leading-relaxed">
                          {p}
                        </Text>
                      ))}
                      {section.list && section.list.length > 0 && (
                        <ul className="list-disc pl-6 space-y-3 mt-4 text-lg text-[#1D1D1F]/80 leading-relaxed marker:text-brand-gold">
                          {section.list.map((item, lIdx) => (
                            <li key={lIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* External Source Card */}
                  <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#1D1D1F]/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <Text size="sm" weight="semibold" className="uppercase tracking-widest text-[#1D1D1F]/50 mb-2">
                        Curated Guide
                      </Text>
                      <Heading as="h4" size="xl" font="serif" className="text-[#1D1D1F] mb-2">
                        Read on {article.sourceName || 'External Source'}
                      </Heading>
                      <Text className="text-[#1D1D1F]/60">
                        We've selected this as one of the best resources available on the web for this topic.
                      </Text>
                    </div>
                    
                    {article.sourceUrl && (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-[#1D1D1F] text-white px-8 py-4 rounded-full font-medium hover:bg-[#1D1D1F]/90 transition-colors flex items-center gap-2"
                      >
                        Read Full Guide <span className="ml-1">→</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-8 border-t border-[#1D1D1F]/10">
                    <Text className="text-[#1D1D1F]/40 italic text-center">
                      VIETANA™ is building the ultimate digital travel magazine. Right now, we curate the best external resources. Soon, this will be replaced with our own exclusive, on-the-ground guides.
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotesSideSheet;

import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';

const JOURNAL_ARTICLES = [
  {
    category: 'Video',
    title: 'Cinematic Vietnam: A Visual Journey',
    type: 'video',
    src: '/videos/journal.mp4',
    date: 'Jan 15'
  },
  {
    category: 'Guides',
    title: 'The Ultimate First-Timer’s Guide to Ho Chi Minh City',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    date: 'Oct 12'
  },
  {
    category: 'Food',
    title: 'Navigating Vietnamese Street Food as a Vegetarian',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?w=800&q=80',
    date: 'Nov 04'
  }
];

const Journal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section id="journal" spacing="lg" className="bg-[#fcfaf8] text-black border-t border-black/10">
      <Container>
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-black/20 pb-8">
          <div>
            <Text size="sm" className="uppercase tracking-widest text-brand-gold font-bold mb-4">
              The Vietana Journal
            </Text>
            <Heading as="h2" size="4xl" font="serif" className="tracking-tight text-black">
              Stories & Insights
            </Heading>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 border border-black rounded-full text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300">
            Read All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {JOURNAL_ARTICLES.map((article, idx) => (
            <div key={idx} className="group flex flex-col">
              <div className="w-full aspect-[4/5] overflow-hidden mb-6 rounded-lg bg-black">
                {article.type === 'video' ? (
                  <div className="relative w-full h-full cursor-pointer">
                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={article.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 cursor-pointer group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-black/50 font-semibold cursor-pointer">
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>
              <Heading as="h3" size="xl" font="serif" className="leading-snug cursor-pointer group-hover:text-brand-gold transition-colors duration-300">
                {article.title}
              </Heading>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Journal;

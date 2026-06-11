import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';

const JOURNAL_ARTICLES = [
  {
    category: 'Guides',
    title: 'The Ultimate First-Timer’s Guide to Ho Chi Minh City',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    date: 'Oct 12'
  },
  {
    category: 'Food',
    title: 'Navigating Vietnamese Street Food as a Vegetarian',
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?w=800&q=80',
    date: 'Nov 04'
  },
  {
    category: 'Culture',
    title: 'Understanding the Lantern Festival of Hoi An',
    img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80',
    date: 'Dec 22'
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
            <div key={idx} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-[4/5] overflow-hidden mb-6 rounded-lg">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-black/50 font-semibold">
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>
              <Heading as="h3" size="xl" font="serif" className="leading-snug group-hover:text-brand-gold transition-colors duration-300">
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

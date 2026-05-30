import React from 'react';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import BrandName from './ui/BrandName';

const TIMELINE = [
  {
    year: 'The Vision',
    title: 'Bridging Two Worlds',
    desc: 'VIETANA wasn\'t just born out of a business idea; it was born out of a genuine love for two incredible cultures. When our founder first arrived in Vietnam, it was love at first sight with the breathtaking landscapes and vibrant energy.',
    img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80',
    align: 'left'
  },
  {
    year: 'The Challenge',
    title: 'Navigating The Unknown',
    desc: 'However, navigating local nuances as an Indian traveler came with its own set of unique challenges—from finding the right familiar flavors, understanding dietary restrictions, to communicating in the local language.',
    img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    align: 'right'
  },
  {
    year: 'The Solution',
    title: 'Boots on the Ground',
    desc: 'We realized Indian travelers needed a bridge. Someone who deeply understands the craving for a warm cup of masala chai or a comforting dal, but also someone deeply rooted in Vietnam to unlock its absolute best-kept secrets.',
    img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80',
    align: 'left'
  },
  {
    year: 'The Promise',
    title: 'Your Family in Vietnam',
    desc: '"When you travel with us, you aren\'t just a tourist or a booking number. You become part of our extended family. From the moment you land to your very last dinner, we handle everything locally from Ho Chi Minh City."',
    img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=800&q=80',
    align: 'right'
  }
];

const About: React.FC = () => {
  return (
    <Section id="about" variant="cream" spacing="lg" className="overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none" />
      
      <Container>
        <div className="text-center mb-24 reveal">
          <Text size="xs" variant="accent" weight="bold" className="uppercase tracking-[0.3em] text-brand-gold mb-4">
            The <BrandName /> Story
          </Text>
          <Heading as="h2" size="3xl" font="serif" className="text-brand-green-dark">
            Created for Indian Travelers,<br />
            <span className="italic text-brand-green-light font-light">by Locals who Care.</span>
          </Heading>
        </div>

        {/* TIMELINE WRAPPER */}
        <div className="relative max-w-5xl mx-auto py-10">
          
          {/* VERTICAL LINE (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent -translate-x-1/2" />
          
          {/* VERTICAL LINE (Mobile) */}
          <div className="block md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />

          <div className="flex flex-col gap-20 md:gap-32 relative z-10">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 reveal ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Node (Center Dot) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(201,168,76,0.6)] z-20" />
                
                {/* Timeline Node (Mobile) */}
                <div className="flex md:hidden absolute left-4 top-10 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(201,168,76,0.6)] z-20" />

                {/* IMAGE HALF */}
                <div className="flex-1 w-full pl-10 md:pl-0">
                  <div className={`relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-700 hover:scale-105 ${item.align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-green-dark/10 mix-blend-multiply" />
                  </div>
                </div>

                {/* TEXT HALF */}
                <div className="flex-1 w-full pl-10 md:pl-0">
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-black/5 w-full relative z-10 hover:shadow-2xl transition-shadow duration-300">
                    <Text size="xs" weight="bold" className="uppercase tracking-[0.2em] text-brand-gold mb-3 inline-block bg-brand-gold/10 px-3 py-1 rounded-full">
                      {item.year}
                    </Text>
                    <Heading as="h3" size="xl" font="serif" className="text-brand-green-dark mb-4 leading-tight">
                      {item.title}
                    </Heading>
                    <Text variant="muted" size="lg" className="leading-relaxed font-light text-text-dark">
                      {item.desc}
                    </Text>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 text-center reveal">
          <div className="w-20 h-px bg-brand-gold/50 mx-auto mb-8" />
          <Heading as="h4" size="lg" font="serif" className="text-brand-green-dark mb-4">
            Ready to experience Vietnam like a local?
          </Heading>
          <Text variant="subtle" className="mb-8 font-light max-w-md mx-auto">
            Travel Gets Better with <BrandName />. Join our extended family today.
          </Text>
        </div>
      </Container>
    </Section>
  );
};

export default About;


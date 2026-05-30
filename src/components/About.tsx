import React from 'react';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Grid from './ui/Grid';
import BrandName from './ui/BrandName';

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80', t: 'Indian family in Hoi An' },
  { img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80', t: 'Exploring Ha Long Bay' },
  { img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=800&q=80', t: 'Sunrise in Mu Cang Chai' },
  { img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80', t: 'Coffee culture in HCMC' },
  { img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80', t: 'Rice fields of Sapa' }
];

const About: React.FC = () => {
  return (
    <Section id="about" variant="cream" spacing="lg">
      <Container>
        <SectionHeader 
          label="The <BrandName /> Story"
          title="Created for Indian Travelers by Locals who Care"
        />
      </Container>

      <div className="my-16 w-full relative reveal">
        <div className="flex gap-8 animate-slide w-fit">
          {[...GALLERY, ...GALLERY].map((item, i) => (
            <div key={i} className="group w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-xl overflow-hidden relative flex-shrink-0">
              <div className="absolute inset-[-15%] z-0 scroll-parallax-slow">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-smooth group-hover:scale-110" 
                  style={{ backgroundImage: `url(${item.img})` }}
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                <Text variant="white" size="sm" weight="medium">{item.t}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className="reveal max-w-4xl mx-auto text-left bg-white/5 p-8 md:p-12 rounded-3xl border border-brand-gold/20 shadow-xl backdrop-blur-sm">
          <Heading as="h3" size="xl" className="mb-8 text-brand-gold text-center font-serif">Our Story: Bridging Two Worlds</Heading>
          
          <Text variant="subtle" weight="light" className="mb-6 text-lg leading-relaxed">
            <BrandName /> wasn't just born out of a business idea; it was born out of a genuine love for two incredible cultures. When our founder first arrived in Vietnam, it was love at first sight with the breathtaking landscapes, the warmth of the people, and the vibrant energy of the streets. However, navigating the local nuances as an Indian traveler came with its own set of unique challenges—from finding the right familiar flavors to understanding the local language.
          </Text>
          
          <Text variant="subtle" weight="light" className="mb-6 text-lg leading-relaxed">
            We realized that Indian travelers needed a bridge. Someone who deeply understands the craving for a warm cup of masala chai or a comforting dal after days of exploring, but also someone deeply rooted in Vietnam to unlock its absolute best-kept secrets. That's exactly how <BrandName /> was created: to be that trusted local friend waiting for you in Vietnam.
          </Text>
          
          <Text variant="subtle" weight="light" className="text-lg leading-relaxed italic border-l-4 border-brand-gold pl-6 py-2">
            "When you travel with us, you aren't just a tourist or a booking number. You become part of our extended family. From the moment you land to your very last dinner, we handle everything so you can focus on making lifelong memories."
          </Text>
          
          <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
            <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xl border border-brand-gold/50">
              V
            </div>
            <div>
              <Text variant="white" weight="bold" size="lg">The <BrandName /> Team</Text>
              <Text variant="subtle" size="sm">Your Family in Vietnam</Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;

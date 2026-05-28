import React from 'react';
import SectionHeader from './ui/SectionHeader';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Grid from './ui/Grid';

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
          label="The VIETANA Story"
          title="Created for Indian Travelers by Locals who Care"
        />
      </Container>

      <div className="my-16 w-full relative reveal">
        <div className="flex gap-8 animate-[slide_40s_linear_infinite] w-fit">
          {[...GALLERY, ...GALLERY].map((item, i) => (
            <div key={i} className="group w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-xl overflow-hidden relative flex-shrink-0">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-smooth group-hover:scale-110" 
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <Text variant="white" size="sm" className="font-medium">{item.t}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <Grid cols={2} gap={16} className="reveal">
          <div>
            <Heading as="h3" className="text-2xl mb-4">Our Mission</Heading>
            <Text variant="subtle" className="font-light">
              To make Vietnam the most accessible and loved destination for Indian travelers, bridge cultures, and create lifelong memories.
            </Text>
          </div>
          <div>
            <Heading as="h3" className="text-2xl mb-4">Local Expertise</Heading>
            <Text variant="subtle" className="font-light">
              Based in Ho Chi Minh City, our team understands both Indian preferences and Vietnamese culture perfectly.
            </Text>
          </div>
        </Grid>
      </Container>

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  );
};

export default About;

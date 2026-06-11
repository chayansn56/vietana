import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import BrandName from './ui/BrandName';

const TEAM_MEMBERS = [
  {
    name: "Nguyen Van A",
    role: "Local Concierge, Ho Chi Minh",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    quote: "I love showing our guests the hidden alleys where the best Pho is made."
  },
  {
    name: "Priya Sharma",
    role: "India Travel Specialist",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    quote: "Bridging the gap between Indian preferences and Vietnamese culture is my passion."
  },
  {
    name: "Tran Thi B",
    role: "Experience Curator, Hoi An",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    quote: "Every lantern here has a story. Let me tell you ours."
  }
];

const Team: React.FC = () => {
  return (
    <Section id="team" spacing="lg" className="bg-white text-black relative">
      <Container>
        <div className="mb-20 text-center flex flex-col items-center">
          <Heading as="h2" size="4xl" font="serif" className="mb-6 tracking-tight text-black">
            Meet Your Local Experts
          </Heading>
          <Text size="lg" className="text-black/70 max-w-2xl font-light">
            We are real people. A blend of Indian travel specialists and local Vietnamese experts, 
            working together to ensure your journey is flawless from takeoff to touchdown.
          </Text>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-black/10 py-12">
          <div className="text-center">
            <Heading as="div" size="4xl" font="sans" className="font-bold text-brand-gold mb-2">5000+</Heading>
            <Text size="sm" className="uppercase tracking-wider font-semibold text-black/60">Indian Travelers</Text>
          </div>
          <div className="text-center">
            <Heading as="div" size="4xl" font="sans" className="font-bold text-brand-green mb-2">24/7</Heading>
            <Text size="sm" className="uppercase tracking-wider font-semibold text-black/60">Local Support</Text>
          </div>
          <div className="text-center">
            <Heading as="div" size="4xl" font="sans" className="font-bold text-brand-blue mb-2">15+</Heading>
            <Text size="sm" className="uppercase tracking-wider font-semibold text-black/60">Local Experts</Text>
          </div>
          <div className="text-center">
            <Heading as="div" size="4xl" font="sans" className="font-bold text-black mb-2">4.9/5</Heading>
            <Text size="sm" className="uppercase tracking-wider font-semibold text-black/60">Customer Rating</Text>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-full max-w-[280px] aspect-[3/4] rounded-sm overflow-hidden mb-6 shadow-xl relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
              <Heading as="h4" size="xl" className="mb-1 font-semibold">
                {member.name}
              </Heading>
              <Text size="sm" className="text-brand-gold uppercase tracking-wider font-bold mb-4">
                {member.role}
              </Text>
              <Text size="md" className="italic text-black/60 max-w-sm">
                "{member.quote}"
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Team;

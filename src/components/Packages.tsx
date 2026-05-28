import React, { useRef } from 'react';
import { PACKAGES } from '../config';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Grid from './ui/Grid';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';

interface PackageItem {
  t: string;
  img: string;
  b: string;
  d: string;
}

const PackageCard: React.FC<{ p: PackageItem, onClick: () => void }> = ({ p, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-10px)`;
    cardRef.current.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    cardRef.current.style.boxShadow = '';
  };

  return (
    <div 
      ref={cardRef}
      className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 ease-smooth reveal" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-[-4%] bg-cover bg-center transition-transform duration-900 ease-smooth group-hover:scale-[1.09] group-hover:-translate-y-[2%] will-change-transform" style={{ backgroundImage: `url('${p.img}')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-extra-dark/95 via-brand-green-dark/65 to-black/10 transition-all duration-600 ease-soft group-hover:from-brand-green-extra-dark group-hover:via-brand-green-dark/75 group-hover:to-black/15" />
      <div className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.09),transparent_65%)] transition-opacity duration-700 group-hover:opacity-100" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-9">
        <Badge className="mb-4 bg-brand-gold text-brand-green-dark shadow-medium border-none">
          {p.b}
        </Badge>
        <Heading as="h3" className="text-white text-2xl mb-1.5">
          {p.t}
        </Heading>
        <Text variant="white" size="sm" className="opacity-70 italic mb-1">
          {p.d}
        </Text>
        
        <div className="mt-5 opacity-0 translate-y-3.5 transition-all duration-450 delay-50 group-hover:opacity-100 group-hover:translate-y-0 ease-smooth">
          <Button 
            variant="glass" 
            size="sm" 
            className="group/btn px-5 py-2.5 text-[0.77rem] tracking-wider"
          >
            Customize Trip <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface PackagesProps {
    onOpenBuilder: () => void;
}

const Packages: React.FC<PackagesProps> = ({ onOpenBuilder }) => {
  return (
    <Section id="packages" variant="cream" spacing="lg">
      <Container>
        <SectionHeader 
          label="Our Packages"
          title="Inspiration, Not Fixed Products"
          description="Every package is a starting point. We customize everything around your travel style."
        />
        
        <Grid cols={3} gap={8} className="max-w-6xl mx-auto">
          {(PACKAGES as PackageItem[]).map((p, i) => (
            <PackageCard key={i} p={p} onClick={onOpenBuilder} />
          ))}

          {/* CUSTOM BUILDER CARD */}
          <div 
            className="col-span-full flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 rounded-[24px] border border-brand-gold cursor-pointer bg-cover bg-center relative overflow-hidden group reveal" 
            style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }}
            onClick={onOpenBuilder}
          >
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4 bg-brand-gold text-brand-green-dark shadow-medium border-none">
                Fully Custom
              </Badge>
              <Heading as="h3" className="text-brand-gold text-3xl md:text-5xl font-serif font-normal mt-2 mb-4">
                Build Your Own Story
              </Heading>
              <Text variant="white" className="text-base md:text-xl font-light opacity-80">
                Select your cities, travel style, and let us do the rest.
              </Text>
            </div>
            
            <Button 
              variant="glass"
              className="w-full md:w-auto px-10 py-5 border-brand-gold text-white group/btn"
            >
              Open Trip Builder <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
            </Button>
          </div>
        </Grid>
      </Container>
    </Section>
  );
};

export default Packages;

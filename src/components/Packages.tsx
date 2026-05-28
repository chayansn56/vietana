import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { PACKAGES } from '../data/siteContent';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import Grid from './ui/Grid';
import Card from './ui/Card';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';

interface PackageItem {
  t: string;
  img: string;
  b: string;
  d: string;
}

const PackageCard: React.FC<{ p: PackageItem, onClick: () => void }> = ({ p, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -10 }}
      className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-medium hover:shadow-strong transition-shadow duration-500 reveal" 
    >
      <div 
        style={{ 
          backgroundImage: `url('${p.img}')`,
          transform: "translateZ(-20px)",
        }} 
        className="absolute inset-[-4%] bg-cover bg-center transition-transform duration-900 ease-smooth group-hover:scale-[1.09] group-hover:-translate-y-[2%] will-change-transform" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-extra-dark/95 via-brand-green-dark/65 to-black/10 transition-all duration-600 ease-soft group-hover:from-brand-green-extra-dark group-hover:via-brand-green-dark/75 group-hover:to-black/15" />
      <div className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.09),transparent_65%)] transition-opacity duration-700 group-hover:opacity-100" />
      
      <div 
        className="absolute bottom-0 left-0 right-0 p-8 pt-9"
        style={{ transform: "translateZ(30px)" }}
      >
        <Badge variant="gold-filled" className="mb-4">
          {p.b}
        </Badge>
        <Heading as="h3" size="md" variant="white" className="mb-1.5">
          {p.t}
        </Heading>
        <Text variant="white" size="sm" className="opacity-70 italic mb-1">
          {p.d}
        </Text>
        
        <div className="mt-5 opacity-0 translate-y-3.5 transition-all duration-450 delay-50 group-hover:opacity-100 group-hover:translate-y-0 ease-smooth">
          <Button 
            variant="glass" 
            size="sm" 
            className="group/btn px-5 py-2.5 text-xs tracking-wider"
          >
            Customize Trip <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
          </Button>
        </div>
      </div>
    </motion.div>
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
          <Card 
            padding="none"
            hover={false}
            className="col-span-full flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 border-brand-gold bg-cover bg-center relative overflow-hidden group reveal" 
            style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }}
            onClick={onOpenBuilder}
          >
            <div className="flex-1 text-center md:text-left relative z-10">
              <Badge variant="gold-filled" className="mb-4">
                Fully Custom
              </Badge>
              <Heading as="h3" size="2xl" variant="accent" className="mt-2 mb-4">
                Build Your Own Story
              </Heading>
              <Text variant="white" size="xl" className="opacity-80">
                Select your cities, travel style, and let us do the rest.
              </Text>
            </div>

            
            <Button 
              variant="glass"
              className="w-full md:w-auto px-10 py-5 border-brand-gold text-white group/btn relative z-10"
            >
              Open Trip Builder <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
            </Button>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
};

export default Packages;

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

const PackageCard: React.FC<{ p: PackageItem, onClick: (dest?: string[]) => void }> = ({ p, onClick }) => {
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
      onClick={() => onClick(p.destinations)}
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
      <div className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(202,138,4,0.15),transparent_65%)] transition-opacity duration-700 group-hover:opacity-100" />
      
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
    onOpenBuilder: (dest?: string[]) => void;
}

const Packages: React.FC<PackagesProps> = ({ onOpenBuilder }) => {
  return (
    <Section id="experiences" spacing="lg" className="bg-[#111111] text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="scroll-parallax absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]">
          <div className="w-full h-full bg-brand-gold/5 rounded-full  hidden animate-blob-float mix-blend-multiply opacity-60" />
        </div>
        <div className="scroll-parallax-slow absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px]">
          <div className="w-full h-full bg-brand-green/5 rounded-full  hidden animate-blob-float mix-blend-multiply opacity-50" style={{ animationDelay: '3s' }} />
        </div>
      </motion.div>
      <Container className="relative z-10 w-full max-w-[1400px]">
        <div className="mb-20 reveal flex flex-col items-start text-left">
          <Heading as="h2" size="4xl" font="serif" className="inline-block mb-4 tracking-tight text-white drop-shadow-sm">
            Curated Experiences
          </Heading>
          <Heading as="h3" size="xl" className="font-sans font-light text-white/80 tracking-wide max-w-2xl">
            Inspiration for your journey.
          </Heading>
          <Text size="md" className="text-white/60 mt-4 max-w-xl">
            Choose a theme, and we will build the perfect itinerary around it.
          </Text>
        </div>
        
        {/* Expanding Gallery Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] w-full mb-16">
          {(PACKAGES as PackageItem[]).map((p, i) => (
            <motion.div 
              key={i}
              onClick={() => onOpenBuilder(p.destinations)}
              className="group relative flex-1 hover:flex-[3] cursor-pointer rounded-sm overflow-hidden shadow-lg transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[150px] lg:min-h-full"
            >
              <div 
                style={{ backgroundImage: `url('${p.img}')` }} 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/40" />
              
              {/* Vertical Text (unhovered state) */}
              <div className="absolute inset-0 flex items-end lg:items-center justify-center p-6 opacity-100 lg:opacity-100 group-hover:lg:opacity-0 transition-opacity duration-300 delay-100">
                <Heading as="h3" size="lg" variant="white" className="lg:-rotate-90 whitespace-nowrap tracking-widest font-extrabold drop-shadow-lg">
                  {p.t}
                </Heading>
              </div>

              {/* Expanded Content (hovered state) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <Badge variant="gold-filled" className="mb-4 shadow-lg backdrop-blur-md bg-brand-gold/90">
                    {p.b}
                  </Badge>
                  <Heading as="h3" size="3xl" variant="white" className="mb-3 font-extrabold drop-shadow-xl">
                    {p.t}
                  </Heading>
                  <Text variant="white" size="lg" className="opacity-90 italic mb-6 max-w-lg drop-shadow-md">
                    {p.d}
                  </Text>
                  
                  <Button 
                    variant="glass" 
                    className="group/btn px-8 py-4 backdrop-blur-xl bg-white/10 border-white/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-white/20"
                  >
                    Customize Trip <span className="transition-transform duration-300 group-hover/btn:translate-x-2 ml-2">→</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CUSTOM BUILDER CARD */}
        <div 
          className="col-span-full flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 rounded-[2.5rem] bg-black/40 backdrop-blur-[40px] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:-translate-y-2" 
          onClick={() => onOpenBuilder([])}
        >
          <div className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }} />
          <div className="flex-1 text-center md:text-left relative z-10">
            <Badge variant="gold-filled" className="mb-4">
              Fully Custom
            </Badge>
            <Heading as="h3" size="2xl" className="mt-2 mb-4 text-white font-extrabold tracking-tight">
              Build Your Own Story
            </Heading>
            <Text variant="white" size="xl" className="opacity-90">
              Select your cities, travel style, and let us do the rest.
            </Text>
          </div>

          
          <Button 
            variant="glass"
            className="w-full md:w-auto px-10 py-5 bg-brand-gold text-white border-none shadow-[0_10px_30px_rgba(202,138,4,0.3)] hover:shadow-[0_15px_40px_rgba(202,138,4,0.5)] group/btn relative z-10 text-lg font-semibold"
          >
            Open Trip Builder <span className="transition-transform duration-300 group-hover/btn:translate-x-2 ml-2">→</span>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Packages;

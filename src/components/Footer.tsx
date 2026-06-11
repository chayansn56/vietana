import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import BrandName from './ui/BrandName';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Massive Cinematic Background */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=2000&q=80")` }} />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <Heading as="h2" size="4xl" font="serif" className="text-white mb-6 font-extrabold drop-shadow-2xl">
            Your Journey Awaits
          </Heading>
          <Text size="xl" variant="white" className="max-w-2xl mb-12 opacity-90 drop-shadow-md">
            Ready to experience the magic of Vietnam? Let our experts craft a journey built exactly around you.
          </Text>

          <Button 
            onClick={() => window.open('https://wa.me/919953294543', '_blank')}
            className="px-12 py-6 text-xl font-bold bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-full shadow-[0_20px_60px_rgba(202,138,4,0.3)] hover:bg-white/20 hover:scale-105 transition-all duration-500 ease-out"
          >
            Start Planning Now <span className="ml-2">✨</span>
          </Button>
        </Container>

        {/* Bottom Credits */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row items-center justify-between border-t border-white/10 bg-black/40 backdrop-blur-md z-10">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Heading as="h2" size="xl" variant="none" className="text-brand-gold tracking-wider mb-1 font-serif">
              VIETANA
            </Heading>
            <Text variant="white" size="sm" className="opacity-70">
              © {currentYear} <BrandName /> Travel. Built for Indian Travelers.
            </Text>
          </div>
          
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 list-none p-0">
            {['Services', 'Packages', 'Food', 'About'].map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`} 
                  className="no-underline group"
                >
                  <Text 
                    size="sm" 
                    variant="none"
                    className="text-white/70 transition-colors duration-300 group-hover:text-brand-gold"
                  >
                    {link}
                  </Text>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </FooterWrapper>
  );
};

const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <footer className="relative">{children}</footer>
);

export default Footer;

import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Section variant="dark" spacing="none" className="py-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/22 to-transparent" />
        
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-12">
            <div className="flex flex-col">
              <Heading as="h2" size="xl" variant="none" className="text-brand-blue tracking-wider mb-1">
                VIETANA
              </Heading>
              <Text variant="white" size="sm" className="text-brand-gold mb-1">
                Premium India-Vietnam Travel
              </Text>
              <Text variant="subtle" size="xs">
                © {currentYear} Vietana Travel. Built for Indian Travelers.
              </Text>
            </div>
            
            <ul className="flex flex-wrap gap-x-8 gap-y-4 list-none p-0 pt-1">
              {['Services', 'Packages', 'Food', 'About'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="no-underline"
                  >
                    <Text 
                      size="sm" 
                      variant="none"
                      className="text-white/40 transition-colors duration-300 hover:text-brand-gold"
                    >
                      {link}
                    </Text>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </FooterWrapper>
  );
};

const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <footer className="relative">{children}</footer>
);

export default Footer;

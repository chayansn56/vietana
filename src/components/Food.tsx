import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';

const Food: React.FC = () => {
  return (
    <Section id="food" className="bg-[#FAF8F5] text-[#12302B] border-t border-[#E6D9BF] py-16 lg:py-24">
      <Container size="base">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <div className="order-2 md:order-1">
            <Text size="sm" weight="bold" className="uppercase tracking-[0.2em] text-[#CD7F32] mb-4">
              Dietary Support
            </Text>
            <Heading as="h2" size="4xl" font="serif" className="mb-6 font-extrabold text-[#12302B] leading-tight">
              Indian Food, <br/>Jain & Vegetarian
            </Heading>
            <Text size="base" className="text-[#12302B]/80 leading-relaxed mb-6">
              Finding reliable vegetarian and Jain food in Vietnam can be stressful. We ensure you never have to worry about your next meal.
            </Text>
            <ul className="space-y-4 text-sm text-[#12302B]/80 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>Curated guidance for Indian, Jain, vegetarian, and Halal-friendly dining options across Vietnam.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>Hotels vetted for vegetarian breakfast options.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>Local authentic Vietnamese dishes that are 100% plant-based.</span>
              </li>
            </ul>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 translate-y-6">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80" 
                alt="Indian dining" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
              <img 
                src="https://images.unsplash.com/photo-1626804475297-4160bbbeb376?w=800&q=80" 
                alt="Vegetarian meal" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default Food;

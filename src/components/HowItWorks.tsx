import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Tell Us About Your Trip',
      description: 'Share your dates, group size and travel preferences.',
      icon: 'Calendar'
    },
    {
      number: '2',
      title: 'Get Your Personal Trip Plan',
      description: 'Our Vietnam-based team prepares a personalized plan.',
      icon: 'FileText'
    },
    {
      number: '3',
      title: 'Refine It on WhatsApp',
      description: 'Ask questions, adjust the plan and speak with a real travel specialist.',
      icon: 'MessageCircle'
    }
  ];

  return (
    <Section id="how-it-works" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" size="3xl" font="serif" className="text-[#12302B]">
            How VIETANA Works
          </Heading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#E6D9BF]/20 border border-[#E6D9BF]/50 flex items-center justify-center mb-6 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#12302B] text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
                <Icon name={step.icon} size={24} className="text-[#12302B]" />
              </div>
              <Heading as="h3" size="lg" font="sans" weight="bold" className="text-[#12302B] mb-3">
                {step.title}
              </Heading>
              <Text className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

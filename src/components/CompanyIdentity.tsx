import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import BrandName from './ui/BrandName';

export default function CompanyIdentity() {
  return (
    <Section className="bg-[#FAF8F3] py-12 md:py-16 border-y border-gray-100">
      <Container size="base">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <Heading as="h2" size="2xl" className="mb-4 text-[#12302B]">
              Meet the people behind your trip
            </Heading>
            <Text size="base" className="text-gray-600 leading-relaxed mb-6">
              Real people you can speak with while planning your Vietnam holiday. <BrandName /> specializes in Indian travelers and operates locally from Ho Chi Minh City, offering direct support over WhatsApp.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[#12302B]">Based In</h4>
                  <p className="text-xs text-gray-500 mt-1">Ho Chi Minh City, Vietnam</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[#12302B]">Contact</h4>
                  <p className="text-xs text-gray-500 mt-1">WhatsApp & Phone Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

const REVIEWS = [
  {
    name: "Amit & Sneha P.",
    location: "Mumbai",
    text: "Absolutely magical! The local support team in Vietnam was available 24/7 on WhatsApp. As vegetarians, they mapped out every Indian restaurant."
  },
  {
    name: "Dr. Rajesh Shah",
    location: "Ahmedabad",
    text: "We were very anxious about Jain food for our parents, but Vietana organized dedicated Jain kitchens at every stop."
  },
  {
    name: "Rahul S.",
    location: "New Delhi",
    text: "Having local emergency backup and translation files on our phones made us feel safe the entire time. A top-tier DMC."
  }
];

export default function CompactTrustProof() {
  return (
    <Section className="py-12 bg-brand-green-extra-dark border-y border-white/5">
      <Container className="max-w-6xl">
        <div className="flex flex-col items-center text-center mb-8">
          <Heading as="h2" size="2xl" font="serif" className="text-white mb-2">
            Traveler Stories
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 mb-4 text-brand-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="fill-brand-gold" />
                ))}
              </div>
              <Text className="text-white/90 text-sm italic mb-6 flex-1">
                "{review.text}"
              </Text>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{review.location}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold-light text-xs font-bold">
                  {review.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

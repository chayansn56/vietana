import React from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

const benefits = [
  {
    icon: 'MapPin',
    title: 'LOCAL EXPERTISE',
    subtitle: 'People Who Actually Know Vietnam.',
    desc: 'Local knowledge, trusted partners, and on-ground coordination throughout your journey.'
  },
  {
    icon: 'Heart',
    title: 'INDIA-FOCUSED',
    subtitle: 'We Understand How You Travel.',
    desc: 'From food preferences and family needs to cultural expectations and travel styles—the details don’t need explaining.'
  },
  {
    icon: 'MessageCircle',
    title: 'DEDICATED SUPPORT',
    subtitle: 'Someone Who Knows Your Trip.',
    desc: 'Questions, changes, or unexpected situations—you have a team that knows your journey and is ready to help.'
  }
];

export default function WhyVietana() {
  return (
    <Section className="py-16 md:py-24 border-t border-[#E8E4D9] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: 'url(/journal_bg.png)' }} 
      />
      <div className="absolute inset-0 z-0 bg-black/40" /> {/* Dark overlay for readability without blur */}
      
      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center text-center mt-12 md:mt-16 mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FDE047] mb-3 block font-mono drop-shadow-md">The VIETANA Difference</span>
          <Heading as="h2" size="3xl" font="serif" className="text-white mb-4 leading-tight max-w-3xl drop-shadow-lg">
            Vietnam Is Better When You Have Someone Here.
          </Heading>
          <Text size="lg" className="text-white/95 leading-relaxed font-medium max-w-2xl drop-shadow-md">
            Booking a trip is easy. Having the right people on the ground when you need them is what makes the difference.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const cardColors = [
              {
                bg: 'bg-white/10 hover:bg-white/20',
                border: 'border-white/20 hover:border-white/40',
                iconBg: 'bg-white/20 text-white',
                accent: 'text-emerald-300'
              },
              {
                bg: 'bg-white/10 hover:bg-white/20',
                border: 'border-white/20 hover:border-white/40',
                iconBg: 'bg-white/20 text-white',
                accent: 'text-rose-300'
              },
              {
                bg: 'bg-white/10 hover:bg-white/20',
                border: 'border-white/20 hover:border-white/40',
                iconBg: 'bg-white/20 text-white',
                accent: 'text-sky-300'
              }
            ][i];

            return (
              <div 
                key={i} 
                className={`flex flex-col items-center text-center p-6 rounded-2xl border ${cardColors.border} ${cardColors.bg} transition-all duration-300 hover:shadow-lg hover:scale-[1.03] cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-xl ${cardColors.iconBg} flex items-center justify-center shrink-0 shadow-sm mb-4`}>
                  <Icon name={b.icon as any} className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-mono text-[9px] font-extrabold tracking-widest uppercase ${cardColors.accent} mb-1.5 drop-shadow-sm`}>
                    {b.title}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white mb-2 leading-tight drop-shadow-md">
                    {b.subtitle}
                  </h4>
                  <Text size="xs" className="text-white/80 leading-relaxed font-light drop-shadow-sm">
                    {b.desc}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Horizontal Journal CTA Box */}
        <div 
          onClick={() => {
            window.open('/journal', '_blank');
          }}
          className="mt-16 bg-white/20 border border-white/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg hover:border-white transition-all duration-300 cursor-pointer group"
        >
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="font-serif font-bold text-lg md:text-xl text-white mb-2 group-hover:text-[#FDE047] transition-colors drop-shadow-md">
              Want to Know Vietnam Better?
            </h3>
            <p className="text-sm text-white/95 font-medium leading-relaxed max-w-2xl drop-shadow-md">
              Stories, local insights, food guides, travel advice, and practical tips—written to help you experience Vietnam beyond the itinerary.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open('/journal', '_blank');
            }}
            className="bg-white/20 border border-white/50 text-white hover:bg-white hover:text-black px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm group-hover:scale-[1.02] cursor-pointer shrink-0 flex items-center gap-2 relative z-10"
          >
            Explore The VIETANA Journal <Icon name="ArrowRight" size={12} />
          </button>
        </div>
      </Container>
    </Section>
  );
}

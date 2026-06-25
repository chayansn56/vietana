import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  type: string;
  rating: number;
  text: string;
  tag: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Amit & Sneha Patel",
    location: "Mumbai",
    type: "Honeymoon (Hoi An & Da Nang)",
    rating: 5,
    text: "Absolutely magical! The local support team in Vietnam was available 24/7 on WhatsApp and guided our driver directly. As vegetarians, they mapped out every Indian restaurant in HCMC and Hoi An for us. Worth every rupee!",
    tag: "100% Veg Friendly Support"
  },
  {
    id: 2,
    name: "Dr. Rajesh Shah & Family",
    location: "Ahmedabad",
    type: "Family Trip (North & Central Vietnam)",
    rating: 5,
    text: "We were very anxious about Jain food for our parents, but Vietana organized dedicated Jain kitchens at every stop. The itinerary was perfectly paced, not rushed. Highly professional!",
    tag: "Jain Food Guaranteed"
  },
  {
    id: 3,
    name: "Vikram & Friends",
    location: "New Delhi",
    type: "Adventure Group (Sapa & Halong Bay)",
    rating: 5,
    text: "The Map Curtain and Custom Planner helped us customize our trek in Sapa. Having local emergency backup and translation files on our phones made us feel safe the entire time. A top-tier DMC.",
    tag: "Local Support 24/7"
  }
];

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-green-extra-dark relative overflow-hidden border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-brand-gold/30"></span>
            <Text variant="none" className="uppercase tracking-[0.25em] text-xs font-semibold text-brand-gold-light">
              Trusted by Indian Travelers
            </Text>
            <span className="w-8 h-px bg-brand-gold/30"></span>
          </div>
          <Heading as="h2" size="3xl" font="serif" className="text-white">
            Vietana Moments
          </Heading>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative min-h-[320px] md:min-h-[250px] flex items-center justify-center">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isCurrent ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-4'}`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6 text-brand-gold">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-brand-gold" />
                  ))}
                </div>

                {/* Text */}
                <Text
                  variant="none"
                  className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed max-w-3xl mb-8"
                >
                  "{item.text}"
                </Text>

                {/* Badge Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-brand-gold-light text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon name="CheckCircle2" size={12} />
                  {item.tag}
                </div>

                {/* Author Info */}
                <div>
                  <Heading as="h4" size="md" font="sans" weight="bold" className="text-white mb-0.5">
                    {item.name}
                  </Heading>
                  <Text size="sm" variant="none" className="text-white/50 uppercase tracking-widest text-[0.7rem] font-medium">
                    {item.location} • {item.type}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/55 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          
          <div className="flex gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/55 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

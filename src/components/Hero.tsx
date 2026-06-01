import React, { useState, useEffect, useMemo } from 'react';
import { HERO_SLIDES } from '../data/siteContent';
import { WHATSAPP_DEFAULT } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Clock from './Clock';
import Badge from './ui/Badge';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';

interface HeroProps {
  onOpenMagic: () => void;
}

import WaterWave from 'react-water-wave';

const LOCATIONS = [
  "Misty Mornings in Ha Long Bay",
  "Vibrant Ho Chi Minh City",
  "Colorful Lanterns of Hoi An",
  "Tranquil Ninh Binh Rivers",
  "Golden Terraces of Sa Pa"
];

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clocks, setClocks] = useState({
    vn: { time: '--:--', date: '---' },
    in: { time: '--:--', date: '---' }
  });

  // Generate stable particles for cinematic light leaks
  const lightLeaks = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`,
      dur: `${15 + Math.random() * 10}s`,
      del: `${Math.random() * 5}s`,
      op: `${0.1 + Math.random() * 0.15}`,
      size: `${200 + Math.random() * 300}px`
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const fmt = (tz: string) => {
        const d = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return {
          time: `${h}:${m}`,
          date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`
        };
      };
      setClocks({
        vn: fmt('Asia/Ho_Chi_Minh'),
        in: fmt('Asia/Kolkata')
      });
    }, 1000);

    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <Section id="hero" spacing="none" className="h-screen min-h-[700px] flex items-center">
      {/* WATER RIPPLE BACKGROUND SLIDE */}
      <div className="absolute inset-0 z-0">
        <WaterWave
          key={currentSlide} /* force remount to update image */
          imageUrl={HERO_SLIDES[currentSlide]}
          dropRadius={25}
          perturbance={0.02}
          resolution={512}
          className="w-full h-full bg-cover bg-center animate-ken-burns"
        >
          {() => <div className="w-full h-full" />}
        </WaterWave>
      </div>
      
      {/* CINEMATIC LIGHT LEAKS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen">
        {lightLeaks.map(l => (
          <span 
            key={l.id} 
            className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(255,220,150,0.8)_0%,transparent_70%)] opacity-0 animate-light-leak"
            style={{ 
              left: l.left, 
              top: l.top,
              animationDuration: l.dur,
              animationDelay: l.del,
              '--leak-op': l.op,
              width: l.size, 
              height: l.size 
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* CONTENT */}
      <Container className="relative z-[10]">
        <div className="max-w-4xl p-8 sm:p-12 rounded-[2rem] bg-black/30 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-4 mb-8 animate-reveal-up [animation-delay:0.35s]">
            <div className="w-10 h-px bg-gradient-to-r from-brand-blue to-transparent"></div>
            <Text as="span" size="xs" variant="none" className="uppercase tracking-[0.25em] text-brand-blue font-bold">
              India–Vietnam Travel Experts
            </Text>
          </div>
          
          <Heading 
            as="h1" 
            size="3xl"
            variant="none" 
            className="!text-brand-gold-light mb-2 animate-reveal-up [animation-duration:1.1s] [animation-delay:0.58s] drop-shadow-[0_8px_60px_rgba(0,0,0,0.8)] tracking-tight leading-none"
          >
            Feel <em className="not-italic pr-2">Vietnam</em>,
            <span className="block mt-1 text-brand-gold-light">Your Way 🇻🇳</span>
          </Heading>
          
          <Text 
            size="lg"
            variant="none" 
            weight="medium"
            className="italic mb-6 text-brand-blue animate-reveal-up [animation-delay:0.72s] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] block"
          >
            Travel Gets Better with <BrandName />
          </Text>
          
          <Text 
            variant="white" 
            size="lg"
            weight="medium"
            className="max-w-[580px] animate-reveal-up [animation-duration:1s] [animation-delay:0.82s] mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] text-white"
          >
            {t.hero.sub}
          </Text>
          
          <Text variant="white" size="md" className="!text-white/80 max-w-[460px] mb-12 animate-reveal-up [animation-delay:0.95s] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            {t.hero.support}
          </Text>
          
          <div className="flex gap-5 flex-wrap justify-center lg:justify-start animate-reveal-up [animation-delay:1.08s] mt-2">
            <Button 
              variant="glass" 
              className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-soft transition-all duration-350 ease-soft px-8 py-3.5 w-full sm:w-auto"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-medium">
                <Icon name="Compass" size={18} className="text-brand-gold group-hover:rotate-45 transition-transform duration-500" /> Discover Vietnam
              </span>
            </Button>
          </div>
        </div>
      </Container>

      {/* LOCATION TAG */}
      <div className={`absolute bottom-24 left-[var(--spacing-layout)] z-[4] transition-all duration-800 ease-smooth ${currentSlide >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-dot"></div>
          <Text as="span" size="sm" variant="none" className="text-white/80 tracking-wide font-medium">
            {LOCATIONS[currentSlide]}
          </Text>
        </div>
      </div>


      {/* DOTS */}
      <div className="absolute bottom-11 right-[var(--spacing-layout)] z-[4] flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <div 
            key={i} 
            className={`h-0.5 rounded-sm cursor-pointer transition-all duration-400 ease-smooth ${currentSlide === i ? 'w-9 bg-brand-gold' : 'w-5 bg-white/25'}`} 
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] flex flex-col sm:flex-row justify-between items-start sm:items-end px-[var(--spacing-layout)] pb-11 opacity-0 animate-reveal-up [animation-delay:1.4s] [animation-fill-mode:forwards] gap-6">
        <Text as="div" size="xs" variant="none" className="flex items-center gap-4 text-white/40 tracking-[0.22em] uppercase">
          <div className="relative w-12 h-px bg-gradient-to-r from-brand-gold to-transparent animate-sla" />
          <span>Scroll to explore</span>
        </Text>

        <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-reveal-up [animation-delay:1.55s] [animation-fill-mode:forwards]">
          <Clock flag="🇻🇳" city="Ho Chi Minh City" time={clocks.vn.time} date={clocks.vn.date} />
          <Clock flag="🇮🇳" city="New Delhi" time={clocks.in.time} date={clocks.in.date} />
        </div>
      </div>
    </Section>
  );
};

export default Hero;

import React, { useState, useEffect, useMemo, useRef } from 'react';
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

import $ from 'jquery';
// Make jQuery available globally so the plugin can attach to it.
if (typeof window !== 'undefined') {
  (window as any).$ = (window as any).jQuery = $;
}
import 'jquery.ripples';

const LOCATIONS = [
  "Scooter Rides",
  "Morning Egg Coffee, Hanoi",
  "Lantern Nights, Hoi An",
  "Rainy Café, Saigon",
  "Mì Quảng, Central Vietnam",
  "Quiet Beach Sunset"
];

const SLIDE_COLORS = [
  "text-[#A9DFBF]", // 6: Scooters (green)
  "text-[#F8C471]", // 1: Egg coffee (warm brown)
  "text-[#FAD7A1]", // 2: Lanterns (warm yellow)
  "text-[#85C1E9]", // 3: Rainy cafe (cool blue)
  "text-[#E59866]", // 4: Mi Quang (warm orange)
  "text-[#F5B041]", // 5: Beach sunset (golden)
];

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const rippleRef = useRef<HTMLDivElement>(null);
  
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
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(slideTimer);
    };
  }, []);

  // Initialize Water Ripples
  useEffect(() => {
    // Initialize ripples effect only on larger screens to prevent mobile lag
    if (rippleRef.current && window.innerWidth > 768) {
      try {
        $(rippleRef.current).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
          interactive: true
        });
      } catch (e) {
        console.warn("Ripples effect failed to initialize", e);
      }
    }

    return () => {
      if (rippleRef.current) {
        try {
          $(rippleRef.current).ripples('destroy');
        } catch (e) {}
      }
    };
  }, [currentSlide]); // Re-initialize when slide changes to grab the new background image

  return (
    <Section id="hero" spacing="none" className="h-screen min-h-[700px] flex items-center">
      {/* BACKGROUND SLIDES WITH RIPPLES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={rippleRef}
          className="w-[110%] h-[110%] -left-[5%] -top-[5%] absolute bg-cover bg-center animate-ken-burns" 
          style={{ backgroundImage: `url('${HERO_SLIDES[currentSlide]}')` }}
        />
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
      <Container className="relative z-[10] h-full flex items-center justify-center pt-20">
        <div className="max-w-3xl w-full p-10 sm:p-14 rounded-[2.5rem] bg-black/30 backdrop-blur-[40px] border border-white/30 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
          
          <Heading 
            as="h1" 
            size="4xl"
            variant="none" 
            className={`mb-6 animate-reveal-up [animation-duration:1.1s] [animation-delay:0.3s] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] tracking-tight leading-[1.1] uppercase font-bold transition-colors duration-1000 ${SLIDE_COLORS[currentSlide]}`}
          >
            VIETANA
            <span className="block mt-3 text-white text-3xl sm:text-4xl tracking-wide font-semibold">FEEL VIETNAM, YOUR WAY.</span>
          </Heading>
          
          <Text 
            variant="white" 
            size="xl"
            weight="medium"
            className="max-w-[600px] animate-reveal-up [animation-duration:1s] [animation-delay:0.5s] mb-12 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] text-white/90"
          >
            Thoughtful journeys inspired by moments, not itineraries.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto animate-reveal-up [animation-delay:0.7s]">
            <Button 
              variant="solid" 
              className="group bg-[#B03A2E] hover:bg-[#943126] text-white shadow-soft transition-all duration-350 ease-soft px-8 py-4 w-full sm:w-auto rounded-full text-base tracking-wide uppercase font-semibold"
              onClick={onOpenMagic}
            >
              <span className="flex items-center justify-center gap-2">
                ✨ Begin Your Journey
              </span>
            </Button>
            <Button 
              variant="glass" 
              className="group bg-white/10 border border-white/20 hover:bg-white/20 text-white shadow-soft transition-all duration-350 ease-soft px-8 py-4 w-full sm:w-auto rounded-full text-base tracking-wide uppercase font-semibold"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center justify-center gap-2">
                🌿 Discover Vietnam
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

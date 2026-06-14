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

const TRIPTYCH_PANELS = [
  { img: '/hero_sapa.png', label: 'Mountains & Culture' },
  { img: '/hero_hoian.png', label: 'Heritage & Coastlines' },
  { img: '/hero_halong.png', label: 'Delta & Energy' },
];

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  
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

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Section id="hero" spacing="none" className="h-screen min-h-[700px] flex w-full items-center justify-start">
      {/* TRIPTYCH BACKGROUND */}
      <div className="absolute inset-0 z-0 flex w-full h-full overflow-hidden bg-black">
        {TRIPTYCH_PANELS.map((panel, idx) => (
          <div 
            key={idx}
            className="relative h-full flex-1 transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[1.5] group cursor-default"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${panel.img}')` }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
            <div className="absolute inset-x-0 bottom-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 hidden md:flex justify-center z-10">
               <span className="text-white/90 text-sm tracking-[0.3em] uppercase font-medium">{panel.label}</span>
            </div>
            
            {idx === 1 && (
              <div className="absolute inset-0 z-[20] w-full h-full flex items-center justify-center pointer-events-none">
                <div className="max-w-[90%] flex flex-col items-center text-center pointer-events-auto">
                  <img 
                    src="/vietana_logo.png" 
                    alt="Vietana Logo" 
                    className="h-[60px] md:h-[80px] mb-4 animate-reveal-up [animation-duration:1.1s] [animation-delay:0.2s]" 
                  />
                  <Heading 
                    as="h1" 
                    size="4xl"
                    variant="none" 
                    font="serif"
                    className="mb-4 animate-reveal-up [animation-duration:1.1s] [animation-delay:0.3s] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] tracking-tight leading-[1.1] text-[#F5B041]"
                  >
                    {t.hero.welcome}
                    <span className="block mt-3 text-white/90 text-3xl sm:text-5xl tracking-tight font-light">{t.hero.tagline}</span>
                  </Heading>
                  
                  <Text 
                    variant="none" 
                    size="lg"
                    className="max-w-[400px] animate-reveal-up [animation-duration:1s] [animation-delay:0.5s] mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] text-white/80 font-light"
                  >
                    {t.hero.sub}
                  </Text>
                  
                  <div className="flex animate-reveal-up [animation-delay:0.7s]">
                    <Button 
                      variant="solid" 
                      className="group bg-brand-gold hover:bg-brand-gold-muted text-white shadow-gold transition-all duration-500 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-semibold hover:scale-105"
                      onClick={onOpenMagic}
                    >
                      <span className="flex items-center justify-center gap-3">
                        Design My Escape
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {idx < TRIPTYCH_PANELS.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20 z-10" />
            )}
          </div>
        ))}
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

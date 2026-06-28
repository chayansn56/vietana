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
    <Section id="hero" spacing="none" className="h-[100svh] min-h-[650px] flex w-full items-center justify-start">
      {/* TRIPTYCH BACKGROUND */}
      <div className="absolute inset-0 z-0 flex w-full h-full overflow-hidden bg-black">
        {TRIPTYCH_PANELS.map((panel, idx) => (
          <div 
            key={idx}
            className={`relative h-full flex-1 group cursor-default ${idx !== 1 ? 'hidden md:block' : ''}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${panel.img})`, willChange: 'transform' }}
            />
            {/* Ambient vignette per panel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85 pointer-events-none" />
            
            {/* Panel Label — visible on hover, always visible on mobile */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-20 md:left-10 md:translate-x-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <Text variant="none" className="text-white/70 tracking-[0.3em] text-[0.65rem] uppercase font-bold drop-shadow-md">
                {panel.label}
              </Text>
            </div>

            {/* Vertical Divider */}
            {idx < TRIPTYCH_PANELS.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20 z-10 hidden md:block" />
            )}
          </div>
        ))}
      </div>
      
      {/* MOBILE FILMSTRIP — shows all 3 panels as a bottom strip on small screens */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] flex md:hidden h-14 bg-black/60 backdrop-blur-sm border-t border-white/10">
        {TRIPTYCH_PANELS.map((panel, idx) => (
          <div key={idx} className="flex-1 flex items-center justify-center relative overflow-hidden border-r border-white/10 last:border-r-0">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${panel.img})` }} />
            <Text variant="none" className="relative text-[0.6rem] text-white/80 tracking-[0.2em] uppercase font-semibold drop-shadow-md">
              {panel.label}
            </Text>
          </div>
        ))}
      </div>

      {/* CENTERED HERO CONTENT (Extracted for max z-index and clickability) */}
      <div className="absolute inset-0 z-[40] w-full h-full flex items-center justify-center pointer-events-none">
        <div className="max-w-[90%] flex flex-col items-center text-center pointer-events-auto mt-[-5vh]">
          {/* Subtle Label */}
          <div className="mb-6 overflow-hidden">
            <div className="animate-reveal-up [animation-duration:0.8s] flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-brand-gold/50"></span>
              <Text variant="none" className="uppercase tracking-[0.3em] text-[0.65rem] sm:text-xs font-semibold text-brand-gold-light drop-shadow-md">
                {t.hero.support}
              </Text>
              <span className="w-8 h-px bg-brand-gold/50"></span>
            </div>
          </div>

          <Heading 
            as="h1" 
            size="none"
            variant="none" 
            font="serif"
            className="mb-4 text-4xl sm:text-5xl lg:text-7xl animate-reveal-up [animation-duration:1.1s] [animation-delay:0.3s] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] tracking-tight leading-[1.1] text-white"
          >
            {t.hero.welcome}
            <span className="block mt-3 text-brand-gold text-2xl sm:text-4xl lg:text-5xl tracking-tight font-light drop-shadow-[0_2px_20px_rgba(212,175,55,0.4)]">{t.hero.tagline}</span>
          </Heading>

          <Text 
            variant="none"
            className="max-w-xl mx-auto mb-10 text-white/90 text-sm sm:text-lg leading-relaxed animate-reveal-up [animation-duration:1s] [animation-delay:0.5s] drop-shadow-md light-on-dark"
          >
            {t.hero.sub}
          </Text>

          <div className="flex animate-reveal-up [animation-delay:0.7s]">
            <Button 
              variant="solid" 
              className="group bg-brand-gold hover:bg-brand-gold-muted text-white shadow-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-8 py-4 rounded-full text-sm tracking-widest uppercase font-semibold hover:scale-105 transform-gpu"
              onClick={onOpenMagic}
            >
              <span className="flex items-center justify-center gap-3">
                {t.nav.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Button>
          </div>
        </div>
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
      <div className="absolute bottom-0 left-0 right-0 z-[3] flex flex-col sm:flex-row justify-between items-start sm:items-end px-[var(--spacing-layout)] pb-6 md:pb-11 opacity-0 animate-reveal-up [animation-delay:1.4s] [animation-fill-mode:forwards] gap-4 md:gap-6">
        <Text as="div" size="xs" variant="none" className="flex items-center gap-4 text-white/40 tracking-[0.22em] uppercase">
          <div className="relative w-12 h-px bg-gradient-to-r from-brand-gold to-transparent animate-sla" />
          <span>Scroll to explore</span>
        </Text>

        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 opacity-0 animate-reveal-up [animation-delay:1.55s] [animation-fill-mode:forwards]">
          <Clock flag="🇻🇳" city="Ho Chi Minh" time={clocks.vn.time} date={clocks.vn.date} />
          <Clock flag="🇮🇳" city="Delhi" time={clocks.in.time} date={clocks.in.date} />
        </div>
      </div>
    </Section>
  );
};

export default Hero;

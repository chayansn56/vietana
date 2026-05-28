import React, { useState, useEffect, useMemo } from 'react';
import { HERO_SLIDES, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Clock from './Clock';
import Badge from './ui/Badge';

interface HeroProps {
  onOpenMagic: () => void;
}

const LOCATIONS = [
  "Ho Chi Minh City at Night",
  "Golden Hour at Ha Long Bay",
  "Northern Mountain Terraces"
];

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clocks, setClocks] = useState({
    vn: { time: '--:--', date: '---' },
    in: { time: '--:--', date: '---' }
  });

  // Generate stable particles for lanterns
  const lanterns = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      dur: `${7 + Math.random() * 8}s`,
      del: `${Math.random() * 10}s`,
      dx: `${(Math.random() - 0.5) * 50}px`,
      w: `${4 + Math.random() * 6}px`,
      h: `${6 + Math.random() * 8}px`
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
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <Section id="hero" spacing="none" className="h-screen min-h-[700px] flex items-center">
      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-[-10%] z-0">
        {HERO_SLIDES.map((url, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1.8s] ease-in-out ${currentSlide === idx ? 'opacity-100 animate-ken-burns' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_25%_55%,rgba(8,38,24,0.82)_0%,transparent_65%),linear-gradient(125deg,rgba(5,20,11,0.92)_0%,rgba(13,79,46,0.54)_42%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(4,15,8,0.32)_0%,transparent_28%,rgba(4,15,8,0.5)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-[length:200px_200px] opacity-[0.022] pointer-events-none" />
      
      {/* LANTERNS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {lanterns.map(l => (
          <span 
            key={l.id} 
            className="absolute rounded-[3px_3px_2px_2px] bg-[rgba(255,150,50,0.8)] shadow-[0_0_15px_rgba(255,100,0,0.6),inset_0_0_5px_#fff] opacity-0 animate-pfloat"
            style={{ 
              left: l.left, 
              animationDuration: l.dur,
              animationDelay: l.del,
              '--dx': l.dx, 
              width: l.w, 
              height: l.h 
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* CONTENT */}
      <Container className="relative z-[10]">
        <div className="max-w-4xl">
          <Badge 
            icon={true} 
            variant="gold" 
            className="mb-10 animate-reveal-up [animation-delay:0.35s]"
          >
            India–Vietnam Travel Experts · Ho Chi Minh City
          </Badge>
          
          <Heading 
            as="h1" 
            size="3xl"
            variant="none" 
            className="!text-white mb-2 animate-reveal-up [animation-duration:1.1s] [animation-delay:0.58s] drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          >
            Feel <em className="text-brand-blue italic">Vietnam</em>,
            <span className="block mt-[-0.06em] text-brand-gold">Your Way 🇻🇳</span>
          </Heading>
          
          <Text 
            size="lg"
            variant="none" 
            weight="medium"
            className="italic mb-6 text-brand-gold-light animate-reveal-up [animation-delay:0.72s] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] block"
          >
            Travel Gets Better with VIETANA
          </Text>
          
          <Text 
            variant="white" 
            size="lg"
            weight="medium"
            className="max-w-[580px] animate-reveal-up [animation-duration:1s] [animation-delay:0.82s] mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
          >
            {t.hero.sub}
          </Text>
          
          <Text variant="white" size="md" className="!text-white/80 max-w-[460px] mb-12 animate-reveal-up [animation-delay:0.95s] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            {t.hero.support}
          </Text>
          
          <div className="flex gap-5 flex-wrap animate-reveal-up [animation-delay:1.08s]">
            <Button 
              className="group relative overflow-hidden text-brand-green-extra-dark font-bold" 
              onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
              💬 {t.hero.plan}
            </Button>
            <Button 
              variant="glass" 
              onClick={onOpenMagic}
              className="font-semibold"
            >
              ✦ {t.hero.discover}
            </Button>
          </div>
        </div>
      </Container>

      {/* LOCATION TAG */}
      <div className={`absolute bottom-24 left-[var(--spacing-layout)] z-[4] transition-all duration-800 ease-smooth ${currentSlide >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Badge 
          icon={true} 
          variant="outline" 
          className="bg-black/55 border-brand-gold/20 text-white/70"
        >
          {LOCATIONS[currentSlide]}
        </Badge>
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
      <div className="absolute bottom-0 left-0 right-0 z-[3] flex justify-between items-end px-[var(--spacing-layout)] pb-11 opacity-0 animate-reveal-up [animation-delay:1.4s] [animation-fill-mode:forwards]">
        <Text as="div" size="xs" variant="none" className="flex items-center gap-4 text-white/40 tracking-[0.22em] uppercase">
          <div className="relative w-12 h-px bg-gradient-to-r from-brand-gold to-transparent animate-sla" />
          <span>Scroll to explore</span>
        </Text>

        <div className="flex gap-3 opacity-0 animate-reveal-up [animation-delay:1.55s] [animation-fill-mode:forwards]">
          <Clock flag="🇻🇳" city="Ho Chi Minh City" time={clocks.vn.time} date={clocks.vn.date} />
          <Clock flag="🇮🇳" city="New Delhi" time={clocks.in.time} date={clocks.in.date} />
        </div>
      </div>
    </Section>
  );
};

export default Hero;

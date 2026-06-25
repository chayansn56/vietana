import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import { Heading, Text } from './ui/Typography';
import Clock from './Clock';

interface HeroProps {
  onOpenMagic: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  
  const [clocks, setClocks] = useState({
    vn: { time: '--:--', date: '---' },
    in: { time: '--:--', date: '---' }
  });

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
          date: `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
        };
      };
      setClocks({
        vn: fmt('Asia/Ho_Chi_Minh'),
        in: fmt('Asia/Kolkata')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="hero" spacing="none" className="min-h-screen flex flex-col md:flex-row w-full items-stretch bg-[#FAF7F0] overflow-hidden pt-20 md:pt-0">
      {/* LEFT SIDE: Editorial Typography & Canvas */}
      <div className="flex-1 flex flex-col justify-center px-[8%] py-12 md:py-0 relative bg-noise">
        <div className="max-w-xl space-y-6 md:space-y-8">
          {/* Vintage Travel Stamp Style Badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-[#D4AF37]/35 rounded-md bg-[#FAF7F0]">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#B8860B] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              {t.hero.support}
            </span>
          </div>

          <div className="space-y-3">
            <Heading 
              as="h1" 
              variant="none" 
              className="text-[#1E4D45] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] font-serif"
            >
              {t.hero.welcome}
            </Heading>
            <p className="text-2xl sm:text-3xl text-[#B8860B] font-light font-serif italic">
              {t.hero.tagline}
            </p>
          </div>

          <Text 
            variant="none"
            className="text-[#555555] text-base md:text-lg font-light leading-relaxed max-w-lg"
          >
            {t.hero.sub}
          </Text>

          {/* Floating ticket-stub inquiry button */}
          <div className="pt-4 flex">
            <button 
              onClick={onOpenMagic}
              className="flex items-center bg-[#1A2421] border border-[#D4AF37]/50 rounded-lg p-0 hover:scale-[1.02] transform transition duration-300 text-left cursor-pointer group shadow-lg"
            >
              {/* Ticket Left Part */}
              <div className="p-4 sm:p-5 border-r border-dashed border-[#D4AF37]/30 relative">
                <div className="text-[10px] uppercase tracking-widest text-[#FAF7F0]/60 mb-1">INQUIRY BOARDING PASS</div>
                <div className="text-white font-serif text-lg sm:text-xl tracking-wide font-medium flex items-center gap-3">
                  DEL <span className="text-[#D4AF37] text-sm">➔</span> SGN
                </div>
                {/* Visual tickets cuts */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-[7px] w-[14px] h-[14px] bg-[#FAF7F0] rounded-full z-10 border border-transparent"></div>
              </div>
              {/* Ticket Stub right part */}
              <div className="p-4 sm:p-5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition duration-300 rounded-r-lg flex flex-col justify-center">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                  {t.nav.cta} <span className="group-hover:translate-x-1 transition duration-200">→</span>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Vintage clocks in sidebar */}
        <div className="absolute bottom-8 left-[8%] right-[8%] flex items-center justify-between border-t border-[#E8E4D9] pt-4 text-xs text-[#555555]/60">
          <div className="flex gap-4">
            <Clock flag="🇮🇳" city="DEL" time={clocks.in.time} date={clocks.in.date} />
            <Clock flag="🇻🇳" city="SGN" time={clocks.vn.time} date={clocks.vn.date} />
          </div>
          <div className="hidden sm:block uppercase tracking-widest font-mono text-[9px]">
            SCROLL TO DEPART
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Cinematic Zoom Slide */}
      <div className="flex-1 relative overflow-hidden min-h-[350px] md:min-h-0 bg-[#0A1C18]">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url('/hero_halong.png')` }}
        />
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C18]/80 via-transparent to-[#0A1C18]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-transparent to-transparent hidden md:block w-[10%] pointer-events-none" />
        
        {/* Destination Coordinate Tag */}
        <div className="absolute bottom-8 right-8 text-right text-white/50 text-[10px] tracking-widest font-mono pointer-events-none bg-[#0A1C18]/65 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
          <div>LOC // HA LONG BAY</div>
          <div>COORD // 20.9758° N, 107.0460° E</div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;

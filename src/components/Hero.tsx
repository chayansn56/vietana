import React, { useState, useEffect, useMemo } from 'react';
import { HERO_SLIDES, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';

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
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-[-10%] z-0">
        {HERO_SLIDES.map((url, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1.8s] ease-in-out ${currentSlide === idx ? 'opacity-100 animate-[kbslide_12s_ease-in-out_forwards]' : 'opacity-0'}`} 
            style={{ backgroundImage: `url('${url}')` }}
          ></div>
        ))}
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_25%_55%,rgba(8,38,24,0.82)_0%,transparent_65%),linear-gradient(125deg,rgba(5,20,11,0.92)_0%,rgba(13,79,46,0.54)_42%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(4,15,8,0.32)_0%,transparent_28%,rgba(4,15,8,0.5)_100%)]"></div>
      <div className="absolute inset-0 z-[2] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-[length:200px_200px] opacity-[0.022] pointer-events-none"></div>
      
      {/* LANTERNS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {lanterns.map(l => (
          <span 
            key={l.id} 
            className="absolute rounded-[3px_3px_2px_2px] bg-[rgba(255,150,50,0.8)] shadow-[0_0_15px_rgba(255,100,0,0.6),inset_0_0_5px_#fff] opacity-0 animate-[pfloat_var(--dur)_var(--del)_infinite_ease-in-out]"
            style={{ 
              left: l.left, 
              '--dur': l.dur, 
              '--del': l.del, 
              '--dx': l.dx, 
              width: l.w, 
              height: l.h 
            } as any}
          ></span>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-[3] px-[7%] max-w-[900px] md:px-[7%] sm:px-[5%]">
        <div className="inline-flex items-center gap-3 bg-[var(--gold)]/10 border border-[var(--gold)]/28 text-[var(--gold3)] text-[0.7rem] font-medium tracking-[0.22em] uppercase px-5 py-2 rounded-full backdrop-blur-md mb-10 opacity-0 translate-y-4 animate-[ru_0.9s_0.35s_var(--e2)_forwards]">
          <div className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse flex-shrink-0"></div>
          <span>India–Vietnam Travel Experts · Ho Chi Minh City</span>
        </div>
        
        <h1 className="text-white mb-2 md:mb-2 sm:mb-2 opacity-0 translate-y-[38px] animate-[ru_1.1s_0.58s_var(--e2)_forwards] drop-shadow-[0_4px_70px_rgba(0,0,0,0.28)]">
          Feel <em className="text-[var(--gold3)] italic">Vietnam</em>,
          <span className="block mt-[-0.06em] text-[var(--gold3)]">Your Way 🇻🇳</span>
        </h1>
        
        <p className="text-[var(--gold3)] font-serif text-[clamp(1rem,2vw,1.4rem)] italic font-light mb-5 md:mb-5 opacity-0 translate-y-5 animate-[ru_0.9s_0.72s_var(--e2)_forwards]">
          Travel Gets Better with <img src="/vietana_logo.png" className="h-[1.2em] inline-block align-middle mr-1 -mt-0.5" alt="" />VIETANA
        </p>
        
        <p className="text-white/70 text-[1.05rem] font-light max-w-[500px] leading-relaxed mb-3 opacity-0 translate-y-[28px] animate-[ru_1s_0.82s_var(--e2)_forwards]">
          {t.hero.sub}
        </p>
        
        <p className="text-white/45 text-[0.82rem] max-w-[440px] leading-relaxed mb-12 opacity-0 translate-y-[18px] animate-[ru_0.9s_0.95s_var(--e2)_forwards]">
          We handle everything from your visa until you're back home.
        </p>
        
        <div className="flex gap-5 flex-wrap opacity-0 translate-y-[22px] animate-[ru_0.9s_1.08s_var(--e2)_forwards]">
          <Button 
            className="group relative overflow-hidden" 
            onClick={() => window.open(WHATSAPP_DEFAULT, '_blank')}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350"></span>
            💬 {t.nav.cta}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onOpenMagic}
          >
            ✦ {t.hero.discover}
          </Button>
        </div>
      </div>

      {/* LOCATION TAG */}
      <div className={`absolute bottom-24 left-[7%] z-[4] transition-all duration-800 ease-[var(--e2)] ${currentSlide >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="inline-flex items-center gap-3 bg-black/55 backdrop-blur-2xl border border-[var(--gold)]/20 rounded-full py-2 px-4.5 pl-2.5">
          <div className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-white/70 text-[0.7rem] tracking-[0.15em] uppercase">{LOCATIONS[currentSlide]}</span>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-11 right-[7%] z-[4] flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <div 
            key={i} 
            className={`h-0.5 rounded-sm cursor-pointer transition-all duration-400 ease-[var(--e2)] ${currentSlide === i ? 'w-9 bg-[var(--gold)]' : 'w-5 bg-white/25'}`} 
            onClick={() => setCurrentSlide(i)}
          ></div>
        ))}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] flex justify-between items-end px-[7%] pb-11 opacity-0 animate-[ru_0.9s_1.4s_var(--e2)_forwards]">
        <div className="flex items-center gap-4 text-white/40 text-[0.67rem] tracking-[0.22em] uppercase">
          <div className="relative w-13 h-px bg-gradient-to-r from-[var(--gold)] to-transparent animate-[sla_2.6s_ease-in-out_infinite]"></div>
          <span>Scroll to explore</span>
        </div>

        <div className="flex gap-3 opacity-0 animate-[ru_0.9s_1.55s_var(--e2)_forwards]">
          <ClockCard flag="🇻🇳" city="Ho Chi Minh City" time={clocks.vn.time} date={clocks.vn.date} />
          <ClockCard flag="🇮🇳" city="New Delhi" time={clocks.in.time} date={clocks.in.date} />
        </div>
      </div>

      <style>{`
        @keyframes kbslide {
          0% { transform: scale(1.1) translateX(0); }
          100% { transform: scale(1.02) translateX(-15px); }
        }
        @keyframes pfloat {
          0% { opacity: 0; transform: translateY(100vh) translateX(0); }
          10% { opacity: .5; }
          90% { opacity: .2; }
          100% { opacity: 0; transform: translateY(-5vh) translateX(var(--dx, 20px)); }
        }
        @keyframes sla {
          0%, 100% { width: 36px; opacity: .3; }
          50% { width: 62px; opacity: .8; }
        }
      `}</style>
    </section>
  );
};

const ClockCard: React.FC<{ flag: string; city: string; time: string; date: string }> = ({ flag, city, time, date }) => (
  <div className="bg-black/60 backdrop-blur-xl border border-[var(--gold)]/14 rounded-[var(--rs)] p-3 px-4.5 text-left min-w-[110px] transition-colors duration-350 hover:bg-[var(--g)]/70">
    <span className="text-[0.85rem] mb-1 block">{flag}</span>
    <span className="text-white/50 text-[0.6rem] tracking-[0.12em] uppercase block">{city}</span>
    <span className="font-serif text-[1.4rem] font-light text-[var(--gold)] block leading-none my-0.5">{time}</span>
    <span className="text-white/40 text-[0.6rem] block">{date}</span>
  </div>
);

export default Hero;

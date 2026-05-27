import React, { useState, useEffect, useMemo } from 'react';
import { HERO_SLIDES, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import './Hero.css';

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
  const [vnTime, setVnTime] = useState('--:--');
  const [vnDate, setVnDate] = useState('---');
  const [inTime, setInTime] = useState('--:--');
  const [inDate, setInDate] = useState('---');

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
      const vn = fmt('Asia/Ho_Chi_Minh');
      const ind = fmt('Asia/Kolkata');
      setVnTime(vn.time); setVnDate(vn.date);
      setInTime(ind.time); setInDate(ind.date);
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
    <section id="hero">
      <div className="hero-slides" id="heroSlides">
        {HERO_SLIDES.map((url, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${currentSlide === idx ? 'active' : ''}`} 
            style={{ backgroundImage: `url('${url}')` }}
          ></div>
        ))}
      </div>
      <div className="hv1"></div>
      <div className="hv2"></div>
      
      <div className="h-particles lanterns" id="hPart">
        {lanterns.map(l => (
          <span 
            key={l.id} 
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

      <div className="hcontent">
        <div className="hey">
          <div className="hd"></div>
          <span>India–Vietnam Travel Experts · Ho Chi Minh City</span>
        </div>
        <h1 className="hh1">
          Feel <em style={{ color: 'var(--blue)' }}>Vietnam</em>,
          <span className="b" style={{ color: 'var(--gold3)' }}>Your Way 🇻🇳</span>
        </h1>
        <p className="hero-tagline">
          Travel Gets Better with <img src="/vietana_logo.png" className="inline-logo" alt="" />VIETANA
        </p>
        <p className="hsub">{t.hero.sub}</p>
        <p className="hero-support">We handle everything from your visa until you're back home.</p>
        
        <div className="hbtns">
          <a href={WHATSAPP_DEFAULT} className="bwa" target="_blank" rel="noreferrer">💬 {t.nav.cta}</a>
          <a href="#" className="bgh" onClick={(e) => { e.preventDefault(); onOpenMagic(); }}>✦ {t.hero.discover}</a>
        </div>
      </div>

      <div className="hero-loc show" id="heroLoc">
        <div className="hloc-inner">
          <div className="hloc-dot"></div>
          <span id="heroLocText">{LOCATIONS[currentSlide]}</span>
        </div>
      </div>

      <div className="hero-dots" id="heroDots">
        {HERO_SLIDES.map((_, i) => (
          <div key={i} className={`hero-dot ${currentSlide === i ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></div>
        ))}
      </div>

      <div className="hbot">
        <div className="hscroll"><div className="hsl"></div><span>Scroll to explore</span></div>
        <div className="live-clocks">
          <div className="lc-card">
            <span className="lc-flag">🇻🇳</span>
            <span className="lc-city">Ho Chi Minh City</span>
            <span className="lc-time" id="vn-time">{vnTime}</span>
            <span className="lc-date" id="vn-date">{vnDate}</span>
          </div>
          <div className="lc-card">
            <span className="lc-flag">🇮🇳</span>
            <span className="lc-city">New Delhi</span>
            <span className="lc-time" id="in-time">{inTime}</span>
            <span className="lc-date" id="in-date">{inDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

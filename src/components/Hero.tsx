import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, WHATSAPP_DEFAULT } from '../config';
import './Hero.css';

interface HeroProps {
  onOpenMagic: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vnTime, setVnTime] = useState('--:--');
  const [vnDate, setVnDate] = useState('---');
  const [inTime, setInTime] = useState('--:--');
  const [inDate, setInDate] = useState('---');

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
      <div className="hero-slides">
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
      <div className="h-particles lanterns"></div>
      <div className="hcontent">
        <div className="hey">
          <div className="hd"></div>
          <span>India–Vietnam Travel Experts · Ho Chi Minh City</span>
        </div>
        <h1 className="hh1">
          Feel <em style={{ color: 'var(--blue)' }}>Vietnam</em>,
          <span className="b" style={{ color: 'var(--gold3)' }}>Your Way 🇻🇳</span>
        </h1>
        <p className="hero-tagline">Travel Gets Better with VIETANA</p>
        <p className="hsub">Vietnam made easy for Indian travelers — from visas and hotels to hidden places, food experiences and local support.</p>
        <div className="hbtns">
          <a href={WHATSAPP_DEFAULT} className="bwa" target="_blank" rel="noreferrer">💬 Plan My Trip — India</a>
          <a href="#" className="bgh" onClick={(e) => { e.preventDefault(); onOpenMagic(); }}>✦ Discover Vietnam</a>
        </div>
      </div>
      <div className="hero-dots">
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
            <span className="lc-time">{vnTime}</span>
            <span className="lc-date">{vnDate}</span>
          </div>
          <div className="lc-card">
            <span className="lc-flag">🇮🇳</span>
            <span className="lc-city">New Delhi</span>
            <span className="lc-time">{inTime}</span>
            <span className="lc-date">{inDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

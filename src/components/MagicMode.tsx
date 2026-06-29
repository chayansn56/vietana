import React, { useState, useEffect, useRef } from 'react';
import { MAGIC_MODE_SLIDES } from '../data/magicMode';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';

interface MagicModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
  onOpenBuilder: () => void;
  onOpenPackages: () => void;
}

const MagicMode: React.FC<MagicModeProps> = ({ 
  isOpen, 
  onClose, 
  onOpenPlanner, 
  onOpenBuilder, 
  onOpenPackages 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 50);

      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
        for (let i = 0; i < 30; i++) {
          const p = document.createElement('div');
          p.style.position = 'absolute';
          const size = Math.random() * 3 + 'px';
          p.style.width = size;
          p.style.height = size;
          p.style.background = '#fff';
          p.style.borderRadius = '50%';
          p.style.left = Math.random() * 100 + 'vw';
          p.style.top = Math.random() * 100 + 'vh';
          p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
          p.className = 'animate-mm-float';
          p.style.animationDuration = `${4 + Math.random() * 4}s`;
          p.style.animationDelay = `-${Math.random() * 4}s`;
          particlesRef.current.appendChild(p);
        }
      }

      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % MAGIC_MODE_SLIDES.length);
      }, 5000);

      return () => clearInterval(slideInterval);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const handleSelectOption = (action: () => void) => {
    setIsActive(false);
    setTimeout(() => {
      onClose();
      action();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div id="magicMode" className={`fixed inset-0 z-[9999] bg-brand-green-extra-dark flex flex-col items-center justify-between transition-opacity duration-500 ease-soft overflow-y-auto overscroll-contain text-white py-12 px-6 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {MAGIC_MODE_SLIDES.map((url, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/40 after:to-black/85
              ${currentSlide === idx ? 'opacity-40 scale-100' : 'opacity-0 scale-105'}`}
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_60%)] animate-mm-drift" />
        <div className="absolute inset-0" ref={particlesRef} />
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-2xl mt-4">
        <Heading as="h1" size="3xl" font="serif" className="mb-3 text-white tracking-wide">
          Design Your Escape
        </Heading>
        <Text variant="white" className="opacity-90 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-light">
          Choose your preferred planning experience. From customized itineraries to fully autonomous AI, we'll design Vietnam your way.
        </Text>
      </div>

      {/* THREE PATHS GRID */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
        
        {/* OPTION 1: CURATED PACKAGES */}
        <Card
          variant="glass"
          padding="lg"
          className="bg-brand-green-dark/45 border-white/10 hover:border-brand-gold/40 flex flex-col justify-between h-[360px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
          hover={false}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon name="BookOpen" size={24} />
            </div>
            <Heading as="h3" size="lg" className="text-white font-bold leading-tight">
              Curated Packages
            </Heading>
            <Text variant="white" className="opacity-75 text-xs sm:text-sm leading-relaxed font-light">
              Explore our handpicked flagship packages designed specifically for Indian travelers, and customize any of them to align with your personal rhythm.
            </Text>
          </div>
          <Button 
            variant="glass" 
            className="w-full mt-6 py-3 text-xs tracking-wider uppercase font-semibold border-white/20 hover:border-white text-white group-hover:bg-white group-hover:text-brand-green-extra-dark transition-all duration-300"
            onClick={() => handleSelectOption(onOpenPackages)}
          >
            See Packages
          </Button>
        </Card>

        {/* OPTION 2: CUSTOM TRIP BUILDER (LIVE METRICS) */}
        <Card
          variant="glass"
          padding="lg"
          className="bg-brand-green-dark/45 border-white/10 hover:border-brand-gold/40 flex flex-col justify-between h-[360px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)] group relative overflow-hidden"
          hover={false}
        >
          <div className="absolute top-4 right-4 bg-brand-gold text-brand-green-extra-dark text-tiny font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
            LIVE SYNC
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon name="Activity" size={24} />
            </div>
            <Heading as="h3" size="lg" className="text-white font-bold leading-tight">
              Custom Trip Builder
            </Heading>
            <Text variant="white" className="opacity-75 text-xs sm:text-sm leading-relaxed font-light">
              Compute your budget in real time. Customize destinations, hotels, and services with flight, visa, and local expense rates updated every hour.
            </Text>
          </div>
          <Button 
            variant="solid" 
            className="w-full mt-6 py-3 text-xs tracking-wider uppercase font-semibold bg-brand-gold hover:bg-brand-gold-muted text-white shadow-gold hover:scale-[1.02] transition-all duration-300"
            onClick={() => handleSelectOption(onOpenBuilder)}
          >
            Build Custom Trip
          </Button>
        </Card>

        {/* OPTION 3: AI CONCIERGE */}
        <Card
          variant="glass"
          padding="lg"
          className="bg-brand-green-dark/45 border-white/10 hover:border-brand-gold/40 flex flex-col justify-between h-[360px] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
          hover={false}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon name="Sparkles" size={24} />
            </div>
            <Heading as="h3" size="lg" className="text-white font-bold leading-tight">
              Totally AI Planner
            </Heading>
            <Text variant="white" className="opacity-75 text-xs sm:text-sm leading-relaxed font-light">
              Converse naturally with our local intelligence engine. Share your flight details, preferences, and desires, and let AI structure your dream escape.
            </Text>
          </div>
          <Button 
            variant="glass" 
            className="w-full mt-6 py-3 text-xs tracking-wider uppercase font-semibold border-white/20 hover:border-white text-white group-hover:bg-white group-hover:text-brand-green-extra-dark transition-all duration-300"
            onClick={() => handleSelectOption(() => onOpenPlanner())}
          >
            Plan with AI
          </Button>
        </Card>

      </div>

      {/* FOOTER CONTROLS */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-4">
        <Button 
          variant="glass" 
          size="sm" 
          className="px-6 py-2 text-white border-white/20 hover:border-white text-xs tracking-widest uppercase transition-colors"
          onClick={() => handleSelectOption(() => {})}
        >
          Return to Reality
        </Button>
        <Text size="xxs" variant="white" className="opacity-40 tracking-wider">
          VIETANA™ — LOCALLY MANAGED FROM HO CHI MINH CITY
        </Text>
      </div>

    </div>
  );
};

export default MagicMode;

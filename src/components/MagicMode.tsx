import React, { useState, useEffect, useRef } from 'react';
import { MAGIC_DESTINATIONS, MAGIC_MODE_SLIDES } from '../config';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';

interface MagicModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
}

const MagicMode: React.FC<MagicModeProps> = ({ isOpen, onClose, onOpenPlanner }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [orbState, setOrbState] = useState<'visible' | 'hidden'>('visible');
  const [showStars, setShowStars] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [selectedDest, setSelectedDest] = useState<{ label: string; desc: string } | null>(null);

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
      setOrbState('visible');
      setShowStars(false);
      setSelectedDest(null);
      setIsFlashActive(false);
    }
  }, [isOpen]);

  const handleOrbClick = () => {
    setIsFlashActive(true);
    setTimeout(() => {
      setOrbState('hidden');
      setShowStars(true);
      setTimeout(() => setIsFlashActive(false), 200);
    }, 400);
  };

  const handleClose = (callback?: () => void) => {
    setIsActive(false);
    setTimeout(() => {
      onClose();
      if (callback) callback();
    }, 1500);
  };

  const handleExploreFeeling = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose(() => onOpenPlanner(selectedDest?.label));
  };

  if (!isOpen) return null;

  return (
    <div id="magicMode" className={`fixed inset-0 z-[9999] bg-brand-green-extra-dark flex flex-col items-center justify-center transition-opacity duration-1500 ease-soft overflow-hidden text-white ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {MAGIC_MODE_SLIDES.map((url, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/20 after:to-black/60
              ${currentSlide === idx ? 'opacity-60 scale-100' : 'opacity-0 scale-105'}`}
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] animate-mm-drift" />
        <div className="absolute inset-0" ref={particlesRef} />
      </div>

      {/* ORB */}
      {orbState === 'visible' && (
        <div
          className="relative z-10 cursor-pointer transition-all duration-500 ease-elastic flex items-center justify-center animate-mm-breathe rounded-full"
          onClick={handleOrbClick}
        >
          <div className="w-72 h-72 rounded-full bg-white/5 border border-brand-gold/25 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6 shadow-deep hover:border-brand-gold/45 transition-all duration-300 overflow-hidden">
            <Heading as="h2" size="lg" variant="white" className="font-bold mb-2 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">✨ Touch Vietnam</Heading>
            <Text variant="white" className="opacity-80 leading-relaxed">Not all journeys begin with a destination.<br />Some begin with a feeling.</Text>
          </div>
        </div>
      )}

      {/* STARS */}
      <div className={`absolute inset-0 z-[5] pointer-events-none transition-opacity duration-500 ${showStars ? 'block' : 'hidden'} ${selectedDest ? 'opacity-20' : 'opacity-100'}`}>
        {showStars && MAGIC_DESTINATIONS.map((dest, i) => {
          const cols = 6;
          const rows = 5;
          const cellW = 80 / cols;
          const cellH = 70 / rows;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const rx = 10 + (col * cellW) + (Math.random() * (cellW * 0.8));
          const ry = 10 + (row * cellH) + (Math.random() * (cellH * 0.8));

          return (
            <div
              key={i}
              className="absolute w-10 h-10 bg-[radial-gradient(circle_at_center,#fff_0%,#fff_10%,transparent_12%)] rounded-full pointer-events-auto cursor-pointer transition-transform duration-300 animate-mm-float -mt-4 -ml-4 group"
              style={{ left: `${rx}vw`, top: `${ry}vh`, animationDelay: `-${Math.random() * 5}s` }}
              onClick={() => setSelectedDest(dest)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_60%)] rounded-full -z-10 pointer-events-none animate-mm-glow group-hover:bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.8)_0%,transparent_60%)]" style={{ animationDelay: `-${Math.random() * 3}s` }} />
              <span className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-black/60 px-2.5 py-1 rounded-xl text-sm whitespace-nowrap opacity-0 transition-opacity duration-300 backdrop-blur-md group-hover:opacity-100 pointer-events-none z-10">
                {dest.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STORY CARD */}
      <Card
        variant="glass"
        padding="lg"
        hover={false}
        className={`absolute z-20 bg-brand-green-dark/70 rounded-3xl w-[90%] max-w-md text-center shadow-deep transition-all duration-500 ease-elastic ${selectedDest ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'}`}
      >
        <Heading as="h2" size="lg" variant="accent" className="mb-5 text-brand-gold-light">{selectedDest?.label}</Heading>
        <Text variant="white" size="lg" className="leading-relaxed mb-8 whitespace-pre-line">
          {selectedDest?.desc}
        </Text>
        <Button variant="primary" className="w-full py-3" onClick={handleExploreFeeling}>
          Explore this destination →
        </Button>
        <button className="absolute top-4 right-5 bg-transparent border-none text-white text-3xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity" onClick={() => setSelectedDest(null)}>×</button>
      </Card>

      {/* FLASH EFFECT */}
      <div className={`fixed inset-0 bg-white z-[999] pointer-events-none transition-opacity duration-800 ${isFlashActive ? 'opacity-100' : 'opacity-0'}`} />

      {/* CONTROLS */}
      <div className="absolute bottom-8 w-full flex flex-col items-center gap-4 z-30 opacity-0 animate-fade-in [animation-delay:1s] pointer-events-auto">
        <div className="flex items-center gap-3 opacity-80">
          <Text size="sm" variant="white">Not sure?</Text>
          <Button size="sm" onClick={() => handleClose(() => onOpenPlanner())}>✨ Let VIETANA™ understand you</Button>
        </div>
        <Button variant="glass" size="sm" className="px-4 py-1.5" onClick={() => handleClose()}>Return to reality ↩</Button>
      </div>
    </div>
  );
};

export default MagicMode;

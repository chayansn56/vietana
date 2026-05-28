import React, { useState, useEffect, useRef } from 'react';
import { MAGIC_DESTINATIONS } from '../config';
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

  const mmSlides = [
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&q=80',
    'https://images.unsplash.com/photo-1542012843-0570b7787fc5?w=1600&q=80',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 50);
      
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
        for(let i=0; i<30; i++) {
          const p = document.createElement('div');
          p.style.position = 'absolute';
          const size = Math.random()*3 + 'px';
          p.style.width = size;
          p.style.height = size;
          p.style.background = '#fff';
          p.style.borderRadius = '50%';
          p.style.left = Math.random()*100 + 'vw';
          p.style.top = Math.random()*100 + 'vh';
          p.style.opacity = (Math.random()*0.5 + 0.1).toString();
          p.style.animation = `mmFloat ${4 + Math.random()*4}s ease-in-out infinite alternate`;
          p.style.animationDelay = `-${Math.random()*4}s`;
          particlesRef.current.appendChild(p);
        }
      }

      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % mmSlides.length);
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

  const handleExploreFeeling = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      onOpenPlanner(selectedDest?.label);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div id="magicMode" className={`fixed inset-0 z-[9999] bg-brand-green-extra-dark flex flex-col items-center justify-center transition-opacity duration-1500 ease-soft overflow-hidden text-white ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {mmSlides.map((url, idx) => (
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
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] animate-[mmDrift_40s_linear_infinite_alternate]" />
        <div className="absolute inset-0" ref={particlesRef} />
      </div>
      
      {/* ORB */}
      {orbState === 'visible' && (
        <div 
          className="relative z-10 cursor-pointer transition-all duration-500 ease-elastic flex items-center justify-center animate-[mmBreathe_4s_ease-in-out_infinite_alternate]" 
          onClick={handleOrbClick}
        >
          <div className="w-72 h-72 rounded-full bg-white/5 border border-white/20 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-5 shadow-deep hover:bg-white/10 hover:border-white/40">
            <Heading as="h2" className="text-3xl font-bold mb-2.5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] text-white">✨ Touch Vietnam</Heading>
            <Text variant="white" className="opacity-80 leading-relaxed">Not all journeys begin with a destination.<br/>Some begin with a feeling.</Text>
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
              className="absolute w-10 h-10 bg-[radial-gradient(circle_at_center,#fff_0%,#fff_10%,transparent_12%)] rounded-full pointer-events-auto cursor-pointer transition-transform duration-300 animate-[mmFloat_6s_ease-in-out_infinite_alternate] -mt-4 -ml-4 group"
              style={{ left: `${rx}vw`, top: `${ry}vh`, animationDelay: `-${Math.random() * 5}s` }}
              onClick={() => setSelectedDest(dest)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_60%)] rounded-full -z-10 pointer-events-none animate-[mmGlow_3s_ease-in-out_infinite_alternate] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.8)_0%,transparent_60%)]" style={{ animationDelay: `-${Math.random() * 3}s` }} />
              <span className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-black/60 px-2.5 py-1 rounded-xl text-[0.85rem] whitespace-nowrap opacity-0 transition-opacity duration-300 backdrop-blur-md group-hover:opacity-100 pointer-events-none z-10">
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
        className={`absolute z-20 bg-brand-green-dark/70 rounded-[30px] w-[90%] max-w-[500px] text-center shadow-deep transition-all duration-500 ease-elastic ${selectedDest ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <Heading as="h2" className="text-[2.2rem] mb-5 text-brand-gold-light">{selectedDest?.label}</Heading>
        <Text variant="white" size="lg" className="leading-relaxed mb-7.5 whitespace-pre-line">
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
      <div className="absolute bottom-8 w-full flex flex-col items-center gap-4 z-30 opacity-0 animate-[fadeIn_1s_1s_forwards] pointer-events-auto">
        <div className="flex items-center gap-3 text-[0.9rem] opacity-80">
          <span>Not sure?</span>
          <button className="bg-brand-gold border-none px-4 py-2 rounded-full text-brand-green-extra-dark font-bold cursor-pointer hover:-translate-y-0.5 transition-transform" onClick={() => { onClose(); setTimeout(() => onOpenPlanner(), 1000); }}>✨ Let VIETANA™ understand you</button>
        </div>
        <button className="bg-transparent border border-white/30 text-white px-4 py-1.5 rounded-full text-[0.8rem] cursor-pointer hover:bg-white/10 transition-colors" onClick={onClose}>Return to reality ↩</button>
      </div>

      <style>{`
        @keyframes mmDrift { from { transform: translate(-10%, -10%); } to { transform: translate(10%, 10%); } }
        @keyframes mmBreathe { from { transform: scale(0.95); box-shadow: 0 0 30px rgba(255,255,255,0.05); } to { transform: scale(1.05); box-shadow: 0 0 70px rgba(255,255,255,0.2); } }
        @keyframes mmFloat { from { transform: translateY(-15px); } to { transform: translateY(15px); } }
        @keyframes mmGlow { 0% { opacity: 0.2; transform: scale(0.6); } 100% { opacity: 1; transform: scale(1.1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MagicMode;

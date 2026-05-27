import React, { useState, useEffect, useRef } from 'react';
import { MAGIC_DESTINATIONS } from '../config';
import './MagicMode.css';

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
    <div id="magicMode" className={isActive ? 'active' : ''} style={{ display: 'flex' }}>
      {/* BACKGROUND SLIDESHOW */}
      <div className="mm-slideshow">
        {mmSlides.map((url, idx) => (
          <div 
            key={idx} 
            className={`mm-slide ${currentSlide === idx ? 'active' : ''}`} 
            style={{ backgroundImage: `url('${url}')` }}
          ></div>
        ))}
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="mm-bg">
        <div className="mm-clouds"></div>
        <div className="mm-particles" id="mmParticles" ref={particlesRef}></div>
        <div className="mm-lanterns"></div>
      </div>
      
      {/* ORB */}
      <div 
        className="mm-orb-container" 
        id="mmOrb" 
        onClick={handleOrbClick}
        style={{ 
          display: orbState === 'visible' ? 'flex' : 'none',
          opacity: orbState === 'visible' ? 1 : 0,
          transform: orbState === 'visible' ? 'scale(1)' : 'scale(0.8)'
        }}
      >
        <div className="mm-orb">
          <h2>✨ Touch Vietnam</h2>
          <p>Not all journeys begin with a destination.<br/>Some begin with a feeling.</p>
        </div>
      </div>

      {/* STARS */}
      <div className="mm-stars-container" id="mmStars" style={{ 
        display: showStars ? 'block' : 'none', 
        opacity: selectedDest ? 0.2 : 1, 
        pointerEvents: selectedDest ? 'none' : 'auto',
        transition: 'opacity 0.5s' 
      }}>
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
              className="mm-star"
              data-label={dest.label}
              style={{ left: `${rx}vw`, top: `${ry}vh`, animationDelay: `-${Math.random() * 5}s` }}
              onClick={() => setSelectedDest(dest)}
            >
              <style dangerouslySetInnerHTML={{ __html: `.mm-star:nth-child(${i+1})::before { animation-delay: -${Math.random()*3}s; }` }} />
            </div>
          );
        })}
      </div>

      {/* STORY CARD */}
      <div className={`mm-story-card ${selectedDest ? 'active' : ''}`} id="mmStoryCard">
        <h2>{selectedDest?.label}</h2>
        <p>{selectedDest?.desc}</p>
        <a href="#" className="mm-story-btn" onClick={handleExploreFeeling}>Explore this destination &rarr;</a>
        <button className="mm-close-story" onClick={() => setSelectedDest(null)}>×</button>
      </div>

      {/* FLASH EFFECT */}
      <div id="mmFlash" className={`mm-flash ${isFlashActive ? 'active' : ''}`} />

      {/* CONTROLS */}
      <div className="mm-bottom-controls" id="mmControls">
        <div className="mm-cta">
          <span>Not sure?</span>
          <button onClick={() => { onClose(); setTimeout(() => onOpenPlanner(), 1000); }}>✨ Let VIETANA™ understand you</button>
        </div>
        <button className="mm-exit" onClick={onClose}>Return to reality ↩</button>
      </div>
    </div>
  );
};

export default MagicMode;

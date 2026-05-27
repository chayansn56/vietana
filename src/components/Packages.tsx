import React, { useRef } from 'react';
import { PACKAGES } from '../config';
import './Packages.css';

const PackageCard: React.FC<{ p: any, onClick: () => void }> = ({ p, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-10px)`;
    cardRef.current.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    cardRef.current.style.boxShadow = '';
  };

  return (
    <div 
      ref={cardRef}
      className="pc r" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="pc-img" style={{ backgroundImage: `url('${p.img}')` }}></div>
      <div className="pc-fog"></div>
      <div className="pc-flare"></div>
      <div className="pc-body">
        <span className="pc-badge">{p.b}</span>
        <h3>{p.t}</h3>
        <p className="pc-price" style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>{p.d}</p>
        <button className="pc-cta">Customize Trip <span className="pca-arr">→</span></button>
      </div>
    </div>
  );
};

interface PackagesProps {
    onOpenBuilder: () => void;
}

const Packages: React.FC<PackagesProps> = ({ onOpenBuilder }) => {
  return (
    <section id="packages">
      <div className="sh r">
        <span className="lbl">Our Packages</span>
        <h2>Inspiration, Not Fixed Products</h2>
        <p>Every package is a starting point. We customize everything around your travel style.</p>
      </div>
      <div className="pkg-g">
        {PACKAGES.map((p, i) => (
          <PackageCard key={i} p={p} onClick={onOpenBuilder} />
        ))}

        {/* CUSTOM BUILDER CARD */}
        <div 
          className="pc r d1 custom-pkg-wide" 
          onClick={onOpenBuilder}
        >
          <div className="cpw-content">
            <span className="pc-badge">Fully Custom</span>
            <h3>Build Your Own Story</h3>
            <p>Select your cities, travel style, and let us do the rest.</p>
          </div>
          <button className="pc-cta cpw-btn">
            Open Trip Builder <span className="pca-arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Packages;

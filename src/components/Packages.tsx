import React from 'react';
import { PACKAGES } from '../config';
import './Packages.css';

const Packages: React.FC = () => {
  return (
    <section id="packages">
      <div className="sh r in">
        <span className="lbl">Our Packages</span>
        <h2>Inspiration, Not Fixed Products</h2>
        <p>Every package is a starting point. We customize everything around your travel style.</p>
      </div>
      <div className="pkg-g">
        {PACKAGES.map((p, i) => (
          <div key={i} className="pc r in">
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
        ))}
      </div>
    </section>
  );
};

export default Packages;

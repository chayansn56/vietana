import React from 'react';
import { SERVICES } from '../config';
import './Services.css';

const Services: React.FC = () => {
  return (
    <section id="services">
      <div className="sg-ghost">WE HANDLE IT</div>
      <div className="sh r in">
        <span className="lbl">We Handle Everything</span>
        <h2>From Visa to Your<br />Last Dinner</h2>
      </div>
      <div className="srvg">
        {SERVICES.map((s, i) => (
          <div key={i} className="sc r in">
            <div className="sc-ico">{s.ico}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

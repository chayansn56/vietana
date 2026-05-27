import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer id="contact">
      <div className="fi">
        <div className="fb">
          <span className="flo">VIETANA</span>
          <span className="ft">Premium India-Vietnam Travel</span>
          <span className="fs">© 2026 Vietana Travel. Built for Indian Travelers.</span>
        </div>
        <ul className="fnav">
          <li><a href="#services">Services</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#food">Food</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

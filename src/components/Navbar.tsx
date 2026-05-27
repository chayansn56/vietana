import React from 'react';
import { NAV_LINKS, WHATSAPP_DEFAULT } from '../config';
import './Navbar.css';

interface NavbarProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner }) => {
  return (
    <>
      <nav id="nav" className={scrolled ? 'glassy' : ''}>
        <a href="#" className="nl" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/vietana_logo.png" style={{ height: '45px' }} alt="Vietana Logo" />
          VIETANA
        </a>
        <ul className="nlinks">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.isPlanner) {
                    e.preventDefault();
                    onOpenPlanner();
                  }
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li><a href={WHATSAPP_DEFAULT} className="ncta" target="_blank" rel="noreferrer">Plan My Trip</a></li>
        </ul>
        <div className="nav-right">
          <div className={`hbg ${mobileMenuOpen ? 'o' : ''}`} id="ham" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mob" className={mobileMenuOpen ? 'o' : ''}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            onClick={() => {
              setMobileMenuOpen(false);
              if (link.isPlanner) onOpenPlanner();
            }}
          >
            {link.name}
          </a>
        ))}
        <div className="mdv"></div>
        <a href="https://wa.me/919953294543" style={{ color: 'var(--gold)' }} target="_blank" rel="noreferrer">💬 +91 9953294543</a>
      </div>
    </>
  );
};

export default Navbar;

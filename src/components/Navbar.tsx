import React, { useState } from 'react';
import { NAV_LINKS, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import './Navbar.css';

interface NavbarProps {
  scrolled: boolean;
  navClass: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner }) => {
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const getNavLabel = (name: string) => {
    switch(name) {
      case 'Services': return t.nav.services;
      case 'Packages': return t.nav.packages;
      case 'AI Planner': return t.nav.aiPlanner;
      case 'Food': return t.nav.food;
      case 'Experiences': return t.nav.experiences;
      case 'About': return t.nav.about;
      case 'Contact': return t.nav.contact;
      default: return name;
    }
  };

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangOpen(!langOpen);
  };

  const handleLangChange = (lang: 'EN' | 'HI' | 'VI') => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <>
      <nav id="nav" className={`${scrolled ? 'glassy' : ''} ${navClass}`}>
        <a href="#" className="nl">
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
                {getNavLabel(link.name)}
              </a>
            </li>
          ))}
          <li><a href={WHATSAPP_DEFAULT} className="ncta" target="_blank" rel="noreferrer">{t.nav.cta}</a></li>
        </ul>

        <div className="nav-right">
          <div className={`lang-sw ${langOpen ? 'open' : ''}`}>
            <div className="lang-btn" onClick={toggleLang}>
              <span>🌐</span><span id="langLabel">{language}</span><span className="lang-arrow">▾</span>
            </div>
            <div className="lang-drop">
              <button className={`lang-opt ${language === 'EN' ? 'active' : ''}`} onClick={() => handleLangChange('EN')}>
                <span className="lang-flag">🇺🇸</span>
                <span className="lang-name">English</span>
                <span className="lang-native">EN</span>
              </button>
              <button className={`lang-opt ${language === 'HI' ? 'active' : ''}`} onClick={() => handleLangChange('HI')}>
                <span className="lang-flag">🇮🇳</span>
                <span className="lang-name">Hindi</span>
                <span className="lang-native">HI</span>
              </button>
              <button className={`lang-opt ${language === 'VI' ? 'active' : ''}`} onClick={() => handleLangChange('VI')}>
                <span className="lang-flag">🇻🇳</span>
                <span className="lang-name">Vietnamese</span>
                <span className="lang-native">VI</span>
              </button>
            </div>
          </div>

          <div className={`hbg ${mobileMenuOpen ? 'o' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            {getNavLabel(link.name)}
          </a>
        ))}
        <div className="mdv"></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'none', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px' }} onClick={() => { setLanguage('EN'); setMobileMenuOpen(false); }}>EN</button>
            <button style={{ background: 'none', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px' }} onClick={() => { setLanguage('HI'); setMobileMenuOpen(false); }}>HI</button>
            <button style={{ background: 'none', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px' }} onClick={() => { setLanguage('VI'); setMobileMenuOpen(false); }}>VI</button>
        </div>
        <a href="https://wa.me/919953294543" style={{ color: 'var(--gold)', fontSize: '1.2rem' }} target="_blank" rel="noreferrer">💬 +91 9953294543</a>
      </div>

      {/* Click outside to close lang drop */}
      {langOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 999 }} onClick={() => setLangOpen(false)}></div>}
    </>
  );
};

export default Navbar;

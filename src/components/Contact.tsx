import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import './Contact.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const openContactPanel = () => {
    window.open('https://wa.me/919953294543', '_blank');
  };

  return (
    <section id="contact">
      <div className="con-orb1"></div>
      <div className="con-orb2"></div>
      
      <div className="contact-inner">
        <span className="lbl r">{t.contact.title}</span>
        <h2 className="r">{t.contact.heading.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h2>
        <p className="lead r">{t.contact.sub}</p>
        
        <div className="cta-row r d1" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={openContactPanel} className="bwa2" style={{ background: 'var(--blue)' }}>
            {t.contact.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;

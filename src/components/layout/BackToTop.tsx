import React from 'react';

interface BackToTopProps {
  visible: boolean;
}

const BackToTop: React.FC<BackToTopProps> = ({ visible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      className={`fixed bottom-9 right-30 z-[300] w-11.5 h-11.5 rounded-full border border-brand-gold/35 cursor-pointer bg-brand-green shadow-strong flex items-center justify-center transition-all duration-500 ease-smooth hover:bg-brand-green-light hover:-translate-y-1 hover:scale-105 hover:shadow-heavy md:right-30 sm:right-24
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-90 pointer-events-none'}`}
      onClick={scrollToTop} 
      aria-label="Back to top"
    >
      <svg className="w-3.5 h-3.5 stroke-white fill-none stroke-[2.2] stroke-round" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

export default BackToTop;

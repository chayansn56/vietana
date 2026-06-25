import React, { useEffect, useState } from 'react';

interface BackToTopProps {
  visible: boolean;
}

const BackToTop: React.FC<BackToTopProps> = ({ visible }) => {
  const [offsetBottom, setOffsetBottom] = useState(24);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adjust bottom offset dynamically as user reaches footer page limit
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
      const footerLimit = docHeight - 400; // Average height threshold of footer section
      
      if (scrollPos > footerLimit) {
        setOffsetBottom(Math.min(90, 24 + (scrollPos - footerLimit) * 0.15));
      } else {
        setOffsetBottom(24);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button 
      className={`fixed right-[36px] z-[300] w-12 h-12 rounded-full border border-brand-gold/35 cursor-pointer bg-[#1E4D45] shadow-strong flex items-center justify-center transition-all duration-500 ease-smooth hover:bg-[#1E4D45]/90 hover:-translate-y-1 hover:scale-105 hover:shadow-heavy
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
      style={{ bottom: `${offsetBottom}px` }}
      onClick={scrollToTop} 
      aria-label="Back to top"
    >
      <svg className="w-4 h-4 stroke-white fill-none stroke-[2.2] stroke-round" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

export default BackToTop;

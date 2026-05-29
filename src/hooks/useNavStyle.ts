import { useState, useEffect } from 'react';

export const useNavStyle = (scrollY: number, isScrolled: boolean) => {
  const [navClass, setNavClass] = useState('');

  useEffect(() => {
    const sections = ['services', 'packages', 'food', 'about', 'contact'];
    let currentNavClass = isScrolled ? 'glassy' : '';
    
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          if (['services', 'packages', 'food', 'about'].includes(id)) {
            currentNavClass = 'light';
          }
        }
      }
    }
    setNavClass(currentNavClass);
  }, [scrollY, isScrolled]);

  return navClass;
};

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, TRANSLATIONS, TranslationSchema } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check if a googtrans cookie is set
    const match = document.cookie.match(/googtrans=\/en\/(hi|vi|en)/i);
    if (match && match[1]) {
      const code = match[1].toUpperCase();
      if (code === 'HI' || code === 'VI' || code === 'EN') {
        return code as Language;
      }
    }
    // 2. Check localStorage
    const saved = localStorage.getItem('vietana_lang');
    return (saved as Language) || 'EN';
  });

  const applyGoogleTranslation = useCallback((targetLang: Language) => {
    const langCode = targetLang.toLowerCase();
    const cookieVal = `/en/${langCode}`;
    const host = window.location.hostname;

    // Set cookie on root path
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (host && host !== 'localhost' && !host.includes('127.0.0.1')) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${host};`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`;
    }

    if (targetLang === 'EN') {
      // Clear cookie for English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      if (host && host !== 'localhost' && !host.includes('127.0.0.1')) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      }
    }

    // Trigger select element in DOM if available
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vietana_lang', lang);
    document.documentElement.lang = lang.toLowerCase();
    applyGoogleTranslation(lang);
  };

  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();

    // If language is HI or VI on initial mount, ensure Google Translate runs
    if (language !== 'EN') {
      applyGoogleTranslation(language);
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (select) {
          if (select.value !== language.toLowerCase()) {
            select.value = language.toLowerCase();
            select.dispatchEvent(new Event('change'));
          }
          clearInterval(interval);
        } else if (attempts >= 20) {
          clearInterval(interval);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [language, applyGoogleTranslation]);

  // Ensure Google Translate never shifts document.body down
  useEffect(() => {
    const resetBodyOffset = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.setProperty('top', '0px', 'important');
      }
      if (document.body.style.position && document.body.style.position !== 'static') {
        document.body.style.setProperty('position', 'static', 'important');
      }
    };

    resetBodyOffset();
    const observer = new MutationObserver(resetBodyOffset);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

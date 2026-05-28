import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TRANSLATIONS, TranslationSchema } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vietana_lang');
    return (saved as Language) || 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vietana_lang', lang);
    document.documentElement.lang = lang.toLowerCase();
  };

  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CurrencyProvider>
  </StrictMode>,
);

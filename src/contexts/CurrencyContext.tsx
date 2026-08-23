import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'INR' | 'USD' | 'VND';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATES = {
  INR: 1, // base
  USD: 1 / 85,
  VND: 25000 / 85 // rough estimate based on USD rate
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('vietana_currency') as Currency;
    if (saved && ['INR', 'USD', 'VND'].includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('vietana_currency', c);
  };

  const formatPrice = (inrValue: number) => {
    if (inrValue === 0) return 'Free';
    if (inrValue === -1) return 'Pricing Upon Request';
    
    let value = inrValue;
    let maximumFractionDigits = 0;

    if (currency === 'USD') {
      value = inrValue * RATES.USD;
      maximumFractionDigits = 0;
    } else if (currency === 'VND') {
      value = inrValue * RATES.VND;
      maximumFractionDigits = 0;
    }

    // Rounding logic for cleaner prices
    if (currency === 'VND') {
      value = Math.ceil(value / 10000) * 10000; // Round to nearest 10k
    } else if (currency === 'USD') {
      value = Math.ceil(value);
    } else {
      value = Math.ceil(value / 100) * 100; // Round to nearest 100 INR
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'VND' ? 'VND' : (currency === 'USD' ? 'USD' : 'INR'),
      maximumFractionDigits
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

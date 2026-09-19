import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'INR' | 'USD' | 'VND' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATES = {
  INR: 1, // base for package INR
  USD: 1 / 85,
  EUR: 1 / 93,
  VND: 1000000 / 3700 // 1,000,000 VND = 3,700 INR => 1 INR = 270.27 VND
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('vietana_currency') as Currency;
    if (saved && ['INR', 'USD', 'VND', 'EUR'].includes(saved)) {
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
    } else if (currency === 'EUR') {
      value = inrValue * RATES.EUR;
      maximumFractionDigits = 0;
    } else if (currency === 'VND') {
      value = inrValue * RATES.VND;
      maximumFractionDigits = 0;
    }

    // Rounding logic for cleaner prices
    if (currency === 'VND') {
      value = Math.ceil(value / 10000) * 10000; // Round to nearest 10k
    } else if (currency === 'USD' || currency === 'EUR') {
      value = Math.ceil(value);
    } else {
      value = Math.ceil(value / 100) * 100; // Round to nearest 100 INR
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
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

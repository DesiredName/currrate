import React, { useContext, createContext } from 'react';
import type { ReactNode } from 'react';
import type { ExchangeServiceInstance } from '../../service/exchange';

interface ExchangeServiceContextType {
  rates: {
    data: CurrencyRate[];
    loading: boolean;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
  };
  conversions: {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    currencyCode: string;
    setCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
    convertedAmount: number;
    loading: boolean;
    error: boolean;
  };
}

const ExchangeServiceContext = createContext<ExchangeServiceContextType | null>(null);

interface ExchangeServiceProviderProps {
  service: ExchangeServiceInstance;
  children: ReactNode;
}

export function ExchangeServiceProvider({ service, children }: ExchangeServiceProviderProps) {
    const rates = service.useExchangeRates();
    const conversions = service.useCurrencyConversion();

  const value: ExchangeServiceContextType = {
    rates,
    conversions
  };

  return (
    <ExchangeServiceContext.Provider value={value}>
      {children}
    </ExchangeServiceContext.Provider>
  );
}

export function useExchangeService() {
  const context = useContext(ExchangeServiceContext);
  if (!context) {
    throw new Error('ExchangeServiceProvider is not initiated or called outside of the context');
  }
  return context;
}

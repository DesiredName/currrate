import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ExchangeAPI from './api/exchange';
import ExchangeService from './service/exchange';

const queryClient = new QueryClient();
const exchangeAPI = ExchangeAPI();
const exchangeService = ExchangeService(exchangeAPI);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App exchangeService={exchangeService} />
    </QueryClientProvider>
  </React.StrictMode>
);

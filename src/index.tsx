import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Reset } from 'styled-reset';

import theme from './theme/theme';

import App from './App';

import ExchangeAPI from './api/exchange';
import ExchangeService from './service/exchange';
import LocalExchangeAPI from './api/local.exchange';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient();
const exchangeAPI =
    process.env.NODE_ENV === 'development' ? LocalExchangeAPI() : ExchangeAPI();
const exchangeService = ExchangeService(exchangeAPI);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);



root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Reset />
            <QueryClientProvider client={queryClient}>
                <App exchangeService={exchangeService} />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
);

import { useQuery } from '@tanstack/react-query';
import './App.css';
import { useEffect } from 'react';
import { type ApiResponseRates } from '../utils/api-scheme';

const fetchExchangeRates = async () => {
    const response = await fetch('/api/ex-rates');

    return response.ok === true 
        ? await response.json() as unknown as ApiResponseRates
        : { success: false } as ApiResponse<never>;
};

function App() {
    const { data, isLoading, refetch /* error */ } = useQuery({
        queryKey: ['exchange-rates'],
        queryFn: fetchExchangeRates,
        initialData: { success: false },
    });

    useEffect(() => {
        refetch();
    });

    return (
        <div className="App">
            {isLoading && 'Loading...'}
            {data.success === true && data.data.join(';')}
            {data.success === false && 'failed to load data'}
        </div>
    );
}

export default App;

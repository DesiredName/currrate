import { useEffect, useState } from "react";
import type { ApiResponseConversion, ApiResponseRates, APIConversionQueryParametersType } from "../../../utils/api-scheme";

export interface ExchangeAPIInstance {
    fetchExchangeRates(): Promise<ApiResponseRates>;
    fetchConversionResult(params: APIConversionQueryParametersType): Promise<ApiResponseConversion>;
}

export interface ExchangeServiceInstance {
    useExchangeRates: () => {
        data: CurrencyRate[],
        loading: boolean,
        error: boolean,
        setError: React.Dispatch<React.SetStateAction<boolean>>
    }

    useCurrencyConversion: () => {
        amount: number;
        setAmount: React.Dispatch<React.SetStateAction<number>>,
        currency: string;
        setCurrency: React.Dispatch<React.SetStateAction<string>>,
        convertedAmount: number,
        loading: boolean,
        error: boolean
    }
}

export default function ExchangeService(api: ExchangeAPIInstance): ExchangeServiceInstance {
    return {
        useExchangeRates: () => {
            const [data, setData] = useState<CurrencyRate[]>([]);
            const [loading, setLoading] = useState<boolean>(true);
            const [error, setError] = useState<boolean>(false);

            useEffect(() => {
                const fetchData = async () => {
                    setError(false);

                    try {
                        setLoading(true);

                        const response = await api.fetchExchangeRates();

                        if (response.success === true && Array.isArray(response.data)) {
                            setData(response.data);
                        } else {
                            throw new Error('Failed to fetch rates');
                        }
                    } catch (_err) {
                        setError(true);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchData();
            }, []);

            return { data, loading, error, setError };
        },

        useCurrencyConversion: () => {
            const [loading, setLoading] = useState<boolean>(false);
            const [amount, setAmount] = useState<number>(1);
            const [currency, setCurrency] = useState<string>('');
            const [error, setError] = useState<boolean>(false);
            const [convertedAmount, setConvertedAmount] = useState<number>(0);

            useEffect(() => {
                const convert = async (params: APIConversionQueryParametersType) => {
                    setError(false);
                    try {
                        setLoading(true);

                        const response = await api.fetchConversionResult(params);

                        if (response.success === true && typeof response.data === 'number') {
                            setConvertedAmount(response.data);
                        } else {
                            setConvertedAmount(0);
                        }
                    } catch (err) {
                        setError(true);
                    } finally {
                        setLoading(false);
                    }

                    return 0;
                };

                setLoading(true)
                
                const handlerID = window.setTimeout(() => convert({
                    to: currency,
                    amount: amount.toString(),
                }), 300);
                
                return () => {
                    setLoading(false)
                    window.clearTimeout(handlerID);
                }
            }, [amount, currency]);

            return { amount, setAmount, currency, setCurrency, convertedAmount, loading, error };
        }
    }
}
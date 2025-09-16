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
        error: boolean
    }

    useCurrencyConversion: () => {
        setAmount: React.Dispatch<React.SetStateAction<number>>,
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

            return { data, loading, error };
        },

        useCurrencyConversion: () => {
            const [loading, setLoading] = useState<boolean>(false);
            const [amount, setAmount] = useState<number>(0);
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

                convert({
                    to: currency,
                    amount: amount.toString(),
                })
            }, [amount, currency]);

            return { setAmount, setCurrency, convertedAmount, loading, error };
        }
    }
}
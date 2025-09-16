import type { ApiResponseConversion, ApiResponseRates, APIConversionQueryParametersType } from "../../utils/api-scheme";
import type { ExchangeAPIInstance } from "../service/exchange/index";

export default function ExchangeAPI(base: string = ''): ExchangeAPIInstance {
    return {
        fetchExchangeRates: async () => {
            const response = await fetch(`${base}/api/ex-rates`);

            return response.ok === true
                ? ((await response.json()) as unknown as ApiResponseRates)
                : ({ success: false } as ApiResponse<never>);
        },

        fetchConversionResult: async (params: APIConversionQueryParametersType) => {
            const search = new URLSearchParams(params);
            const response = await fetch(`${base}/api/ex-rates?${search.toString()}`);

            return response.ok === true
                ? ((await response.json()) as unknown as ApiResponseConversion)
                : ({ success: false } as ApiResponse<never>);
        }
    }
}
import type { ApiResponseConversion, APIConversionQueryParametersType } from "../../utils/api-scheme";
import ConvertAmount from "./utils/convertAmount";
import type { ExchangeAPIInstance } from "../service/exchange/index";

export default function LocalExchangeAPI(): ExchangeAPIInstance {
    const rates: CurrencyRate[] = [
        { "country": "Australia", "currency": "dollar", "amount": 1, "code": "AUD", "rate": 13.746 },
        { "country": "Brazil", "currency": "real", "amount": 1, "code": "BRL", "rate": 3.881 },
        { "country": "Bulgaria", "currency": "lev", "amount": 1, "code": "BGN", "rate": 12.438 },
        { "country": "Canada", "currency": "dollar", "amount": 1, "code": "CAD", "rate": 14.988 },
        { "country": "China", "currency": "renminbi", "amount": 1, "code": "CNY", "rate": 2.897 },
        { "country": "Denmark", "currency": "krone", "amount": 1, "code": "DKK", "rate": 3.259 },
        { "country": "EMU", "currency": "euro", "amount": 1, "code": "EUR", "rate": 24.325 },
        { "country": "Hongkong", "currency": "dollar", "amount": 1, "code": "HKD", "rate": 2.648 },
        { "country": "Hungary", "currency": "forint", "amount": 100, "code": "HUF", "rate": 6.239 },
        { "country": "Iceland", "currency": "krona", "amount": 100, "code": "ISK", "rate": 16.987 },
        { "country": "IMF", "currency": "SDR", "amount": 1, "code": "XDR", "rate": 28.299 },
        { "country": "India", "currency": "rupee", "amount": 100, "code": "INR", "rate": 23.401 },
        { "country": "Indonesia", "currency": "rupiah", "amount": 1000, "code": "IDR", "rate": 1.254 },
        { "country": "Israel", "currency": "new shekel", "amount": 1, "code": "ILS", "rate": 6.162 },
        { "country": "Japan", "currency": "yen", "amount": 100, "code": "JPY", "rate": 14.017 },
        { "country": "Malaysia", "currency": "ringgit", "amount": 1, "code": "MYR", "rate": 4.901 }
    ]

    return {
        fetchExchangeRates: async () => {
            await new Promise((res) => setTimeout(res, 2000));

            return Promise.resolve({
                "success": true,
                "data": rates
            });
        },

        fetchConversionResult: async ({ amount, to }: APIConversionQueryParametersType) => {
            const toRate = rates.find(rate => rate.code === to);
            const toTargetAmount = ConvertAmount(parseFloat(amount), toRate);

            return Promise.resolve({
                success: true,
                data: toTargetAmount,
            } satisfies ApiResponseConversion)
        }
    }
}
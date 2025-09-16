import { z } from 'zod';

export const ExchangeQueryParameters = z.object({
  amount: z.string().nonempty(),
  to: z.string().nonempty(),
});

export type ExchangeQueryParametersType = z.infer<typeof ExchangeQueryParameters>;

export type ApiResponseRates = ApiResponse<CurrencyRate[]>;
export type ApiResponseExchange = ApiResponse<number>;
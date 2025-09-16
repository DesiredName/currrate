import { z } from 'zod';

export const APIConversionQueryParameters = z.object({
  amount: z.string().nonempty(),
  to: z.string().nonempty(),
});

export type APIConversionQueryParametersType = z.infer<typeof APIConversionQueryParameters>;

export type ApiResponseRates = ApiResponse<CurrencyRate[]>;
export type ApiResponseConversion = ApiResponse<number>;
import type { VercelRequest, VercelResponse } from '@vercel/node';

import RequestRates from './../utils/requestRates.js';
import type { ApiResponseConversion, } from '../utils/api-scheme.js';
import { APIConversionQueryParameters, } from '../utils/api-scheme.js';
import ConvertAmount from '../utils/convertAmount.js';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    try {
        const rates = await RequestRates(process.env.PUBLIC_RATES_URL ?? '');
        const { amount, to } = APIConversionQueryParameters.parse(request.query);
        const toRate = rates.find(rate => rate.code === to);
        const toTargetAmount = ConvertAmount(parseFloat(amount), toRate);

        return response.status(200).json({
            success: true,
            data: toTargetAmount
        } satisfies ApiResponseConversion);
    } catch (ex) {
        console.error(ex);

        return response.status(200).json({ success: false } satisfies ApiResponse<never>);
    }
}
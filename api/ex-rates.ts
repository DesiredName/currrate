import type { VercelRequest, VercelResponse } from '@vercel/node';

import RequestRates from './requestRates.js';
import type { ApiResponseRates } from '../utils/api-scheme.js';

export default async function handler(
    _request: VercelRequest,
    response: VercelResponse,
) {
    try {
        const rates = await RequestRates(process.env.PUBLIC_RATES_URL ?? '');

        return response.status(200).json({ 
            success: true, 
            data: rates 
        } satisfies ApiResponseRates);
    } catch (ex) {
        console.error(ex);
        
        return response.status(200).json({ success: false } satisfies ApiResponse<never>);
    }
}
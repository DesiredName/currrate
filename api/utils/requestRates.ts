
export default async function RequestRates(serviceUrl: string): Promise<CurrencyRate[]> {
    const response = await fetch(serviceUrl);

    if (response.ok !== true) {
        throw new Error('Failed to fetch rates from bank service');
    }

    const text = await response.text();
    const success = text.trim().length > 0;

    if (success !== true) {
        throw new Error('Failed to parse rater from bank service response');
    }

    return parse(text);
}

export function parse(text: string): CurrencyRate[] {
    const result: CurrencyRate[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');

    // the first line is a date
    // the second line is a header
    if (lines.length <= 2) {
        return result;
    }

    for (let i = 2; i < lines.length; i++) {
 const line = lines[i].trim();
        if (!line) continue;
        
        const parts = line.split('|');
        
        if (parts.length < 5) continue;
        
        const amount = parseFloat(parts[2]);
        const rate = parseFloat(parts[4]);
        
        if (isNaN(amount) || isNaN(rate)) continue;
        if (!parts[0] || !parts[1] || !parts[3]) continue;

        result.push({
            country: parts[0],
            currency: parts[1],
            amount: amount,
            code: parts[3],
            rate: rate
        });
    }

    return result;
}


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

function parse(text: string): CurrencyRate[] {
    const result: CurrencyRate[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');

    // the first line is a date
    // the second line is a header
    if (lines.length <= 2) {
        return result;
    }

    for (let i = 2; i < lines.length; i++) {
        const [
            country, 
            currency, 
            amount, 
            code, 
            rate
        ] = lines[i].split('|') as [string, string, number, string, number];

        result.push({
            country, 
            currency, 
            amount, 
            code, 
            rate,
        });
    }

    return result;
}

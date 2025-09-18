import ConvertAmount from '../api/utils/convertAmount';

type ToRate = Pick<CurrencyRate, 'rate' | 'amount'>;

describe('ConvertAmount', () => {
    it('should correctly convert amount using rate and amount', () => {
        const amount = 100;
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(amount, to);
        
        expect(result).toBeCloseTo(3.9216, 4);
    });

    it('should correctly convert when currency amount is not 1', () => {
        const amount = 100;
        const to: ToRate = {
            rate: 25.5,
            amount: 100 
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBeCloseTo(392.1569, 4);
    });

    it('should return 0 when amount is undefined', () => {
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(undefined, to);

        expect(result).toBe(0);
    });

    it('should return 0 when to currency is undefined', () => {
        const amount = 100;
        
        const result = ConvertAmount(amount, undefined);

        expect(result).toBe(0);
    });

    it('should return 0 when amount is null', () => {
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(null as any, to);

        expect(result).toBe(0);
    });

    it('should return 0 when to currency is null', () => {
        const amount = 100;
        
        const result = ConvertAmount(amount, null as any);

        expect(result).toBe(0);
    });

    it('should return 0 when amount is NaN', () => {
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(NaN, to);

        expect(result).toBe(0);
    });

    it('should return 0 when amount is negative', () => {
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(-100, to);

        expect(result).toBe(0);
    });

    it('should return 0 when amount is 0', () => {
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(0, to);

        expect(result).toBe(0);
    });

    it('should return 0 when both parameters are undefined', () => {
        const result = ConvertAmount(undefined, undefined);

        expect(result).toBe(0);
    });

    it('should correctly convert USD to CZK', () => {
        const amount = 100;
        const to: ToRate = {
            rate: 22.5,
            amount: 1
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBeCloseTo(4.4444, 4);
    });

    it('should correctly convert JPY to CZK', () => {
        const amount = 1000;
        const to: ToRate = {
            rate: 16.5,
            amount: 100
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBeCloseTo(6060.6061, 4);
    });

    it('should handle very small amounts correctly', () => {
        const amount = 0.001;
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBeCloseTo(0.0000392157, 10);
    });

    it('should handle very large amounts correctly', () => {
        const amount = 1000000;
        const to: ToRate = {
            rate: 25.5,
            amount: 1
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBeCloseTo(39215.6863, 4);
    });

    it('should handle zero rate by returning Infinity', () => {
        const amount = 100;
        const to: ToRate = {
            rate: 0,
            amount: 1
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBe(Infinity);
    });

    it('should handle zero currency amount by returning 0', () => {
        const amount = 100;
        const to: ToRate = {
            rate: 25.5,
            amount: 0
        };
        
        const result = ConvertAmount(amount, to);

        expect(result).toBe(0);
    });
});
import ConvertAmount from "./convertAmount"

test('convert amount returns -1 if not float number', () => {
    [undefined, null, '', Symbol, {}, [], false].forEach((input) => {
        const result = ConvertAmount(parseFloat('amount'), { amount: 1, rate: 1 });
        
        expect(result).toBe(-1);
    })
})
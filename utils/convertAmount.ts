export default function ConvertAmount(
    amount?: number,
    to?: Pick<CurrencyRate, 'rate' | 'amount'>
) {
    if (to == null || amount == null || Number.isNaN(amount) || amount < 0) {
        return -1;
    } else {
        return amount / (to.rate / to.amount);
    }
}
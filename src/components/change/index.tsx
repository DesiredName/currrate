import type { ExchangeServiceInstance } from '../../service/exchange';

function ChangeTool(props: {
    isLoading: boolean;
    exchangeService: ExchangeServiceInstance;
    rates: CurrencyRate[];
}) {
    const { setAmount, setCurrency, convertedAmount } = props.exchangeService.useCurrencyConversion();

    return (
        <div>
            <div>
                <input
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                />
            </div>
            <div>
                {convertedAmount}
            </div>
        </div>
    );
}

export default ChangeTool;

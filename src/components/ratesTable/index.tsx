function RatesTable(props: { isLoading: boolean; rates: CurrencyRate[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Code</th>
                    <th>Amount</th>
                    <th>Rate (CZK)</th>
                </tr>
            </thead>
            <tbody>
                {props.rates.map((rate) => (
                    <tr key={rate.code}>
                        <td>{rate.currency}</td>
                        <td>{rate.code}</td>
                        <td>{rate.amount}</td>
                        <td>{rate.rate.toFixed(3)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default RatesTable;

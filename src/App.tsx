import ErrorDialog from './components/errorDialog';
import RatesTable from './components/ratesTable';
import ChangeTool from './components/change';
import type { ExchangeServiceInstance } from './service/exchange';

export default function App(props: { exchangeService: ExchangeServiceInstance }) {
    const { data, error, setError, loading } =
        props.exchangeService.useExchangeRates();

    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                paddingTop: '2rem',
            }}
        >
            <ErrorDialog
                isActive={loading === false && error === true}
                onClose={() => setError(false)}
            />
            <RatesTable isLoading={loading} data={error === true ? [] : data} />
            <ChangeTool
                isLoading={loading}
                data={error === true ? [] : data}
                exchangeService={props.exchangeService}
            />
        </div>
    );
}

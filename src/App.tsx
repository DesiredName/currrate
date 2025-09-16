import ErrorDialog from './components/errorDialog';
import RatesTable from './components/ratesTable';
import ChangeTool from './components/change';
import type { ExchangeServiceInstance } from './service/exchange';

function App(props: { exchangeService: ExchangeServiceInstance }) {
    const { data, error, loading } = props.exchangeService.useExchangeRates();

    return (
        <div className="App">
            <ErrorDialog
                isActive={loading === false && error === true}
                errorText="Failed to load resource"
            />
            <RatesTable
                isLoading={loading}
                rates={error === true ? [] : data}
            />
            <ChangeTool
                isLoading={loading}
                exchangeService={props.exchangeService}
                rates={error === true ? [] : data}
            />
        </div>
    );
}

export default App;

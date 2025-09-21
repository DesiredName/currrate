import ErrorDialog from './components/errorDialog';
import RatesTable from './components/ratesTable';
import ChangeTool from './components/change';

export default function App() {
    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                paddingTop: '2rem',
            }}
        >
            <ErrorDialog />
            <RatesTable />
            <ChangeTool />
        </div>
    );
}

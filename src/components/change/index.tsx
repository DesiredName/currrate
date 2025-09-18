import styled from 'styled-components';
import type { ExchangeServiceInstance } from '../../service/exchange';

export default function ChangeTool(props: {
    isLoading: boolean;
    data: CurrencyRate[];
    exchangeService: ExchangeServiceInstance;
}) {
    const { amount, setAmount, currency, setCurrency, convertedAmount, error, loading } =
        props.exchangeService.useCurrencyConversion();

    return (
        <div
            style={{
                position: 'sticky',
                bottom: '0',
                width: '100%',
            }}
        >
            <ConverterPlaceholder>
                <ConverterContainer>
                    <InputGroup>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            min="0"
                            step="0.01"
                            autoFocus={true}
                            aria-label='Amount to convert'
                            value={amount}
                            onChange={(e) => setAmount(e.target.valueAsNumber)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Select
                            id="toCurrency"
                            aria-label='select currency to convert from CZK'
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option>Select currency</option>
                            {props.data.map((rate) => (
                                <option key={`to-${rate.code}`} value={rate.code} aria-label={`convert CZK to ${rate.code}`}>
                                    {rate.code} - {rate.country}
                                </option>
                            ))}
                        </Select>
                    </InputGroup>

                    <div style={{ width: '100%', textAlign: 'center' }}>You will get</div>

                    {(props.isLoading) ? (
                        <Result>...</Result>
                    ): loading ? (
                        <Result>Calculating</Result>
                    ): currency === '' ? (
                        <Result>Choose currency</Result>
                    ) : error === false ? (
                        <Result>
                            {convertedAmount.toFixed(2)} {currency}
                        </Result>
                    ) : (
                        <ErrorMessage>Service unavailable</ErrorMessage>
                    )}
                </ConverterContainer>
            </ConverterPlaceholder>
        </div>
    );
}

const ConverterPlaceholder = styled.div`
    padding: 2rem 0;
`;

const ConverterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    width: 100%;
    padding: 1rem;
    
    @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
        width: 20rem;
        max-width: %;
        margin: 0 auto;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid ${(props) => props.theme.colors.text_placeholder};
    border-radius: 4px;
    font-size: 16px;
    outline: none !important;

    &:focus,
    &:focus-within {
        outline: none;
        border: 1px solid ${(props) => props.theme.colors.accent};
        box-shadow: 0 0 0 2px ${(props) => props.theme.colors.accent};
    }
`;

const Select = styled.select`
    padding: 1rem;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.text_placeholder};
    border-radius: 4px;
    font-size: 16px;
    outline: none !important;

    &:focus,
    &:focus-within {
        border: 1px solid ${(props) => props.theme.colors.accent};
        box-shadow: 0 0 0 2px ${(props) => props.theme.colors.accent};
    }
`;

const Result = styled.div`
    padding: 16px;
    background-color: ${(props) => props.theme.colors.text_placeholder};
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-top: 8px;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    margin-top: 4px;
`;

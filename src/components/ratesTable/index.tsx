import styled from 'styled-components';
import { shimmer } from '../../theme/animations';
import ReactCountryFlag from 'react-country-flag';
import { currencyCodeToCountryCode } from './utils/countryCodeConversion';
import { useExchangeService } from '../../provider/exchange';
import { useEffect } from 'react';

const SkeletonRow = () => (
    <SkeletonTableRow>
        <TableCell>
            <SkeletonFlag />
        </TableCell>
        <TableCell>
            <div>
                <SkeletonText width="60px" />
                <SkeletonText width="100px" />
            </div>
        </TableCell>
        <TableCell>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
            >
                <SkeletonText width="70px" />
                <SkeletonText width="40px" />
            </div>
        </TableCell>
    </SkeletonTableRow>
);

export default function CurrencyRatesTable() {
    const { rates, conversions } = useExchangeService();
    const rowId = (code: string) => `code-${code}`

    useEffect(() => {
        const el = document.getElementById(rowId(conversions.currencyCode));

        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [ conversions.currencyCode ])


    if (rates.loading === true) {
        return (
            <TableContainer>
                <TableTitle>Exchage Rates</TableTitle>
                <TableSubTitle>Best exchage rates ever!</TableSubTitle>

                <Table>
                    <tbody>
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                    </tbody>
                </Table>
            </TableContainer>
        );
    }

    if (rates.data.length === 0) {
        return (
            <TableContainer>
                <TableTitle>Exchage Rates</TableTitle>
                <TableSubTitle>Best exchage rates ever!</TableSubTitle>
                
                <div
                    style={{
                        padding: '2rem',
                        textAlign: 'center',
                    }}
                >
                    No currency data available
                </div>
            </TableContainer>
        );
    }

    return (
        <TableContainer>
            <TableTitle>Exchage Rates</TableTitle>
            <TableSubTitle>Best exchage rates ever!</TableSubTitle>
                
            <Table aria-label={`exchange rates table`}>
                <tbody>
                    {rates.data.map((item, index) => (
                        <TableRow 
                            key={index} 
                            id={rowId(item.code)}
                            isSelected={conversions.currencyCode === item.code}
                            role="button"
                            aria-label={`exchange rates for ${item.country}`} 
                            onClick={() => conversions.setCurrencyCode(item.code)}
                        >
                            <TableCell>
                                <FlagContainer>
                                    <ReactCountryFlag
                                        countryCode={currencyCodeToCountryCode(item.code) ?? ''}
                                        svg={true}
                                        style={{ width: '2em', height: '2em' }}
                                    />
                                </FlagContainer>
                            </TableCell>
                            <TableCell>
                                <CurrencyInfo>
                                    <CurrencyCode>{item.code}</CurrencyCode>
                                    <CountryName>{item.country}</CountryName>
                                </CurrencyInfo>
                            </TableCell>
                            <TableCell>
                                <RateInfo>
                                    <Rate aria-label={`exchange rate`}>{item.rate.toFixed(3)}</Rate>
                                    <Amount aria-label={`exchange rates amount`}>/ {item.amount}</Amount>
                                </RateInfo>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

const TableContainer = styled.div`
    width: 100%;
    min-width: 360px;
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;

    @media screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
        width: ${(props) => props.theme.breakpoints.md};
        margin: 0 auto;
    }
`;

const TableTitle = styled.h1`
    width: 100%;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem 0;
    border-collapse: collapse;
    user-select: none;
`;
    
const TableSubTitle = styled.h3`
    width: 100%;
    font-size: 1rem;
    font-weight: light;
    text-align: center;
    margin: 0 0 1rem 0;
    border-collapse: collapse;
    user-select: none;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr<{ isSelected: boolean }>`
    ${(props) => props.isSelected && `
        background-color: rgba(0, 0, 0, 0.1);
    ` }

    transition: background-color 300ms;

    &:hover {
        cursor: pointer;
        transition: background-color 300ms;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const TableCell = styled.td`
    padding: 1rem;
    vertical-align: middle;
`;

const FlagContainer = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
`;

const CurrencyInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CurrencyCode = styled.span`
    font-weight: bold;
    font-size: 2rem;
`;

const CountryName = styled.span`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text_muted};
    margin-top: 2px;
`;

const RateInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Rate = styled.span`
    font-weight: bold;
    font-size: 2rem;
`;

const Amount = styled.span`
    font-size: 1rem;
    color:  ${(props) => props.theme.colors.text_muted};
    margin-top: 2px;
`;

const SkeletonTableRow = styled.tr`
    background-color: white;
`;

const SkeletonFlag = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    animation: ${shimmer} 1600ms infinite linear;
    background: white;
    background: linear-gradient(to right, #ccc 8%, #ddd 18%, #ccc 33%);
    background-size: 800px 100px;
`;

const SkeletonText = styled.div<{ width?: string }>`
    height: 1rem;
    border-radius: 4px;
    animation: ${shimmer} 1600ms infinite linear;
    background: white;
    background: linear-gradient(to right, #ccc 8%, #ddd 18%, #ccc 33%);
    background-size: 800px 100px;
    width: ${(props) => props.width || '80px'};
    margin-bottom: 4px;
`;
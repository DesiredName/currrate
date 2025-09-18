import { currencyCodeToCountryCode } from '../components/ratesTable/utils/countryCodeConversion.ts';

describe('currencyCodeToCountryCode', () => {
  it('should return correct country code for valid currency codes', () => {
    expect(currencyCodeToCountryCode('USD')).toBe('US');
    expect(currencyCodeToCountryCode('EUR')).toBe('EU');
    expect(currencyCodeToCountryCode('GBP')).toBe('GB');
  });

  it('should handle case insensitive currency codes', () => {
    expect(currencyCodeToCountryCode('usd')).toBe('US');
    expect(currencyCodeToCountryCode('Eur')).toBe('EU');
    expect(currencyCodeToCountryCode('gbp')).toBe('GB');
    expect(currencyCodeToCountryCode('JpY')).toBe('JP');
  });

  it('should return null for unknown currency codes', () => {
    expect(currencyCodeToCountryCode('XYZ')).toBeNull();
    expect(currencyCodeToCountryCode('ABC')).toBeNull();
    expect(currencyCodeToCountryCode('')).toBeNull();
    expect(currencyCodeToCountryCode(null)).toBeNull();
    expect(currencyCodeToCountryCode(undefined)).toBeNull();
    expect(currencyCodeToCountryCode('USA')).toBeNull(); 
    expect(currencyCodeToCountryCode('GER')).toBeNull();
    expect(currencyCodeToCountryCode('FRA')).toBeNull();
    expect(currencyCodeToCountryCode('US')).toBeNull();
    expect(currencyCodeToCountryCode('ABCD')).toBeNull();
  });

  it('should handle special regional currency cases', () => {
    expect(currencyCodeToCountryCode('XAF')).toBe('CM'); 
    expect(currencyCodeToCountryCode('XCD')).toBe('AG');
    expect(currencyCodeToCountryCode('XOF')).toBe('SN');
  });
});
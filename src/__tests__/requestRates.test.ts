import { parse } from '../../api/utils/requestRates.ts';

describe('parse', () => {
  it('should parse valid text input into CurrencyRate objects', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.724
Bulgaria|lev|1|BGN|12.440`;

    const result = parse(inputText);
    
    expect(result).toEqual([
      {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 13.724
      },
      {
        country: 'Bulgaria',
        currency: 'lev',
        amount: 1,
        code: 'BGN',
        rate: 12.440
      }
    ]);
  });

  it('should handle different amount values correctly', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Japan|yen|100|JPY|15.342
Chile|peso|1000|CLP|2.456`;

    const result = parse(inputText);
    
    expect(result).toEqual([
      {
        country: 'Japan',
        currency: 'yen',
        amount: 100,
        code: 'JPY',
        rate: 15.342
      },
      {
        country: 'Chile',
        currency: 'peso',
        amount: 1000,
        code: 'CLP',
        rate: 2.456
      }
    ]);
  });

  it('should return empty array for empty input', () => {
    const inputText = '';
    const result = parse(inputText);
    expect(result).toEqual([]);
  });

  it('should return empty array when only header lines are provided', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate`;
    
    const result = parse(inputText);
    expect(result).toEqual([]);
  });

  it('should skip malformed lines', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.724
Invalid Line
Brazil|real|1|BRL|3.879
Another|Invalid|Line
Bulgaria|lev|1|BGN|12.440`;

    const result = parse(inputText);
    
    expect(result).toEqual([
      {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 13.724
      },
      {
        country: 'Brazil',
        currency: 'real',
        amount: 1,
        code: 'BRL',
        rate: 3.879
      },
      {
        country: 'Bulgaria',
        currency: 'lev',
        amount: 1,
        code: 'BGN',
        rate: 12.440
      }
    ]);
  });

  it('should ignore extra data in lines with extra fields', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.724|Extra Field
Brazil|real|1|BRL|3.879|Another|Extra Field`;

    const result = parse(inputText);
    
    expect(result).toEqual([
      {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 13.724
      },
      {
        country: 'Brazil',
        currency: 'real',
        amount: 1,
        code: 'BRL',
        rate: 3.879
      }
    ]);
  });

  it('should skip lines missing fields', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD
Brazil|real|1||3.879
||1|BGN|12.440`;

    const result = parse(inputText);
    
    expect(result).toEqual([]);
  });

  it('should correctly parse numerics', () => {
    const inputText = `17 Sep 2025 #181
Country|Currency|Amount|Code|Rate
Country1|currency|1|CODE|123.456
Country2|currency|100|CODE|0.789
Country3|currency|1000|CODE|1234.5678`;

    const result = parse(inputText);
    
    expect(result).toEqual([
      {
        country: 'Country1',
        currency: 'currency',
        amount: 1,
        code: 'CODE',
        rate: 123.456
      },
      {
        country: 'Country2',
        currency: 'currency',
        amount: 100,
        code: 'CODE',
        rate: 0.789
      },
      {
        country: 'Country3',
        currency: 'currency',
        amount: 1000,
        code: 'CODE',
        rate: 1234.5678
      }
    ]);
  });

  it('should handle random data', () => {
    let inputText = `17 Sep 2025 #181\nCountry|Currency|Amount|Code|Rate\n`;
    
    for (let i = 0; i < 100; i++) {
      inputText += `Country${i}|Currency${i}|${i + 1}|COD${i}|${(i + 1) * 1.23}\n`;
    }

    const result = parse(inputText);
    
    expect(result).toHaveLength(100);
    expect(result[0]).toEqual({
      country: 'Country0',
      currency: 'Currency0',
      amount: 1,
      code: 'COD0',
      rate: 1.23
    });
    expect(result[99]).toEqual({
      country: 'Country99',
      currency: 'Currency99',
      amount: 100,
      code: 'COD99',
      rate: 123
    });
  });
});
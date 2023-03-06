import axios from 'axios';
import { convertCurrencies, getConversionRate } from './currencyRates';
import * as convertCurrenciesModule from './currencyRates';
import { expect, jest, it } from '@jest/globals';

jest.mock('axios');

const axiosGet = jest.mocked(axios.get);
describe('currencyRates', () => {
  beforeEach(() => {
    axiosGet.mockClear();
  });

  it('should fetch currency rate from external API', async () => {
    axiosGet.mockResolvedValueOnce({ data: { info: { quote: 42 } } });
    await getConversionRate('EUR', 'CZK');
    expect(axiosGet).toHaveBeenCalledTimes(1);
  });

  it('should load currency rate from cache', async () => {
    axiosGet.mockResolvedValueOnce({ data: { info: { quote: 1.3 } } });
    await getConversionRate('CZK', 'EUR');
    await getConversionRate('CZK', 'EUR');
    await getConversionRate('CZK', 'EUR');
    expect(axiosGet).toHaveBeenCalledTimes(1);
  });

  it('should convert 2 different currencies', async () => {
    jest
      .spyOn(convertCurrenciesModule, 'getConversionRate')
      .mockResolvedValueOnce(42);
    expect(await convertCurrencies('EUR', 'CZK', 2)).toBe(84);
  });

  it('should convert 2 identical currencies without fetching any 3rd party data', async () => {
    expect(await convertCurrencies('CZK', 'CZK', 2.14)).toBe(2.14);
  });
});

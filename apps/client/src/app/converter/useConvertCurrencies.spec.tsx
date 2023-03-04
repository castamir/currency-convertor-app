import { renderHook, act } from '@testing-library/react-hooks';
import { useConvertCurrencies } from './useConvertCurrencies';
import * as API from '../../__generated__/api';

describe('useConvertCurrencies', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useConvertCurrencies());

    expect(result.current.data).toBe(undefined);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should return data on successful API call', async () => {
    jest.spyOn(API, 'convertCurrencies').mockResolvedValue({
      currencyFrom: 'EUR',
      currencyTo: 'CZK',
      amount: 1,
      result: 23.95,
    });

    const { result } = renderHook(() => useConvertCurrencies());

    await act(async () => {
      result.current.handleSubmit({
        currencyFrom: 'EUR',
        currencyTo: 'CZK',
        amount: 1,
      });
    });

    expect(result.current.data?.result).toBe(23.95);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should return error on failed API call', async () => {
    jest.spyOn(API, 'convertCurrencies').mockRejectedValue('error');

    const { result } = renderHook(() => useConvertCurrencies());

    await act(async () => {
      result.current.handleSubmit({
        currencyFrom: 'EUR',
        currencyTo: 'CZK',
        amount: 1,
      });
    });

    expect(result.current.data?.result).toBe(undefined);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});

import { renderHook } from '@testing-library/react-hooks';
import { useFetchCurrencies } from './useFetchCurrencies';
import * as API from '../../__generated__/api';

describe('useFetchCurrencies', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useFetchCurrencies());

    expect(result.current.data).toStrictEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
  });

  it('should return data on successful API call', async () => {
    jest
      .spyOn(API, 'fetchCurrencies')
      .mockResolvedValue({ data: [{ value: 'CZK' }, { value: 'EUR' }] });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCurrencies()
    );

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual([
      { value: 'CZK' },
      { value: 'EUR' },
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should return error on failed API call', async () => {
    jest.spyOn(API, 'fetchCurrencies').mockRejectedValue('error');

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCurrencies()
    );

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});

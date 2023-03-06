import axios from 'axios';

describe('/api/currencies', () => {
  it('should return a list of currencies', async () => {
    const response = await axios.get(`/api/currencies`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      data: [
        { value: 'USD' },
        { value: 'EUR' },
        { value: 'CZK' },
        { value: 'GBP' },
      ],
    });
  });

  it('should convert 2 EUR to CZK', async () => {
    const payload = {
      currencyFrom: 'EUR',
      currencyTo: 'CZK',
      amount: 2,
    };
    const response = await axios.post(`/api/currencies/convert`, payload);

    expect(response.status).toBe(200);
    expect(response.data?.currencyFrom).toBe('EUR');
    expect(response.data?.currencyTo).toBe('CZK');
    expect(response.data?.amount).toBe(2);
    expect(response.data?.result).toBeGreaterThanOrEqual(40);
    expect(response.data?.result).toBeLessThanOrEqual(50);
  });
});

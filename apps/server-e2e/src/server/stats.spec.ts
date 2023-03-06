import axios from 'axios';

describe('/api/stats', () => {
  it('should return currency usage stats', async () => {
    const response = await axios.get(`/api/stats`);

    expect(response.status).toBe(200);
    expect(response.data.requestCount).toBeDefined();
    expect(response.data.mostPopularDestCurrency).toBeDefined();
    expect(response.data.totalAmountInDollars).toBeDefined();
  });
});

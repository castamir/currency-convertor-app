import { getMostPopularCurrency } from './currencyStats';

describe('currencyStats', () => {
  describe('getMostPopularDestCurrency', () => {
    it.each`
      result   | usageStats                              | description
      ${''}    | ${{}}                                   | ${'there are no usages'}
      ${'CZK'} | ${{ CZK: 5, EUR: 4 }}                   | ${'the most popular is first'}
      ${'CZK'} | ${{ EUR: 4, CZK: 5 }}                   | ${'the most popular is last'}
      ${'CZK'} | ${{ EUR: 4, USD: 3, CZK: 15, GBP: 6 }}  | ${'the most popular is in the middle'}
      ${'USD'} | ${{ EUR: 4, USD: 15, CZK: 15, GBP: 6 }} | ${'even when there is another currency later on with the same number of usages'}
    `(
      'should "$result" currency when $description',
      ({ result, usageStats }) => {
        expect(getMostPopularCurrency(usageStats)).toEqual(result);
      }
    );
  });
});

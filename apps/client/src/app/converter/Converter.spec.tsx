import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Converter } from './Converter';

import * as useConvertCurrenciesModule from './useConvertCurrencies';
import * as useFetchCurrenciesModule from './useFetchCurrencies';

describe('Converter', () => {
  it('should be loading by default', async () => {
    render(<Converter />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render form once currencies are loaded', async () => {
    jest.spyOn(useFetchCurrenciesModule, 'useFetchCurrencies').mockReturnValue({
      data: [{ value: 'EUR' }, { value: 'CZK' }],
      loading: false,
      error: false,
    });

    render(<Converter />);
    expect(screen.getByTestId('converter-form')).toBeInTheDocument();
  });

  it('should render result once results are loaded', async () => {
    jest
      .spyOn(useConvertCurrenciesModule, 'useConvertCurrencies')
      .mockReturnValue({
        data: {
          currencyFrom: 'EUR',
          currencyTo: 'CZK',
          amount: 1,
          result: 23.95,
        },
        loading: false,
        error: false,
        handleSubmit: jest.fn(),
      });
    render(<Converter />);
    expect(screen.getByTestId('converter-results')).toBeInTheDocument();
    expect(screen.getByTestId('converter-results')).toHaveTextContent(
      '1.00 EUR = 23.95 CZK'
    );
  });
});

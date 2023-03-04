import Box from '@mui/material/Box';
import React from 'react';
import { ConverterForm } from './ConverterForm';
import { useConvertCurrencies } from './useConvertCurrencies';
import { useFetchCurrencies } from './useFetchCurrencies';

export const Converter = () => {
  const { data: currencies, loading: loadingCurrencies } = useFetchCurrencies();
  const {
    data: result,
    loading: loadingResult,
    handleSubmit,
  } = useConvertCurrencies();

  return (
    <Box sx={{ width: '300px' }}>
      {loadingCurrencies && <Box>Loading</Box>}

      {!loadingCurrencies && currencies && (
        <Box data-testid="converter-form">
          <ConverterForm currencies={currencies} onConvert={handleSubmit} />
        </Box>
      )}

      {!loadingResult && result && (
        <Box data-testid="converter-results">
          {result.amount.toFixed(2)} {result.currencyFrom} ={' '}
          {result.result.toFixed(2)} {result.currencyTo}
        </Box>
      )}
    </Box>
  );
};

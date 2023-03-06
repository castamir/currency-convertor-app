import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ConverterForm } from './ConverterForm';
import { useConvertCurrencies } from './useConvertCurrencies';
import { useFetchCurrencies } from './useFetchCurrencies';

export const Converter = () => {
  const { data: currencies, loading: loadingCurrencies } = useFetchCurrencies();
  const {
    data: result,
    loading: loadingResult,
    error: errorResult,
    handleSubmit,
  } = useConvertCurrencies();

  return (
    <Box data-testid="converter-ui">
      <Typography variant={'h4'}>Currency convertor</Typography>
      <Stack spacing={2}>
        {loadingCurrencies && <Box>Loading</Box>}

        {!loadingCurrencies && currencies && (
          <Box data-testid="converter-form">
            <ConverterForm currencies={currencies} onConvert={handleSubmit} />
          </Box>
        )}

        {errorResult && <Alert color={'error'}>Server returned an error</Alert>}

        <Box data-testid="converter-results">
          Result:{' '}
          {!loadingResult && result && (
            <>
              {result.amount.toFixed(2)} {result.currencyFrom} ={' '}
              {result.result.toFixed(2)} {result.currencyTo}
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

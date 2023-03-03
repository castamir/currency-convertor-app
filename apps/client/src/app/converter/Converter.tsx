import Box from '@mui/material/Box';
import React from 'react';
import { ConverterForm } from './ConverterForm';

const currencies = [
  {
    value: 'USD',
  },
  {
    value: 'EUR',
  },
  {
    value: 'CZK',
  },
  {
    value: 'GBP',
  },
];

export const Converter = () => {
  return (
    <Box sx={{ width: '300px' }}>
      <ConverterForm
        currencies={currencies}
        onConvert={(values) => {
          console.log(values);
        }}
      />
    </Box>
  );
};

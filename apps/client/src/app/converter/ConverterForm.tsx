import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';

const currencies = [
  {
    value: 'USD',
  },
  {
    value: 'EUR',
  },
  {
    value: 'BTC',
  },
  {
    value: 'JPY',
  },
];

export const ConverterForm = () => {
  return (
    <Stack spacing={2} aria-describedby="converter-form">
      <TextField
        select
        label="Currency from"
        defaultValue="EUR"
        helperText="Please select your currency"
        InputLabelProps={{
          shrink: true,
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Currency to"
        defaultValue="EUR"
        helperText="Please select your currency"
        InputLabelProps={{
          shrink: true,
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained">Convert</Button>
    </Stack>
  );
};

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type Values = {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
};

type Props = {
  currencies: { value: string }[];
  onConvert: (values: Values) => void;
};

export const ConverterForm = ({ currencies, onConvert }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      currencyFrom: '',
      currencyTo: '',
      amount: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onConvert({
          ...values,
          amount: parseFloat(values.amount),
        });
      })}
    >
      <Stack spacing={2} aria-describedby="converter-form">
        <Controller
          name="currencyFrom"
          control={control}
          rules={{ required: 'Required field' }}
          render={({ field, fieldState }) => (
            <TextField
              select
              id={field.name}
              label="Currency from"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="currencyTo"
          control={control}
          rules={{ required: 'Required field' }}
          render={({ field, fieldState }) => (
            <TextField
              select
              id={field.name}
              label="Currency to"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="amount"
          control={control}
          rules={{ required: 'Required field' }}
          render={({ field, fieldState }) => (
            <TextField
              id={field.name}
              label="Amount"
              type="number"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Convert
        </Button>
      </Stack>
    </form>
  );
};

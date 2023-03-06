import * as yup from 'yup';

export const currencies = ['USD', 'EUR', 'CZK', 'GBP'];
export const convertValidationSchema = yup.object({
  currencyFrom: yup.string().required().oneOf(currencies),
  currencyTo: yup.string().required().oneOf(currencies),
  amount: yup.number().required().positive(),
});

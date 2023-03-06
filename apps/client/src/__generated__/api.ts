import axios from 'axios';

export type ConvertCurrenciesArgs = {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
};

export type ConvertCurrenciesResponse = {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  result: number;
};

export async function convertCurrencies(
  payload: ConvertCurrenciesArgs
): Promise<ConvertCurrenciesResponse> {
  const response = await axios.post(`/api/currencies/convert`, payload);
  return response.data;
}

export type FetchCurrenciesResponse = {
  data: { value: string }[];
};
export async function fetchCurrencies(): Promise<FetchCurrenciesResponse> {
  const response = await axios.get(`/api/currencies`);
  return response.data;
}

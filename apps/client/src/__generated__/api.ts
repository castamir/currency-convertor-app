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
  args: ConvertCurrenciesArgs
): Promise<ConvertCurrenciesResponse> {
  // TODO replace with real API call

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...args,
        result: 42,
      });
    }, 200);
  });
}

export type FetchCurrenciesResponse = {
  data: { value: string }[];
};
export async function fetchCurrencies(): Promise<FetchCurrenciesResponse> {
  // TODO replace with real API call

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
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
        ],
      });
    }, 200);
  });
}

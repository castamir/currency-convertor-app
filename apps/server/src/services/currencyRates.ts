const cache: Record<string, { expirationTimestamp: number; rate: number }> = {};

export const getConversionRate = async (
  currencyFrom: string,
  currencyTo: string
): Promise<number> => {
  const today = new Date();
  const cacheKey = `${currencyFrom}-${currencyTo}`;

  if (cache && cache[cacheKey]?.expirationTimestamp > today.getUTCDate()) {
    return cache[cacheKey].rate;
  }

  // todo fetch rate
  const rate = 24;

  cache[cacheKey] = {
    expirationTimestamp: today.setUTCDate(today.getUTCDate() + 1),
    rate,
  };

  return rate;
};

export const convertCurrencies = async (
  currencyFrom: string,
  currencyTo: string,
  amount: number
): Promise<number> => {
  const rate = await getConversionRate(currencyFrom, currencyTo);
  return rate * amount;
};

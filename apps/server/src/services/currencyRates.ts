import axios from 'axios';
import * as process from 'process';

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

  try {
    const config = {
      headers: {
        apikey: process.env.APILAYER_API_ID,
      },
    };

    const response = await axios.get(
      `https://api.apilayer.com/currency_data/convert?to=${currencyTo}&from=${currencyFrom}&amount=${1}`,
      config
    );

    const rate = response.data.info.quote;

    cache[cacheKey] = {
      expirationTimestamp: today.setUTCDate(today.getUTCDate() + 1),
      rate,
    };

    return rate;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const convertCurrencies = async (
  currencyFrom: string,
  currencyTo: string,
  amount: number
): Promise<number> => {
  if (currencyFrom === currencyTo) {
    return amount;
  }

  const rate = await getConversionRate(currencyFrom, currencyTo);

  // round to 6 decimals
  return Math.round(rate * amount * 1000000) / 1000000;
};

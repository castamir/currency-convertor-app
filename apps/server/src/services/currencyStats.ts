import fs from 'fs';
import { convertCurrencies } from './currencyRates';

const FILE_PATH = 'currencies.stats.json';

type Stats = {
  requestCount: number;
  mostPopularDestCurrency: string;
  currencyUsage: Record<string, number>;
  totalAmountInDollars: number;
};

function getMostPopularCurrency(currencyUsage: Stats['currencyUsage']): string {
  const entries = Object.entries(currencyUsage); // i.e. ['CZK', 42], ['EUR', 4], ...

  const mostPopularCurrency = entries.reduce(
    (top, [itemName, itemCount]) => {
      if (itemCount > top.count) {
        return { name: itemName, count: itemCount };
      }
      return top;
    },
    { name: '', count: -Infinity }
  );

  return mostPopularCurrency.name;
}

export const logUsage = async (
  currencyFrom: string,
  currencyTo: string,
  amount: number
) => {
  const { requestCount, currencyUsage, totalAmountInDollars } = readStats();

  try {
    const currentUsage = currencyUsage[currencyTo] ?? 0;
    currencyUsage[currencyTo] = currentUsage + 1;

    const nextRequestCount = requestCount + 1;
    const nextMostPopularCurrency = getMostPopularCurrency(currencyUsage);
    const amountInDollars = await convertCurrencies(
      currencyFrom,
      'USD',
      amount
    );

    const nextTotalAmountInDollars =
      Math.round((totalAmountInDollars + amountInDollars) * 1000000) / 1000000;

    const stats: Stats = {
      requestCount: nextRequestCount,
      mostPopularDestCurrency: nextMostPopularCurrency,
      currencyUsage,
      totalAmountInDollars: nextTotalAmountInDollars,
    };
    dumpStats(stats);
  } catch (e) {
    // defaults to not storing data in case of an error, because of possible data inconsistency inside stats
    console.error(e);
  }
};

export const readStats = (): Stats => {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const fileContent = fs.readFileSync(FILE_PATH, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (err) {
    console.error(err);
  }

  // defaults in case of missing or malformed file
  return {
    requestCount: 0,
    mostPopularDestCurrency: '',
    currencyUsage: {},
    totalAmountInDollars: 0,
  };
};

export const dumpStats = (stats: Stats) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
  } catch (err) {
    console.error(err);
  }
};

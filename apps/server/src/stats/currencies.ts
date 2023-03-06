import fs from 'fs';
import { convertCurrencies } from '../services/currencyRates';

const FILE_PATH = '../../data/currencies.stats.json';

type Stats = {
  requestCount: number;
  mostPopularDestCurrency: string;
  currencyUsage: Record<string, number>;
  totalAmountInDollars: number;
};

function getMostPopularCurrency(currencyUsage: Stats['currencyUsage']): string {
  const entries = Object.entries(currencyUsage);
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

  const currentUsage = currencyUsage[currencyTo] ?? 0;
  currencyUsage[currencyTo] = currentUsage + 1;

  const nextRequestCount = requestCount + 1;
  const nextMostPopularCurrency = getMostPopularCurrency(currencyUsage);
  const nextTotalAmountInDollars =
    totalAmountInDollars +
    (await convertCurrencies(currencyFrom, 'USD', amount));

  const stats: Stats = {
    requestCount: nextRequestCount,
    mostPopularDestCurrency: nextMostPopularCurrency,
    currencyUsage,
    totalAmountInDollars: nextTotalAmountInDollars,
  };
  dumpStats(stats);
};

export const readStats = (): Stats => {
  let fileContent = '{}';
  try {
    fileContent = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  } catch (err) {
    console.error(err);
  }

  const json = JSON.parse(fileContent);
  return {
    requestCount: json?.requestCount || 0,
    mostPopularDestCurrency: json?.mostPopularDestCurrency || '',
    currencyUsage: json?.currencyUsage || [],
    totalAmountInDollars: json?.totalAmountInDollars || 0,
  };
};

export const dumpStats = (stats: Stats) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
  } catch (err) {
    console.error(err);
  }
};

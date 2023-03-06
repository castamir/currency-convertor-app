import express from 'express';
import { readStats } from '../../services/currencyStats';

const router = express.Router();

router.get('/', async function (req, res) {
  const stats = await readStats();

  res.send({
    requestCount: stats.requestCount,
    mostPopularDestCurrency: stats.mostPopularDestCurrency,
    totalAmountInDollars: stats.totalAmountInDollars,
  });
});

export default router;

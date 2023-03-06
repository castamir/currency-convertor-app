import express from 'express';
import { convertCurrencies } from '../../services/currencyRates';
import { logUsage } from '../../stats/currencies';

const router = express.Router();

router.get('/', function (req, res) {
  res.send({
    data: [
      { value: 'USD' },
      { value: 'EUR' },
      { value: 'CZK' },
      { value: 'GBP' },
    ],
  });
});

router.post('/convert', async function (req, res) {
  /*
   todo validate request body structure,
     - 3 letters long currencies (or known currencies)
     - amount is a positive number
   */

  res.on('finish', async () => {
    await logUsage(req.body.currencyFrom, req.body.currencyTo, req.body.amount);
  });

  try {
    const result = await convertCurrencies(
      req.body.currencyFrom,
      req.body.currencyTo,
      req.body.amount
    );
    res.send({
      ...req.body,
      result,
    });
  } catch (e) {
    res.status(500);
    res.send('internal error');
  }
});

export default router;

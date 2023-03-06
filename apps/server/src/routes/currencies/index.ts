import express from 'express';
import { convertCurrencies } from '../../services/currencyRates';
import { logUsage } from '../../services/currencyStats';
import { convertValidationSchema, currencies } from './utils';

const router = express.Router();

router.get('/', function (req, res) {
  res.send({
    data: currencies.map((currency) => ({ value: currency })),
  });
});

router.post('/convert', async function (req, res) {
  res.on('finish', async () => {
    await logUsage(req.body.currencyFrom, req.body.currencyTo, req.body.amount);
  });

  try {
    convertValidationSchema.validateSync(req.body);
  } catch (errors) {
    res.status(422);
    res.send(errors);
  }

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

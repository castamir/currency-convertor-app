import express from 'express';
import currencies from './currencies';
import stats from './stats';

const router = express.Router();

router.use('/currencies', currencies);
router.use('/stats', stats);

export default router;

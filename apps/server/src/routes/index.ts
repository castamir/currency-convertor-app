import express from 'express';
import currencies from './currencies';

const router = express.Router();

router.use('/currencies', currencies);

export default router;

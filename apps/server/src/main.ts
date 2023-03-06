/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import * as process from 'process';
import routes from './routes';
import { config } from 'dotenv';

config();

if (!process.env.APILAYER_API_ID) {
  throw new Error('Open exchange API ID is not configured.');
}

const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', routes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

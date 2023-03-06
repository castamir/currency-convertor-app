/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import routes from './routes';

const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', routes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

import { json } from 'body-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import routes from './routes';

const app: Application = express();

// set security HTTP headers
app.use(helmet());
app.get('/', (_req, res) => {
  res.send('Hello world');
});
app.use(json());
app.use(routes);

export default app;

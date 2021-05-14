import express, { Application } from 'express';
import helmet from 'helmet';

const app: Application = express();

// set security HTTP headers
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello world');
});

export default app;

import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route';
import country from './country.route';

routes.get('/', (req: Request, res: Response) => {
  res.send('index')
});
routes.use('/phone-number', phoneNumber);
routes.use('/regions', country);

export default routes;

import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route';
import country from './country.route';
import inactivePhoneNumber from './inactivePhoneNumber.route';

routes.get('/', (req: Request, res: Response) => {
  res.send('index')
});
routes.use('/phone-number', phoneNumber);
routes.use('/regions', country);
routes.use('/', inactivePhoneNumber);

export default routes;

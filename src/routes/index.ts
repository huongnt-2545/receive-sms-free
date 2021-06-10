import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route';
import adminCountry from './admin/country.route';
import country from './country.route';
import { checkAdmin } from '../middlewares/auth.middleware';

routes.get('/', (req: Request, res: Response) => {
  res.send('index')
});
routes.use('/phone-number', phoneNumber);
routes.use('/admin/countries', checkAdmin, adminCountry);
routes.use('/regions', country);

export default routes;

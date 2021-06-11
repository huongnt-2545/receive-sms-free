import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route';
import home from './home.route';
import adminCountry from './admin/country.route';
import country from './country.route';
import { checkAdmin } from '../middlewares/auth.middleware';

routes.get('/', home);
routes.use('/phone-number', phoneNumber);
routes.use('/admin/countries', checkAdmin, adminCountry);
routes.use('/regions', country);

export default routes;

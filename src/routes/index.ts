import express, { Request, Response } from 'express';
const routes = express.Router();

import phoneNumber from './phoneNumber.route';
import home from './home.route';
import country from './country.route';
import adminCountry from './admin/country.route';
import adminPhoneNumber from './admin/phone_number.route';
import { checkAdmin } from '../middlewares/auth.middleware';

routes.get('/', home);
routes.use('/phone-number', phoneNumber);
routes.use('/regions', country);
routes.use('/admin/countries', checkAdmin, adminCountry);
routes.use('/admin/phone-numbers', checkAdmin, adminPhoneNumber);

export default routes;

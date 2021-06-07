import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route';
import home from './home.route';
import country from './country.route';

routes.get('/', home);
routes.use('/phone-number', phoneNumber);
routes.use('/regions', country);

export default routes;

import express, { Request, Response } from 'express';
const routes = express.Router();
import phoneNumber from './phoneNumber.route'

routes.get('/', (req: Request, res: Response) => {
  res.send('index')
});
routes.use('/phone-number', phoneNumber);

export default routes;

import express from 'express';
import { getPhoneNumbers } from '../controllers/country.controller';
const router = express.Router();

router.get('/:code', getPhoneNumbers);

export default router;

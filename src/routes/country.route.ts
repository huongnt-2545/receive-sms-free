import express from 'express';
const router = express.Router();
import { indexCountry, getPhoneNumbers  } from '../controllers/country.controller';

router.get('/:code', getPhoneNumbers);
router.get('/', indexCountry);

export default router;

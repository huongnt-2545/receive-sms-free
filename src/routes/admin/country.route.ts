import express from 'express';
const router = express.Router();
import { newCountry, createCountry, editCountry, updateCountry }  from '../../controllers/admin/country.controller';
import validationCountry from '../../validations/country.validation';

router.get('/new', newCountry);
router.post('/', validationCountry.validateCreateCountry, createCountry);
router.get('/:countryCode/edit', editCountry)
router.put('/:countryCode', validationCountry.validateCreateCountry, updateCountry)

export default router;

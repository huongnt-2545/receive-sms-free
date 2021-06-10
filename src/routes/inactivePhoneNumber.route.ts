import { Router } from 'express';
import { getInactivePhoneNumbers } from '../controllers/phoneNumber.controller';
const router = Router();

router.get('/inactive-phone-numbers', getInactivePhoneNumbers);

export default router;

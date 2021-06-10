import { Router } from 'express';
import { getMessages } from '../controllers/phoneNumber.controller';
const router = Router();

router.get('/:phone', getMessages);

export default router;

import express from 'express';
import * as  phoneController from '../controllers/phoneNumber.controller';
const router = express.Router();

router.get('/:phone', phoneController.getMessages);

export default router;

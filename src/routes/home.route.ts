import express from 'express';
import { getPhoneNumbers } from '../controllers/home.controller';
const router = express.Router();

router.get('/', getPhoneNumbers);

export default router;

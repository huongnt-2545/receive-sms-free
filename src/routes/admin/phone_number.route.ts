import { Router } from 'express';

import { getAll, changeStatus, showDetail } from '../../controllers/admin/phoneNumber.controller';

const router = Router();
router.get('/', getAll);
router.put('/change-status', changeStatus);
router.get('/:phone', showDetail);

export default router;

import express from 'express';
import userController from '../controllers/users.controller';
import userValidation from '../validations/user.validation';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)

export default router;

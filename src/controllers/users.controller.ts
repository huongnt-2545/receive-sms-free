import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Types } from 'mongoose';
import userService from '../services/user.service';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(Types.ObjectId(req.params.userId));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

export default {
  createUser,
  getUsers,
  getUser,
};

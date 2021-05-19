import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { IPaginateOptions } from '../models/plugins/paginate.plugin';
import User, { IUser } from '../models/user.model';
import AppError from '../utils/AppError';

const createUser = async (userBody: IUser) => {
  console.log(userBody);

  if (await User.isEmailTaken(userBody.email, userBody.id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const queryUsers = async (filter: any, options: IPaginateOptions) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id: Types.ObjectId) => {
  return User.findById(id);
};

const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const updateUserById = async (userId: Types.ObjectId, updateBody: IUser) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId: Types.ObjectId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};

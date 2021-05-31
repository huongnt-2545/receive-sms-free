import mongoose from 'mongoose';

export const isValidObjectJd = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
}

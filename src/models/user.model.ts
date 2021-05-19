import { Document, model, Schema, ObjectId, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import logger from '../config/logger';
import paginate, { IPaginateOptions } from './plugins/paginate.plugin';
import appSettings from '../config/appSettings';

enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 256,
    },
    email: {
      type: String,
      required: true,
      maxlength: 256,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: appSettings.passwordMinLength,
      trim: true,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(paginate);

UserSchema.pre('save', async function (this: UserDocument, next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }

    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

// Export this for strong typing
export interface UserDocument extends IUser {
  isPasswordMatch(): boolean;
}

UserSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as IUser;
  return await bcrypt.compare(password, user.password);
};

// For model
export interface UserModel extends Model<UserDocument> {
  isEmailTaken(email: string, excludeUserId: Types.ObjectId): Promise<boolean>;
  paginate(filter: any, options: IPaginateOptions): Promise<any>;
}

UserSchema.statics.isEmailTaken = async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

export default model<UserDocument, UserModel>('User', UserSchema);

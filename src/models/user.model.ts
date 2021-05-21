import { model, Schema, Model, Document } from 'mongoose';

enum Role {
  User = 'user',
  Admin = 'admin'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 6 },
    role: { type: String, default: Role.User, enum: [Role.User, Role.Admin] }
  },
  { timestamps: true },
);

const User: Model<IUser> = model('User', UserSchema);
export default User;

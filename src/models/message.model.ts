import { model, Schema, Model, Document } from 'mongoose';

export interface IMessage extends Document {
  phone_number_id: string;
  from: string;
  body: string;
  status: string;
  error_code: number;
  error_message: string;
  date_sent: Date;
}

const MessageSchema = new Schema(
  {
    phone_number_id: { type: Schema.Types.ObjectId, required: true, ref: 'PhoneNumber' },
    from: { type: String, required: true, trim: true },
    body: { type: String, trim: true },
    status: { type: String, trim: true },
    error_code: Number,
    error_message: { type: String, trim: true },
    date_sent: Date
  },
  { timestamps: true },
);

const Message: Model<IMessage> = model('Message', MessageSchema);
export default Message;

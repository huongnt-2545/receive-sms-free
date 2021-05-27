import { model, Schema, Model } from 'mongoose';
import { ICountry } from './country.model';

export interface IPhoneNumber extends Document {
  country_id: ICountry['_id'];
  phone_number: string;
  is_active: boolean;
}

const PhoneNumberSchema = new Schema(
  {
    country_id: { type: Schema.Types.ObjectId, required: true, ref: 'Country' },
    phone_number: { type: String, required: true, trim: true },
    is_active: { type: Boolean, default: false }
  },
  { timestamps: true },
);

const PhoneNumber: Model<IPhoneNumber> = model('PhoneNumber', PhoneNumberSchema, 'phone_numbers');
export default PhoneNumber;

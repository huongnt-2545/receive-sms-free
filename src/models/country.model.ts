import { model, Schema, Model, Document } from 'mongoose';

export interface ICountry extends Document {
  code: string;
  name: string;
  dial_code: string;
}

const CountrySchema = new Schema(
  {
    code: { type: String, require: true, trim: true, unique: true },
    name: { type: String, require: true, trim: true },
    dial_code: { type: String, require: true, trim: true, unique: true }
  },
  { timestamps: true },
);

const Country: Model<ICountry> = model('Country', CountrySchema);
export default Country;

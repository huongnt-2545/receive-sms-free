import { model, Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from './plugins/paginate.plugin';

export interface ICountry extends Document {
  code: string;
  name: string;
  dial_code: string;
}

const CountrySchema = new Schema(
  {
    code: { type: String, require: true, trim: true, unique: true },
    name: { type: String, require: true, trim: true },
    dial_code: { type: String, require: true, trim: true, unique: true },
  },
  { timestamps: true }
);

CountrySchema.plugin(mongoosePagination);

const Country: Pagination<ICountry> = model<ICountry, Pagination<ICountry>>('Country', CountrySchema);

export default Country;

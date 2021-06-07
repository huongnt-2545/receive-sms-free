import { IPhoneNumber } from '../models/phoneNumber.model';
import CountryViewModel from './country.viewModel';

class PhoneViewModel {
  phoneNumber: string;
  country: CountryViewModel;

  constructor(phone: IPhoneNumber) {
    this.phoneNumber = phone.phone_number;
    this.country = new CountryViewModel(phone.country_id);
  }
}

export default PhoneViewModel;

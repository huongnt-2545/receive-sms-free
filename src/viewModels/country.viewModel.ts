import { ICountry } from '../models/country.model';

class CountryViewModel {
  code: string;
  name: string;
  image: string;
  dial_code: string;

  constructor(country: ICountry) {
    this.code = country.code;
    this.name = country.name;
    this.dial_code = country.dial_code;
    this.image = 'images/flags/' + this.code.toLowerCase() + '.png';
  }
}

export default CountryViewModel;

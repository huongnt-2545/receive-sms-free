import { REGEX_COUNTRY_CODE } from '../utils/constants';

export const validateCountryCode = (code: string) => {
  return REGEX_COUNTRY_CODE.test(code);
}

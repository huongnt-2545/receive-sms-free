/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import { getCountry } from '../services/country.service';
import { getPhoneNumberByCountry } from '../services/phoneNumber.service';
import logger from '../config/logger';
import { REGEX_COUNTRY_CODE } from '../utils/constants';

export const getPhoneNumbers = async(req: Request, res: Response) => {
  try {
    const countryCode = req.params.code;
    
    if (!validateCountryCode(countryCode)) {
      res.render('404');
    } else {
      const country = await getCountry(countryCode);

      if (!country) {
        res.render('404');
      } else {
        const phoneNumbers = await getPhoneNumberByCountry(country._id);
        const result = {country, phoneNumbers}

        res.render('countries/show', result);
      }
    }
  } catch(err) {
    logger.error(err)
    res.status(500).send(req.t('shared.internal_server_err'));
  }
}

const validateCountryCode = (code: string) => {
  return REGEX_COUNTRY_CODE.test(code);
}

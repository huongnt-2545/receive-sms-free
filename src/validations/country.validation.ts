import {  check, body, ValidationChain } from 'express-validator';
import Country from '../models/country.model';
import { REGEX_COUNTRY_CODE } from '../utils/constants';

const validateCreateCountry : ValidationChain[] = [
  body('code')
    .notEmpty().withMessage((value, { req }) => {
      return req.t('validations.country.code.not_empty');
    })
    .bail()
    .matches(REGEX_COUNTRY_CODE).withMessage((value, { req }) => {
      req.t('validations.country.code.incorrect_format')
    })
    .bail()
    .custom((code, { req }) => checkCountryCodeExist(code, req.body.id, req.t('validations.country.code.exist'))),
  body('name')
    .notEmpty().withMessage((value, { req }) => {
      return req.t('validations.country.name.not_empty');
    }),
  body('dial_code')
    .notEmpty().withMessage((value, { req }) => {
      return req.t('validations.country.dial_code.not_empty');
    })
    .bail()
    .custom((dialCode, { req }) => checkCountryDialCodeExist(dialCode, req.body.id, req.t('validations.country.dial_code.exist'))),
];

const validationCountryCode : ValidationChain[] = [
  check('code').notEmpty().withMessage((value, { req }) => {
    return req.t('validations.country.code.not_empty');
  }),
];

const checkCountryDialCodeExist = async (dialCode: string, id: string, mesage: string) => {
  const country = await Country.findOne({ dial_code: dialCode, _id: { $ne: id } });
  if (country) throw new Error(mesage);
}

const checkCountryCodeExist = async (code: string, id: string, mesage: string) => {
  const country = await Country.findOne({ code, _id: { $ne: id } });
  if (country) throw new Error(mesage);
}

export const validateCountryCode = (code: string): boolean => REGEX_COUNTRY_CODE.test(code);

export default { validateCreateCountry, validationCountryCode };

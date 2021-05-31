/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import logger from '../../config/logger';
import Country from '../../models/country.model';
import { validateCountryCode } from '../../validations/country.validation';

export const newCountry = async (req: Request, res: Response) => {
  res.render('admin/countries/new');
};

export const createCountry = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const formData = {
    name: req.body.name,
    code: req.body.code,
    dial_code: req.body.dial_code,
  };
  if (!errors.isEmpty()) return res.render('admin/countries/new', { errors: errors.array(), formData });

  try {
    await Country.create(formData);
    res.redirect('/regions');
  } catch (msg) {
    logger.error(msg);
    res.render('admin/countries/new', { errors: [{ msg }], formData });
  }
};

export const editCountry = async (req: Request, res: Response) => {
  if(!validateCountryCode(req.params.countryCode)) return res.send('404');

  const country = await Country.findOne({code: req.params.countryCode});
  if(!country) return res.render('404');

  const formData = {
    id: country._id,
    countryCode: req.params.countryCode,
    name: country.name,
    code: country.code,
    method: 'PUT',
    dial_code: country.dial_code,
  };
  res.render('admin/countries/edit', { formData });
};

export const updateCountry = async (req: Request, res: Response) => {
  const country = await Country.findOne({code: req.params.countryCode});
  if(!country) return res.render('404');

  const errors = validationResult(req);
  const formData = {
    id: country._id,
    countryCode: req.params.countryCode,
    name: req.body.name,
    code: req.body.code,
    method: 'PUT',
    dial_code: req.body.dial_code,
  };
  if (!errors.isEmpty()) return res.render('admin/countries/edit', { errors: errors.array(), formData });

  try {
    await Country.update({code: req.params.countryCode}, formData);
    res.redirect('/regions');
  } catch (msg) {
    logger.error(msg);
    res.render('admin/countries/edit', { errors: [{ msg }], formData });
  }
};

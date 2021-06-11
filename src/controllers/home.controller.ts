/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import { getActivePhoneNumbers } from '../services/phoneNumber.service';
import logger from '../config/logger';
import PhoneViewModel from '../viewModels/phone.viewModel';

export const getPhoneNumbers = async (req: Request, res: Response) => {
  try {
    const phoneNumbers = await getActivePhoneNumbers();
    const viewModel = phoneNumbers.map(phone => new PhoneViewModel(phone));

    res.render('home/index', { phoneNumbers: viewModel });
  } catch (err) {
    logger.error(err);
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

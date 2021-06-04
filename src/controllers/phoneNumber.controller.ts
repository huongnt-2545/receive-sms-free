/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import PhoneNumber from '../models/phoneNumber.model';
import * as messageService from '../services/message.service';
import { getRandomPhoneNumber } from '../services/phoneNumber.service';

export const getMessages = async (req: Request, res: Response) => {
  const phoneNumber = await PhoneNumber.findOne({phone_number: req.params.phone}).populate('country_id');
  if (!phoneNumber) return res.status(404).send(req.t('shared.not_found.phone_number'));

  const messages = await messageService.getMessagesByPhone(phoneNumber._id);
  const randomPhone = await getRandomPhoneNumber(phoneNumber._id);
  const params = {
    phoneNumber: req.params.phone,
    messages: messages,
    country: phoneNumber.country_id,
    randomPhone: randomPhone ? randomPhone : phoneNumber
  }
  res.render('phone_messages', params);
};

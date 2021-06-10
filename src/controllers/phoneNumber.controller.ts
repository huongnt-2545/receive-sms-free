/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import PhoneNumber from '../models/phoneNumber.model';
import { getMessagesByPhone } from '../services/message.service';
import { getInactivePhoneNumber } from '../services/phoneNumber.service';

export const getMessages = async (req: Request, res: Response) => {
  const phoneNumber = await PhoneNumber.findOne({ phone_number: req.params.phone });
  if (phoneNumber) {
    const messages = await getMessagesByPhone(phoneNumber._id);
    const params = {
      phoneNumber: req.params.phone,
      messages: messages,
    };
    res.render('phone_messages', params);
  } else {
    res.status(404).send(req.t('shared.not_found.phone_number'));
  }
};

export const getInactivePhoneNumbers = async (req: Request, res: Response) => {
  try {
    const inactivePhoneNumbers = await getInactivePhoneNumber();

    res.render('phone_numbers/inactive_phones', { inactivePhoneNumbers });
  } catch {
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

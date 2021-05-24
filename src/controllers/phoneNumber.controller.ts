/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import PhoneNumber from '../models/phoneNumber.model';
import * as messageService from '../services/message.service';

export const getMessages = async (req: Request, res: Response) => {
  const phoneNumber = await PhoneNumber.findOne({phone_number: req.params.phone});
  if (phoneNumber) {
    const messages = await messageService.getMessagesByPhone(phoneNumber._id);
    const params = {
      phoneNumber: req.params.phone,
      messages: messages,
    }
    res.render('phone_messages', params);
  } else {
    res.status(404).send(req.t('shared.not_found.phone_number'));
  }
};

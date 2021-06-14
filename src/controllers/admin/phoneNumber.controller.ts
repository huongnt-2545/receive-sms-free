/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';

import PhoneNumber from '../../models/phoneNumber.model';
import { getMessagesByPhone } from '../../services/message.service';
import { getRandomPhoneNumber } from '../../services/phoneNumber.service';
import logger from '../../config/logger';

export const showDetail = async (req: Request, res: Response) => {
  try {
    const phoneNumber = await PhoneNumber.findOne({ phone_number: req.params.phone }).populate('country_id');
    if (!phoneNumber) return res.render('404');

    const messages = await getMessagesByPhone(phoneNumber._id);
    const phoneNumbers = await PhoneNumber.find({ _id: { $ne: phoneNumber._id } });
    const randomPhone = await getRandomPhoneNumber(phoneNumber._id, phoneNumbers);
    const params = {
      phoneNumber: phoneNumber,
      messages: messages,
      country: phoneNumber.country_id,
      randomPhone: randomPhone ? randomPhone : phoneNumber,
    };

    res.render('admin/phone_numbers/show', params);
  } catch (err) {
    logger.error(err);
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const phoneNumbers = await PhoneNumber.find().populate('country_id');

    res.render('admin/phone_numbers/index', { phoneNumbers });
  } catch (err) {
    logger.error(err);
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const status = req.body.status;
    const phoneNumberId = req.body.phone_number_id;
    const phoneNumber = await PhoneNumber.findOne({ _id: phoneNumberId });

    if (!phoneNumber) {
      return res.status(404).send('');
    }

    phoneNumber.is_active = status;
    const savedPhone = await phoneNumber.save();

    res.send({ phoneId: savedPhone._id, isActive: savedPhone.is_active, number: savedPhone.phone_number });
  } catch (err) {
    logger.error(err);
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

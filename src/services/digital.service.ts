import Country from '../models/country.model';
import Message from '../models/message.model';
import PhoneNumber from '../models/phoneNumber.model';

export interface IDigitalStatistic {
  countries: number;
  phoneNumbers: number;
  textMessages: number;
}

export const getDigitalStatistic = async (): Promise<IDigitalStatistic> => {
  return {
    countries: await Country.estimatedDocumentCount(),
    phoneNumbers: await PhoneNumber.where({ is_active: true }).estimatedDocumentCount(),
    textMessages:  await Message.estimatedDocumentCount()
  }
}

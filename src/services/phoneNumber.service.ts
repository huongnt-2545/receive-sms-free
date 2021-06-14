import PhoneNumber, { IPhoneNumber } from '../models/phoneNumber.model';
import { DEFAULT_LIMIT } from '../utils/constants';

export const getActivePhoneNumbers = async (): Promise<IPhoneNumber[]> => {
  const phoneNumbers = await PhoneNumber.find({ is_active: true })
    .limit(DEFAULT_LIMIT)
    .sort({ createdAt: 'desc' })
    .populate('country_id');

  return phoneNumbers;
};

export const getPhoneNumberByCountry = async (countryId: string): Promise<IPhoneNumber[]> => {
  const phoneNumbers: IPhoneNumber[] = await PhoneNumber.find({ country_id: countryId, is_active: true });

  return phoneNumbers;
};

export const getRandomPhoneNumber = async (Id: string, listPhone: IPhoneNumber[]): Promise<IPhoneNumber | null> => {
  const random = Math.floor(Math.random() * listPhone.length);
  return listPhone[random];
};

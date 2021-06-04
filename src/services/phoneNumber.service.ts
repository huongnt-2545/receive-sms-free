import PhoneNumber, { IPhoneNumber } from '../models/phoneNumber.model';

export const getPhoneNumberByCountry = async (countryId: string): Promise<IPhoneNumber[]> => {
  const phoneNumbers: IPhoneNumber[] = await PhoneNumber.find({country_id: countryId, is_active: true});

  return phoneNumbers;
}

export const getRandomPhoneNumber = async (Id: string): Promise<IPhoneNumber | null> => {
  const validPhone = await PhoneNumber.find({_id: {$ne: Id}, is_active: true});
  const random = Math.floor(Math.random() * validPhone.length);
  return validPhone[random];
};

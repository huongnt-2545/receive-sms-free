import PhoneNumber, { IPhoneNumber } from '../models/phoneNumber.model';

export const getPhoneNumberByCountry = async (countryId: string): Promise<IPhoneNumber[]> => {
  const phoneNumbers: IPhoneNumber[] = await PhoneNumber.find({country_id: countryId, is_active: true});

  return phoneNumbers;
}

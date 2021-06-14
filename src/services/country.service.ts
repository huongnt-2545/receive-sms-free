import Country, { ICountry } from '../models/country.model';

export const getCountry = async (code: string): Promise<ICountry | null> => await Country.findOne({code});

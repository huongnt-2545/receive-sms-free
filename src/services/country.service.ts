import Country from '../models/country.model';

export const getCountry = async (code: string) => await Country.findOne({code});

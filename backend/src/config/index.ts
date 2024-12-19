import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nagerApiUrl: process.env.NAGER_API_URL || 'https://date.nager.at/api/v3',
  countriesNowApiUrl: process.env.COUNTRIES_NOW_API_URL || 'https://countriesnow.space/api/v0.1'
};
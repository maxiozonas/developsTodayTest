import axios from 'axios';
import { config } from '../config';

const nagerApi = axios.create({
    baseURL: config.nagerApiUrl
});

const countriesNowApi = axios.create ({
    baseURL: config.countriesNowApiUrl
});

export interface Country {
    countryCode: string;
    name: string;
}

export interface CountryInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Country[];
    flagUrl: string;
    population: {
      year: number;
      count: number;
    }[];
}

export const externalApi = {
    async getAvailableCountries(): Promise<Country[]> {
      const { data } = await nagerApi.get('/AvailableCountries');
      return data;
    },
  
    async getCountryInfo(countryCode: string): Promise<any> {
      const { data } = await nagerApi.get(`/CountryInfo/${countryCode}`);
      return data;
    },
  
    async getCountryPopulation(countryName: string): Promise<any> {
      const { data } = await countriesNowApi.post('/countries/population', {
        country: countryName
      });
      return data;
    },
  
    async getCountryFlag(countryName: string): Promise<string> {
      const { data } = await countriesNowApi.post('/countries/flag/images', {
        country: countryName
      });
      return data.data.flag;
    }
  };


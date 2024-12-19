import { Request, Response } from 'express';
import { externalApi } from '../services/externalApi';

export const countriesController = {
  async getCountries(req: Request, res: Response) {
    try {
      const countries = await externalApi.getAvailableCountries();
      res.json(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ error: 'Failed to fetch countries' });
    }
  },

  async getCountryInfo(req: Request, res: Response) {
    try {
      const { countryCode } = req.params;
      
      // Obtener información básica del país
      const countryInfo = await externalApi.getCountryInfo(countryCode);
      
      // Obtener la población
      const populationData = await externalApi.getCountryPopulation(countryInfo.commonName);
      
      // Obtener la URL de la bandera
      const flagUrl = await externalApi.getCountryFlag(countryInfo.commonName);
      
      // Formatear la respuesta
      const response = {
        commonName: countryInfo.commonName,
        officialName: countryInfo.officialName,
        countryCode: countryInfo.countryCode,
        region: countryInfo.region,
        borders: countryInfo.borders.map((border: any) => ({
          countryCode: border.countryCode,
          name: border.name
        })),
        flagUrl,
        population: populationData.data.populationCounts.map((pop: any) => ({
          year: parseInt(pop.year),
          count: parseInt(pop.value)
        }))
      };
      
      res.json(response);
    } catch (error) {
      console.error('Error fetching country info:', error);
      res.status(500).json({ error: 'Failed to fetch country information' });
    }
  }
};
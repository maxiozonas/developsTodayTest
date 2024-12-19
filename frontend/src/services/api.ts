const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

export const api = {
  // Obtener lista de países
  getCountries: async (): Promise<Country[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/countries`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return response.json();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  // Obtener información detallada de un país
  getCountryInfo: async (countryCode: string): Promise<CountryInfo> => {
    try {
      const response = await fetch(`${API_BASE_URL}/countries/${countryCode}`);
      if (!response.ok) throw new Error('Failed to fetch country info');
      return response.json();
    } catch (error) {
      console.error('Error fetching country info:', error);
      throw error;
    }
  }
};
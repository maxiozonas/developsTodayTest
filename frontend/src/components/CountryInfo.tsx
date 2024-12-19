"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/services/api';
import type { CountryInfo } from '@/services/api';
import BorderCountries from './BorderCountries';
import PopulationChart from './PopulationChart';

interface CountryInfoProps {
  countryCode: string;
}

export default function CountryInfo({ countryCode }: CountryInfoProps) {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const data = await api.getCountryInfo(countryCode);
        setCountryInfo(data);
      } catch (err) {
        setError('Error loading country information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !countryInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error || 'Country not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Header section with flag and name */}
        <div></div>
        <div className="w-full md:w-1/3">
          <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={countryInfo.flagUrl}
              alt={`Flag of ${countryInfo.commonName}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{countryInfo.commonName}</h1>
          <p className="text-gray-600 mb-8">{countryInfo.officialName}</p>

          {/* Basic information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Region</h2>
              <p>{countryInfo.region}</p>
            </div>
          </div>

          {/* Border countries */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
            <BorderCountries borders={countryInfo.borders} />
          </div>

          {/* Population chart */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Population History</h2>
            <PopulationChart data={countryInfo.population} />
          </div>
        </div>
      </div>
    </div>
  );
}
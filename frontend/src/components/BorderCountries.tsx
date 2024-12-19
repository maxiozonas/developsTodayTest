'use client';

import Link from 'next/link';
import { Country } from '@/services/api';

interface BorderCountriesProps {
  borders: Country[];
}

export default function BorderCountries({ borders }: BorderCountriesProps) {
  if (borders.length === 0) {
    return <p className="text-gray-600">No bordering countries</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {borders.map((country) => (
        <Link
          key={country.countryCode}
          href={`/country/${country.countryCode}`}
          className="inline-block text-amber-500 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shadow-md"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-grey">{country.countryCode}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

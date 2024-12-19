// src/app/country/[id]/page.tsx

import CountryInfo from '@/components/CountryInfo';

interface CountryPageProps {
  params: { id: string };
}

export default function CountryPage({ params }: CountryPageProps) {
  const { id: countryCode } = params;
  return (
    <div>
      <CountryInfo countryCode={countryCode} />
    </div>
  );
}

import CountryList from '@/components/CountryList';

export const metadata = {
  title: 'Countries List',
  description: 'Explore information about countries around the world',
};

export default function HomePage() {
  return <CountryList />;
}

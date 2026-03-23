import { Metadata } from 'next';
import HeroPlattr from "@/components/Pages/Home/Hero/Hero";
import RestaurantsAll from "@/components/Pages/Home/RestaurantsAll/RestaurantsAll";
import { pageMetadata } from '@/lib/metadata/canonical';

export const metadata: Metadata = pageMetadata.home();

export default function PlattrHome() {
  return (
    <>
      <HeroPlattr city="Berlin" />
      <RestaurantsAll />
    </>
  );
}

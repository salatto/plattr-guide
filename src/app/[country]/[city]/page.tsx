import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata/canonical';
import CityPageClient from './CityPageClient';

// Список заведомо НЕ географических названий (footer ссылки)
const FOOTER_LINKS = [
    'universe',
    'investors', 
    'contact',
    'faq',
    'partner',
    'imprint',
    'privacy',
    'cookies',
    'terms',
    'about',
    'support'
];

interface Props {
    params: Promise<{ country: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country, city } = await params;
    
    // Проверяем не является ли это footer ссылкой
    if (FOOTER_LINKS.includes(country.toLowerCase())) {
        return pageMetadata.notFound();
    }
    
    
    const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ');
    const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
    
    return pageMetadata.city(countryName, cityName);
}

export default async function CityPage({ params }: Props) {
    const { country, city } = await params;
    
    console.log('CityPage params:', { country, city });
    
    // Проверяем не является ли это footer ссылкой
    if (FOOTER_LINKS.includes(country.toLowerCase())) {
        console.log('Found footer link, calling notFound');
        notFound();
    }
    
    // Проверяем специальные комбинации footer ссылок
    if (country.toLowerCase() === 'partner' && city.toLowerCase() === 'support') {
        console.log('Found partner/support, calling notFound');
        notFound();
    }
    
    return <CityPageClient />;
}
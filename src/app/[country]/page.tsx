import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata/canonical';
import CountryPageClient from './CountryPageClient';

// Список заведомо НЕ географических названий (footer ссылки)
const FOOTER_LINKS = [
    'universe',
    'investors', 
    'contact',
    'faq',
    'partner',
    'partnersupport',
    'imprint',
    'privacy',
    'cookies',
    'terms',
    'about',
    'support'
];

interface Props {
    params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country } = await params;
    
    // Проверяем не является ли это footer ссылкой
    if (FOOTER_LINKS.includes(country.toLowerCase())) {
        return pageMetadata.notFound();
    }
    
    const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ');
    
    return pageMetadata.country(countryName);
}

export default async function CountryPage({ params }: Props) {
    const { country } = await params;
    
    // Проверяем не является ли это footer ссылкой
    if (FOOTER_LINKS.includes(country.toLowerCase())) {
        notFound();
    }
    
    return <CountryPageClient />;
}
import { Metadata } from 'next';
import { canonicalUrls, getCleanPathname } from '@/lib/utils/canonical';

/**
 * Создает базовые metadata с canonical URL
 * @param pathname - путь текущей страницы
 * @param additionalMetadata - дополнительные metadata
 */
export function createMetadataWithCanonical(
    pathname: string,
    additionalMetadata: Partial<Metadata> = {}
): Metadata {
    const cleanPath = getCleanPathname(pathname);
    const canonicalUrl = canonicalUrls.page(cleanPath);

    return {
        ...additionalMetadata,
        alternates: {
            canonical: canonicalUrl,
            ...additionalMetadata.alternates,
        },
    };
}

/**
 * Готовые metadata для типичных страниц
 */
export const pageMetadata = {
    // Главная страница
    home: (): Metadata => {
        const description = 'Найдите лучшие рестораны в вашем городе на Plattr';
        
        return createMetadataWithCanonical('/', {
            title: 'Plattr - Лучшие рестораны в вашем городе',
            description,
            openGraph: {
                title: 'Plattr',
                description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/`,
                siteName: 'Plattr',
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-home.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'Plattr - Найдите лучшие рестораны',
                    }
                ],
                locale: 'ru_RU',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Plattr',
                description,
                images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-home.jpg`],
            },
        });
    },

    // Список ресторанов
    restaurants: (): Metadata => createMetadataWithCanonical('/restaurants', {
        title: 'Рестораны - Plattr',
        description: 'Полный каталог ресторанов на Plattr',
    }),

    // Страница ресторана (базовая версия без данных) - устаревшая
    restaurant: (id: string, name?: string): Metadata => createMetadataWithCanonical(`/restaurant/${id}`, {
        title: name ? `${name} - Plattr` : `Ресторан - Plattr`,
        description: name ? `Информация о ресторане ${name}` : 'Подробная информация о ресторане',
    }),

    // Расширенные метаданные ресторана с Open Graph
    restaurantWithData: (
        restaurant: {
            id: number | string;
            title: string;
            description?: string | null;
            image_url?: string | null;
            city?: string | null;
            country?: string | null;
            venue_type?: string | null;
            categories?: string[];
            tags?: string[];
        },
        path: string
    ): Metadata => {
        const description = restaurant.description && restaurant.description.length > 0
            ? (restaurant.description.length > 160 
                ? restaurant.description.substring(0, 160) + '...'
                : restaurant.description)
            : `${restaurant.title} - информация о ресторане на Plattr`;
            
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide';
        const imageUrl = restaurant.image_url || `${siteUrl}/og-default.jpg`;
        const location = restaurant.city && restaurant.country 
            ? `${restaurant.city}, ${restaurant.country}`
            : restaurant.city || restaurant.country || '';

        return createMetadataWithCanonical(path, {
            title: `${restaurant.title} - Plattr`,
            description,
            openGraph: {
                title: restaurant.title,
                description,
                url: `${siteUrl}${path}`,
                siteName: 'Plattr',
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: restaurant.title,
                    }
                ],
                locale: 'ru_RU',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: restaurant.title,
                description,
                images: [imageUrl],
                site: '@plattr', // замените на ваш Twitter handle
            },
            other: {
                'restaurant:name': restaurant.title,
                'restaurant:location': location,
                'restaurant:type': restaurant.venue_type || '',
            }
        });
    },

    // Поиск
    search: (): Metadata => createMetadataWithCanonical('/search', {
        title: 'Поиск ресторанов - Plattr',
        description: 'Найдите рестораны по названию на Plattr',
    }),

    // Страница страны
    country: (countryName: string): Metadata => {
        const countrySlug = countryName.toLowerCase().replace(/\s+/g, '-');
        const description = `Найдите лучшие рестораны в ${countryName}. Широкий выбор заведений на Plattr`;
        
        return createMetadataWithCanonical(`/${countrySlug}`, {
            title: `Рестораны в ${countryName} - Plattr`,
            description,
            openGraph: {
                title: `Рестораны в ${countryName}`,
                description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/${countrySlug}`,
                siteName: 'Plattr',
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-country.jpg`,
                        width: 1200,
                        height: 630,
                        alt: `Рестораны в ${countryName}`,
                    }
                ],
                locale: 'ru_RU',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: `Рестораны в ${countryName}`,
                description,
                images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-country.jpg`],
            },
        });
    },

    // Страница города
    city: (countryName: string, cityName: string): Metadata => {
        const countrySlug = countryName.toLowerCase().replace(/\s+/g, '-');
        const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
        const description = `Откройте для себя лучшие рестораны в ${cityName}, ${countryName}. Подробная информация и отзывы на Plattr`;
        
        return createMetadataWithCanonical(`/${countrySlug}/${citySlug}`, {
            title: `Рестораны в ${cityName}, ${countryName} - Plattr`,
            description,
            openGraph: {
                title: `Рестораны в ${cityName}, ${countryName}`,
                description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/${countrySlug}/${citySlug}`,
                siteName: 'Plattr',
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-city.jpg`,
                        width: 1200,
                        height: 630,
                        alt: `Рестораны в ${cityName}, ${countryName}`,
                    }
                ],
                locale: 'ru_RU',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: `Рестораны в ${cityName}, ${countryName}`,
                description,
                images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-city.jpg`],
            },
        });
    },

    // 404 страница
    notFound: (): Metadata => createMetadataWithCanonical('/404', {
        title: 'Страница не найдена - Plattr',
        description: 'Запрашиваемая страница не найдена',
    }),
};
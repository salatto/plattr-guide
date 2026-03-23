import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata/canonical';
import { extractIdFromSlug, createRestaurantPath, isValidRestaurantSlug } from '@/lib/utils/links';
import { fetchRestaurantById } from '@/lib/api/restaurants-server';
import RestaurantDetailsClient from './RestaurantDetailsClient';

interface Props {
    params: Promise<{ country: string; city: string; restaurant: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { restaurant } = await params;
    
    // Проверяем является ли это валидным restaurant slug
    if (!isValidRestaurantSlug(restaurant)) {
        return pageMetadata.notFound();
    }
    
    const restaurantId = extractIdFromSlug(restaurant);
    
    if (!restaurantId) {
        return pageMetadata.restaurant('unknown');
    }
    
    try {
        // Загружаем данные ресторана для метаданных
        const restaurantData = await fetchRestaurantById(restaurantId);
        
        if (restaurantData) {
            // Создаем правильный путь для этой страницы
            const restaurantPath = createRestaurantPath(restaurantData);
            
            // Используем расширенные метаданные с Open Graph
            return pageMetadata.restaurantWithData(restaurantData, restaurantPath);
        }
    } catch (error) {
        console.error('Failed to fetch restaurant for metadata:', error);
    }
    
    // Fallback к базовым метаданным
    return pageMetadata.restaurant(restaurantId);
}

export default async function RestaurantPage({ params }: Props) {
    const { restaurant } = await params;
    
    // Проверяем является ли это валидным restaurant slug
    if (!isValidRestaurantSlug(restaurant)) {
        notFound();
    }
    
    return <RestaurantDetailsClient restaurant={restaurant} />;
}
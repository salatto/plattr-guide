import { RestaurantDetails } from '@/types/restaurants';

/**
 * Загружает данные ресторана на сервере для генерации метаданных
 * @param id - ID ресторана
 * @returns Данные ресторана или null если не найден
 */
export async function fetchRestaurantById(id: string): Promise<RestaurantDetails | null> {
    try {
        // Определяем базовый URL для API
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const apiUrl = `${baseUrl}/api/restaurants/${id}`;
        
        // console.log('Fetching restaurant data from:', apiUrl);
        
        const response = await fetch(apiUrl, {
            // Добавляем cache для лучшей производительности
            next: { revalidate: 3600 } // кеш на 1 час
        });

        if (!response.ok) {
            console.error(`Failed to fetch restaurant ${id}:`, response.status, response.statusText);
            return null;
        }

        const restaurant = await response.json();
        // console.log('Restaurant data fetched successfully:', restaurant.title);
        return restaurant;
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        return null;
    }
}

/**
 * Создает описание ресторана для метаданных
 * @param restaurant - данные ресторана
 * @returns краткое описание
 */
export function createRestaurantDescription(restaurant: RestaurantDetails): string {
    const parts: string[] = [];
    
    // Добавляем тип заведения
    if (restaurant.venue_type) {
        parts.push(restaurant.venue_type);
    }
    
    // Добавляем категории/теги
    const categories = restaurant.categories?.length ? restaurant.categories : restaurant.tags;
    if (categories?.length) {
        parts.push(categories.slice(0, 2).join(', '));
    }
    
    // Добавляем локацию
    if (restaurant.city && restaurant.country) {
        parts.push(`в ${restaurant.city}, ${restaurant.country}`);
    } else if (restaurant.city) {
        parts.push(`в ${restaurant.city}`);
    }
    
    // Добавляем описание если есть
    if (restaurant.description) {
        const shortDesc = restaurant.description.length > 100 
            ? restaurant.description.substring(0, 100) + '...'
            : restaurant.description;
        parts.push(shortDesc);
    }
    
    return parts.length > 0 
        ? parts.join(' • ')
        : `Информация о ресторане ${restaurant.title}`;
}

/**
 * Получает URL изображения ресторана для Open Graph
 * @param restaurant - данные ресторана
 * @returns URL изображения или fallback
 */
export function getRestaurantImageUrl(restaurant: RestaurantDetails): string {
    // Проверяем gallery_urls
    if (restaurant.gallery_urls?.length > 0) {
        return restaurant.gallery_urls[0];
    }
    
    // Проверяем image_url
    if (restaurant.image_url) {
        return restaurant.image_url;
    }
    
    // Fallback изображение
    return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide'}/og-default-restaurant.jpg`;
}
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://plattr.guide';

/**
 * Генерирует canonical URL для страницы, убирая query параметры
 * @param pathname - путь страницы (например: /restaurants/123)
 * @param removeParams - параметры для удаления (по умолчанию все)
 * @returns полный canonical URL
 */
export function generateCanonicalUrl(pathname: string): string {
    // Убираем начальный слеш если есть и добавляем к базовому URL
    const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const baseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
    
    // Если путь пустой (главная страница)
    if (!cleanPath) {
        return baseUrl + '/';
    }
    
    return `${baseUrl}/${cleanPath}`;
}

/**
 * Создает canonical URL для конкретных типов страниц
 */
export const canonicalUrls = {
    // Главная страница
    home: () => generateCanonicalUrl(''),
    
    // Страница страны
    country: (country: string) => generateCanonicalUrl(country),
    
    // Страница города
    city: (country: string, city: string) => generateCanonicalUrl(`${country}/${city}`),
    
    // Страница ресторана
    restaurant: (country: string, city: string, restaurantSlug: string) => 
        generateCanonicalUrl(`${country}/${city}/${restaurantSlug}`),
    
    // 404 страница
    notFound: () => generateCanonicalUrl('404'),
    
    // Универсальная функция для любого пути
    page: (path: string) => generateCanonicalUrl(path),
};

/**
 * Извлекает чистый путь из URL, убирая query параметры и хэш
 * @param url - полный URL или путь
 * @returns чистый путь
 */
export function getCleanPathname(url: string): string {
    try {
        const urlObj = new URL(url, SITE_URL);
        return urlObj.pathname;
    } catch {
        // Если это уже путь, просто убираем query и hash
        return url.split('?')[0].split('#')[0];
    }
}
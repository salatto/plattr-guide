/**
 * Утилиты для предотвращения циклических ссылок
 */

/**
 * Проверяет, является ли URL текущей страницей
 * @param currentPath - текущий путь (из usePathname())
 * @param linkPath - путь ссылки для проверки
 * @returns true если это та же страница
 */
export function isCurrentPage(currentPath: string, linkPath: string): boolean {
    // Убираем query параметры и hash из обоих путей
    const cleanCurrentPath = currentPath.split('?')[0].split('#')[0];
    const cleanLinkPath = linkPath.split('?')[0].split('#')[0];
    
    // Нормализуем пути (убираем trailing slash)
    const normalizeCurrentPath = cleanCurrentPath === '/' ? '/' : cleanCurrentPath.replace(/\/$/, '');
    const normalizeLinkPath = cleanLinkPath === '/' ? '/' : cleanLinkPath.replace(/\/$/, '');
    
    return normalizeCurrentPath === normalizeLinkPath;
}

/**
 * Проверяет, создает ли ссылка цикл для конкретного ресторана
 * @param currentRestaurantId - ID текущего ресторана
 * @param linkRestaurantId - ID ресторана в ссылке
 * @returns true если это ссылка на тот же ресторан
 */
export function isSameRestaurant(
    currentRestaurantId: string | number | undefined,
    linkRestaurantId: string | number | undefined
): boolean {
    if (!currentRestaurantId || !linkRestaurantId) return false;
    return String(currentRestaurantId) === String(linkRestaurantId);
}

/**
 * Создает "умные" breadcrumb элементы, где последний элемент не является ссылкой
 * @param items - массив breadcrumb элементов
 * @returns обновленный массив где последний элемент без href
 */
export function createSmartBreadcrumbs<T extends { href?: string }>(items: T[]): T[] {
    return items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? { ...item, href: undefined } : item;
    });
}

/**
 * Фильтрует список ресторанов, исключая текущий ресторан
 * @param restaurants - список ресторанов
 * @param currentRestaurantId - ID текущего ресторана для исключения
 * @param idField - поле с ID ресторана (по умолчанию 'id')
 * @returns отфильтрованный список без текущего ресторана
 */
export function filterOutCurrentRestaurant<T extends Record<string, unknown>>(
    restaurants: T[],
    currentRestaurantId: string | number | undefined,
    idField: keyof T = 'id'
): T[] {
    if (!currentRestaurantId) return restaurants;
    
    return restaurants.filter(restaurant => 
        String(restaurant[idField]) !== String(currentRestaurantId)
    );
}

/**
 * Извлекает ID ресторана из пути
 * @param path - путь типа "/restaurants/123"
 * @returns ID ресторана или undefined
 */
export function extractRestaurantId(path: string): string | undefined {
    const match = path.match(/\/restaurants\/([^\/\?]+)/);
    return match ? match[1] : undefined;
}

/**
 * Проверяет является ли путь страницей ресторана
 * @param path - путь для проверки
 * @returns true если это страница ресторана
 */
export function isRestaurantPage(path: string): boolean {
    return /^\/restaurants\/[^\/]+/.test(path);
}

/**
 * Создает slug из строки
 * @param text - текст для преобразования
 * @returns slug в формате kebab-case
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // убираем специальные символы
        .replace(/[-\s]+/g, '-') // заменяем пробелы и дефисы на один дефис
        .replace(/^-+|-+$/g, ''); // убираем дефисы в начале и конце
}

/**
 * Создает уникальный slug с ID для ресторана
 * @param name - название ресторана
 * @param id - ID ресторана
 * @returns slug в формате "restaurant-name-123"
 */
export function createRestaurantSlug(name: string, id: number | string): string {
    const nameSlug = createSlug(name);
    return `${nameSlug}-${id}`;
}

/**
 * Проверяет является ли строка валидным restaurant slug
 * @param slug - строка для проверки
 * @returns true если это валидный restaurant slug
 */
export function isValidRestaurantSlug(slug: string): boolean {
    // Ресторанный slug должен заканчиваться на "-число"
    return /-\d+$/.test(slug);
}

/**
 * Извлекает ID из restaurant slug'а
 * @param slug - slug в формате "restaurant-name-123"
 * @returns ID ресторана или undefined
 */
export function extractIdFromSlug(slug: string): string | undefined {
    const match = slug.match(/-(\d+)$/);
    return match ? match[1] : undefined;
}

/**
 * Создает полный путь для ресторана
 * @param restaurant - объект ресторана с данными
 * @returns путь в формате "/{country}/{city}/{restaurant-name-id}"
 */
export function createRestaurantPath(restaurant: {
    id: number | string;
    title: string;
    country?: string | null;
    city?: string | null;
}): string {
    const country = createSlug(restaurant.country || 'country');
    const city = createSlug(restaurant.city || 'city');
    const restaurantSlug = createRestaurantSlug(restaurant.title, restaurant.id);
    
    return `/${country}/${city}/${restaurantSlug}`;
}

/**
 * Создает breadcrumbs для ресторана
 * @param restaurant - объект ресторана с данными
 * @returns массив breadcrumb элементов
 */
export function createRestaurantBreadcrumbs(restaurant: {
    id: number | string;
    title: string;
    country?: string | null;
    city?: string | null;
}): { label: string; href?: string }[] {
    const country = restaurant.country || 'Country';
    const city = restaurant.city || 'City';
    const countrySlug = createSlug(country);
    const citySlug = createSlug(city);
    
    return [
        { label: 'Main', href: '/' },
        { label: country, href: `/${countrySlug}` },
        { label: city, href: `/${countrySlug}/${citySlug}` },
        { label: restaurant.title, href: createRestaurantPath(restaurant) },
    ];
}

/**
 * Создает безопасную ссылку, которая не создает циклов
 * @param href - целевой URL
 * @param currentPath - текущий путь
 * @returns объект с информацией о ссылке
 */
export function createSafeLink(href: string, currentPath: string) {
    const isCyclical = isCurrentPage(currentPath, href);
    
    return {
        href: isCyclical ? undefined : href,
        isCyclical,
        shouldRenderAsSpan: isCyclical,
        shouldRenderAsLink: !isCyclical,
    };
}
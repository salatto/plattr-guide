import { 
    isCurrentPage, 
    isSameRestaurant, 
    createSmartBreadcrumbs,
    filterOutCurrentRestaurant,
    extractRestaurantId,
    isRestaurantPage,
    createSafeLink
} from '../links';

describe('Link utilities', () => {
    describe('isCurrentPage', () => {
        test('should return true for same pages', () => {
            expect(isCurrentPage('/', '/')).toBe(true);
            expect(isCurrentPage('/restaurants', '/restaurants')).toBe(true);
            expect(isCurrentPage('/restaurants/123', '/restaurants/123')).toBe(true);
        });

        test('should return true ignoring query params', () => {
            expect(isCurrentPage('/restaurants/123', '/restaurants/123?page=2')).toBe(true);
            expect(isCurrentPage('/restaurants/123?utm_source=google', '/restaurants/123')).toBe(true);
        });

        test('should return false for different pages', () => {
            expect(isCurrentPage('/', '/restaurants')).toBe(false);
            expect(isCurrentPage('/restaurants/123', '/restaurants/456')).toBe(false);
        });

        test('should handle trailing slashes', () => {
            expect(isCurrentPage('/restaurants/', '/restaurants')).toBe(true);
            expect(isCurrentPage('/restaurants', '/restaurants/')).toBe(true);
        });
    });

    describe('isSameRestaurant', () => {
        test('should return true for same restaurant IDs', () => {
            expect(isSameRestaurant('123', '123')).toBe(true);
            expect(isSameRestaurant(123, 123)).toBe(true);
            expect(isSameRestaurant('123', 123)).toBe(true);
        });

        test('should return false for different restaurant IDs', () => {
            expect(isSameRestaurant('123', '456')).toBe(false);
            expect(isSameRestaurant(123, 456)).toBe(false);
        });

        test('should return false for undefined values', () => {
            expect(isSameRestaurant(undefined, '123')).toBe(false);
            expect(isSameRestaurant('123', undefined)).toBe(false);
            expect(isSameRestaurant(undefined, undefined)).toBe(false);
        });
    });

    describe('createSmartBreadcrumbs', () => {
        test('should remove href from last item', () => {
            const items = [
                { label: 'Home', href: '/' },
                { label: 'Restaurants', href: '/restaurants' },
                { label: 'Restaurant XYZ', href: '/restaurants/123' }
            ];

            const result = createSmartBreadcrumbs(items);

            expect(result[0].href).toBe('/');
            expect(result[1].href).toBe('/restaurants');
            expect(result[2].href).toBeUndefined();
        });
    });

    describe('filterOutCurrentRestaurant', () => {
        const restaurants = [
            { id: '1', name: 'Restaurant 1' },
            { id: '2', name: 'Restaurant 2' },
            { id: '3', name: 'Restaurant 3' }
        ];

        test('should filter out current restaurant', () => {
            const result = filterOutCurrentRestaurant(restaurants, '2');
            expect(result).toHaveLength(2);
            expect(result.map(r => r.id)).toEqual(['1', '3']);
        });

        test('should return all restaurants if no current ID', () => {
            const result = filterOutCurrentRestaurant(restaurants, undefined);
            expect(result).toHaveLength(3);
        });
    });

    describe('extractRestaurantId', () => {
        test('should extract restaurant ID from path', () => {
            expect(extractRestaurantId('/restaurants/123')).toBe('123');
            expect(extractRestaurantId('/restaurants/abc-def')).toBe('abc-def');
            expect(extractRestaurantId('/restaurants/123?page=2')).toBe('123');
        });

        test('should return undefined for non-restaurant paths', () => {
            expect(extractRestaurantId('/')).toBeUndefined();
            expect(extractRestaurantId('/restaurants')).toBeUndefined();
            expect(extractRestaurantId('/about')).toBeUndefined();
        });
    });

    describe('isRestaurantPage', () => {
        test('should return true for restaurant pages', () => {
            expect(isRestaurantPage('/restaurants/123')).toBe(true);
            expect(isRestaurantPage('/restaurants/abc-def')).toBe(true);
        });

        test('should return false for non-restaurant pages', () => {
            expect(isRestaurantPage('/')).toBe(false);
            expect(isRestaurantPage('/restaurants')).toBe(false);
            expect(isRestaurantPage('/about')).toBe(false);
        });
    });

    describe('createSafeLink', () => {
        test('should detect cyclical links', () => {
            const result = createSafeLink('/restaurants/123', '/restaurants/123');
            expect(result.isCyclical).toBe(true);
            expect(result.href).toBeUndefined();
            expect(result.shouldRenderAsSpan).toBe(true);
        });

        test('should allow non-cyclical links', () => {
            const result = createSafeLink('/restaurants/456', '/restaurants/123');
            expect(result.isCyclical).toBe(false);
            expect(result.href).toBe('/restaurants/456');
            expect(result.shouldRenderAsLink).toBe(true);
        });
    });
});
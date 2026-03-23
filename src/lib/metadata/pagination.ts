import { Metadata } from 'next';

/**
 * Генерирует metadata для пагинированных страниц с rel="prev/next"
 */
export const paginationMetadata = {

    /**
     * Metadata для страниц поиска с пагинацией (если понадобится)
     */
    search: (page: number, query?: string, totalPages?: number): Metadata => {
        const baseUrl = 'https://plattr.guide';
        const isFirstPage = page === 1;
        
        const currentUrl = isFirstPage 
            ? `${baseUrl}/search/`
            : `${baseUrl}/search/page/${page}/`;
            
        const prevUrl = page > 2 
            ? `${baseUrl}/search/page/${page - 1}/`
            : page === 2 
                ? `${baseUrl}/search/`
                : undefined;
                
        const nextUrl = (!totalPages || page < totalPages)
            ? `${baseUrl}/search/page/${page + 1}/`
            : undefined;

        const title = query
            ? `Поиск "${query}" - Plattr - Страница ${page}`
            : `Поиск ресторанов - Plattr - Страница ${page}`;
            
        const description = query
            ? `Результаты поиска по запросу "${query}" - Страница ${page}`
            : `Поиск ресторанов на Plattr - Страница ${page}`;

        return {
            title,
            description,
            alternates: {
                canonical: currentUrl,
                ...(prevUrl && { prev: prevUrl }),
                ...(nextUrl && { next: nextUrl }),
            },
        };
    },

    /**
     * Metadata для страниц страны с пагинацией
     */
    country: (country: string, page: number, totalPages?: number): Metadata => {
        const isFirstPage = page === 1;
        const baseUrl = 'https://plattr.guide';
        
        // URL для текущей страницы
        const currentUrl = isFirstPage 
            ? `${baseUrl}/${country}/`
            : `${baseUrl}/${country}/page/${page}/`;
        
        // URL для предыдущей страницы
        const prevUrl = page > 2 
            ? `${baseUrl}/${country}/page/${page - 1}/`
            : page === 2 
                ? `${baseUrl}/${country}/`
                : undefined;
                
        // URL для следующей страницы
        const nextUrl = (!totalPages || page < totalPages)
            ? `${baseUrl}/${country}/page/${page + 1}/`
            : undefined;

        const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ');
        const title = `Рестораны в ${countryName} - Plattr - Страница ${page}`;
        const description = `Каталог ресторанов в ${countryName} - Страница ${page}`;

        return {
            title,
            description,
            alternates: {
                canonical: currentUrl,
                ...(prevUrl && { prev: prevUrl }),
                ...(nextUrl && { next: nextUrl }),
            },
        };
    },

    /**
     * Metadata для страниц города с пагинацией
     */
    city: (country: string, city: string, page: number, totalPages?: number): Metadata => {
        const isFirstPage = page === 1;
        const baseUrl = 'https://plattr.guide';
        
        // URL для текущей страницы
        const currentUrl = isFirstPage 
            ? `${baseUrl}/${country}/${city}/`
            : `${baseUrl}/${country}/${city}/page/${page}/`;
        
        // URL для предыдущей страницы
        const prevUrl = page > 2 
            ? `${baseUrl}/${country}/${city}/page/${page - 1}/`
            : page === 2 
                ? `${baseUrl}/${country}/${city}/`
                : undefined;
                
        // URL для следующей страницы
        const nextUrl = (!totalPages || page < totalPages)
            ? `${baseUrl}/${country}/${city}/page/${page + 1}/`
            : undefined;

        const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ');
        const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
        const title = `Рестораны в ${cityName}, ${countryName} - Plattr - Страница ${page}`;
        const description = `Каталог ресторанов в ${cityName}, ${countryName} - Страница ${page}`;

        return {
            title,
            description,
            alternates: {
                canonical: currentUrl,
                ...(prevUrl && { prev: prevUrl }),
                ...(nextUrl && { next: nextUrl }),
            },
        };
    },
};
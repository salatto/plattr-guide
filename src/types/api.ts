export interface ApiError {
    status: number;
    message: string;
}

export interface PaginationParams {
    count?: number;
    page_num?: number;
}

export interface SearchParams {
    search_str?: string;
}

export interface RestaurantQueryParams extends PaginationParams, SearchParams {}

export interface SearchQueryParams {
    search_str: string;
}
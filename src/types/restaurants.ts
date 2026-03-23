export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningHours {
    id: number;
    day_of_week: DayOfWeek;
    open_time: string;
    close_time: string;
}

export interface RestaurantListItem {
    id: number;
    title: string;
    image_url?: string | null;
    image_name?: string | null; // Legacy поле для обратной совместимости
    opening_hours: OpeningHours[];
    city?: string | null;
    country?: string | null;
}

export interface SocialUrl {
    id: number;
    url: string;
}

export type MenuCategory = unknown;

export interface RestaurantDetails {
    similar: RestaurantListItem[]; // Уточнили тип
    // menu_sections: any[]; // Уточнили тип
    description?: string | null;
    venue_type?: string | null; // Уточнили тип
    subtitle?: string | null;
    gallery_urls: string[];
    tags: string[];
    categories: string[];
    id: number;
    owner_uuid: string;
    title: string;
    image_url?: string | null;
    plattr_guide_url?: string | null;
    language_type: string;
    currency_type: string;
    phone_number?: string | null;
    is_translate_allowed: boolean;
    street?: string | null;
    street_number?: string | null;
    zip_code?: string | null;
    city?: string | null;
    country?: string | null;
    created_at: string;
    updated_at: string;
    social_urls: SocialUrl[];
    opening_hours: OpeningHours[];
    menu_categories: MenuCategory[];
}

export interface GetRestaurantsParams {
    search_str?: string;
    count?: number;
    page_num?: number;
}
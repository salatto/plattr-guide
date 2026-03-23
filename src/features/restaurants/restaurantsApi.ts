import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    RestaurantListItem,
    RestaurantDetails,
} from "@/types/restaurants";
import type {
    RestaurantQueryParams,
    SearchQueryParams,
    ApiError,
} from "@/types/api";

export const restaurantsApi = createApi({
    reducerPath: "restaurantsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        timeout: 15000,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ["Restaurant", "RestaurantList"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getRestaurants: builder.query<
            RestaurantListItem[],
            RestaurantQueryParams | void
        >({
            query: (args) => {
                const params = { count: 12, page_num: 1, search_str: "", ...(args || {}) };
                const searchParams = new URLSearchParams({
                    count: params.count.toString(),
                    page_num: params.page_num.toString(),
                    search_str: params.search_str,
                });
                return `restaurants?${searchParams.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Restaurant" as const, id })),
                          { type: "RestaurantList", id: "LIST" },
                      ]
                    : [{ type: "RestaurantList", id: "LIST" }],
            transformErrorResponse: (response: { status: number; data?: { message?: string } }): ApiError => ({
                status: response.status,
                message: response.data?.message || 'Failed to load restaurants',
            }),
        }),

        getRestaurantById: builder.query<RestaurantDetails, number | string>({
            query: (id) => `restaurants/${id}`,
            providesTags: (result, error, id) => [{ type: "Restaurant", id }],
            transformErrorResponse: (response: { status: number; data?: { message?: string } }): ApiError => ({
                status: response.status,
                message: response.data?.message || 'Failed to load restaurant details',
            }),
        }),

        searchRestaurants: builder.query<
            RestaurantListItem[],
            SearchQueryParams
        >({
            query: ({ search_str }) => {
                const searchParams = new URLSearchParams({ search_str });
                return `restaurants/search?${searchParams.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Restaurant" as const, id })),
                          { type: "RestaurantList", id: "SEARCH" },
                      ]
                    : [{ type: "RestaurantList", id: "SEARCH" }],
            transformErrorResponse: (response: { status: number; data?: { message?: string } }): ApiError => ({
                status: response.status,
                message: response.data?.message || 'Failed to search restaurants',
            }),
        }),
    }),
});

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useSearchRestaurantsQuery,
    useLazyGetRestaurantsQuery,
    useLazySearchRestaurantsQuery,
} = restaurantsApi;

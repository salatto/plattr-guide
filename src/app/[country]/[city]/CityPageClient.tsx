"use client";

import { useParams } from "next/navigation";
import { useGetRestaurantsQuery } from "@/features/restaurants/restaurantsApi";
import { createSlug } from "@/lib/utils/links";

import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import Container from "@ui/Layout/Container/Container";
import { Section } from "@ui/Layout/Section/Section";
import RestaurantCard from "@/components/Pages/Home/RestaurantsAll/RestaurantCard";

export default function CityPageClient() {
    const { country, city } = useParams<{ country: string; city: string }>();
    const { data, isLoading, isError, refetch } = useGetRestaurantsQuery({
        count: 100 // получаем больше для фильтрации
    });

    // Декодируем slugs в читаемые названия
    const countryName = country ? country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ') : 'Country';
    const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ') : 'City';

    // Отладочная информация отключена для продакшена

    // Фильтруем рестораны по стране и городу (используем data напрямую)
    const cityRestaurants = data?.filter(restaurant => {
        if (!restaurant.country || !restaurant.city) {
            return false;
        }
        const restaurantCountrySlug = createSlug(restaurant.country);
        const restaurantCitySlug = createSlug(restaurant.city);
        
        return restaurantCountrySlug === country && restaurantCitySlug === city;
    }) || [];

    // console.log('CityPage - Filtered restaurants:', cityRestaurants.length);

    if (isLoading) {
        return (
            <div className="w-full">
                <Container className="py-[24px]">
                    <div className="mb-8 space-y-4">
                        <div className="h-6 w-1/3 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-8 w-1/2 bg-neutral-100 animate-pulse rounded" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-64 bg-neutral-100 animate-pulse rounded-lg" />
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-6 text-red-600">
                Failed to load restaurants.{" "}
                <button className="underline" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <Container size="wide" className="py-[24px]">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: "Main", href: "/" },
                        { label: countryName, href: `/${country}` },
                        { label: cityName, href: `/${country}/${city}` },
                    ]}
                />

                {/* Header */}
                <Section className="mt-[30px] mb-[45px]">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                        Restaurants in {cityName}, {countryName}
                    </h1>
                </Section>

                {/* Restaurants Grid */}
                <Section>
                    {cityRestaurants.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cityRestaurants.map((restaurant) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-neutral-600 mb-2">
                                No restaurants found
                            </h3>
                            <p className="text-neutral-500">
                                We couldn&apos;t find any restaurants in {cityName}, {countryName} yet.
                            </p>
                        </div>
                    )}
                </Section>
            </Container>
        </>
    );
}
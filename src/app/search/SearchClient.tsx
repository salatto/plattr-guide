"use client";

import { useState } from "react";
import { useSearchRestaurantsQuery } from "@/features/restaurants/restaurantsApi";
import Container from "@/components/ui/Layout/Container/Container";
import { Section } from "@/components/ui/Layout/Section/Section";
import RestaurantCard from "@/components/Pages/Home/RestaurantsAll/RestaurantCard";

export default function SearchClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const { data: searchResults, isLoading, isError } = useSearchRestaurantsQuery(
        { search_str: activeSearch },
        { skip: !activeSearch }
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setActiveSearch(searchQuery);
    };

    return (
        <Container size="wide" className="py-8">
            <Section>
                <div className="max-w-2xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-center mb-6">Поиск ресторанов</h1>
                    
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Введите название ресторана..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Поиск
                        </button>
                    </form>
                </div>

                {isLoading && (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Поиск...</p>
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-600">
                        Ошибка при поиске. Попробуйте еще раз.
                    </div>
                )}

                {searchResults && searchResults.length === 0 && activeSearch && (
                    <div className="text-center text-gray-600">
                        По запросу &quot;{activeSearch}&quot; ничего не найдено.
                    </div>
                )}

                {searchResults && searchResults.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Результаты поиска для &quot;{activeSearch}&quot; ({searchResults.length})
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResults.map((restaurant, index) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    statusText="Open now"
                                    priority={index < 4}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Section>
        </Container>
    );
}
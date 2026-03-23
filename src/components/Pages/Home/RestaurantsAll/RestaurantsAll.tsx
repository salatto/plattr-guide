// components/pages/RestaurantsAll/RestaurantsSection.tsx
"use client";

import { useGetRestaurantsQuery } from "@/features/restaurants/restaurantsApi";
import { getOpenStatusNow } from "@/lib/openStatus";
// import { preloadRestaurantImages } from "@/lib/utils/preloadImages";
import Container from "@ui/Layout/Container/Container";
import RestaurantCard from "./RestaurantCard";
// import { useEffect } from "react";

// components/pages/RestaurantsAll/RestaurantCard.skeleton.tsx
function RestaurantCardSkeleton() {
    return (
        <div className="">
            <div className="aspect-[354/291] w-full rounded-[16px] bg-neutral-200/70" />
            <div className="mt-2 space-y-2">
                <div className="h-3 w-24 rounded bg-neutral-200/80" />
                <div className="h-4 w-3/4 rounded bg-neutral-200/90" />
                <div className="h-3 w-32 rounded bg-neutral-200/80" />
            </div>
        </div>
    );
}


export default function RestaurantsSection() {
    const { data, isLoading, isError, refetch } = useGetRestaurantsQuery({ count: 100, page_num: 1 });

    // Debug: посмотрим что приходит в данных
    if (process.env.NODE_ENV === 'development' && data?.length) {
        // console.log('Restaurant data sample:', data[0]);
    }


    const Grid: React.FC<React.PropsWithChildren> = ({ children }) => (
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[20px] gap-y-[32px]">
            {children}
        </div>
    );

    return (
        <section className="w-full">
            <Container className="py-[24px] max-w-[1660px]">
                <h2 className="font-hostGrotesk font-semibold text-[24px] leading-[130%] tracking-[0] text-[#515151] mb-[32px]">
                    Top restaurants
                </h2>


                {isLoading && (
                    <Grid>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <RestaurantCardSkeleton key={i} />
                        ))}
                    </Grid>
                )}

                {isError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        Failed to load.&nbsp;
                        <button onClick={() => refetch()} className="underline underline-offset-2">
                            Retry
                        </button>
                    </div>
                )}
                {!!data?.length && (
                    <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[20px] gap-y-[32px]">
                        {data.map((r, index) => {
                            const st = getOpenStatusNow(r.opening_hours, "Europe/Berlin");
                            return (
                                <RestaurantCard
                                    key={r.id}
                                    restaurant={r}
                                    statusText={st.statusText}
                                    priority={index < 4} // Первые 4 изображения загружаем с приоритетом
                                />
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}

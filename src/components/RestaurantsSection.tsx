"use client";

import { useGetRestaurantsQuery } from "@/features/restaurants/restaurantsApi";
import RestaurantCard from "@/components/Pages/Home/RestaurantsAll/RestaurantCard";
import { getOpenStatusNow } from "@/lib/openStatus";
import Container from "@ui/Layout/Container/Container";

export default function RestaurantsSection() {
  const { data, isLoading, isError, refetch } = useGetRestaurantsQuery({ count: 6, page_num: 1 });

  // const st = getOpenStatusNow(data?.[0]?.opening_hours || []); // { isOpen, text }

  // console.log("Open Status:", st);
  return (
    <section className="w-full">
      <Container className="py-[24px] mx-auto max-w-[1660px] px-[24px]">
        {/* <div className="mx-auto max-w-[1660px] px-[24px] sm:px-[40px] lg:px-[92px]"> */}
          <h2 className="mb-4 text-[14px] font-medium leading-[18px] text-neutral-700">
            Top restaurants
          </h2>

          {isLoading && <p className="text-sm text-neutral-500">Loading…</p>}
          {isError && (
            <p className="text-sm text-red-600">
              Failed to load. <button onClick={() => refetch()} className="underline">Retry</button>
            </p>
          )}

          {!!data?.length && (
            <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[20px] gap-y-[32px]">
              {data?.map((r, index) => {
                const st = getOpenStatusNow(r.opening_hours,'Europe/Berlin'); // { isOpen, text }
                return (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    statusText={st.statusText}
                    priority={index < 4}
                  />
                );
              })}
            </div>
          )}
        {/* </div> */}
      </Container>
    </section>
  );
}

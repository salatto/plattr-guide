"use client";

// import { useParams } from "next/navigation";
import { useGetRestaurantByIdQuery } from "@/features/restaurants/restaurantsApi";
import { extractIdFromSlug, createRestaurantBreadcrumbs } from "@/lib/utils/links";
import { getOpenStatusNow } from "@/lib/openStatus";

import Gallery from "@Pages/RestaurantDetails/HeroGallery/HeroGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import Container from "@ui/Layout/Container/Container";
import { Section } from "@ui/Layout/Section/Section";

import RestaurantHeader from "@Pages/RestaurantDetails/RestaurantHeader/RestaurantHeader";
import ContactBlock from "@Pages/RestaurantDetails/ContactBlock/ContactBlock";

// Имитация 5 картинок для галереи
const mockGallery = [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
];

type OpeningHour = {
    id: string | number;
    day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    open_time?: string | null;   // "HH:MM:SS"
    close_time?: string | null;  // "HH:MM:SS"
};

const dayLabel: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, string> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

// "HH:MM:SS" → "HH:MM"
const hhmm = (s?: string | null) => (s ? s.slice(0, 5) : "");

interface Props {
    restaurant: string;
}

export default function RestaurantDetailsClient({ restaurant }: Props) {
    // Извлекаем ID из slug'а
    const id = extractIdFromSlug(restaurant);
    
    // console.log('RestaurantDetailsClient params:', { restaurant, id });
    
    // React Hooks должны вызываться всегда, независимо от условий
    const { data, isLoading, isError, refetch } = useGetRestaurantByIdQuery(id || 'invalid', {
        skip: !id // пропускаем запрос если ID нет
    });

    try {

    if (!id) {
        console.error('Failed to extract ID from restaurant slug:', restaurant);
        return (
            <div className="mx-auto max-w-6xl px-4 py-6 text-red-600">
                Invalid restaurant URL: {restaurant}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full">
                <Container className="py-[24px]">
                    {/* Gallery skeleton - такой же размер как реальная галерея */}
                    <div className="mb-8">
                        <div className="h-[280px] md:h-[400px] w-full rounded-2xl bg-neutral-100 animate-pulse" />
                    </div>
                    
                    {/* Header skeleton */}
                    <div className="mb-8 space-y-4">
                        <div className="h-8 w-1/3 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-6 w-1/4 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-4 w-1/5 bg-neutral-100 animate-pulse rounded" />
                    </div>
                    
                    {/* Two column layout skeleton - имитация ContactBlock и OpeningHours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="space-y-4">
                            <div className="h-6 w-1/2 bg-neutral-100 animate-pulse rounded" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-3/4 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-6 w-1/2 bg-neutral-100 animate-pulse rounded" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-3/4 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-3/4 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    if (isError) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-6 text-red-600">
                Failed to load.{" "}
                <button className="underline" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }
    
    if (!data) {
        return <div className="mx-auto max-w-6xl px-4 py-6">Not found</div>;
    }

    const st = getOpenStatusNow(data.opening_hours, 'Europe/Berlin'); // { isOpen, text }
    
    // Создаем breadcrumbs на основе данных ресторана
    const breadcrumbItems = createRestaurantBreadcrumbs(data);

    // Готовим поля под дизайн (мягкие фолыбэки)
    const categories: string[] = data.categories?.length ? data.categories : data.tags?.length ? data.tags : [];

    return (
        <>
            <Container size="wide" className="py-[24px]">
                {/* Breadcrumbs */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Gallery */}
                <Section className="mt-[30px] mb-[45px]">
                    <Gallery
                        images={mockGallery}
                    // fallbackImg={mockGallery[0] || fallbackImg}
                    />
                </Section>

                {/* Заголовок и контактная информация */}

                <Section className="mx-auto mt-[22px] px-5 py-6 md:p-8 bg-[#FAFAFA] rounded-[23px]">
                    <RestaurantHeader
                        title={data.title}
                        subtitle={data.subtitle}
                        statusText={st.statusText}
                        isOpen={st.isOpen}
                        categories={categories}
                        onMenuClick={() => console.log("Menu clicked")}
                        onLocationClick={() => console.log("Location clicked")}
                        onShareClick={() => console.log("Share clicked")}
                    />
                </Section>

                {/* Contact & Location */}
                <Section className="mx-auto mt-[22px] px-5 py-6 md:p-8 bg-[#FAFAFA] rounded-[23px]">
                    <ContactBlock
                        phone={data.phone_number}
                        website={data.social_urls?.[0]?.url}
                        zip={data.zip_code}
                        city={data.city}
                        street={data.street}
                        streetNumber={data.street_number}
                    />
                </Section>

                {/* Opening Hours */}
                <Section className="mx-auto mt-[22px] px-5 py-6 md:p-8 bg-[#FAFAFA] rounded-[23px]">
                    <div className="w-full md:max-w-md">
                        {/* Заголовок */}
                        <h2 className="text-2xl font-semibold leading-[29px] text-neutral-900">
                            Opening hours
                        </h2>

                        {/* Подзаголовок */}
                        <p className="mt-2 text-base font-normal leading-6 text-[#6B7280]">
                            Plan your visit right – here&apos;s when the doors are open
                        </p>

                        {/* Список дней и времени */}
                        <div className="mt-6 space-y-2">
                            {data.opening_hours?.map((oh: OpeningHour) => (
                                <div
                                    key={oh.id}
                                    className="flex items-center justify-between"
                                >
                                    {/* День недели */}
                                    <span className="text-[16px] leading-6 font-normal text-black">
                                        {dayLabel[oh.day_of_week]}
                                    </span>

                                    {/* Часы работы */}
                                    {oh.open_time && oh.close_time ? (
                                        <span className="text-[16px] leading-6 font-normal text-black">
                                            {hhmm(oh.open_time)} – {hhmm(oh.close_time)}
                                        </span>
                                    ) : (
                                        <span className="text-[16px] leading-6 font-normal text-black">
                                            Closed
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </Container>
        </>
    );
    } catch (error) {
        console.error('RestaurantDetailsClient error:', error);
        return (
            <div className="mx-auto max-w-6xl px-4 py-6 text-red-600">
                Application error occurred. Check console for details.
            </div>
        );
    }
}
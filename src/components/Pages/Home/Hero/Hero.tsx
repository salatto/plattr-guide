"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@ui/Layout/Container/Container";
import { Section } from "@ui/Layout/Section/Section";
import { useGetRestaurantsQuery } from "@/features/restaurants/restaurantsApi";
import { createRestaurantPath } from "@/lib/utils/links";

// простой дебаунс
function useDebounced<T>(value: T, delay = 300) {
    const [v, setV] = useState(value);
    useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
    return v;
}

interface RestaurantData {
    id: number;
    title: string;
    // добавьте другие поля, которые есть в ваших данных
}

type Props = { city?: string };

export default function HeroPlattr({ city }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const [q, setQ] = useState("");
    const dq = useDebounced(q, 300);

    // никаких изменений URL — просто ходим на сервер
    const minChars = 2;
    const enabled = dq.trim().length >= minChars;

    // можно использовать отдельный «легкий» suggest-эндпоинт; но ок и так:
    const { data = [], isFetching } = useGetRestaurantsQuery(
        { search_str: dq, count: 8, page_num: 1 },
        { skip: !enabled }
    );

    const [open, setOpen] = useState(false);
    useEffect(() => { setOpen(enabled && (isFetching || data.length > 0)); }, [enabled, isFetching, data.length]);

    const tags = [
        { label: "breakfasts", icon: "🥐" },
        { label: "dinners", icon: "🍽️" },
        { label: "nice view", icon: "😍" },
        { label: "junk food", icon: "🍔" },
        { label: "healthy meals", icon: "🥗" },
    ];

    const onEnter = () => {
        // тут ничего с URL не делаем — можешь, например, закрыть дропдаун
        setOpen(false);
    };

    return (
        <Section>
            <Container className="py-[24px] mx-auto max-w-[1660px] px-[24px]">
                <div className="mx-auto max-w-[900px] text-center">

                    {/* Title container: ТОЛЬКО здесь отступ 84px сверху */}
                    <div className="mt-[84px]">
                        {/* Description — виден только на главной */}
                        {pathname === "/" && (
                            <p className="text-[16px] leading-[111%] tracking-[-0.03em] text-black">
                                Browse, Review, and Book with{" "}
                                <span className="text-[#3CB63C] font-medium">Plattr</span>
                            </p>
                        )}

                        <h1 className="mt-2 text-[38px] md:text-[58px] leading-[111%] font-semibold tracking-[0]">
                            Glad to see you
                            <br className="sm:hidden" />
                            <span className="hidden sm:inline"> </span>
                            in{" "}
                            <span className="text-[#48A848] inline-flex items-center gap-1">
                                {city}
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.5992 9.05379C27.0563 8.36067 28.5767 9.88112 27.8836 11.3382L18.0746 31.9594C17.2807 33.6284 14.7716 33.0326 14.8127 31.1849L14.9789 23.7105C15.0006 22.734 14.2034 21.9368 13.2269 21.9585L5.75258 22.1247C3.90483 22.1658 3.30907 19.6567 4.97808 18.8628L25.5992 9.05379Z" fill="#48A848" />
                                </svg>
                            </span>
                        </h1>
                    </div>

                    {/* Search (остается ниже title container) */}
                    <div className="relative mx-auto mt-5 w-full max-w-[606px] h-[46px]">
                        <label htmlFor="hero-search" className="sr-only">
                            Search for dish
                        </label>
                        <input
                            id="hero-search"
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onEnter()}
                            onFocus={() => enabled && setOpen(true)}
                            placeholder="Search for dish"
                            className="h-[46px] w-full rounded-full border border-[#48A848] px-[13px] pr-28 text-[16px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#48A848]/20"
                        />
                        <button
                            type="button"
                            onClick={onEnter}
                            className="absolute right-[2px] top-1/2 -translate-y-1/2 h-[42px] w-[120px] rounded-full bg-[#48A848] text-white text-[16px] font-semibold inline-flex items-center justify-center gap-1"
                            aria-label="Search"
                        >
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.07324" y="21.9336" width="6" height="2" rx="1" transform="rotate(-45 2.07324 21.9336)" fill="white" />
                                <circle cx="14.0732" cy="10.8633" r="7" stroke="white" strokeWidth="2" />
                            </svg>
                            Search
                        </button>

                        {open && (
                            <ul className="absolute z-10 mt-2 w-full rounded-2xl border border-neutral-200 bg-white text-left shadow-lg overflow-hidden">
                                {isFetching && <li className="px-4 py-3 text-sm text-neutral-500">Searching…</li>}
                                {!isFetching && data.length === 0 && <li className="px-4 py-3 text-sm text-neutral-500">No results</li>}
                                {!isFetching &&
                                    data.map((item: RestaurantData) => (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                // если переход вообще не нужен — сделай тут setOpen(false) и, например, setQ(item.title)
                                                onClick={() => router.push(createRestaurantPath(item))}
                                                className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-50"
                                            >
                                                {item.title}
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <div className="mt-4">
                        <div className="sm:hidden">
                            <div className="flex justify-center gap-[8px] flex-wrap">
                                {tags.map(t => (
                                    <button
                                        key={`m1-${t.label}`}
                                        type="button"
                                        onClick={() => {
                                            setQ(t.label);
                                            setOpen(true);
                                        }}
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--chip-bg)] px-4 h-[32px] text-[13px] hover:bg-gray-200"
                                    >
                                        <span aria-hidden>{t.icon}</span>{t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:block">
                            <div className="flex justify-center gap-[8px] flex-wrap">
                                {tags.map(t => (
                                    <button
                                        key={`d1-${t.label}`}
                                        type="button"
                                        onClick={() => {
                                            setQ(t.label);
                                            setOpen(true);
                                        }}
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--chip-bg)] px-4 h-[32px] text-[13px] hover:bg-gray-200"
                                    >
                                        <span aria-hidden>{t.icon}</span>{t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
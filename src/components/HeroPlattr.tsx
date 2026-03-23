"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Container from "@ui/Layout/Container/Container";

type Props = { city?: string };

export default function HeroPlattr({ city = "Berlin" }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const [q, setQ] = useState("");

    const submit = useCallback(() => {
        const search_str = q.trim();
        if (!search_str) return;
        router.push(`/search?q=${encodeURIComponent(search_str)}`);
    }, [q, router]);

    const tags = [
        { label: "breakfasts", icon: "🥐" },
        { label: "dinners", icon: "🍽️" },
        { label: "nice view", icon: "😍" },
        { label: "junk food", icon: "🍔" },
        { label: "healthy meals", icon: "🥗" },
    ];

    return (
        <section className="px-[24px] pt-[24px] pb-[24px]">
            <Container>
                <div className="mx-auto max-w-[900px] text-center">
                    <div className="mt-[84px]">
                        {pathname === "/" && (
                            <p className="text-[16px] leading-[111%] tracking-[-0.03em] text-black">
                                Browse, Review, and Book with{" "}
                                <span className="text-[#2D8C2D] font-medium">Plattr</span>
                            </p>
                        )}

                        <h1 className="mt-2 text-[38px] md:text-[58px] leading-[111%] font-semibold">
                            Glad to see you in{" "}
                            <span className="text-[#2D6C2D]">{city}</span>
                        </h1>
                    </div>

                    {/* Search */}
                    <div className="relative mx-auto mt-5 w-full max-w-[606px] h-[46px]">
                        <label htmlFor="hero-search" className="sr-only">
                            Search for restaurant
                        </label>
                        <input
                            id="hero-search"
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submit()}
                            placeholder="Search for restaurant"
                            className="h-[46px] w-full rounded-full border border-[#2D6C2D] px-[13px] pr-28 text-[16px] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#2D6C2D]/20"
                        />
                        <button
                            type="button"
                            onClick={submit}
                            className="absolute right-[2px] top-1/2 -translate-y-1/2 h-[42px] w-[120px] rounded-full bg-[#2D6C2D] text-white text-[16px] font-semibold inline-flex items-center justify-center"
                        >
                            Search
                        </button>
                    </div>

                    {/* Chips */}
                    <div className="mt-4 flex justify-center gap-[8px] flex-wrap">
                        {tags.map((t) => (
                            <a
                                key={t.label}
                                href={`/search?q=${encodeURIComponent(t.label)}`}
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--chip-bg)] px-4 h-[32px] text-[13px] hover:bg-gray-200"
                            >
                                <span aria-hidden>{t.icon}</span>
                                {t.label}
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

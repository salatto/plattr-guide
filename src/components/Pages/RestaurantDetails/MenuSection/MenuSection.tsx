"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuCategory } from "@/types/restaurants";

type Props = {
    categories: MenuCategory[];
    currency?: string;
};

function formatPrice(price: number, currency: string) {
    const symbols: Record<string, string> = {
        EUR: "€",
        USD: "$",
        GBP: "£",
    };
    const symbol = symbols[currency] || currency;
    const formatted = price % 1 === 0 ? price.toString() : price.toFixed(2);
    return `${formatted} ${symbol}`;
}

const tagColors: Record<string, string> = {
    vegetarian: "bg-emerald-50 text-emerald-700",
    vegan: "bg-green-50 text-green-700",
    gluten_free: "bg-amber-50 text-amber-700",
    spicy: "bg-red-50 text-red-700",
    lactose_free: "bg-blue-50 text-blue-700",
    sugar_free: "bg-violet-50 text-violet-700",
    organic: "bg-lime-50 text-lime-700",
    signature: "bg-yellow-50 text-yellow-700",
};

function TagBadge({ tag }: { tag: string }) {
    const color = tagColors[tag] || "bg-neutral-100 text-neutral-600";
    const label = tag.replace(/_/g, " ");
    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${color}`}>
            {label}
        </span>
    );
}

export default function MenuSection({ categories, currency = "EUR" }: Props) {
    const [activeCategory, setActiveCategory] = useState(0);

    if (!categories.length) return null;

    return (
        <div className="grid gap-6">
            <div>
                <h2 className="text-[24px] font-semibold leading-[120%] text-neutral-900">
                    Menu
                </h2>
                <p className="mt-2 text-base leading-6 text-[#6B7280]">
                    What&apos;s cooking? Browse the menu so you&apos;re always in the know
                </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(i)}
                        className={`
                            rounded-full px-5 h-[38px] text-[14px] font-medium transition-colors
                            ${i === activeCategory
                                ? "bg-[#1C1D28] text-white"
                                : "bg-white border border-[#E5E7EB] text-[#1C1D28] hover:bg-neutral-50"
                            }
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Items grid */}
            <div>
                <h3 className="text-[18px] font-semibold text-neutral-900 mb-4">
                    {categories[activeCategory].name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories[activeCategory].items.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl overflow-hidden border border-[#F0F0F0] hover:border-[#E0E0E0] transition-colors"
                        >
                            {item.image_url && (
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.image_url}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {item.tags && item.tags.length > 0 && (
                                        <div className="absolute bottom-2 right-2 flex flex-wrap justify-end gap-1 max-w-[80%]">
                                            {item.tags.map((tag) => (
                                                <TagBadge key={tag} tag={tag} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="p-4">
                                <p className="text-[18px] font-semibold text-[#1C1D28]">
                                    {formatPrice(item.price, currency)}
                                </p>
                                <p className="mt-1 text-[15px] text-[#6B7280]">
                                    {item.name}
                                </p>
                                {item.description && (
                                    <p className="mt-1.5 text-[13px] leading-[1.5] text-[#9CA3AF] line-clamp-2">
                                        {item.description}
                                    </p>
                                )}
                                {item.weight && (
                                    <p className="mt-2 text-[13px] text-[#9CA3AF]">
                                        {item.weight}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// components/restaurant/ContactBlock.tsx
"use client";

import { PhoneIcon, LinkIcon, LocationPinIcon } from "@ui/icons";
import React from "react";

type Props = {
    phone?: string | null;
    website?: string | null;
    zip?: string | null;         // 10781
    city?: string | null;        // Berlin
    street?: string | null;      // Goltzstraße
    streetNumber?: string | null;// 32
};

export default function ContactBlock({
    phone,
    website,
    zip,
    city,
    street,
    streetNumber,
}: Props) {
    const host = website
        ? (() => { try { return new URL(website).hostname; } catch { return website; } })()
        : undefined;

    // Полный адрес для вывода и для карты
    const streetLine = [street, streetNumber].filter(Boolean).join(" ");
    const cityLine = [zip, city].filter(Boolean).join(" ");
    const fullAddress = [streetLine, cityLine].filter(Boolean).join(", ");
    const mapsHref = fullAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
        : undefined;

    return (
        // itemscope для организации
        <div itemScope itemType="https://schema.org/LocalBusiness" className="grid gap-6">
            {/* Title */}
            <div>
                <h2 className="text-[24px] font-semibold leading-[120%] text-neutral-900">
                    Contact and Location
                </h2>
                <p className="mt-2 text-base leading-6 text-[#6B7280]">
                    Questions, bookings or just saying hi? Here’s how to reach us.
                </p>
            </div>

            {/* Контакты: одна колонка, отступ 12px */}
            <div className="flex flex-col gap-3">
                {/* phone (tap-to-call) */}
                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className="grid grid-cols-[20px_auto] items-center gap-2"
                        itemProp="telephone"
                    >
                        <PhoneIcon className="h-[20px] w-[20px] text-[#1C1D28]" />
                        <span className="text-[16px] leading-[24px] font-medium text-[#4CA154] hover:underline">
                            {phone}
                        </span>
                    </a>
                )}

                {/* website (nofollow) */}
                {host && website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="grid grid-cols-[20px_auto] items-center gap-2"
                        itemProp="url"
                    >
                        <LinkIcon className="h-[20px] w-[20px] text-[#1C1D28]" />
                        <span className="text-[16px] leading-[24px] font-medium text-[#4CA154] hover:underline">
                            {host}
                        </span>
                    </a>
                )}

                {/* address → ссылка на Google Maps + PostalAddress */}
                {(streetLine || cityLine) && (
                    <div className="grid grid-cols-[20px_auto] items-center gap-2">
                        <LocationPinIcon className="h-[20px] w-[20px] text-black" />
                        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            {mapsHref ? (
                                <a
                                    href={mapsHref}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex flex-wrap items-baseline gap-x-2"
                                    aria-label={`Open in Google Maps: ${fullAddress}`}
                                >
                                    {/* cityLine жирным, streetLine обычным как в макете */}
                                    {cityLine && (
                                        <span className="text-[16px] leading-6 font-semibold text-[#000000]" itemProp="postalCode addressLocality">
                                            {cityLine}
                                        </span>
                                    )}
                                    {streetLine && (
                                        <span className="text-[16px] leading-6 font-normal text-[#000000]" itemProp="streetAddress">
                                            {streetLine}
                                        </span>
                                    )}
                                </a>
                            ) : (
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                    {cityLine && (
                                        <span className="text-[16px] leading-6 font-semibold text-[#000000]" itemProp="postalCode addressLocality">
                                            {cityLine}
                                        </span>
                                    )}
                                    {streetLine && (
                                        <span className="text-[16px] leading-6 font-normal text-[#000000]" itemProp="streetAddress">
                                            {streetLine}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

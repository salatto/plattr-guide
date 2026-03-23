// components/restaurant/RestaurantHeader.tsx
"use client";

import { LocationPinIcon, MindMapIcon, MenuButtonIcon } from "@ui/icons";

interface RestaurantHeaderProps {
    title: string;
    subtitle?: string | null;
    statusText?: string;
    isOpen?: boolean;
    categories?: string[];
    onMenuClick?: () => void;
    onLocationClick?: () => void;
    onShareClick?: () => void;
}

export default function RestaurantHeader({
    title,
    subtitle,
    statusText,
    isOpen,
    categories = [],
    onMenuClick,
    onLocationClick,
    onShareClick,
}: RestaurantHeaderProps) {
    return (
        <div className="md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-6">
            {/* Title */}
            <div className="order-1 md:order-1">
                <h1 className="text-[36px] font-semibold leading-[130%] text-neutral-900">
                    {title}
                </h1>
            </div>

            {/* Actions */}
            <div className="order-2 md:order-2 md:self-start mt-3 md:mt-0">
                <div className="flex items-center gap-3">
                    {/* pill Menu */}
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="inline-flex items-center gap-[10px] h-[38px] px-[12px] py-[9px] 
                       rounded-[25px] bg-[#EBEBEB] 
                       text-[13px] leading-[24px] font-medium text-[#303947]"
                    >
                        <MenuButtonIcon />
                        Menu
                    </button>

                    {/* круглые иконки */}
                    <button
                        onClick={onLocationClick}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EBEBEB]"
                        aria-label="Location"
                    >
                        <LocationPinIcon className="text-[#303947]" />
                    </button>

                    <button
                        onClick={onShareClick}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EBEBEB]"
                        aria-label="Share"
                    >
                        <MindMapIcon />
                    </button>
                </div>
            </div>

            {/* Subtitle + status + chips */}
            <div className="order-3 md:order-3 md:col-start-1">
                {/* subtitle */}
                {subtitle && (
                    <p className="mt-3 text-[22px] font-semibold leading-[130%] text-[#1C1D28]">
                        {subtitle}
                    </p>
                )}

                {/* owner note */}
                <p className="mt-1 text-[16px] leading-[140%] text-neutral-400">
                    Owner not registered
                </p>

                {/* status row */}
                {statusText && (
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[16px] text-[#6B7280]">
                        <span className="inline-flex items-center gap-2">
                            <span
                                className="inline-block h-[8px] w-[8px] rounded-full"
                                style={{ backgroundColor: isOpen ? "#22C55E" : "#9CA3AF" }}
                            />
                            <span
                                className={
                                    isOpen
                                        ? "text-[#1C1D28] font-semibold"
                                        : "text-[#1C1D28]"
                                }
                            >
                                {statusText}
                            </span>
                        </span>
                    </div>
                )}

                {/* chips */}
                {!!categories.length && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        {categories.map((c) => (
                            <span
                                key={c}
                                className="inline-flex items-center rounded-full bg-neutral-100 px-5 h-10 text-[16px] text-[#1C1D28]"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

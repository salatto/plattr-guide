"use client";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fullsizeImage } from "@/lib/utils/images";
import { createRestaurantPath } from "@/lib/utils/links";

export type RestaurantCardProps = {
    restaurant: {
        id: number;
        title: string;
        image_name?: string | null;
        image_url?: string | null;
        country?: string | null;
        city?: string | null;
        opening_hours?: { id: number; day_of_week: number; open_time?: string; close_time?: string }[];
    };
    statusText?: string;
    priority?: boolean;
};


export default function RestaurantCard({
    restaurant,
    statusText = "Open now",
    priority = false,
}: RestaurantCardProps) {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    
    const isClosed = statusText?.toLowerCase().startsWith("closed");
    const statusColor = isClosed ? "#F04438" : "#2ECC71";
    
    const imageUrl = fullsizeImage(restaurant.image_name || restaurant.image_url);
    const restaurantPath = createRestaurantPath(restaurant);

    return (
        <Link href={restaurantPath} className="group block w-full min-w-0">
            <div className="relative overflow-hidden rounded-[16px]">
                <AspectRatio.Root ratio={354 / 291} className="relative bg-neutral-100">
                    {imageLoading && (
                        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                    )}
                    {imageUrl && !imageError ? (
                        <Image
                            src={imageUrl}
                            alt={restaurant.title || "Restaurant image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className={`h-full w-full object-cover transition-transform transition-opacity duration-300 group-hover:scale-105 will-change-transform ${
                                imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            priority={priority}
                            quality={90}
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageError(true);
                                setImageLoading(false);
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 bg-neutral-400 rounded opacity-50"></div>
                                <span className="text-neutral-500 text-xs">No image</span>
                            </div>
                        </div>
                    )}
                </AspectRatio.Root>
            </div>

            <div className="mt-2">
                {!!statusText && (
                    <div className="flex items-center gap-2 text-[12px] leading-[16px]">
                        <span
                            className="inline-block h-[8px] w-[8px] rounded-full"
                            style={{ backgroundColor: statusColor }}
                        />
                        <span className="font-hostGrotesk font-medium text-[14px] leading-[100%] text-neutral-900">
                            {statusText}
                        </span>
                    </div>
                )}
                <h3 className="mt-2 truncate font-hostGrotesk font-semibold text-[18px] leading-[130%] text-neutral-900">
                    {restaurant.title}
                </h3>
            </div>
        </Link>
    );
}

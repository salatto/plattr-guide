"use client";

import Image from "next/image";
import { useState } from "react";
import { fullsizeImage, restaurantCard, dishThumbnail } from "@/lib/utils/images";

interface OptimizedImageProps {
    filename?: string | null;
    alt: string;
    width: number;
    height: number;
    size?: "thumb" | "medium" | "large";
    priority?: boolean;
    className?: string;
    quality?: number;
}

export default function OptimizedImage({
    filename,
    alt,
    width,
    height,
    size = "large",
    priority = false,
    className = "",
    quality = 85,
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const getImageUrl = () => {
        if (!filename) return "";
        
        switch (size) {
            case "thumb":
                return dishThumbnail(filename);
            case "medium":
                return restaurantCard(filename);
            case "large":
            default:
                return fullsizeImage(filename);
        }
    };

    const imageUrl = getImageUrl();

    // Debug: добавим консоль для отладки
    if (process.env.NODE_ENV === 'development') {
        console.log('OptimizedImage debug:', { filename, size, imageUrl, hasError });
    }

    if (!filename || hasError || !imageUrl) {
        return (
            <div 
                className={`bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-neutral-400 rounded opacity-50"></div>
                    <span className="text-neutral-500 text-xs">No image</span>
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading && (
                <div 
                    className={`absolute inset-0 bg-neutral-200 animate-pulse`}
                />
            )}
            <Image
                src={imageUrl}
                alt={alt}
                width={width}
                height={height}
                quality={quality}
                priority={priority}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
                sizes={size === "thumb" ? "400px" : size === "medium" ? "800px" : "1600px"}
            />
        </>
    );
}
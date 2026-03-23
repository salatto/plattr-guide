import { fullsizeImage, restaurantCard } from "./images";

interface PreloadImageOptions {
    as?: "image";
    crossOrigin?: "anonymous" | "use-credentials";
    imageSrcSet?: string;
    imageSizes?: string;
}

export function preloadImage(
    filename: string, 
    size: "medium" | "large" = "large",
    options: PreloadImageOptions = {}
): void {
    if (typeof window === "undefined") return;

    const imageUrl = size === "medium" ? restaurantCard(filename) : fullsizeImage(filename);
    
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = options.as || "image";
    link.href = imageUrl;
    
    if (options.crossOrigin) {
        link.crossOrigin = options.crossOrigin;
    }
    
    if (options.imageSrcSet) {
        link.setAttribute("imagesrcset", options.imageSrcSet);
    }
    
    if (options.imageSizes) {
        link.setAttribute("imagesizes", options.imageSizes);
    }

    // Добавляем заголовок для использования кэша
    link.setAttribute("fetchpriority", "high");
    
    document.head.appendChild(link);
}

export function preloadRestaurantImages(filenames: string[]): void {
    if (typeof window === "undefined") return;
    
    // Преффетчим первые 4 изображения в высоком приоритете
    filenames.slice(0, 4).forEach((filename, index) => {
        if (filename) {
            setTimeout(() => {
                preloadImage(filename, "large", {
                    crossOrigin: "anonymous",
                    imageSizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                });
            }, index * 100); // Небольшая задержка между запросами
        }
    });
}
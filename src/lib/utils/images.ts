const API_BASE_URL = "https://image.plattr.one";

export type ImageSize = "thumb" | "medium" | "large";

interface ImageOptions {
    lossless?: boolean;
}

function createImageUrl(filename: string, size: ImageSize, options: ImageOptions = {}): string {
    if (!filename) return "";
    
    const trimmed = filename.trim();
    
    // Если это уже полный URL, попробуем добавить к нему параметры размера
    if (/^https?:\/\//i.test(trimmed)) {
        // Если это уже URL с resize, вернем как есть
        if (trimmed.includes('/resize?')) {
            return trimmed;
        }
        // Попробуем добавить resize параметры
        const url = new URL(trimmed);
        if (url.hostname === 'image.plattr.one') {
            const params = new URLSearchParams({ size });
            if (options.lossless) {
                params.set('lossless', 'true');
            }
            return `${trimmed}/resize?${params.toString()}`;
        }
        return trimmed;
    }

    const clean = trimmed.replace(/^\/+/, "");
    const encoded = encodeURIComponent(clean);
    
    const params = new URLSearchParams({ size });
    if (options.lossless) {
        params.set('lossless', 'true');
    }
    
    return `${API_BASE_URL}/v1/images/${encoded}/resize?${params.toString()}`;
}

// THUMB: 400×400 (1:1) - для списков блюд и превью каталога
export const dishThumbnail = (filename?: string | null): string => {
    if (!filename) return "";
    return createImageUrl(filename, "thumb");
};

// MEDIUM: 800×600 (4:3) - для карточек ресторанов и hero изображений  
export const restaurantCard = (filename?: string | null): string => {
    if (!filename) return "";
    return createImageUrl(filename, "medium");
};

// LARGE: 1600×1200 (4:3) - для веб-сайта и полноэкранного режима
export const fullsizeImage = (filename?: string | null): string => {
    if (!filename) return "";
    return createImageUrl(filename, "large");
};

// Максимальное качество для HEIF изображений
export const highQualityImage = (filename?: string | null): string => {
    if (!filename) return "";
    return createImageUrl(filename, "medium", { lossless: true });
};

// Legacy функция для обратной совместимости
export function normalizeImageUrl(raw?: string | null): string {
    if (!raw) return "";
    const trimmed = raw.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;

    const clean = trimmed.replace(/^\/+/, "");
    return `${API_BASE_URL}/v1/images/${encodeURIComponent(clean)}`;
}
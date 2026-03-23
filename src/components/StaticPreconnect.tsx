// Статичные preconnect теги для критичных доменов
// Должны загружаться как можно раньше для экономии времени на DNS/TCP

export function StaticPreconnect() {
    return (
        <>
            {/* КРИТИЧНО: CDN изображений - экономия 300мс по данным Lighthouse */}
            <link rel="preconnect" href="https://image.plattr.one" />
            
            {/* Google Fonts - экономия на загрузке шрифтов */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* Preload критичного CSS для Host Grotesk - оптимизация критического пути */}
            <link 
                rel="preload" 
                href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap" 
                as="style" 
                crossOrigin="anonymous"
            />
            
            {/* Resource hints для ускорения загрузки статики */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            
            {/* API домен - если нужно */}
            <link rel="dns-prefetch" href="https://api.plattr.one" />
        </>
    );
}
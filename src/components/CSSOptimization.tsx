'use client';

import { useEffect } from 'react';

export function CSSOptimization() {
    useEffect(() => {
        // КРИТИЧНО: Preconnect для внешних доменов - экономия 300мс!
        const preconnectDomains = [
            'https://image.plattr.one',      // CDN изображений - ЭКОНОМИЯ 300мс
            'https://fonts.googleapis.com',  // Google Fonts CSS
            'https://fonts.gstatic.com',     // Google Fonts файлы
        ];
        
        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // Шрифт уже загружается в layout.tsx, дублирование не нужно

        // Отложенная загрузка некритичного CSS (готово для использования)
        // const loadCSS = (href: string) => {
        //     const link = document.createElement('link');
        //     link.rel = 'stylesheet';
        //     link.href = href;
        //     link.media = 'print';
        //     link.onload = function() {
        //         link.media = 'all';
        //     };
        //     document.head.appendChild(link);
        // };

        // Оптимизация для последующих страниц (отключено - избегаем prefetch несуществующих страниц)
        // setTimeout(() => {
        //     // Предзагружаем статические ресурсы для ускорения навигации
        //     const links = [
        //         '/restaurants/all',
        //         '/restaurants',
        //     ];
        //     
        //     links.forEach(href => {
        //         const link = document.createElement('link');
        //         link.rel = 'prefetch';
        //         link.href = href;
        //         document.head.appendChild(link);
        //     });
        // }, 1000);

    }, []);

    return (
        <style jsx>{`
            /* Критичные inline стили для первого экрана */
            
            /* Базовая типографика - критично для Hero */
            .hero-title {
                font-size: 2.25rem;
                font-weight: 600;
                line-height: 1.111;
                color: #1f2937;
                letter-spacing: 0;
            }
            
            @media (min-width: 768px) {
                .hero-title {
                    font-size: 3.625rem;
                }
            }
            
            /* Layout containers - критично для structure */
            .critical-container {
                width: 100%;
                max-width: 1660px;
                margin: 0 auto;
                padding: 0 1.5rem;
            }
            
            /* Grid для RestaurantCard - критично для LCP */
            .critical-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1.25rem 1.5rem;
                justify-content: center;
            }
            
            @media (min-width: 640px) {
                .critical-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (min-width: 1024px) {
                .critical-grid {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            
            @media (min-width: 1280px) {
                .critical-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }
            
            /* Базовые стили для изображений - критично для LCP */
            .critical-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 300ms ease-out;
            }
            
            /* Aspect ratio для карточек */
            .critical-aspect-ratio {
                aspect-ratio: 354 / 291;
                position: relative;
                overflow: hidden;
                border-radius: 1rem;
            }
            
            /* Hide flash of unstyled content */
            .loading-placeholder {
                background-color: #f3f4f6;
                animate: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: .5;
                }
            }
            
            /* Критические глобальные стили для предотвращения FOUC */
            body {
                width: 100%;
                margin: 0;
                padding: 0;
                font-family: var(--font-host-grotesk), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-display: swap;
            }
            
            /* Предотвращение CLS от font loading - используем Host Grotesk вместо Poppins */
            .font-poppins {
                font-family: var(--font-host-grotesk), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
                font-display: swap;
                font-size-adjust: 0.53;
            }
            
            /* Критические переменные */
            :root {
                --chip-bg: #f3f3f3;
                --chip-bg-hover: #515151;
                --footer-title: rgba(28, 29, 40, 0.4);
            }
            
            /* Дополнительная стабилизация для футера */
            footer {
                contain: layout style;
            }
            
            /* Стабилизация размеров текста */
            footer .font-poppins {
                line-height: 1.5;
                letter-spacing: 0;
            }
            
            /* Базовые стили для предотвращения скачков layout */
            * {
                box-sizing: border-box;
            }
            
            html {
                line-height: 1.5;
                -webkit-text-size-adjust: 100%;
                font-feature-settings: normal;
                font-variation-settings: normal;
                background-color: white;
            }
            
            /* Устранение черных областей на мобильных */
            @supports (padding: max(0px)) {
                body {
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }
            }
            
            /* Полное заполнение экрана для мобильных */
            body {
                min-height: 100vh;
                min-height: -webkit-fill-available;
                background-color: white;
            }
            
            html {
                height: -webkit-fill-available;
                background-color: white;
            }
        `}</style>
    );
}
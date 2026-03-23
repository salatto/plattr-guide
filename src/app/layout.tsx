import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import Script from "next/script";
import Providers from "./providers";
import HeaderPlattr from "@/components/HeaderPlattr";
import FooterPlattr from "@/components/FooterPlattr";
import { CSSOptimization } from "@/components/CSSOptimization";
import "./globals.css";

export const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-host-grotesk",
  fallback: ["system-ui", "Arial"],
  adjustFontFallback: true,
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Plattr",
  description: "Browse, Review, and Book with Plattr",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} antialiased h-full w-full`}>
      <head>
        {/* Критичные preconnect теги - ДОЛЖНЫ быть в самом начале */}
        <link rel="preconnect" href="https://image.plattr.one" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.plattr.one" />
        
        {/* Мобильные мета-теги для устранения черных областей */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Загружаем шрифт сразу как stylesheet для быстрой загрузки */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap" 
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-white">
        {/* Inline скрипт для самых критичных preconnect */}
        <Script
          id="critical-preconnect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Добавляем preconnect теги динамически для Lighthouse
              if (!document.querySelector('link[href="https://image.plattr.one"]')) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = 'https://image.plattr.one';
                document.head.insertBefore(link, document.head.firstChild);
              }
            `
          }}
        />
        
        <CSSOptimization />
        <Providers>
          <HeaderPlattr />
          <main className="flex-1">
            {children}
          </main>
          <FooterPlattr country="Germany" language="English" />
        </Providers>
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Оптимизация CSS отключена - требует дополнительных зависимостей
  // experimental: {
  //   optimizeCss: true,
  // },
  
  // Сжатие и оптимизация
  compress: true,
  poweredByHeader: false,
  
  // Оптимизация сборки
  swcMinify: true,
  
  // Оптимизация для производительности
  experimental: {
    optimizePackageImports: ['@/components', '@/lib', '@/features'],
  },
  
  // Security headers включая HSTS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.plattr.one",
        port: "",
        pathname: "/v1/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3002",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "148.251.136.18",
        port: "8002",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  }
};

export default nextConfig;

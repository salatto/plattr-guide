// app/not-found.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";

export default function NotFound() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-16">
            <h1 className="text-6xl font-bold text-[#2D6C2D] mb-6">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. This feature may be coming soon!
            </p>
            <p className="mt-4 text-md text-neutral-500">
                Redirecting to home page in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
            <Link
                href="/"
                className="mt-8 rounded-full bg-[#2D6C2D] px-8 py-3 text-white text-lg font-medium hover:bg-[#245A24] transition-colors"
            >
                Back to Home Now
            </Link>
        </div>
    );
}

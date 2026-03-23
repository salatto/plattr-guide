"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
    images: string[];
    fallbackImg?: string;
    rounded?: string; // например "rounded-2xl"
};

export default function Gallery({ images, fallbackImg, rounded = "rounded-2xl" }: Props) {
    // --- mobile scroll-snap
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);
    
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        
        let timeoutId: NodeJS.Timeout;
        const onScroll = () => {
            // Дебаунсинг для избежания частых вызовов
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // Используем requestAnimationFrame для оптимизации
                requestAnimationFrame(() => {
                    if (el.clientWidth > 0) {
                        setActive(Math.round(el.scrollLeft / el.clientWidth));
                    }
                });
            }, 16); // ~60fps
        };
        
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", onScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    const list = images?.length ? images.slice(0, 5) : (fallbackImg ? [fallbackImg] : []);
    if (!list.length) return null;

    const [first, ...rest] = list;
    return (
        <>
            {/* MOBILE: горизонтальная карусель по одному фото */}
            <div className="md:hidden">
                <div
                    ref={trackRef}
                    className={`flex overflow-x-auto snap-x snap-mandatory gap-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                >
                    {list.map((src, i) => (
                        <div key={i} className="w-full shrink-0 snap-start">
                            <div className={`relative aspect-[16/11] w-full overflow-hidden ${rounded}`}>
                                <Image 
                                    src={src} 
                                    alt="" 
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 350px, (max-width: 1024px) 400px, 450px"
                                    priority={i === 0}
                                    fetchPriority={i === 0 ? "high" : "auto"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {list.length > 1 && (
                    <div className="mt-2 flex justify-center gap-2">
                        {list.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-black opacity-90" : "bg-neutral-300 opacity-70"}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* DESKTOP: слева 1 большое, справа 4 маленьких (2×2) */}
            <div className="hidden md:flex gap-4">
                {/* Левый блок: ширина 60% */}
                <div className="basis-[60%]">
                    <div className={`relative overflow-hidden ${rounded} aspect-[3/2] group`}>
                        <Image
                            src={first}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                            sizes="(max-width: 768px) 350px, (max-width: 1200px) 600px, 800px"
                            priority
                            fetchPriority="high"
                        />
                    </div>
                </div>

                {/* Правый блок: ширина 40% и 2 ряда квадратов */}
                <div className="basis-[40%] ">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        {rest.map((src, i) => (
                            <div key={i} className={`relative overflow-hidden ${rounded} aspect-square group`}>
                                <Image
                                    src={src}
                                    alt=""
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                                    sizes="(max-width: 768px) 175px, (max-width: 1200px) 200px, 250px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

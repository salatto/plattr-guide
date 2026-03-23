// components/HeaderPlattr.tsx
"use client";

// import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import Container from "@ui/Layout/Container/Container";

export default function HeaderPlattr() {
    // const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // useEffect(() => {
    //     const onScroll = () => setScrolled(window.scrollY > 0);
    //     onScroll();
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, []);

    // Общие стили для хедера
    // const headerClass = `sticky top-0 z-40 w-full transition-colors ${scrolled ? "bg-white/95 backdrop-blur border-b border-neutral-200" : "bg-transparent"}`;
    const headerClass = `sticky mt-[24px] top-0 z-40 w-full transition-colors bg-white `;
    const innerDivClass = "h-[59px] flex items-center justify-between select-none";

    // Отдельный JSX для каждого варианта
    const homeHeader = (
        <header className={headerClass}>
            <div className={cn(innerDivClass, "px-[19px] md:px-[36px]")}>
                <Logo />
            </div>
        </header>
    );

    const otherHeader = (
        <header className={headerClass}>
            <Container className="container mx-auto  ">
                <div className={innerDivClass}>
                    <Logo />
                </div>
            </Container>
        </header>
    );

    return (
        <>
            {/* Верхний зазор (24px), схлопывается при скролле */}
            {/* <div className={`transition-all duration-300 ${scrolled ? "h-0" : "h-[24px]"}`} /> */}

            {/* Условный рендеринг в зависимости от страницы */}
            {isHomePage ? homeHeader : otherHeader}
        </>
    );
}
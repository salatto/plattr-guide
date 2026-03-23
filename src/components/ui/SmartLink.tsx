"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPage } from "@/lib/utils/links";
import { ReactNode } from "react";

interface SmartLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    renderAsSpanWhenActive?: boolean;
}

/**
 * Умная ссылка, которая автоматически предотвращает циклические ссылки
 * Если href указывает на текущую страницу, рендерит span вместо ссылки
 */
export default function SmartLink({
    href,
    children,
    className = "",
    activeClassName = "",
    inactiveClassName = "",
    renderAsSpanWhenActive = true,
}: SmartLinkProps) {
    const pathname = usePathname();
    const isCurrent = isCurrentPage(pathname, href);

    // Определяем итоговый className
    const finalClassName = `${className} ${isCurrent ? activeClassName : inactiveClassName}`.trim();

    // Если это текущая страница и нужно рендерить как span
    if (isCurrent && renderAsSpanWhenActive) {
        return (
            <span className={finalClassName}>
                {children}
            </span>
        );
    }

    // Обычная ссылка
    return (
        <Link href={href} className={finalClassName}>
            {children}
        </Link>
    );
}
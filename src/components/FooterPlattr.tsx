// components/FooterPlattr.tsx
"use client";

import Link from "next/link";
import Logo from "@/components/Logo"; // тот же, что в header
import Container from "@ui/Layout/Container/Container";

type Props = {
    country?: "Germany" | "Other";
    language?: "English" | "Deutsch";
};

export default function FooterPlattr({
    country = "Germany",
    language = "English",
}: Props) {
    const about = [
        { label: "Plattr Universe", href: "/universe" },
        { label: "For investors", href: "/investors" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Become a Partner", href: "/partner" },
        { label: "Partner Support", href: "/support" },
    ];

    const legal = [
        { label: "Imprint", href: "/imprint" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
        { label: "Terms and Conditions", href: "/terms" },
    ];

    const social = [
        { label: "Instagram", href: "/instagram" },
        { label: "Facebook", href: "/facebook" },
        { label: "LinkedIn", href: "/linkedin" },
    ];

    return (
        <footer className="w-full" style={{contain: 'layout style'}}>
            <Container size="wide" className="pt-[64px] pb-[24px]">
            {/* <div className="px-[24px] sm:px-[40px] lg:px-[92px] pt-[64px] pb-[24px] "> */}
                {/* верхняя зона с колонками */}
                {/* <div className="relative mx-auto max-w-full md:max-w-[1444px]"> */}
                <div className="relative container mx-auto">
                    {/* тонкая линия на высоте 64px от начала футера */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 translate-y-[-64px] h-px bg-neutral-200"
                    />
                    {/* <div className="grid grid-cols-1 gap-y-6 md:grid-cols-[repeat(4,220px)] md:gap-x-[188px]"> */}
                    {/* <div className="grid grid-cols-1 gap-y-[52px] sm:grid-cols-2 sm:gap-x-[24px] sm:gap-y-[24px] md:[grid-template-columns:repeat(4,220px)] md:gap-x-[188px]"> */}
                    <div className="grid gap-y-[52px] gap-x-[24px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-start min-h-[300px]"
                    >
                        {/* Секция с логотипом */}
                        {/* ABOUT */}
                        <Section title="ABOUT">
                            <ul className="space-y-[17px]">
                                {about.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="inline-block min-h-[24px] whitespace-nowrap font-poppins text-[16px] leading-[24px] text-[#1C1D28]/80 hover:text-[#1C1D28] transition-colors"
                                            prefetch={false}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        {/* COUNTRY / LANGUAGE */}
                        <div className="space-y-[20px]">
                            <Section title="COUNTRY">
                                <ul className="space-y-[17px] m-0 p-0 list-none">
                                    <li>
                                        <span
                                            className={`inline-block min-h-[20px] text-[14px] leading-[1.3] ${country === "Germany" ? "font-semibold" : ""
                                                }`}
                                        >
                                            Germany
                                        </span>
                                    </li>
                                </ul>
                            </Section>

                            <Section title="LANGUAGE">
                                <ul className="space-y-[17px] m-0 p-0 list-none">
                                    <li>
                                        <button
                                            type="button"
                                            className={`inline-block min-h-[24px] whitespace-nowrap font-poppins text-[16px] leading-[24px] text-[#1C1D28]/80 hover:text-[#1C1D28] transition-colors ${language === "Deutsch" ? "font-semibold" : ""
                                                }`}
                                            aria-current={language === "Deutsch" ? "true" : "false"}
                                        >
                                            Deutsch
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className={`inline-block min-h-[20px] whitespace-nowrap text-[14px] leading-[1.3] text-[#1C1D28]/80 hover:text-[#1C1D28] hover:underline transition-colors ${language === "English" ? "font-semibold" : ""
                                                }`}
                                            aria-current={language === "English" ? "true" : "false"}
                                        >
                                            English
                                        </button>
                                    </li>
                                </ul>
                            </Section>
                        </div>

                        {/* LEGAL */}
                        <Section title="LEGAL">
                            <ul className="space-y-[17px]">
                                {legal.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="inline-block min-h-[24px] whitespace-nowrap font-poppins text-[16px] leading-[24px] text-[#1C1D28]/80 hover:text-[#1C1D28] transition-colors"
                                            prefetch={false}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        {/* SOCIAL (внешние ссылки → nofollow) */}
                        <Section title="SOCIAL">
                            <ul className="space-y-[17px]">
                                {social.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="inline-block min-h-[24px] whitespace-nowrap font-poppins text-[16px] leading-[24px] text-[#1C1D28]/80 hover:text-[#1C1D28] transition-colors"
                                            prefetch={false}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    </div>

                    {/* нижняя зона: бренд по центру */}
                    <div className="mt-[52px] flex items-center justify-center">
                        <div className="inline-flex items-center gap-2">
                            <Logo />
                        </div>
                    </div>
                </div>
            {/* </div> */}
            </Container>
        </footer>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <h3
                className="
                    font-medium
                    text-[12px]
                    leading-[14.4px]
                    tracking-[1.2px]
                    text-[var(--footer-title)]
                    font-sans
                    mb-[10px]
            ">
                {title}
            </h3>
            {children}
        </section>
    );
}

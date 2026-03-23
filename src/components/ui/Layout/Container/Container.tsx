import { cn } from "@/lib/cn";

type Props = {
    children: React.ReactNode;
    className?: string;
    size?: "narrow" | "wide"; // narrow = Footer, wide = Header/Main
};

export default function Container({ children, className = "", size = "wide" }: Props) {
    const base = "mx-auto w-full";
    const variants = {
        wide: "max-w-[1600px] px-[16px] sm:px-[24px] lg:px-[40px]", // почти во всю ширину
        narrow: "max-w-[1444px] px-[24px] sm:px-[40px] lg:px-[92px]", // с жирными отступами
    };

    return <div className={cn(base, variants[size], className)}>{children}</div>;
}

import { cn } from "@/lib/cn";

export const Section: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <section className={cn("", className)}>
            {/* <div className="mx-auto px-5 py-6 md:p-8 bg-[#FAFAFA] rounded-[23px]">
                {children}
            </div> */}
            {children}
        </section>
    );
};

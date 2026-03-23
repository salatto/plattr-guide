import { cn } from "@/lib/cn";

export const Section: React.FC<React.PropsWithChildren<{ className?: string; id?: string }>> = ({ children, className, id }) => {
    return (
        <section id={id} className={cn("", className)}>
            {/* <div className="mx-auto px-5 py-6 md:p-8 bg-[#FAFAFA] rounded-[23px]">
                {children}
            </div> */}
            {children}
        </section>
    );
};

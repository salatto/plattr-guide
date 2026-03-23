import { ChevronRightIcon } from "@/components/ui/icons/ChevronRight";
import { createSmartBreadcrumbs } from "@/lib/utils/links";
import SmartLink from "@/components/ui/SmartLink";

interface BreadcrumbsProps {
    items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Создаем умные breadcrumbs где последний элемент не ссылка
    const smartItems = createSmartBreadcrumbs(items);

    return (
        <nav className="mb-5 text-sm text-neutral-500" aria-label="Breadcrumbs">
            <ol className="flex items-center text-[14px] leading-[14px]">
                {smartItems.map((item, index) => {
                    const isLast = index === smartItems.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {!isLast ? (
                                <>
                                    {item.href ? (
                                        <SmartLink 
                                            href={item.href} 
                                            className="text-[#828282] hover:text-[#666666] transition-colors"
                                            renderAsSpanWhenActive={true}
                                        >
                                            {item.label}
                                        </SmartLink>
                                    ) : (
                                        <span className="text-[#828282]">{item.label}</span>
                                    )}
                                    <span className="mx-[14px] inline-flex">
                                        <ChevronRightIcon className="text-[#828282]" />
                                    </span>
                                </>
                            ) : (
                                // Последний элемент всегда span
                                <span className="text-[#828282] font-medium">{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

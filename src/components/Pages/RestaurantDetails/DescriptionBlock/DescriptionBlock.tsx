"use client";

import { useState } from "react";

type Props = {
    description?: string | null;
};

export default function DescriptionBlock({ description }: Props) {
    const [expanded, setExpanded] = useState(false);

    if (!description) return null;

    const isLong = description.length > 280;
    const displayText = isLong && !expanded
        ? description.slice(0, 280).replace(/\s+\S*$/, "") + "..."
        : description;

    return (
        <div className="grid gap-4">
            <div>
                <h2 className="text-[24px] font-semibold leading-[120%] text-neutral-900">
                    Description
                </h2>
                <p className="mt-2 text-base leading-6 text-[#6B7280]">
                    What makes this place worth visiting
                </p>
            </div>

            <p className="text-[16px] leading-[1.7] text-[#1C1D28]/80 whitespace-pre-line">
                {displayText}
            </p>

            {isLong && (
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="self-start text-[15px] font-medium text-[#4CA154] hover:text-[#3a8a44] transition-colors"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}

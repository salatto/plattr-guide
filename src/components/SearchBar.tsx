"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
    return (
        <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

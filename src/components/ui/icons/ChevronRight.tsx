import { SVGProps } from "react";

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 11 11"
            fill="none"
            {...props}
        >
            <path
                d="M5.0459 3.21875L7.25127 5.42412C7.41399 5.58684 7.41399 5.85066 7.25127 6.01338L5.0459 8.21875"
                stroke="#828282"
                strokeLinecap="round"
            />
        </svg>
    );
}

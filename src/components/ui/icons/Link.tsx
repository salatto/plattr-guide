import { SVGProps } from "react";

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            >
            <path d="M4.22251 9.7192L2.80829 11.1334C1.24619 12.6955 1.24619 15.2282 2.80829 16.7903C4.37039 18.3524 6.90305 18.3524 8.46515 16.7903L9.87936 15.3761M9.87936 4.06235L11.2936 2.64814C12.8557 1.08604 15.3883 1.08604 16.9504 2.64814C18.5125 4.21023 18.5125 6.74289 16.9504 8.30499L15.5362 9.7192M7.05113 12.5478L12.708 6.89096"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round" />
        </svg>
    );
}

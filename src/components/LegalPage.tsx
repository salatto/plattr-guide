import Container from "@/components/ui/Layout/Container/Container";

type Props = {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
};

export default function LegalPage({ title, lastUpdated, children }: Props) {
    return (
        <Container size="wide" className="py-16 sm:py-20">
            <div className="mx-auto max-w-[720px]">
                <header className="mb-12">
                    <h1 className="font-semibold text-[32px] sm:text-[40px] leading-tight text-[#1C1D28] tracking-[-0.02em]">
                        {title}
                    </h1>
                    <p className="mt-3 text-[14px] text-[#1C1D28]/40">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                <div className="legal-content space-y-8 text-[16px] leading-[1.7] text-[#1C1D28]/80 [&_h2]:text-[#1C1D28] [&_h2]:font-semibold [&_h2]:text-[20px] [&_h2]:sm:text-[22px] [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[#1C1D28] [&_h3]:font-medium [&_h3]:text-[17px] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-[#4A7C59] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#3a6347]">
                    {children}
                </div>
            </div>
        </Container>
    );
}

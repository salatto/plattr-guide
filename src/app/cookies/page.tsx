import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Cookie Policy | Plattr",
    description: "How Plattr uses cookies and similar technologies",
};

export default function CookiesPage() {
    return (
        <LegalPage title="Cookie Policy" lastUpdated="March 2026">
            <h2>What are cookies?</h2>
            <p>
                Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience. Some cookies are necessary for the website to function properly, while others help us understand how visitors use the site.
            </p>

            <h2>How we use cookies</h2>
            <p>
                Plattr uses a minimal number of cookies. We believe in respecting your privacy and only use cookies that are necessary for the functioning of our service.
            </p>

            <h3>Strictly necessary cookies</h3>
            <p>
                These cookies are required for the website to operate and cannot be switched off. They are usually set in response to actions you take, such as setting your language preference or logging in.
            </p>

            <table className="w-full text-[14px] border-collapse mt-4 mb-6">
                <thead>
                    <tr className="border-b border-[#1C1D28]/10">
                        <th className="text-left py-3 pr-4 font-medium text-[#1C1D28]">Cookie</th>
                        <th className="text-left py-3 pr-4 font-medium text-[#1C1D28]">Purpose</th>
                        <th className="text-left py-3 font-medium text-[#1C1D28]">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-[#1C1D28]/5">
                        <td className="py-3 pr-4 font-mono text-[13px]">cookie_consent</td>
                        <td className="py-3 pr-4">Stores your cookie consent preferences</td>
                        <td className="py-3">1 year</td>
                    </tr>
                    <tr className="border-b border-[#1C1D28]/5">
                        <td className="py-3 pr-4 font-mono text-[13px]">locale</td>
                        <td className="py-3 pr-4">Remembers your language preference</td>
                        <td className="py-3">1 year</td>
                    </tr>
                </tbody>
            </table>

            <h3>Analytics cookies</h3>
            <p>
                We currently do not use analytics cookies. If we introduce analytics in the future, we will update this policy and request your consent before setting any analytics cookies.
            </p>

            <h3>Marketing cookies</h3>
            <p>
                We do not use marketing or advertising cookies. We do not track you across other websites, and we do not sell your data to advertisers.
            </p>

            <h2>Third-party cookies</h2>
            <p>
                Some features of our website may set cookies from third-party services:
            </p>
            <ul>
                <li>
                    Google Fonts may set cookies when loading web fonts. See{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        Google&apos;s privacy policy
                    </a>{" "}
                    for details.
                </li>
            </ul>

            <h2>Managing cookies</h2>
            <p>
                You can control and delete cookies through your browser settings. Here are instructions for common browsers:
            </p>
            <ul>
                <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                        Google Chrome
                    </a>
                </li>
                <li>
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">
                        Mozilla Firefox
                    </a>
                </li>
                <li>
                    <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                        Safari
                    </a>
                </li>
                <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                        Microsoft Edge
                    </a>
                </li>
            </ul>
            <p>
                Disabling cookies may affect some functionality of the website.
            </p>

            <h2>Changes to this policy</h2>
            <p>
                We may update this cookie policy as our service evolves. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2>Contact</h2>
            <p>
                If you have questions about our use of cookies, contact us at{" "}
                <a href="mailto:privacy@plattr.de">privacy@plattr.de</a>.
            </p>
        </LegalPage>
    );
}

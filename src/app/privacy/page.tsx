import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Privacy Policy | Plattr",
    description: "How Plattr collects, uses, and protects your personal data",
};

export default function PrivacyPage() {
    return (
        <LegalPage title="Privacy Policy" lastUpdated="March 2026">
            <h2>1. Overview</h2>
            <p>
                This privacy policy explains how Plattr GmbH (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and protects personal data when you use plattr.de and related services. We take the protection of your personal data seriously and treat it confidentially in accordance with the statutory data protection regulations and this privacy policy.
            </p>

            <h2>2. Controller</h2>
            <p>
                Plattr GmbH<br />
                Friedrichstraße 123<br />
                10117 Berlin, Germany<br />
                Email: privacy@plattr.de
            </p>

            <h2>3. Data we collect</h2>

            <h3>3.1 Server log files</h3>
            <p>
                When you visit our website, our hosting provider automatically collects and stores information in server log files that your browser transmits:
            </p>
            <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referrer URL</li>
                <li>Hostname of the accessing computer</li>
                <li>Time of the server request</li>
                <li>IP address (anonymised)</li>
            </ul>
            <p>
                This data cannot be assigned to specific persons. This data is not merged with other data sources. We reserve the right to check this data retrospectively if we become aware of specific indications of illegal use.
            </p>

            <h3>3.2 Contact forms</h3>
            <p>
                If you contact us via a form on our website, the data you provide (name, email address, message content) will be stored for the purpose of processing your enquiry. We will not share this data without your consent.
            </p>

            <h3>3.3 Analytics</h3>
            <p>
                We use privacy-friendly analytics to understand how visitors interact with our website. We do not use cookies for analytics purposes and do not track individual users across sessions.
            </p>

            <h2>4. Legal basis for processing</h2>
            <p>We process personal data based on the following legal grounds:</p>
            <ul>
                <li>Art. 6(1)(a) GDPR: consent given by the data subject</li>
                <li>Art. 6(1)(b) GDPR: performance of a contract or pre-contractual measures</li>
                <li>Art. 6(1)(f) GDPR: our legitimate interests (e.g. security, service improvement)</li>
            </ul>

            <h2>5. Data retention</h2>
            <p>
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Server log files are automatically deleted after 14 days. Contact form data is retained for the duration of the enquiry and deleted once the enquiry has been resolved, unless longer retention is legally required.
            </p>

            <h2>6. Your rights</h2>
            <p>Under the GDPR, you have the following rights:</p>
            <ul>
                <li>Right to access your personal data (Art. 15 GDPR)</li>
                <li>Right to rectification of inaccurate data (Art. 16 GDPR)</li>
                <li>Right to erasure of your data (Art. 17 GDPR)</li>
                <li>Right to restriction of processing (Art. 18 GDPR)</li>
                <li>Right to data portability (Art. 20 GDPR)</li>
                <li>Right to object to processing (Art. 21 GDPR)</li>
            </ul>
            <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:privacy@plattr.de">privacy@plattr.de</a>.
            </p>

            <h2>7. Third-party services</h2>

            <h3>7.1 Hosting</h3>
            <p>
                Our website is hosted by Vercel Inc. (USA). Vercel processes data on our behalf in accordance with Art. 28 GDPR. Data transfers to the USA are covered by the EU-US Data Privacy Framework.
            </p>

            <h3>7.2 Database</h3>
            <p>
                We use Supabase (USA) for database services. Supabase processes data in the EU region (Frankfurt) on our behalf. The processing is governed by a data processing agreement pursuant to Art. 28 GDPR.
            </p>

            <h3>7.3 Fonts</h3>
            <p>
                We use Google Fonts for consistent typography. When you visit our pages, your browser loads the required fonts from Google servers. This may transmit your IP address to Google. For more information, see{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google&apos;s privacy policy
                </a>.
            </p>

            <h2>8. Data security</h2>
            <p>
                We use industry-standard SSL/TLS encryption for all data transmission. Our systems are protected by HSTS, secure HTTP headers, and regular security audits. Access to personal data is restricted to authorised personnel only.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
                We may update this privacy policy from time to time. The latest version will always be available on this page with the date of the last update.
            </p>

            <h2>10. Supervisory authority</h2>
            <p>
                If you believe that the processing of your personal data violates data protection law, you have the right to lodge a complaint with a supervisory authority. The competent authority for Berlin is:
            </p>
            <p>
                Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
                Friedrichstraße 219<br />
                10969 Berlin<br />
                <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer">
                    www.datenschutz-berlin.de
                </a>
            </p>
        </LegalPage>
    );
}

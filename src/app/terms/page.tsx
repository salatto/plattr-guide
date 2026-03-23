import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Terms and Conditions | Plattr",
    description: "Terms and conditions governing the use of Plattr services",
};

export default function TermsPage() {
    return (
        <LegalPage title="Terms and Conditions" lastUpdated="March 2026">
            <h2>1. Scope</h2>
            <p>
                These Terms and Conditions govern your use of plattr.de and all related services operated by Plattr GmbH, Friedrichstraße 123, 10117 Berlin, Germany (&quot;Plattr&quot;, &quot;we&quot;, &quot;us&quot;). By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use our services.
            </p>

            <h2>2. Description of services</h2>
            <p>
                Plattr operates a restaurant guide platform that allows users to discover, browse, and learn about restaurants. The information provided on our platform, including restaurant details, opening hours, and descriptions, is offered for informational purposes. We strive to keep this information accurate and up to date but cannot guarantee its completeness or accuracy at all times.
            </p>

            <h2>3. User obligations</h2>
            <p>When using our services, you agree to:</p>
            <ul>
                <li>Use the platform only for lawful purposes</li>
                <li>Not attempt to gain unauthorised access to our systems or data</li>
                <li>Not use automated tools to scrape, crawl, or extract data from our website without prior written permission</li>
                <li>Not submit false, misleading, or defamatory content</li>
                <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>4. Intellectual property</h2>
            <p>
                All content on plattr.de, including text, graphics, logos, icons, images, and software, is the property of Plattr GmbH or its content suppliers and is protected by German and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
            </p>
            <p>
                The Plattr name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Plattr GmbH. You may not use such marks without our prior written permission.
            </p>

            <h2>5. Restaurant listings</h2>
            <p>
                Restaurant information displayed on Plattr is compiled from public sources, direct partnerships, and user contributions. We do not guarantee the accuracy, completeness, or timeliness of any listing. Opening hours, menu items, prices, and other details may change without notice.
            </p>
            <p>
                If you are a restaurant owner and wish to update or remove your listing, contact us at{" "}
                <a href="mailto:contact@plattr.de">contact@plattr.de</a>.
            </p>

            <h2>6. Third-party links</h2>
            <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by Plattr. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. You acknowledge and agree that Plattr shall not be responsible or liable for any damage or loss caused by the use of any such content or services.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
                To the fullest extent permitted by applicable law, Plattr GmbH and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from:
            </p>
            <ul>
                <li>Your use of or inability to use the service</li>
                <li>Any errors or inaccuracies in the content</li>
                <li>Unauthorised access to or alteration of your data</li>
                <li>Any third-party conduct on the service</li>
            </ul>
            <p>
                This limitation applies regardless of the legal theory on which the claim is based, even if Plattr has been advised of the possibility of such damages.
            </p>

            <h2>8. Indemnification</h2>
            <p>
                You agree to defend, indemnify, and hold harmless Plattr GmbH from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the service or your violation of these terms.
            </p>

            <h2>9. Modifications</h2>
            <p>
                We reserve the right to modify or replace these terms at any time. Material changes will be communicated through a notice on our website at least 30 days before they take effect. Your continued use of the service after any changes constitutes acceptance of the new terms.
            </p>

            <h2>10. Governing law</h2>
            <p>
                These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Germany, without regard to its conflict of law provisions. The courts of Berlin, Germany, shall have exclusive jurisdiction over any disputes arising from these terms.
            </p>

            <h2>11. Severability</h2>
            <p>
                If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>

            <h2>12. Contact</h2>
            <p>
                For questions about these terms, contact us at:
            </p>
            <p>
                Plattr GmbH<br />
                Friedrichstraße 123<br />
                10117 Berlin, Germany<br />
                Email: <a href="mailto:contact@plattr.de">contact@plattr.de</a>
            </p>
        </LegalPage>
    );
}

import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Imprint | Plattr",
    description: "Legal notice and company information for Plattr GmbH",
};

export default function ImprintPage() {
    return (
        <LegalPage title="Imprint" lastUpdated="March 2026">
            <h2>Information pursuant to Sect. 5 German Telemedia Act (TMG)</h2>
            <p>
                Plattr GmbH<br />
                Friedrichstraße 123<br />
                10117 Berlin<br />
                Germany
            </p>

            <h3>Represented by</h3>
            <p>Managing Director: Vladislav Shytov</p>

            <h3>Contact</h3>
            <p>
                Phone: +49 (0) 30 1234 5678<br />
                Email: contact@plattr.de
            </p>

            <h3>Commercial register</h3>
            <p>
                Registered at: Amtsgericht Charlottenburg, Berlin<br />
                Registration number: HRB XXXXXX
            </p>

            <h3>VAT identification number</h3>
            <p>
                VAT ID pursuant to Sect. 27a of the German Value Added Tax Act:<br />
                DE XXXXXXXXX
            </p>

            <h2>Responsibility for content</h2>
            <p>
                Responsible for the content pursuant to Sect. 18 para. 2 MStV:
            </p>
            <p>
                Vladislav Shytov<br />
                Friedrichstraße 123<br />
                10117 Berlin
            </p>

            <h2>Dispute resolution</h2>
            <p>
                The European Commission provides a platform for online dispute resolution (ODR):{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                    https://ec.europa.eu/consumers/odr/
                </a>
            </p>
            <p>
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
            </p>

            <h2>Liability for content</h2>
            <p>
                As a service provider, we are responsible for our own content on these pages in accordance with general law pursuant to Sect. 7 para. 1 TMG. Pursuant to Sect. 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
            </p>
            <p>
                Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point in time at which a concrete infringement of the law becomes known. If we become aware of any such infringements, we will remove the relevant content immediately.
            </p>

            <h2>Liability for links</h2>
            <p>
                Our website contains links to external websites of third parties over whose content we have no influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognisable at the time of linking.
            </p>
            <p>
                Permanent monitoring of the content of linked pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any infringements, we will remove such links immediately.
            </p>

            <h2>Copyright</h2>
            <p>
                The content and works on these pages created by the site operators are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use.
            </p>
            <p>
                Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
            </p>
        </LegalPage>
    );
}

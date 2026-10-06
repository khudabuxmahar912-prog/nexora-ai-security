import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | NEXORA AI SECURITY",
  description: "Terms for using the NEXORA AI SECURITY website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="6 October 2026"
      sections={[
        {
          heading: "Using this website",
          body: [
            "This website provides general information about NEXORA AI SECURITY and its services. By using it you agree to use it lawfully.",
          ],
        },
        {
          heading: "Services",
          body: [
            "Descriptions on this site are informational. Actual work is defined in a written agreement that covers scope, timeline and fees before it begins.",
            "Features marked Coming Soon are not yet available.",
          ],
        },
        {
          heading: "Security testing",
          body: [
            "We only perform security testing on systems for which we have written authorization from the owner. We do not perform unauthorized testing.",
          ],
        },
        {
          heading: "No warranty",
          body: [
            "Information on this website is provided as is. We aim to keep it accurate but make no guarantees, and we may change it at any time.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about these terms can be sent through our Contact page."],
        },
      ]}
    />
  );
}
import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security | NEXORA AI SECURITY",
  description: "How NEXORA AI SECURITY approaches security and responsible disclosure.",
  alternates:{ canonical: "/security"},
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      updated="6 October 2026"
      sections={[
        {
          heading: "Our approach",
          body: [
            "We build and test software with security in mind: secrets stay on the server, access is controlled, input is validated, and important actions are reviewed by a human.",
            "We do not claim security certifications we do not hold.",
          ],
        },
        {
          heading: "Authorized testing only",
          body: [
            "Our security work is authorized, controlled, ethical and documented.",
          ],
        },
        {
          heading: "Reporting a vulnerability",
          body: [
            `If you find a security problem on this website, please report it to ${site.email}. Please give us reasonable time to fix it and do not access or change data that is not yours.`,
          ],
        },
      ]}
    />
  );
}
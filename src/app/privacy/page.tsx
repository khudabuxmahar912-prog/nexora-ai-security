import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | NEXORA AI SECURITY",
  description: "How NEXORA AI SECURITY handles information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="6 October 2026"
      sections={[
        {
          heading: "Overview",
          body: [
            "NEXORA AI SECURITY respects your privacy. This page explains what information we handle and why.",
          ],
        },
        {
          heading: "Information we receive",
          body: [
            `We receive the information you choose to send us, for example when you contact us by email (${site.email}), phone or WhatsApp. We use it only to reply to you and to discuss possible work.`,
            "This website does not currently have user accounts or online forms. When we add them, such as internship applications or a contact form, we will update this page to explain what is collected.",
          ],
        },
        {
          heading: "Analytics and cookies",
          body: [
            "This website does not currently use advertising cookies. If we add analytics or advertising later, we will update this page first.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We do not sell your personal information. We share information only when needed to provide a service you requested or when the law requires it.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us to access, correct or delete the information you have sent us by writing to ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
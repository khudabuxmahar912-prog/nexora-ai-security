import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | NEXORA AI SECURITY",
  description:
    "Talk to NEXORA AI SECURITY about AI security, AI agents, automation and software development.",
};

const cardClass = "rounded-xl border border-border bg-surface p-6";
const linkClass = "mt-2 inline-block text-accent hover:underline";

export default function ContactPage() {
  const whatsapp = `https://wa.me/${site.phone.replace(/\D/g, "")}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        Contact
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Talk to NEXORA
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Tell us what you are building and we will tell you honestly how we can
        help.
      </p>

      <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className={cardClass}>
          <h2 className="font-display font-bold">Email</h2>
          <a href={`mailto:${site.email}`} className={linkClass}>
            {site.email}
          </a>
        </div>

        <div className={cardClass}>
          <h2 className="font-display font-bold">Phone</h2>
          <a href={`tel:${site.phone}`} className={linkClass}>
            {site.phone}
          </a>
        </div>

        <div className={cardClass}>
          <h2 className="font-display font-bold">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">{site.phone}</p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Message us on WhatsApp ↗
          </a>
        </div>

        <div className={cardClass}>
          <h2 className="font-display font-bold">GitHub</h2>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            View our work ↗
          </a>
        </div>
      </div>

      <div className={`mt-4 max-w-4xl ${cardClass}`}>
        <h2 className="font-display font-bold">Contact form</h2>
        <p className="mt-2 text-sm text-muted">
          The online contact form is Coming Soon. It arrives with our backend
          in the next phase. Until then, use the email, phone or WhatsApp
          above.
        </p>
      </div>
    </div>
  );
}
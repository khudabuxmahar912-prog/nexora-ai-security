import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About | NEXORA AI SECURITY",
  description:
    "NEXORA AI SECURITY is a remote-first technology company focused on AI, cybersecurity, software engineering, automation, research and talent development.",
};

const focus = [
  "AI",
  "Cybersecurity",
  "Software Engineering",
  "Automation",
  "Research",
  "Talent Development",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        About
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        A remote-first AI technology and security company.
      </h1>

      <section className="py-8">
        <h2 className="font-display text-2xl font-bold">Our story</h2>
        <p className="mt-3 max-w-3xl text-muted">
          NEXORA AI SECURITY is being built as a remote-first company. It begins
          lean and technology-driven, led by its Founder and supported by AI
          systems, and it is designed to grow with specialized human teams as
          the work grows.
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-display text-2xl font-bold">What we focus on</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {focus.map((f) => (
            <li
              key={f}
              className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold"
            >
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-8">
        <h2 className="font-display text-2xl font-bold">Mission</h2>
        <p className="mt-3 max-w-3xl text-muted">
          To help businesses safely adopt and build intelligent technology by
          building useful AI-powered software, automating repetitive work,
          securing AI systems and developing future technology talent.
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-display text-2xl font-bold">How we grow</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Founder leadership, AI automation and human talent, with people
          reviewing and approving the important decisions. We say what we have
          built and what is still coming.
        </p>
      </section>

      <div className="mt-10">
        <ButtonLink href="/contact">Talk to NEXORA</ButtonLink>
      </div>
    </div>
  );
}
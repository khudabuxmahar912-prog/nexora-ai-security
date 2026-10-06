import ButtonLink from "@/components/ui/ButtonLink";
import Link from "next/link";

const divisions = [
  {
    number: "01",
    title: "AI Security",
    text: "Authorized, documented security testing for AI-powered systems, including LLM applications, AI agents, prompt injection and data leakage.",
    href: "/ai-security",
  },
  {
    number: "02",
    title: "AI & Software",
    text: "AI agents, automation, RAG applications, chatbots, APIs and full-stack SaaS products built around real business workflows.",
    href: "/ai-software",
  },
  {
    number: "03",
    title: "Talent & Internships",
    text: "Remote, project-based internships with mentorship and evaluation across AI/ML, cybersecurity and full-stack development.",
    href: "/internships",
  },
];

const process = [
  "Discover",
  "Design",
  "Build",
  "Test",
  "Secure",
  "Deploy",
  "Maintain",
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
          AI · Software · Automation · Cybersecurity
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-7xl">
          Build. Secure. <span className="text-accent">Automate.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          NEXORA AI SECURITY builds intelligent software, automates business
          operations, and helps organizations identify and reduce security
          risks across AI-powered systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Talk to NEXORA</ButtonLink>
          <ButtonLink href="#divisions" variant="secondary">
            Explore Services
          </ButtonLink>
          <ButtonLink href="/internships" variant="ghost">
            Join Our Internship Program →
          </ButtonLink>
        </div>
      </section>

      <section
        id="divisions"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16"
      >
        <h2 className="font-display text-3xl font-bold">What we do</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Three divisions, one goal: help businesses safely adopt and build
          intelligent technology.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {divisions.map((d) => (
            <Link
              key={d.number}
              href={d.href}
              className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
            >
              <p className="text-sm font-semibold text-accent-2">
                DIVISION {d.number}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold">{d.title}</h3>
              <p className="mt-3 text-sm text-muted">{d.text}</p>
              <p className="mt-4 text-sm font-semibold text-accent group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold">How we work</h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {process.map((step, i) => (
            <li
              key={step}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <span className="text-xs text-muted">0{i + 1}</span>
              <p className="mt-1 font-display font-bold">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold">
            Security testing is authorized, controlled and documented.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every engagement is ethical and agreed in advance. Tell us what you
            are building and we will tell you honestly how we can help.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact">Talk to NEXORA</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
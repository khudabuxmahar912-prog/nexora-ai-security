import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import { INTERNSHIP_TRACKS } from "@/lib/internships";

export const metadata: Metadata = {
  title: "Internships | NEXORA AI SECURITY",
  description:
    "Remote, project-based internships in full-stack development, agentic AI, generative AI, Python, JavaScript, QA and more.",
  alternates: { canonical: "/internships" },
};

const structure = [
  "Learning: guided study of the fundamentals for your internship.",
  "Practical projects: real tasks on real software.",
  "Mentorship: regular feedback from a mentor.",
  "Evaluation: submitted work is reviewed and assessed.",
  "Professional development: working habits, communication and portfolio building.",
];

const steps = [
  "Submit your application with your skills, projects and links.",
  "Your application is reviewed.",
  "After you apply, you are invited to the internship WhatsApp group.",
  "Selected applicants are assigned an internship track and a mentor.",
];

const faqs = [
  {
    q: "Is the internship remote?",
    a: "Yes. The program is remote-first and project-based.",
  },
  {
    q: "Which internships are available?",
    a: "See the list above. You choose one when you apply.",
  },
  {
    q: "How are interns evaluated?",
    a: "Through assigned tasks, submitted work and written feedback from mentors.",
  },
  {
    q: "How do I apply?",
    a: "Use the Apply for an Internship button on this page and fill in the form. A PDF CV is optional.",
  },
];

export default function InternshipsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        Division 03 · Talent &amp; Internships
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        NEXORA AI SECURITY Internships
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Build real skills through practical technology projects, structured
        mentorship and remote project-based experience.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ButtonLink href="/internships/apply">Apply for an Internship</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Ask a question
        </ButtonLink>
      </div>

      <section className="py-12">
        <h2 className="font-display text-2xl font-bold">Available internships</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTERNSHIP_TRACKS.map((t) => (
            <li
              key={t}
              className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-4">
        <h2 className="font-display text-2xl font-bold">Program structure</h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
          {structure.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="py-12">
        <h2 className="font-display text-2xl font-bold">Application process</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-muted">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="py-4">
        <h2 className="font-display text-2xl font-bold">FAQs</h2>
        <div className="mt-4 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
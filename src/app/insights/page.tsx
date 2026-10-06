import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | NEXORA AI SECURITY",
  description:
    "Articles on AI security, AI agents, automation and software engineering from NEXORA AI SECURITY.",
};

const topics = [
  "AI security and LLM risks",
  "Prompt injection explained",
  "Building safe AI agents",
  "RAG applications in practice",
  "AI automation for small businesses",
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        Insights
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Insights
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Our first articles are Coming Soon.
      </p>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">
          Topics we plan to cover
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t}
              className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
type Section = { heading: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
      {sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="font-display text-xl font-bold">{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p} className="mt-3 text-muted">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
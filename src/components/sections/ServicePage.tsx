import ButtonLink from "@/components/ui/ButtonLink";

export type Capability = { title: string; text: string; soon?: boolean };

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  problem: string;
  solution: string;
  how: string[];
  capabilities: Capability[];
  security: string[];
  technology: string[];
  deliverables: string[];
};

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-3 max-w-3xl text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default function ServicePage(p: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        {p.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        {p.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{p.intro}</p>

      <Block title="The problem">
        <p>{p.problem}</p>
      </Block>
      <Block title="Our solution">
        <p>{p.solution}</p>
      </Block>
      <Block title="How it works">
        <ol className="list-decimal space-y-2 pl-5">
          {p.how.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Block>

      <section className="py-8">
        <h2 className="font-display text-2xl font-bold">Key capabilities</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {p.capabilities.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-display font-bold">
                {c.title}
                {c.soon && (
                  <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs font-normal text-accent-2">
                    Coming Soon
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Block title="Security considerations">
        <List items={p.security} />
      </Block>
      <Block title="Technology approach">
        <List items={p.technology} />
      </Block>
      <Block title="Expected deliverables">
        <List items={p.deliverables} />
      </Block>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-display text-2xl font-bold">
          Let&apos;s talk about your project
        </h2>
        <p className="mt-2 text-muted">
          Tell us what you are building and we will tell you honestly how we
          can help.
        </p>
        <div className="mt-5">
          <ButtonLink href="/contact">Talk to NEXORA</ButtonLink>
        </div>
      </div>
    </div>
  );
}
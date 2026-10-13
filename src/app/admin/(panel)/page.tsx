"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Item = { status: string };

export default function AdminOverview() {
  const [leads, setLeads] = useState<Item[] | null>(null);
  const [apps, setApps] = useState<Item[] | null>(null);

  useEffect(() => {
    api<Item[]>("/leads?limit=200").then((r) => setLeads(r.data ?? []));
    api<Item[]>("/internships/applications?limit=200").then((r) =>
      setApps(r.data ?? [])
    );
  }, []);

  const count = (items: Item[] | null, status?: string) =>
    items === null
      ? "..."
      : status
        ? items.filter((i) => i.status === status).length
        : items.length;

  const cards = [
    { label: "New internship applications", value: count(apps, "applicant"), href: "/admin/internships" },
    { label: "All internship applications", value: count(apps), href: "/admin/internships" },
    { label: "New leads", value: count(leads, "new"), href: "/admin/leads" },
    { label: "All leads", value: count(leads), href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-border bg-surface p-5 hover:border-accent"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{c.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">Counts cover the latest 200 records.</p>
    </div>
  );
}
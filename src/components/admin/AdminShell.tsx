"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Me = { full_name: string; email: string; role: string };

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/internships", label: "Internships" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<Me | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api<Me>("/auth/me").then((r) => {
      if (r.ok && r.data) setMe(r.data);
      else router.replace("/admin/login");
      setChecking(false);
    });
  }, [router]);

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (checking) {
    return <p className="p-8 text-sm text-muted">Checking session...</p>;
  }
  if (!me) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <nav aria-label="Admin" className="flex flex-wrap gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm ${
                pathname === l.href
                  ? "bg-surface font-semibold text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">{me.full_name}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-border px-3 py-2 hover:bg-surface"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="pt-6">{children}</div>
    </div>
  );
}
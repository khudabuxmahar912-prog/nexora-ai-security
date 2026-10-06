"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm transition-colors hover:text-text ${
      pathname === href ? "text-text" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
      >
        <Link href="/" className="font-display text-lg font-bold tracking-wide">
          NEXORA <span className="text-accent">AI SECURITY</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg lg:inline-block"
        >
          Talk to NEXORA
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-border px-3 py-2 text-sm lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 ${linkClass(item.href)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-accent px-3 py-2 text-center font-semibold text-bg"
              >
                Talk to NEXORA
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
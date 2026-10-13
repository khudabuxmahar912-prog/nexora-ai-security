"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL, api } from "@/lib/api";

const fieldClass =
  "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!API_URL) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <p className="text-sm text-muted">
          The admin area is not available on this site yet.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError("");

    const r = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: String(data.get("email") ?? "").trim(),
        password: String(data.get("password") ?? ""),
      }),
    });

    if (r.ok) {
      router.replace("/admin");
      return;
    }
    if (r.status === 401) setError("Invalid email or password.");
    else if (r.status === 429) setError("Too many attempts. Please try again later.");
    else if (r.status === 0) setError("Could not reach the server.");
    else setError("Login failed. Please try again.");
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Admin login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          Email
          <input name="email" type="email" required autoComplete="username" className={fieldClass} />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" required autoComplete="current-password" className={fieldClass} />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
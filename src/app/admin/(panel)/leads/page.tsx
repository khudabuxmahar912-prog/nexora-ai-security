"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service_interest: string | null;
  message: string;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "qualified", "client", "lost"];
const fieldClass =
  "rounded-lg border border-border bg-surface px-3 py-2 text-sm";

export default function AdminLeads() {
  const [items, setItems] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    api<Lead[]>("/leads?limit=200").then((r) => {
      if (r.ok && r.data) setItems(r.data);
      else setError("Could not load leads.");
    });
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter(
      (l) =>
        (status === "All" || l.status === status) &&
        (!q || `${l.name} ${l.email} ${l.company ?? ""}`.toLowerCase().includes(q))
    );
  }, [items, query, status]);

  async function changeStatus(id: string, newStatus: string) {
    setError("");
    const r = await api<Lead>(`/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
    if (r.ok && r.data) {
      const updated = r.data;
      setItems((prev) =>
        prev ? prev.map((l) => (l.id === id ? { ...l, status: updated.status } : l)) : prev
      );
    } else {
      setError("Could not update the status.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Leads</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email or company..."
          aria-label="Search leads"
          className={`${fieldClass} w-full max-w-xs`}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={fieldClass}>
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items === null && !error ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No leads found.
                </td>
              </tr>
            ) : (
              rows.map((l) => (
                <Fragment key={l.id}>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{l.name}</div>
                      {l.company && <div className="text-muted">{l.company}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      <div>{l.email}</div>
                      {l.phone && <div>{l.phone}</div>}
                    </td>
                    <td className="px-4 py-3">{l.service_interest ?? "-"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => changeStatus(l.id, e.target.value)}
                        aria-label={`Status for ${l.name}`}
                        className={fieldClass}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setOpenId(openId === l.id ? null : l.id)}
                        className="text-accent hover:underline"
                      >
                        {openId === l.id ? "Hide" : "Message"}
                      </button>
                    </td>
                  </tr>
                  {openId === l.id && (
                    <tr className="border-t border-border bg-surface/50">
                      <td colSpan={6} className="px-4 py-4 text-sm whitespace-pre-wrap">
                        {l.message}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
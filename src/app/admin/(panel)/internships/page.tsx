"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { INTERNSHIP_TRACKS } from "@/lib/internships";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string;
  education: string;
  institute: string;
  skills: string;
  experience_level: string;
  track: string;
  linkedin_url: string | null;
  previous_projects: string | null;
  availability: string | null;
  preferred_area: string | null;
  motivation: string;
  status: string;
  created_at: string;
};

const STATUSES = [
  "applicant",
  "under_review",
  "shortlisted",
  "interview",
  "selected",
  "active",
  "completed",
  "rejected",
];

const label = (s: string) => s.replace("_", " ");
const fieldClass =
  "rounded-lg border border-border bg-surface px-3 py-2 text-sm";

function Detail({ title, value }: { title: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm">{value}</p>
    </div>
  );
}

export default function AdminInternships() {
  const [items, setItems] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [status, setStatus] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    api<Application[]>("/internships/applications?limit=200").then((r) => {
      if (r.ok && r.data) setItems(r.data);
      else setError("Could not load applications.");
    });
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter(
      (a) =>
        (track === "All" || a.track === track) &&
        (status === "All" || a.status === status) &&
        (!q || `${a.full_name} ${a.email}`.toLowerCase().includes(q))
    );
  }, [items, query, track, status]);

  async function changeStatus(id: string, newStatus: string) {
    setError("");
    const r = await api<Application>(`/internships/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
    if (r.ok && r.data) {
      const updated = r.data;
      setItems((prev) =>
        prev ? prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a)) : prev
      );
    } else {
      setError("Could not update the status.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Internship applications</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email..."
          aria-label="Search applications"
          className={`${fieldClass} w-full max-w-xs`}
        />
        <select value={track} onChange={(e) => setTrack(e.target.value)} aria-label="Filter by internship" className={fieldClass}>
          <option value="All">All internships</option>
          {INTERNSHIP_TRACKS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={fieldClass}>
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {label(s)}
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
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Internship</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items === null && !error ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No applications found.
                </td>
              </tr>
            ) : (
              rows.map((a) => (
                <Fragment key={a.id}>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-muted">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-semibold">{a.full_name}</td>
                    <td className="px-4 py-3 text-muted">
                      <div>{a.email}</div>
                      {a.phone && <div>{a.phone}</div>}
                    </td>
                    <td className="px-4 py-3">{a.track}</td>
                    <td className="px-4 py-3 text-muted">{a.experience_level}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => changeStatus(a.id, e.target.value)}
                        aria-label={`Status for ${a.full_name}`}
                        className={fieldClass}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {label(s)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setOpenId(openId === a.id ? null : a.id)}
                        className="text-accent hover:underline"
                      >
                        {openId === a.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {openId === a.id && (
                    <tr className="border-t border-border bg-surface/50">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Detail title="Country" value={a.country} />
                          <Detail title="Education" value={`${a.education}, ${a.institute}`} />
                          <Detail title="Skills" value={a.skills} />
                          <Detail title="Previous projects" value={a.previous_projects} />
                          <Detail title="Availability" value={a.availability} />
                          <Detail title="Preferred working area" value={a.preferred_area} />
                          <Detail title="Motivation" value={a.motivation} />
                          {a.linkedin_url && (
                            <div>
                              <p className="text-xs uppercase tracking-wide text-muted">LinkedIn</p>
                              <a
                                href={a.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block text-sm text-accent hover:underline"
                              >
                                Open profile
                              </a>
                            </div>
                          )}
                        </div>
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
"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";

type SortKey = "name" | "tech" | "status";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [asc, setAsc] = useState(true);

  const statuses = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.status)))],
    [projects]
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter(
        (p) =>
          (status === "All" || p.status === status) &&
          (!q ||
            `${p.name} ${p.description} ${p.tech}`.toLowerCase().includes(q))
      )
      .sort((a, b) => (asc ? 1 : -1) * a[sortKey].localeCompare(b[sortKey]));
  }, [projects, query, status, sortKey, asc]);

  const sortBy = (key: SortKey) => {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (asc ? " ↑" : " ↓") : "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
          className="w-full max-w-xs rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">
                <button type="button" onClick={() => sortBy("name")}>
                  Project{arrow("name")}
                </button>
              </th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">
                <button type="button" onClick={() => sortBy("tech")}>
                  Tech{arrow("tech")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button type="button" onClick={() => sortBy("status")}>
                  Status{arrow("status")}
                </button>
              </th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No projects match your search.
                </td>
              </tr>
            ) : (
              rows.map((p) => (
                <tr key={p.name} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3 text-muted">{p.description}</td>
                  <td className="px-4 py-3 text-muted">{p.tech}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Open ↗
                      </a>
                    ) : (
                      <span className="text-muted">Coming Soon</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
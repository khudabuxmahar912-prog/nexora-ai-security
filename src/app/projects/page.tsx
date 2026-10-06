import type { Metadata } from "next";
import ProjectsTable from "@/components/sections/ProjectsTable";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | NEXORA AI SECURITY",
  description: "Projects built by the NEXORA AI SECURITY team.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        Projects
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Our work
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Real projects with links you can open. Search, filter and sort the
        table below.
      </p>
      <div className="mt-8">
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
}
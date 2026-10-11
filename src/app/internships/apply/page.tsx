import type { Metadata } from "next";
import InternshipApplyForm from "@/components/sections/InternshipApplyForm";

export const metadata: Metadata = {
  title: "Apply for an Internship | NEXORA AI SECURITY",
  description:
    "Apply for a remote, project-based internship at NEXORA AI SECURITY.",
  alternates: { canonical: "/internships/apply" },
};

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
        Internships
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Apply for an internship
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Tell us about yourself and choose the internship you want. Fields
        marked * are required.
      </p>
      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <InternshipApplyForm />
      </div>
    </div>
  );
}
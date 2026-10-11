"use client";

import { useState } from "react";
import { EXPERIENCE_LEVELS, INTERNSHIP_TRACKS } from "@/lib/internships";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";

export default function InternshipApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [groupUrl, setGroupUrl] = useState<string | null>(null);

  if (!API_URL) {
    return (
      <p className="text-sm text-muted">
        The online application form is Coming Soon. Please use the contact page
        for questions in the meantime.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(`${API_URL}/internships/apply`, {
        method: "POST",
        body: data,
      });

      if (res.status === 201) {
        const body = await res.json().catch(() => ({}));
        const url =
          typeof body.whatsapp_group_url === "string"
            ? body.whatsapp_group_url
            : null;
        setGroupUrl(
          url && url.startsWith("https://chat.whatsapp.com/") ? url : null
        );
        form.reset();
        setStatus("success");
        return;
      }

      if (res.status === 429) {
        setError("Too many applications from this device. Please try again later.");
      } else {
        const body = await res.json().catch(() => ({}));
        setError(
          typeof body.detail === "string"
            ? body.detail
            : "Please check your details and try again."
        );
      }
    } catch {
      setError("Could not reach the server. Please try again later.");
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="space-y-4">
        <p className="text-accent-2">
          Thank you. Your application was received and we will review it.
        </p>
        {groupUrl && (
          <div>
            <p className="text-sm text-muted">
              Join the internship WhatsApp group to get updates:
            </p>
            <a
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg"
            >
              Join the WhatsApp group
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <label className="text-sm">
        Full name *
        <input name="full_name" required minLength={2} maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm">
        Email *
        <input name="email" type="email" required maxLength={255} className={fieldClass} />
      </label>
      <label className="text-sm">
        Phone / WhatsApp
        <input name="phone" maxLength={50} className={fieldClass} />
      </label>
      <label className="text-sm">
        Country *
        <input name="country" required minLength={2} maxLength={100} className={fieldClass} />
      </label>
      <label className="text-sm">
        Education *
        <input name="education" required minLength={2} maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm">
        University / Institute *
        <input name="institute" required minLength={2} maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm">
        Internship *
        <select name="track" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose an internship
          </option>
          {INTERNSHIP_TRACKS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        Experience level *
        <select name="experience_level" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose one
          </option>
          {EXPERIENCE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm md:col-span-2">
        Skills *
        <textarea name="skills" required minLength={2} maxLength={3000} rows={3} className={fieldClass} />
      </label>
      <label className="text-sm md:col-span-2">
        LinkedIn link
        <input name="linkedin_url" type="url" maxLength={300} placeholder="https://linkedin.com/in/..." className={fieldClass} />
      </label>
      <label className="text-sm md:col-span-2">
        Previous projects
        <textarea name="previous_projects" maxLength={3000} rows={3} className={fieldClass} />
      </label>
      <label className="text-sm">
        Availability
        <input name="availability" maxLength={200} placeholder="e.g. 15 hours per week" className={fieldClass} />
      </label>
      <label className="text-sm">
        Preferred working area
        <input name="preferred_area" maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm md:col-span-2">
        Why do you want this internship? *
        <textarea name="motivation" required minLength={20} maxLength={3000} rows={5} className={fieldClass} />
      </label>

      {/* Spam trap: hidden from people, bots tend to fill it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting..." : "Submit application"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
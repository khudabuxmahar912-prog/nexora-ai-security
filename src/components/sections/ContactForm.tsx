"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const services = [
  "AI Security",
  "AI & Software",
  "Internships",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (!API_URL) {
    return (
      <p className="text-sm text-muted">
        The online contact form is Coming Soon. Please use the email, phone or
        WhatsApp above.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();

    const body = {
      name: text("name"),
      email: text("email"),
      company: text("company") || null,
      phone: text("phone") || null,
      service_interest: text("service_interest") || null,
      message: text("message"),
      website: text("website"),
    };

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        form.reset();
        setStatus("success");
        return;
      }
      if (res.status === 429) {
        setError("Too many messages from this device. Please try again later.");
      } else if (res.status === 422) {
        setError(
          "Please check your details: use a valid email and write at least 10 characters in the message."
        );
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Could not reach the server. Please try again or email us directly.");
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-accent-2">
        Thank you. Your message was received and we will get back to you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <label className="text-sm">
        Name *
        <input name="name" required minLength={2} maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm">
        Email *
        <input name="email" type="email" required maxLength={255} className={fieldClass} />
      </label>
      <label className="text-sm">
        Company
        <input name="company" maxLength={200} className={fieldClass} />
      </label>
      <label className="text-sm">
        Phone
        <input name="phone" maxLength={50} className={fieldClass} />
      </label>
      <label className="text-sm md:col-span-2">
        What are you interested in?
        <select name="service_interest" defaultValue="" className={fieldClass}>
          <option value="">Choose one</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm md:col-span-2">
        Message *
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className={fieldClass}
        />
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
          {status === "submitting" ? "Sending..." : "Send message"}
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
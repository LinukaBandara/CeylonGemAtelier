"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name";
    if (!email) nextErrors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    // Simulate network — replace with real endpoint later
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <section className="pt-28 md:pt-36 pb-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-4">
            Enquiry received
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed mb-10">
            Thank you. A member of the atelier will respond personally and with complete discretion.
          </p>
          <Button href="/" variant="secondary">
            Return home
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-4">
          Request a Private Enquiry
        </h1>
        <p className="text-[var(--color-muted)] mb-12 leading-relaxed">
          Share a few details and we will respond personally. All enquiries are handled with complete discretion.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full bg-transparent border-b py-3 text-sm focus:outline-none transition-colors ${
                errors.name ? "border-red-400" : "border-[var(--color-stone)] focus:border-[var(--color-graphite)]"
              }`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full bg-transparent border-b py-3 text-sm focus:outline-none transition-colors ${
                errors.email ? "border-red-400" : "border-[var(--color-stone)] focus:border-[var(--color-graphite)]"
              }`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Phone / WhatsApp (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Gemstone or Collection of Interest
            </label>
            <input
              id="interest"
              name="interest"
              type="text"
              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm focus:outline-none focus:border-[var(--color-graphite)] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-graphite)] text-sm tracking-wide text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {status === "submitting" ? "Sending…" : "Submit Enquiry"}
          </button>
        </form>

        <p className="mt-12 text-xs text-[var(--color-muted)]">
          Or return to the{" "}
          <Link href="/" className="underline hover:text-[var(--color-graphite)]">
            homepage
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

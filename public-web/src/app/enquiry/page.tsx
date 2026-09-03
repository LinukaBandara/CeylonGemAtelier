"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consultationType, setConsultationType] = useState<"acquisition" | "bespoke" | "private_viewing">("acquisition");
  const preferredMethod = "whatsapp" as const;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please state your title and name";
    if (!email) nextErrors.email = "Please provide your confidential email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email format";

    if (preferredMethod === "whatsapp" && !phone) {
      nextErrors.phone = "Please enter your WhatsApp contact number";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    // Simulate secure transmission to atelier concierge
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <section className="pt-28 md:pt-40 pb-24">
        <div className="mx-auto max-w-xl px-5 text-center glass-panel p-8 sm:p-12 border border-[var(--color-gold)]/40 rounded-sm shadow-2xl animate-fade-rise">
          <div className="w-16 h-16 rounded-full border border-[var(--color-gold)] flex items-center justify-center mx-auto mb-6 text-[var(--color-gold)]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Private Protocol Transmitted
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-graphite)] mt-2 mb-4">
            Dossier Received
          </h1>
          <p className="text-[var(--color-muted)] font-serif italic text-sm sm:text-base leading-relaxed mb-8">
            Thank you. Your inquiry has been routed to our senior gemological partner. We will contact you with absolute privacy and discretion within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-[var(--color-gold)] text-white text-xs uppercase font-mono tracking-[0.2em] hover:bg-[var(--color-gold-dark)] transition-colors"
          >
            Return to Atelier Vault
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Haute Joaillerie Concierge
          </span>
          <h1 className="font-display text-3xl sm:text-5xl text-[var(--color-graphite)] mt-2">
            Private Atelier Consultation
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] font-serif italic mt-3 max-w-lg mx-auto">
            Direct access to Ceylon corundum specimens, bespoke cutting commissions, or private viewing appointments in Colombo, London, Zurich, and Dubai.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-10 border border-[var(--color-gold)]/40 shadow-2xl rounded-sm">
          {/* Consultation Type Selector */}
          <div className="mb-8">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Select Nature of Inquiry
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setConsultationType("acquisition")}
                className={`py-2 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                  consultationType === "acquisition"
                    ? "border-[var(--color-gold)] bg-[var(--color-parchment)] text-[var(--color-gold)] font-medium shadow-sm"
                    : "border-[var(--color-stone)]/60 text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                }`}
              >
                Vault Specimen
              </button>
              <button
                type="button"
                onClick={() => setConsultationType("bespoke")}
                className={`py-2 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                  consultationType === "bespoke"
                    ? "border-[var(--color-gold)] bg-[var(--color-parchment)] text-[var(--color-gold)] font-medium shadow-sm"
                    : "border-[var(--color-stone)]/60 text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                }`}
              >
                Bespoke Setting
              </button>
              <button
                type="button"
                onClick={() => setConsultationType("private_viewing")}
                className={`py-2 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                  consultationType === "private_viewing"
                    ? "border-[var(--color-gold)] bg-[var(--color-parchment)] text-[var(--color-gold)] font-medium shadow-sm"
                    : "border-[var(--color-stone)]/60 text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                }`}
              >
                Private Viewing
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Name & Title
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Lord / Lady / Dr. / Full Name"
                className={`w-full bg-[var(--background)] border px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:outline-none transition-colors ${
                  errors.name ? "border-red-400" : "border-[var(--color-stone)] focus:border-[var(--color-gold)]"
                }`}
              />
              {errors.name && <p className="mt-1 font-mono text-[10px] text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Confidential Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="client@vault.com"
                  className={`w-full bg-[var(--background)] border px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:outline-none transition-colors ${
                    errors.email ? "border-red-400" : "border-[var(--color-stone)] focus:border-[var(--color-gold)]"
                  }`}
                />
                {errors.email && <p className="mt-1 font-mono text-[10px] text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  WhatsApp / Phone Contact
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 7911 123456"
                  className={`w-full bg-[var(--background)] border px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:outline-none transition-colors ${
                    errors.phone ? "border-red-400" : "border-[var(--color-stone)] focus:border-[var(--color-gold)]"
                  }`}
                />
                {errors.phone && <p className="mt-1 font-mono text-[10px] text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="interest" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Specimen Reference or Desired Parameters
              </label>
              <input
                id="interest"
                name="interest"
                type="text"
                placeholder="e.g. CEY-24-1187, or 5ct+ Unheated Royal Blue Cushion"
                className="w-full bg-[var(--background)] border border-[var(--color-stone)] px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Confidential Notes / Commission Intent
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Detail preferred appointment dates, setting specifications, or questions regarding provenance..."
                className="w-full bg-[var(--background)] border border-[var(--color-stone)] px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 bg-[var(--color-gold)] text-white text-xs uppercase font-mono tracking-[0.25em] font-semibold hover:bg-[var(--color-gold-dark)] transition-all shadow-xl disabled:opacity-50"
            >
              {status === "submitting" ? "Transmitting Confidential Dossier…" : "Submit Private Enquiry →"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--color-stone)]/40 flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
            <span>🔒 End-to-End Atelier Discretion</span>
            <a
              href="https://wa.me/?text=Hello%20Ceylon%20Gem%20Atelier%2C%20I%20wish%20to%20request%20a%20private%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1"
            >
              Instant WhatsApp Concierge →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
